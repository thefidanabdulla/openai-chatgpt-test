import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import ProgressBar from "./../../components/Progressbar";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState([]);
  const [pathwayData, setPathwayData] = useState(result);
  const [checkedData, setCheckedData] = useState(pathwayData);


  useEffect(() => {
    fetch('http://localhost:3001/pathwayMilestones')
      .then(response => response.json())
      .then(data => setPathwayData(data))
      .catch(error => console.log(error));
  }, [result]);

  useEffect(() => {
    setCheckedData(pathwayData?.milestones);
  }, [pathwayData])
  useEffect(() => {
    updateMilestonesDataByCheck();
  }, [checkedData])

  const updateMilestonesDataByCheck = async () => {
    const response = await fetch('http://localhost:3001/pathwayMilestones', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: 2, milestones: checkedData })
    });
  }

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

  function handleCheckboxClick(id) {
    setCheckedData(prevTodos => prevTodos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    }));
  }

  const calculatePercent = () => {
    const completedTodos = checkedData.filter(todo => todo.completed);
    const percentCompleted = (completedTodos.length / checkedData.length) * 100;
    return percentCompleted;
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
            checkedData?.map((item, index) => (
              <div key={index} className={styles.resultItem}>
                <label>
                  <input type="checkbox" checked={item?.completed} onChange={() => handleCheckboxClick(item?.id)} />
                  {item?.text}
                </label>
              </div>
            ))
          }
        </div>
        {/* {result?.length && (
          <ProgressBar data={result} />
        )}  */}
        <div className={styles.progressbarCon}>
          <div className={styles.progressbar}>
            <div className={styles.progressbarInner} style={{width: `${calculatePercent()}%`}}></div>
          </div>
        </div>
      </main>

    </div>
  );
}
