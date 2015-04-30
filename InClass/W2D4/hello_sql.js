var sqlite = require( 'sqlite3' );

var db = new sqlite.Database( "telluride.sqlite" );

db.each( "SELECT ID, PERFORMER, STAGE, TIME FROM PERFORMANCE",
    function( err, row ) {
        db.each( "SELECT NAME FROM PERFORMERS WHERE ID = " +
                 row.PERFORMER,
            function( err2, row2 ) {
                console.log( "Performer: "+row.PERFORMER + " " +
                             row2.NAME );
            });
        console.log( row );
    });
