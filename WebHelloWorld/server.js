var http = require( "http" );
var fs = require( "fs" );

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
        "<input name= 'birthchoose' type='date' value='What day were you born?'>"+
        "<input name= 'waketime'    type='time' value='What time do you get up?'>"+
        "<input type='submit'>"+
        "</form>"+
        "</body>"+
        "</html>";
    var pathparser = req.url;
    var pathinput = pathparser.pathname;
    var inputparser = pathinput.split(/[\/\+]+/);
    var txtinput = inputparser[0];
    var dateinput = inputparser[1];
    var timeinput = inputparser[2];
    res.end( h );
}

var server = http.createServer( serverFn );

server.listen( 8080 );
