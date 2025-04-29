'use client';

import { Card, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { useSession } from '../../auth/session-provider';

export const EmailSection = () => {
  const { user } = useSession();
  return (
    <Card className="rounded-none bg-transparent">
      <CardHeader className="">
        <div>
          <CardTitle>Email</CardTitle>
          <p className="text-muted-foreground text-sm mt-5">
          Your email address is private and will not be shared with anyone.
          </p>
          <p className="text-primary font-bold mt-3">{user.email}</p>
        </div>
      </CardHeader>
    </Card>
  );
};
