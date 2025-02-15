"use client"

import { useActionState } from 'react';
import Link from 'next/link';
import { signup } from '@/actions/signUp';

export default function Signup() {
    const [state, action, pending] = useActionState(signup, undefined)

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-black">
                <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
                <form action={action} className="space-y-4 text-black">
                    {/* Name and Surname */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name and Surname
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder='Asep Albawali'
                            required
                        />
                    </div>
                    {state?.errors?.name && <p className='text-red-400 text-sm'>{state.errors.name}</p>}

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

                    {/* ID Number */}
                    <div>
                        <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700">
                            ID Number
                        </label>
                        <input
                            type="text"
                            id="idNumber"
                            name="idNumber"
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder='12345678912'
                            required
                        />
                    </div>
                    {state?.errors?.idNumber && <p className='text-red-400 text-sm'>{state.errors.idNumber}</p>}

                    {/* City Dropdown */}
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            Region
                        </label>
                        <select
                            id="city"
                            name="city"
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="" disabled>
                                Select a Region
                            </option>
                            <option value="CANKAYA">Çankaya</option>
                            <option value="ALTINDAG">Altındağ</option>
                            <option value="MAMAK">Mamak</option>
                            <option value="KECIOREN">Keçioren</option>
                            <option value="YENIMAHALLE">Yenimahalle</option>
                        </select>
                    </div>
                    {state?.errors?.city && <p className='text-red-400 text-sm'>{state.errors.city}</p>}

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
                    {state?.errors?.password && (
                        <div className='text-red-400 text-sm'>
                            <p>Password must:</p>
                            <ul>
                                {state.errors.password.map((error) => (
                                    <li key={error}>- {error}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Link to Login Page */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link href="/login" className="text-blue-500 hover:underline">
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}