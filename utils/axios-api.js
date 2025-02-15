import axios from "axios";
import { getAuthCredentials, RemoveAuthCredentials, setAuthCredentials } from "./auth-utils";
import { API_ENDPOINTS } from "./api-endpoints";

export default class AuthServices {
    constructor() {
        // alert("AuthServices initialized");
        this.url = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;

        this.axiosInstance = axios.create({
            baseURL: this.url,
            headers: { "Content-Type": "application/json" },
        });

        this.axiosInstance.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error.config;
                // alert(originalRequest._retry)
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        // alert("User token expired, attempting refresh...");
                        await this.refreshToken();
                        const newUserLoginToken = getAuthCredentials();
                        originalRequest.headers['Authorization'] = `Bearer ${newUserLoginToken.token}`;
                        return this.axiosInstance(originalRequest);
                    } catch (e) {
                        // alert("Refresh token expired, logging out...");
                        RemoveAuthCredentials();
                        window.location.href = '/sign-in';
                        return Promise.reject(e);
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    async refreshToken() {
        const authData = getAuthCredentials();
        if (!authData?.refreshToken) {
            throw new Error("Refresh token missing");
        }

        try {
            const response = await axios.post(`${this.url}/${API_ENDPOINTS.RefreshToken}`, {
                refreshToken: authData.refreshToken
            });

            setAuthCredentials(response.data.userLoginToken, response.data.refreshToken);
        } catch (error) {
            console.error("Refresh token request failed", error);
            throw error;
        }
    }

    async getApiCallHandler(endpoint) {
        const authData = getAuthCredentials();
        if (!authData?.token) {
            window.location.href = '/sign-in';
            return { error: true, message: "Authentication token is missing", token: false };
        }

        try {
            const response = await this.axiosInstance.get(`/${endpoint}`, {
                headers: {
                    Authorization: `Bearer ${authData.token}`,
                },
            });

            return { success: true, data: response.data };
        } catch (error) {
            console.error("API Error:", error);
            return {
                error: true,
                message: error.response?.data?.message || "An error occurred",
                status: error.response?.status || 500,
            };
        }
    }


    async putApiCallHandler(endpoint, data) {
        const authData = getAuthCredentials();
        if (!authData?.token) {
            window.location.href = '/sign-in';
            return { error: true, message: "Authentication token is missing", token: false };
        }

        try {
            const response = await this.axiosInstance.put(`/${endpoint}`, data, {
                headers: {
                    Authorization: `Bearer ${authData.token}`,
                },
            });

            return { success: true, data: response.data };
        } catch (error) {
            console.error("API Error:", error);
            return {
                error: true,
                message: error.response?.data?.message || "An error occurred",
                status: error.response?.status || 500,
            };
        }
    }

    async postApiCallHandler(endpoint, data) {
        const authData = getAuthCredentials();
        if (!authData?.token) {
            window.location.href = '/sign-in';
            return { error: true, message: "Authentication token is missing", token: false };
        }

        try {
            const response = await this.axiosInstance.post(`/${endpoint}`, data, {
                headers: {
                    Authorization: `Bearer ${authData.token}`,
                },
            });
            return { success: true, data: response.data };
        } catch (error) {
            console.error("API Error:", error);
            return {
                error: true,
                message: error.response?.data?.message || "An error occurred",
                status: error.response?.status || 500,
            };
        }
    }

    async deleteApiCallHandler(endpoint) {
        const authData = getAuthCredentials();
        if (!authData?.token) {
            window.location.href = '/sign-in';
            return { error: true, message: "Authentication token is missing", token: false };
        }

        try {
            const response = await this.axiosInstance.delete(`/${endpoint}`, {
                headers: {
                    Authorization: `Bearer ${authData.token}`,
                },
            });

            return { success: true, data: response.data };
        } catch (error) {
            console.error("API Error:", error);
            return {
                error: true,
                message: error.response?.data?.message || "An error occurred",
                status: error.response?.status || 500,
            };
        }
    }
}
