import bcrypt from "bcryptjs";
import { dbconnect } from "@/lib/mongo";
import User from "@/models/User";

export async function createUser() {
  await dbconnect();

  const password = "asdf";

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name: "Test Student",
    email: "rejoan@gmail.com",
    password: hashedPassword, 
  });

  return user;
}