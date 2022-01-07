import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import Users from '../components/Users/Users';
import axios from 'axios';
import { axiosPhotos } from '../helpers/axios';
interface Props {
  usersData: string[]
}

const Home: NextPage<Props> = ({ usersData }: Props) => {
  return (
    <Fragment>
      <Head>
        <title>Users</title>
        <meta name="description" content="Users list" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <Users usersData={usersData} />
      </main>
    </Fragment>
  )
}

export async function getStaticProps(context) {
  // users data (as dummy data from local json file)
  const usersResponse = await axios.get('http://localhost:3000/api/users');
  const usersObjects = await usersResponse.data;

  // users photos (as dummy photo from unsplash)
  const photosApiUrl = 'https://api.unsplash.com/search/photos';
  const clientId = process.env.NEXT_PUBLIC_UNSPLASH_API_ACCESS_KEY;
  const photosResponse = await axios.get(`${photosApiUrl}?client_id=${clientId}&page=1&query=faces`);
  const { results } = await photosResponse.data;



  let usersData = results.map((item) => {
    return item.urls.thumb;
  });

  return {
    props: { usersData }
  }
}

export default Home
