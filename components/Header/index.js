import React from 'react';
import styles from "./styles.module.scss";
import Image from 'next/image';
import BgImage from "../../public/imgs/slider-left-dec.png";
import HeaderRightImg from "../../public/imgs/EDDY-1.png";

const Index = () => {
  return (
    <header className={styles.header}>
        <div className={styles.headerBgImg}>
            <Image src={BgImage} height={750} alt='header background'  />
        </div>
        <div className={styles.headerTextContainer}>
            <div className={styles.headerLeft}>
                <h1>Meet <span className={styles.headerEddyWord}>Eddy</span>- your learning starts from here</h1>
                <p>Eddy presents you the best way to learn what you are inspired by - in the fastest and most appropriate way! Enjoy the power of personalized lifelong multi search learning platform with gamification.</p>
            </div>
            <div className={styles.headerRight}>
                <Image src={HeaderRightImg} height={250} width={450}    alt='heder right side' />
            </div>
        </div>
    </header>
  )
}

export default Index