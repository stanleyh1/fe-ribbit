import React from "react";
import { getTopics } from '../utils/api';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { userContext } from '../utils/user'
import { useContext } from "react";


const Nav = () => {
    const [topicList, setTopicList] = useState([])
    const { loggedInUser } = useContext(userContext)

    useEffect(() => {
        getTopics().then((topicsFromApi) => {
            setTopicList(topicsFromApi)
        })
    }, [])
    
return (
    <nav className="navBar">
        <Link to="/" className="link">
        Home
        </Link>
        {topicList.map((topic) => { return (
            <Link to={`/articles/${topic.slug}`} className='link' key={topic.slug} >
                {topic.slug}
            </Link>
        )})}
        <Link to="/users" className="link">
        Users
        </Link>
        <div className='navUser'>
        <span>{loggedInUser.username}</span>
        <img className='UserImg' src={loggedInUser.avatar_url} alt='userImage'/>
        </div>
        </nav>
    );
};


export default Nav;