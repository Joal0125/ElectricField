var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var index = 0;
var xBase = 50;
var yBase = 200;
var radius = 6;
var runFlag = 1;
var time = 0.0;
var timer;
var charge1X = xBase + 110;
var charge1Y = yBase;
var charge2X = xBase + 390;
var charge2Y = yBase;
var Ex = 0;
var Ey = 0;
var rSq = 0;
var xPos = 0;
var yPos = 0;
var vectorColor = "black";
var Q1 = 5.0;
var Q2 = -5.0;

drawMotion();

function drawMotion() {
	runFlag = 1;
	if (runFlag == 1) {
		// clear
		context.clearRect(0, 0, canvas.width, canvas.height);

		// set background color for the entire thing
		context.fillStyle = "#ffd";
		context.fillRect(0, 0, canvas.width, canvas.height);

		// set line color
		context.strokeStyle = "#999";
		context.lineWidth = 2;

		//draw charge
		if (Math.abs(Q1) > 0.2) {
			if (Q1 > 0) {
				chargeOne = new component(160, 220, 8, "red");
			} else {
				chargeOne = new component(160, 220, 8, "#0099ff");
			}
		}
		if (Math.abs(Q2) > 0.2) {
			if (Q2 > 0) {
				chargeTwo = new component(250, 220, 8, "red");
			} else {
				chargeTwo = new component(250, 220, 8, "#0099ff");
			}
		}
	}
}

//generador de objetos(cargas)
function component(x, y, radius, color) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	ctx = context;
	ctx.fillStyle = color;
	ctx.strokeStyle = "black";
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
	ctx.fill();
	ctx.lineWidth = 2;
	ctx.stroke();
	//signo suma de la carga
	if (color == "red") {
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.moveTo(this.x, this.y - this.radius + 3);
		ctx.lineTo(this.x, this.y + this.radius - 3);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(this.x - this.radius + 3, this.y);
		ctx.lineTo(this.x + this.radius - 3, this.y);
		ctx.stroke();
	} else {
		//signo resta de la carga
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.moveTo(this.x - this.radius + 3, this.y);
		ctx.lineTo(this.x + this.radius - 3, this.y);
		ctx.stroke();
	}
}
