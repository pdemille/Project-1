    
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
  
        var params = getHashParams();
  
        var access_token = params.access_token,
            refresh_token = params.refresh_token,
            error = params.error;
        
  
        if (error) {
          alert('There was an error during the authentication');
        } else {
          if (access_token) {
          
  //make a timeout that triggers a function after 60minutes targets the modal to pop up
  setTimeout(function () {$("#expireModal").modal('show');}, 3600000);
  $("#xButton").on("click", function(){
    $("#login").show();
  })
            $.ajax({
      url: 'https://api.spotify.com/v1/me/playlists',
      headers: {
        'Authorization': 'Bearer ' + access_token
      },
      success: function(response) {
        
       var playResults = response.items;
        
        var playlistHead = $('<div class="accordion" id="accordionPlaylists">');
       $("#dataBody").append(playlistHead);
    
       //this 'for' loop makes sure to loop through all the users playlists
        for(var i = 0; i < playResults.length; i++){
          (function (i){
    
         //dynamic html for playlists     
          var playlistBody = $("<div>");  
          var pLists = $("<p>");
          var songTracks = $("<div>");
          playlistBody.attr("id", "playlist" + [i]);
    
            pLists.text(playResults[i].name);
            $("#playlists").append(playlistBody);
            $("#playlist"+[i]).append(pLists);
            $("#playlist"+[i]).append(songTracks);
            
            playlistID = playResults[i].id;
            userId = playResults[i].owner.id;
            trackCount = playResults[i].tracks.total;
     
    
    
    
     //call gives me everything i need in a single call look into not doing the first call and see how that works out
          $.ajax({
            url: 'https://api.spotify.com/v1/users/'+ userId +'/playlists/'+playlistID+ '/',
            headers: {
        'Authorization': 'Bearer ' + access_token
      },
      success: function(result) {
   
        var pName = result.name;
        var pId = result.id;
        var trackName = result.tracks
        var trackList = result.tracks.items;
        
    
        var plCard = $('<div class="">');
        var plCardHead = $('<div class="card">');
        var plWrap = $('<div class="mb-0">');
        var plButton = $('<a class="display-4"  data-toggle="collapse"  aria-expanded="false" >');      
        var plTarget = $('<div class="collapse" data-parent="#accordionPlaylists">');
        var plCardBody = $('<div class="results">');
        var songList = $("<ul class='text-warning'style='list-style-type:none'>");  
        
        
        var plHeading = "heading" + pId;
        var plWrapping = "wrapping" + pId;  
        var plCollapse = "collapse" + pId;
        var plTargeted = "target" + pId;
        var plSongList = "list" + pId; 
        
        
        plCard.attr("id", pId);
        plCardHead.attr("id", plHeading);
        plWrap.attr("id", plWrapping);
        plButton.attr({
          href: "#" + plCollapse,
          "data-target": "#" + plCollapse,
          "aria-controls": plCollapse
        });
        plTarget.attr({
          id: plCollapse,
          "aria-labelledby": plHeading
        });
        plCardBody.attr("id", plTargeted);
        songList.attr("id", plSongList);
        plButton.text(pName);
        
        //appending of the playlist accordion
        $("#accordionPlaylists").append(plCard);
        plCard.append(plCardHead);
        plCardHead.append(plWrap);
        plWrap.append(plButton);
        plCard.append(plTarget);
        plTarget.append(plCardBody);
        plCardBody.append(songList);

        //removes spacing inside the string so it can be used as an id
        var noSpace = pName.replace(/\s/g, '');
    
  
        if(trackList){
            //performs the following functions for each track in the playlist
            $.each(trackList, function(j){
    
                var tId = trackList[j].track.id;
                var artists = trackList[j].track.artists;
                var artistArr = [];

                //cycles through artists incase there are collaborating artists
                $.each(artists, function(k){
                    var multiArtists = artists[k].name;
                    artistArr.push(multiArtists);
                 })  
                //adds spacing after the comma
                var artist = artistArr.join(', ');
                var title = trackList[j].track.name;
                var album = trackList[j].track.album.name;
                var albumArtImg = trackList[j].track.album.images[1].url;
                var videoSearchValue =  artist + title + " official";
                var previewClip = trackList[j].track.preview_url;

                // creation of the dynamic components
                var plTrackList = $('<li>');
                var songToggle = $('<a class="text-warning" data-toggle="collapse"  role="button" aria-expanded="false" >');
                var songInfoDiv = $('<div class="collapse">');
                var songInfoTable = $('<table class="table table-hover">');
                var tableHeadRow = $('<tr>');
                var tableHeadArtist = $('<th scope="col">');
                var tableHeadAlbum = $("<th scope='col'>");
                var innerCollapseDiv = $('<div>');
                var trackTableHead =$('<thead>');
                var trackTableBody = $('<tbody>');
                var tableDataRow = $('<tr>');
                var tableDataRow2 = $('<tr>');
                var tableDataRow3 = $('<tr>');
                var trackAlbum = $('<td>');
                var trackArtist = $('<td>');
                var mvButton = $('<button class="btn btn-primary music-video">')
                var tableWrap = $('<div class="d-flex results">');
                var trackButton = $('<td>');
                var trackPreview = $('<td>');
                var albumImg = $('<img >');
                var audioClip = $('<audio controls preload="auto">');
                var playerAudio = $('<source>');

                //gives components dynamic ideas to keep them together
                var plTrack = [j]+noSpace + tId;
                var songToggleLink = [j]+noSpace + "link" + tId;
                var songToggler = [j]+noSpace + "collapse" + tId;
                var songInfoDiver = [j]+noSpace + "div" + tId;
                var songInfoTabler = [j]+noSpace + "table" + tId;
                var innerDiv = [j]+noSpace + "inner" + tId;
                var headRow = [j]+noSpace + "head-row" + tId;
                var tableBody = [j]+noSpace + "table-data" + tId;
                var tableAlbum = [j]+noSpace + "album" + tId;
                var tableArtist = [j]+noSpace + "artist" + tId;
                var dataRow2 = [j]+noSpace + "row2" + tId;
                var dataRow3 = [j]+noSpace + "row3" + tId;
                var songAlbum = [j]+noSpace + "sngAlbum" + tId;
                var songArtist = [j]+noSpace + "sngArtist" + tId;
                var tableHead = [j]+noSpace + "head" + tId;
                var mvBtn = [j]+noSpace + "song" + tId;
                var tableWrapper  = [j]+noSpace + "wrap" + tId;
                var tableButton  = [j]+noSpace + "button" + tId;
                var albumArt = [j]+noSpace + "art" + tId;
                var songPreview = [j]+noSpace + "preview" + tId;
                var songClip = [j]+noSpace + "clip" + tId;
                var aPlayer = [j]+noSpace + "player" + tId;
  
                plTrackList.attr("id", plTrack);
                songToggle.attr({
                    id: songToggleLink,
                    href: "#" + songToggler,
                    "aria-controls": songToggler
                });
                innerCollapseDiv.attr("id", innerDiv);
                songInfoDiv.attr({
                    id: songToggler,
                    "data-parent": "#" + plSongList
                });
                songInfoTable.attr("id", songInfoTabler);
                tableHeadAlbum.text("Album").attr("id", "#" + tableAlbum);
                tableHeadArtist.text("Artist").attr("id", "#" + tableArtist);
                tableHeadRow.attr("id", headRow);
                trackTableBody.attr("id", dataRow2);
                tableDataRow2.attr("id",dataRow3);
                tableDataRow3.attr("id", tableBody);
                trackArtist.attr("id", songArtist);
                trackAlbum.attr("id", songAlbum);
                trackTableHead.attr("id", tableHead);
                mvButton.attr("id", mvBtn);
                tableWrap.attr("id", tableWrapper);
                trackButton.attr("id", tableButton);
                albumImg.attr("id", albumArt);
                trackPreview.attr("id", songPreview);
                audioClip.attr("id", songClip);
                playerAudio.attr("id", aPlayer);
    
                songList.append(plTrackList);
                plTrackList.append(songToggle);
                plTrackList.append(innerCollapseDiv);
                innerCollapseDiv.append(songInfoDiv);
                songInfoDiv.append(tableWrap);
                tableWrap.append(songInfoTable);
                songInfoTable.append(trackTableHead);
                trackTableHead.append("<tr><th scope='col'>" + "Title" + "</th><th scope='col'>" + "Artist" + "</th><th scope='col'>" + "Album" + "</th></tr>"); 
                songInfoTable.append(trackTableBody);
                trackTableBody.append("<tr><td class='title'>" + title + "</td><td class='artist'>" + artist + "</td><td class='album'>" + album + "</td></tr>");
                trackTableBody.append(tableDataRow2);
                trackTableBody.append(tableDataRow3);
                tableDataRow2.append(trackPreview);
                tableDataRow3.append(trackButton);
                trackButton.append(mvButton);
                tableWrap.prepend(albumImg);
                trackPreview.append(audioClip);
                audioClip.append(playerAudio);
  
                //handles when there is more than one artist credited for a track

                songToggle.text(title);
                trackAlbum.text(album);
                trackArtist.text(artist);
                mvButton.text("Music Video").attr({
                  "data-toggle": "modal",
                   "data-target": "#videoModal",
                   "data-video": videoSearchValue
                }); 
                albumImg.attr("src", albumArtImg);
                playerAudio.attr("src", previewClip);
     
    })
    }
      }  
      
    })
    }(i))
    }
  $(document).one("click", "#btn-add", function(){
    if($("#song-search").val().trim() === ""){
  return false;
    } else {
    $("#results-button").removeAttr("style");
  }
  })
  $("#btn-add").on("click", function(event){
  event.preventDefault();
  
  var name = $("#song-search").val().trim();

  if(name === ""){
    return false;
  } else{
  var searchReady = name.replace(/\s/g, '%20');
  
  $.ajax({
    url: 'https://api.spotify.com/v1/search?q=' + searchReady + '&type=track&market=US',
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
    success: function(response) {
        var results = response.tracks;
        var queryURL = response.tracks.next;
        var nextButton = $('<button  href="#" type="button" id="btn-next" class="btn btn-primary searchNav">' + '</button>');
        var prevButton = $('<button href="#" type="button" id="btn-prev" class="btn btn-primary searchNav" disabled>' + '</button>');
        $("#collapseSearch").append(prevButton);
        $("#collapseSearch").append(nextButton);
        $("#btn-next").attr("data-value", response.tracks.next);
        $("#song-search").val("");
        nextButton.text("Next.");
        prevButton.text("Prev.");
        var newTrack = response.tracks.items;
        renderResults(newTrack);
  
  
    $(document).on("click", ".searchNav", function(){
        if($(this).attr("data-value") === null){
            $(this).attr("disabled", true);
        } else {
            $(this).attr("disabled", false);
           
  $.ajax({
    url: $(this).attr("data-value"),
    headers: {
    'Authorization': 'Bearer ' + access_token
    },
    success: function(result) {
  
        var newNext = result.tracks.next;
        var newPrev = result.tracks.previous;
        $("#btn-prev").attr("data-value", newPrev);
        $("#btn-next").attr("data-value", newNext);
        if(newPrev === null){
            $("#btn-prev").attr("disabled", true);
        } else {
            $("#btn-prev").attr("disabled", false);
        }
        var moreTracks = result.tracks.items;
        renderResults(moreTracks);
    }
  })
  }})
  }
  
  })
  }
  })
  

  function renderResults(newTrack){
    $("#search-results").empty();
    
    $.each(newTrack, function(i){
        var newTrackIndex = [i];
        var newImage = newTrack[i].album.images[1].url;
        var trackDiv = $('<div class="d-flex results mb-3">');
        var searchTable = $('<table class="table table-hover">');
        var searchTableHead = $('<thead>');
        var searchTableBody = $('<tbody>');
        var searchTableRow2 = $('<tr>');
        var searchTableRow3 = $('<tr>');
        var searchTablePlayer = $('<td colspan="3">');
        var searchTableMv = $('<td colspan="3">');
        var uniqueId = newTrackIndex + "song" + newTrack[i].track_number + "A" + newTrack[i].id;
        var uniqueId2 = newTrackIndex + "button" + newTrack[i].track_number + "B" + newTrack[i].id;
        var uniqueId3 = newTrackIndex + "MV" + newTrack[i].track_number + "C" + newTrack[i].id;
        $("#search-results").append(trackDiv);
        trackDiv.append(searchTable);
        searchTable.append(searchTableHead);
        searchTableHead.append("<tr><th scope='col'>" + "Title" + "</th><th scope='col'>" + "Artist" + "</th><th scope='col'>" + "Album" + "</th></tr>"); 
        var searchImage = $('<img>');
        searchImage.attr("src", newImage);
        trackDiv.prepend(searchImage);
        searchTable.append(searchTableBody);
        searchTableRow2.attr("id", uniqueId);
        searchTableRow3.attr("id", uniqueId2);
  
        //make music video button and preview audio player
        var newMvButton = $('<button class="btn btn-primary music-video">');
        var newPvwPlayer = $('<audio controls preload="auto">');
        var newPreview = $('<source>');
        var newPreviewClip = newTrack[i].preview_url;
        var newTitle = newTrack[i].name;
        var newAlbum = newTrack[i].album.name;
        var newArtists = newTrack[i].artists;
        var newArtistArr = [];
  
        $.each(newArtists, function(j){
            var newMultiArtists = newArtists[j].name;
            newArtistArr.push(newMultiArtists);
        })
  
        var newArtist = newArtistArr.join(', ');
        var videoSearchValue =  newArtists[0].name + newTitle + " official";
  
        searchTableBody.append("<tr><td class='title'>" + newTitle + "</td><td class='artist'>" + newArtist + "</td><td class='album'>" + newAlbum + "</td></tr>");
        searchTableBody.append(searchTableRow2);
        $("#" + uniqueId).append(searchTablePlayer);
        searchTableBody.append(searchTableRow3);
        $("#" + uniqueId2).append(searchTableMv);
        searchTableMv.append(newMvButton)
        searchTablePlayer.append(newPvwPlayer);
        newPvwPlayer.append(newPreview);
        newPreview.attr("src", newPreviewClip);
        newMvButton.text("Music Video").attr({
            id: uniqueId3,
            "data-toggle": "modal",
            "data-target": "#videoModal",
            "data-video": videoSearchValue
        }); 
  })
  }
  
  //keeps two tracks from playing at the same time
    document.addEventListener('play', function(e){
        var audios = document.getElementsByTagName('audio');
        for(var i = 0, len = audios.length; i < len; i++){
            if(audios[i] != e.target) {
                audios[i].pause();
            }
        }
    }, true);
  
  $(document).on("click", function(){
        $($("li").children("a")).not($(".collapsed")).collapse({
        toggle: false
        });
  })
  
  $(document).on("click", ".music-video", function(){
    var audios = document.getElementsByTagName('audio');
    for(var i = 0, len = audios.length; i < len; i++){
        if(audios[i].paused != true){
        audios[i].pause();}
        }
    })
  
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
              });
            }, false);    
        }
      })();
    
    $(document).ready(function() {
        $(document).on("click", ".music-video", function(){
            var searchValue = $(this).data("video");
            var buttonId = $(this).attr("id");
            function start() {
                // 2. Initialize the JavaScript client library.
                gapi.client.init({
                  'apiKey': 'AIzaSyB8OV4TyFEjIy3hIFgA8ol7RIHb7KTvt8U',
                  URL: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=overdoseOfficial&type=video&key=AIzaSyB8OV4TyFEjIy3hIFgA8ol7RIHb7KTvt8U'
                }).then(function(response) {
                  // 3. Initialize and make the API request.
                  return gapi.client.request({
                    'path': "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + searchValue + "&type=video&key=AIzaSyB8OV4TyFEjIy3hIFgA8ol7RIHb7KTvt8U",
                  })
                }).then(function(response) {
                  searchVidId = response.result.items[0].id.videoId;
                  $("#" + buttonId).attr('data-theVideo', searchVidId);
                  autoPlayYouTubeModal(buttonId);
                }, function(reason) {
                });
            };
        // 1. Load the JavaScript client library.
        gapi.load('client', start);
  
        }) 
  
  
  function autoPlayYouTubeModal(buttonId){
    
      var theModal = $("#" + buttonId).data( "target" ),
      videoSRC = $("#" + buttonId).attr( "data-thevideo" ),  
      videoSRCauto = "https://www.youtube.com/embed/" + videoSRC + "?html5=1";
      $(theModal+' iframe').attr('src', videoSRCauto);
      $(theModal+' button.close').click(function () {
          $(theModal+' iframe').attr('src', videoSRC);
         
    });
  }
    })   