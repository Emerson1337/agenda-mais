import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "@/shared/styles/globals.css";
import { Provider } from "@/shared/utils/Providers";
import { ThemeProvider } from "@/components/ui/theme-provider";
import "@/shared/styles/index.css";
import "@/shared/styles/prism-vsc-dark-plus.css";
import CookieConsent from "@/components/ui/Cookies/CookieConsent";
import NextTopLoader from "nextjs-toploader";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={"./favicon.ico"} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </head>
      <body className={`${inter.className} theme-zinc`}>
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <NextTopLoader color="#18181A" />
            <CookieConsent variant="small" />
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
