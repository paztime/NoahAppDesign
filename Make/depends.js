/* Run jshint clean!!! */

var fs = require( "fs" );
/* What if the user doesn't type the right number of arguments? */
if (process.argv.length < 4)
{
  console.log("Please specify a file to use, followed by a target.");
  return;
}

var args = process.argv;

/* What if the file doesn't exist? */
fs.lstat( args[2], function (err) {
  if (err) {

    // file does not exist-
    if (err.code === 'ENOENT' ) {
      console.log('No file or directory at ', args[2]);
      return;
    }

    // miscellaneous error (e.g. permissions)
    console.error(err);
    return;
	 }
});

var lines = [];
lines = fs.readFileSync( args[2] ).toString().split( "\n" );

var targets = {};

for( var i = 0; i < lines.length; i++ )
{
    var target = {};
    var line = lines[ i ];
    console.log( line );
    /* What about format errors in the input file? */
    /* Consider using regexes instead of split */
    /* line.match( ??? ) */
    var colon = line.split( ":" );
    if( colon.length != 2 )
    {
        continue;
    }
    target.name = colon[ 0 ];
    target.depend_names = colon[ 1 ].split( " " );
    /* What if there's no target for a dependency? */
    if (target.depend_name === null) {
      console.log("No target for dependency");
      return;
    }
    target.visited = false;
    targets[ target.name ] = target;
}

console.log( targets );

function trace_dependencies( prev, target )
{
    /* what if prev and target are not the right kind of thing? */
    if( prev.type !== "string" ) //jshint error
    {
        console.log("Can only accept text as input");
        return;
    }
/*  if( visited in target )
    {

    }
*/
    if( target.visited === true )
    {
        console.log( "Already visited "+target.name );
        return;
    }
    else
    {
      target.visited = true;
      console.log( "> " + prev + " depends on " + target.name );
      for( var i = 0; i < target.depend_names.length; i++ )
      {
          var dep_name = target.depend_names[ i ];
          if( !( dep_name in targets ) )
              continue;
          var dep = targets[ dep_name ];
          // if( date( dep ) older than date( target ) )
          //    continue;
          trace_dependencies( target.name, dep );
          // trace_dependencies( {l:12, m:34}, "hello" );
      }
    }
}

/* What if the target given at the command line doesn't exist? */
/* Handled by original error check. */
trace_dependencies( "[ Start ]", targets[ args[3] ] );
