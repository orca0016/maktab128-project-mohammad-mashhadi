import { cookies } from "next/headers";
import Link from "next/link";

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
      <div>
        <Link href="/login">Login</Link>
        <Link href="/sign-up">Sign up</Link>
      </div>
    );
  }

  const user: IResponseUserData | undefined = await fetch(
    `http://localhost:3000/api/user/${userDetail.id}`
  ).then((res) => res.json());

  console.log(user);

  return <div>
    {user?.data.user.username}
  </div>;
};

export default AuthorizeUserAction;
