import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';
import bingeFestApp from '../firebaseSetup';
import axios from 'axios';


function FavouritesList() {



    // Initialize state and variables to hold user's favourited items and list of favourited items.
    const [list, setList] = useState([]);
    const [favouritedItem, setFavouritedItem] = useState('');


     const [error, setError] = useState(null);

    // Creating an event handler that will run when user clicks button to add item to their list. * handleClick event to be connected to main app 
    // (**Create button attached to results from API call from food app & movie DB** )
    const handleAdd = (event) => {
        setFavouritedItem(event.target.value);
        event.preventDefault();

        const database = getDatabase(bingeFestApp);
        const dbRootAddress = ref(database);

        push(dbRootAddress, favouritedItem, list);

    };
    // Creating another function to allow users to remove favourited items from their list:
    const handleRemove = (favouritedItemId) => {

        const database = getDatabase(bingeFestApp);
        const dbBingeFestAddress = ref(database, `${favouritedItemId}`);

        remove(dbBingeFestAddress);
    };

    useEffect(() => {
        const database = getDatabase(bingeFestApp);
        const dbRootAddress = ref(database);

        onValue(dbRootAddress, (response) => {
            const newFavourite = [];
            const data = response.val();

            for (let key in data) {
                newFavourite.push({ key: key, name: data[key] });
            }
            setList(newFavourite);
        });
    }, []);

      const [searchQuery, setSearchQuery] = useState(0);

    // result states
    const [tvShows, setTvShows] = useState([]);

       useEffect(() => {
        if (searchQuery !== 0) {
            axios({
                url: `https://api.themoviedb.org/3/tv/{tv_id}?api_key=853030e957dca57316fe835ed75d0d32&language=en-US`,
                method: 'GET',
                dataResponse: 'json',
                params: {
                    with_genres: searchQuery
                }
            }).then(
                (response) => {
                    const rawData = response.data.results;
                    console.log(rawData);
                    setTvShows(rawData);
                },
                (error) => {
                    setError(error);
                })
        }
    }, [searchQuery]);

    // Display Favourites List ** To be edited to include true info from API data **
    return (
        <div>
            {list.map((favouritedItem) => {
                return (
                    <div className='user-list-containter'>
                        <ul>
                            <li className='favourite-item' key={favouritedItem.key}>
                                <p className='favourite-item-title'>{favouritedItem.name}</p>
                                <button className='remove-from-list' onClick={() => { handleRemove(favouritedItem.key); }}>
                                    x
                                </button>
                            </li>
                        </ul>
                    </div>
                );

            })}
        </div>

    );

};

export default FavouritesList;
