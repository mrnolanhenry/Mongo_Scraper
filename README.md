# Mongo_Scraper

Scrape, favorite, and comment on articles from the /r/worldnews subreddit.

## [Deployed Here](https://limitless-ravine-91739.herokuapp.com/)

## Installing Locally
Git clone the repository to your local machine: 

HTTPS:
```
$ git clone https://github.com/enfenry/Mongo_Scraper.git
```
SSH:
````
$ git clone git@github.com:enfenry/Mongo_Scraper.git
````

Next, within the repository, install necessary dependencies by running:
````
$ npm install
````

You should now be able to start the server by runnning:
````
$ node server.js
````

Finally, navigate to localhost:4000 in your browser.

## Built With
* [Node](https://nodejs.org/en/) - Backend JS
* [Cheerio](https://cheerio.js.org/) - Web Scraping
* [Express](https://expressjs.com/) - Web App Framework
* [Express-Handlebars](https://github.com/wycats/handlebars.js) - Handlebars view engine for Express
* [Mongoose](https://mongoosejs.com/) - Database

