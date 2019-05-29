$(document).ready(function () {

  // When someone clicks the comment logo
  $(document).on("click", "i.comment", function () {
    var thisId = $(this).parent().data("id");

    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      .then(function (data) {

        $(".modal-title").empty();
        $(".modal-body").empty();
        $(".modal-footer").empty();
        $(".modal-title").append("<h2>" + data.title + "</h2>");

        for (var i = 0; i < data.notes.length; i++) {
          $(".modal-body").append("<p class='note' data-id=" + data.notes[i]._id + ">" + data.notes[i].body +"<button type='button' class='btn-delete btn btn-danger' data-id='" + data.notes[i]._id + "' id='deletenote'>X</button></p>");
        }

        $(".modal-body").append("<textarea id='bodyinput' name='body'></textarea>");

        $(".modal-footer").append("<button type='button' class='btn btn-primary' data-id='" + data._id + "' id='savenote' data-dismiss='modal'>Add Note</button>");
        
        $(".modal-footer").append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>')
      });

    $("#modal").modal("show");
  });


  // When someone clicks the star logo
  $(document).on("click", "i.star", function () {
    var thisId = $(this).data("id");

    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      .then((data) => {
        data.starred = !data.starred;
        if (!data.starred) {
          $(this).attr("class", "far fa-star star");
        }
        else {
          $(this).attr("class", "fas fa-star star");
        }

        // Run a POST request to change starred property
        $.ajax({
          method: "POST",
          url: "/star/" + thisId,
          data: {
            starred: data.starred
          }
        })
      })

  });

  // When you click the savenote button
  $(document).on("click", "#savenote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).data("id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
  });


  // When you click the deletenote button
  $(document).on("click", "#deletenote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).data("id");

    // Run a DELETE request to change the note
    $.ajax({
      method: "DELETE",
      url: "/notes/" + thisId
    })
    .then(() => {
      $(this).parent().empty();
    })
  });

});