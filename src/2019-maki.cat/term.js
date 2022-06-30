var Term = function(obj) {
	obj = (obj)? obj: {};
	this.cmds = (obj.cmds)? obj.cmds: {};
	this.preprint = (obj.preprint)? obj.preprint: "";
	this.error = (obj.error)? obj.error: "Command not found!";
	this.parent = (obj.id)? document.getElementById(obj.id): document.body;

	// elements for term
	this.child = {
		output: document.createElement("p"),
		input: document.createElement("input")
	}

	// set child properties
	this.child.output.style.overflowY = "auto";
	this.child.output.style.whiteSpace = "pre-wrap";
	this.child.input.autocomplete = "off";
	this.child.input.spellcheck = false;

	// term history
	this.history = [];
	this.historyIndex = -1;

	this.getHistory = function() {
		return this.history[this.history.length-this.historyIndex];
	}

	this.setCursorToEnd = function() {
		setTimeout(function() { 
			this.child.input.selectionStart = 
			this.child.input.selectionEnd = this.child.input.value.length;
		}.bind(this), 10);
	}

	this.charify = function(msg) {
		return msg.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
			return "&#"+i.charCodeAt(0)+";"
;		});
	}

	// term functions
	this.bold = function(msg) {
		return "<span style='font-weight: bold;'>"+msg+"</span>";
	}

	this.color = function(msg, col) {
		return "<span style='color: "+col+";'>"+msg+"</span>";
	}

	this.print = function(msg) {
		//this.child.output.innerHTML += this.charify(msg)+"\n";
		this.child.output.innerHTML += this.preprint+msg+"\n";
		this.child.output.scrollTop = this.child.output.scrollHeight;
	}

	this.motd = function() {
		for (var i=0; i<obj.motd.length; i++) {
			this.print(obj.motd[i]);
		}
	}

	this.clear = function() {
		this.child.output.innerHTML = "";
		this.child.input.value = "";
	}

	this.exec = function(cmd) {
		try {
			this.cmds[cmd]({
				// remember these!
				print: this.print.bind(this),
				msg: this.child.input.value.slice(cmd.length+1),
				clear: this.clear.bind(this),
				motd: this.motd.bind(this),
				bold: this.bold,
				color: this.color,
				exec: this.exec.bind(this)
			});
		} catch(err) {
			this.print(this.error);
			console.log(err);
		}
	}

	if (obj.motd) this.motd();

	// set child events
	this.child.input.addEventListener("keydown", function(e) {
		switch (e.keyCode) {
			case 38: // up
				if (this.historyIndex<this.history.length) this.historyIndex++;
				if (this.getHistory()) this.child.input.value = this.getHistory();
				this.setCursorToEnd();
				break;
			case 40: // down
				if (this.historyIndex>1) this.historyIndex--;
				if (this.getHistory()) this.child.input.value = this.getHistory();
				this.setCursorToEnd();
				break;
			case 13: // enter
				let cmd = this.child.input.value.split(" ")[0].toLowerCase();
				if (cmd.trim() == "") return;

				this.history.push(this.child.input.value);
				this.historyIndex = 0;

				this.exec(cmd.trim());

				this.child.input.value = "";
				break;
		}
	}.bind(this));

	this.spawn = function() {
		// add to parent
		this.parent.appendChild(this.child.output);
		this.parent.appendChild(document.createElement("br"));
		this.parent.appendChild(this.child.input);
	}
}