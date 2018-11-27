const tmi = require("tmi.js");
const options = require("./options"); //Your options file
var http = require('http');
var connection=false;

class clientname {
        constructor(name){
                const client = new tmi.client(options);
                client.connect();
		this.dict = {}
		this.lst = []
		client.on("chat", (channel, userstate, message, self) => {
        		var d = new Date();
			console.log(d.toString())
        		var key = d.toString().split(' ')[4];
        		if (!this.dict[key]) {
                		this.dict[key] = [0,d];
                		this.lst.push(key);
        		}
        		this.dict[key][0] = this.dict[key][0] + 1;
        		this.cleanDictionary();
        		if (this.anomaly()){
                		console.log('ANOMALY DETECTED');
        		}
		})
	}


	cleanDictionary() {
        	while (this.lst.length > 15) {
                	var first = this.lst.shift()
			delete this.dict[first]
        	}	
	}

	anomaly() {
        	var total = 0
        	var keys = Object.keys(this.dict)
        	for (var key in this.dict) {
                	total += this.dict[key][0]
        	}
        	var ratio = total/Math.floor((Date.now() - this.dict[this.lst[0]][1])/1000)
        	console.log(ratio)
        	return ratio < 5
	}
}

var tej = new clientname('tej')
