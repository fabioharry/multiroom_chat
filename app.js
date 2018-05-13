/* Importar as configurações do servidor */
var app = require('./config/server')

/* parametrizar a porta de escuta */
var server = app.listen(80, function(){
    console.log('Servidor online')
})

 /* Fazendo com que o websocket tambem fique ouvindo na porta 80 */
var io = require('socket.io').listen(server)

/* Criando uma variavel global usando o express*/
app.set('io', io)

 /* Criar a conexão por websocket */
 io.on('connection', function(socket){
     console.log('Usuário conectou')

     socket.on('disconnect', function(){
         console.log('Usuário desconectou')
     })

     socket.on('msgParaServidor', function(data){
         /* Dialogo */
        /* Faz a mensagem que enviou aparecer na propria tela do chat */
        socket.emit(
            'msgParaCliente', 
            {apelido: data.apelido, mensagem: data.mensagem}
        )
        /* Faz a mensagem que enviou aparecer nas demais tela do chat, menos de quem enviou */
        socket.broadcast.emit(
            'msgParaCliente', 
            {apelido: data.apelido, mensagem: data.mensagem}
        )

        /* participantes */
        if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
            socket.emit(
                'participantesParaCliente', 
                {apelido: data.apelido}
            )
            /* Faz a mensagem que enviou aparecer nas demais tela do chat, menos de quem enviou */
            socket.broadcast.emit(
                'participantesParaCliente', 
                {apelido: data.apelido}
            )
        }
     })

 })