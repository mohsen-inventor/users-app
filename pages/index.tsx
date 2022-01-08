import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { User } from '../types/User';
import Users from '../components/Users/Users';
import axios from 'axios';
import { axiosPhotos } from '../helpers/axios';
interface Props {
  usersData: User[],
  page: number,
  totalCount: number,
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

export async function getStaticProps(context) {
  // users data (as dummy data from local json file)
  const usersResponse = await axios.get('http://localhost:3000/api/users');
  const { results, page, count } = await usersResponse.data;

  return {
    props: {
      totalCount: count,
      page: page,
      usersData: results
    }
  }
}

export default Home
