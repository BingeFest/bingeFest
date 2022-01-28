// import axios from 'axios';
import { useState, useEffect } from 'react';




const Food = () => {

    const [userInputting, setUserInputting] = useState('');
    const [userLocation, setUserLocation] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchLocation, setSearchLocation] = useState('');
    const [resultsLimit, setResultsLimit] = useState();
    const [userFoodSearch, setUserFoodSearch] = useState([]);




    const handleInputting = (event) => {
        setUserInputting(event.target.value);
    }

    const foodInputting = (event) => {
        setUserLocation(event.target.value);
    }


    const handleSubmitting = (event) => {
        event.preventDefault();
        setSearchTerm(userInputting);
        setSearchLocation(userLocation);
        setUserInputting('');
        setUserLocation('');
    }


    useEffect(() => {
        setResultsLimit(20);

        const proxiedUrl = 'https://api.yelp.com/v3/businesses/search';
        const apiKey = 'pXx_2tLHf5hbYjiMJHosi3rvDwOi5rAww8z9Q6xLFnnbUtJToMyU5lZ9YPvEqKA8SC5iHMuB7tfvoOb-WBjkdSzqvmrUdD-qSI6gxfxwUXAo3lBFNngV3OWHGzPsYXYx';
        const url = new URL('https://proxy.hackeryou.com');
        url.search = new URLSearchParams({
            reqUrl: proxiedUrl,
            'params[key]': apiKey,
            'params[term]': searchTerm,
            'params[location]': searchLocation,
            'params[limit]': resultsLimit,
            'proxyHeaders[Authorization]': `Bearer ${apiKey}`,
        });
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.businesses) {
                    setUserFoodSearch(data.businesses);
                }
            });
    }, [searchTerm, searchLocation, resultsLimit]);



    return (
        <div>
            <div className="foodPage">
                <form onSubmit={handleSubmitting}>
                    <label htmlFor="foodSearch">What are you craving? </label>
                    <input type="text" id="foodSearch" value={userInputting} onChange={handleInputting} />
                    <label htmlFor="location">Where are you?</label>
                    <input type="text" id="location" value={userLocation} onChange={foodInputting} />
                    <button>Search</button>
                </form>
                <ul className="foodList">
                    {userFoodSearch.map((restaurant) => {
                        return (
                            <li key={restaurant.id}>

                                <div className="restaurantBox" key={restaurant.id}>
                                    <div className="restaurantImage">
                                        <img src={restaurant.image_url} alt={`${restaurant.name} restaurant.`} />
                                    </div>
                                    <div className="restaurantInfo">
                                        <h3>{restaurant.name}</h3>
                                        <p className="foodType">{restaurant.categories[0].title}</p>
                                        <p>{restaurant.location.address1}, {restaurant.location.address2}</p>
                                        <p>{restaurant.categories[0].title}</p>
                                        <p>{restaurant.location.city}</p>
                                        <p>{restaurant.phone}</p>
                                        <p>Rating: {restaurant.rating}/5</p>
                                        <p><a href={restaurant.url}>Website</a></p>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>

    )
};

export default Food;