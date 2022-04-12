# Checklist for Northcoders News Front End

## README - write your own and make sure that it:

- [ ] has a link to the deployed version
- [ ] provides general info about your app
- [ ] includes links to your back end repo
- [ ] specifies the minimum version of Node required to run locally (check your Node version, `node --version` and use the major version that you are on)
- [ ] has clear instructions on how to run your project locally (`git clone <repo-url>, cd ...`)

## UX

- [✅] Basic styling added
- [✅] Responsive design
- [✅] Items aligned - items _are_ aligned, although might it be worth thinking about _how_ we're aligning them? All text is centre-aligned, whereas most sites like this may left-align article content
- [✅] Content legible (not too wide, obstructed, etc)
 - content spans the whole screen on desktop (including the clickable space for your links to articles) - worth setting a max-width maybe? Generally you will see 800px used
- [✅] Refreshing doesn’t cause an issue on sub-pages
- [✅] No errors in the console
 - [✅]there is a `classNAme` somewhere - we've all been there! :)
- [✅] Votes / Posts / Deletions happen instantly _OR_ give user indication of loading
 - looks like we have optimistic rendering on article and comment votes, but not yet on deletions... would be nice to have either optimistic rendering or an acknowledgement that the click has registered and something is in progress :)

## Functionality

### Login

- [✅] Some indication of who is logged in (this can be hardcoded)
 - lovely user pictures!

### Articles 

- [✅] Serves all articles / top articles
- [✅] Can vote on articles
- [✅] Can vote a maximum of once in either direction per page load
- [✅] Votes are persistent when page is refreshed
- [✅] Topic pages load only relevant articles (especially when navigating from one topic page to another)
- [ ] Can sort articles by date created / comment_count / votes

### Individual Article / Comments

- [✅] Individual articles are served with comments
- [✅] Can vote on comments
- [✅] Can vote a maximum of once in either direction per page load
- [✅] Votes are persistent when page is refreshed
- [✅] Can post new comments, which are persistent
 - _lovely_ functionality here! Look at that controlled component! 😄

### Additional functionality:

- [✅] Can only delete comments of logged in user
- [✅] Deleted comments don’t re-appear on re-render/refresh
- [ ] sort comments by date created / votes
- [ ] navigate over pages of articles (if implemented in back-end)
- [ ] navigate over pages of comments (if implemented in back-end)
- [ ] filter / display articles by specific user
- [ ] post new article
- [ ] delete logged in user's articles

## Error Handling

- [ ] Bad url
- [ ] Bad topic slug in url
- [ ] Bad article id in url
- [✅] Post comment: (No text in comment body / Can you post without logging in?)

## Code

- [✅] Well named components
- [✅] Components reused where possible (`Articles` / `Voter`...)
- [✅] Minimal state - don't hold derivable data in state
- [✅] Set state correctly, using previous state where possible
- [~] Handle asynchronicity clearly (i.e. isLoading pattern)
 - implemented in `Articles` - great! Could we implement it in other components such as `SingleArticle`?
- [✅] Functions are DRY (`handleChange` for controlled components / api calls)
- [✅] Use object destructuring where possible
- [✅] Tidy? If not: ESLint / Prettier
- [✅] `node_modules` git ignored
- [~] No `console.log`s / comments
 - mostly yes, just a couple of stragglers :)
- [~] remove unnecessary files (e.g. App.test.js)
 - almost all done - just noticed there is an `app.css` and an `index.css`, perhaps you could combine them and/or remove one?

## MAKE SURE ALL TESTS ARE STILL PASSING IN BACK END

## Once everything else is complete, here are some extra challenges:

- [ ] Use `aXe` extension to check for a11y issues
- [ ] Make sure any pure functions are extracted and tested with `Jest`
- [✅] Use Context API for sharing logged in user amongst components
 - nice work on this!
- [ ] Create a user page where you can change their profile information if they are "logged in as the right user". This will require having an additional PATCH endpoint on your backend
- [ ] Create a view for all the articles a user has liked. This will require additional functionality on your backend
- [ ] Make use of [web sockets](https://en.wikipedia.org/wiki/WebSocket) to allow your page to automatically update with a little notification if there have been any recent posts. [socket.io](https://socket.io/) is quite a good one to use and has some good getting started guides. This will require additional functionality on your backend for recent articles e.g. last 10 minutes

## General

- Love the name Ribbit - very clever - and it means you can use a frog logo!
- Nice clean project, good code, context used, optimistic rendering and controlled components - great stuff!
- In App.js, you have a route that goes to `/comments/:comment_id` - will we ever need this route, or will comments always be displayed on article pages?
- really like how you're handling the multiple users! Once you're happy with the main portion of your app, could you think about getting these users from the DB instead of setting a state for them in your front end?
- your background colour currently only extends to cover `App`... it should cover `body` - these are currently in the two different CSS files, so the case for combining them is there :)
- styling has some nice choices - once it's all in place it will look and feel like a nice app!
- could we request a clickable frog to link back to the homepage please! :)