var fs = require( "fs" );
var http = require( "http" );
var sqlite = require( "sqlite3" );

function listPerformers( req, res )
{
    var db = new sqlite.Database( "telluride.sqlite" );
    var resp_text = "<!DOCTYPE html>"+
	"<html>" +
	"<body>";
    db.each( "SELECT NAME FROM PERFORMERS", function( err, row ) {
        console.log( "perf "+row.NAME );
	resp_text += row.NAME;
    });
    db.close(
	   function() {
	       console.log( "Complete! "+resp_text );
	       resp_text += "</body>" + "</html>";
	       res.writeHead( 200 );
	       res.end( resp_text );
	   } );
}

function timeTable( req, res )
{
  var db = new sqlite.Database( "telluride.sqlite" );
  var resp_text = "<!DOCTYPE html>"+
                  "<html>" +
                  "<body>";
  db.each( "SELECT ID, PERFORMER, STAGE, TIME FROM PERFORMANCE",
    function( err, row ) {
        db.each( "SELECT NAME FROM PERFORMERS WHERE ID = " + row.PERFORMER,
                 "SELECT NAME FROM STAGES WHERE ID = " + row.STAGE,
            function( err2, row2 ) {
                console.log( "Performer: "+row.PERFORMER + " " +
                             row2.NAME );
                console.log( "Time: "+row.STAGE + " " +
                             row2.NAME );
            });
        console.log( row );
    resp_text += "<table>" +
                 "<tbody>" +
                 "<tr>" +
                 "<td>Performer</td>" +
                 "<td>Stage</td>" +
                 "<td>Time</td>" +
                 "</tr>" +
                 "<tr>" +
                 "<td>" + row2.NAME + "</td>" +
                 "<td>" + row3.NAME + "</td>" +
                 "<td>" + row.TIME + "</td>" ;
    });
  db.close(
   function() {
       console.log( "Complete! "+resp_text );
       resp_text += "</tbody>" + "</table>" + "</body>" + "</html>";
       res.writeHead( 200 );
       res.end( resp_text );
   } );


}

function serveFile( filename, req, res )
{
    try
    {
    	var contents = fs.readFileSync( filename ).toString();
    }
    catch( e )
    {
    	console.log(
    	    "Error: Something bad happened trying to open "+filename );
    	process.exit( 1 );
    	/* Return a 404 page */
    }

    res.writeHead( 200 );
    res.end( contents );
}

function serverFn( req, res )
{
    var filename = req.url.substring( 1, req.url.length );
    if( filename == "" )
    {
        filename = "./index.html";
    }
    if( filename == "list_performers" )
    {
        listPerformers( req, res );
    }
    if( filename == "time_table" )
    {
        timeTable( req, res );
    }
    else
    {
        serveFile( filename, req, res );
    }
}

var server = http.createServer( serverFn );

server.listen( 8080 );
