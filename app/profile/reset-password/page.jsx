'use client'
import { customError, customSuccess } from '@/components/Common/Toast';
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { RemoveAuthCredentials } from '@/utils/auth-utils';
import AuthServices from '@/utils/axios-api';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter()
    const validatePassword = (password) => {
        const minLength = /.{8,}/;
        const uppercase = /[A-Z]/;
        const lowercase = /[a-z]/;
        const number = /[0-9]/;
        const symbol = /[!@#$%^&*(),.?":{}|<>]/;
        return (
            minLength.test(password) &&
            uppercase.test(password) &&
            lowercase.test(password) &&
            number.test(password) &&
            symbol.test(password)
        );
    };

    const handleResetPassword = () => {
        if (!newPassword || !confirmPassword || !oldPassword) {
            customError('Both fields are required');
            return;
        }
        if (newPassword !== confirmPassword) {
            customError('Passwords do not match');
            return;
        }
        if (!validatePassword(newPassword)) {
            customError('Password must meet all the criteria');
            return;
        }

        // alert('Password reset successful');
        ResetPasswordHandler();
    };

    const ResetPasswordHandler = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.PasswordReset, {
                "currentPassword": oldPassword,
                "newPassword": newPassword
            });

            if (response?.error) {
                console.log(response)
                customError(response.message || "Failed to fetch data.");
                return;
            }
            console.log("PerformClusteringHandler", response?.data);
            customSuccess("Password Reset Successfully.")
            router.push('/sign-in')
            RemoveAuthCredentials()

        } catch (err) {
            console.error("Error fetching user details:", err);

        }
    }

    return (
        <div className=" bg-white  w-full flex flex-col rounded-lg overflow-hidden pb-2xl ">
            <div className='text-black font-normal text-f-4xl border-b pb-m mb-xl'>
                Reset Password
            </div>
            <div className="bg-white w-full  pb-xl px-xs">
                <p className="text-gray-600 text-start text-f-l mb-m">
                    Just type it twice and try not to forget it.
                </p>
                <div className="text-sm text-gray-700 mb-4  max-w-screen-sm">
                    <p className='text-f-l'>Password should be and must contain:</p>
                    <div className="flex justify-between text-center mt-2 text-f-m font-medium">
                        <div>
                            <span className="font-bold">8+</span>
                            <p className='text-f-m'>Character</p>
                        </div>
                        <div>
                            <span className="font-bold">AA</span>
                            <p className='text-f-m' >Uppercase</p>
                        </div>
                        <div>
                            <span className="font-bold">aa</span>
                            <p className='text-f-m'>Lowercase</p>
                        </div>
                        <div>
                            <span className="font-bold">123</span>
                            <p className='text-f-m'>Number</p>
                        </div>
                        <div>
                            <span className="font-bold">@$#</span>
                            <p>Symbol</p>
                        </div>
                    </div>
                </div>
                <div className="mb-xl  max-w-screen-sm">
                    <div className="text-sm font-medium pb-xs text-gray-700">Old Password</div>
                    <div className="relative ">
                        <input
                            type='text'
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="  w-full px-s py-s text-neutral-1200  border-effect"
                            placeholder="••••••••"
                        />
                        {/* <button
                            type="button"
                            className="absolute inset-y-0 right-3 flex items-center text-neutral-1200 "
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {!showNewPassword ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>}
                        </button> */}
                    </div>
                </div>
                <div className="mb-xl  max-w-screen-sm">
                    <div className="text-sm font-medium pb-xs text-gray-700">New Password</div>
                    <div className="relative ">
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="  w-full px-s py-s text-neutral-1200  border-effect"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-3 flex items-center text-neutral-1200 "
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {!showNewPassword ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>}
                        </button>
                    </div>
                </div>
                <div className="mb-xl  max-w-screen-sm">
                    <div className="text-sm font-medium text-gray-700 pb-xs ">Confirm Password</div>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="  w-full px-s py-s text-neutral-1200  border-effect"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-3 flex items-center text-neutral-1200"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {!showConfirmPassword ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>}
                        </button>
                    </div>
                </div>
                <div className='flex'>
                    <button
                        className="px-4xl default-button  text-white font-medium py-s rounded-bs"
                        onClick={handleResetPassword}
                    >
                        Reset Password
                    </button>
                </div>


            </div>
        </div>
    )
}

export default page