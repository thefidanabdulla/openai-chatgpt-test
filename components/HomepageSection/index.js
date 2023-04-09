import React from 'react';
import styles from './styles.module.scss';
import CardIcon1 from "./../../public/imgs/service-icon-01.png";
import CardIcon2 from "./../../public/imgs/service-icon-02.png";
import CardIcon3 from "./../../public/imgs/service-icon-03.png";
import CardIcon4 from "./../../public/imgs/service-icon-04.png";
import CardIcon1Hover from "./../../public/imgs/service-icon-hover-01.png";
import CardIcon2Hover from "./../../public/imgs/service-icon-hover-02.png";
import CardIcon3Hover from "./../../public/imgs/service-icon-hover-03.png";
import CardIcon4Hover from "./../../public/imgs/service-icon-hover-04.png";
import headingLine from "./../../public/imgs/heading-line-dec.png";
import Image from 'next/image';


const Index = () => {
  const cardsData = [
    {
      id: 1,
      title: "Sign up and take a quick survey",
      desc: "You can get acquainted with any topic or field you want. Just let us know about a few traits of yours in the 1-minute survey:)",
      icon: CardIcon1,
      iconHover: CardIcon1Hover
    },
    {
      id: 2,
      title: "Your learning pathway is here",
      desc: "After the survey, the available pathways for your own learning experience will be created. Enjoy!",
      icon: CardIcon2,
      iconHover: CardIcon2Hover
    },
    {
      id: 3,
      title: "Multi Workflow Idea",
      desc: "Sorted order of learning resources with a scheduled syllabus is always accessible through the Dashboard.",
      icon: CardIcon3,
      iconHover: CardIcon3Hover,
    },
    {
      id: 4,
      title: "24/7 Help & Support",
      desc: "You have got questions or offers? Reach us from the Support section!",
      icon: CardIcon4,
      iconHover: CardIcon4Hover
    },
  ]
  return (
    <main className={styles.main}>
      <section className={styles.findoutSection}>
        <h2>Find out which pathway is the best for <span className={styles.findoutSectionTitleSpan}>You</span> & get the best of it for yourself- You are able to track your progress and earn Ecoins through the app!</h2>
        <p>Ecoins will help you to purchase different items in the Eddy.</p>
        <p>You will even have a chance to get a month free with them!</p>
      </section>
      <section className={styles.serviceSection}>
        {cardsData?.map((item) => (
          <div key={item.id} className={styles.serviceCard}>
            <div className={styles.serviceCardInfo}>
              <div className={styles.serviceCardImg}>
                <Image src={item.icon} width={50} height={50} alt="service card icon" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
            <button>Read More</button>
          </div>
        ))}
      </section>
      <section className={styles.learnSection}>
        <h2>Learn everything- the power of learning is limitless!</h2>
        <Image src={headingLine} alt='heading line' width={45} height={2} />
        <p>
          We are 5Life company from Azerbaijan, Baku. We are here to make impact on the Education industry of the whole world, to help people who struggle sticking to the schedule they determined while learning, and especially who want to self-study
        </p>
      </section>
    </main>
  )
}

export default Index