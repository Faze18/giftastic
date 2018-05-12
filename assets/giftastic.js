var api = "o5fMVuz8JjutFYDiGfH2Yxfm4anzhAny";
var buttonText;
var topics = ["Chris Webber Dunk", "Michael Jordan Dunk", "Lebron James Dunk", "Charles Barkley Dunk", "Kobe Bryant Dunk","James Worthy", "Vince Carter Dunk","Shawn Kemp"];

// makeButtons();
function putOnPage() {


    for ( var i = 0; i < topics.length; i++ ) {
        // var p = $( "<p>" );
        //set the button to the topics name and value attribute
        var b = $( "<input type ='button' class = 'buttons'>" ).text( topics[i] ).attr( "value", topics[i] );
        // p.prepend( b );
        // $( "#gifButtons" ).prepend( p );
        $( "#gifButtons" ).append( b );

    }
    console.log( "put on page" );

}

putOnPage();


$( "#addGif" ).on( "click", function ( event ) {
    event.preventDefault();
    
    // Setting the input value to a variable and then clearing the input
    var val = $( "#gif" ).val().trim();
    // $( "input[type='text']" ).val( "" );

    // Adding to the array topics[]
    if ( val != "" ) {
        topics.push( val );
    
    //empty the div 
    $( "#gifButtons" ).empty(); // empties out the html
    // refill the div
    putOnPage();
    console.log( "add gif" );
    }

} );

$( document ).on( "click",".buttons", function () {
    console.log( "Button Pressed" );
    $("#gifDisplay").empty();
    var gifName = $( this ).attr( "value" );
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gifName + "&api_key=o5fMVuz8JjutFYDiGfH2Yxfm4anzhAny&limit=10";

    $.ajax( {
        url: queryURL,
        method: "GET"
    } ).then( function ( response ) {
        $("#gifHolder").empty();
        var results = response.data;
        for ( var i = 0; i < results.length; i++ ) {

            var gifDiv = $( "#gifDisplay" );
            gifDiv.attr("class", "col-lg-12 ")
            // var p = $( "<p>" );

            // p=results[i].rating;
            var gifImage = $( "<img>" );
            gifImage.attr("data-animate",results[i].images.fixed_width.url );
            gifImage.attr("data-still",results[i].images.fixed_width_still.url );

            gifImage.attr( "src", results[i].images.fixed_width_still.url );
            gifImage.attr("class" ,"gif");
            gifImage.attr("data-state", "still");
            var gifHolder = $("<div>");//test
            gifHolder.attr("class","col-lg-7 holder");//test
            // gifHolder.attr("class" ,"gif");
            gifHolder.html(gifImage);//test
            gifHolder.attr("data-state", "still");

            gifDiv.append( gifHolder );
            
            $( "#gifDisplay" ).prepend( gifDiv );
        }
        state="still"; 
        debugger;

        // ==================================
    } );
} );
$("#gifDisplay" ).on( "click",".gif", function () {
    state = $(this).attr("data-state");
    console.log($(this).attr("src"));
    debugger;
    if (state == "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        return;
      }
      // If state is equal to 'animate', then update the src attribute of this
      // image to it's data-still value and update the data-state attribute to 'still'
      // ============== FILL IN CODE HERE FOR STEP THREE =========================
      if (state=="animate"){
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        return;
        

      }

} );




