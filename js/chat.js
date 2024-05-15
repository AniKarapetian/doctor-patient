// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyAzQcwumtGOw6uit_uTUXvJHNdV8Xd8fnE",
//     authDomain: "simplechat-5efd5.firebaseapp.com",
//     databaseURL: "https://simplechat-5efd5-default-rtdb.firebaseio.com",
//     projectId: "simplechat-5efd5",
//     storageBucket: "simplechat-5efd5.appspot.com",
//     messagingSenderId: "248556814625",
//     appId: "1:248556814625:web:0d08fa03700838a007fe60"
// };

const firebaseConfig = {
    apiKey: "AIzaSyA2WWe5Ec1JUVRDcthhO8lGd8jav_ayX90",
    authDomain: "medical-app-66572.firebaseapp.com",
    projectId: "medical-app-66572",
    storageBucket: "medical-app-66572.appspot.com",
    messagingSenderId: "857440262383",
    appId: "1:857440262383:web:c3112aba2d534d9531e31a",
    measurementId: "G-V80WR8Y7LF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initialize database
const db = firebase.database();

// get user's data
const username = prompt("Գրեք ձեր անունը");

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
    });
}

// display the messages
// reference the collection created earlier
const fetchChat = db.ref("messages02/");

// check for new messages using the onChildAdded event listener
fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${
    username === messages.username ? "sent" : "receive"
    }><span>${messages.username}: </span>${messages.message}</li>`;
    // append the message on the page
    document.getElementById("messages").innerHTML += message;
});
