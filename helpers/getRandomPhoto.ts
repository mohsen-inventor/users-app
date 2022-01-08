import axios from 'axios';

const getRandomPhoto = async () => {
    let randomIndex = Math.floor(Math.random() * 30);

    const photosApiUrl = 'https://api.unsplash.com/search/photos';
    const clientId = process.env.NEXT_PUBLIC_UNSPLASH_API_ACCESS_KEY;

    const response = await axios.get(
        `${photosApiUrl}?client_id=${clientId}&page=1&query=faces&per_page=30`
    );
    const image = await response.data.results[randomIndex].urls.thumb;

    return image;
};

export { getRandomPhoto };
