var lastCell;
var W = 50;
var H = 50;

function pageLoad()
{
    var tds = document.getElementsByTagName( "td" );
    for( var i = 0; i < tds.length; i++ )
    {
        var td = tds.item( i );
        td.onclick = mouseClick;
        td.width = W;
        td.height = H;
    }
    lastCell = document.getElementById( "middle" );
    lastCell.next = null;
    lastCell.duration = 1000;
    lastCell.started = true;
    var img = document.createElement( "img" );
    lastCell.appendChild( img );
    window.setTimeout( colorYellow, 1000, lastCell );
}

function colorBlack( elem )
{
    // console.log( "black" );
    // elem.style.backgroundColor = "black";
    elem.started = true;
    var img = elem.childNodes[ 0 ];
    img.src = "./Images/chair1.jpeg";
    img.width=W;
    img.height=H;
    window.setTimeout( colorYellow, elem.duration, elem );
    if( elem.next != null && !elem.next.started )
        window.setTimeout( colorBlack, 100, elem.next );
}

function colorYellow( elem )
{
    // console.log( "yellow" );
    //elem.style.backgroundColor = "yellow";
    elem.started = true;
    var img = elem.childNodes[ 0 ];
    img.src = "./Images/table1.jpg";
    img.width=W;
    img.height=H;
    window.setTimeout( colorBlack, elem.duration, elem );
    if( elem.next != null && !elem.next.started )
        window.setTimeout( colorYellow, 100, elem.next );
}

function mouseClick()
{
    // console.log( "click" );
    var img = document.createElement( "img" );
    this.appendChild( img );
    this.started = false;
    this.duration = lastCell.duration * 2;
    lastCell.next = this;
    lastCell = this;
    this.next = null;
}
