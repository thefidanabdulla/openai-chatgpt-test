import React, { useEffect, useState } from 'react';
import styles from "./styles.module.scss";
import { BiEnvelope } from "react-icons/bi";
import { AiOutlineLock } from "react-icons/ai";
import { toast } from 'react-toastify';
import Link from 'next/link';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';

const Index = () => {

  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch('https://eddyy.vercel.app/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.log(error));
  }, []);

  console.log(users)
  const handleSubmit = async (event) => {
    event.preventDefault();

    const haveAnAccount = users.filter((itm) => ((itm.email == email) && (itm.password == password)))

    if (haveAnAccount.length) {
      toast.success("You login successfully");
      const response = await fetch('https://eddyy.vercel.app/auth', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "id": "1",
          "isLogin": "true"
        })
      });
      router.push("/");
    } else {
      toast.error("You don't have any account with this email and password :/ Register please")
    }
  };

  return (
    <div className={`${styles.authContainer} linear-background-eddy`}>
      <div className={styles.authFormContainer}>
        <h1>Login</h1>
        <form className={styles.authForm} onSubmit={() => handleSubmit(event)}>
          <label>
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span>
              <BiEnvelope />
            </span>
          </label>
          <label>
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span>
              <BiEnvelope />
            </span>
          </label>
          <button type='submit'>Login</button>
          <div className={styles.swithBtwAuth}>Don't have any account? <span><Link href={"/auth/signup"}>Register</Link></span></div>
        </form>
      </div>
    </div>
  )
}

export default Index