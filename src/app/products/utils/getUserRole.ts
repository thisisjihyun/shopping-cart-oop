import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getUserRole() {
  const session = await getServerSession(authOptions);
    return "admin";
  // return session?.user?.role || "customer"; // fallback role
}
