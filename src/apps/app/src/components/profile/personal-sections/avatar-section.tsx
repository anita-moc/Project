'use client';
import { authClient } from '@helsa/auth/client';
import { upload } from '@helsa/storage';
import { createClient } from '@helsa/supabase/client';
import { Button } from '@helsa/ui/components/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Form, FormControl, FormField, FormItem } from '@helsa/ui/components/form';
import AvatarInput from '@helsa/ui/components/internal/avatar-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useSession } from '../../auth/session-provider';

const formSchema = z.object({
  image: z.string().optional(),
});

type AvatarSectionValues = z.infer<typeof formSchema>;
const AvatarSection = () => {
  const { user } = useSession();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { image: user.image ?? '' },
  });
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();
  const onSubmit = async (_values: AvatarSectionValues) => {
    if (avatarFile) {
      const supabase = createClient();
      const res = await upload(supabase, {
        file: avatarFile,
        path: ['avatars', avatarFile.name],
        bucket: 'profiles',
      });
      if (res) {
        await authClient.updateUser({ image: res });
      }
      toast.success('Avatar updated successfully');
      router.refresh();
    }
  };
  return (
    <Card className="rounded-none bg-transparent">
      <Form {...form}>
        <form action="" onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle>Avatar</CardTitle>
              <p className="text-muted-foreground text-sm mt-3">
              This is your avatar. Click the avatar to upload a photo from your files.
              </p>
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="">
                  <FormControl>
                    <AvatarInput
                      onChange={(url) => {
                        field.onChange(url);
                      }}
                      value={field.value || ''}
                      onSelectFile={(file: File) => setAvatarFile(file)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardHeader>
          <CardFooter className="border-t pt-4 flex justify-between items-start gap-2 md:items-center flex-col md:flex-row">
            <p className="text-muted-foreground text-xs">An avatar is optional but highly recommended.</p>
            <Button disabled={!isValid || isSubmitting} type="submit" className="rounded-none">
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default AvatarSection;
