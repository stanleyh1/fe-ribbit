import './App.css';
import Nav from './Components/Nav';
import Articles from './Components/Articles';
import SingleArticle from './Components/SingleArticle';
import Users from './Components/Users';
import { useState } from 'react';
import { userContext } from './utils/user';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import jessjelly from '../src/images/jessjelly.jpeg';

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    username: 'jessjelly', name : 'Jess LovesCode', avatar_url: jessjelly }) 
  return (
  <BrowserRouter>
  <userContext.Provider value={{loggedInUser, setLoggedInUser}}>
  <div className='App'>
    <Nav />
    <Routes>
    <Route path="/" element={<Articles />} />
    <Route path="/articles/:topic" element={<Articles loggedInUser={loggedInUser}/>} />
    <Route path="/users" element={<Users />} />
    <Route path="/article/:article_id" element={<SingleArticle loggedInUser={loggedInUser}/>} />
    <Route path="/comments/:comment_id" element={<SingleArticle loggedInUser={loggedInUser} />} />
    </Routes>
    <a href='https://www.flaticon.com/free-icons/frog' title="frog icons" className='link' id='frog-icon'>Frog icons created by Culmbio - Flaticon</a>
  </div>
  </ userContext.Provider>
  </BrowserRouter>
  )
}

export default App;
