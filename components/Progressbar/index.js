import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';

const ProgressBar = ({ data, calculatePercent }) => {
  const router = useRouter();
  const [todos, setTodos] = useState();
  useEffect(() => {
    updateMilestonesData()
  }, [data])
  const updateMilestonesData = async () => {
    const response = await fetch('http://localhost:3001/pathwayMilestones', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: 2, milestones: data.map(text => ({ id: nanoid(), text, completed: false })) })
    });
    router.reload();
  }

  console.log("data", data)

  return (
    <div className={styles.progressbarCon}>
      <div className={styles.progressbar}>
        <div className={styles.progressbarInner} style={{ width: `${calculatePercent}%`, transition: "all 300ms ease" }}></div>
      </div>
    </div>
  )
}

export default ProgressBar