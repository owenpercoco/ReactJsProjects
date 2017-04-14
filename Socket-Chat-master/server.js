var express= require('express');
var app = express();
const path = require('path');

var connections = [];
var users = [];

app.use(express.static('./app'));

var port = process.env.PORT || 3000;
var server = app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

io = require('socket.io').listen(server);

 app.get('/', function(request, response) {
 response.render('app/index');
 });
io.sockets.on('connection', function(socket){

	socket.once('disconnect', function(){
		for(i=0;i < users.length; i++){
			if(users[i].id == this.id){
				users.splice(i, 1);
			}
		}
		connections.splice(connections.indexOf(socket),  1);
		socket.disconnect();
		console.log('Disconnected: %s sockets connected', connections.length);
		io.emit('disconnect', users);
	});

	socket.on('messageAdded', function(payload){
		var newMessage = {
			timeStamp: payload.timeStamp,
			text: payload.text,
			user: payload.user
		}

		io.emit('messageAdded', newMessage);
	});

	socket.on('userJoined', function(payload){
		var newUser = {
			id: this.id,
			name: payload.name
		}

		users.push(newUser);

		io.emit('userJoined', users);
		console.log("user joined " + payload.name);
	});

	connections.push(socket);
	console.log('connected: %s sockets connected', connections.length)
});

console.log('server is running on port 3000')

module.exports = {
  app: function () {
    const app = express()
    const indexPath = path.join(__dirname, 'index.html')
    const publicPath = express.static(path.join(__dirname, 'public'))

    app.use('/public', publicPath)
    app.get('/', function (_, res) { res.sendFile(indexPath) })

    return app
  }
}
