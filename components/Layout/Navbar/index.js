import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Logo from "../../../public/imgs/logo.svg"

const Index = () => {
  return (
    <nav className={styles.nav}>
        <div className={styles.logo}> 
            <Link href={"/"}>
              <Image src={Logo} alt='logo' width={96} height={45} />
            </Link>
        </div>
        <div className={styles.navMenu}>
            <Link href={"/"}>
              <span className={styles.navMenuLink}>Home</span>
            </Link>
            <Link href={"/services"}>
              <span className={styles.navMenuLink}>Services</span>
            </Link>
            <Link href={"/pathway"}>
              <span className={styles.navMenuLink}>Pathway</span>
            </Link>
            <Link href={"/newsletter"}>
              <span className={styles.navMenuLink}>Newsletter</span>
            </Link>
        </div>
    </nav>
  )
}

export default Index