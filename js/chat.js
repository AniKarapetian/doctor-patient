
const getAuthUser = ()=>{
    const data = localStorage.getItem('user');
    const user = data? JSON.parse(data): null;
    return user;
}


const firebaseConfig = {
     //Your firebase configs here...
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initialize database
const db = firebase.database();

// get user's data

const user = getAuthUser();
let username = ''; 
if (!user){
   username = prompt("Գրեք ձեր մեյլը");
} else {
    username = user.email;
}
const receiver = prompt("Գրեք ստացողի մեյլը");
// submit form
// listen for submit event on the form and call the postChat function
document.getElementById("message-form").addEventListener("submit", sendMessage);

// send message to db
function sendMessage(e) {
    e.preventDefault();

    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;
    if (message){

        // clear the input box
        messageInput.value = "";
        //auto scroll to bottom
        document
        .getElementById("messages")
        .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    
        // create db collection and send in the data
        db.ref("messages02/" + timestamp).set({
        username,
        message,
        receiver,
        });
    }

}

// display the messages
// reference the collection created earlier
const fetchChat = db.ref("messages02/");

// check for new messages using the onChildAdded event listener
fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    if ((messages.username === username && messages.receiver === receiver)
        ||((messages.username === receiver && messages.receiver === username) )) {

        const message = `<li class=${
        username === messages.username ? "sent" : "receive"
        }><span>${messages.username}: </span>${messages.message}</li>`;
        // append the message on the page
        document.getElementById("messages").innerHTML += message;
    }
});
