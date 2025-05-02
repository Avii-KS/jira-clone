import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import { shadesOfPurple } from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs";
import UserCheck from "@/components/user-check";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DevCollab",
  description:
    "DevCollab is a platform for developers to collaborate on projects.",
};

async function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: shadesOfPurple,
        variables: {
          colorPrimary: "#3b82f6",
          colorBackground: "#1a202c",
          colorInputBackground: "#2d3748",
          colorInputText: "#c9d1d9",
          colorInputBorder: "#3b82f6",
        },
        elements: {
          formButtonPrimary:
            "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded",
          card: "bg-gray-900 border-gray-800",
          headerTitle: "text-blue-500",
          headerSubtitle: "text-gray-400",
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.className} dotted-background`}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <UserCheck />
            <Header />
            <main className="min-h-screen">{children}</main>
            <footer className="bg-gray-900 py-12">
              <div className="container mx-auto px-4 text-center text-sm text-gray-400">
                <p>Made with ❤️ by Avinash</p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

export default RootLayout;
