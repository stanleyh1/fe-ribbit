import React from "react";
import { Link, useParams } from "react-router-dom";
import { getArticles, postArticle } from '../utils/api';
import { useState, useEffect } from 'react';


const Articles = ({ loggedInUser }) => {

    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [addArticle, setAddArticle] = useState({})
    const [sortType, setSortType] = useState('articles')

        function handleSubmit(event) {
            event.preventDefault()
            return postArticle(addArticle).then(() => {
                setArticles((currentArticles) => {
                    const updatedArticles = [addArticle, ...currentArticles]
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
        return <Link key={article.title} to={`/article/${article.article_id}`} className='link'><li className='article-card-home'><h4>{article.title}</h4><p>{article.created_at}</p><p>{article.votes}</p><p>{article.author}</p>
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

