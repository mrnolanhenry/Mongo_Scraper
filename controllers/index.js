const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const Note = require('../models/Note');
const app = express();
const cheerio = require('cheerio');
const axios = require('axios');


//  ----------------------------------------------
router.get("/", (req, res) => {
    console.log('test-1');
    // res.render("index", { Article: res });
    Article.find({})
        // ..and populate all of the notes associated with it
        .populate("note")
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            // res.json(dbArticle);
            res.render("index", { Article: dbArticle });
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

router.get("/starred", (req, res) => {
    // Grab every document in the Articles collection
    Article.find({ starred: true })
        // ..and populate all of the notes associated with it
        .populate("note")
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.render("index", { Article: dbArticle });
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// A GET route for scraping the website
router.get("/scrape", (req, res) => {
    console.log('test-2');
    // First, we grab the body of the html with axios
    axios.get("https://old.reddit.com/r/worldnews/").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        // Now, we grab every h2 within an article tag, and do the following:
        $(".link .title").each(function (i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            // Create a new Article using the `result` object built from scraping
            Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    // console.log(dbArticle);
                })
                .catch(function (err) {
                    // If an error occurred, log it
                    console.log(err);
                });
        });
        res.redirect("/");
    });
});

// Route for getting all Articles from the db
router.get("/articles", (req, res) => {
    // Grab every document in the Articles collection
    Article.find({})
        // ..and populate all of the notes associated with it
        .populate("note")
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Route for getting starred Articles from the db
router.get("/articles/starred", (req, res) => {
    // Grab every document in the Articles collection
    Article.find({ starred: true })
        // ..and populate all of the notes associated with it
        .populate("note")
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Route for grabbing a specific Article by id, populate it with it's note
router.get("/articles/:id", (req, res) => {
    // console.log("req.params.id",req.params.id);
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our ..
    Article.findOne({ _id: req.params.id })
        // ..and populate all of the notes associated with it
        .populate("note")
        .then(function (dbArticle) {
            // console.log("dbArticle",dbArticle);
            // If we were able to successfully find an Article with the given id, send it back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Route for saving/updating an Article's associated Note
router.post("/articles/:id", (req, res) => {
    // Create a new note and pass the req.body to the entry
    Note.create(req.body)
        .then(function (dbNote) {
            // console.log('dbNote',dbNote)
            // console.log('req.body', req.body);
            // console.log('req.params',req.params)
            let query = {
                note: dbNote._id
            }
            if (req.body.starred) {
                query.starred = req.body.starred;
            }
            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return Article.findOneAndUpdate({ _id: req.params.id }, query, { new: true });
        })
        .then(function (dbArticle) {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

router.post('/articles/new/:id', (req, res) => {
    let newNote = new Note(req.body);
    newNote.save(function(err, doc) {
        if (err) {
            console.log(err);
            res.status(500);
        } else {
            Article.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { 'notes': doc.id } },
                function(error, newDoc) {
                    if (error) {
                        console.log(error);
                        res.status(500);
                    } else {
                        res.redirect('/saved');
                    }
                }
            );
        }
    });
});

module.exports = router;



// router.use('/apiRoutes', require('./apiRoutes'));
// module.exports = router;