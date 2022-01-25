import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';
import bingeFestApp from '../firebaseSetup';


function FavouritesList() {

    // Initialize state and variables to hold user's favourited items and list of favourited items.
    const [list, setList] = useState([]);
    const [favouritedItem, setFavouritedItem] = useState('');

    // Creating an event handler that will run when user clicks button to add item to their list. * handleClick event to be connected to main app 
    // (**Create button attached to results from API call from food app & movie DB** )
    const handleClick = (event) => {
        setFavouritedItem(event.target.value);
        event.preventDefault();

        const database = getDatabase(bingeFestApp);
        const dbRootAddress = ref(database);

        push (dbRootAddress, favouritedItem, list);

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
                newFavourite.push({key: key, name: data[key] });
            }
            setList(newFavourite);
        });
    },[]);

    // Display Favourites List ** To be edited to include true info from API data **
   return(
       <div>
   {list.map((favouritedItem) => {
            return (
        <div className='user-list-containter'>
            <ul>
                <li className='favourite-item' key={favouritedItem.key}>
                    <p className='favourite-item-title'>{favouritedItem.name}</p>
                    <button className='remove-from-list' onClick={() => {handleRemove(favouritedItem.key);}}>
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