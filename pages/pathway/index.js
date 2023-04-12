import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import {AiOutlineSearch} from "react-icons/ai";
import ProgressBar from "./../../components/Progressbar";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState([]);
  const [pathwayData, setPathwayData] = useState();

  useEffect(() => {
      fetch('http://localhost:3001/pathwayMilestones')
        .then(response => response.json())
        .then(data => setPathwayData(data))
        .catch(error => console.log(error));
  }, [result]);
  console.log(pathwayData)

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInput),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data?.result?.choices[0]?.text?.split(/\d+\./).slice(1).map(str => str.trim()));
      setUserInput("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }



  return (
    <div className={styles.pathwayContainer}>
      <Head>
        <title>Eddy Pathways</title>
      </Head>

      <main className={styles.pathwatMain}>
        <h3 className={styles.pathwayHeader}>Search</h3>
        <form onSubmit={onSubmit} className={styles.pathwayForm}>
          <input
            type="text"
            name="input"
            placeholder="Enter an question"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button type="submit"><AiOutlineSearch /></button>
        </form>

        <div className={styles.resultContainer}> 
        {
          pathwayData?.milestones?.map((item, index) => (
            <div key={index} className={styles.resultItem}>
              <label>
                <input type="checkbox" checked={item?.completed}  onChange={(e) => console.log(e.target.checked)}/>
                {item?.text}
              </label>
            </div>
          ) )
        }
        </div>
        {result?.length && (
          <ProgressBar data={result} />
        )} 
      </main>

    </div>
  );
}
