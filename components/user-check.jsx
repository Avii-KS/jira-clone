import { checkUser } from "@/lib/checkUser";

export default async function UserCheck() {
  await checkUser();
  return null;
}
