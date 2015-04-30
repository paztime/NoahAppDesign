var http = require('http');
var fs   = require('fs');

if( process.argv.length < 3 )
{
    console.log( "Error: input file required" );
    process.exit( 1 );
}

var fn = process.argv[ 2 ];
try
{
    var lines = fs.readFileSync( fn ).toString().split( "\n" );
}
catch( e )
{
    console.log(
        "Error: Something bad happened trying to open "+fn );
    process.exit( 1 );
}

var download = function( url, dest, cb ) {
    console.log( "Download!" );
    try {
        var file = fs.createWriteStream( dest );
    }
    catch( e ) {
        console.log( "error" );
    }
    // No synchronous style!!!
    // var data = http.getSync( url );
    
    try {
        var request = http.get( url, function( response ) {
            console.log( "get callback!" );
            response.pipe( file );
            file.on( 'finish', function() {
                // console.log( "finish callback!" );
                // close() is async, call cb after close completes.
                file.close( cb );
            });
        });
        // console.log( "called http.get" );
        request.on( 'error', function( err ) { // Handle errors
            console.log( "error callback!" );
            // Delete the file async. (But we don't check the result)
            fs.unlink( dest );
            if( cb )
                cb( err.message );
        });
    }
    catch( exp )
    {
        console.log( "Error in URL" );
    }
    // console.log( "called request.on" );
};

function makeSuccessCallback( fn, url )
{
    return function() {
        console.log( "Download to "+fn+
                     "of "+url+" complete" );
    }
}

for( var i = 0; i < lines.length; i++ )
{
    if( i % 2 == 0 )
    {
        var url = lines[i];
    }
    else
    {
        var filename = lines[i];
        // if( ... )
        try {
            var f = fs.openSync( filename, 'w' );
            fs.closeSync( f );
            download( url, filename,
                      makeSuccessCallback( filename, url ) );
        }
        catch( e )
        {
            console.log( "Problem opening "+filename+" for writing" );
        }
    }
}

console.log( "Done?" );
