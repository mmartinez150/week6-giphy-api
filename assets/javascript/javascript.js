$( document ).ready(function() {

    // nature in array below
    var nature = ["Clouds", "Forest", "Lava", "Northern Lights", "Ocean", "Snow", "Flowers", "Mountains", "Waterfalls", "Rainbows", "Sunrises", "Stars", "Lakes"];
    
    //methods, functions, and gif buttons
    function displayGifButtons(){
        $("#gifButtonsView").empty(); //clears results
        for (var i = 0; i < nature.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("more");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", nature[i]);
            gifButton.text(nature[i]);
            $("#gifButtonsView").append(gifButton);  
    }

}
    // Function to add a new nature images button
    function addNewButton(){
        $("#addGif").on("click", function(){
        var more = $("#more-input").val().trim();
        if (more == ""){
        return false; // user will not add blanks
        }
        nature.push(more);

        displayGifButtons();
        return false;
        });


        }
    // removes last button
    function removeLastButton(){
        $("removeGif").on("click", function(){
        nature.pop(more);
        displayGifButtons();
        return false;
        });


    }
    // Function for gif
    function displayGifs(){
        var more = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + more + "&api_key=Cm6jr4YTPzVO9l6jwWTKBFyO7iX2aRuj&limit=10";
        $.ajax({
            url: queryURL,
            method: 'GET'
        })


        .done(function(response) {
            $("#gifsView").empty(); // erases previous click
            var results = response.data; //shows results of gifs
            if (results == ""){
              alert("There isn't a gif for this selected button");
            }
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>"); //div for the gifs to go inside
                gifDiv.addClass("gifDiv");
                // pulling rating of gif
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                // pulling gif
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
                gifImage.attr("data-state", "still"); 
                gifImage.addClass("image");
                gifDiv.append(gifImage);


                $("#gifsView").prepend(gifDiv);

            }
        });


    }

            //Functions & Methods
        displayGifButtons(); 
        addNewButton();
        removeLastButton();

        // Document Event Listeners
        $(document).on("click", ".more", displayGifs);
        $(document).on("click", ".image", function(){
            var state = $(this).attr('data-state');
            if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }


});
});
