import "./styles.css";

const ePath = document.getElementById("path")

const canvas = document.getElementById("canv")
const ctx = canvas.getContext("2d")

// Set line width
ctx.lineWidth = 1


const xW = 460, yH = 460, eW =20, sL = xW / 12

const xStp = [  sL, sL, 0, -sL, -sL, -sL, 0, sL ]
const yStp = [  0, sL, sL, sL, 0, -sL, -sL, -sL ]


function clear(){

  ctx.clearRect( eW,eW, xW,yH )

  ctx.fillRect( eW, 0, xW,eW )  // top
  ctx.fillRect( 0,eW, eW,yH )  // left
  ctx.fillRect( eW+xW,eW,  eW,yH ) // right
  ctx.fillRect( eW,eW+yH,  xW,eW ) // bottom
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
