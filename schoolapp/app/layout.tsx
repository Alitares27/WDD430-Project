import type { Metadata } from "next";
import "./globals.css";
import { openSans } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: 'Schoolapp Dashboard',
  description: 'A web application for managing and organizing school information, including students, teachers, and classes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
