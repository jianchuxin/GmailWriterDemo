window.addEventListener('load', function () {
    const link = document.createElement('link');
    link.rel  = "stylesheet";
    link.href = chrome.runtime.getURL('content.css');
    document.head.appendChild(link);
	console.log("gmail-script.js ... Loaded Successfully"); 
    run();
}) 


function run(){
    const dw = document.querySelector('.dw');
    if(!dw){
        window.setTimeout(run,500);
        return;
    }
    // console.log(dw);
    const observer = new MutationObserver(handleMutations);
    observer.observe(dw,{
        attributes: true,
        childList: true,
        characterData: true
    });
}


function handleMutations(mutations){
    console.log('observer is running');
    
    let  subject_inputs = document.querySelectorAll(".AD .aoD.az6")//NEW_SUBJECT_INPUT
    if(subject_inputs.length == 0){
        console.log('didnot find any subject_input element');
        return;
        // setTimeout(() => {
        //     subject_inputs = document.querySelectorAll(".AD .aoD.az6")
        // }, 1000);
        // if(subject_inputs.length == 0){
        //     console.log('didnot find any subject_input element');
        //     return;
        // }
    }

    const subject_input = subject_inputs[subject_inputs.length - 1];
    console.log('find the subject_input');
    // console.log(subject_input);
    createBox(subject_input);
}

function createBox(subject_input){
    const iconBox =  document.createElement('div');
    iconBox.classList.add('ChatGPT-icon');
    const img = document.createElement('img');
    img.src = chrome.runtime.getURL('images/icon-16.png');
    iconBox.appendChild(img);
    // console.log(iconBox);

    const first = document.createElement('div');
    first.classList.add('ChatGPT-Gmail-Writer')

    const second = document.createElement('div');
    second.classList.add('chatGPT-Gmail-writer-flex');
    first.appendChild(second);
    second.appendChild(iconBox);
    setIconPosition(first,subject_input);
    // console.log(first);

    setIconClick(iconBox);
}

//绝对定位，在特定位置创建一个图标（不得以而为之）
function setIconPosition(iconBox,subject_input){
    subject_input.insertAdjacentElement('afterend',iconBox);
    // const {right,bottom} = subject_input.getBoundingClientRect();
    // console.log(right,bottom);
    // iconBox.style.right = `${window.innerWidth - right}px`;
    // iconBox.style.bottom = `${window.innerHeight - bottom - 20}px`
}

function setIconClick(iconBox){
    iconBox.onclick = () =>{
        // const second = document.querySelector('.chatGPT-Gmail-writer-flex');
        const widget = document.querySelector('.ChatGPT-Gmail-Writer-Widget');
        // console.log(widget);
        if(widget!=null){
            widget.remove();
            return;
        }

        const widgetBox = document.createElement('div');
        widgetBox.classList.add('ChatGPT-Gmail-Writer-Widget');
        widgetBox.innerHTML = '<span>Write an email</span>'

        const textarea = document.createElement('div');
        textarea.classList.add('ChatGPT-Gmail-Writer-textarea');
        textarea.setAttribute("contenteditable",true);
        textarea.setAttribute("placeholder","to my boss about a leave");
        
        widgetBox.appendChild(textarea);

        const button = document.createElement('button');
        button.setAttribute("type","button");
        button.classList.add('ChatGPT-Gmail-Writer-btn');
        button.innerText = 'Create';
        widgetBox.appendChild(button);

        iconBox.insertAdjacentElement('beforebegin',widgetBox);
        setButtonClick(button);
    }
}

function setButtonClick(button){
    button.onclick = () => {
        const textarea = document.querySelector('.ChatGPT-Gmail-Writer-textarea');
        let messageText = textarea.innerText;
        if(messageText === '') return;

        messageText = 'write an email ' + messageText;
        console.log(`the question is:${messageText}`);
        textarea.innerText = '';

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
            const answerarea = document.querySelector('.Am.Al.editable');
            answerarea.innerText = data.completion.content;
            console.log(answerarea.innerText);
        })
    }
}





