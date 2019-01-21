
var cs = document.getElementById("cv");
	var ctx = cs.getContext("2d");
	var lutinIm = new Image();
	lutinIm.src = "lutin.png";




	class Lutin{


		constructor(xSanta,ySanta,lSapin,lLutin,type){
			
			var booli = false;
			this.direction = {
			"Right": 64,
			"Left": 32,
			"Up": 96,
			"Down": 0
			};
			this.sens = Math.floor(Math.random()*4);
			this.sy = this.direction["Down"];
			this.count=0;
			this.counter=0;
			this.types=type;
			do{
				this.x=Math.floor(Math.random()*731);
				this.y=Math.floor(Math.random()*496);
				for(var i =0;i<lSapin.length;i++){
					if(this.x>lSapin[i].x && this.x<lSapin[i].x+50 && this.y>lSapin[i].y && this.y<lSapin[i].y+50){
						booli=true;
					}
				}
				for(var i =0;i<lLutin.length;i++){
					if(this.x>lLutin[i].x && this.x<lLutin[i].x+50 && this.y>lLutin[i].y && this.y<lLutin[i].y+50){
						booli=true;
					}
				}


			}while((this.x>xSanta && this.x<xSanta+70 && this.y>ySanta && this.y<ySanta+105)||booli);

		}

		drawLutin(){

			
				
			switch(this.count){
				case 0 :
				case 1 :
				case 2 :
					ctx.drawImage(lutinIm, 32, this.sy,32,32,this.x,this.y,50,50);
					break;
				
				case 3:
				case 4:
				case 5:
					ctx.drawImage(lutinIm,0,this.sy,32,32,this.x,this.y,50,50);
					break;
				
				case 6 :
				case 7 :
				case 8 :
					ctx.drawImage(lutinIm,64,this.sy,32,32,this.x,this.y,50,50);
					break;
		}


		}


		moveLutin(){
			this.count=(this.count+1)%9;
			switch(this.sens){
			case 0 :
				
				if (this.x+8>750){
					this.x=750;
					this.sens = 1;
				}
				else{
					this.x=this.x+8;
				}
				this.sy=this.direction["Right"];
				
				break;

			
			case 1 :
				
				if (this.x-8<0){
					this.x=0;
					this.sens = 0;
				}
				else{
					this.x=this.x-8;
				}
				this.sy=this.direction["Left"];
				break;

			case 2 :
				
				if (this.y-8<0){
					this.y=0;
					this.sens = 3;
				}
				else {
					this.y=this.y-8;
				}
				this.sy=this.direction["Up"];
				break;
			
			case 3 :
				
				if (this.y+8>550){
					this.y=550;
					this.sens = 2;
				}
				else {
					this.y=this.y+8;
				}
				this.sy=this.direction["Down"];
				
			
			}
		

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



