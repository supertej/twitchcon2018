const tmi = require("tmi.js");
const options = require("./options"); //Your options file

//Connect to twitch server
const client = new tmi.client(options);
client.connect();

//on chat
var dict = {}
client.on("chat", (channel, userstate, message, self) => {
	var d = new Date();
	console.log(String(d.getMinutes()) + String(d.getSeconds()))
})

