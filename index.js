const tmi = require("tmi.js");
const options = require("./options"); //Your options file
var http = require('http');
var connection=false;

var firebase = require('firebase');

var config = {
  apiKey: "AIzaSyCSQjPTzOyNKW7GiV3fu7DwtyOfb1bqqRs",
  authDomain: "twitch-hackathon-55882.firebaseapp.com",
  databaseURL: "https://twitch-hackathon-55882.firebaseio.com",
  projectId: "twitch-hackathon-55882",
  storageBucket: "twitch-hackathon-55882.appspot.com",
  messagingSenderId: "84835985605"
};

firebase.initializeApp(config);




//Connect to twitch server
var client = {}
client['tej'] = new tmi.client(options);
client['tej'].connect();

//on chat
this.dict = {}
this.lst = []
client['tej'].on("chat", (channel, userstate, message, self) => {
	var d = new Date();
	key = d.toString().split(' ')[4];
	if (!this.dict[key]) {
		dict[key] = [0,d];
		lst.push(key);
	}
	dict[key][0] = dict[key][0] + 1;  
	cleanDictionary();
	if (anomaly()){
		console.log('ANOMALY DETECTED');
		var anomalyRef = firebase.database().ref('anomalies');
		//anomalyRef.update({[Date.now()]:true})
	}
})

function cleanDictionary() {
	while (lst.length > 15) {
		var first = lst.shift()
		delete dict[first]	
	} 
}

function anomaly() {
	var total = 0
	console.log(this.dict)
	var keys = Object.keys(this.dict)
	for (key in this.dict) {
		total += this.dict[key][0]
	}
	ratio = total/Math.floor((Date.now() - dict[lst[0]][1])/1000)
	console.log(ratio) 
	return ratio < .7
} 

class clientname {
	constructor(name){
		const client = new tmi.client(options);
		client.connect();	
	}	
	
}
