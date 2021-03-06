var base_image;
var ballObj = new Image();
var selected = -1;
function make_base(){
	var canvas = document.getElementById("canvas");
	if (canvas == null || !canvas.getContext) 
		return;

	var ctx=canvas.getContext("2d");

	ballObj = new Image();
	ballObj.src = 'ball.png';
	ballObj.onload = function()
	{
	ctx.drawImage(ballObj, elements[10].x-15, elements[10].y-15);
	}
	bin = new Image();
	bin.src = 'bin.png';
	bin.onload = function()
	{
	ctx.drawImage(bin,1024-64-10 ,512-64-10 );
	}
}

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

function onMousedown(e) {
	x = e.pageX;
	y = e.pageY;
	selected = -1;
	if(crtaj == true)
	{
		paint = true;
		addClick(x, y);
	}
	
	if(elements.length<11)
	{
		elements.push({"x":x, "y":y});
	}
	else
	{
		 for(var j=0 ; j<elements.length; j++)
		 {
			if(Math.abs(x-elements[j].x)<10 &&
			   Math.abs(y-elements[j].y)<10){
				selected = j;
				break;
			}
		 }
	}
	draw();
}

function onMouseUp(e) {
	x = e.pageX;
	y = e.pageY;
	if(paint == true && crtaj == true)
	{
		paint = false;
	}
	if(selected != -1)
	{
		elements[selected].x = x;
		elements[selected].y = y;
		if(x>1024-64-10 && y>512-64-10)
			elements[selected].visible = false;
		selected = -1;

	}
	draw();
}

function onMousemove(e) {
	x = e.pageX;
	y = e.pageY;
	if(paint == true && crtaj == true)
	{
		addClick(x, y, true);
		//aj me nazovi na telefon
		draw();
	}else if(selected != -1)
	{
		elements[selected].x = x;
		elements[selected].y = y;
		draw();
	}
}


var elements = [{ekipa:"domaci", broj:"PG", x:180, y:320, visible:true}, 
	        {ekipa:"domaci", broj:"SG", x:160, y:220, visible:true},
		{ekipa:"domaci", broj:"SF", x:520, y:250, visible:true},
		{ekipa:"domaci", broj:"PF", x:300, y:100, visible:true},
		{ekipa:"domaci", broj:"C", x:200, y:60, visible:true},
		{ekipa:"gosti", broj:"PG", x:110, y:120, visible:true},
		{ekipa:"gosti", broj:"SG", x:150, y:120, visible:true},
		{ekipa:"gosti", broj:"SF", x:170, y:150, visible:true},
		{ekipa:"gosti", broj:"PF", x:190, y:170, visible:true},
		{ekipa:"gosti", broj:"C", x:170, y:190, visible:true},
];

function polukrug(ctx, R, x0, y0, ugao1, ugao2) {
  for (var i=ugao1;i<=ugao2-5;i+=5) {
    x1 = R*Math.cos(i*Math.PI/180);
    y1 = R*Math.sin(i*Math.PI/180);
    xx = R*Math.cos((i+5)*Math.PI/180);
    yy = R*Math.sin((i+5)*Math.PI/180);
    ctx.moveTo(x0+x1, y0-y1);
    ctx.lineTo(x0+xx, y0-yy);
  }
}

function draw() {
 var canvas = document.getElementById("canvas");
 if (canvas == null || !canvas.getContext) 
	return;

 var ctx=canvas.getContext("2d");
 ctx.clearRect(0, 0, canvas.width, canvas.height); // Clears the canvas
 ctx.stroke();

 var x0 = 0.5*canvas.width;  // x0 pixels from left to x=0
 var y0 = 0.5*canvas.height; // y0 pixels from top to y=0
 var width = canvas.width;
 var height = canvas.height;
 
  ctx.moveTo(x0, 0);
  ctx.lineTo(x0, height);
 
  ctx.moveTo(0, 32.91);
  ctx.lineTo(73.142, 32.91);

  ctx.moveTo(0, 479.09);
  ctx.lineTo(73.142, 479.09);
  
  var RTrojka = 223.49;                     //Leva trojka
  polukrug(ctx, RTrojka, 73.142, y0, 270, 270+180);
  polukrug(ctx, RTrojka, 950.858, y0, 90, 270);

  ctx.moveTo(width, 32.91);  //Trojka ivica
  ctx.lineTo(950.858, 32.91);
  //ctx.strokeStyle= "blue";
  //ctx.stroke ();
  ctx.moveTo(width, 479.09);  //Trojka ivica
  ctx.lineTo(950.858, 479.09);
  
  var R = 15;            // Kos levi
  for (var i=0;i<=360-5;i+=5) {
    x1 = R*Math.cos(i*Math.PI/180);
    y1 = R*Math.sin(i*Math.PI/180);
    xx = R*Math.cos((i+5)*Math.PI/180);
    yy = R*Math.sin((i+5)*Math.PI/180);
    ctx.moveTo(57.599325+x1, y0-y1);
    ctx.lineTo(57.599325+xx, y0-yy);
  }

  var R = 15;            // Kos desni
  for (var i=0;i<=360-5;i+=5) {
    x1 = R*Math.cos(i*Math.PI/180);
    y1 = R*Math.sin(i*Math.PI/180);
    xx = R*Math.cos((i+5)*Math.PI/180);
    yy = R*Math.sin((i+5)*Math.PI/180);
    ctx.moveTo(1024-57.599325+x1, y0-y1);
    ctx.lineTo(1024-57.599325+xx, y0-yy);
  }
  ctx.moveTo(42.599325, 256-35);// tabla desna
  ctx.lineTo(42.599325, 256+35);
  

  ctx.moveTo(1024-42.599325, 256-35);// tabla leva
  ctx.lineTo(1024-42.599325, 256+35);

  //========================================
  var R = 60;            // Polukrug za faul
  for (var i=270;i<=270+180-5;i+=5) {
    x1 = R*Math.cos(i*Math.PI/180);
    y1 = R*Math.sin(i*Math.PI/180);
    xx = R*Math.cos((i+5)*Math.PI/180);
    yy = R*Math.sin((i+5)*Math.PI/180);
    ctx.moveTo(42.599325+10+x1, y0-y1);
    ctx.lineTo(42.599325+10+xx, y0-yy);
  }
  ctx.moveTo(1024-42.599325, 256-60);  
  ctx.lineTo(1024-42.599325-10,256-60);
  ctx.moveTo(1024-42.599325, 256+60);  
  ctx.lineTo(1024-42.599325-10,256+60);  
//====================================================
  R = 60;            // Polukrug za faul
  for (var i=90;i<=270-5;i+=5) {
    x1 = R*Math.cos(i*Math.PI/180);
    y1 = R*Math.sin(i*Math.PI/180);
    xx = R*Math.cos((i+5)*Math.PI/180);
    yy = R*Math.sin((i+5)*Math.PI/180);
    ctx.moveTo(1024-42.599325-10+x1, y0-y1);
    ctx.lineTo(1024-42.599325-10+xx, y0-yy);
  }
  ctx.moveTo(42.599325, 256-60);  
  ctx.lineTo(42.599325+10,256-60);
  ctx.moveTo(42.599325, 256+60);  
  ctx.lineTo(42.599325+10,256+60);
//======================================== 
  ctx.moveTo(512-182.855, 512);  //Linija za 4. cetvrtinu
  ctx.lineTo(512-182.855,490);
  ctx.moveTo(512+182.855, 512);  //Linija za 4. cetvrtinu
  ctx.lineTo(512+182.855,490);
  ctx.moveTo(512-182.855, 0);  //Linija za 4. cetvrtinu
  ctx.lineTo(512-182.855,22);
  ctx.moveTo(512+182.855, 0);  //Linija za 4. cetvrtinu
  ctx.lineTo(512+182.855,22);
//============================================================
  ctx.moveTo(500, 256);  
  ctx.lineTo(524,256);

  ctx.moveTo(0, 256-80);  
  ctx.lineTo(168.2266,256-80);
  ctx.moveTo(0, 256+80);  
  ctx.lineTo(168.2266,256+80);
  ctx.moveTo(168.2266, 256-80);  
  ctx.lineTo(168.2266,256+80);

  var R = 80;            // Polukrug za bacanje
  for (var i=270;i<=270+180-5;i+=5) {
    x1 = R*Math.cos(i*Math.PI/180);
    y1 = R*Math.sin(i*Math.PI/180);
    xx = R*Math.cos((i+5)*Math.PI/180);
    yy = R*Math.sin((i+5)*Math.PI/180);
    ctx.moveTo(168.2266+x1, y0-y1);
    ctx.lineTo(168.2266+xx, y0-yy);
    }
 
  ctx.moveTo(1024, 256-80);  
  ctx.lineTo(1024-168.2266,256-80);
  ctx.moveTo(1024, 256+80);  
  ctx.lineTo(1024-168.2266,256+80);
  ctx.moveTo(1024-168.2266, 256-80);  
  ctx.lineTo(1024-168.2266,256+80);

  var R = 80;            // Polukrug za bacanje
  for (var i=90;i<=270-5;i+=5) {
    x1 = R*Math.cos(i*Math.PI/180);
    y1 = R*Math.sin(i*Math.PI/180);
    xx = R*Math.cos((i+5)*Math.PI/180);
    yy = R*Math.sin((i+5)*Math.PI/180);
    ctx.moveTo(1024-168.2266+x1, y0-y1);
    ctx.lineTo(1024-168.2266+xx, y0-yy);
    }
  ctx.moveTo(0, 0);  //Teren
  ctx.lineTo(1024, 0);
  ctx.lineTo(1024, 512);
  ctx.lineTo(0, 512);
  ctx.lineTo(0, 0);
 
 for (var i=0;i<=360;i+=5) {           //Centralni krug
  x1 = 65.8*Math.cos(i*Math.PI/180);
  y1 = 65.8*Math.sin(i*Math.PI/180);
  xx = 65.8*Math.cos((i+5)*Math.PI/180);
  yy = 65.8*Math.sin((i+5)*Math.PI/180);
  ctx.moveTo(x0+x1, y0-y1);
  ctx.lineTo(x0+xx, y0-yy);
 }

  ctx.stroke();
 for(var j=0 ; j<10; j++)
 {
	if(elements[j].visible == false)
		continue;
  ctx.beginPath();
  ctx.arc(elements[j].x-9,elements[j].y-9,15,0,2*Math.PI);
  if(elements[j].ekipa == "domaci") {
    ctx.fillStyle = 'purple';
  }else{
   ctx.fillStyle = 'gray';
  }

  ctx.fill();
  ctx.font = '10pt Calibri';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  broj = j%5;
  ctx.fillText(''+(elements[j].broj), elements[j].x-9, elements[j].y-5);
 }

  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.drawImage(ballObj, elements[10].x-15, elements[10].y-15);
  ctx.drawImage(bin, 1024-64-10, 512-64-10);
  ctx.strokeStyle = "#ff0000";
  ctx.lineJoin = "round";
  ctx.lineWidth = 5;
			
  for(var i=0; i < clickX.length; i++) {		
    ctx.beginPath();
    if(clickDrag[i] && i){
      ctx.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       ctx.moveTo(clickX[i]-1, clickY[i]);
     }
     ctx.lineTo(clickX[i], clickY[i]);
     ctx.closePath();
     ctx.stroke();
  }
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#000000";
  
 ctx.stroke();

  
}
//==============KRETANJE================
function init(){
    bin = 'bin.png';
	ballObj.src = 'ball.png';
	var canvas = document.getElementById("canvas");
	if (canvas == null || !canvas.getContext) 
		return;
	canvas.addEventListener('mousemove', onMousemove, false);
	canvas.addEventListener('mousedown', onMousedown, false);
	canvas.addEventListener('mouseup', onMouseUp, false);
	 //for (var i=0;i<360;i+=36) {           //Centralni krug
	for(var i=0; i<10; i++){
          console.log(i);
		x1 = 520+80*Math.cos(36*i*Math.PI/180);
	    y1 = 264-80*Math.sin(36*i*Math.PI/180);
	   //elements.push({"x":x1, "y":y1})
		elements[i].x = x1;
		elements[i].y = y1;
    }
    elements.push({"x":512, "y":256})
	make_base();
	draw();
}

window.addEventListener("keydown", onkeydown, true);
function onkeydown(event)
{
	if(event.keyCode == 37){		
		elements[10].x -=15;		
	}else if(event.keyCode == 38){
		elements[10].y -=15;
	}else if (event.keyCode == 39){
	    elements[10].x +=15;
	}else if (event.keyCode == 40){
	    elements[10].y +=15;
	}
	draw();	 
}

var crtaj = false;
function uradi1()
{
	if(crtaj==false)
	{
		document.getElementById("dugme1").className  = "button green";
		crtaj = true;
	}else{
		document.getElementById("dugme1").className  = "button gray";
		crtaj = false;
	}
}

function uradi2()
{
 clickX = new Array();
 clickY = new Array();
 clickDrag = new Array();
 draw();	
}
