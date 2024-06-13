import { Inter } from 'next/font/google'
import './globals.css'

// Components
import Header from '@/app/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Valorant Wiki',
  description: 'Valorant game brief wiki',

  icons: {
    icon: '/icon-valorant.svg'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang='pt-br'>
      <body className={inter.className}>
        <Header />
        <div className='flex justify-center items-center px-8'>
          {children}
        </div>
      </body>
    </html>
  );
}
