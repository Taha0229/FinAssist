import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import NavBar from "./components/Header/NavBar";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FinAssist",
  description: "Streamline your cloud infrastructure process and billing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavBar />
          {children}
        </Providers>
        
      </body>
    </html>
  );
}
