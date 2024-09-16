const signUpButton=document.getElementById('signUpButton');
const signInButton=document.getElementById('signInButton');
const signInForm=document.getElementById('signIn');
const signUpForm=document.getElementById('signup');

signUpButton.addEventListener('click',function(){
    signInForm.style.display="none";
    signUpForm.style.display="block";
})
signInButton.addEventListener('click', function(){
    signInForm.style.display="block";
    signUpForm.style.display="none";
})
const loadUserData = async (userId) => {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
        const userData = userDoc.data();

        // Set profile picture from Firestore
        const profileImage = userData.profileImage || 'images/default-avatar.png';
        document.getElementById("profile-thumbnail").src = profileImage;
    } else {
        console.log("No such user document!");
    }
};

// On login, load the user profile picture
onAuthStateChanged(auth, (user) => {
    if (user) {
        loadUserData(user.uid);
    } else {
        // If not logged in, redirect to login page
        window.location.href = 'role-in-login.html';
    }
});