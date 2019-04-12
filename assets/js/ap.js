//ajax call for musixmatch song title
var song = "grits";

var apiKey = "f64fe601571e8c26f4b0845395793cff";

var queryUrl = "https://alex-rosencors.herokuapp.com?url=https://api.musixmatch.com/ws/1.1/track.search?q_track=" + song + "&s_track_rating=desc&page_size=25&apikey=" + apiKey

console.log(queryUrl)

$.ajax ({
  url: queryUrl,
  method: "GET"
}).then(function(response){

  console.log(response)

  var trackList = response.message.body.track_list;
  console.log(trackList)

  for (var i = 0; i < trackList.length; i++){
    var $songBtn = $("<button>")
      .addClass("btn btn-primary col-12 mb-2")
      .attr("data-trackId", trackList[i].track.track_id)
    
    var $songName = $("<p>")
      .addClass("m-0")
      .text(`"${trackList[i].track.track_name}"`)
      
    var $artistName = $("<p>")
      .addClass("m-0")
      .text(trackList[i].track.artist_name)

    $songBtn.append($songName, $artistName)
    $("#button").append($songBtn)
  }
});

