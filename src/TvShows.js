import './tvShows.css'
import {useState, useEffect} from 'react';
import axios from 'axios';
import TvResultsCatalog from './TvResultsCatalog.js'

const TvShows = () => {
    // error states
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState(false);

    // button states
    const [buttonContent, setButtonContent] = useState([]);

    // user query states
    const [userChoice, setUserChoice] = useState(0);
    const [searchQuery, setSearchQuery] = useState(0);

    // result states
    const [tvShows, setTvShows] = useState([]);

    // put the genre data in each button
    useEffect(() => {
        axios({
            url: `https://api.themoviedb.org/3/genre/tv/list?api_key=853030e957dca57316fe835ed75d0d32&language=en-US`,
            method: 'GET',
            dataResponse: 'json',
        }).then(
            (response) => {
                const rawData = response.data.genres;
                setButtonContent(rawData);

                if (rawData.length === 0) {
                    setAlert(true);
                } else {
                    setAlert(false);
                }
            },
            (error) => {
                setError(error);
            })
    }, []);

    // get the genre id of the button the user has clicked on
    const handleInput = (event) => {
        setUserChoice(event.target.value);
    };

    // set the id into state to submit to the api
    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchQuery(userChoice);
    }

    // call the second endpoint and get the movies with the selected genre ID
    useEffect(() => {
        if (searchQuery !== 0) {
            axios({
                url: `https://api.themoviedb.org/3/discover/tv?api_key=853030e957dca57316fe835ed75d0d32&with_genres=${searchQuery}`,
                method: 'GET',
                dataResponse: 'json',
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


    return (
        <section className="tvShowsContainer">
            <form onSubmit={handleSubmit} className="tvFormContainer">
            {buttonContent.map((genre) => {
                return (
                    <div key={genre.id} className="buttonContainer">
                    <label htmlFor="genre">{genre.name}</label>
                    <input type='button' onClick={handleInput} value={genre.id} key={genre.id}/>
                    </div>
                )
            })}
                <button className="submit">Submit</button>
            </form>

            <div className="tvResultsSection">
            {tvShows.map((show) => {
                return (
                    <div key={show.id} className="showContainer">
                        <h2>{show.name}</h2>
                    </div>
                )
            })}
            </div>
        </section>
    ); 

}

export default TvShows;