import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState();
  const [splitedResults, setSplitedResults] = useState();

  useEffect(() => {
    // setTimeout(() => {
    //   setSplitedResults(result)
    // }, 2000)
    // setSplitedResults(result)
    // console.log("splitedResults" ,splitedResults)
    console.log("result" ,result)
  }, [result])

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
    <div>
      <Head>
        <title>Eddy Pathways</title>
      </Head>

      <main className={''}>
        <h3>Test ChatGPT</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="input"
            placeholder="Enter an question"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}> 
        {
          result?.map((item, index) => (
            <div key={index}>
              <label>
                <input type="checkbox"/>
                {item}
              </label>
            </div>
          ) )
        }
        </div>
      </main>
    </div>
  );
}
