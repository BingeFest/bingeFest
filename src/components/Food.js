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
        // console.log(`Is this working?`, event.target.value);
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
        // const [foodSearch, setFoodSearch] =   useState()
        const proxiedUrl = 'https://api.yelp.com/v3/businesses/search';
        const apiKey = 'pXx_2tLHf5hbYjiMJHosi3rvDwOi5rAww8z9Q6xLFnnbUtJToMyU5lZ9YPvEqKA8SC5iHMuB7tfvoOb-WBjkdSzqvmrUdD-qSI6gxfxwUXAo3lBFNngV3OWHGzPsYXYx';
        const url = new URL('http://proxy.hackeryou.com');
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
                    //    const foodResults = data.businesses;
                    setUserFoodSearch(data.businesses);
                    //    console.log(data.businesses)
                }
            });
    }, [searchTerm, searchLocation, resultsLimit]);



    return (
        <div className="foodPage">
            <h2>Fancy some takeout?</h2>
            <h3>Enter your location and your craving to find some great local eats!</h3>
            <form onSubmit={handleSubmitting}>
                <label htmlFor="foodSearch">Cravings</label>
                <input type="text" id="foodSearch" value={userInputting} onChange={handleInputting} placeholder="What are you craving?" />
                <label htmlFor="location">Location</label>
                <input type="text" id="location" value={userLocation} onChange={foodInputting} placeholder="Where can we find you?" />
                <button>Search</button>
            </form>
            <ul className="foodList">
                {userFoodSearch.map((restaurant) => {
                    return (
                        <li key={restaurant.id}>

                            <div className="restaurantBox" key={restaurant.id}>
                                <div className="restaurantImage">
                                    <img src={restaurant.image_url ? restaurant.image_url : 'https://source.unsplash.com/random/'} alt={`${restaurant.name}.`} />
                                </div>
                                <div className="restaurantInfo">
                                    <h2>{restaurant.name}</h2>
                                    <p>{restaurant.categories[0].title}</p>
                                    <p>{restaurant.location.address1}, {restaurant.location.address2}</p>
                                    <p>{restaurant.location.city}</p>
                                    <p>{restaurant.phone}</p>
                                    <p>Rating: {restaurant.rating}/5</p>
                                    <p className="websiteUrl"><a href={restaurant.url}>Website</a></p>
                                    <button>Add to favourites</button>
                                </div>
                            </div>
                        </li>
                    )
                })}

            </ul>


        </div>
    )
};

export default Food;

// https://source.unsplash.com/random