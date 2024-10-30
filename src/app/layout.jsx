import { Inter } from 'next/font/google'
import './globals.css'
import axios from 'axios';

// Components
import Header from '@/app/components/Header'
import Chat from '@/app/components/Chat'

const inter = Inter({ subsets: ['latin'] })

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(request => {
  console.log(request);
  // Edit request config
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  console.log(response);
  // Edit response config
  return response;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

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
        <div className='flex justify-center items-center px-8 my-16'>
          {children}
        </div>
        <Chat />
      </body>
    </html>
  );
}
