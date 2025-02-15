"use client";
import { API_ENDPOINTS } from "@/utils/api-endpoints";
import AuthServices from "@/utils/axios-api";
import { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";

const ApiKeyGenerator = () => {
    const [apiKey, setApiKey] = useState(null);
    const [copied, setCopied] = useState(false);
    const [apiSuccess, setApiSuccess] = useState(true);
    const generateApiKey = async () => {
        // Simulating API key generation
        try {
            const authService = new AuthServices();
            const response = await authService.getApiCallHandler(API_ENDPOINTS.ApiKeyGenerator);
            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }
            console.log("response?.data", response?.data.data.apiKey)
            const newKey = response?.data.data.apiKey;
            setApiKey(newKey);
            setApiSuccess(true)
        } catch (err) {
            console.error("Error fetching user details:", err);
            setError(err.message);
        }

    };

    const copyToClipboard = () => {
        if (apiKey) {
            navigator.clipboard.writeText(apiKey);
            setCopied(true)
            setTimeout(() => {
                setCopied(false)
            }, 500)
        }
    };

    return (
        <div className=" bg-white  w-full flex flex-col rounded-lg overflow-hidden pb-2xl ">
            <div className='text-black font-normal text-f-4xl border-b pb-m mb-xl'>
                API Key
            </div>
            <div className="w-full  bg-white  ">
                <h2 className="text-f-xl font-semibold text-gray-900">
                    Generate an API key for your application
                </h2>
                <p className="text-gray-600 mt-m text-f-l">
                    To connect securely to the NPS service, your application or tool needs
                    an API key with permission to access the cluster and resources such as
                    tables.
                </p>

                {!apiKey ? (
                    <button
                        onClick={generateApiKey}
                        className="mt-4 default-button transition"
                    >
                        Generate API key
                    </button>
                ) : (
                    <div className="mt-4">
                        {apiSuccess && <div className="bg-green-100 border-l-4 border-green-500 py-l px-m flex justify-between gap-xl">
                            <div className="pt-xs"> <FaCircleCheck className="text-green-500 " /></div>
                            <div className="flex flex-col flex-1 ">
                                <div className="text-black text-f-xl font-medium">API key successfully generated</div>
                                <p className="mt-s text-f-l text-gray-600">
                                    Configure your application with the credentials. A secret has been
                                    created in Mapospace to store your credential.
                                </p>
                            </div>
                            <div className=" pt-xs ">
                                <MdOutlineClose className="text-black cursor-pointer" onClick={() => { setApiSuccess(false) }} />
                            </div>

                        </div>
                        }
                        <div className="flex items-center mt-xl ">
                            <div className="p-l bg-gray-100 rounded-md border">
                                <span className="text-gray-800 font-mono text-sm ">{apiKey}</span>
                                <button onClick={copyToClipboard} className="ml-m text-gray-500 hover:text-gray-700 relative">
                                    <FaRegCopy />
                                    {copied && <div className="absolute px-s py-xs bg-yellow-300 rounded-md text-yellow-800 left-0 -bottom-10">copied</div>}
                                </button>
                            </div>

                        </div>
                        <p className="text-gray-500 text-sm mt-s">
                            🔒 A secret has been created in mapospace to store your credential.{" "}
                            <a href="#" className="text-blue-600 hover:underline">
                                Learn how
                            </a>
                        </p>
                        <button
                            onClick={generateApiKey}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Generate new API key
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApiKeyGenerator;
