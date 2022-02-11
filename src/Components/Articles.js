import React from "react";
import { Link, useParams } from "react-router-dom";
import { getArticles } from '../utils/api';
import { useState, useEffect } from 'react';


const Articles = () => {

    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { topic } = useParams()
    
    useEffect(() => {
        getArticles(topic).then((articlesFromApi) => {
            setArticles(articlesFromApi)
            setIsLoading(false)
        })
    }, [topic])
    
    if (isLoading)  {
        return <p>Loading...</p>
    }
    return (
        <ul className='articles'>
        {articles.map((article) => {
        return <Link key={article.title} to={`/article/${article.article_id}`}><li className='link'>{article.title}
        </li></Link>
        })}
        </ul>
    )
}

export default Articles;