var fs = require( 'fs' );

if( process.argv.length != 3 )
{
    console.log( "WRONG!" );
    process.exit( 1 );
}

try
{
    var contents = fs.readFileSync( process.argv[2] )
    var lines = contents.toString().split( "\n" );
}
catch( e )
{
    console.log( "BAD FILE!" );
    process.exit( 1 );
}

for( var i = lines.length - 1; i >= 0; i-- )
{
    console.log( lines[ i ] );
}
