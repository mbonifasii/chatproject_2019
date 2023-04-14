const SocketIO = require('socket.io');
// const { UserInIndex } = require('./index');
var user = null;
var io = null;

exports.setUsers = (users) => {
    user = users['users'];
}

exports.initServer = server => {
    io = SocketIO.listen(server);
    let replicaUsers,
        mainSocket = null,
        idMainUser;

    let objectStatus = new Object();
    let objectMessages = new Object();
    io.on('connection', (socket) => {
        console.log("new connection", socket.id);

        socket.on('savingMainUser', () => {
            idMainUser = socket.id;
            mainSocket = socket;
            // if (replicaUsers.length != 0) {
            //     mainSocket.emit('showingUsers', replicaUsers);
            // }
        });

        socket.on('saveUser', urlId => {
            for (let i = 0; i < user.length; i++) {
                if (user[i].id == urlId) {
                    user[i].id = socket.id
                }
            }

            replicaUsers = user;
        });

        socket.on('chat:message', data => {
            let cont = 0,
                userConnected = socket,
                idSocket = socket.id,
                name,
                idMain,
                arrayChat;

            if (mainSocket != null) {
                for (let index = 0; index < replicaUsers.length; index++) {
                    if (replicaUsers[index].id == idSocket) {
                        name = replicaUsers[index].name;
                    }
                }

                if (idSocket == idMainUser) {
                    name = "LaRefa";
                    idMain = idMainUser;
                    idSocket = data.userId;
                    data.name = "LaRefa"
                }

                if (Object.keys(objectMessages).length == 0) {
                    objectMessages[idSocket] = [];
                    objectMessages[idSocket].push({ message: data.message, time: data.time, name: name });
                } else {
                    let size = Object.keys(objectMessages).length;
                    for (const key in objectMessages) {
                        cont++;
                        if (key === idSocket) {
                            arrayChat = objectMessages[key];
                            arrayChat.push({ message: data.message, time: data.time, name: name });
                            objectMessages[key] = arrayChat;
                            break;
                        } else if (size == cont) {
                            objectMessages[idSocket] = [];
                            objectMessages[idSocket].push({ message: data.message, time: data.time, name: name });
                        }
                    }
                }

                if (idMain == idMainUser) {
                    mainSocket.emit('chat:messageResMain', objectMessages);
                    socket.broadcast.to(idSocket).emit('chat:messageNormalRes', data);

                } else {
                    for (let index = 0; index < replicaUsers.length; index++) {
                        if (replicaUsers[index].id == idSocket) {
                            mainSocket.emit('chat:messageRes', objectMessages, replicaUsers[index]);
                            userConnected.emit('chat:messageNormalRes', data);
                            mainSocket.emit('showMessageInMain', { id: idSocket, message: data.message, time: data.time });
                            break;
                        }
                    }
                }
            } else {
                userConnected.emit('mainUserDisconnect');
            }

            console.log(objectMessages);
        });

        socket.on('status', data => {
            let contStatus = 0;
            if (Object.keys(objectStatus).length == 0) {
                objectStatus[data] = 1;
            } else {
                let size = Object.keys(objectStatus).length;

                for (let key in objectStatus) {
                    contStatus++;
                    if (key == data) {
                        objectStatus[key] += 1;
                        break;
                    } else if (contStatus == size) {
                        objectStatus[data] = 1;
                    }
                }
            }

            socket.broadcast.to(data).emit('showStatus', objectStatus[data]);
            mainSocket.emit('showStatusInMain', objectStatus);
        });

        socket.on('deleteUser', () => {

            let idDeleteUser = socket.id;

            delete objectMessages[idDeleteUser]
            delete objectStatus[idDeleteUser]

            for (let index = 0; index < replicaUsers.length; index++) {

                if (replicaUsers[index].id == idDeleteUser) {
                    replicaUsers.splice(index, 1);
                    user = replicaUsers;
                    break;
                }
            }
            if (mainSocket != null) {
                mainSocket.emit('deleteUserInMainUser', idDeleteUser);
            }

        });

        socket.on('getStatus', data => {
            for (let key in objectStatus) {
                if (key == data) {
                    console.log(`1`);
                    mainSocket.emit('showingStatusInMaOnclickInUserName', objectStatus[data]);
                    break;
                }
            }
        });
    });
}