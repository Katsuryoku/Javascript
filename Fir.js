
var cs = document.getElementById("cv");
var ctx = cs.getContext("2d");

var firIm = new Image();
firIm.src = "tree.png";


class Fir{

	//type =  decore pasDecore
	constructor(type){
		this.x= Math.floor(Math.random()*727);
		this.y= Math.floor(Math.random()*527);
		this.types = type;
		this.counter = 0;
		this.used = false; //si le sapin a été pris par le père noel passe en true
	}

	drawFir(){
		if(this.types==="pasDecore"){
		ctx.drawImage(firIm,293,212,60 ,80 ,this.x, this.y,63 ,90 );}
		else{
		ctx.drawImage(firIm,293,295,59 ,93 ,this.x, this.y,63 ,90 );}
	}


	verify(){
		if (this.types==="pasDecore" && this.counter===2){
			
			return false;
		}
		else if(this.types==="decore" && this.counter===1){
			
			return false;
		}
		else{
			this.counter+=1;
			return true;}
	}

}