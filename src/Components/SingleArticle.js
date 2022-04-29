import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Votes from "./Votes";
import CommentVotes from './CommentVotes';
import { getSingleArticle, getComments, postComment, deleteComment } from '../utils/api';
import formatDate from '../utils/dates';

const SingleArticle = ({ loggedInUser }) => {
    
    const { article_id } = useParams();
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([]);

    const [addComment, setAddComment] = useState(
        {'username' : loggedInUser.username, 
        'votes' : 0,
        'body' : '',
        'author' : loggedInUser.username});
        const [sortType, setSortType] = useState('comments')
        const [isLoading, setIsLoading] = useState(true)


    
    function handleSubmit(event) {
    event.preventDefault()
    
    return postComment(article_id, addComment).then(() => {
        setComments((currentComments) => {
            const updatedComments = [ addComment, ...currentComments]
            return updatedComments
        })
    });
    };

    const handleChange = (event) => {
        const value = event.target.value
        setAddComment((currentComment) => {
            const newComment = {...currentComment}
            newComment.body = value
            return newComment
        })
        console.log(addComment)
    }

    useEffect(() => {
        getSingleArticle(article_id).then((article) => {
        setArticle(article);
    });
    }, [article_id]);

    useEffect(() => {
        getComments(article_id).then((comments) => {
            setComments(comments)
            setIsLoading(false)
        })
    }, [article_id])

    useEffect(() => {
        const sortArray = type => {
            const types = {
                created_at: 'created_at',
                votes: 'votes',
            };
            const sortProperty = types[type];
            const sorted = [...comments].sort((a, b) => b[sortProperty] - a[sortProperty]);
            setComments(sorted);
            };
            sortArray(sortType);
    }, [sortType]);

    if (isLoading)  {
        return <p>Loading...</p>
    }
    return (
    <main>
    <div className='article-card-container'>
    <div className='article-card'>
        <h2 className='single-article-title'>{article.title}</h2>
        <p className='article-text'>{article.body}</p>
        <p className='author'>Posted by {article.author} on {formatDate(article.created_at)}</p>
        <Votes votes={article.votes} article_id={article.article_id} />
    </div>
    </div>
   
    <div className='comments-container'>
    <div className='post-comment-form'>
        <form className='post-comments-form' onSubmit={handleSubmit}>
        <legend>Post a comment on '{article.title}'</legend>
        <input className='new-comment-input' value={addComment.body} onChange={handleChange} placeholder="Post a comment..." required></input>
        <button className='btn' type="submit">Post comment</button>
        </form>
        </div>   
        <br/> 
    <h3 className='comments-header'>Comments</h3>
    <br/>
    <div className='comments-sort-by'>
    <legend>Sort By: </legend>
        <select onChange={(e) => setSortType(e.target.value)}> 
        <option value="created_at">Date</option>
        <option value="votes">Number of Votes</option>
        </select>
        </div>

        <br/>
    <div className='existing-comments'>
    <ul>
        {comments.map((comment, index) => {
        return <div className='comment-card'><li key={index} className='comment'>
            <p className='comments-body'>{comment.body}</p>
            <p className = 'comment-author'>Posted by: {comment.author}</p>
            <p className='comments-date'> on: {formatDate(comment.created_at)}</p>
            <CommentVotes commentVotes={comment.votes} comment_id={comment.comment_id} />
            <br/>
            <button className='btn' onClick={(e) => {
                if ( comment.author === loggedInUser.username) {
            deleteComment(comment.comment_id, comment).then(() => {
                setComments((currentComments) => {
                    return currentComments.filter((currentComment) => {
                        return comment.comment_id !== currentComment.comment_id
                    })
                })
            })
            }
            else { alert("Only the author can delete this comment!")}
            }}>
            Delete comment
            </button>
            </li></div>
            })}
        </ul>
        </div>
        <br/>
        </div>
    </main>
    );
};

export default SingleArticle;