"use client";
import { User } from "@heroui/react";

const UserInformation = ({
  username,
  firsName,
  LastName,
}: {
  username: string;
  firsName: string;
  LastName: string;
}) => {
  return (
    <div className="h-full  flex items-center">
      <User
        dir="ltr"
        avatarProps={{
          src: "/images/auth/avatar.webp",
        }}
        description={`${firsName} ${LastName}`}
        name={username}
      />
    </div>
  );
};

export default UserInformation;
