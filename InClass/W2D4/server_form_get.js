var http = require( "http" );

function serverFn( req, res )
{
    for( field in req )
    {
        // console.log( "R."+field+" = ..."/*+req[ field ]*/ );
    }
    console.log( "url: "+req.url.toString() );

    if( req.url.substring( 0, 16 ) == "/submit_the_form" )
    {
        // ... 
        // url: /submit_the_form?textbox=ABC+123
        var form_data = req.url.split( "?" )[ 1 ];
        var kv_pairs = form_data.split( "&" );
        for( var i = 0; i < kv_pairs.length; i++ )
        {
            var kv = kv_pairs[i].split( "=" );
            var key = kv[0];
            var val = kv[1];
            console.log( i + " " + key + " "+ val );
        }
    }

    res.writeHead( 200 );
    var h = "<!DOCTYPE html>"+
        "<html>"+
        "<body>"+
        "<form action='submit_the_form' method='get'>"+
        "<input name='textbox' type='text' value='write something'>"+
        "<input name='spambot' type='email' value='a@b.c'>"+
        "<input name='pretty' type='color'>"+
        "<input name='student' type='radio' value='colin'>Colin<br>"+
        "<input name='student' type='radio' value='other'>Not as good as Colin<br>"+
        "<input type='submit'>"+
        "</form>"+
        "</body>"+
        "</html>";
    res.end( h );
}

var server = http.createServer( serverFn );

server.listen( 8080 );
