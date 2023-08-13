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
const sN = 8, sE = 4, sS = 2, sW = 1
const xStp = [ 1, 1, 0, -1, -1, -1, 0, 1 ]
const yStp = [ 0, 1, 1, 1, 0, -1, -1, -1 ]

var onEdge = { N: false, E: false, S: false, W: false }
var eW = 20
var xW = WD - 2 * eW, yH = HT - 2 * eW


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
function showGrid( gr ){
  let rows = gr.length, cols = gr[0].length
  xW = WD / cols
  yH = HT / rows
  mL = yH > xW? xW : yH
  sL = mL / 12
  
  let xTL = 0, yTL = 0
  let vertRw = true
  for( let r=0; r<rows; r++ ){
    let vert = vertRw
    vertRw = !vertRw
    let n = r==0? edge : gr[r-1][c]
    let s = r==rows-1? edge : gr[r+1][c]
    for ( let c=0; c<cols; c++ ){
      let ctr = gr[r][c]
      let w = c==0? edge : gr[r][c-1]
      let e = c==cols-1? edge : gr[r][c+1]
      
      if (!vert){
        draw( xTL+mL,yTL,    0, n.BRtoBL )
        draw( xTL+mL,yTL,    2, ctr.BLtoTL ) 
        draw( xTL,   yTL+mL, 4, s.TLtoTR )
        draw( xTL,yTL+mL,    6, ctr.BLtoTL )  
      } else {
        draw( xTL,   yTL,    0, ctr.TLtoTR )
        draw( xTL+mL,yTL+mL, 2, e.BLtoTL ) 
        draw( xTL+mL,yTL+mL, 4, ctr.BRtoBL )
        draw( xTL,yTL+mL,    6, w.TRtoBR )
      }
      vert = !vert
    }
    vertRw =!vertRw
  }
}
function showSquare( s ){
  xW = WD - 2 * eW
  yH = HT - 2 * eW
  mL = yH > xW? xW : yH
  sL = mL / 12
  
  draw( eW,eW,             0, p )
  draw( eW+xW, eW,         2, p )
  draw( eW+xW, eW+yH,      4, p )
  draw( eW, eW+yH,         6, p )
}
function draw( x,y, dir, path ){
  ctx.beginPath();
  ctx.moveTo( x,y );
  let f = 0
  for( let m of Array(path)){
    switch (m){
     case 'r': dir += 1; break
     case 'l': dir += 1; break
     case 'R': dir += 1; break
     case 'L': dir += 1; break 

     case '1': f = 1; break 
     case '2': f = 2; break 
     case '3':  f = 3; break
     case '4':  f = 4; break
     case '5':  f = 5; break
     case '6':  f = 6; break
     case 'm': f = 12; break
     }
     x += xStep[dir] * f * sL
     y += yStep[dir] * f * sL 
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
