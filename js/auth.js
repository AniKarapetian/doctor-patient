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


// Function to sign in
function signIn() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        localStorage.setItem('user', JSON.stringify(user));
        window.location.replace('/');
         
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
      });
}

// Function to sign up
function signUp() {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const name = document.getElementById('signup-name').value;
  const lastname = document.getElementById('signup-lastname').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          localStorage.setItem('user', JSON.stringify(user));

         user.updateProfile({
           displayName: `${name} ${lastname}`
          });

          window.location.replace('/');
      
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
      });
}

// Function to sign out
function signOut() {
  firebase.auth().signOut().then(() => {
      // Sign-out successful.
      localStorage.setItem('user', null);
  }).catch((error) => {
      // An error happened.
      console.error(error);
  });
}

// Firebase Auth State Change Listener
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
      // User is signed in
    //   document.getElementById('user-email').textContent = user.email;
    //   document.getElementById('login-form').style.display = 'none';
    //   document.getElementById('user-info').style.display = 'block';
  } else {
      // User is signed out
    //   document.getElementById('login-form').style.display = 'block';
    //   document.getElementById('user-info').style.display = 'none';
  }
});
