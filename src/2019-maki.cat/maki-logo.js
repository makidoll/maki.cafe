var MakiLogo = function(div) {
	this.div = (div)? div: document.body;

	// initialize svg and paths
	this.original = (new DOMParser()).parseFromString('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 85" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="10"><path d="M5,80 L5,15 A10,10,0 0,1 15,5 A10,10,0 0,1 25,15 L25,70 A10,10,0 0,0 35,80 A10,10,0 0,0 45,70 L45,15 A10,10,0 0,1 55,5 A10,10,0 0,1 65,15 L65,70 A10,10,0 0,0 75,80 A10,10,0 0,0 85,70 L85,15 A10,10,0 0,1 95,5 A10,10,0 0,1 105,15 L105,70 A10,10,0 0,0 115,80 A10,10,0 0,0 125,70 L125,5 "/><path d="M 85,45 A 10,10,0 0,1 95,35 A 10,10,0 0,0 105,25 "/><path d="M 125,35 A 20,20,0 0,0 145,15 L 145,5 "/><path d="M 125,35 A 20,20,0 0,1 145,55 L 145,70 A 10,10,0 0,0 155,80 A 10,10,0 0,0 165,70 L 165,5 "/></svg>', "text/html").querySelector("svg");
	this.svg  = null;
	this.path = [];
	this.init = function() {
		this.svg = this.original.cloneNode(true);

		this.path = [];
		for (var i=0; i<this.svg.children.length; i++) {
			this.path[i] = this.svg.children[i];
			this.path[i].style.transition = "initial";
		}

		this.div.innerHTML = "";
		this.div.appendChild(this.svg);
	}; this.init();

	// functions (i really cba firefox... go fix your svg rendering engine)
	// this.removePaths = function() {
	// 	for (var i=0; i<this.path.length; i++) {
	// 		this.svg.removeChild(this.path[i]);
	// 	}
	// }

	// this.addPath = function(i) {
	// 	this.svg.appendChild(this.path[i]);
	// }

	// this.delay = function(callback) {
	// 	setTimeout(callback.bind(this), 20);
	// }

	// animations
	this.playingEvent = function(){};

	this.playing = false;
	this.play = function() { this.playing = true; this.playingEvent(this.playing); }
	this.stop = function() { this.playing = false; this.playingEvent(this.playing); }

	this.playingEvent(this.playing);

	this.intro = function(obj) { // 2 seconds
		if (!obj) obj = {};
		if (this.playing && !obj.bypass) return;
		this.play();

		this.init();
		for (var i=0; i<this.path.length; i++) {
			this.path[i].style.strokeDashoffset = this.path[i].getTotalLength();
			this.path[i].style.strokeDasharray = this.path[i].getTotalLength();
			this.path[i].style.transitionTimingFunction = "cubic-bezier(0.4, 0.0, 0.2, 1)";
		}

		setTimeout(function() {
			this.path[0].style.transitionDuration = "1400ms";
			this.path[0].style.strokeDashoffset = 0;			
		}.bind(this), 1);

		setTimeout(function() {
			this.path[1].style.transitionDuration = "400ms";
			this.path[1].style.strokeDashoffset = 0;
		}.bind(this), 600);

		setTimeout(function() {
			this.path[2].style.transitionDuration = "1000ms";
			this.path[2].style.strokeDashoffset = 0;
		}.bind(this), 1000);

		setTimeout(function() {
			this.path[3].style.transitionDuration = "1000ms";
			this.path[3].style.strokeDashoffset = 0;
		}.bind(this), 1000);

		if (!obj.bypass) setTimeout(function() { this.stop(); }.bind(this), 2000);		
	}.bind(this);  

	this.outro = function() { // 2 seconds
		if (this.playing) return;
		this.play();

		this.init();
		for (var i=0; i<this.path.length; i++) {
			this.path[i].style.strokeDashoffset = 0;
			this.path[i].style.strokeDasharray = this.path[i].getTotalLength();
			this.path[i].style.transitionTimingFunction = "cubic-bezier(0.8, 0.0, 0.6, 1)";
		}

		this.path[3].style.transitionDuration = "1000ms";
		this.path[3].style.strokeDashoffset = this.path[3].getTotalLength();

		this.path[2].style.transitionDuration = "1000ms";
		this.path[2].style.strokeDashoffset = this.path[2].getTotalLength();

		setTimeout(function() {
			this.path[0].style.transitionDuration = "1400ms";
			this.path[0].style.strokeDashoffset = this.path[0].getTotalLength();
		}.bind(this), 600);

		setTimeout(function() {
			this.path[1].style.transitionDuration = "400ms";
			this.path[1].style.strokeDashoffset = this.path[1].getTotalLength();
		}.bind(this), 1000);

		setTimeout(function() { this.stop(); }.bind(this), 2000);
	}.bind(this);

	this.click = function() { // 4 second
		if (this.playing) return;
		this.play();

		let speed = 4000;

		this.init();
		for (var i=0; i<this.path.length; i++) {
			this.path[i].style.transitionTimingFunction = "cubic-bezier(0.4, 0.0, 0.2, 1)";
			this.path[i].style.transitionDuration = (speed/2)+"ms";
			this.path[i].style.strokeDasharray = this.path[i].getTotalLength();
		}

		setTimeout(function() {
			this.svg.style.strokeWidth = "0";
			for (var i=0; i<this.path.length; i++) {
				this.path[i].style.strokeDashoffset = this.path[i].getTotalLength()*7;
			}
		}.bind(this), 1);

		setTimeout(function() {
			this.svg.style.strokeWidth = "10px";
			for (var i=0; i<this.path.length; i++) {
				this.path[i].style.strokeDashoffset = this.path[i].getTotalLength()*2;
			}
		}.bind(this), speed/2);

		setTimeout(function() {
			this.stop();
		}.bind(this), speed);
	}.bind(this);

	this.loop = function(obj) {
		if (!obj) obj = {};
		if (this.playing && !obj.bypass) return;

		this.play();
		this.intro({bypass: true});

		this.svg.style.transition = "opacity 1s cubic-bezier(0.4, 0.0, 0.2, 1)";
		setTimeout(function() {
			this.svg.style.opacity = 0;
			setTimeout(function() {
				this.loop({bypass: true});
			}.bind(this), 1000);
		}.bind(this), 3500);
	}.bind(this);

	this.div.addEventListener("click", this.click);
}