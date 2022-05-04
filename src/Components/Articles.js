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
            const sorted = [...articles]
                .map((article) => {
                    article.created_at = new Date(article.created_at)
                    return article
                })
                .sort((articleA, articleB) => articleB[type] - articleA[type]);
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
        return <Link key={article.title} to={`/article/${article.article_id}`} className='link'><li className='article-card-home'><p className='article-title'>{article.title}</p><p className='article-info'>{formatDate(article.created_at)}</p><p className='article-info'>Votes: {article.votes}</p><p className='article-info'>Posted by: {article.author}</p>
        </li></Link>
        })}
        </ul>
        </>
    )
}

export default Articles;

