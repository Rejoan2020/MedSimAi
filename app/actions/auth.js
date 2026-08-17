'use server'

import { signIn, signOut } from "@/auth";

async function signin(formData) { 
    await signIn("credentials",
        { email: formData.get('email'), password: formData.get('password'), redirectTo: '/dashboard', })
}

async function logout() {
    await signOut({
        redirectTo: '/signin',
    })
}

export { signin, logout };