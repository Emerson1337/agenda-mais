import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "@/shared/styles/globals.css";
import { Provider } from "@/shared/utils/Providers";
import { ThemeProvider } from "@/components/ui/theme-provider";
import "@/shared/styles/index.css";
import "@/shared/styles/prism-vsc-dark-plus.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} theme-zinc`}>
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
