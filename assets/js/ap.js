// pull search input from urban dictionary form 
var search = "zomg";

var queryURL = "https://urbanscraper.herokuapp.com/search/" + search;

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response)

  // Loop through response array
  for (var i = 0; i < response.length; i++) {
    
    // create a definition div
    $definitionDiv = $("<div>")

    // grab the definition
    var $definition = $("<h5>")
      .addClass("definition")
      .text(i + "Definition: " + response[i].definition);

    // grab example
    var $example = $("<p>")
      .addClass("example")
      .text("Example: " + response[i].example);

    // append to $definitionDiv
    $definitionDiv.append($definition, $example);

    // append $definitionDiv to page
    $("#").append($definitionDiv);

    console.log($definitionDiv)

  };

});