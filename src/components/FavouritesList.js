import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';


const FavouritesList = () => {

    const [list, setList] = useState([]);
    const [favoritedItem, setFavoritedItem] = useState ('');


    return (

    );
};

export default FavouritesList;