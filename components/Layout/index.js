import React from 'react'
import styles from './styles.module.scss';
import Navbar from "./Navbar";
import Footer from "./Footer";


const Index = ({children}) => {
  return (
    <>
     <Navbar />
     <main>
      </main>
     {children}
     <Footer /> 
    </>
  )
}

export default Index