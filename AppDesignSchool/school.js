var fs = require( "fs" );
var http = require( "http" );
var sqlite = require( "sqlite3" );

function formInputParser( url )
{
    inputs = {}
    var form_text = url.split( "?" )[1];
    var form_inputs = form_text.split( "&" );
    for( var i = 0; i < form_inputs.length; i++ ) {
        var inp = form_inputs[i].split( "=" );
        inputs[ inp[0] ] = inp[1];
    }
    console.log( inputs );
    return inputs;
}

function listStudents( req, res )
{
    var db = new sqlite.Database( "school.sqlite" );
    var resp_text = "<!DOCTYPE html>"+
    "<html>" +
  	"<body>" +
    "<table>"+
    "<tbody>"+
    "<tr>" + "<td>" + "<strong>" + "Students' Name" + "</strong>" +"</td>" + "</tr>";
    db.each( "SELECT NAME FROM STUDENTS", function( err, row ) {
        console.log( "student "+row.NAME );
	resp_text += "<tr>" + "<td>" + row.NAME + "</td>" + "<td>";
    });
    db.close(
	   function() {
	       console.log( "Complete! "+resp_text );
	       resp_text += "</tbody>" + "</table>" + "</body>" + "</html>";
	       res.writeHead( 200 );
	       res.end( resp_text );
	   } );
}

function listTeachers( req, res )
{
    var db = new sqlite.Database( "school.sqlite" );
    var resp_text = "<!DOCTYPE html>"+
    "<html>" +
  	"<body>" +
    "<table>"+
    "<tbody>"+
    "<tr>" + "<td>" + "<strong>" + "Teachers Name" + "</strong>" + "</td>" + "</tr>";
    db.each( "SELECT NAME FROM TEACHERS", function( err, row ) {
        console.log( "teacher "+row.NAME );
	resp_text += "<tr>" + "<td>" + row.NAME + "</td>" + "<td>";
    });
    db.close(
	   function() {
	       console.log( "Complete! "+resp_text );
	       resp_text += "</tbody>" + "</table>" + "</body>" + "</html>";
	       res.writeHead( 200 );
	       res.end( resp_text );
	   } );
}

function listClasses( req, res )
{
    var db = new sqlite.Database( "school.sqlite" );
    var resp_text = "<!DOCTYPE html>"+
    "<html>" +
  	"<body>" +
    "<table>"+
    "<tbody>"+
    "<tr>" + "<td>" + "<strong>" + "Class Name" + "</strong>" + "</td>" + "</tr>";
    db.each( "SELECT NAME FROM CLASSES", function( err, row ) {
        console.log( "class "+row.NAME );
	resp_text += "<tr>" + "<td>" + row.NAME + "</td>" + "<td>";
    });
    db.close(
	   function() {
	       console.log( "Complete! "+resp_text );
	       resp_text += "</tbody>" + "</table>" + "</body>" + "</html>";
	       res.writeHead( 200 );
	       res.end( resp_text );
	   } );
}

function listEnrollments( req, res )
{
    var db = new sqlite.Database( "school.sqlite" );
    var resp_text = "<!DOCTYPE html>"+
    "<html>" +
  	"<body>" +
    "<table>"+
    "<tbody>"+
    "<tr>" + "<td>" + "<strong>" + "Class Name" + "</strong>" + "</td>" + "<td>" + "<strong>" + "Students' Name" + "</strong>" +"</td>" + "</tr>";
    db.each( "SELECT STUDENTS.NAME as sname, * FROM ENROLLMENTS "+
             "JOIN STUDENTS ON STUDENTS.ID = ENROLLMENTS.STUDENTID "+
             "JOIN CLASSES ON CLASSES.ID = ENROLLMENTS.CLASSID",
        function( err, row ) {
            console.log( row );
	    resp_text += "<tr>" + "<td>" + row.NAME + "</td>" + "<td>" +
                row.sname + "</td>" + "</tr>";
        });
    db.close(
	   function() {
	       console.log( "Complete! "+resp_text );
	       resp_text += "</tbody>" + "</table>" + "</body>" + "</html>";
	       res.writeHead( 200 );
	       res.end( resp_text );
	   } );
}

function listTeachingAssignments( req, res )
{
    var db = new sqlite.Database( "school.sqlite" );
    var resp_text = "<!DOCTYPE html>"+
	"<html>" +
	"<body>" +
  "<table>"+
  "<tbody>"+
  "<tr>" + "<td>" + "<strong>" + "Teachers Name" + "</strong>" + "</td>" + "<td>" + "<strong>" +"Class Name" + "</strong>" +"</td>" + "</tr>";
    db.each( "SELECT TEACHERS.NAME as tname, * FROM TEACHINGASSIGNMENTS "+
             "JOIN TEACHERS ON TEACHERS.ID = TEACHINGASSIGNMENTS.TEACHERID "+
             "JOIN CLASSES ON CLASSES.ID = TEACHINGASSIGNMENTS.CLASSID",
        function( err, row ) {
            console.log( row );
	    resp_text += "<tr>" + "<td>" + row.NAME + "</td>" + "<td>" +
                row.tname + "</td>" + "</tr>";
        });
    db.close(
	   function() {
	       console.log( "Complete! "+resp_text );
	       resp_text += "</tbody>" + "</table>" + "</body>" + "</html>";
	       res.writeHead( 200 );
	       res.end( resp_text );
	   } );
}

function addStudent( req, res )
{
    var db = new sqlite.Database( "school.sqlite" );
    console.log( req.url );
    var form_text = req.url.split( "?" )[1];
    var form_inputs = form_text.split( "&" );
    var studname = null, studyear = null;
    for( var i = 0; i < form_inputs.length; i++ ) {
        var inp = form_inputs[i].split( "=" );
        if( inp[0] == 'studentname' ) {
            studname = inp[1];
        }
        else if( inp[0] == 'studentyear' ) {
            studyear = inp[1];
        }
    }
    if( studname == null || studyear == null )
    {
        res.writeHead( 200 );
        res.end( "ERROR" );
        return;
    }
    var student  = decodeURIComponent( ( studname + '' ).replace( /\+/g, '%20' ) );
    var sql_cmd =  "INSERT INTO STUDENTS ('NAME', 'YEAR') VALUES ('"+student+"', '"+studyear+"')";
    db.run( sql_cmd );
    db.close();
    res.writeHead( 200 );
    res.end( "<html><body>Added!!!</body></html>" );
}

function addEnrollment( req, res )
{
    var db = new sqlite.Database( "school.sqlite" );
    console.log( req.url );
    formInputParser( req.url );
    var form_text = req.url.split( "?" )[1];
    var form_inputs = form_text.split( "&" );
    var classid = null, stud = null;
    for( var i = 0; i < form_inputs.length; i++ ) {
        var inp = form_inputs[i].split( "=" );
        if( inp[1].type != Number) {
            res.end( "ERROR" );
            console.log("Must enter an integer.")
            return;
        }
        else if( inp[0] == 'class' ) {
            classid = inp[1];
        }
        else if( inp[0] == 'student' ) {
            stud = inp[1];
        }
    }
    if( classid == null || stud == null )
    {
        res.writeHead( 200 );
        res.end( "ERROR" );
        return;
    }
    /* class, student numbers that exist in DB */
    var stud_exists = false;
    db.all( "SELECT COUNT(NAME) FROM STUDENTS WHERE ID = "+stud,
        function( err, rows ) {
            stud_exists = rows[0]['COUNT(NAME)'] == 1;
        });
    if( !stud_exists )
    {
        // ....
    }
    var class_exists = false;
    db.all( "SELECT COUNT(NAME) FROM STUDENTS WHERE ID = "+classid,
        function( err, rows ) {
            class_exists = rows[0]['COUNT(NAME)'] == 1;
        });
    if( !class_exists )
    {
        // ....
    }
    var student  = decodeURIComponent( ( stud + '' ).replace( /\+/g, '%20' ) );
    var classnum  = decodeURIComponent( ( classid + '' ).replace( /\+/g, '%20' ) );
    var sql_cmd = "INSERT INTO ENROLLMENTS ('CLASSID', 'STUDENTID') VALUES ('"+classnum+"', '"+student+"')";
    db.run( sql_cmd );
    db.close();
    res.writeHead( 200 );
    res.end( "<html><body>Added!!!</body></html>" );
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
        res.writeHead( 404 );
        res.end( "" );
        return;
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
    if( filename.substring( 0, 13 ) == "list_students" )
    {
        listStudents( req, res );
    }
    else if( filename.substring( 0, 13 ) == "list_teachers" )
    {
        listTeachers( req, res );
    }
    else if( filename.substring( 0, 12 ) == "list_classes" )
    {
        listClasses( req, res );
    }
    else if( filename.substring( 0, 16 ) == "list_enrollments" )
    {
        listEnrollments( req, res );
    }
    else if( filename.substring( 0, 25 ) == "list_teaching_assignments" )
    {
        listTeachingAssignments( req, res );
    }
    else if( filename.substring( 0, 11 ) == "add_student" )
    {
        addStudent( req, res );
    }
    else if( filename.substring( 0, 14 ) == "add_enrollment" )
    {
        addEnrollment( req, res );
    }
    else
    {
        serveFile( filename, req, res );
    }
}

var server = http.createServer( serverFn );

server.listen( 8080 );
