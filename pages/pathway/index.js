import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import ProgressBar from "./../../components/Progressbar";
import { AiOutlineClose } from 'react-icons/ai';


export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState([]);
  // const [pathwayData, setPathwayData] = useState(result);
  const [checkedData, setCheckedData] = useState([]);
  const [isWinModalOpened, setIsWinModalOpened] = useState(false)



  useEffect(() => {
    fetch('http://localhost:3001/pathwayMilestones')
      .then(response => response.json())
      .then(data => setCheckedData(data?.milestones))
      .catch(error => console.log(error));
  }, [result]);

  useEffect(() => {
    updateMilestonesDataByCheck();
  }, [checkedData])

  const updateMilestonesDataByCheck = async () => {
    if (!result?.length) {
      const response = await fetch('http://localhost:3001/pathwayMilestones', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: 2, milestones: checkedData })
      });
    }
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
      console.log(error.message);
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
    const completedTodos = checkedData?.filter(todo => todo.completed);
    const percentCompleted = (completedTodos?.length / checkedData?.length) * 100;
    return percentCompleted;
  }
  useEffect(() => {
    if (calculatePercent() == 100) {
      setIsWinModalOpened(true)
    }

  }, [calculatePercent()])
  return (
    <div className={styles.pathwayContainer}>
      <Head>
        <title>Eddy Pathways</title>
      </Head>
      {isWinModalOpened && (
        <div className={styles.winModal}>
          <div className={styles.winModalCon}>
            <button onClick={() => setIsWinModalOpened(false)}>
              <AiOutlineClose />

            </button>
          </div>
          <div className={styles.winModalText}>
            <h1>Congratulations🥳</h1>
          </div>
        </div>
      )}

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
        {result?.length ? (
          <ProgressBar calculatePercent={calculatePercent()} data={result} />
        ) : (
          <div className={styles.progressbarCon}>
            <div className={styles.progressbar}>
              <div className={styles.progressbarInner} style={{ width: `${calculatePercent()}%` }}></div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
