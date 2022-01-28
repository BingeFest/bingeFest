import './tvShows.css'
import { useState, useEffect } from 'react';
import { getDatabase, ref, push} from 'firebase/database';
import axios from 'axios';
import bingeFestApp from '../firebaseSetup';


const TvShows = () => {


        // Initialize state and variables to hold user's favourited items and list of favourited items.
 
    const [favoritedItem, setFavoritedItem] = useState('');


    // button states
    const [buttonContent, setButtonContent] = useState([]);

    // user query states
    const [userChoice, setUserChoice] = useState(0);
    const [searchQuery, setSearchQuery] = useState(0);

    // result states
    const [tvShows, setTvShows] = useState([]);

    // firebase states

    // Creating an event handler that will run when user clicks button to add item to their list. * handleClick event to be connected to main app 
    // (**Create button attached to results from API call from food app & movie DB** )
    const handleAdd = (event) => {
        event.preventDefault();
        setFavoritedItem(event.target.id);

    };

    useEffect(() => {

        if (favoritedItem !== '') {

        const database = getDatabase(bingeFestApp);
        const dbRootAddress = ref(database);

            const showIndex = parseInt(favoritedItem);
        push(dbRootAddress, tvShows[showIndex]);
        
        }
    }, [favoritedItem, tvShows])


    // put the genre data in each button
    useEffect(() => {
        axios({
            url: `https://api.themoviedb.org/3/genre/tv/list?api_key=853030e957dca57316fe835ed75d0d32&language=en-US`,
            method: 'GET',
            dataResponse: 'json',
        }).then(
            (response) => {
                const rawData = response.data.genres;
                setButtonContent(rawData);})


    }, []);

    // get the genre id of the button the user has clicked on
    const handleInput = (event) => {
        setUserChoice(event.target.value);
    };

    // set the button id into state to submit to the api
    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchQuery(userChoice);
    }

    // call the second endpoint and get the movies with the selected genre ID
    useEffect(() => {
        if (searchQuery !== 0) {
            axios({
                url: `https://api.themoviedb.org/3/discover/tv?api_key=853030e957dca57316fe835ed75d0d32`,
                method: 'GET',
                dataResponse: 'json',
                params: {
                    with_genres: searchQuery
                }
            }).then(
                (response) => {
                    const rawData = response.data.results;
                    setTvShows(rawData);
                })
        }
    }, [searchQuery]);


    return (
        <section className="tvPageWrapper">
            <section className="tvPageContainer">
                <h1>What are you feeling?</h1>
                <p className="tvDescription wrapper">Pick a genre and we'll give you some movies to pair with your takeout!</p>

                <form onSubmit={handleSubmit} className="tvFormContainer">
                    <div className="tvInputContainer">
                        {buttonContent.map((genre, index) => {
                            return (
                                <div key={genre.id} className="radioContainer" tabIndex={index}>
                                    <label htmlFor="genre">{genre.name}</label>
                                    <input type='radio' onClick={handleInput} value={genre.id} key={genre.id} text={genre.name} />
                                </div>
                            )
                        })}
                    </div>
                    <button className="submitGenre">Submit</button>
                </form>

                <div className="tvResultsSection">
                    {tvShows.map((show, showIndex) => {
                        return (
                            show.poster_path === null
                                ? null
                                : <div key={show.id} className="showContainer">
                                    <div className="showImage">
                                        <img src={`https://image.tmdb.org/t/p/original/${show.poster_path}`} alt={show.name} />
                                    </div>
                                    <div className="showInfo" key={show.id}>
                                        <h3>{show.name}</h3>
                                        {show.overview === ""
                                            ? <p>No description.</p>
                                            : <p>{show.overview}</p>}
                                        <p>Made in <span>{show.origin_country[0]}</span></p>
                                        <p>{Math.floor(show.popularity)} likes</p>
                                        <button onClick={handleAdd} id={showIndex}>Add to favourites</button>
                                    </div>
                                </div>
                        )
                    })}
                </div>
            </section>
        </section>
    );

}

export default TvShows;

