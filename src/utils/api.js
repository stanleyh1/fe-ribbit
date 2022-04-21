import axios from "axios";

const newsApi = axios.create({
    baseURL: "https://nc-news-hannah.herokuapp.com/",
});

export const getTopics = () => {
    return newsApi.get("api/topics").then((res) => {
        return res.data.topics;
    });
};

export const getArticles = (topic) => {
    return newsApi.get("api/articles", { params: { topic } }).then((res) => {
        return res.data.articles;
    });
};

export const getSingleArticle = (article_id) => {
    return newsApi.get(`api/articles/${article_id}`).then((res) => {
        return res.data.article;
    });
};

export const getArticlesByTopic = (topic) => {
    return newsApi.get("api/articles", { params: { topic } })
        .then((res) => {
        return res.data.articles;
    });
};

export const postArticle = (article) => {
    return newsApi.post(`api/articles`, article).then((res) => {
        console.log(res.data.article)
        return res.data.articles;
    });
};

export const getComments = (article_id) => {
    return newsApi.get(`api/articles/${article_id}/comments`).then((res) => {
        return res.data.comments
    })
}

export const postComment = ( article_id, comment ) => {
    return newsApi.post(`api/articles/${article_id}/comments`, comment).then((res) => {
        return res.data.comment;
    });
};

export const deleteComment = (comment_id, comment) => {
    return newsApi.delete(`api/comments/${comment_id}`, comment).then((res) => {
        return res.data;
    }).catch((err) => {
        return err;
    });
};

export const getUsers = () => {
    return newsApi.get("api/users").then((res) => {
        return res.data.users;
    });
};

export const patchVotes = (article_id, increment) => {
    return newsApi.patch(`/api/articles/${article_id}`, { inc_votes: increment })
        .then((res) => {
        return res.data;
        });
};

export const patchCommentVotes = (comment_id, increment) => {
    return newsApi.patch(`/api/comments/${comment_id}`, { inc_votes: increment })
        .then((res) => {
        return res.data;
        });
};