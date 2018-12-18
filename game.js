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
	// Elements
	//var santa = new santa();
	//var firs = [];
	//var pixies = [];
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
// Game Manager

function startGame() {
	console.log("START GAME");
	// Game :
	firs = [];
	pixies = [];
	score = 0;
	gift = 100;
	time = 0;
	money = 100;
	// UI :
	screen = 'game';
	ready = false; // unable to launch a new game
	// Update :
	timeFunctionId = setInterval( function() { time++; }, 1000);
	spawnCheckTime = setInterval( function() {
		z = spawn(time)
	}, 1000);
}
function endGame() {
	clearInterval(timeFunctionId);
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
	// spawn every two seconds when playTime < 140 :
	if (playTime < 140 && playTime % 2 == 1) {
		return;
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
			context.fillText("Temps : " + (200 - time), 10, 60);
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
// Add event listener for 'mousedown' events (because 'click' is mouseup :( )
canvas.addEventListener('mousedown', function(event) {

    // start the game if it is not :
    if (ready == true) {
		startGame();
    }

    if (screen == 'game') {
	}

}, false);
function animate() { // function called at each frame which handles graphic rendering
	drawBackGround();
	drawHUD();
    requestAnimationFrame(animate);
}