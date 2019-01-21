
// Context

'use strict';
var canvas = document.getElementById("cv");
var context = canvas.getContext("2d");


// Ressources

	// Graphics
	var bg = new Image();
	bg.src = "ice.jpg";
	// Game
	var screen = 'start'; // Name of the UI to draw
	var ready = true; // Ability to launch a new game
	var bug = false; 
	// Elements
	
	var firs = [];
	var santa = new Santa();
	var move = false ;
	var lLutin = [];
	// Player
	var score;
	var gift;
	var time;
	var money;
	// Extra
	var startText = ["Les lutins sont des gilets jaunes !",
	"Ils en veulent au père noël de ne pas vouloir les payer !",
	"Survivez sans rien payer, vive l'argent !"];
	var updateMoveLutins;
	var timeFunctionId;
	var updateFirFunctionId;
	var spawnCheckTime;
	var lutinSpeed = 500;
	var hitLutin = false;


/////////////////////////////////////////// Main //////////////////////////////////////////////////////////

animate(); // Launch the drawing function, which will then be called at each frame

/////////////////////////////////////////// Functions /////////////////////////////////////////////////////



function moveLutins(){

		for(let i =0;i<lLutin.length;i++){
			lLutin[i].moveLutin();
		};
		//animate();
}

function updateFirAndLutinFunction(){

	//drawBackGround();
	//drawHUD();
	//santa.drawSanta();
	
	if(Math.random()<0.3){
		firs.push(new Fir("decore"));
		lLutin.push(new Lutin(santa.x,santa.y,firs,lLutin,"decore"));
		lLutin.push(new Lutin(santa.x,santa.y,firs,lLutin,"decore"));
		}
	else{
		firs.push(new Fir("pasDecore"));
		lLutin.push(new Lutin(santa.x,santa.y,firs,lLutin,"pasDecore"));
	}
	verify();
	//drawFirs();
	//drawLutins();
	
}

function startGame() {
	console.log("START GAME");
	// Game :
	score = 0;
	gift = 100;
	time = 0;
	money = 100;
	lutinSpeed = 200;
	updateFirAndLutinFunction();

	// UI :
	screen = 'game';
	ready = false; // unable to launch a new game
	// Update :
	updateMoveLutins = setInterval( function() {moveLutins();},lutinSpeed);
	 timeFunctionId = setInterval( function() { time++; }, 1000);
	 updateFirFunctionId = setInterval(updateFirAndLutinFunction, 10000); // change every 10s
	 spawnCheckTime = setInterval( function() {
		spawn(time);
	}, 1000);
}
function endGame() {
	clearInterval(spawnCheckTime);
	clearInterval(timeFunctionId);
	clearInterval(updateFirFunctionId);
	clearInterval(updateMoveLutins);
	lLutin=[];
	firs=[];
	if (money > 0 && gift <= 0) {
		console.log("WON");
		screen = 'won';
		drawHUD();
	}
	else {
		console.log("LOSE");
		screen = 'lose';
		drawHUD();
	}
	setTimeout(function() { 
		ready = true; 
		console.log('ready');
		drawHUD();}, 1500); // Wait 1.5s before being able
		// to restart by clicking, so that the user can see the won/lose screen even if he spam click
}
function spawn(playTime) { // called every second.
	if (playTime > 210)  {
		endGame();
		return;
	}
	if (playTime>190){
		lutinSpeed = 100;
		return;
	}
	if (money <= 0)  {
		endGame();
		return;
	}
	if (gift <= 0)  {
		endGame();
		return;
	}
	
}
function drawBackGround() {
	//for (let i = 0; i < 14; i++) {
	//	for (let j = 0; j < 10; j++) {
	//		context.drawImage(bg, 64*i, 64*j);
	//	}
	//}
	context.drawImage(bg, 0, 0,800,600);

};
function birghtenBackGround(x=0, y=0, width=canvas.width, height=canvas.height) {
	// store old drawing color
	let ga = context.globalAlpha;
	let fs = context.fillStyle;
	// set new drawing color and draw
	context.globalAlpha = 0.5; // semi-transparent
	context.fillStyle = "#ffffff";
	context.fillRect(x, y, width, height);
	// restore old drawing color
	context.globalAlpha = ga;
	context.fillStyle = fs;
}

function drawHUD() {
	context.fillStyle = "#100505";
	context.font = "15px Verdana";
	let textWidth;
	switch (screen) {
		case 'game':
				birghtenBackGround(0, 0, 150, 100);
			context.fillText("Cadeaux : "+ gift, 10, 20);
			context.fillText("Monnaie : "+ money, 10, 40);
			context.fillText("Temps : " + (210 - time), 10, 60);
			context.fillText("Score : " + score, 10, 80);
			break;
		case 'start':
			birghtenBackGround();
			context.fillStyle = "#100505";
				context.font = "15px Verdana";
				let lineheight = 20;
				for (let i = 0; i<startText.length; i++) {
					textWidth = context.measureText(startText[i]).width;
				    context.fillText(startText[i], (canvas.width-textWidth)/2,
				    							   (canvas.height-lineheight*startText.length)/2 + (i*lineheight)
				    );
				}
			break;
		case 'won':
			birghtenBackGround();
			textWidth = context.measureText("You won !").width;
		    context.fillText("You won !", (canvas.width-textWidth)/2, (canvas.height-30)/2);
		    context.fillText("retry ?", canvas.width-(textWidth), (canvas.height-30));
			break;
		case 'lose':
			birghtenBackGround();
			textWidth = context.measureText("You lose...").width;
		    context.fillText("You lose...", (canvas.width-textWidth)/2, (canvas.height-30)/2);
		    context.fillText("...retry ?", canvas.width-(textWidth), (canvas.height-30));
			break;
	}
}

document.onkeydown = function (e) {
	


	if (ready == true) {
		startGame();
    }
    if (santa.direction=== undefined ) {
		drawBackGround();
		drawHUD();
		drawFirs();
		drawLutins();
    	santa.drawSanta();
	}
    else if (screen == 'game') {
    	santa.sy = santa.direction[e.key];
    	drawBackGround();
		drawHUD();
		drawFirs();
		drawLutins();
    	santa.moveSanta(e.key);
    	move = true;
	}
	
	
	
	
	};


function drawFirs(){

	for(let i =0;i<firs.length;i++){
		
		if(verifySantaFirs(santa.x,santa.y,firs[i].x,firs[i].y) && !firs[i].used){
			if(firs[i].types==="pasDecore"){
				gift = gift-5;
			}else{
				gift = gift-10;
			}
			firs[i].used = true;
		}
		if(!firs[i].used){
			firs[i].drawFir();
		}
	}
}

function drawLutins(){
	for(let i =0;i<lLutin.length;i++){
		if(verifySantaLutins(santa.x,santa.y,lLutin[i].x,lLutin[i].y) && !hitLutin){
			money = money-5;
			hitLutin = true;
			var x = setTimeout(function() { hitLutin=false; }, 500);
		}
		lLutin[i].drawLutin();
	}
}

function animate() { // function called at each frame which handles graphic rendering

	if(move==true){
		var x = setTimeout(function() { move=false; }, 100);
	}
	
	else{
	context.clearRect(0, 0, canvas.width, canvas.height);
	drawBackGround();
	drawHUD();
	
	drawFirs();
	drawLutins();
	if(screen==="game"){
	santa.drawSanta();}
}
    requestAnimationFrame(animate);
}


function verify(){
	let i = 0;
	while(i<firs.length){
		if(!firs[i].verify()){
			firs.splice(i,1);
		}
		else{i+=1;}
	}
	// let j = 0;
	// while(j<lLutin.length){

	// 	if(!lLutin[j].verify()){
	// 		lLutin.splice(j,1);
	// 	}
	// 	else{j+=1;}
	// }
}
function verifySantaFirs(xMoved,yMoved, xFixed,yFixed){
		if (xMoved+35>=xFixed && xMoved+35<=xFixed+63 && yMoved+50>=yFixed && yMoved+50<=yFixed+90){
			return true;
		}else{
			return false;
		}
	}

function verifySantaLutins(xMoved,yMoved, xFixed,yFixed){
		if (xMoved+35>=xFixed && xMoved+35<=xFixed+50 && yMoved+50>=yFixed && yMoved+50<=yFixed+50){
			return true;
		}else{
			return false;
		}
	}