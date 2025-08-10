import { cookies } from "next/headers";
import UserAccessMenu from "../atoms/user-access-menu";

// export const dynamic = "force-dynamic";

const AuthorizeUserAction = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access-token")?.value;

  if (!token) {
    return <UserAccessMenu />;
  }

  const meRes = await fetch("http://localhost:8000/api/users/me", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!meRes.ok) {
    return <UserAccessMenu />;
  }

  const me: { id?: string; role?: string } = await meRes.json();
  if (!me?.id) {
    return <UserAccessMenu />;
  }

  const userRes = await fetch(`http://localhost:8000/api/users/${me.id}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!userRes.ok) {
    return <UserAccessMenu />;
  }

  const user: IResponseUserData = await userRes.json();

  return <UserAccessMenu loginData={user} />;
};

export default AuthorizeUserAction;
