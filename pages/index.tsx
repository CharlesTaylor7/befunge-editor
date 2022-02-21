import type { NextPage } from 'next'
import Head from 'next/head'
import Befunge from '../components/Befunge'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Befunge />
    </div>
  )
}

export default Home
