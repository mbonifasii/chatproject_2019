const socket = io();

let buttonCE = document.getElementById("button-ce"),
    colorA = document.getElementById("c-celeste"),
    colorG = document.getElementById("c-verde"),
    colorP = document.getElementById("c-morado"),
    colorNR = document.getElementById("c-naranjaRojo"),
    messageInput = document.getElementById("input-chat"),
    searchUser = document.getElementById("search-user"),
    chatBox = document.getElementById("chat-box"),
    sendMessage = document.getElementById("send-message"),
    subContainerChat = document.getElementById("sub-container-chats"),
    contadorClick = 0,
    contadorFondo = 0,
    name = "LaRefa",
    userId,
    tempSockeId;

socket.emit('savingMainUser');

socket.on('chat:messageRes', function(objectMessages, replicaUsers) {
    let array = [replicaUsers];
    renderUsers(array);
    renderMessages(objectMessages);
});

socket.on('chat:messageResMain', function(objectMessages) {
    renderMainMessages(objectMessages);
});

socket.on('showStatus', objectStatus => {
    renderStatus(objectStatus);
});

socket.on('showMessageInMain', data => {

    if (data.id == tempSockeId) {
        chatBox.innerHTML += `
        <style>
        .message{
            text-align: left;
            background-color: white;
            font-size: 2rem;
            padding: 1rem 4rem;
            margin:1rem ;
            border: 1rem solid #b6b8b8;
            border-radius: 3rem;
        }
        .data { 
            height: auto;
            max-width: 48rem;

            margin-bottom: 1rem;
            word-wrap: break-word;
        }
        .time{
            font-size: 1.5rem;
            color: gray;
        }
    </style>
    <div class="message" style="margin-right: 20%;">
    <p class="data" style="text-align: left;">
        <strong> ${data.message}</strong>
        </p>
        <p class="time">
        ${data.time}<br>
        </p>
    </div>
    `;
        chatBox.scrollTop = chatBox.scrollHeight;
    }

});

socket.on('showStatusInMain', objectStatus => {
    renderStatus(objectStatus, tempSockeId);
});

function getTempId(id) {
    tempSockeId = id;
}

let getTime = () => {
    var time = new Date(),
        hour = time.getHours(),
        minutes = time.getMinutes();
    return `${hour} : ${minutes}`
}

sendMessage.addEventListener('click', function(event) {
    if (!(messageInput.value == "") && (tempSockeId != undefined)) {
        chatBox.innerHTML += `
        <style>
        .message{
           text-align: right;
            background-color: white;
            font-size: 2rem;
            padding: 1rem 4rem;
            margin:1rem ;
            border: 1rem solid #b6b8b8;
            border-radius: 3rem;

        }
        .data {
            height: auto;
            max-width: 48rem;

            margin-bottom: 1rem;
            word-wrap: break-word;
        }
        .time{
            font-size: 1.5rem;
            color: gray;

        }
    </style>
    <div class="message" style="margin-left: 20%;">
    <p class="data" style="text-align: right;">
        <strong> ${messageInput.value}</strong>
        </p>
        <p class="time">
        ${getTime()}<br>
        </p>
    </div>
    `;
        socket.emit("chat:message", { message: messageInput.value, time: getTime(), userId: userId });
        messageInput.value = "";

    } else {
        event.preventDefault();
        messageInput.value = "";
    }
});

buttonCE.addEventListener('click', function() {
    if (tempSockeId != undefined) {
        socket.emit('status', tempSockeId);
    }

});

socket.on('deleteUserInMainUser', idData => {
    tempSockeId = undefined
    rederRemoveUserContainer(idData);
});

function getIdUser(socketId) {
    userId = socketId;
    socket.emit('getStatus', userId);
}

socket.on('showingStatusInMaOnclickInUserName', idStatus => {
    renderStatusOnclickInUserName(idStatus);
});

function searchForUserName() {

    let filter,
        li,
        p,
        name;

    filter = searchUser.value.toUpperCase();
    li = divUsersContainer.getElementsByTagName('li');
    for (let i = 0; i < li.length; i++) {
        p = li[i].getElementsByTagName('p')[0];
        name = p.innerText;
        if (name.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }

}