'use client';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
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
import { Separator } from '@helsa/ui/components/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@helsa/ui/components/tooltip';
import { cn } from '@helsa/ui/lib/utils';
import { motion } from 'framer-motion';
import {
  AudioLines,
  Mic,
  MicOff,
  PhoneIncoming,
  PhoneOff,
  Play,
  Settings,
  StopCircle,
  Video,
  VideoOff,
  Volume2,
} from 'lucide-react';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { CallProvider, useCallStore } from './provider';
import { CallState } from './store';
import { useCall } from './use-call';

type CallProps = {
  appointmentId: string;
};

const VideoCall = ({ appointmentId }: CallProps) => {
  return (
    <CallProvider>
      <div className="flex flex-col gap-2 col-span-6 h-full box-border max-md:col-span-1">
        <div className=" h-full flex-col flex gap-2 border">
          <VideoCallContainer appointmentId={appointmentId} />
        </div>
      </div>
    </CallProvider>
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

const VideoCallContainer = ({ appointmentId }: { appointmentId: string }) => {
  const { remoteParticipant, setRoomId, callState, setLocalParticipant, transcription } = useCallStore(
    (store) => store,
  );
  const [user] = useLocalStorage<any>('user', null);
  const [parent, setParent] = useState<any>('drop-1');

  const { createSocket, destroySocket } = useCall();
  useEffect(() => {
    createSocket();
    return () => {
      destroySocket();
    };
  }, []);
  useEffect(() => {
    setRoomId(appointmentId);
    setLocalParticipant({ id: user?.id ?? '', state: 'waiting' });
  }, [appointmentId]);
  const { joinCall } = useCall();
  if (callState === CallState.JOINED) {
    const localVideo = <LocalVideo />;
    const handleDragEnd = ({ over }: any) => {
      setParent(over?.id ?? 'drop-1');
    };
    return (
      <DndContext onDragEnd={handleDragEnd}>
        <div className="relative w-full flex-1">
          <DroppableContainer className="p-4 top-0 left-0 flex items-start justify-start" id="drop-1">
            {parent === 'drop-1' && localVideo}
          </DroppableContainer>
          <DroppableContainer className="p-4 top-0 right-0 flex items-start justify-end" id="drop-2">
            {parent === 'drop-2' && localVideo}
          </DroppableContainer>
          <DroppableContainer className="py-15 px-4 bottom-0 left-0 flex items-end justify-start" id="drop-3">
            {parent === 'drop-3' && localVideo}
          </DroppableContainer>
          <DroppableContainer className="py-15 px-4 bottom-0 right-0 flex items-end justify-end" id="drop-4">
            {parent === 'drop-4' && localVideo}
          </DroppableContainer>
          <RemoteVideo />
          <CallControls />
        </div>
      </DndContext>
    );
  }
  return (
    <div className="relative w-full flex-1">
      <div className="h-full w-full flex flex-col justify-center items-center gap-3">
        <p className="text-lg font-semibold">
          {remoteParticipant ? 'Te están esperando' : 'No hay nadie en la llamada'}
        </p>
        <Button
          onClick={(e) => {
            e.preventDefault();
            joinCall();
          }}
          className="rounded-full gap-3"
          variant={'outline'}
        >
          <PhoneIncoming className="size-4" />
          Enter
        </Button>
      </div>
    </div>
  );
};

const LocalVideo = () => {
  const { localStream, cameraEnable } = useCallStore((store) => store);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'local-video',
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: 10,
  };

  useEffect(() => {
    if (localStream && videoRef.current) {
      videoRef.current.srcObject = localStream;
    }
  }, [localStream, cameraEnable, videoRef.current]);

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {!cameraEnable ? (
        <div className="h-[125px] aspect-video bg-background border ">
          <div className="flex items-center justify-center h-full w-full">
            <VideoOff className="size-16" />
          </div>
        </div>
      ) : (
        <div className="h-[125px] aspect-video">
          <video ref={videoRef} className="object-cover" autoPlay muted />
        </div>
      )}
    </div>
  );
};

const RemoteVideo = () => {
  const { remoteStream, remoteParticipant, selectedOutputDevice } = useCallStore((store) => store);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = remoteStream;
      videoRef.current.setSinkId(selectedOutputDevice?.deviceId ?? 'default');
    }
  }, [remoteStream, remoteParticipant, videoRef.current, selectedOutputDevice]);

  if (!remoteParticipant) {
    return (
      <div className="flex h-full w-full justify-center items-center">
        <p className="text-lg font-semibold">Waiting for someone to join the call</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full aspect-video">
      <video ref={videoRef} className="object-cover aspect-video" autoPlay />
    </div>
  );
};

const CallControls = () => {
  const { micEnable, cameraEnable, isRecording, isTranscribing } = useCallStore((store) => store);
  const {
    toggleMicrophone,
    toggleCamera,
    leftCall,
    startRecording,
    stopRecording,
    startTranscription,
    stopTranscription,
  } = useCall();
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
                  'bg-destructive': !micEnable,
                })}
                onClick={() => {
                  toggleMicrophone();
                }}
              >
                {!micEnable ? <MicOff className="size-4" /> : <Mic className="size-4 text-primary" />}
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
                  'bg-destructive': !cameraEnable,
                })}
                onClick={() => {
                  toggleCamera();
                }}
              >
                {!cameraEnable ? <VideoOff className="size-4" /> : <Video className="size-4 text-primary" />}
              </Button>
            </TooltipTrigger>

            <TooltipContent sideOffset={15} className="text-[10px] px-2 py-1 rounded-sm font-medium">
              <p>Camera</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Separator orientation="vertical" />
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (isRecording) {
                    stopRecording();
                  } else {
                    startRecording();
                  }
                }}
              >
                {!isRecording ? <Play className="size-4" /> : <StopCircle className="size-4 text-primary" />}
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
                onClick={() => {
                  if (isTranscribing) {
                    stopTranscription();
                  } else {
                    startTranscription();
                  }
                }}
              >
                {!isTranscribing ? <AudioLines className="size-4" /> : <AudioLines className="size-4 text-red-500" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={15} className="text-[10px] px-2 py-1 rounded-sm font-medium">
              <p>Transcribe</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <ListDevices />
        <Separator orientation="vertical" className="mr-3 ml-2 h-4" />
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-8 h-6 ml-5 bg-destructive"
                onClick={leftCall}
              >
                <PhoneOff className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={15} className="text-[10px] px-2 py-1 rounded-sm font-medium">
              <p>Salir</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.div>
  );
};
const ListDevices = () => {
  const {
    videoDevices,
    audioDevices,
    selectedVideoDevice,
    selectedAudioDevice,
    outputDevices,
    selectedOutputDevice,
    setSelectedOutputDevice,
  } = useCallStore((store) => store);
  const { setVideoDevice, setAudioDevice } = useCall();
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
            <p>Settings</p> {/* translated */}
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent className="w-[300px] rounded-none" side="top" align="start">
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="gap-2">
                <div className="w-4 h-4 mr-2 flex justify-center items-center">
                  <Video />
                </div>
                <span className="text-sm">Select Camera</span> {/* translated */}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="rounded-none">
                  {videoDevices.map((device) => (
                    <DropdownMenuItem
                      className={cn('gap-2 rounded-none', {
                        'bg-secondary': selectedVideoDevice?.deviceId === device.deviceId,
                      })}
                      key={device.deviceId}
                      onClick={() => {
                        setVideoDevice(device);
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
                <span className="text-sm">Select Microphone</span> {/* translated */}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="rounded-none">
                  {audioDevices.map((device) => (
                    <DropdownMenuItem
                      className={cn('gap-2 rounded-none', {
                        'bg-secondary': selectedAudioDevice?.deviceId === device.deviceId,
                      })}
                      key={device.deviceId}
                      onClick={() => {
                        setAudioDevice(device);
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
                  <Volume2 />
                </div>
                <span className="text-sm">Select Speaker</span> {/* translated */}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="rounded-none">
                  {outputDevices.map((device) => (
                    <DropdownMenuItem
                      className={cn('gap-2 rounded-none', {
                        'bg-secondary': selectedOutputDevice?.deviceId === device.deviceId,
                      })}
                      key={device.deviceId}
                      onClick={() => {
                        setSelectedOutputDevice(device);
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
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
};

export default VideoCall;
