'use client';

import { useState } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from 'next/navigation';
import { getAuthCredentials, setAuthCredentials } from '@/utils/auth-utils';
import axios from 'axios';
import { Routes } from '@/config/routes';
import { customSuccess } from '@/components/Common/Toast';

// Define Validation Schema with Yup
const schema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const LoginPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const router = useRouter();
    const { token } = getAuthCredentials();

    // Hook Form Setup
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        console.log("Login Successful:", data);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/user/login`,
                {
                    businessEmail: data.email,
                    password: data.password
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.status === 200) {
                customSuccess("Successfully Login.");
                localStorage.clear();
                sessionStorage.clear();
                const responseData = response.data;

                console.log(responseData.data);

                // Example actions after successful login
                if (responseData.data.ifVerified === false) {
                    alert("no verifed yet")
                } else if (responseData.data.userLoginToken) {

                    setAuthCredentials(responseData.data.userLoginToken, responseData.data.refreshToken);
                    // customToast.success("Logged in successfully.");
                    router.push(Routes.Dashboard);
                }
            }
        } catch (error) {
            if (error.response) {
                console.error("Sign in failed:", error.response.data);
                // Example error handling
                // customToast.error(error.response.data.message || "Sign in failed. Please try again.");
                // if (error.response.data.data && !error.response.data.data.if_verified) {
                //     router.push(Routes.VerifyEmail + "?email=" + data.email);
                // }
            } else if (error.request) {
                console.error("No response received from the server", error.request);
            } else {
                console.error("Request error:", error.message);
            }
        }
    };

    return (
        <div className='relative text-black bg-white w-screen h-screen overflow-hidden flex justify-around '>
            {/* <div className='absolute -top-20 md:-top-96 -left-36 w-1/2 h-[200%] bg-pink-400 z-10 purple-50 transform rotate-12' /> */}

            <div className='w-full z-20 md:w-[600px] mx-[20px] p-[1px] m-auto min-h-[50%] rounded-xl bg-neutral-200   group '>
                <div className="flex items-center rounded-xl justify-center bg-white">
                    <div className=" p-8 rounded-xl shadow-lg w-full">
                        <div className="flex flex-col items-center mb-6">
                            <img src='/assets/logo.png' alt="UI Unicorn" className="w-12 h-12" />
                            <h2 className="text-2xl font-semibold text-gray-900 mt-2">Welcome Back to Mapospace</h2>
                            <p className="text-l text-gray-500 mt-2">Unlock the power of location data for your business</p>
                        </div>

                        {/* Form with validation */}
                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Login</label>
                                <input
                                    type="text"
                                    placeholder="Email or phone number"
                                    className="w-full mt-1 px-4 py-2 border rounded-md border-gray-300 border-effect "
                                    {...register("email")}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>

                            {/* Password Field */}
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    placeholder="Enter password"
                                    className="w-full mt-1 px-4 py-2 border rounded-md border-gray-300 border-effect "
                                    {...register("password")}
                                />
                                <button
                                    type="button"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    className="absolute right-2 top-9 text-gray-600"
                                >
                                    {passwordVisible ?
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>

                                    }
                                </button>
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                            </div>

                            {/* Remember me & Forgot Password */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <input type="checkbox" id="remember" className="mr-2" />
                                    <label htmlFor="remember" className="text-sm text-gray-700">Remember me</label>
                                </div>
                                <a href="#" className="text-sm text-secondary-900 hover:underline">Forgot password?</a>
                            </div>

                            {/* Sign-in Button */}
                            <button type="submit" className="w-full default-button transition">
                                Sign in
                            </button>
                        </form>

                        {/* Google Sign-In */}
                        <div className="mt-4">
                            <button className="w-full flex items-center justify-center bg-gray-800 text-white py-m rounded-md hover:bg-gray-900">
                                <FcGoogle className="mr-2" /> Sign in with Google
                            </button>
                        </div>

                        {/* Sign Up Navigation */}
                        <p className="text-sm text-center text-gray-600 mt-4">
                            Don't have an account?
                            <button onClick={() => router.push("/sign-up")} className="text-secondary-900 hover:underline ml-1">
                                Sign up now
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
