import './App.css';
import './Styles/Articles.css'
import './Styles/Nav.css'
import './Styles/SingleArticle.css'
import './Styles/Users.css'
import Nav from './Components/Nav';
import Articles from './Components/Articles';
import SingleArticle from './Components/SingleArticle';
import Users from './Components/Users';
import Error from './Components/Error'
import { useState } from 'react';
import { userContext } from './utils/user';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    username: 'jessjelly',
    name: 'Jess Jelly',
    avatar_url:
      'https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141'
  }) 

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
    <Route path="/*" element={<Error />} />
    </Routes>
    <a href='https://www.flaticon.com/free-icons/frog' title="frog icons" className='link' id='frog-icon'>Frog icons created by Culmbio - Flaticon</a>
  </div>
  </ userContext.Provider>
  </BrowserRouter>
  )
}

export default App;
