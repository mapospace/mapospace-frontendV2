import "./globals.css";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'react-loading-skeleton/dist/skeleton.css'
import GoogleMapsProvider from "@/components/Maps/GoogleMapsProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-inter hide-scrollbar">
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <GoogleMapsProvider>

          {children}
        </GoogleMapsProvider>
      </body>
    </html>
  );
}
