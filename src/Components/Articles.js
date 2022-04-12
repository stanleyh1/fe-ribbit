import React from "react";
import { Link, useParams } from "react-router-dom";
import { getArticles, postArticle } from '../utils/api';
import { useState, useEffect } from 'react';


const Articles = ({ loggedInUser }) => {

    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [addArticle, setAddArticle] = useState({})

        function handleSubmit(event) {
            event.preventDefault()
        
            return postArticle(addArticle).then(() => {
                setArticles((currentArticles) => {
                    const updatedArticles = [ addArticle, ...currentArticles]
                    return updatedArticles
                })
            });
            };
        
            const handleChange = (event) => {
                const value = event.target.value
                setAddArticle((currentArticle) => {
                    const newArticle = {...currentArticle}
                    newArticle.body = value
                    return newArticle
                })
                console.log(addArticle)
            }

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
        <>
        <ul className='articles'>
        {articles.map((article) => { 
        return <Link key={article.title} to={`/article/${article.article_id}`} className='link'><li className='article-card-home'>{article.title}
        </li></Link>
        })}
        </ul>
        <br/>
        <form onSubmit={handleSubmit}>
        <legend>Post an Article</legend>
        <input value={addArticle.title} onChange={handleChange} placeholder= "title" required></input>
        <br/>
        <input value={addArticle.body} onChange={handleChange} placeholder="write your article here" required></input>
        <br/>
        <button className='btn' type="submit">Post Article</button>
        </form>
        </>
    )
}

export default Articles;

