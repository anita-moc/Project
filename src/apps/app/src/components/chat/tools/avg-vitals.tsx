import { Tooltip, TooltipContent, TooltipTrigger } from '@helsa/ui/components/tooltip';
import { Activity, Droplet, Heart, TreesIcon as Lungs, Scale, Thermometer } from 'lucide-react';
import { BotCard } from '../messages';

const vitalsData = {
  weight: {
    icon: <Scale className="w-5 h-5" />,
    label: 'Weight',
    unit: 'kg',
    normalRange: {
      label: '18.5-24.9 BMI',
      min: 18.5,
      max: 24.9,
    },
    isNormal: true,
  },
  temperature: {
    icon: <Thermometer className="w-5 h-5" />,
    label: 'Temperature',
    unit: '°C',
    normalRange: {
      label: '36.1-37.2',
      min: 36.1,
      max: 37.2,
    },
    isNormal: true,
  },
  bloodPressure: {
    icon: <Droplet className="w-5 h-5" />,
    label: 'Blood pressure',
    unit: 'mmHg',
    normalRange: {
      label: '120/80',
      min: 120,
      max: 80,
    },
    isNormal: true,
  },
  heartRate: {
    icon: <Heart className="w-5 h-5" />,
    label: 'Heart rate',
    unit: 'bpm',
    normalRange: {
      label: '60-100',
      min: 60,
      max: 100,
    },
    isNormal: true,
  },
  respiratoryRate: {
    icon: <Lungs className="w-5 h-5" />,
    label: 'Respiratory rate',
    unit: 'rpm',
    normalRange: {
      label: '12-20',
      min: 12,
      max: 20,
    },
    isNormal: true,
  },
  oxygenSaturation: {
    icon: <Activity className="w-5 h-5" />,
    label: 'Oxygen saturation',
    unit: '%',
    normalRange: {
      label: '95-100',
      min: 95,
      max: 100,
    },
    isNormal: true,
  },
};

const isInBetween = (value: number, min: number, max: number) => value >= min && value <= max;

const AvgVitals = ({
  vitals,
}: {
  vitals: {
    weight: number;
    temperature: number;
    bloodPressure: number;
    heartRate: number;
    respiratoryRate: number;
    oxygenSaturation: number;
  };
}) => {
  return (
    <BotCard>
      <p className="text-md">These are the average values of your Vital signs</p>
      <div className="grid grid-cols-2 gap-4 w-2/3">
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div
                className={`p-2 rounded-full ${
                  isInBetween(vitals.weight, vitalsData.weight.normalRange.min, vitalsData.weight.normalRange.max)
                    ? 'bg-primary/10 text-primary'
                    : 'bg-destructive/10 text-destructive'
                }`}
              >
                {vitalsData.weight.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{vitalsData.weight.label}</p>
                <p className="text-2xl font-semibold">
                  {vitals.weight}
                  <span className="text-base font-normal text-muted-foreground ml-1">{vitalsData.weight.unit}</span>
                </p>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Normal range: {vitalsData.weight.normalRange.label}</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div
                className={`p-2 rounded-full ${
                  isInBetween(
                    vitals.temperature,
                    vitalsData.temperature.normalRange.min,
                    vitalsData.temperature.normalRange.max
                  )
                    ? 'bg-primary/10 text-primary'
                    : 'bg-destructive/10 text-destructive'
                }`}
              >
                {vitalsData.temperature.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{vitalsData.temperature.label}</p>
                <p className="text-2xl font-semibold">
                  {vitals.temperature}
                  <span className="text-base font-normal text-muted-foreground ml-1">
                    {vitalsData.temperature.unit}
                  </span>
                </p>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Normal range: {vitalsData.temperature.normalRange.label}</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div
                className={`p-2 rounded-full ${
                  isInBetween(
                    vitals.bloodPressure,
                    vitalsData.bloodPressure.normalRange.min,
                    vitalsData.bloodPressure.normalRange.max
                  )
                    ? 'bg-primary/10 text-primary'
                    : 'bg-destructive/10 text-destructive'
                }`}
              >
                {vitalsData.bloodPressure.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{vitalsData.bloodPressure.label}</p>
                <p className="text-2xl font-semibold">
                  {vitals.bloodPressure}
                  <span className="text-base font-normal text-muted-foreground ml-1">
                    {vitalsData.bloodPressure.unit}
                  </span>
                </p>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Normal range: {vitalsData.bloodPressure.normalRange.label}</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div
                className={`p-2 rounded-full ${
                  isInBetween(
                    vitals.heartRate,
                    vitalsData.heartRate.normalRange.min,
                    vitalsData.heartRate.normalRange.max
                  )
                    ? 'bg-primary/10 text-primary'
                    : 'bg-destructive/10 text-destructive'
                }`}
              >
                {vitalsData.heartRate.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{vitalsData.heartRate.label}</p>
                <p className="text-2xl font-semibold">
                  {vitals.heartRate}
                  <span className="text-base font-normal text-muted-foreground ml-1">{vitalsData.heartRate.unit}</span>
                </p>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Normal range: {vitalsData.heartRate.normalRange.label}</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div
                className={`p-2 rounded-full ${
                  isInBetween(
                    vitals.respiratoryRate,
                    vitalsData.respiratoryRate.normalRange.min,
                    vitalsData.respiratoryRate.normalRange.max
                  )
                    ? 'bg-primary/10 text-primary'
                    : 'bg-destructive/10 text-destructive'
                }`}
              >
                {vitalsData.respiratoryRate.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{vitalsData.respiratoryRate.label}</p>
                <p className="text-2xl font-semibold">
                  {vitals.respiratoryRate}
                  <span className="text-base font-normal text-muted-foreground ml-1">
                    {vitalsData.respiratoryRate.unit}
                  </span>
                </p>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Normal range: {vitalsData.respiratoryRate.normalRange.label}</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div
                className={`p-2 rounded-full ${
                  isInBetween(
                    vitals.oxygenSaturation,
                    vitalsData.oxygenSaturation.normalRange.min,
                    vitalsData.oxygenSaturation.normalRange.max
                  )
                    ? 'bg-primary/10 text-primary'
                    : 'bg-destructive/10 text-destructive'
                }`}
              >
                {vitalsData.oxygenSaturation.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{vitalsData.oxygenSaturation.label}</p>
                <p className="text-2xl font-semibold">
                  {vitals.oxygenSaturation}
                  <span className="text-base font-normal text-muted-foreground ml-1">
                    {vitalsData.oxygenSaturation.unit}
                  </span>
                </p>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Normal range: {vitalsData.oxygenSaturation.normalRange.label}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </BotCard>
  );
};

export default AvgVitals;
