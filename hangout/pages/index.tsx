import Head from 'next/head'
import styles from './index.module.css'
import React, { useState, useEffect } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import AddForm from '../components/addForm';
import CardList from '../components/cardList';


export default function Home() {

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Head>
          <title>Hangout</title>
        </Head>

        <main>
          <h1 className={styles.title}>
            Welcome to Hangout!
          </h1>

          <AddForm />

          <div className={styles.cardsBody}>
            <h1>Previous suggestions: </h1>
            <CardList />
          </div>

        </main>

        <footer className={styles.footer}>
          <a href='https://rosenlinddylan.github.io/'>About me</a>
        </footer>
      </div>
    </div>
  )
}

