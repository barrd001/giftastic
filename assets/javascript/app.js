var videoGames = ["devil may cry", "final fantasy", "lego"];

function renderButtons() {
    $('#button-view').empty();
    for (var i = 0; i < videoGames.length; i++) {
        var gameButton = $('<button>', {
        text: videoGames[i],
        id: videoGames[i],
        class: 'gif-button',
        'data-name': videoGames[i],
        // // initial data state for play/pause click event
        // 'data-state': 'still',
        // // define still and animated url's for play/pause click event
        // // 'data-still': 
        // // 'data-animate': 
    });
    $('#button-view').append(gameButton);
};
};

$('#add-gif').on('click', function(event) {
    event.preventDefault();

    var game = $('#search-input').val().trim();

    videoGames.push(game);

    renderButtons();
    $('#search-input').val('');
 
});

$('#button-view').on('click', '.gif-button', function() {
    
    // var key = 'QJwZn4MuWdgdO9uOc1Sey3flUREZtjYx';
    var gameGif = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gameGif + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
    console.log(gameGif);
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .then(function(response) {
        var results = response.data;
        $('#gif-view').empty();
        console.log(response);
        for(var j = 0; j <  results.length; j++) {
            var gifDiv = $('<div>');
            // create class ID for play/pause click event
            gifDiv.addClass('gif');

            var rating = results[j].rating;

            var p = $('<p>').text('Rating: ' +  rating);

            var renderGif = $('<img>');
            renderGif.attr('src', results[j].images.original_still.url);
            // Data State for play/pause click event
            renderGif.attr('data-state', 'still');
            // Still image URL for play/pause click event
            renderGif.attr('data-still', results[j].images.original_still.url);
            // Animated image URL for play/pause click event
            renderGif.attr('data-animate', results[j].images.original.url);

            gifDiv.append(p);
            gifDiv.append(renderGif);

            $('#gif-view').prepend(gifDiv);

            
        ;}
    });
});

$("#gif-view").on('click', 'img', function() {
    
    var state = $(this).attr('data-state');
    console.log($(this));

    if(state=== 'still'){
        var url = $(this).attr('data-animate')
        $(this).attr('src', url);
        $(this).attr('data-state', 'animate')
        console.log(this);
    }   
    
    if(state=== 'animate'){
        var url = $(this).attr('data-still')
        $(this).attr('src', url)
        $(this).attr('data-state', 'still')
        console.log(this);
    } 
});

renderButtons();
console.log(videoGames);