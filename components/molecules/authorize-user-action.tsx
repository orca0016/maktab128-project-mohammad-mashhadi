import { cookies } from "next/headers";
import UserAccessMenu from "../atoms/user-access-menu";
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
    return <UserAccessMenu />;
  }

  const user: IResponseUserData = await fetch(
    `http://localhost:3000/api/user/${userDetail.id}`
  ).then((res) => res.json());

  return (
    <div>
      <UserAccessMenu loginData={user} />
    </div>
  );
};

export default AuthorizeUserAction;
