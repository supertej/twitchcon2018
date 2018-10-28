const tmi = require("tmi.js");
const options = require("./options"); //Your options file
var WebSocketServer = require('websocket').server;
var http = require('http');
var connection=false;

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});


wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});


wsServer.on('request', function(request) {
	connection = request.accept('echo-protocol', request.origin);
	console.log((new Date()) + ' Connection accepted.');
	connection.on('close', function(reasonCode, description) {
        	console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    	});
});

//Connect to twitch server
const client = new tmi.client(options);
client.connect();

//on chat
var dict = {}
var lst = []
client.on("chat", (channel, userstate, message, self) => {
	var d = new Date();
	key = d.toString().split(' ')[4];
	if (!dict[key]) {
		dict[key] = [0,d];
		lst.push(key);
	}
	dict[key][0] = dict[key][0] + 1;  
	cleanDictionary();
	if (anomaly()){
		console.log('ANOMALY DETECTED');
	        if (connection){
        	        connection.sendUTF('ANOMALY DETECTED');
	        }
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
	var keys = Object.keys(dict)
	for (key in dict) {
		total += dict[key][0]
	}
	ratio = total/Math.floor((Date.now() - dict[lst[0]][1])/1000)
	console.log(ratio) 
	return ratio < 0.35
} 

