// URBAN DICTIONARY AJAX CALL

// pull search input from urban dictionary form 
var search = "hit a lick";

var queryURL = "https://alex-rosencors.herokuapp.com?url=https://urbanscraper.herokuapp.com/search/" + search;

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response)

  // Loop through response array
  for (var i = 0; i < response.length; i++) {
    
    // create a definition div
    $definitionCard = $("<div>")
      .addClass("card")

    $cardBody = $("<div>")
      .addClass("card-body")

    // grab term
    $term = $("<h4>")
      .addClass("card-title")
      .text(search)

    // grab the definition
    var $definition = $("<h5>")
      .addClass("card-subtitle definition")
      .text((i + 1) + ")   Definition: " + response[i].definition);

    // grab example
    var $example = $("<p>")
      .addClass("card-text example")
      .text("Example: " + response[i].example);

    // append to $definitionDiv
    $definitionCard.append($term, $definition, $example);

    // append $definitionDiv to page
    $("#definitions").append($definitionCard);


  };

});

//ajax call for musixmatch song title
$("#songSearchButton").on("click",  function(event) {
  event.preventDefault();

  var song = $("#songInput").val();
  
  var apiKey = "f64fe601571e8c26f4b0845395793cff";
  
  var queryURL = "https://alex-rosencors.herokuapp.com?url=https://api.musixmatch.com/ws/1.1/track.search?q_track=" + song + "&s_track_rating=desc&page_size=25&apikey=" + apiKey
  
  console.log(queryURL);
  
  $.ajax ({
    url: queryURL,
    method: "GET"
  }).then(function(response){
  
    console.log(response)
  
    var trackList = response.message.body.track_list;
    console.log(trackList)
  
    for (var i = 0; i < trackList.length; i++){
      var $songBtn = $("<button>")
        .addClass("btn btn-primary col-12 mb-1 song-button")
        .attr("data-trackId", trackList[i].track.track_id)
      
      var $songName = $("<p>")
        .addClass("m-0")
        .text(`"${trackList[i].track.track_name}"`)
        
      var $artistName = $("<p>")
        .addClass("m-0")
        .text(trackList[i].track.artist_name)
  
      $songBtn.append($songName, $artistName)
      $("#song-buttons").append($songBtn)
  
    };

  });

});

$(document).on("click", ".song-button", function(event) {
  
  event.preventDefault();

  $("#lyrics").empty()

  var trackId = $(this).attr("data-trackId");
  console.log(trackId)

  var queryURL = "https://alex-rosencors.herokuapp.com?url=https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=" + trackId + "&apikey=f64fe601571e8c26f4b0845395793cff"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    var $lyrics = $("<p>").text(response.message.body.lyrics.lyrics_body).appendTo($("#lyrics"))
  })
})