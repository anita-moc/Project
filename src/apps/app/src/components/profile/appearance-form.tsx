'use client';

import { Card, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@helsa/ui/components/select';
import { useTheme } from 'next-themes';

export function AppearanceForm() {
  const { setTheme, theme } = useTheme();
  const changeTheme = (theme: string) => {
    setTheme(theme);
  };

  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle>Issue</CardTitle>
        <p className="text-muted-foreground text-sm mt-5">Customize the appearance of the application.</p>
        <Select defaultValue={theme} onValueChange={changeTheme}>
          <SelectTrigger className="rounded-none w-1/2 p-2">
            <SelectValue placeholder="select" />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            <SelectItem value={'light'} className="">
              Clear
            </SelectItem>
            <SelectItem value={'dark'}>Dark</SelectItem>
            <SelectItem value={'system'}>System</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
    </Card>
  );
}
