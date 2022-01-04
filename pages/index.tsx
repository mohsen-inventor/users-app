import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import Users from '../components/Users/Users'

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Users</title>
        <meta name="description" content="Users list" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <Users />
      </main>
    </Fragment>
  )
}

export async function getStaticProps(context) {


  return {
    props: {}
  }
}

export default Home
