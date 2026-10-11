'use server'

import bcrypt from 'bcryptjs'
import { isValidObjectId } from 'mongoose'
import { dbconnect } from '@/lib/mongo'
import { authorizeAdminAction } from '@/lib/currentUser'
import { createAccount, passwordError, ROLES } from '@/lib/accounts'
import User from '@/models/User'
import CaseAttempt from '@/models/CaseAttempt'
import CasePrep from '@/models/CasePrep'

export async function createUser(values) {
    const { denied } = await authorizeAdminAction();
    if (denied) return denied;

    const { error } = await createAccount({
        name: values?.name,
        email: values?.email,
        password: values?.password,
        role: ROLES.includes(values?.role) ? values.role : 'student',
    });
    if (error) return { success: false, message: error };
    return { success: true };
}

export async function resetPassword(userId, password) {
    const { denied } = await authorizeAdminAction();
    if (denied) return denied;
    if (!isValidObjectId(userId)) return { success: false, message: 'User not found.' };

    const invalidPassword = passwordError(password);
    if (invalidPassword) return { success: false, message: invalidPassword };

    await dbconnect();
    const result = await User.updateOne({ _id: userId }, { $set: { password: await bcrypt.hash(password, 12) } });
    if (!result.matchedCount) return { success: false, message: 'User not found.' };
    return { success: true };
}

export async function setUserRole(userId, role) {
    const { admin, denied } = await authorizeAdminAction();
    if (denied) return denied;
    if (!isValidObjectId(userId) || !ROLES.includes(role)) return { success: false, message: 'Invalid request.' };
    // Stops admins from accidentally locking themselves out
    if (admin._id.toString() === userId) return { success: false, message: "You can't change your own role." };

    await dbconnect();
    const result = await User.updateOne({ _id: userId }, { $set: { role } });
    if (!result.matchedCount) return { success: false, message: 'User not found.' };
    return { success: true };
}

export async function deleteUser(userId) {
    const { admin, denied } = await authorizeAdminAction();
    if (denied) return denied;
    if (!isValidObjectId(userId)) return { success: false, message: 'User not found.' };
    if (admin._id.toString() === userId) return { success: false, message: "You can't delete your own account." };

    await dbconnect();
    const result = await User.deleteOne({ _id: userId });
    if (!result.deletedCount) return { success: false, message: 'User not found.' };
    // Remove the student's attempts and case preparation along with the account
    await Promise.all([
        CaseAttempt.deleteMany({ user: userId }),
        CasePrep.deleteMany({ user: userId }),
    ]);
    return { success: true };
}
