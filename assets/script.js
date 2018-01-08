// Initial array of celebrity
var celebrities = ["Chris Farley", "Tom Brady", "Jennifer Aniston", "Jennifer Lawerence", "Seth Rogen", "Adam Sandler", "Demi Lovato", "The Rock", "Donald Trump", "Chris Pratt", "Emma Stone"];

// Calling the renderButtons function at least once to display the initial list of celebrities
renderButtons();

// Function for displaying celebrity data
function renderButtons() {
  // Deleting the celebrity buttons prior to adding new celebrity buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#celebrities-view").empty();
  // Looping through the array of celebrities
  for (var i = 0; i < celebrities.length; i++) {
    // Then dynamicaly generating buttons for each celebrity in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var aButton = $("<button>");
    // Adding a class
    aButton.addClass("celebrity mr-2 mb-2 btn-info");
    // Adding a data-attribute with a value of the celebrity at index i
    aButton.attr("data-name", celebrities[i]);
    // Providing the button's text with a value of the celebrity at index i
    aButton.text(celebrities[i]);
    // Adding the button to the HTML
    $("#celebrities-view").append(aButton);
  }
}

// This function handles events where one button is clicked
$("#add-celeb").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();
  // This line will grab the text from the input box
  var celebrity = $("#celeb-input").val().trim();
  // The celebrity from the textbox is then added to our array
  celebrities.push(celebrity);
  // calling renderButtons which handles the processing of our celebrity array
  renderButtons();
  //clear the input field
  $('#celeb-input').val('');
});

// // Event listener for our celebrity-button
$(".celebrity").on("click", function() {
  //empty the images
  $("#images").empty();
  //variable for clicked button
  celebrityName = $(this).attr('data-name');
  // Constructing a queryURL using the animal name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  celebrityName + "&api_key=vpSY8cb9ydc2ZBVnTmULEiPU3iuwgF0B&limit=10";
  // Performing an AJAX request with the queryURL
  $.ajax({
  url: queryURL,
  method: "GET"
  })
  // After data comes back from the request
  .done(function(response) {
    console.log(queryURL);
    console.log(response);
    // storing the data from the AJAX request in the results variable
    var results = response.data;
    // Looping through each result item
    for (var i = 0; i < results.length; i++) {
      // Creating and storing a div tag
      var celebDiv = $("<div>");
      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("Rating: " + results[i].rating);
      // Creating and storing an image tag
      var celebImage = $("<img>");
      // Setting the src attribute of the image to a property pulled off the result item
      celebImage.attr("src", results[i].images.fixed_height.url);
      celebImage.attr("data-still", results[i].images.fixed_height_still.url);
      celebImage.attr("data-animate", results[i].images.fixed_height.url);
      celebImage.attr("class", 'gif');
      celebImage.attr("data-state", 'animate');
      // Appending the paragraph and image tag to the celebDiv
      celebDiv.append(p);
      celebDiv.append(celebImage);
      // Prependng the celebDiv to the HTML page in the "#gifs-appear-here" div
      $("#images").prepend(celebDiv);
    }
  });
});

//used to pause the gifs that appear
// $(".gif").on("click", function() {
//     console.log("you clicked a gif");
//     // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
//     var state = $(this).attr("data-state");
//     // If the clicked image's state is still, update its src attribute to what its data-animate value is.
//     // Then, set the image's data-state to animate
//     // Else set src to the data-still value
//     if (state === "still") {
//       $(this).attr("src", $(this).attr("data-animate"));
//       $(this).attr("data-state", "animate");
//     } else {
//       $(this).attr("src", $(this).attr("data-still"));
//       $(this).attr("data-state", "still");
//     }
//   });
