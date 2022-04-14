import React from "react";
import { getTopics } from '../utils/api';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../utils/user';
import { useContext } from "react";
import frog from '../images/frog.png';
import Capitalise from "../utils/strings";
import { useNavigate } from 'react-router-dom';


const Nav = () => {
    const [topicList, setTopicList] = useState([])
    const { loggedInUser } = useContext(userContext)

    useEffect(() => {
        getTopics().then((topicsFromApi) => {
            setTopicList(topicsFromApi)
        })
    }, [])

    const navigate = useNavigate()
    
return (
    <nav className="navBar">
        <div className='ribbit'>
        <img className='frog-img' src={frog} alt='frog-img' />
        <h1>Ribbit</h1>
        </div>

        <div className="navLinks">
        <Link to="/" className="link">
        Home
        </Link>
        {topicList.map((topic) => { return (
            <Link to={`/articles/${topic.slug}`} className='link' key={topic.slug} >
                {Capitalise(topic.slug)}
            </Link>
        )})}
        <Link to="/users" className="link">
        Users
        </Link>
        </div>
        <div className='navUser'>
        <img className='UserImg' src={loggedInUser.avatar_url} alt='userImage'/>
        <span>{loggedInUser.username}</span>
        </div>
        </nav>
    );
};


export default Nav;