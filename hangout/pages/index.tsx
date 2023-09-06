import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import styles from './index.module.css'
import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type ConnectionStatus = {
  isConnected: boolean
}

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

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
  const [date, setDate] = useState(new Date());
  
  // outside jsx conditional checks for db connection when home is rendered
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


  // calendar stuff
  const handleDateSelect = (selectedDate) => {
    console.log('date selected is ', selectedDate);
  }

  const handleDateChange = (chagnedDate) => {
    console.log('date changed to ' + chagnedDate);
    setDate(chagnedDate);
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
        
          {/* <DatePicker
            selected={date}
            onSelect={handleDateSelect} //when day is clicked
            onChange={handleDateChange} //only when value has changed
          /> */}


      </main>

      <footer className={styles.footer}>
        <a href='https://rosenlinddylan.github.io/'>About me</a>
      </footer>
    </div>
  )
}
