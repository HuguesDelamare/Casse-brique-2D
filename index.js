'use strict';


var canvas = document.getElementById("myCanvas"); //Recupère le canvas via l'id
var ctx = canvas.getContext("2d"); //Definition canvas en Bi-dimensionnel 
var x = canvas.width/2; //centrer la position de la boule
var y = canvas.height-30; // descendre la boule vers le bas 
var dx = 2; //Vitesse de la boule
var dy = -2;
var ballRadius = 10; 

//Definition du paddle
var paddleHeight= 10;
var paddleWidth= 75;

//Point de départ du paddle 
var paddleX= (canvas.width-paddleWidth)/2; 

//Touches set en false (non pressées)
var righPressed = false;
var leftPressed = false;

//Definition des briques
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];

// Compteur

var score = 0;


/*

//CARRE ROUGE
ctx.beginPath();
ctx.rect(20, 40, 50, 50); // Creation d'un carré (posgauche,poshaut,tailleX,tailleY)
ctx.fillStyle = "#FF0000"; //Stocke la couleur 
ctx.fill(); //Ressortir la couleur stocker
ctx.closePath();

//BALLE
ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI*2, false); //Création d'un cercle (x, y, rayon, angleDépart, angleFin, sensAntiHoraire);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

CARRE VERT
ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)"; // Stocke couleur format (RVBA) ET color le contour exterieur
ctx.stroke();
ctx.closePath();
*/


for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 , status: 1 };
    }
}

function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);	
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
        	if (bricks[c][r].status == 1) 
        	{
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        	}
        }
    }
}

function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX,canvas.height-paddleHeight  ,paddleWidth  ,paddleHeight  );
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawBall(){

ctx.beginPath();
ctx.arc(x, y, ballRadius, 0, Math.PI*2); 
ctx.fillStyle = "#0095DD";
ctx.fill();
ctx.closePath();	

}

function draw() {

ctx.clearRect(0, 0, canvas.width, canvas.height); //nettoie la trainée de la balle 

drawScore();
drawBall();
drawPaddle();
drawBricks();
collisionDetection();

x += dx;
y += dy;

//Rebondissement HAUT et BAS 
if ( y + dy < ballRadius ) 
{
	dy = -dy;

}else if( y + dy > canvas.height-ballRadius)
{
	if ( x > paddleX && x < paddleX + paddleWidth) 
	{
		dy = -dy;

	}else
	{
		alert(" PERDU :( ");
		document.location.reload();	

	}

}

//Rebondissement GAUCHE et DROITE
if ( x + dx > canvas.width-ballRadius || x + dx < ballRadius ) 
{
	dx = - dx;
}

//Mouvement du paddle 
if (righPressed && paddleX < canvas.width-paddleWidth)
{
	paddleX += 7;
}
if (leftPressed && paddleX > 0)
{
	paddleX -= 7;
}

}

//Jouer avec la souris
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

// Touche pressée devient true
function keyDownHandler(e){
	if (e.keyCode == 39) 
	{
		righPressed = true;
	}
	else if (e.keyCode == 37) 
	{
		leftPressed = true;
	}
}

// Touche relachée retourne à false
function keyUpHandler(e){
	if (e.keyCode == 39) 
	{
		righPressed = false;
	}
	else if (e.keyCode == 37) 
	{
		leftPressed = false;
	}
}

//Fonction de collision balle=>briques
function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) 
            {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) 
                {
                	dy = -dy;
                	b.status =0;
                	score++;
            	}

            	if (score == brickColumnCount*brickRowCount) 
            	{
            		alert(" TU AS GAGNE, BRAVO ! :) ");
            		document.location.reload();	
            		clearInterval(interval);	
            	}	
            }

        }
    }
}


document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);



setInterval(draw,10);



