'use client';

import { Avatar } from "@/ui/components/Avatar";
import { TextField } from "@/ui/components/TextField";
import { useUser } from "@clerk/nextjs";

interface ProfileTabProps {
  user: ReturnType<typeof useUser>['user'];
  formData: {
    firstName: string;
    lastName: string;
    email: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export function ProfileTab({ user, formData, onInputChange }: ProfileTabProps) {
  return (
    <div className="p-4">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Avatar
            image={user?.imageUrl}
            size="large"
          >
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold text-default-font">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-sm text-subtext-color">{user?.emailAddresses?.[0]?.emailAddress}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <TextField label="First Name">
            <TextField.Input
              value={formData.firstName}
              onChange={(e) => onInputChange("firstName", e.target.value)}
            />
          </TextField>
          <TextField label="Last Name">
            <TextField.Input
              value={formData.lastName}
              onChange={(e) => onInputChange("lastName", e.target.value)}
            />
          </TextField>
        </div>

        <TextField label="Email" disabled>
          <TextField.Input
            value={formData.email}
            disabled
          />
        </TextField>
      </div>
    </div>
  );
} 