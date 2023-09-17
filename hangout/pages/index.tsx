import Head from 'next/head'
import styles from './index.module.css'
import React, { useState, useEffect } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import DateComponent from './datecomponent'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getData, insertData } from './db/dataAccess';
import clientPromise from '../lib/mongodb';

type ConnectionStatus = {
  isConnected: boolean
}

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise

    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [name, setName] = useState('');

  // checks for db connection when home is rendered
  {isConnected ? (
    console.log("successfully connected to db!")
  ) : (
    console.log("not connected to db!")
  )}
   
  // name field
  const handleNameSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted with: " + name);
    setName('');
  }


  // maybe something like this?
  // const handleCalendarSubmit = (selectedDate) => {
  //   const data = {
  //     name: name,
  //     datetime: selectedDate, // Pass the selected date
  //   };
  //   handleDBInsert(data);
  // };

  // inserts name, datetime into hangout
  const handleDBInsert = (date) => {
    let query = { name : name, 
      date : date
    }
    insertData(query)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Hangout</title>
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to Hangout!
        </h1>
          <form className={styles.nameForm} onSubmit={handleNameSubmit}>
            <div>
              <label>Name: </label>
              
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        
        <div className={styles.calendarContainer}>
          <DateComponent />
        </div>

      </main>

      <footer className={styles.footer}>
        <a href='https://rosenlinddylan.github.io/'>About me</a>
      </footer>
    </div>
  )
}

