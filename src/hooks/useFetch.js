import { useEffect, useState } from 'react';
import axios from 'axios'
// utility
import cardSort from '../utility/cardSort';

export default function useFetch(query, pageNumber, limit, sortParam) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [cards, setCards] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    // Sort cards each fetch based on state of sort param
    if(sortParam !== "DEFAULT") cardSort(cards, sortParam);

    // Prevent old search results from displaying as query gets longer
    useEffect(() => {
        setCards([])
    }, [query]);
    
    // Fetch data based on search query
    useEffect(() => {
        let cancel;
        setLoading(true);
        setError(false);

        axios({
            method: 'GET',
            url: `https://api.elderscrollslegends.io/v1/cards`,
            params: { name: query, page: pageNumber, pageSize: limit },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            // add card from api response to existing cards
            setCards(prevCards => {
                return [...prevCards, ...res.data.cards];
            });
            // set hasMore flag to true only if there are more entries to get from api
            setHasMore(res.data.cards.length > 0);
            setLoading(false);
        }).catch(e => {
            if(axios.isCancel(e)) return;
            setError(true);
        });
        return () => cancel();
    }, [query, pageNumber, limit]);

    return { loading, error, cards, hasMore }
}