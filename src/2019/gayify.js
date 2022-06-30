var Gayify = function(obj) {
	// obj = {element, move, speed, audio}
	obj = (obj)? obj: {};
	this.element = (obj.element)? obj.element: document.documentElement;
	this.move = (obj.move)? obj.move: 20;
	this.speed = (obj.speed)? obj.speed: 1000;
	this.audio = (obj.audio)? new Audio(obj.audio): false;

	this.time = 0;
	this.running = true;

	if (this.audio) {
		this.audio.loop = true;
	}
	
	this.render = function() {
		let time = (window.performance.now()-this.time)/this.speed;

		this.element.style.transform = "translate("+
			(Math.sin(time*Math.PI*2)*this.move)+"px,"+
			(Math.cos(time*Math.PI*2)*this.move)+"px)"+
			"rotate("+
			(Math.cos(time*Math.PI*2)*5)+"deg)";

		this.element.style.filter = "hue-rotate("+
			(time*360)%360
		+"deg)";

		if (this.running) {
			window.requestAnimationFrame(this.render);
		} else {
			this.element.style.transform = "";
			this.element.style.filter = "";
		}
	}.bind(this)

	this.start = function() {
		this.running = true;
		this.time = window.performance.now();
		this.render();

		if (this.audio) {
			this.audio.currentTime = 0;
			this.audio.play();
		}
	}

	this.stop = function() {
		this.running = false;
		if (this.audio) this.audio.pause();
	}
}