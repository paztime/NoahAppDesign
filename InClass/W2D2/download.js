var http = require('http');
var fs   = require('fs');

var download = function( url, dest, cb ) {
    console.log( "Download!" );
    var file = fs.createWriteStream( dest );
    // No synchronous style!!!
    // var data = http.getSync( url );
    
    var request = http.get( url, function( response ) {
        console.log( "get callback!" );
        response.pipe( file );
        file.on( 'finish', function() {
            console.log( "finish callback!" );
            // close() is async, call cb after close completes.
            file.close( cb );
        });
    });
    console.log( "called http.get" );
    request.on( 'error', function( err ) { // Handle errors
        console.log( "error callback!" );
        // Delete the file async. (But we don't check the result)
        fs.unlink(dest);
        if( cb )
            cb( err.message );
    });
    console.log( "called request.on" );
};

download( "http://www.burrelleducation.com/wp-content/uploads/2012/06/large-foo-foo-logo.gif",
          "logo.gif",
          function() { console.log( "main cb" ) } );

console.log( "Done?" );
