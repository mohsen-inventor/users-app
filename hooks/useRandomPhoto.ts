import { useEffect, useState } from 'react';
import axios from 'axios';

const useRandomPhoto = () => {
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState('');

    useEffect(() => {
        let randomIndex = Math.floor(Math.random() * 30);

        (async () => {
            setLoading(true);

            const photosApiUrl = 'https://api.unsplash.com/search/photos';
            const clientId = process.env.NEXT_PUBLIC_UNSPLASH_API_ACCESS_KEY;

            const response = await axios.get(
                `${photosApiUrl}?client_id=${clientId}&page=1&query=faces&per_page=30`
            );
            const photo = await response.data.results[randomIndex].urls.thumb;

            setPhoto(photo);
            setLoading(false);
        })();
    }, []);

    return { loading, photo };
};

export { useRandomPhoto };
