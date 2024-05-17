const firebaseConfig = {
   //Your firebase configs here...
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const alertMessage =  document.getElementById('alert-msg');
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
        alertMessage && (alertMessage.innerText = 'wait...');
          // Signed up
          const user = userCredential.user;

          user.sendEmailVerification().then(function() {
            alertMessage && (alertMessage.innerText = 'Verification email sent! Check your email!');
            setTimeout(()=>{
              alertMessage && (alertMessage.innerText = '');
            }, 3000);
          }).catch(function(error) {
            alertMessage && (alertMessage.innerText = error.message);
          });
          
          user.updateProfile({
            displayName: `${name} ${lastname}`
          });
          localStorage.setItem('user', JSON.stringify(user));
    
      })
      .catch((error) => {
          alert(error.code, ':', error.message);
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
 
  if (user && user.emailVerified) {
    alertMessage && (alertMessage.innerHTML = '<a href="index.html" class="nav-item nav-link active" style="color: rgb(198, 23, 23);">Գլխավոր</a>');
 
  } else {
      // User is signed out
    //   document.getElementById('login-form').style.display = 'block';
    //   document.getElementById('user-info').style.display = 'none';
  }
});
