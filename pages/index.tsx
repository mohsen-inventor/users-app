import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Users</title>
        <meta name="description" content="Users list" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        Main content
      </main>
    </Fragment>
  )
}

export default Home
