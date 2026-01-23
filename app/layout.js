import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "HireSight AI",
  description: "AI-powered hiring platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        <main className="max-w-5xl mx-auto mt-6">{children}</main>
      </body>
    </html>
  );
}
