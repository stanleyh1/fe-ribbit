# Welcome to Ribbit
## A Reddit style news aggregator

Ribbit displays articles based on various topics and allows you to vote and comment on these articles.

The hosted version can be accessed here: https://chipper-mochi-ea31e1.netlify.app/

The backend repo can be found here: https://github.com/stanleyh1/be-ribbit

### Available URLs

Topics are accessed through /topics/:topic_name/

Articles are accessed through /topics/:topic_name/:article_id or /topics/all/:article_id

Individual comments are not accessed directly, but displayed as part of the article page.

### How to Use Ribbit

clone this repository to an appropriate area on your hard drive with git clone https://github.com/stanleyh1/

Type cd hs-nc-news once the download is complete, and install the relevant dependencies with npm i react @reach/router axios

Once installation is complete, you should be able to launch a local version of the site with npm start, which by default will open up the site on localhost:3000