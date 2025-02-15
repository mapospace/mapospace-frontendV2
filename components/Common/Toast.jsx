import { Bounce, toast } from "react-toastify";

export const customSuccess = (text) => {
    return toast.success(text, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
}