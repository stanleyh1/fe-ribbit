import React from "react";
import { useState, useEffect } from "react";
import { getSingleArticle, getComments, postComment, deleteComment } from '../utils/api';
import { useParams } from "react-router";
import Votes from "./Votes";
import CommentVotes from './CommentVotes'

const SingleArticle = ({ loggedInUser }) => {
    const { article_id } = useParams();
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([])
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
        <h2 className='article-title'>{article.title}</h2>
        <p className='article-text'>{article.body}</p>
        <p className='author'>Posted by: {article.author} At: {article.created_at}</p>
        <Votes votes={article.votes} article_id={article.article_id} />
    </div>
    </div>
    <div className='comments-container'>
    <div className='comments'>
    <h3>Comments</h3>
    <legend>Sort By: </legend>
        <select onChange={(e) => setSortType(e.target.value)}> 
        <option value="created_at">Date</option>
        <option value="votes">Number of Votes</option>
        </select>
    <ul>
        {comments.map((comment, index) => {
        return <li key={index} className='comment'>
            <p classNAme='comments-body'>{comment.body}</p>
            <p className = 'comment-author'>Posted by {comment.author}</p>
            <CommentVotes commentVotes={comment.votes} comment_id={comment.comment_id} />
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
            </li>
            })}
        </ul>
        <br/>
        </div>
        <br/>
        <form onSubmit={handleSubmit}>
        <legend>Post a comment on '{article.title}'</legend>
        <input value={addComment.body} onChange={handleChange} placeholder="Post a comment..." required></input>
        <button className='btn' type="submit">Post comment</button>
        </form>
        </div>
    </main>
    );
};

export default SingleArticle;