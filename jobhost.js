// Import the Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

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

// Post Job Form Submission
document.getElementById('job-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form values
    const jobTitle = document.getElementById('jobTitle').value;
    const jobDescription = document.getElementById('jobDescription').value;
    const jobRequirements = document.getElementById('jobRequirements').value;
    const jobLocation = document.getElementById('jobLocation').value;
    const jobSalary = document.getElementById('jobSalary').value;

    try {
        // Add a new job post to Firestore
        const docRef = await addDoc(collection(db, 'jobs'), {
            title: jobTitle,
            description: jobDescription,
            requirements: jobRequirements,
            location: jobLocation,
            salary: jobSalary,
            timestamp: new Date()
        });

        console.log("Document written with ID: ", docRef.id);

        // Show success message
        document.getElementById('successMessage').style.display = 'block';

        // Clear the form
        document.getElementById('job-form').reset();
        setTimeout(() => {
            window.location.href = 'mainhome.html';
        }, 2000);

    }
  
    catch (error) {
        console.error("Error adding document: ", error);
    }
});
