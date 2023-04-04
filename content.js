window.addEventListener('load', function () {
	console.log("gmail-script.js ... Loaded Successfully"); 
    setIcon();
})

function setIcon(){
    const newMessages = document.querySelectorAll(".AD");
    if(newMessages.length == 0) return;

    for(const newMessage of newMessages){
        createBox(newMessage);
    }
}


function createBox(newMessage){
    const e1 =  document.createElement('div');
    e1.classList.add('ChatGPT-icon');
    
    async function setImage(){
        await e1.insertAdjacentHTML('afterbegin',`
        <img src = "images/icon.svg" style = "width:16px height:16px"/>`);
    };
    setImage();

    const e2 = document.createElement('div');
    e2.setAttribute("style","position:absolute;z-index:999;");
    const e3 = document.createElement('div');
    e3.setAttribute("style","display:flex;column-gap:4px;");
    e2.appendChild(e3);
    e3.appendChild(e1);

    setIconPosition(e2,newMessage);
}

//绝对定位，在特定位置创建一个图标（不得以而为之）
function setIconPosition(iconBox,newMessage){
    const subject_input = newMessage.querySelector(".aoD.az6");
    const {right,bottom} = subject_input.getBoundingClientRect();
    iconBox.style.right = `${right}px`;
    iconBox.style.bottom = `${window.innerHeight - bottom - 20}px`
    document.body.appendChild(iconBox);
}



