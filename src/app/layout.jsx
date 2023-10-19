import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Notification from "@/components/notification/Notification";
import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Resturant App",
  description: "This is a resturant app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <AuthProvider>
            <QueryProvider>
              <Notification />
              <Navbar />
              {children}
              <Footer />
            </QueryProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
