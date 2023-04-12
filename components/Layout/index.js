import React from 'react'
import styles from './styles.module.scss';
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Index = ({ children }) => {
  const { pathname } = useRouter();
  return (
    <>
      <ToastContainer />
      {(pathname !== "/auth/signin" && pathname !== "/auth/signup") && <Navbar />}
      <main>
      </main>
      {children}
      {((pathname !== "/auth/signin") && (pathname !== "/auth/signup")) && <Footer />}
    </>
  )
}

export default Index