'use server'

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { adminExists, createAccount } from "@/lib/accounts";

// Signs in and redirects. Wrong credentials return an error message instead of throwing;
// the redirect after a successful sign-in is itself thrown, so other errors are re-thrown.
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

// Public sign-up always creates a student account
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

// Only allowed while no admin exists; later admins are added from the Users page
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

async function logout() {
    await signOut({
        redirectTo: '/signin',
    })
}

// Used on the admin login page to switch from a student account to an admin one
async function adminLogout() {
    await signOut({
        redirectTo: '/admin-dashboard/login',
    })
}

export { signin, signup, adminSignin, adminSignup, logout, adminLogout };
