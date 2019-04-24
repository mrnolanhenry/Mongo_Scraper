// const express = require('express');
// const router = express.Router();
// const Article = require('../../models/Article');
// const Note = require('../../models/Note');

// router.get('/', (req, res) => {
//     console.log('test-5');
//     Note
//         .find({})
//         .exec(function(err, notes) {
//             if (err) {
//                 console.log(err);
//                 res.status(500);
//             } else {
//                 res.status(200).json(notes);
//             }
//         });
// });

// router.post('/:id', (req, res) => {
//     let newNote = new Note(req.body);
//     newNote.save(function(err, doc) {
//         if (err) {
//             console.log(err);
//             res.status(500);
//         } else {
//             Article.findOneAndUpdate(
//                 { _id: req.params.id },
//                 { $push: { 'notes': doc.id } },
//                 function(error, newDoc) {
//                     if (error) {
//                         console.log(error);
//                         res.status(500);
//                     } else {
//                         res.redirect('/saved');
//                     }
//                 }
//             );
//         }
//     });
// });

// router.delete('/:id', (req, res) => {
//     Note.findByIdAndRemove(req.params.id, (err, note) => {
//         if (err) {
//             console.log(err);
//             res.status(500);
//         } else {
//             res.redirect('/saved');
//         }
//     });
// });

// module.exports = router;