import { Inter } from 'next/font/google'
import './globals.css'
import './responsive.css'
import Navbar from '../components/Navbar'
import { ConfigProvider } from "antd";
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'venue Ease ',
  description: 'venue Ease ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ConfigProvider
          theme={{
            token: {
              // Seed Token
              colorPrimary: "#2F2E2E",
              // Alias Token
              colorBgContainer: "#ffffff",
            },
          }}
        >
        <Navbar />
        {children}
        </ConfigProvider>
        </body>
    </html>
  )
}
