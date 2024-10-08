import type { Metadata } from "next";
import { Open_Sans} from "next/font/google";
import "./globals.css";

import {
  ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton
  
} from '@clerk/nextjs'
import { ThemeProvider } from "@/components/providers/theme-provider";

import { cn } from "@/lib/utils";

import { ModalProvider } from "@/components/providers/modal-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import { QueryProvider } from "@/components/providers/query-provider";

const font = Open_Sans({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Discord",
  description: "Created by JC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  // Log the value to the console
  // console.log('Clerk Publishable Key:', clerkKey);

  return (
    <ClerkProvider publishableKey={clerkKey}>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(
          font.className,
          "bg-white dark:bg-[#313338]"
        )}>
          <ThemeProvider 
            attribute="class" 
            defaultTheme="dark"
            enableSystem={false}
            storageKey="discord_theme"
          >
            <SocketProvider>
              <ModalProvider />
              <QueryProvider>
                {children}
              </QueryProvider>
            </SocketProvider>
          </ThemeProvider>
          
        </body>
      </html>
    </ClerkProvider>
  )
}


// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <ClerkProvider>
//       <html lang="en">
//         <body className={font.className}>
//         <header>
//             <SignedOut>
//               <SignInButton />
//             </SignedOut>
//             <SignedIn>
//               <UserButton />
//             </SignedIn>
//           </header>
//           <main>
//             {children}
//           </main>
//         </body>
//       </html>
//     </ClerkProvider>
//   )
// }
