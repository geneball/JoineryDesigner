import "./styles.css";

const squares = {
  bot: {  VL: '4Ŕ4L4L4R4',  VR: '4R4L4L4R4',
          HT: '4R4L4L4R4',  HB: '4R4L4L4R4'
       },
  H0:  {  VL: 'R6LmL6', VR:'m',
          HT: 'L6R6L6L6', HB: 'R6L6R6R6'
       },
  H1:  {  VL: 'm',  VR:'R6LmL6',
          HB: 'L6R6L6L6', HT: 'R6L6R6R6'
       },
  D0:  {  VL: 'rmLlm',  VR: 'm',
          HT: 'm',  HB: 'RmLlm'
       },
  D1:  {  VR: 'rmLlm',  VL: 'm',
          HB: 'm',  HT: 'RmLlm'
       },
  Q0:  {  VL: '6R6L6L6',  VR: '6R6L6L6',
          HT: '6R6L6L6',  HB: '6R6L6L6' 
       },
  Q1:  {  VR: '6R6L6L6',  VL: '6R6L6L6',
          HB: '6R6L6L6',  HT: '6R6L6L6' 
       },
 
  S2: { VL: 'm',  VR: 'm',
           HT: 'm',  HB: 'm'
         },
 
  Solid: { VL: 'm',  VR: 'm',
           HT: 'm',  HB: 'm'
         }
}
var edge = squares.Solid

const grids = {
  bot66: [ 
         [ 'bot', 'bot', 'bot', 'bot', 'bot', 'bot' ],
         [ 'bot', 'bot', 'bot', 'bot', 'bot', 'bot' ],
         [ 'bot', 'bot', 'bot', 'bot', 'bot', 'bot' ],
         [ 'bot', 'bot', 'bot', 'bot', 'bot', 'bot' ],
         [ 'bot', 'bot', 'bot', 'bot', 'bot', 'bot' ],
         [ 'bot', 'bot', 'bot', 'bot', 'bot', 'bot' ]
        ],

   all: [ [ 'bot', 'bot', 'H0', 'H0' ],
          [ 'D0', 'D0', 'Q0', 'Q0' ],
          [ 'Solid', 'Solid', 'Solid', 'Solid' ]
        ]
}
function addButtons( el, obj, fn ){
  for (let nm in obj ){
    el.insertAdjacentHTML( 'beforeend', `<button id='btn${nm}'>${nm}</button>` )
  }
  for ( nm in obj ){
    let b = document.getElementByID( nm )
    b.addEventListener( 'click', fn.bind( obj[nm] ))
  }
}
function clear(){
  ctx.lineWidth = 1
  ctx.fillStyle = '8080f0'
 
  ctx.fillRect( 0,0, WD, HT )
  ctx.strokeRect( 0,0, WD, HT )
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
      
      if ( vert ){ // cuts from L & R
        draw( xTL+mL,yTL,    2, e.VR )
        draw( xTL,   yTL+mL, 6, w.VL )
      } else { // cuts from T & B
        draw( xTL   ,yTL,    0, n.HT ) 
        draw( xTL,   yTL+mL, 4, s.HB )  
      }
      vert = !vert
    }
    vertRw =!vertRw
  }
}
function showSquare( s ){
  let e = squares.edge
  let gr = [ [ e, e, e, e ],
              [ e, s, s, e ],
              [ e, e, e, e ]
           ]
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
     x += xStp[dir] * f * sL
     y += yStp[dir] * f * sL 
     ctx.lineTo( x,y );
  }
  ctx.stroke()
  ctx.closePath()
  ctx.fill()
}
function updPaths(){
  let test =  { 
    VL: ePaths[0].value, 
    VR: ePaths[1].value,
    HT: ePaths[2].value,
    HB: ePaths[3].value
  }
  
  if ( test.VR.length ==0 )
    test.VR = test.VLR
  
  if ( test.HT.length ==0 )
    test.HT = test.VL
  
  if ( test.HB.length ==0 )
    test.HB = test.HT
  showSquare( test )
}

const canvas = document.getElementById("canv")
const ctx = canvas.getContext("2d")

const WD = 500, HT = 500

const xStp = [ 1, 1, 0, -1, -1, -1, 0, 1 ]
const yStp = [ 0, 1, 1, 1, 0, -1, -1, -1 ]

var eW = 20, xW = WD, yH = HT 
clear()

let grbtns = document.getElementByID( 'grBtns' )
addButtons( grbtns, grids, (s) => showGrid( s ) )

let sqbtns = document.getElementByID( 'sqBtns' )
addButtons( sqbtns, squares, (s) => showSquare( s ))

const ePaths = [           
  document.getElementById("path0"),
  document.getElementById("path1"),
  document.getElementById("path2"),
  document.getElementById("path3")
]
for (let e of ePaths )
  e.addEventListener( 'change', updPaths )
 
