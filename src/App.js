import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import FavouritesList from './components/FavouritesList.js';
import TvShows from './components/TvShows.js'
import Food from './components/Food.js';


function App() {

  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(false);

  const [tvShows, setTvShows] = useState([]);
  const [takeout, setTakeout] = useState([]);

  const [userInput, setUserInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
      axios({
        url: `https://api.themoviedb.org/3/discover/tv?api_key=853030e957dca57316fe835ed75d0d32`,
        method: 'GET',
        dataResponse: 'json',
      }).then(
        (response) => {
          const rawData = response.data.results;
          console.log(rawData);

          if (rawData.length === 0) {
            setAlert(true);
          } else {
            setTvShows(rawData);
            setAlert(false);
          }
        },
        (error) => {
          setError(error);
        })
  }, []);


  // Onchange for location input
  const handleInput = (event) => {
    // put the captured text in userInput
    setUserInput(event.target.value);
  }

  // Handle our location submit
  // empty previous array and replace with new search
  const handleSubmit = (event) => {
    event.preventDefault();
    // set the term that calls our API
    setSearchQuery(userInput);
    // RESET array / results section
    setUserInput("");
  }

  return (
    <div className="App">
      <nav>
        <ul>
          <li>Home</li>
          <li>Takeout</li>
          <li>TV shows</li>
        </ul>
      </nav>

      <h1>Homepage</h1>

      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input type="text" id="search" onChange={handleInput} value={userInput} placeholder='Enter your location' />
          <button>Search</button>
        </form>
      </div>

      <section className="tvShows">
        <TvShows />
        <Food />
      </section>


    </div>
  );
}

export default App;


// STEPS

// INSTALL
  // Install firebase
  // Install axios
  // Install react-router-dom

// IMPORTS
  // useState
  // useEffect
  // Axios
  // Routes, route, link
  // getDatabase, ref, onValue, push, remove
  // BrowserRouter in index.js

// 1. Main/landing page -- instructions on how to use the app, location input, links at the top that lead to each search page "Food" and "Movie"
  // - Main page will live in the App component
  // - Create a text box for the user to enter their location
  // - Create a button that will give the user a random takeout & TV option
    // - When the user clicks the button, call both API's and set them up to return an array of take-out options and an array of TV shows
    // - Create a random number generator and function that we can pass the number to as a parameter to return a random index from each array
    // - Display the random results on the page

// 2. Food page/component / TV page/component -- instructions for how to search, search bar, and results section/component 
  // - When a user enters a search time, call the API and put the returned data in state, which will trigger a re-render 
  // - Set up our JSX so that when the data enters state, the array gets mapped to the page
  // - Create a component for each search resuthe user has added lt
  // - Create a click event for each search result component that adds the property to the user's list (push to Firebase)

// 3. List component -- Displays the items 
  // - Create another state called 'list' that will store the user's favourited items
  // - Within each result component, use an addToList function that pushes the object into the list state
  // - Create a list component that will hold the list items (slide-out menu)





// 1. Ask the user to search for a TV show (stretch goal: genre)
// 2. Ask the user to enter their location and search for food 
// 3. Display TV shows and food using the user's search query
// 4. 