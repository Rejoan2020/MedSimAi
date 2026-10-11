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

    const average = (user) => user.averageScore === null ? '–' : `${user.averageScore}%`

    const roleSelect = (user, isSelf) => (
        <select
            value={user.role}
            disabled={isSelf || isBusy}
            aria-label={`Role for ${user.email}`}
            onChange={(e) => run(() => setUserRole(user._id, e.target.value), `${user.email} is now ${e.target.value === 'admin' ? 'an admin' : 'a student'}.`)}
            className='rounded border border-gray-300 px-2 py-1 disabled:opacity-60'
        >
            <option value='student'>Student</option>
            <option value='admin'>Admin</option>
        </select>
    )

    const userActions = (user, isSelf) => (
        <div className='flex gap-4'>
            <button onClick={() => handleResetPassword(user)} disabled={isBusy} className='text-light-blue hover:underline cursor-pointer disabled:opacity-50'>Reset password</button>
            {!isSelf &&
                <button onClick={() => handleDelete(user)} disabled={isBusy} className='text-red-600 hover:underline cursor-pointer disabled:opacity-50'>Delete</button>}
        </div>
    )

    return (
        <div className='flex flex-col gap-6'>
            <form
                onSubmit={(e) => { e.preventDefault(); run(() => createUser(form), `Account created for ${form.email.trim().toLowerCase()}.`, () => setForm(emptyForm)) }}
                className='flex flex-col gap-4 rounded-2xl border border-brand-secondary bg-white p-4 sm:p-6'
            >
                <div className='font-medium text-deep-blue'>New account</div>
                <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
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
                    <button type='submit' disabled={isBusy} className='ml-auto rounded-full bg-light-blue px-4 py-2 text-sm text-white disabled:opacity-50'>
                        {isBusy ? 'Working...' : 'Create account'}
                    </button>
                </div>
            </form>


            <div className='rounded-2xl border border-brand-secondary bg-white'>
                {/* Cards on small screens */}
                <ul className='divide-y divide-gray-100 md:hidden'>
                    {users.map((user) => {
                        const isSelf = user._id === currentUserId
                        return (
                            <li key={user._id} className='flex flex-col gap-3 p-4'>
                                <div className='min-w-0'>
                                    <div className='font-medium'>{user.name}{isSelf && <span className='font-normal text-gray-500'> (you)</span>}</div>
                                    <div className='truncate text-sm text-Secondary-Text'>{user.email}</div>
                                    <div className='text-sm text-Secondary-Text'>{user.attempts} {user.attempts === 1 ? "attempt" : "attempts"} · Avg {average(user)}</div>
                                </div>
                                <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-sm'>
                                    {roleSelect(user, isSelf)}
                                    {userActions(user, isSelf)}
                                </div>
                            </li>
                        )
                    })}
                </ul>

                {/* Table from md up */}
                <table className='hidden w-full text-left text-sm md:table'>
                    <thead className='border-b border-gray-100 text-Secondary-Text'>
                        <tr>
                            <th className='px-6 py-3 font-normal'>Name</th>
                            <th className='px-3 py-3 font-normal'>Email</th>
                            <th className='px-3 py-3 font-normal'>Role</th>
                            <th className='px-3 py-3 font-normal'>Attempts</th>
                            <th className='px-3 py-3 font-normal'>Avg score</th>
                            <th className='px-6 py-3 font-normal'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            const isSelf = user._id === currentUserId
                            return (
                                <tr key={user._id} className='border-b border-gray-100 last:border-0'>
                                    <td className='px-6 py-3'>{user.name}{isSelf && <span className='text-gray-500'> (you)</span>}</td>
                                    <td className='px-3 py-3'>{user.email}</td>
                                    <td className='px-3 py-3'>{roleSelect(user, isSelf)}</td>
                                    <td className='px-3 py-3'>{user.attempts}</td>
                                    <td className='px-3 py-3'>{average(user)}</td>
                                    <td className='px-6 py-3'>{userActions(user, isSelf)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
