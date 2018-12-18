// Context

var canvas = document.getElementById("cv");
var context = canvas.getContext("2d");


// Ressources

var bg = new Image();
	bg.src = "ice.jpg";
	// Graphics


var dbf = function() {
	for (let i = 0; i < 14; i++) {
		for (let j = 0; j < 10; j++) {
			context.drawImage(bg, 64*i, 64*j);
		}
	}
};
// chargement
bg.onload = dbf;