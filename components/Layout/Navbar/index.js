import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Logo from "../../../public/imgs/logo.svg";
import { FaSignInAlt } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import {GrClose} from "react-icons/gr";

const Index = () => {
  const [isNavbarOnTop, setisNavbarOnTop] = useState(true);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false)
  useEffect(() => {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        setisNavbarOnTop(false);
      } else {
        setisNavbarOnTop(true)
      }
    });
  } )
  return (
    <nav className={`${styles.nav} ${!isNavbarOnTop && styles.whiteNavbar}`}>
      <div className={styles.logo}>
        <Link href={"/"}>
          <Image src={Logo} alt='logo' width={96} height={45} />
        </Link>
      </div>
      <div className={`${styles.navMenu} ${isMobileMenuOpened && styles.navMenuOpened}`}>
        <Link className={[styles.navMenuLink, styles.navMenuLink1].join(' ')} href={"/"}>
          <span>Home</span>
        </Link>
        <Link className={[styles.navMenuLink, styles.navMenuLink2].join(' ')} href={"/services"}>
          <span>Services</span>
        </Link>
        <Link className={[styles.navMenuLink, styles.navMenuLink3].join(' ')} href={"/pathway"}>
          <span>Pathway</span>
        </Link>
        <Link className={[styles.navMenuLink, styles.navMenuLink4].join(' ')} href={"/newsletter"}>
          <span>Newsletter</span>
        </Link>
        <div className={[styles.signinSignupBtnCon, styles.navMenuLink5].join(' ')}>
          <button className={styles.signinSignupBtn}><FaSignInAlt /> <span>Sign in now</span></button>
        </div>
      </div>
      <button className={styles.navHamburgerIcon} onClick={() => setIsMobileMenuOpened(!isMobileMenuOpened)}>
        {!isMobileMenuOpened ? <RxHamburgerMenu /> : <GrClose /> }
        
      </button>
    </nav>
  )
}

export default Index