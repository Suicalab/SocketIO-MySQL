var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

var mysql = require('mysql');

var mysql_connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

mysql_connection.query('use teste');

mysql_connection.connect(function(err){
  var post = {id:2,data:'asdasdasd'};
  var query = mysql_connection.query('select * from tbl1');
});

app.listen(8888);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

var query;

io.sockets.on('connection', function (socket) {

   setInterval(function(data){

      mysql_connection.query('SELECT * from tbl1', function(err, rows, fields) {
        if (err) throw err;
        query = rows[0];
      });

      socket.emit('news', { hello: query });


    },1000);
/*  socket.on('news', function (data) {
    console.log(data);
  });*/
});