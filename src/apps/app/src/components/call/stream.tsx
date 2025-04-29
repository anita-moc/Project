'use client';
import { useRoom } from '@/src/hooks/appointment/use-room';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { BetterUser } from '@helsa/auth/server';
import { Button } from '@helsa/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@helsa/ui/components/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@helsa/ui/components/popover';
import { Separator } from '@helsa/ui/components/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@helsa/ui/components/tooltip';
import { cn } from '@helsa/ui/lib/utils';
import {
  Call,
  CallingState,
  OwnCapability,
  ParticipantView,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  StreamVideoParticipant,
  TranscriptionSettingsRequestModeEnum,
  useCall,
  useCallStateHooks,
  useParticipantViewContext,
  VideoPlaceholderProps,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { intervalToDuration } from 'date-fns';
import { motion } from 'framer-motion';
import {
  AlarmClockPlus,
  AudioLines,
  InfoIcon,
  Mic,
  MicOff,
  PhoneIncoming,
  PhoneOff,
  PlayCircle,
  Settings,
  StopCircle,
  Video,
  VideoOff,
  Volume2Icon,
} from 'lucide-react';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import CallCHat from '../call-chat';
import { enterRoom } from '@/src/actions/appointment/enter-room';

const apiKey = process.env.NEXT_PUBLIC_STREAM_CLIENT_KEY!;

export const VideoCallOld = ({ id, token }: { id: string; token: string }) => {
  const [user] = useLocalStorage<BetterUser | null>('user', null);
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  useEffect(() => {
    if (!user) {
      return;
    }
    const streamUser = {
      id: user.id,
      name: user.name,
      image: user.image ?? '',
      role: user.role === 'PATIENT' ? 'patient' : 'doctor',
    };
    const newClient = new StreamVideoClient({
      apiKey,
      user: streamUser,
      token,
    });
    const newCall = newClient.call('appointment', id);
    const init = async () => {
      newCall.getOrCreate();
      setClient(newClient);
      setCall(newCall);
    };
    init();
  }, [user]);
  if (!client || !call) {
    return null;
  }
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
};

const DroppableContainer = ({ id, children, className }: { id: string; children?: ReactNode; className?: string }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div ref={setNodeRef} className={cn('absolute h-1/2 w-1/2', className)}>
      {children}
    </div>
  );
};

const calculateParticipantTimeInCall = (joinedAt: Date) => {
  const now = new Date();
  return intervalToDuration({
    start: joinedAt,
    end: now,
  });
};

export const MyUILayout = () => {
  const call = useCall();

  const { useLocalParticipant, useParticipantCount, useRemoteParticipants, useCallCallingState } = useCallStateHooks();
  const participantCount = useParticipantCount();
  const callCallingState = useCallCallingState();
  const localParticipant = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();
  const [parent, setParent] = useState<any>('drop-1');
  const { enterRoom } = useRoom();

  const joinCall = useCallback(async () => {
    if (call) {
      call.join();
      await enterRoom(call.id);
    }
  }, [call]);

  if (call?.state.endedAt) {
    return (
      <div className="relative w-full flex-1">
        <div className="h-full w-full flex flex-col justify-center items-center gap-3">
          <p className="text-lg font-semibold">The call has ended</p>
        </div>
      </div>
    );
  }

  if (!localParticipant || callCallingState === CallingState.LEFT) {
    return (
      <div className="relative w-full flex-1">
        <div className="h-full w-full flex flex-col justify-center items-center gap-3">
          <p className="text-lg font-semibold">
            {remoteParticipants.length > 0 ? 'Te están esperando' : 'No hay nadie en la llamada'}{' '}
            {call?.state.endedAt?.toISOString()}
          </p>
          <Button onClick={joinCall} className="rounded-full gap-3" variant={'outline'}>
            <PhoneIncoming className="size-4" />
            Enter
          </Button>
        </div>
      </div>
    );
  }

  const handleDragEnd = ({ over }: any) => {
    setParent(over?.id ?? 'drop-1');
  };
  const localVideo = <MyFloatingLocalParticipant participant={localParticipant} count={participantCount} />;
  return (
    <div className="relative w-full flex-1">
      {callCallingState == CallingState.JOINED && (
        <DndContext onDragEnd={handleDragEnd}>
          <MyParticipantList participants={remoteParticipants} />
          <DroppableContainer className="p-4 top-0 left-0 flex items-start justify-start" id="drop-1">
            {parent === 'drop-1' && localVideo}
          </DroppableContainer>
          <DroppableContainer className="p-4 top-0 right-0 flex items-start justify-end" id="drop-2">
            {parent === 'drop-2' && localVideo}
          </DroppableContainer>
          <DroppableContainer className="p-4 bottom-0 left-0 flex items-end justify-start" id="drop-3">
            {parent === 'drop-3' && localVideo}
          </DroppableContainer>
          <DroppableContainer className="p-4 bottom-0 right-0 flex items-end justify-end" id="drop-4">
            {parent === 'drop-4' && localVideo}
          </DroppableContainer>
          <ActionsBar />
          <CallCHat id={call?.id ?? ''} />
        </DndContext>
      )}
    </div>
  );
};

export const MyParticipantList = (props: { participants: StreamVideoParticipant[] }) => {
  const { participants } = props;
  if (participants.length === 0) {
    return (
      <div className="flex h-full w-full justify-center items-center">
        <p className="text-lg font-semibold">Waiting for someone to join the call</p>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', height: '100%' }}>
      {participants.map((participant) => (
        <ParticipantView
          participant={participant}
          key={participant.sessionId}
          className="rounded-none border"
          ParticipantViewUI={ParticipantDetails}
          VideoPlaceholder={CustomVideoPlaceholder}
        />
      ))}
    </div>
  );
};

export const MyFloatingLocalParticipant = (props: { participant?: StreamVideoParticipant; count: number }) => {
  const { participant } = props;
  const call = useCall();
  const { useCallCallingState } = useCallStateHooks();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'local-video',
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: 10,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="h-[125px] aspect-video bg-background rounded-lg border resize max-h-[200px] max-w-[340px] min-h-[125px] min-w-[200px] overflow-auto no-scroll"
    >
      <div {...listeners} {...attributes} className="h-full w-full">
        <ParticipantView
          participant={participant!}
          className="h-full"
          mirror={false}
          ParticipantViewUI={ParticipantDetails}
          VideoPlaceholder={CustomVideoPlaceholder}
        />
      </div>
    </div>
  );
};

const ParticipantDetails = () => {
  const { participant } = useParticipantViewContext();
  return (
    <div title={participant.name} className="absolute flex justify-start items-center gap-3 bottom-1 left-2">
      <span>{participant.isLocalParticipant ? 'Tu' : participant.name || participant.userId}</span>
      <div className="flex justify-start items-center gap-2  py-2 px-3 bg-gray-600/50 rounded-full">
        {participant.audioStream ? <Mic className="size-4" /> : <MicOff className="size-4" />}
        {participant.videoStream ? <Video className="size-4" /> : <VideoOff className="size-4" />}
      </div>
    </div>
  );
};

const CustomVideoPlaceholder = ({ style }: VideoPlaceholderProps) => {
  const { participant } = useParticipantViewContext();
  return (
    <>
      {participant.image && !participant.videoStream && (
        <div className="h-[100px] w-[100px] rounded-full overflow-hidden border">
          <img className=" object-contain" src={participant.image} alt={participant.userId} />
        </div>
      )}
      {!participant.image && <span>{participant.name || participant.userId}</span>}
    </>
  );
};

const ActionsBar = () => {
  const [user] = useLocalStorage<BetterUser | null>('user', null);
  const call = useCall();

  const { useMicrophoneState, useCameraState } = useCallStateHooks();
  const { isMute: micMute, microphone } = useMicrophoneState();
  const { isMute: cameraMute, camera } = useCameraState();
  return (
    <motion.div
      className="absolute inset-x-0 bottom-2 flex justify-center"
      initial={{ opacity: 0, filter: 'blur(8px)', y: 0 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: -24 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className="backdrop-filter backdrop-blur-lg bg-background rounded-full pl-2 pr-4 py-3 h-10 flex items-center justify-center border-[0.5px] border-border">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn('rounded-full size-8', {
                  'bg-destructive': micMute,
                })}
                onClick={() => {
                  microphone.toggle();
                }}
              >
                {micMute ? <MicOff className="size-4" /> : <Mic className="size-4 text-primary" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={15} className="text-[10px] px-2 py-1 rounded-sm font-medium">
              <p>Mute</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn('rounded-full size-8', {
                  'bg-destructive': cameraMute,
                })}
                onClick={() => {
                  camera.toggle();
                }}
              >
                {cameraMute ? <VideoOff className="size-4" /> : <Video className="size-4 text-primary" />}
              </Button>
            </TooltipTrigger>

            <TooltipContent sideOffset={15} className="text-[10px] px-2 py-1 rounded-sm font-medium">
              <p>Camera</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {user?.role === 'DOCTOR' && (
          <>
            <Separator orientation="vertical" className="mr-3 ml-2 h-4" />
            <RecordingButton />
            <TranscriptionButton />
          </>
        )}
        <Separator orientation="vertical" className="mr-3 ml-2 h-4" />
        <Info />
        <DevicesList />
        <Separator orientation="vertical" className="mr-3 ml-2 h-4" />
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-8 h-6  bg-destructive"
                onClick={() => {
                  call?.leave();
                }}
              >
                <PhoneOff className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={15} className="text-[10px] px-2 py-1 rounded-sm font-medium">
              <p>END</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Separator orientation="vertical" className="mr-3 ml-2 h-4" />
        <SessionTimer />
      </div>
    </motion.div>
  );
};

const DevicesList = () => {
  const call = useCall();
  const { useMicrophoneState, useCameraState, useSpeakerState } = useCallStateHooks();
  const { devices: micDevices = [], selectedDevice: micSelected } = useMicrophoneState();
  const { devices: cameraDevices = [], selectedDevice: cameraSelected } = useCameraState();
  const { devices: speakerDevices = [], selectedDevice: speakerSelected } = useSpeakerState();
  return (
    <TooltipProvider delayDuration={0}>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className={cn('rounded-full size-8')}>
                <Settings className="size-4" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent sideOffset={15} className="text-[10px] px-2 py-1 rounded-sm font-medium">
            <p>Settings</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent className="w-[300px] rounded-none" side="top" align="start">
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="gap-2">
                <div className="w-4 h-4 mr-2 flex justify-center items-center">
                  <Video />
                </div>
                <span className="text-sm">Select the camera</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="rounded-none">
                  {cameraDevices?.map((device) => (
                    <DropdownMenuItem
                      className={cn('gap-2 rounded-none', {
                        'bg-secondary': cameraSelected === device.deviceId,
                      })}
                      key={device.deviceId}
                      onClick={() => {
                        call?.camera.select(device.deviceId);
                      }}
                    >
                      <div className="w-4 h-4 mr-2 flex justify-center items-center">
                        <Video />
                      </div>
                      <span className="text-sm font-semibold">{device.label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="gap-2">
                <div className="w-4 h-4 mr-2 flex justify-center items-center">
                  <Mic />
                </div>
                <span className="text-sm">Select the microphone</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="rounded-none">
                  {micDevices?.map((device) => (
                    <DropdownMenuItem
                      className={cn('gap-2 rounded-none', {
                        'bg-secondary': micSelected === device.deviceId,
                      })}
                      key={device.deviceId}
                      onClick={() => {
                        call?.microphone.select(device.deviceId);
                      }}
                    >
                      <div className="w-4 h-4 mr-2 flex justify-center items-center">
                        <Mic />
                      </div>
                      <span className="text-sm font-semibold">{device.label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="gap-2">
                <div className="w-4 h-4 mr-2 flex justify-center items-center">
                  <Volume2Icon />
                </div>
                <span className="text-sm">
                Select the speaker</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="rounded-none">
                  {speakerDevices.map((device) => (
                    <DropdownMenuItem
                      className={cn('gap-2 rounded-none', {
                        'bg-secondary': speakerSelected === device.deviceId,
                      })}
                      key={device.deviceId}
                      onClick={() => {
                        call?.speaker.select(device.deviceId);
                      }}
                    >
                      <div className="w-4 h-4 mr-2 flex justify-center items-center">
                        <Volume2Icon />
                      </div>
                      <span className="text-sm font-semibold">{device.label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
};

const RecordingButton = () => {
  const call = useCall();
  const { useIsCallRecordingInProgress } = useCallStateHooks();
  const isCallRecordingInProgress = useIsCallRecordingInProgress();

  const toggleRecording = useCallback(async () => {
    try {
      if (isCallRecordingInProgress) {
        await call?.stopRecording();
      } else {
        await call?.startRecording();
      }
    } catch (e) {
      console.error(`Failed start recording`, e);
    }
  }, [call, isCallRecordingInProgress]);

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8 rounded-full" onClick={toggleRecording}>
            {isCallRecordingInProgress ? (
              <StopCircle className="size-4" />
            ) : (
              <PlayCircle className="size-4 text-primary" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={15} className="text-[10px] px-2 py-1 rounded-sm font-medium">
          <p>{isCallRecordingInProgress ? 'Detener grabación' : 'Iniciar grabación'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const useSessionTimer = () => {
  const { useCallSession } = useCallStateHooks();
  const session = useCallSession();
  const [remainingMs, setRemainingMs] = useState(Number.NaN);
  useEffect(() => {
    if (!session?.timer_ends_at) return;
    const timerEndAt = new Date(session.timer_ends_at);
    const handle = setInterval(() => {
      const now = new Date();
      const remainingMs = +timerEndAt - +now;
      setRemainingMs(remainingMs);
    }, 500);
    return () => clearInterval(handle);
  }, [session]);
  return remainingMs;
};

const useUserTimer = () => {
  const call = useCall();
  const [user] = useLocalStorage<BetterUser | null>('', null);
  const { useCallSession } = useCallStateHooks();
  const session = useCallSession();
  const { joined_at } = session?.participants.find((p) => p.user.id === user?.id) ?? {};

  const [timeInCall, setTimeInCall] = useState(Number.NaN);

  useEffect(() => {
    if (!joined_at) return;
    const handle = setInterval(() => {
      const time = calculateParticipantTimeInCall(new Date(joined_at));
      setTimeInCall(time.minutes ?? 0);
    }, 500);
    return () => clearInterval(handle);
  }, [session]);

  useEffect(() => {
    if (timeInCall >= 5) {
      enterRoom({ appointmentId: call?.id ?? '' });
    }
  }, [timeInCall]);
};

const useSessionTimerAlert = (remainingMs: number, threshold: number, onAlert: VoidFunction) => {
  const didAlert = useRef(false);
  useEffect(() => {
    if (!didAlert.current && remainingMs < threshold) {
      onAlert();
    }
  }, [onAlert, remainingMs, threshold]);
};
const SessionTimer = () => {
  const [user] = useLocalStorage<BetterUser | null>('user', null);
  const call = useCall();
  const [showAlert, setShowAlert] = useState(false);
  const [hasReachedZero, setHasReachedZero] = useState(false);
  const remainingMs: number = useSessionTimer();
  useSessionTimerAlert(remainingMs, 5 * 60 * 1000, () => setShowAlert(true));
  useSessionTimerAlert(remainingMs, 0, () => setHasReachedZero(true));
  const { useHasPermissions } = useCallStateHooks();
  const canEnd = useHasPermissions(OwnCapability.END_CALL);

  useEffect(() => {
    if (hasReachedZero && canEnd) {
      setTimeout(() => {
        call?.endCall();
      }, 60000);
    }
  }, [hasReachedZero]);

  if (hasReachedZero) {
    return <div>Time is up, the call will be closed in 1 minute.</div>;
  }

  return (
    <div className="mx-2 text-sm flex items-center gap-3">
      <p className={cn({ 'text-red-500': showAlert })}>
        {
          intervalToDuration({
            start: Date.now(),
            end: Date.now() + remainingMs,
          }).minutes
        }
        :
        {intervalToDuration({
          start: Date.now(),
          end: Date.now() + remainingMs,
        })
          .seconds?.toString()
          .padStart(2, '0')}
      </p>
      {showAlert && user?.role === 'DOCTOR' && <ExtendSessionButton duration={900} />}
    </div>
  );
};

const ExtendSessionButton = ({ duration }: { duration: number }) => {
  const call = useCall();
  const { useCallSettings, useHasPermissions } = useCallStateHooks();
  const settings = useCallSettings();
  const canExtend = useHasPermissions(OwnCapability.CHANGE_MAX_DURATION);

  const extendTime = useCallback(() => {
    if (!call) return;
    call.update({
      settings_override: {
        limits: {
          max_duration_seconds: (settings!.limits!.max_duration_seconds ?? 0) + duration,
        },
      },
    });
  }, [call, duration]);
  if (!canExtend) {
    return null;
  }
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full size-8" onClick={extendTime}>
            <AlarmClockPlus className="size-4" />
          </Button>
        </TooltipTrigger>

        <TooltipContent sideOffset={15} className="text-[10px] px-2 py-1 rounded-sm font-medium">
          <p>Time remaining on the call, please extend it</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const TranscriptionButton = () => {
  const call = useCall();
  const { useCallSettings, useIsCallTranscribingInProgress } = useCallStateHooks();
  const { transcription } = useCallSettings() || {};

  const isTranscribing = useIsCallTranscribingInProgress();

  if (transcription?.mode === TranscriptionSettingsRequestModeEnum.DISABLED) {
    // transcriptions are not available, render nothing
    return null;
  }

  const toggleTranscription = useCallback(() => {
    if (!isTranscribing) {
      call?.startTranscription({ language: 'es' });
    } else {
      call?.stopTranscription();
    }
  }, [isTranscribing]);

  return (
    <Button variant="ghost" size="icon" className="rounded-full size-8" onClick={toggleTranscription}>
      {!isTranscribing ? (
        <AudioLines className="size-4" />
      ) : (
        <AudioLines className="size-4 text-red-500 animate-pulse" />
      )}
    </Button>
  );
};

const Info = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full size-8">
          <InfoIcon className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="rounded-none" alignOffset={10} sideOffset={20}>
      Both the Recordings and Transcripts of the call can be found in the history section.
       </PopoverContent>
    </Popover>
  );
};
