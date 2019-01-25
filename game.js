
// Context

'use strict';
var canvas = document.getElementById("cv");
var context = canvas.getContext("2d");

var musicGeneral = new Audio("ffivbossbattle.mp3");
var musicApparition = new Audio("apparition.mp3");


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
	var updateFirstBoule;
	var updateSecondBoule;
	var lutinSpeed = 500;
	var hitLutin = false;
	var boule1 = new Boule();
	var boule2 = new Boule();



/////////////////////////////////////////// Main //////////////////////////////////////////////////////////

animate(); // Launch the drawing function, which will then be called at each frame

/////////////////////////////////////////// Functions /////////////////////////////////////////////////////


//fonction qui déplace les lutins sur le plateau
function moveLutins(){
	if(!boule1.used && !boule2.used){
		for(let i =0;i<lLutin.length;i++){
			if(lutinSpeed===500){
			lLutin[i].moveLutin(1);}
			else{
				lLutin[i].moveLutin(3);
			}
		};
		}
}


//fonction qui fait apparaître les nouveaux lutins et nouveaux sapins et les enlève s'ils sont trop vieux
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


//fonction qui s'active lorsqu'on commence la partie, qui réinitialise les variables
function startGame() {
	console.log("START GAME");
	// Game :
	score = 0;
	gift = 100;
	time = 0;
	money = 100;
	lutinSpeed = 500;
	boule1 = new Boule();
	boule2= new Boule();
	updateFirAndLutinFunction();

	//Music : 
	musicGeneral.loop=true;
	musicGeneral.play();

	// UI :
	screen = 'game';
	ready = false; // unable to launch a new game
	// Update :
	updateFirstBoule = setTimeout(function(){boule1.appeared=true;musicApparition.play();},70000);
	updateSecondBoule = setTimeout(function(){boule2.appeared=true;musicApparition.play();},150000);
	updateMoveLutins = setInterval( function() {moveLutins();},lutinSpeed);
	 timeFunctionId = setInterval( function() { time++; }, 1000);
	 updateFirFunctionId = setInterval(updateFirAndLutinFunction, 10000); // change every 10s
	 spawnCheckTime = setInterval( function() {
		spawn(time);
	}, 1000);
}


//fonction qui s'active lors de la défaite
function endGame() {
	clearInterval(spawnCheckTime);
	clearInterval(timeFunctionId);
	clearInterval(updateFirFunctionId);
	clearInterval(updateMoveLutins);
	clearTimeout(updateFirstBoule);
	clearTimeout(updateSecondBoule);
	lLutin=[];
	firs=[];
	boule1= new Boule();
	boule2= new Boule();
	musicGeneral.pause();
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


//fonction qui vérifie la victoire ou défaite
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


//fonctions qui dessinent le background
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

//fonction qui dessine le cadre des informations avec le temps, la monnaie et les cadeaux restants
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
			textWidth = context.measureText("You won with "+money+" euros").width;
		    context.fillText("You won with "+money+" euros", (canvas.width-textWidth)/2, (canvas.height-30)/2);
		    context.fillText("retry ?", canvas.width-(textWidth), (canvas.height-30));
			break;
		case 'lose':
			birghtenBackGround();
			textWidth = context.measureText("You lose with "+gift+" gifts remaining").width;
		    context.fillText("You lose with "+gift+" gifts remaining", (canvas.width-textWidth)/2, (canvas.height-30)/2);
		    context.fillText("...retry ?", canvas.width-(textWidth), (canvas.height-30));
			break;
	}
}


//eventlistener pour les mouvements
document.onkeydown = function (e) {
	


	if (ready == true) {
		startGame();
    }
    if (santa.direction=== undefined ) {
		drawBackGround();
		drawHUD();
		drawFirs();
		drawBoules();
		drawLutins();
    	santa.drawSanta();
	}
    else if (screen == 'game') {
    	santa.sy = santa.direction[e.key];
    	drawBackGround();
		drawHUD();
		drawFirs();
		drawBoules();
		drawLutins();
    	santa.moveSanta(e.key);
    	move = true;
	}
	
	
	
	
	};

//fonction qui dessine les sapins et vérifie si un père noël est dessus et met à jour le nombre de cadeaux
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


// fonction qui dessine les lutins et vérifie si on touche un lutin
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


 // function called at each frame which handles graphic rendering (elle utilise toutes les autres fonctions de dessins)
function animate() {

	if(move==true){
		var x = setTimeout(function() { move=false; }, 100);
	}
	
	else{
	context.clearRect(0, 0, 800, 600);
	drawBackGround();
	drawHUD();
	drawFirs();
	drawBoules();
	drawLutins();
	if(screen==="game"){
	santa.drawSanta();}
}
    requestAnimationFrame(animate);
}

//fonction qui vérifie si les sapins n'ont pas dépassé leur temps d'affichage et sinon les enlève
function verify(){
	let i = firs.length;
	let k =0;
	while(k<i){
		if(k>=firs.length){break;}
		if(!firs[k].verify()){
			firs.splice(k,1);
		}
		else{k+=1;}
	}
	
}

//fonction utilisée pour repérer si le père noël touche un sapin
function verifySantaFirs(xMoved,yMoved, xFixed,yFixed){
		if (xMoved+35>=xFixed && xMoved+35<=xFixed+63 && yMoved+50>=yFixed && yMoved+50<=yFixed+90){
			return true;
		}else{
			return false;
		}
	}


//fonction utilisée pour repérer si le père Noël touche un lutin
function verifySantaLutins(xMoved,yMoved, xFixed,yFixed){
		if (xMoved+35>=xFixed && xMoved+35<=xFixed+50 && yMoved+50>=yFixed && yMoved+50<=yFixed+50){
			return true;
		}else{
			return false;
		}
	}

//fonction utilisée pour repérer si le père Noël touche une boule
function verifyBoule(xMoved,yMoved,xFixed,yFixed,i){
	if (xMoved+35>=xFixed && xMoved+35<=xFixed+50 && yMoved+50>=yFixed && yMoved+50<=yFixed+50 && i===1){
			boule1.used=true;
			boule1.appeared=false;
			var used1=setTimeout(function(){boule1.used=false;},15000);
			
		}else if(xMoved+35>=xFixed && xMoved+35<=xFixed+50 && yMoved+50>=yFixed && yMoved+50<=yFixed+50 && i===2){
			boule2.used=true;
			boule2.appeared=false;
			var used2=setTimeout(function(){boule2.used=false;},15000);
			
		}
}



//dessine les boules et vérifie si on est dessus
function drawBoules(){

	if(!boule1.used && boule1.appeared){
	verifyBoule(santa.x,santa.y,boule1.x,boule1.y,1);}
	if(!boule2.used && boule2.appeared){
	verifyBoule(santa.x,santa.y,boule2.x,boule2.y,2);}

	if(boule1.appeared){
		boule1.drawBoule();

	}
	if(boule2.appeared){
		boule2.drawBoule();
	}
}