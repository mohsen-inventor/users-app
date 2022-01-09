import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { User } from '../types/User';
import Users from '../components/Users/Users';
import axios from 'axios';
interface Props {
  page: number,
  totalCount: number,
  usersData: User[],
}

const Home: NextPage<Props> = ({ usersData, page, totalCount }: Props) => {
  return (
    <Fragment>
      <Head>
        <title>Users</title>
        <meta name="description" content="Users list" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <Users page={page} usersData={usersData} totalCount={totalCount} />
      </main>
    </Fragment>
  )
}

export async function getStaticProps() {

  const usersResponse = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/users`);
  const { page, count, results } = await usersResponse.data;

  return {
    props: {
      page: page,
      totalCount: count,
      usersData: results
    }
  }
}

export default Home
