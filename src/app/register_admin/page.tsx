"use client"

import { useActionState } from 'react';
import { registerAdmin } from '@/actions/registerAdmin';

export default function Login() {
    const [state, action, pending] = useActionState(registerAdmin, undefined)

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6">Resgister Admin</h1>
                <form action={action} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder='asepalbawali@example.com'
                            required
                        />
                    </div>
                    {state?.errors?.email && <p className='text-red-400 text-sm'>{state.errors.email}</p>}


                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder='*********'
                            required
                        />
                    </div>
                    {state?.errors?.password && <p className='text-red-400 text-sm'>{state.errors.password}</p>}

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={pending}
                            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}