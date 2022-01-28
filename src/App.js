import './App.css';
import { Route, Routes } from 'react-router-dom';
// import FavouritesList from './components/FavouritesList.js';
import Food from './components/Food.js';
import Header from './components/Header'
import Footer from './components/Footer';
import TvShows from './components/TvShows.js'
import RandomCombo from './components/RandomCombo.js';
import WelcomeMessage from './WelcomeMessage';


function App() {

  return (
    <div className="App">
      <Header />



      {/* Routing Configuration */}

      <Routes>

        <Route path='/' element={<WelcomeMessage />} />
        <Route path='/food' element={<Food />}> </Route>
        <Route path='/tvshows' element={<TvShows />}></Route>
        <Route path='/randomcombo' element={<RandomCombo />}></Route>

      </Routes>
    <Footer />
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