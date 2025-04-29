'use client';

import { authClient } from '@helsa/auth/client';
import { useTheme } from '@helsa/ui';
import { Avatar, AvatarFallback, AvatarImage } from '@helsa/ui/components/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@helsa/ui/components/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@helsa/ui/components/select';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@helsa/ui/components/sidebar';
import { Bell, LogOut, MoreVerticalIcon, Sparkles, SunMoon, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from '../auth/session-provider';

export function NavUser() {
  const { user } = useSession();
  const router = useRouter();
  const onClick = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/sign-in');
        },
      },
    });
  };
  const { isMobile } = useSidebar();
  const { setTheme, theme } = useTheme();
  const changeTheme = (theme: string) => {
    setTheme(theme);
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)]/60 dark:hover:bg-indigo-600 hover:text-white text-white"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.image ?? ''} alt={user.name} className="object-contain" />
                <AvatarFallback className="rounded-lg">
                  <User className="size-4" />
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-gray-100">{user.email}</span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={'top'}
            align="start"
            sideOffset={8}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name || 'Jose Veliz'}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-2 text-sm rounded-sm cursor-pointer">
                <Sparkles className="size-4" />
                Upgrade to pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="gap-2 text-sm rounded-sm cursor-pointer"
                onClick={() => router.push('/profile')}
              >
                <User className="size-4" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem className="gap-2 text-sm rounded-sm cursor-pointer">
                <Bell className="size-4" />
                
              Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <div className="flex justify-between items-center gap-3 py-3 pr-3">
                <div className="ml-2 flex justify-start items-center gap-2">
                  <SunMoon className="size-4" />
                  Issue
                </div>
                <Select defaultValue={theme} onValueChange={changeTheme}>
                  <SelectTrigger className=" w-1/2 p-2 h-[25px]">
                    <SelectValue placeholder="select" />
                  </SelectTrigger>
                  <SelectContent className="">
                    <SelectItem value={'light'}>
                      <span className="flex w-full justify-between items-center gap-3">Light</span>
                    </SelectItem>
                    <SelectItem value={'dark'}>
                      <span className="flex w-full justify-between items-center gap-3">Dark</span>
                    </SelectItem>
                    <SelectItem value={'system'}>
                      <span className="flex w-full justify-between items-center gap-3">System</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-sm rounded-sm cursor-pointer" onClick={onClick}>
              <LogOut className="size-4" />
              LOG OUT
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
