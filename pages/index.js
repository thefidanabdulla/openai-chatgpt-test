import Head from "next/head";
import { useEffect, useState } from "react";
import Header from '../components/Header'
import HomepageSection from "./../components/HomepageSection";

export default function Home() {
  
  return (
    <div >
      <Head>
        <title>Eddy- the best place to learn anything!</title>
      </Head>
      <Header />
      <HomepageSection />
    </div>
  );
}
