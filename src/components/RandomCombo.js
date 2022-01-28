// RandomCombo.js
import axios from 'axios';
import { useEffect, useState } from 'react';



const RandomCombo = () => {
    const [searchLocation2, setSearchLocation2] = useState('');
    const [userFoodSearch2, setUserFoodSearch2] = useState([]);
    const [userLocation2, setUserLocation2] = useState('');
    const [randIndex, setRandIndex] = useState(0);
    const [tvSearch, setTvSearch] = useState([]);


    const foodInputting2 = (event) => {
        setUserLocation2(event.target.value);
    }

     const handleSubmitting2 = (event) => {
        event.preventDefault();
        setSearchLocation2(userLocation2);
        setUserLocation2('');
        setRandIndex(randNumber); 
    }

    const randNumberGenerator = () => {
       return Math.floor(Math.random() * 20);
    }

    const randNumber = randNumberGenerator();


    useEffect(() => {
        axios({
            url: `https://api.themoviedb.org/3/tv/popular?api_key=853030e957dca57316fe835ed75d0d32&language=en-US&page=1`,
            method: 'GET',
            dataResponse: 'json',
        }).then(
            (response) => {
                const rawData = response.data.results;
                setTvSearch(rawData);
                console.log(rawData[randIndex]);
            },
            )
    }, [randIndex]);

    useEffect(() => {
        const proxiedUrl = 'https://api.yelp.com/v3/businesses/search';
        const apiKey = 'pXx_2tLHf5hbYjiMJHosi3rvDwOi5rAww8z9Q6xLFnnbUtJToMyU5lZ9YPvEqKA8SC5iHMuB7tfvoOb-WBjkdSzqvmrUdD-qSI6gxfxwUXAo3lBFNngV3OWHGzPsYXYx';
        const url = new URL('https://proxy.hackeryou.com');
        url.search = new URLSearchParams({
            reqUrl: proxiedUrl,
            'params[key]': apiKey,
            'params[term]': 'food',
            'params[location]': searchLocation2,
            'params[limit]': 20,
            'proxyHeaders[Authorization]': `Bearer ${apiKey}`,
        });
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.businesses) {
                    setUserFoodSearch2(data.businesses);
                }
            });
    }, [searchLocation2]);


    return (
        <div className="randomSuggestion">
            <h2>Random Combo!</h2>
            <h3>Need help?</h3>
            <form onSubmit={handleSubmitting2}>
                    <label htmlFor="location2">Tell us where you are:</label>
                    <input type="text" id="location2" value={userLocation2} onChange={foodInputting2} />
                    <button>Search</button>
            </form>
            {
                userFoodSearch2.length>0
                ? <h3>Your meal and entertainment:</h3>
                : <h3>What are you waiting for?</h3>
            }
           <div className="suggestionBox">

           
           {
            userFoodSearch2.length>0
            ? <div className="restaurantBox restaurantBox2" key={userFoodSearch2[randIndex].id}>
                    <div className="restaurantImage2">
                        <img src={userFoodSearch2[randIndex].image_url} alt={`${userFoodSearch2[randIndex].name} restaurant.`} />
                    </div>
                    <div className="restaurantInfo">
                        <h3>{userFoodSearch2[randIndex].name}</h3>
                        <p className="foodType">{userFoodSearch2[randIndex].categories[0].title}</p>
                        <p>{userFoodSearch2[randIndex].location.address1}, {userFoodSearch2[randIndex].location.address2}</p>
                        <p>{userFoodSearch2[randIndex].categories[0].title}</p>
                        <p>{userFoodSearch2[randIndex].location.city}</p>
                        <p>{userFoodSearch2[randIndex].phone}</p>
                        <p>Rating: {userFoodSearch2[randIndex].rating}/5</p>
                        <p><a href={userFoodSearch2[randIndex].url}>Website</a></p>
                    </div>
                </div>
            : <div></div>
      }
      {
          userFoodSearch2.length>0
          ? <div className="tvBox" key={tvSearch[randIndex].id}>

              <div className="tvPoster">
                  <img src={`https://image.tmdb.org/t/p/original/${tvSearch[randIndex].poster_path}`} alt={tvSearch[randIndex].name} />   
              </div>
              <div className="tvInfo">
                  <h3>{tvSearch[randIndex].name}</h3>
                  <p>{tvSearch[randIndex].overview}</p>
                  <p>Score: {tvSearch[randIndex].vote_average}</p>

              </div>
          </div>
          : <div></div>
          }
        </div>

        </div>
    )
}

export default RandomCombo;