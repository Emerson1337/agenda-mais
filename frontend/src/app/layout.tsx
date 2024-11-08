import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "@/app/globals.css";
import { Provider } from "@/shared/utils/Providers";
import { ThemeProvider } from "@/components/ui/theme-provider";

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
