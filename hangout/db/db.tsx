import clientPromise from '../lib/mongodb'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'


type ConnectionStatus = {
    isConnected: boolean
  }

// mongodb server connection
export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise

    const client = await clientPromise
    const db = client.db("test1")

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