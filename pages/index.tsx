import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { User } from '../types/User';
import Users from '../components/Users/Users';
import axios from 'axios';
// Router
import { useRouter } from 'next/router'
import Page from './../components/_layout/Page/Page';
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

export async function getServerSideProps(context: any) {

  const stringifiedPage = Array.isArray(context.query.page)
    ? context.query.page.join('')
    : context.query.page;
  // const stringifiedToPage = Array.isArray(query.to)
  //   ? query.to.join('')
  //   : query.to;
  const pageNum = Number(stringifiedPage ?? 1);
  // const toPage = Number(stringifiedToPage ?? 1);

  const usersResponse = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/users?page=${pageNum}`);
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
