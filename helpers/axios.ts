import axios from 'axios';

const unsplashConfig = {
    baseURL: 'https://api.unsplash.com/search/photos/',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${process.env.NEXT_PUBLIC_UNSPLASH_API_ACCESS_KEY}`,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_UNSPLASH_API_ACCESS_KEY}`,
    },
};

const axiosPhotos = axios.create(unsplashConfig);

export { axiosPhotos };
