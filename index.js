const serverSocket = require('./serverSocket');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Users } = require(__dirname + "/public/classes/users");
const user = new Users();

let cont = 0;
app.use(bodyParser.json());

//configuraciones
app.set('port', process.env.PORT || 3000);

// Archivos Estaticos
app.use(express.static(path.join(__dirname, 'public')));

app.get(`/login`, function(req, res) {
    res.sendFile(__dirname + '/public/User/login.html');
});

app.get(`/MainUser`, function(req, res) {
    res.sendFile(__dirname + '/public/MainUser/index.html');
});

app.post('/login', function(req, res) {
    let userExist = false;
    let checkUser = user.getUsers();
    let contador = 0;
    let size = checkUser.length;

    if (checkUser.length == 0) {
        user.addUser(cont, req.body.name, req.body.cell);
        res.send({ id: cont });
        cont++;
    } else {
        for (let i = 0; i < checkUser.length; i++) {
            contador++;
            if ((req.body.name).toUpperCase() == (checkUser[i].name).toUpperCase() || req.body.cell == checkUser[i].cell) {
                userExist = true;
                res.send(userExist);
                break;
            } else if (contador == size) {
                user.addUser(cont, req.body.name, req.body.cell);
                res.send({ id: cont });
                cont++;
            }
        }
    }

})

serverSocket.setUsers(user);

//Iniciar el servidor
const server = app.listen(app.get('port'), () => {
    console.log("Server on port ", app.get('port'));
});

serverSocket.initServer(server);