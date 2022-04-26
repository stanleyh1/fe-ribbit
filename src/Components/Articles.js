import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getArticles } from '../utils/api';
import formatDate from '../utils/dates';


const Articles = ({ loggedInUser }) => {

    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortType, setSortType] = useState('articles');
    const { topic } = useParams();
    
    useEffect(() => {
        getArticles(topic).then((articlesFromApi) => {
            setArticles(articlesFromApi)
            setIsLoading(false)
        })
    }, [topic])
    
    useEffect(() => {
        const sortArray = type => {
            const types = {
                created_at: 'created_at',
                votes: 'votes',
            };
            const sortProperty = types[type];
            const sorted = [...articles].sort((a, b) => b[sortProperty] - a[sortProperty]);
            setArticles(sorted);
            };
            sortArray(sortType);
    }, [sortType]);


    if (isLoading)  {
        return <p>Loading...</p>
    }
    return (
        <>
        <legend>Sort By: </legend>
        <select onChange={(e) => setSortType(e.target.value)}> 
        <option value="created_at">Date</option>
        <option value="votes">Number of Votes</option>
        </select>
        <ul className='articles'>
        {articles.map((article) => { 
        return <Link key={article.title} to={`/article/${article.article_id}`} className='link'><li className='article-card-home'><h3>{article.title}</h3><p>{formatDate(article.created_at)}</p><p>Votes: {article.votes}</p><p>Posted by: {article.author}</p>
        </li></Link>
        })}
        </ul>
        </>
    )
}

export default Articles;

