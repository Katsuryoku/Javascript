// Context

var canvas = document.getElementById("cv");
var context = canvas.getContext("2d");


// Ressources

	// Graphics
	var bg = new Image();
	bg.src = "ice.jpg";
	// Game
	var screen = 'start'; // Name of the UI to draw
	var ready = true; // Ability to launch a new game
	var bug = false; // a funny bug (not so funny since grave disapear)
	var littleFir   = {type: 1, size: 1, spawnAfter: 0};
	var bigFir   = {type: 2, size: 1, spawnAfter: 0};
	var spawnAtRandom = [littleFir, bigFir];
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
	


/////////////////////////////////////////// Main //////////////////////////////////////////////////////////

animate(); // Launch the drawing function, which will then be called at each frame

/////////////////////////////////////////// Functions /////////////////////////////////////////////////////



function moveLutins(){

		for(var i =0;i<lLutin.length;i++){
			var r = Math.floor(Math.random()*4);
			lLutin[i].moveLutin(r);
		}
}

function updateFirAndLutinFunction(){

	drawBackGround();
	drawHUD();
	santa.drawSanta();
	lLutin.push(new Lutin(santa.x,santa.y,firs,lLutin));
	for(var i =0;i<firs.length;i++){
		//firs[i].drawFir();
	}
	for(var i =0;i<lLutin.length;i++){

		lLutin[i].drawLutin();
	}
	
}

function startGame() {
	console.log("START GAME");
	// Game :
	firs = [];
	pixies = [];
	score = 0;
	gift = 100;
	time = 0;
	money = 100;
	santa.drawSanta();
	// UI :
	screen = 'game';
	ready = false; // unable to launch a new game
	// Update :
	updateMoveLutins = setInterval( function() {
		if((time%2)===0 && time<190){ moveLutins();}
		if(time>=190){moveLutins();}},1000)
	timeFunctionId = setInterval( function() { time++; }, 1000);
	updateFirFunctionId = setInterval(updateFirAndLutinFunction, 10000); // change every 10s
	spawnCheckTime = setInterval( function() {
		f = spawn(time);
		if (f !== undefined){ // if a zombie spawned this time
	    	firs.push(f); // keep track of it
	    }
	}, 1000);
}
function endGame() {
	clearInterval(timeFunctionId);
	clearInterval(updateFirFunctionId);
	clearInterval(updateMoveLutins);
	if (money > 0 && gift <= 0) {
		console.log("WON");
		screen = 'won';
	}
	else {
		console.log("LOSE");
		screen = 'lose';
	}
	setTimeout(function() { ready = true; console.log('ready')}, 1500); // Wait 1.5s before being able
		// to restart by clicking, so that the user can see the won/lose screen even if he spam click
}
function spawn(playTime) { // called every second.
	if (playTime > 210)  {
		endGame();
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
	
	let canSpawn = [];
	for (let i in spawnAtRandom){
		ft = spawnAtRandom[i];
		if(ft.spawnAfter <= playTime) {
			canSpawn.push(ft);
		}
	}
	ft = canSpawn[Math.floor(Math.random()*canSpawn.length)];
	if (ft !== undefined) {
		//console.log("Spawned random : "+ft.type);
		return new Fir(ft);
	}
}
function drawBackGround() {
	for (let i = 0; i < 14; i++) {
		for (let j = 0; j < 10; j++) {
			context.drawImage(bg, 64*i, 64*j);
		}
	}
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
    if (santa.direction=== undefined) {
		return;
	}
    if (screen == 'game') {
    	santa.sy = santa.direction[e.key];
    	drawBackGround();
		drawHUD();
		for(var i =0;i<firs.length;i++){
			//firs[i].drawFir();
		}
		for(var i =0;i<lLutin.length;i++){

			lLutin[i].drawLutin();
		}
    	santa.moveSanta(e.key);
    	move = true;
	}

	
	
	
	
	
	};


function animate() { // function called at each frame which handles graphic rendering

	if(move==true){
	var x = setTimeout(function() { move=false; }, 1000);}
	
	else{
	drawBackGround();
	drawHUD();
	
	for(var i =0;i<firs.length;i++){
		//firs[i].drawFir();
	}
	for(var i =0;i<lLutin.length;i++){

		lLutin[i].drawLutin();
	}
	if(ready != true){
	santa.drawSanta();}
		}
    requestAnimationFrame(animate);
}