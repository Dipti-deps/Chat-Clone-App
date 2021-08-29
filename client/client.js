const socket = io('http://localhost:8000');

// Get DOM Element in respective Js variable
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

// message tone on receiving messages
var audio = new Audio('tone.mp3');

// Function which will append event event to container 
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message'); 
    messageElement.classList.add(position); 
    messageContainer.append(messageElement);    
    if(position =='left'){
        audio.play();    }
        
}


// Ask new user for their name and let the server know
const username = prompt("Enter your username to join")
socket.emit('new-user-joined', username);

// if a new user join ,receive their name from server
socket.on('user-joined', username =>{
    append(`${username} joined the chat`, 'right');
});

// If server sends a message, receive it 
socket.on('recieve', data=>{
    append(`${data.username}: ${data.message}`, 'left');
    });

    // If user leaves the chat, append the info to container 
    socket.on('left', username =>{
        append(`${username}: left the chat`, 'right');
    });

// If form gets submitted, send server the message 
    form.addEventListener('submit', (e)=> {
        e.preventDefault();
        const message = messageInput.value;
        append(`You:${message}`, 'right');
        socket.emit('send', message);
        messageInput.value ='';
    });
    

    
    
    
    
    
    
    
    







