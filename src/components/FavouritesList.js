import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import bingeFestApp from '../firebaseSetup';
import './favouriteslist.css'


function FavouritesList() {



    // Initialize state and variables to hold user's favourited items and list of favourited items.
    const [list, setList] = useState([]);
    // const [favouritedItem, setFavouritedItem] = useState('');

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
            console.log(data);
            for (let key in data) {
                newFavourite.push(
                    {
                        key: key,
                        Lorraine: data[key]
                    }
                );
            }
            setList(newFavourite);
        });
    }, []);
    console.log(list);
    // Display Favourites List ** To be edited to include true info from API data **
    return (
        <> 
        {list.length === 0
            ? null
            : <div className='favWrapper'>
                <h2>Watch List</h2>
            <div className='favContainer'>
                {list.map((favouritedItem) => {
                    return (
                        <div key={favouritedItem.key} className='user-list-containter'>
                            <ul>
                                <li className='favourite-item'>
                                    <img className='imgFavourites' src={`https://image.tmdb.org/t/p/original/${favouritedItem.Lorraine.poster_path}`} alt={favouritedItem.Lorraine.name} />
                                    <h3 className='favourite-item-title'>{favouritedItem.Lorraine.name}</h3>
                                    <button className='remove-from-list' onClick={() => { handleRemove(favouritedItem.key); }}>
                                        Remove from list
                                    </button>
                                </li>
                            </ul>
                        </div>
                    );
                })}
            </div>
            </div>}
        </>
    );
};

export default FavouritesList;
