const socket = io();

let colorA = document.getElementById("c-celeste"),
    colorG = document.getElementById("c-verde"),
    colorP = document.getElementById("c-morado"),
    colorNR = document.getElementById("c-naranjaRojo"),
    messageInput = document.getElementById("input-chat"),
    chatBox = document.getElementById("chat-box"),
    sendMessage = document.getElementById("send-message"),
    subContainerChat = document.getElementById("sub-container-chats"),
    contadorClick = 0,
    contadorFondo = 0,
    nameStatus = document.getElementsByClassName('name-status')[0];
let ulr = "../User/login.html";

let urlCurrently = window.location.search;

urlCurrently = urlCurrently.split('=');

socket.emit('saveUser', urlCurrently[1]);

socket.on('mainUserDisconnect', () => {
    alert('Por favor espere. Actulamente LaRefa no se encuentra conectado...');
});

let getTime = () => {
    var time = new Date(),
        hour = time.getHours(),
        minutes = time.getMinutes();
    return `${hour} : ${minutes}`
}

function getOut() {

    if (confirm("Desea Finalizar el chat ?")) {
        socket.emit('deleteUser');
        window.location.href = ulr;

    }
}

sendMessage.addEventListener('click', function() {
    if (!(messageInput.value == "")) {
        socket.emit("chat:message", { message: messageInput.value, time: getTime() });
        messageInput.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
    } else {
        messageInput.focus();
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});

socket.on('chat:messageNormalRes', function(data) {
    if (data.name == "LaRefa") {
        chatBox.innerHTML += `
         <style>
             .message{
                 background-color: white;
                 font-size: 2rem;
                 padding: 1rem 4rem;
                 margin:1rem ;
                
                 border: 1rem solid #b6b8b8;
                 border-radius: 3rem;
             }
             .data {
                 height: auto;
                 max-width: 68rem;
                 margin-bottom: 1rem;
                 word-wrap: break-word;
             }
             .time{
                 font-size: 1.5rem;
                 color: gray;
                 
             }
         </style>
         <div class="message" style="margin-right:20%;">
             <p class="data" style="text-align: left;">
             <strong>${data.message}</strong>
             </p>
             <p class="time" style="text-align: left;>
                 ${data.time}
             </p>
         </div>
           `
        messageInput.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
    } else {
        chatBox.innerHTML += `
            <style>
                .message{
                    background-color: white;
                    font-size: 2rem;
                    padding: 1rem 4rem;
                    margin:1rem ;
                    margin-left:5rem;
                    border: 1rem solid #b6b8b8;
                    border-radius: 3rem;
                }
                .data {
                    height: auto;
                    max-width: 68rem;
                    
                    margin-bottom: 1rem;
                    word-wrap: break-word;
                }
                .time{
                    font-size: 1.5rem;
                    color: gray;
                    
                }
            </style>
            <div class="message" style="margin-left:20%;">
                <p class="data" style="text-align: right;">
                <strong>${data.message}</strong>
                </p>
                <p class="time" style="text-align: right;>
                    ${data.time}
                </p>
            </div>
              `
        messageInput.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});

socket.on('showStatus', function(data) {

    console.log("numero-user.js" + data);

    switch (data) {
        case 1:
            nameStatus.innerHTML = "ESTADO: CHAT INICIADO";
            nameStatus.style.backgroundColor = "#08d934";
            colorG.style.backgroundColor = `#08d934`;
            break;
        case 2:
            nameStatus.innerHTML = "ESTADO: ORDEN EN PROCESO"
            nameStatus.style.backgroundColor = "#08c0d9";
            colorG.style.backgroundColor = `#08d934`;
            colorA.style.backgroundColor = `#08c0d9`;
            break;

        case 3:
            nameStatus.innerHTML = "ESTADO: ORDEN LISTA!"
            nameStatus.style.backgroundColor = "#7622ef";
            colorG.style.backgroundColor = `#08d934`;
            colorA.style.backgroundColor = `#08c0d9`;
            colorP.style.backgroundColor = `#7622ef`;
            break;

        case 4:
            nameStatus.innerHTML = "ESTADO: CHAT FINALIZADO"
            nameStatus.style.backgroundColor = "#f61305";
            colorG.style.backgroundColor = `#08d934`;
            colorA.style.backgroundColor = `#08c0d9`;
            colorP.style.backgroundColor = `#7622ef`;
            colorNR.style.backgroundColor = `#f61305`;
            break;
        default:
            nameStatus.innerHTML = "ESTADO: CHAT FINALIZADO"
            nameStatus.style.backgroundColor = "#f61305";
            colorG.style.backgroundColor = `#08d934`;
            colorA.style.backgroundColor = `#08c0d9`;
            colorP.style.backgroundColor = `#7622ef`;
            colorNR.style.backgroundColor = `#f61305`;
            break;
    }

});