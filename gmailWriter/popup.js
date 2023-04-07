const chatLog = document.querySelector('.chat-log');
const message = document.querySelector('.message-input');
const form = document.querySelector('form');

form.addEventListener('submit',(e) => {
    e.preventDefault();
    chatLog.innerHTML = "";

    let messageText = message.value;
    if(messageText === '') return;
    messageText = `Write an email ${messageText}`
    message.value = '';

    const messsageElement = document.createElement('div');
    messsageElement.innerHTML = `<div class = "message message--sent">${messageText}</div>`;

    chatLog.appendChild(messsageElement);
    chatLog.scrollTop = chatLog.scrollHeight;

    fetch('http://localhost:3000',{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            message:messageText
        })
    })
    .then(res => res.json())
    .then(data => {
        const messsageElement = document.createElement('div');
        console.log(data.completion.content); 
        messsageElement.innerHTML = `<p class = "message message-response">${data.completion.content}</p>`;
    
        chatLog.appendChild(messsageElement);
        chatLog.scrollTop = chatLog.scrollHeight;
    })
})