import { Card, CardContent, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { HeartPulse } from 'lucide-react';

const BloodPressure = () => {
  return (
    <Card className="rounded-none w-1/4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-medium">120/80 mmHg</CardTitle>
        <HeartPulse />
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">Blood Pressure</p>
      </CardContent>
    </Card>
  );
};

export default BloodPressure;
