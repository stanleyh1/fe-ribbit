import './App.css';
import Nav from './Components/Nav'
import Articles from './Components/Articles'
import SingleArticle from './Components/SingleArticle';
import Users from './Components/Users'
import { useState } from 'react';
import { userContext } from './utils/user';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import frog from './images/frog.png'
import jessjelly from '../src/images/jessjelly.jpeg'

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    username: 'jessjelly', name : 'Jess LovesCode', avatar_url: jessjelly }) 
  return (
  <BrowserRouter>
  <userContext.Provider value={{loggedInUser, setLoggedInUser}}>
  <div className='App'>
    <img className='frog-img' src={frog} alt='frog-img' />
    <h1>Ribbit</h1>
    <Nav />
    <Routes>
    <Route path="/" element={<Articles />} />
    <Route path="/articles/:topic" element={<Articles />} />
    <Route path="/users" element={<Users />} />
    <Route path="/article/:article_id" element={<SingleArticle loggedInUser={loggedInUser}/>} />
    <Route path="/comments/:comment_id" element={<SingleArticle loggedInUser={loggedInUser} />} />
    </Routes>
  </div>
  </ userContext.Provider>
  </BrowserRouter>
  )
}

export default App;
