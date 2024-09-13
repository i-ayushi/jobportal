// Import the Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

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

// Function to retrieve and display job listings
const loadJobs = async () => {
    const jobListingsContainer = document.getElementById('job-listings');

    try {
        const querySnapshot = await getDocs(collection(db, "jobs"));
        querySnapshot.forEach((doc) => {
            const job = doc.data();

            // Create job card
            const jobCard = document.createElement('div');
            jobCard.classList.add('job-card');

            // Job Title
            const jobTitle = document.createElement('h2');
            jobTitle.textContent = job.title;

            // Job Description
            const jobDescription = document.createElement('p');
            jobDescription.textContent = job.description;

            // Job Requirements
            const jobRequirements = document.createElement('p');
            jobRequirements.classList.add('job-info');
            jobRequirements.textContent = `Requirements: ${job.requirements}`;

            // Job Location
            const jobLocation = document.createElement('p');
            jobLocation.classList.add('job-info');
            jobLocation.textContent = `Location: ${job.location}`;

            // Job Salary
            const jobSalary = document.createElement('p');
            jobSalary.classList.add('job-salary');
            jobSalary.textContent = `Salary: ${job.salary}`;

            const applyButton = document.createElement('button');
            applyButton.textContent = 'Apply';
            applyButton.classList.add('apply-btn');
            applyButton.addEventListener('click', () => {
                // applyForJob(job);
                window.location.href = 'jobapplication.html';

            });
            // Append elements to job card
            jobCard.appendChild(jobTitle);
            jobCard.appendChild(jobDescription);
            jobCard.appendChild(jobRequirements);
            jobCard.appendChild(jobLocation);
            jobCard.appendChild(jobSalary);
            jobCard.appendChild(applyButton);

            // Append job card to the container
            jobListingsContainer.appendChild(jobCard);
        });

    } catch (error) {
        console.error("Error fetching job posts: ", error);
    }
};

// Call the function to load jobs when the page loads
window.onload = loadJobs;
