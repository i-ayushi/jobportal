 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
 import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
 import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"
 
 const firebaseConfig = {
    apiKey: "AIzaSyAS3xB8yi5Yc8R9jBI3_txpqQiNe3kzsdY",
    authDomain: "login-form-e4c1d.firebaseapp.com",
    projectId: "login-form-e4c1d",
    storageBucket: "login-form-e4c1d.appspot.com",
    messagingSenderId: "4685451629",
    appId: "1:4685451629:web:17d844b47ea93e08580a64"
  };
 

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
 }
 const signUp=document.getElementById('submitJobSeekerSignUp');
 signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('jsEmail').value;
    const password=document.getElementById('jsPassword').value;
    const firstName=document.getElementById('jsFName').value;
    const lastName=document.getElementById('jsLName').value;
    const role= document.getElementById('jsRole').value == "false"? false:true;
     // Radio button for role

    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            email: email,
            firstName: firstName,
            lastName:lastName,
            role: role 
        };
        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            if(role){
                window.location.href='jobhost.html';
            }
            else{
                window.location.href='homepage.html';
            }
        })
        .catch((error)=>{
            console.error("error writing document", error);

        });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Address Already Exists !!!', 'signUpMessage');
        }
        else{
            showMessage('unable to create User', 'signUpMessage');
        }
    })
 });

 const signIn=document.getElementById('submitJobSeekerSignIn');
 signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('jsSignInEmail').value;
    const password=document.getElementById('jsSignInPassword').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth, email,password)
    .then((userCredential)=>{
        showMessage('login is successful', 'signInMessage');
        const user=userCredential.user;
        const isEmployer = document.getElementById('jsRole').value=="false"?false:true;
        localStorage.setItem('loggedInUserId', user.uid);
        localStorage.setItem('isEmployer', isEmployer);
        if (isEmployer){
            window.location.href='jobhost.html';
        }else{
            window.location.href='homepage.html';
        }
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            showMessage('Incorrect Email or Password', 'signInMessage');
        }
        else{
            showMessage('Account does not Exist', 'signInMessage');
        }
    })
 })


//  Now that we have the authentication code, we can add the code to the mainhome.js file to restrict access to the jobhost.html page.

auth.onAuthStateChanged((user) => {
    if (user) {
        const userId = user.uid;
        const docRef = doc(db, "users", userId);
        getDoc(docRef)
            .then((doc) => {
                if (doc.exists()) {
                    const data = doc.data();
                    if (data.role) {
                        window.location.href = 'jobhost.html';
                    }
                }
            })
            .catch((error) => {
                console.error("Error getting document:", error);
            });
    }
    else {
        window.location.href = 'homepage.html';
    }
})

// Now, when a user tries to access the jobhost.html page, they will be redirected to the homepage.html page if they are not logged in or if they are not an employer. This will help ensure that only authenticated employers can access the jobhost.html page.
// code for jobhost.js

