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
                window.location.href='mainhome.html';
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
            window.location.href='profile.html';
        }else{
            window.location.href='profile.html';
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

 document.getElementById("submitJobSeekerSignUp").addEventListener("click", async (e) => {
    e.preventDefault();
    
    const email = document.getElementById("jsEmail").value;
    const password = document.getElementById("jsPassword").value;
    const fName = document.getElementById("jsFName").value;
    const lName = document.getElementById("jsLName").value;
    const profilePicture = document.getElementById("jsProfilePicture").files[0];

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Upload profile picture to Firebase Storage
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(storageRef, profilePicture);
        const profilePicURL = await getDownloadURL(storageRef);

        // Save user data along with the profile picture URL to Firestore
        await setDoc(doc(db, "users", user.uid), {
            firstName: fName,
            lastName: lName,
            email: email,
            role: "jobSeeker",
            profileImage: profilePicURL
        });

        console.log("User registered and profile image saved!");
        window.location.href = "profile-show.html"; // Redirect after registration
    } catch (error) {
        console.error("Error registering user:", error);
    }
});
