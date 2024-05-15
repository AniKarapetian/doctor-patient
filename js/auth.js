// Function to sign in
function signIn() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
console.log(email,password);
  firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          document.getElementById('user-email').textContent = user.email;
          document.getElementById('login-form').style.display = 'none';
          document.getElementById('user-info').style.display = 'block';
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
      });
}

// Function to sign up
function signUp() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          document.getElementById('user-email').textContent = user.email;
          document.getElementById('login-form').style.display = 'none';
          document.getElementById('user-info').style.display = 'block';
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
      document.getElementById('login-form').style.display = 'block';
      document.getElementById('user-info').style.display = 'none';
  }).catch((error) => {
      // An error happened.
      console.error(error);
  });
}

// Firebase Auth State Change Listener
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
      // User is signed in
      document.getElementById('user-email').textContent = user.email;
      document.getElementById('login-form').style.display = 'none';
      document.getElementById('user-info').style.display = 'block';
  } else {
      // User is signed out
      document.getElementById('login-form').style.display = 'block';
      document.getElementById('user-info').style.display = 'none';
  }
});
