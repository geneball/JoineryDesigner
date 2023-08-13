import "./styles.css";

const grids = {
  bot66: [ [ 'bot', 'bot', 'bot', 'bot', 'bot', 'bot' ],
         [ 'bot', 'bot', 'bot', 'bot', 'bot', 'bot' ],
         [ 'bot', 'bot', 'bot', 'bot', 'bot', 'bot' ],
         [ 'bot', 'bot', 'bot', 'bot', 'bot', 'bot' ],
         [ 'bot', 'bot', 'bot', 'bot', 'bot', 'bot' ],
         [ 'bot', 'bot', 'bot', 'bot', 'bot', 'bot' ]
        ],

Chk: []
        }

const squares = {
  bot: { TLtoTr: '4R4L4L4R4', TRtoBR: '4L4R4R4L4',
         BRtoBL: '4R4L4L4R4', BLtoTL: '4L4R4R4L4'
       },
  H0:  { TLtoTr: 'm', TRtoBR: 'm',
         BRtoBL: 'm', BLtoTL: 'R6LmL6' },
  D0:  { TLtoTr: 'm', TRtoBR: 'm',
         BRtoBL: 'm', BLtoTL: 'rmLlm' },
  Q0:  { TLtoTR: 'm', TRtoBR: '6R6L6L6',
         BRtoBL: 'm', BLtoTL: '6R6L6L6' },
  edge: { TLtoTr: 'm', TRtoBR: 'm',
          BRtoBL: 'm', BLtoTL: 'm' }
}

const ePath = document.getElementById("path")

const canvas = document.getElementById("canv")
const ctx = canvas.getContext("2d")



const WD = 500, HT = 500

const xStp = [ 1, 1, 0, -1, -1, -1, 0, 1 ]
const yStp = [ 0, 1, 1, 1, 0, -1, -1, -1 ]

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
  ctx.lineWidth = 1
  
  ctx.clearRect( 0,0, WD, HT )
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
  let gr = [ [ s, s ]]
  showGrid( gr )
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
  ctx.stroke()
  ctx.closePath()
  ctx.fill()
}


ePath.addEventListener( 'change',
            (evt) => updPath( ePath.value )
    )
