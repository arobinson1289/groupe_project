// URBAN DICTIONARY AJAX CALL
// pull search input from urban dictionary form
$("#dirtyWordSearchButton").on("click", function(event) {
  event.preventDefault();

  var word = $("#dirtyWordInput").val();
  
  $("#term").text(`"${word}"`);
  
  var queryURL = "https://alex-rosencors.herokuapp.com?url=https://urbanscraper.herokuapp.com/search/" + word;
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response)
  
    // Loop through response array
    for (var i = 0; i < response.length; i++) {
      
      // create a definition div
      $definitionCard = $("<div>")
        .addClass("card mb-3")
  
      $cardBody = $("<div>")
        .addClass("card-body")
  
      // grab the definition
      var $definition = $("<h5>")
        .addClass("card-subtitle definition")
        .text((i + 1) + ")   Definition: " + response[i].definition);
  
      // grab example
      var $example = $("<p>")
        .addClass("card-text example")
        .text("Example: " + response[i].example);
  
      // append to $definitionDiv
      $definitionCard.append($definition, $example);
  
      // append $definitionDiv to page
      $("#definitions").append($definitionCard);
  
    };
  
  });

  // Clear everything
  $("#definitions").empty();
  $("#dirtyWordInput").val("");

});


// MUSIX MATCH AJAX CALL
// ajax call for musixmatch song title
$("#songSearchButton").on("click",  function(event) {
  event.preventDefault();

  var song = $("#songInput").val();


  var apiKey = "f64fe601571e8c26f4b0845395793cff";
  
  var queryURL = "https://alex-rosencors.herokuapp.com?url=https://api.musixmatch.com/ws/1.1/track.search?q_track=" + song + "&s_track_rating=desc&page_size=15&apikey=" + apiKey
  
  console.log(queryURL);

  $.ajax ({
    url: queryURL,
    method: "GET"
  }).then(function(response){
  
    console.log(response)
  
    var trackList = response.message.body.track_list;
    console.log(trackList)

    var $header = $("<h4>")
      .addClass("mt-4")
      .text("Select A Song")
      .appendTo($("#song-buttons"));

    for (var i = 0; i < trackList.length; i++){
      var $songBtn = $("<button>")
        .addClass("btn btn-link col-12 mb-1 song-button")
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

  // Clear everything
  $("#song-buttons").empty();
  $("#songInput").val("");
  $("#lyrics").empty();

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

    var lyrics = response.message.body
    
    if (lyrics.length === 0) {
      $("#lyrics").text("Sorry, there are no lyrics for this song.")
    }
    else {
      $("#lyrics").text(response.message.body.lyrics.lyrics_body);
    };

  });

});