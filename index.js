let serial;

class Color{
	constructor(r, g, b){
		this.setValue(r, g, b);
	}

	getValue(){
		return [this.r, this.g, this.b];
	}

	setValue(r, g, b){
		this.r = this.constrainColorValue(r);
		this.g = this.constrainColorValue(g);
		this.b = this.constrainColorValue(b);
	}

	constrainColorValue(x){
		if(x < 0)
			return 0;
		if(x > 255)
			return 255;
		return x;
	}
}

var colors = [];

function setup() {
	let canvas = createCanvas(640, 480);
	canvas.parent('p5-container');
	frameRate(30);

	connectSerial();
	
	textSize(16);
	noStroke();
	fill(255, 100, 0);
}

function connectSerial(){
	serial = new p5.SerialPort("192.168.1.10");
	serial.open("COM5");
	serial.on('open', function(){
		print("Socket opened.")
	});
	serial.on('connected', function(){
		print("Connected.");
	});
	serial.on('error', function (err) {
		print("Error: " + err + ".");
	});
}

function draw() {
	let tempColor = new Color(0, 0, 0);

	if(serial.available()){
		let rawData = [];

		let serialData = serial.readStringUntil("\r\n");
		if(serialData.length){
			rawData = serialData.split(",").map(x => x.split(">"));	
			tempColor.setValue(rawData[0][1], rawData[1][1], rawData[2][1]);
			colors.push(new Color(tempColor.r, tempColor.g, tempColor.b));
			if(colors.length > 310)
				colors.shift();
		}

		//Draw text info
		if(rawData.length){
			fill(240);
			rect(220, 10, 410, 200);
			fill(30, 30, 30);
			text("RAW: r" + rawData[0][0] + " g" + rawData[1][0] + " b" + rawData[2][0], 240, 46);
			text("CLN: R" + rawData[0][1] + " G" + rawData[1][1] + " B" + rawData[2][1], 240, 72);
			text("CLR: R" + tempColor.r + " G" + tempColor.g + " B" + tempColor.b, 240, 98);

			fill(colors[colors.length-1].getValue());
		}
	}

	//Draw color box
	rect(10, 10, 200, 200);

	//Draw spectrum
	fill(240);
	rect(10, 220, 620, 250);

	for(let i=0; i<colors.length; i++){
		fill(colors[i].getValue());
		rect(10 + 2*i, 220, 2, 250);
	}
}
