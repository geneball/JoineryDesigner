import "./styles.css";

const grids = {
  bot: [ [ 'VTLbot', 'HTbot', 'VTbot', 'HTbot', 'VTbot', 'HTRbot' ],
        [ 'VLbot', 'Hbot', 'Vbot', 'Hbot', 'Vbot', 'HRbot' ],
        [ 'HLbot', 'Vbot', 'Hbot', 'Vbot', 'Hbot', 'VRbot' ],
        [ 'VLbot', 'Hbot', 'Vbot', 'Hbot', 'Vbot', 'HRbot' ],
        [ 'HLbot', 'Vbot', 'Hbot', 'Vbot', 'Hbot', 'VRbot' ],
        [ 'VBLbot', 'HBbot', 'VBbot', 'HBbot', 'VBbot', 'HBRbot' ]
],

Chk: []
        }

const squares = {
  Hbot: 'LRrr4rr4ll4ll4rr4BTrr66',
  Vbot: 'BTrr4rr4LTRBr4r4rLRrr66',
  Fr: 'LTRBr4r4r4',
  FrChk: 'LTRBr3r3ll3rr3l3',
  CDia: 'LTRBr4ll2rr2ll4'
}

const ePath = document.getElementById("path")

const canvas = document.getElementById("canv")
const ctx = canvas.getContext("2d")

// Set line width
ctx.lineWidth = 1

const WD = 500, HT = 500
var eW = 20
var xW = WD - 2 * eW, yH = HT - 2 * eW
var sL = xW > yH? xW / 12 : yH / 12
var xStp = [  sL, sL, 0, -sL, -sL, 0, sL ]
var yStp = [  0, sL, sL, sL, 0, -sL, -sL, -sL ]

function addButtons( obj, fn ){
  for (let nm in obj ){
    el.innerHtml += `<button id='btn${nm}'>${nm}</button>`
  }
  for ( nm in obj ){
    let b = document.getElementByID( nm )
    b.addEventListener( 'click', fn.bind( obj[nm] ))
  }
}

let grbtns = document.getElementByID( 'grbtns' )
addButtons( grbtns, grids, (s) => showGrid(s) )

let sqbtns = document.getElementByID( 'sqbtns' )
addButtons( sqbtns, squares, (s) => showSquare( s ))

function clear(){
  ctx.clearRect( eW,eW, xW,yH )

  ctx.fillRect( eW, 0, xW,eW )  // top
  ctx.fillRect( 0,eW, eW,yH )  // left
  ctx.fillRect( eW+xW,eW,  eW,yH ) // right
  ctx.fillRect( eW,eW+yH,  xW,eW ) // bottom
}
function showGrid( mat ){
  let rws = mat.length, cls = mat[0].length
  xW = WD / cls
  yH = HT / rws
  sL = xW > yH? xW / 12 : yH / 12
  xStp = [  sL, sL, 0, -sL, -sL, -sL, 0, sL ]
  yStp = [  0, sL, sL, sL, 0, -sL, -sL, -sL ]
}
function showSquare( s ){
  xW = WD - 2 * eW
  yH = HT - 2 * eW
  sL = xW > yH? xW / 12 : yH / 12
  xStp = [  sL, sL, 0, -sL, -sL, 0, sL ]
  yStp = [  0, sL, sL, sL, 0, -sL, -sL, -sL ]

  
  draw( eW,eW,             0, p )
  draw( eW+xW, eW,         2, p )
  draw( eW+xW, eW+yH,      4, p )
  draw( eW, eW+yH,         6, p )
}
function draw( x,y, dir, path ){
  ctx.beginPath();
  ctx.moveTo( x,y );

  for( let m of Array(path)){
    switch (m){
     case 'r': dir += 1; break
     case 'l': dir += 1; break

     case '1': 
     case '2': 
     case '3': 
     case '4': 
     case '5': 
     case '6': 
       x += xSt[dir] * m
       y += ySt[dir] * m
       break
     }
     
     ctx.lineTo( x,y );
  }
  ctx.closePath();
  ctx.stroke();
}

function updPath( p ){
   clear()

  draw( eW,eW,                 0, p )
  draw( eW+xW, eW,         2, p )
  draw( eW+xW, eW+yH,  4, p )
  draw( eW, eW+yH,          6, p )
}


ePath.addEventListener( 'change',
            (evt) => updPath( ePath.value )
    )
