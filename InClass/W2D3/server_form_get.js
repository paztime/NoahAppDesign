var http = require( "http" );

function serverFn( req, res )
{
    for( field in req )
    {
        console.log( "R."+field+" = ..."/*+req[ field ]*/ );
    }
    for( field in req.headers )
    {
        console.log( "R.header."+field+" = ..."/*+req[ field ]*/ );
    }
    console.log( "url: "+req.url.toString() );

    if( req.url.substring( 0, 16 ) == "/submit_the_form" )
    {
        // ... 
    }

    res.writeHead( 200 );
    var h = "<!DOCTYPE html>"+
        "<html>"+
        "<body>"+
        "<form action='submit_the_form' method='get'>"+
        "<input name='textbox' type='text' value='write something'>"+
        "<input type='submit'>"+
        "</form>"+
        "</body>"+
        "</html>";
    res.end( h );
}

var server = http.createServer( serverFn );

server.listen( 8080 );
