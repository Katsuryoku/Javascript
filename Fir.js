var cs = document.getElementById("cv");
var ctx = cs.getContext("2d");

var firs = new Image();
firs.src = "tree.png";

class Fir{
	constructor(type, size){
		this.position = {x: Math.floor(Math.random()*(600-73*this.size)), y: Math.floor(Math.random()*100)};
		this.size = size;
		this.types = type;
		this.timeSinceSpawned = 0;
	}

	drawFir(){
		ctx.drawImage(firs,
			this.types % 2 * 80, Math.floor(this.types / 2) * 121, 80, 121,
			this.firPosition.x, this.firPosition.y, this.size*73, this.size*97);
	}
}