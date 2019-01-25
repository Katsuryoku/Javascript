var cs = document.getElementById("cv");
	var ctx = cs.getContext("2d");
	var boule = new Image();
	boule.src = "mushroom.png";




class Boule{

	constructor() {
		this.used=false;
		this.appeared = false;
		this.x=Math.floor(Math.random()*731);
		this.y=Math.floor(Math.random()*496);
	}



	drawBoule(){

		ctx.drawImage(boule,0,0,200,200,this.x,this.y,50,50);

	}









}