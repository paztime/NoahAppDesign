var lastCell;

function pageLoad()
{
    var tds = document.getElementsByTagName( "td" );
    for( var i = 0; i < tds.length; i++ )
    {
        var td = tds.item( i );
        td.onclick = mouseClick;
        td.width = 20;
        td.height = 20;
    }
    lastCell = document.getElementById( "middle" );
    lastCell.next = null;
    window.setTimeout( colorYellow, 1000, lastCell );
}

function colorBlack( elem )
{
    // console.log( "black" );
    elem.style.backgroundColor = "black";
    window.setTimeout( colorYellow, 1000, elem );
    if( elem.next != null )
        window.setTimeout( colorBlack, 100, elem.next );
}

function colorYellow( elem )
{
    // console.log( "yellow" );
    elem.style.backgroundColor = "yellow";
    window.setTimeout( colorBlack, 1000, elem );
    if( elem.next != null )
        window.setTimeout( colorYellow, 100, elem.next );
}

function mouseClick()
{
    // console.log( "click" );
    lastCell.next = this;
    lastCell = this;
    this.next = null;
}
