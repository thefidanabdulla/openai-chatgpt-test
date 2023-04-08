import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import EddyLogo2 from '../../../public/imgs/eddy_logo_2.png';

const Index = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerHeader}>
        <h2>Join our mailing list to receive the news & latest trends</h2>
      </div>
      <div className={styles.footerFormCon}>
        <form className={styles.footerForm}>
          <input type='email' placeholder='Email Address...' />
          <button>Subscribe Now</button>
        </form>
      </div>
      <div className={styles.footerBoxesContainer}>
        <div className={styles.footerLeftBox}>
          <h3 className={styles.footerBoxHeader}>Contact Us</h3>
          <p className={styles.footerBoxItem}>Baku, Azerbaijan</p>
          <p className={styles.footerBoxItem}>+994-50-534-12-85</p>
          <p className={styles.footerBoxItem}>5lifeassociation@gmail.com</p>
        </div>
        <div className={styles.footerMidBox}>
          <h3 className={styles.footerBoxHeader}>About Us</h3>
          <p className={styles.footerBoxItem}>Home</p>
          <p className={styles.footerBoxItem}>Service</p>
          <p className={styles.footerBoxItem}>About</p>
          <p className={styles.footerBoxItem}>Testimonials</p>
          <p className={styles.footerBoxItem}>Pricing</p>
          <p className={styles.footerBoxItem}>Why Eddy?</p>
        </div>
        <div className={styles.footerRightBox}>
          <h3 className={styles.footerBoxHeader}>About Our Company</h3>
          <Image src={EddyLogo2} width={180} height={170} alt='Eddy Logo' />
        </div>
      </div>
      <div className={styles.footerCopyright}>Copyright © 2023 Eddy Company. All Rights Reserved. Distributed by 5Life.</div>
    </footer>
  )
}

export default Index