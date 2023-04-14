//Funciones para renderizar usuarios
let divUsersContainer = document.getElementById('sub-container-chats'),
    conversationName = document.getElementById('conversation-name');
let containerUser;
let arrayNameUsers = new Array();
let arrayPhoneUsers = new Array();
let cont = 0;
let tempId = 0;

function renderUsers(users) {
    let contador = 0;

    arrayNameUsers.push(users[0].name);
    arrayPhoneUsers.push(users[0].cell);

    for (let index = 0; index < arrayNameUsers.length; index++) {
        contador++;

        if (contador == arrayNameUsers.length) {

            divUsersContainer.innerHTML += `
            <style>
                .sub-container-chats li p{
                    text-decoration: none;
                    display: block;
                }

                .container-user{
                    padding-top: 1.5rem;
                    padding-bottom: 1.5rem;
                    background-color: white;
                    text-align: center;
                    margin: 0.5rem ;
                    border: 0.5rem solid #ececec;
                    font-size: 2rem;
                    color: #737070;
                    border-radius: 1rem;
                }
        
                .container-user:hover{
                    color: #3d3b3a;
                    border: 0.5rem solid #3d3b3a;
                }
            </style>
            <li>
            <p class="container-user" >
                ${users[0].name}
            </p>
            </li>
            `;
            containerUser = document.querySelectorAll(".container-user");
            containerUser[cont].setAttribute("data-socketid", users[0].id);

            cont++;

        } else if (arrayNameUsers[index] == users[0].name && contador < arrayNameUsers.length) {
            arrayNameUsers.splice((arrayNameUsers.length - 1), 1);
            break;
        }
    }
}

function renderMessages(objectMessages) {
    let cont = 0;

    containerUser = document.querySelectorAll(".container-user");

    for (let i = 0; i < arrayNameUsers.length; i++) {
        containerUser[i].addEventListener('click', function() {
            console.log(`arrayNameUsers.length: ${arrayNameUsers.length}`);
            let size = Object.keys(objectMessages).length;
            colorG.style.backgroundColor = `#ffffff`;
            colorA.style.backgroundColor = `#ffffff`;
            colorP.style.backgroundColor = `#ffffff`;
            colorNR.style.backgroundColor = `#ffffff`;
            chatBox.innerHTML = "";

            for (let key in objectMessages) {
                cont++;
                for (let index = 0; index < objectMessages[key].length; index++) {
                    let container = containerUser[i];
                    let userId = container.getAttribute(`data-socketid`);
                    tempId = userId;
                    getTempId(tempId);
                    if (key == userId) {
                        if (objectMessages[key][index].name == "LaRefa") {
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
                                         <strong> ${JSON.stringify(objectMessages[key][index].message)}</strong>
                                         </p>
                                         <p class="time">
                                         ${JSON.stringify(objectMessages[key][index].time)}<br>
                                         </p>
                                     </div>
                                     `;
                            chatBox.scrollTop = chatBox.scrollHeight;
                            if (cont == size) {
                                getIdUser(userId);
                            }
                        } else {

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
                                         <strong> ${JSON.stringify(objectMessages[key][index].message)}</strong>
                                         </p>
                                         <p class="time">
                                         ${JSON.stringify(objectMessages[key][index].time)}<br>
                                         </p>
                                     </div>
                                     `;
                            chatBox.scrollTop = chatBox.scrollHeight;

                            let conversationName = document.getElementById('conversation-name');
                            conversationName.innerHTML = `${containerUser[i].innerText}`
                            if (cont == size) {
                                getIdUser(userId);
                            }
                        }
                        getIdUser(userId);
                    }
                }
            }

        });

    }
}


function renderMainMessages(objectMessages) {
    let cont = 0;

    containerUser = document.querySelectorAll(".container-user");

    for (let i = 0; i < arrayNameUsers.length; i++) {
        containerUser[i].addEventListener('click', function() {
            let size = Object.keys(objectMessages).length;
            colorG.style.backgroundColor = `#ffffff`;
            colorA.style.backgroundColor = `#ffffff`;
            colorP.style.backgroundColor = `#ffffff`;
            colorNR.style.backgroundColor = `#ffffff`;
            chatBox.innerHTML = "";

            for (let key in objectMessages) {
                cont++;
                for (let index = 0; index < objectMessages[key].length; index++) {
                    let container = containerUser[i];
                    let userId = container.getAttribute(`data-socketid`);
                    tempId = userId;
                    getTempId(tempId);
                    if (key == userId) {
                        if (objectMessages[key][index].name == "LaRefa") {
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
                                         <strong> ${JSON.stringify(objectMessages[key][index].message)}</strong>
                                         </p>
                                         <p class="time">
                                         ${JSON.stringify(objectMessages[key][index].time)}<br>
                                         </p>
                                     </div>
                                     `;
                            chatBox.scrollTop = chatBox.scrollHeight;
                            if (cont == size) {
                                getIdUser(userId);
                            }
                        } else {

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
                                         <strong> ${JSON.stringify(objectMessages[key][index].message)}</strong>
                                         </p>
                                         <p class="time">
                                         ${JSON.stringify(objectMessages[key][index].time)}<br>
                                         </p>
                                     </div>
                                     `;
                            chatBox.scrollTop = chatBox.scrollHeight;
                            if (cont == size) {
                                getIdUser(userId);
                            }
                        }

                        getIdUser(userId);


                    }
                }
            }

        });

    }
}

function renderStatus(objectStatus, socketId) {
    containerUser = document.querySelectorAll(".container-user");
    if (Object.keys(objectStatus).length != 0) {
        for (let i = 0; i < arrayNameUsers.length; i++) {
            colorG.style.backgroundColor = `#ffffff`;
            colorA.style.backgroundColor = `#ffffff`;
            colorP.style.backgroundColor = `#ffffff`;
            colorNR.style.backgroundColor = `#ffffff`;

            let container = containerUser[i];

            let userId = container.getAttribute(`data-socketid`);

            for (let key in objectStatus) {
                if (key == socketId) {

                    switch (objectStatus[key]) {
                        case 1:
                            colorG.style.backgroundColor = `#08d934`;
                            break;
                        case 2:
                            colorG.style.backgroundColor = `#08d934`;
                            colorA.style.backgroundColor = `#08c0d9`;
                            break;
                        case 3:
                            colorG.style.backgroundColor = `#08d934`;
                            colorA.style.backgroundColor = `#08c0d9`;
                            colorP.style.backgroundColor = `#7622ef`;
                            break;
                        case 4:
                            colorG.style.backgroundColor = `#08d934`;
                            colorA.style.backgroundColor = `#08c0d9`;
                            colorP.style.backgroundColor = `#7622ef`;
                            colorNR.style.backgroundColor = `#f61305`;
                            break;
                        default:
                            colorG.style.backgroundColor = `#08d934`;
                            colorA.style.backgroundColor = `#08c0d9`;
                            colorP.style.backgroundColor = `#7622ef`;
                            colorNR.style.backgroundColor = `#f61305`;
                            break;
                    }

                }
            }

        }
    }
}

function rederRemoveUserContainer(idRemoveUser) {
    let subContainerChat = document.getElementById("sub-container-chats"),
        conversationName = document.getElementById('conversation-name'),
        liContainer = subContainerChat.getElementsByTagName('li'),
        containerUser = document.querySelectorAll(".container-user");

    for (let i = 0; i < arrayNameUsers.length; i++) {
        let container = liContainer[i];
        for (let j = 0; j < arrayNameUsers.length; j++) {
            let userId = containerUser[i].getAttribute(`data-socketid`);

            if (userId == idRemoveUser) {
                colorG.style.backgroundColor = `#ffffff`;
                colorA.style.backgroundColor = `#ffffff`;
                colorP.style.backgroundColor = `#ffffff`;
                colorNR.style.backgroundColor = `#ffffff`;
                chatBox.innerHTML = "";
                conversationName.innerHTML = "LaRefa";
                subContainerChat.removeChild(container)
                arrayNameUsers.splice(i, 1);
                cont--;
                break;
            }
        }

    }
}

function renderStatusOnclickInUserName(idStatusUserName) {
    switch (idStatusUserName) {
        case 1:
            colorG.style.backgroundColor = `#08d934`;
            break;
        case 2:
            colorG.style.backgroundColor = `#08d934`;
            colorA.style.backgroundColor = `#08c0d9`;
            break;
        case 3:
            colorG.style.backgroundColor = `#08d934`;
            colorA.style.backgroundColor = `#08c0d9`;
            colorP.style.backgroundColor = `#7622ef`;
            break;
        case 4:
            colorG.style.backgroundColor = `#08d934`;
            colorA.style.backgroundColor = `#08c0d9`;
            colorP.style.backgroundColor = `#7622ef`;
            colorNR.style.backgroundColor = `#f61305`;
            break;
        default:
            colorG.style.backgroundColor = `#08d934`;
            colorA.style.backgroundColor = `#08c0d9`;
            colorP.style.backgroundColor = `#7622ef`;
            colorNR.style.backgroundColor = `#f61305`;
            break;
    }
}