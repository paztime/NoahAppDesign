var http = require( "http" );
var fs = require( "fs" );

var x = 0;

function serverFn( req, res )
{
    for( field in req )
    {
        console.log( "R."+field+" = ..."/*+req[ field ]*/ );
    }
    var filename = req.url.substring( 1, req.url.length );
    try
    {
        var contents = fs.readFileSync( filename ).toString();
    }
    catch( e )
    {
        console.log(
            "Error: Something bad happened trying to open "+filename );
        process.exit( 1 );
    }

    console.log( "url "+req.url );
    res.writeHead( 200 );
    x++;
    var h = "<!DOCTYPE html>"+
        "<html>"+
        "<body>"+
        "<p>Hello web Foo Bar Baz! "+x+"</p>"+
        "</body>"+
        "</html>";
    res.end( contents );
}

var server = http.createServer( serverFn );

server.listen( 8080 );
