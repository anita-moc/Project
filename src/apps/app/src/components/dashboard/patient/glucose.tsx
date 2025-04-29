import { Card, CardContent, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Beaker } from 'lucide-react';

const Glucose = () => {
  return (
    <Card className="rounded-none w-1/4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-medium">60-70 mg/dL</CardTitle>
        <Beaker />
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">Blood glucose</p>
      </CardContent>
    </Card>
  );
};

export default Glucose;
