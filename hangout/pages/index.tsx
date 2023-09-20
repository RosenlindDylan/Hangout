import Head from 'next/head'
import styles from './index.module.css'
import React, { useState, useEffect } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import DateComponent from '../components/datecomponent'


type Props = {
  posts: [Post]
}

type Post = {
  _id: String;
  title: String;
  content: String;
}

export async function getServerSideProps() {
  try {
    let response = await fetch('http://localhost:3000/api/getPosts');
    let posts = await response.json();

    return {
      props: { posts: JSON.parse(JSON.stringify(posts)) },
    };
  } catch (e) {
    console.error(e);
  }
}

export default function Home() {
  const [name, setName] = useState('');
   
  // name field
  const handleNameSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted with: " + name);
    setName('');
  }

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

