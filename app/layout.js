import "./globals.css";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/theme-provider";

export const metadata = {
  title: "HireSight AI",
  description: "AI-powered hiring platform",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-100 text-gray-900" suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Navbar />
        <main className="max-w-5xl mx-auto mt-6">
            {children}
        </main>
          </ThemeProvider>
      </body>
    </html>
  );
}
