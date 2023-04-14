import React, { useState } from 'react';
import styles from "./styles.module.scss";
import { BiEnvelope } from "react-icons/bi";
import { AiOutlineLock } from "react-icons/ai";
import { toast } from 'react-toastify';
import Link from 'next/link';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';

const Index = () => {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPass, setRepeatPass] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      id: nanoid(),
      email,
      password,
    };
    if(password !== repeatPass){
      toast.error("Passwords is not same");
      setEmail("");
      setPassword("");
      setRepeatPass("");
      return;
    };

    const response = await fetch('http://localhost:3000/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    console.log(JSON.stringify(data))

    if (response.ok) {
      toast.success('User created successfully!');
      router.push("/auth/signin");
    } else {
      toast.error('Failed to create user.');
    }

  };

  return (
    <div className={`${styles.authContainer} linear-background-eddy`}>
      <div className={styles.authFormContainer}>
        <h1>Register</h1>
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
          <label>
            <input
              type='password'
              placeholder='Repeat password'
              value={repeatPass}
              onChange={(e) => setRepeatPass(e.target.value)}
              required
            />
            <span>
              <BiEnvelope />
            </span>
          </label>
          <button type='submit'>Register</button>
          <div className={styles.swithBtwAuth}>Already have an account? <span><Link href={"/auth/signin"}>Log in</Link></span></div>
        </form>
      </div>
    </div>
  )
}

export default Index