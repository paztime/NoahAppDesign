var img_names = [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10" ];
var tile_elems = [];

function loadPage()
{
    var tiles = document.getElementsByClassName( "tile" );
    img_names_double = [];
    for( var i = 0; i < img_names.length; i++ )
    {
        img_names_double.push( img_names[i] );
        img_names_double.push( img_names[i] );
    }
    for( var i = 0; i < tiles.length; i++ )
    {
        var tile = tiles.item( i );
        tile_elems.push( tile );
        var x = i % 3;
        var y = Math.floor( i / 3 );
        // tile.innerHTML = i;
        tile.x = x;
        tile.y = y;
        tile.onclick = mouseClick;
        tile.onmouseenter = mouseEnter;
        var rand_idx = Math.floor( img_names_double.length *
                                   Math.random() );
        var secretImg = img_names_double[ rand_idx ];
        img_names_double.splice( rand_idx, 1 );
        var img_elem = document.createElement( "img" );
        img_elem.src =
            "./Images/puppy" + img_names[i] + ".jpeg";
        img_elem.width  = 80; // this.style.width;
        img_elem.height = 100; // this.style.height;
        tile.appendChild( img_elem );
    }
}

var first_card = null;
var matches = 0;
var match_failed = false;

function mouseClick() {
    if( match_failed )
        return;
    var img_elem = getImgChild( this );
    if( first_card == null )
    {
        first_card = img_elem;
        img_elem.src = img_elem.secretImage;
    }
    else if( img_elem == first_card )
    {
    }
    else if( img_elem.secretImage == first_card.src )
    {
        img_elem.src = img_elem.secretImage;
        first_card = null;
        matches++;
        if( matches >= winning_matches )
        {
            alert( "WIN" );
        }
    }
    else
    {
        match_failed = true;
        img_elem.src = img_elem.secretImage;
        window.setTimeout( timeoutFun, 2000, first_card, img_elem );
        first_card = null;
    }
    // var v = document.getElementById( "video" );
    // this.appendChild( v );
    console.log( this.x + " " + this.y );
}

function timeoutFun( c1, c2 )
{
    c1.src = "back.jpg";
    c2.src = "back.jpg";
    match_failed = false;
}

function getImgChild( elem )
{
    var children = elem.childNodes;
    console.log( "mouseEnter "+children );
    for( var i = 0; i < children.length; i++ )
    {
        var child = children[i];
        console.log( "child " + child + " " + child.tagName );
        if( child.tagName == "IMG" )
        {
            return child;
        }
    }
}

function mouseEnter()
{
    var rand_tile_idx = Math.floor( 9 * Math.random() );
    var rand_tile = tile_elems[ rand_tile_idx ];
    var img1 = getImgChild( this );
    var img2 = getImgChild( rand_tile );
    this.appendChild( img2 );
    rand_tile.appendChild( img1 );
}
