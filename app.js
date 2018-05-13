/* Importar as configurações do servidor */
var app = require('./config/server')

/* parametrizar a porta de escuta */
var server = app.listen(80, function(){
    console.log('Servidor online')
})

 /* Fazendo com que o websocket tambem fique ouvindo na porta 80 */
var io = require('socket.io').listen(server)

 /* Criar a conexão por websocket */
 io.on('connection', function(socket){
     console.log('Usuário conectou')

     socket.on('disconnect', function(){
         console.log('Usuário desconectou')
     })
 })