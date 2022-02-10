import './App.css';
import Nav from './Components/Nav'
import Articles from './Components/Articles'
import SingleArticle from './Components/SingleArticle';
import Users from './Components/Users'
import { useState } from 'react';
import { userContext } from './utils/user';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import frog from './frog.png'

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    username: 'jessjelly', name : 'Jess LovesCode', avatar_url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.CxW6g1vJumzy8stjI7oEqwHaHa%26pid%3DApi&f=1'}) 
  return (
  <BrowserRouter>
  <userContext.Provider value={{loggedInUser, setLoggedInUser}}>
  <div className='App'>
    <img class='frog-img' src={frog} alt='frog-img' />
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
