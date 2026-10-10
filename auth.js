import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { dbconnect } from "./lib/mongo";
import User from "./models/User";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {
                    type: "email",
                    label: "Email",
                    placeholder: "johndoe@gmail.com",
                },
                password: {
                    type: "password",
                    label: "Password",
                    placeholder: "*****",
                },
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                await dbconnect();

                // Emails are stored lowercase (see app/actions/adminUsers.js)
                const user = await User.findOne({
                    email: String(credentials.email).trim().toLowerCase(),
                });

                // Same response for unknown emails and wrong passwords, so sign-in
                // can't be used to discover which emails have accounts
                if (!user) {
                    return null;
                }

                const passwordValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!passwordValid) {
                    return null;
                }
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email
                };
            },
        })
    ],
})

