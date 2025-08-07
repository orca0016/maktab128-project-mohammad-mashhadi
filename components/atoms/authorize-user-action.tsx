import { Button } from "@heroui/react";
import { cookies } from "next/headers";
import Link from "next/link";
import UserInformation from "./user-information";

const AuthorizeUserAction = async () => {
  const cookieStore = await cookies();
  const userDetail: { id?: string; role?: string } = await fetch(
    "http://localhost:8000/api/users/me",
    {
      headers: {
        Authorization: `Bearer ${cookieStore.get("access-token")?.value}`,
      },
    }
  ).then((res) => res.json());
  console.log(userDetail);

  if (!userDetail.id) {
    return (
      <div className="flex gap-x-2 ">
        <Link href="/sign-up">ثبت نام</Link>
        <span>/</span>
        <Link href="/login">وارد شوید</Link>
      </div>
    );
  }

  const user: IResponseUserData = await fetch(
    `http://localhost:3000/api/user/${userDetail.id}`
  ).then((res) => res.json());

  console.log(user);

  return (
    <div>
      <UserInformation
        LastName={user.data.user.lastname}
        firsName={user.data.user.firstname}
        username={user.data.user.username}
      />
    </div>
  );
};

export default AuthorizeUserAction;
