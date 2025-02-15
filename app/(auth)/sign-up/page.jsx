'use client';

import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { FcGoogle } from "react-icons/fc";
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

const page = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [contiune, setContiune] = useState(false)
    const router = useRouter();

    const submitHandler = () => {
        if (!contiune) {
            setContiune(true)
        }
    }
    return (
        <div className='relative text-black w-screen h-screen overflow-hidden flex justify-around bg-white'>
            {/* <div className='absolute -top-20 md:-top-96 -left-36 w-1/2 h-[200%] bg-pink-400 z-10 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-50 transform rotate-12' /> */}
            <div className='w-full z-20 md:w-[600px] mx-[20px] p-[1px] m-auto min-h-[50%] rounded-xl bg-neutral-200  group '>
                <div className="flex items-center rounded-xl justify-center   group-hover:">
                    <div className="bg-white p-8 rounded-xl shadow-lg w-full">
                        <div className="flex flex-col items-center mb-6">
                            <img src="/assets/logo.png" alt="UI Unicorn" className="w-12 h-12" />
                            <h2 className="text-2xl font-semibold text-gray-900 mt-2">Welcome to Mapospace</h2>
                            <p className="text-l  text-gray-500 mt-2">Unlock the power of location data for your business</p>
                        </div>
                        <div className='space-y-m'>
                            <div className={clsx('flex ', contiune ? "flex-row space-y-0 gap-m" : "space-y-m flex-col gap-0")}>
                                <div className='flex flex-1 flex-col'>
                                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                                    <input type="text" placeholder="Enter your first name" className="w-full mt-1 px-4 py-2 border rounded-md border-effect " />
                                </div>

                                <div className='flex flex-1 flex-col'>
                                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                    <input type="text" placeholder="Enter your last name" className="w-full mt-1 px-4 py-2 border rounded-md border-effect " />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="text" placeholder="Email or phone number" className="w-full mt-1 px-4 py-2 border rounded-md border-effect " />
                            </div>
                        </div>
                        {contiune && <div className='space-y-m mt-m'>
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input type={passwordVisible ? 'text' : 'password'} placeholder="Enter password" className="w-full mt-1 px-4 py-2 border rounded-md border-effect" />
                                <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-9 text-gray-600">
                                    {/* {passwordVisible ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />} */}
                                </button>
                            </div>
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <input type={passwordVisible ? 'text' : 'password'} placeholder="Enter password" className="w-full mt-1 px-4 py-2 border rounded-md border-effect" />
                                <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-9 text-gray-600">
                                    {/* {passwordVisible ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />} */}
                                </button>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <input type="checkbox" id="remember" className="mr-2" />
                                    <label htmlFor="remember" className="text-sm text-gray-700">I agree to the <button className="text-secondary-900 hover:underline">terms and conditions
                                    </button></label>
                                </div>
                            </div>
                        </div>
                        }





                        <button className="w-full default-button mt-xl" onClick={submitHandler}>{contiune ? "Sign up" : "Continue"}</button>
                        {/* </form> */}

                        <div className="mt-4">
                            <button className="w-full flex items-center justify-center bg-gray-800 text-white py-m rounded-md hover:bg-gray-900">
                                <FcGoogle /> <span className='ml-2'>Or sign in with Google</span>
                            </button>
                        </div>

                        <p className="text-sm text-center text-gray-600 mt-4">Already have an account? <button onClick={() => { router.push('/sign-in') }} className="text-secondary-900 hover:underline">Login</button></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page