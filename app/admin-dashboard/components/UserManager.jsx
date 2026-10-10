'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createUser, deleteUser, resetPassword, setUserRole } from '@/app/actions/adminUsers'

const inputClass = 'w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-light-blue'
const emptyForm = { name: '', email: '', password: '', role: 'student' }

export default function UserManager({ users, currentUserId }) {
    const router = useRouter()
    const [form, setForm] = useState(emptyForm)
    const [isBusy, setIsBusy] = useState(false)
    const [message, setMessage] = useState(null)

    async function run(action, successText, after) {
        setIsBusy(true)
        setMessage(null)
        try {
            const result = await action()
            if (!result.success) throw new Error(result.message)
            after?.()
            if (successText) setMessage({ ok: true, text: successText })
            router.refresh()
        } catch (err) {
            setMessage({ ok: false, text: err.message || 'Something went wrong. Please try again.' })
        } finally {
            setIsBusy(false)
        }
    }

    function handleResetPassword(user) {
        const password = prompt(`New password for ${user.email} (at least 8 characters):`)
        if (password === null) return
        run(() => resetPassword(user._id, password), `Password updated for ${user.email}.`)
    }

    function handleDelete(user) {
        const attempts = user.attempts
            ? ` This also deletes their ${user.attempts} case attempt${user.attempts === 1 ? '' : 's'} and results.`
            : ''
        if (!confirm(`Delete ${user.email}?${attempts} This can't be undone.`)) return
        run(() => deleteUser(user._id), `${user.email} was deleted.`)
    }

    const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

    return (
        <div className='flex flex-col gap-6'>
            <form
                onSubmit={(e) => { e.preventDefault(); run(() => createUser(form), `Account created for ${form.email.trim().toLowerCase()}.`, () => setForm(emptyForm)) }}
                className='flex flex-col gap-4 rounded-xl border border-[#F0F4FE] p-4'
            >
                <div className='font-medium text-[#2536A8]'>New account</div>
                <div className='grid gap-4 md:grid-cols-4'>
                    <input value={form.name} onChange={set('name')} placeholder='Full name' required className={inputClass} />
                    <input value={form.email} onChange={set('email')} type='email' placeholder='Email' required className={inputClass} />
                    <input value={form.password} onChange={set('password')} type='password' placeholder='Password (8+ characters)' minLength={8} required autoComplete='new-password' className={inputClass} />
                    <select value={form.role} onChange={set('role')} className={inputClass}>
                        <option value='student'>Student</option>
                        <option value='admin'>Admin</option>
                    </select>
                </div>
                <div className='flex items-center gap-4'>
                    {message && <p className={`text-sm ${message.ok ? 'text-green-600' : 'text-red-600'}`}>{message.text}</p>}
                    <button type='submit' disabled={isBusy} className='ml-auto rounded-lg bg-light-blue px-4 py-2 text-sm text-white disabled:opacity-50'>
                        {isBusy ? 'Working...' : 'Create account'}
                    </button>
                </div>
            </form>

            <div className='overflow-x-auto rounded-xl border border-[#F0F4FE] p-4'>
                <table className='w-full text-left text-sm'>
                    <thead className='text-[#717680] border-b border-[#F0F4FE]'>
                        <tr>
                            <th className='py-2 pr-4 font-normal'>Name</th>
                            <th className='py-2 pr-4 font-normal'>Email</th>
                            <th className='py-2 pr-4 font-normal'>Role</th>
                            <th className='py-2 pr-4 font-normal'>Attempts</th>
                            <th className='py-2 pr-4 font-normal'>Avg score</th>
                            <th className='py-2 font-normal'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            const isSelf = user._id === currentUserId
                            return (
                                <tr key={user._id} className='border-b border-[#F0F4FE]'>
                                    <td className='py-2 pr-4'>{user.name}{isSelf && <span className='text-gray-500'> (you)</span>}</td>
                                    <td className='py-2 pr-4'>{user.email}</td>
                                    <td className='py-2 pr-4'>
                                        <select
                                            value={user.role}
                                            disabled={isSelf || isBusy}
                                            onChange={(e) => run(() => setUserRole(user._id, e.target.value), `${user.email} is now ${e.target.value === 'admin' ? 'an admin' : 'a student'}.`)}
                                            className='rounded border border-gray-300 px-2 py-1 disabled:opacity-60'
                                        >
                                            <option value='student'>Student</option>
                                            <option value='admin'>Admin</option>
                                        </select>
                                    </td>
                                    <td className='py-2 pr-4'>{user.attempts}</td>
                                    <td className='py-2 pr-4'>{user.averageScore === null ? '–' : `${user.averageScore}%`}</td>
                                    <td className='py-2'>
                                        <div className='flex gap-3'>
                                            <button onClick={() => handleResetPassword(user)} disabled={isBusy} className='text-light-blue hover:underline cursor-pointer disabled:opacity-50'>Reset password</button>
                                            {!isSelf &&
                                                <button onClick={() => handleDelete(user)} disabled={isBusy} className='text-red-600 hover:underline cursor-pointer disabled:opacity-50'>Delete</button>}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
