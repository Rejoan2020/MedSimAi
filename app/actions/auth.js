'use server'

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { adminExists, createAccount } from "@/lib/accounts";
import { DEMO_ACCOUNTS, demoEnabled } from "@/lib/demo";

async function signInWith(email, password, redirectTo) {
    try {
        await signIn("credentials", { email, password, redirectTo });
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: "Incorrect email or password." };
        }
        throw error;
    }
}

async function signin(prevState, formData) {
    return signInWith(formData.get('email'), formData.get('password'), '/dashboard');
}

async function signup(prevState, formData) {
    const password = formData.get('password');
    if (password !== formData.get('confirmPassword')) {
        return { error: "Passwords don't match." };
    }

    const { error } = await createAccount({
        name: formData.get('name'),
        email: formData.get('email'),
        password,
        role: 'student',
    });
    if (error) return { error };

    return signInWith(formData.get('email'), password, '/dashboard');
}

async function adminSignin(prevState, formData) {
    return signInWith(formData.get('email'), formData.get('password'), '/admin-dashboard');
}

async function adminSignup(prevState, formData) {
    if (await adminExists()) {
        return { error: "An admin account already exists. Ask an admin to create your account from the Users page." };
    }

    const password = formData.get('password');
    if (password !== formData.get('confirmPassword')) {
        return { error: "Passwords don't match." };
    }

    const { error } = await createAccount({
        name: formData.get('name'),
        email: formData.get('email'),
        password,
        role: 'admin',
    });
    if (error) return { error };

    return signInWith(formData.get('email'), password, '/admin-dashboard');
}

async function demoSignin(prevState, formData) {
    const account = DEMO_ACCOUNTS[formData.get('role')];
    if (!account || !demoEnabled()) return { error: "The demo isn't available right now." };

    const result = await signInWith(account.email, process.env.DEMO_PASSWORD, account.redirectTo);
    if (result?.error) return { error: "The demo accounts haven't been set up yet." };
}

async function logout() {
    await signOut({
        redirectTo: '/signin',
    })
}

async function adminLogout() {
    await signOut({
        redirectTo: '/admin-dashboard/login',
    })
}

export { signin, signup, adminSignin, adminSignup, demoSignin, logout, adminLogout };
