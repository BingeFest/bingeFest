import {useState, useEffect} from 'react';
import axios from 'axios';

const TvShows = () => {
    // error states
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState(false);

    // button states
    const [buttonContent, setButtonContent] = useState([]);

    // user query states
    const [userChoice, setUserChoice] = useState(0);
    const [searchQuery, setSearchQuery] = useState(0);

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

    // get the value of the button the user has clicked on
    const handleInput = (event) => {
        setUserChoice(event.target.value);
    };

    // submit the value to the API
    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchQuery(userChoice);
    }

    useEffect(() => {
        axios({
            url: `https://api.themoviedb.org/3/discover/tv?api_key=853030e957dca57316fe835ed75d0d32&with_genres=${searchQuery}`,
            method: 'GET',
            dataResponse: 'json',
        }).then(
            (response) => {
                const rawData = response.data.results;
                console.log(rawData);
            },
            (error) => {
                setError(error);
            })
    }, [searchQuery]);


    return (
        <>
        <form onSubmit={handleSubmit}>
        {buttonContent.map((genre) => {
            return (
                <div key={genre.id}>
                <label htmlFor="genre">{genre.name}</label>
                <input type='button' onClick={handleInput} value={genre.id} key={genre.id}/>
                </div>
            )
        })}
        <br></br>
        <button>Submit</button>
        </form>
        </>
    )

}

export default TvShows;