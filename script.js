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
		index = index + 1;

		// set background color for the entire thing
		context.fillStyle = "#ffd";
		context.fillRect(0, 0, canvas.width, canvas.height);
		/*
		// set line color
		context.strokeStyle = "#999";
		context.lineWidth = 2;
*/
		//draw charge
		if (Math.abs(Q1) > 0.2) {
			if (Q1 > 0) {
				chargeOne = new component(charge1X, charge1Y, 8, "red");
			} else {
				chargeOne = new component(charge1X, charge1Y, 8, "#0099ff");
			}
		}
		if (Math.abs(Q2) > 0.2) {
			if (Q2 > 0) {
				chargeTwo = new component(charge2X, charge2Y, 8, "red");
			} else {
				chargeTwo = new component(charge2X, charge2Y, 8, "#0099ff");
			}
		}

		//draw field vectors
		for (var i = -7; i <= 7; i++) {
			Ex = Ey = 0;
			xPos = 300 + 40 * i;
			for (var j = -4; j <= 4; j++) {
				yPos = yBase + 40 * j;
				ctx = context;
				ctx.beginPath();
				//ctx.arc(xPos, yPos, 0.3 * radius, 0, 2 * Math.PI, false);
				ctx.fillStyle = "black";
				ctx.fill();
				ctx.lineWidth = 2;
				ctx.strokeStyle = "black";
				ctx.stroke();
				rSq =
					(xPos - charge1X) * (xPos - charge1X) +
					(yPos - charge1Y) * (yPos - charge1Y);
				Ex = (6e3 * Q1 * (xPos - charge1X)) / Math.pow(rSq, 1.5);
				Ey = (6e3 * Q1 * (charge1Y - yPos)) / Math.pow(rSq, 1.5);

				rSq =
					(xPos - charge2X) * (xPos - charge2X) +
					(yPos - charge2Y) * (yPos - charge2Y);
				Ex = Ex - (6e3 * Q2 * (charge2X - xPos)) / Math.pow(rSq, 1.5);
				Ey = Ey - (6e3 * Q2 * (yPos - charge2Y)) / Math.pow(rSq, 1.5);
				E = Math.sqrt(Ex * Ex + Ey * Ey);
				Ex = (5 * Ex) / E;
				Ey = (5 * Ey) / E;
				E = E * 40;
				//console.log(E);

				if (E > 255) E = 255;
				E = Math.round(255 - E);
				grayString = E.toString(16);
				if (grayString.length == 1) grayString = "0" + grayString;

				vectorColor = "#" + grayString + grayString + grayString;
				drawArrow(Ex, Ey, xPos, yPos, vectorColor);
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

//dibujar vectores
function drawArrow(Fx, Fy, Px, Py, arrowColor) {
	var theta = Math.atan2(Fy, Fx);
	ctx = context;
	ctx.strokeStyle = arrowColor;
	ctx.lineWidth = 4;
	ctx.beginPath();
	ctx.moveTo(Px - 2.5 * Fx, Py + 2.5 * Fy);
	ctx.lineTo(Px + 2.5 * Fx, Py - 2.5 * Fy);
	ctx.stroke();

	ctx.lineWidth = 2;
	var Fmag = Math.sqrt(Fx * Fx + Fy * Fy);
	if (Fmag > 5) Fmag = 5;

	ctx.fillStyle = arrowColor;
	ctx.beginPath();
	ctx.moveTo(
		Px + 2.5 * Fx - 3 * Fmag * Math.cos(theta + 0.25 * (3.1416 / 2)),
		Py - 2.5 * Fy + 3 * Fmag * Math.sin(theta + 0.25 * (3.1416 / 2))
	);
	ctx.lineTo(Px + 2.5 * Fx, Py - 2.5 * Fy);
	ctx.lineTo(
		Px + 2.5 * Fx - 3 * Fmag * Math.cos(theta - 0.25 * (3.1416 / 2)),
		Py - 2.5 * Fy + 3 * Fmag * Math.sin(theta - 0.25 * (3.1416 / 2))
	);
	ctx.stroke();
	ctx.fill();
}

function runMotion() {
	drawMotion();
	if (runFlag == 1) {
		timer = window.requestAnimationFrame(runMotion);
	}
}

//controles deslizantes
function showQ1(newValue) {
	//get the element
	var display = document.getElementById("initialQ1Value");
	//show the amount
	display.innerHTML = newValue;
	Q1 = Number(newValue);
	drawMotion();
}

function showQ2(newValue) {
	//get the element
	var display = document.getElementById("initialQ2Value");
	//show the amount
	display.innerHTML = newValue;
	Q2 = Number(newValue);
	drawMotion();
}
