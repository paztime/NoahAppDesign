var http = require( "http" );

function serverFn( req, res )
{
    res.writeHead( 200 );
    var h = "<!DOCTYPE html>"+
        "<html>"+
        "<body onload='alert(\"Hello!!!\")'>"+
        "<p>Hello web Foo Bar Baz!</p>"+
        "</body>"+
        "</html>";
    res.end( h );
}

var server = http.createServer( serverFn );

server.listen( 8080 );
