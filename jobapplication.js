import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";

// Firebase configuration
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
const db = getFirestore(app);
const storage = getStorage(app);

document.getElementById('jobApplicationForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const resume = document.getElementById('resume').files[0];

    if (!resume) {
        alert("Please upload a resume.");
        return;
    }

    try {
        // Show message indicating that the submission is in progress
        alert("Submitting your application... Please wait.");

        // Upload resume to Firebase Storage
        const storageRef = ref(storage, `resumes/${resume.name}`);
        const snapshot = await uploadBytes(storageRef, resume);

        // Get the resume's download URL
        const downloadURL = await getDownloadURL(snapshot.ref);

        // Store application data in Firestore
        await addDoc(collection(db, 'applications'), {
            name: name,
            email: email,
            phone: phone,
            resumeURL: downloadURL,
            timestamp: new Date() // or use Firestore's serverTimestamp()
        });

        // Show success message
        alert('Application submitted successfully! Redirecting to home page...');
        
        // Redirect to the home page after a short delay (optional)
        setTimeout(() => {
            window.location.href = 'mainhome.html';
        }, 1500);  // 1.5 seconds delay for user feedback
    } catch (error) {
        console.error('Error occurred during submission:', error);
        alert('Failed to submit application. Please try again.');
    }
});