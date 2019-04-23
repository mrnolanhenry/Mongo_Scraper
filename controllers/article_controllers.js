let express = require("express");
let app = express();
let Article = require("../models/Article");

module.exports = function (app) {

    app.get("/", function (req, res) {
        console.log('testing!');
        // let cb = function(argument) {
        //     res.render("index", { Article: argument });
        // }
        // Article.selectAll(cb);

        res.render("index",{ Article: res });

    //     Article.find({})
    //     // ..and populate all of the notes associated with it
    //     .populate("note")
    //   .then(function(dbArticle) {
    //     // If we were able to successfully find Articles, send them back to the client
    //     res.json(dbArticle);
    //   })
    //   .catch(function(err) {
    //     // If an error occurred, send it to the client
    //     res.json(err);
    //   });
    });

    // app.post("/api/articles", function (req, res) {
    //     let cb = function() {
    //         res.redirect("/");
    //     }
    //     Article.insertOne("article_name","devoured",req.body.Article,cb);
    // });

    // app.put("/api/articles/:id", function (req,res) {
    //     let cb = function(result) {
    //             if (result.changedRows == 0) {
    //               return res.status(404).end();
    //             } else {
    //               res.status(200).end();
    //             }
    //     }
    //     Article.updateOne("devoured",true,req.body.id,cb);
    // })


}

