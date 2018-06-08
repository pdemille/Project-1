
(function() {

  /**
   * Obtains parameters from the hash of the URL
   * @return Object
   */
  function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  //var userProfileSource = document.getElementById('user-profile-template').innerHTML,
    //  userProfileTemplate = Handlebars.compile(userProfileSource),
    //  userProfilePlaceholder = document.getElementById('user-profile');

 // var oauthSource = document.getElementById('oauth-template').innerHTML,
   //   oauthTemplate = Handlebars.compile(oauthSource),
   //   oauthPlaceholder = document.getElementById('oauth');

  var params = getHashParams();

  var access_token = params.access_token,
      refresh_token = params.refresh_token,
      error = params.error;

  if (error) {
    alert('There was an error during the authentication');
  } else {
    if (access_token) {
      // render oauth info
      //oauthPlaceholder.innerHTML = oauthTemplate({
      //  access_token: access_token,
      //  refresh_token: refresh_token
      //});

$.ajax({
url: 'https://api.spotify.com/v1/me/playlists',
headers: {
'Authorization': 'Bearer ' + access_token
},
success: function(response) {
console.log(response);
var playResults = response.items;
console.log(playResults);


for(var i = 0; i < playResults.length; i++){
  var playlistBody = $("<div>");
    playlistBody.attr("id", "playlist" + [i]);
  var pLists = $("<p>");
  var songTracks = $("<div>");
    

    pLists.text(playResults[i].name);
    $("#playlists").append(playlistBody);
    $("#playlist"+[i]).append(pLists);
    $("#playlist"+[i]).append(songTracks);
    
    playlistID = playResults[i].id;
    userId = playResults[i].owner.id;
    trackCount = playResults[i].tracks.total;
console.log(trackCount)



//call gives me everything i need in a single call look into not doing the first call and see how that works out
  $.ajax({
    url: 'https://api.spotify.com/v1/users/'+ userId +'/playlists/'+playlistID+'/?fields=href,name,owner(!href,external_urls),tracks.items(added_by.id,track(name,href,album(name,href)))',
    headers: {
'Authorization': 'Bearer ' + access_token
},
success: function(result) {
console.log(result);
var pName = result.name;
console.log(pName);
var trackName = result.tracks
var trackList = result.tracks.items;


//returns back all the tracks per playlist in an array
console.log(trackList);
$.each(trackList, function(j){

console.log(trackList[j].track.name);

})

}
})

  }
  

$('#login').hide();
$('#loggedin').show();
}
});
   

      $.ajax({
          url: 'https://api.spotify.com/v1/me',
          headers: {
            'Authorization': 'Bearer ' + access_token
          },
          success: function(response) {
            //userProfilePlaceholder.innerHTML = userProfileTemplate(response);

           $('#login').hide();
            $('#loggedin').show();
          }
      });
    } else {
        // render initial screen
        $('#login').show();
        $('#loggedin').hide();
    }

    document.getElementById('obtain-new-token').addEventListener('click', function() {
      $.ajax({
        url: '/refresh_token',
        data: {
          'refresh_token': refresh_token
        }
      }).done(function(data) {
        access_token = data.access_token;
        //oauthPlaceholder.innerHTML = oauthTemplate({
          //access_token: access_token,
         // refresh_token: refresh_token
       // });
      });
    }, false);
  }
})();
