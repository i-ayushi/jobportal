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
let JOBS = [];


// Function to retrieve and display job listings
const loadJobs = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "jobs"));
        JOBS = [];
        querySnapshot.forEach((doc) => {
            const job = doc.data();
            JOBS.push(job);
        });
        fillJobs(JOBS);

    } catch (error) {
        console.error("Error fetching job posts: ", error);
    }

    let searchContainer = document.querySelector('.search-container');

    console.log(searchContainer);

    let searchButton = searchContainer.querySelector('button');
    searchButton.addEventListener('click', searchFilterForJob);
};

function searchFilterForJob(){
    // .search-container's first and 2nd input fields
    let searchContainer = document.querySelector('.search-container');
    let searchInput2 = searchContainer.querySelectorAll('input')[0].value;
    let searchInput1 = searchContainer.querySelectorAll('input')[1].value;
    console.log(searchInput1, searchInput2);

    let filteredJobs = JOBS.filter(job => {
        return job.title.toLowerCase().includes(searchInput2?.toLowerCase()) && job?.location?.toLowerCase().includes(searchInput1?.toLowerCase());
    });
    fillJobs(filteredJobs);
}
function fillJobs(JOBS){
    let jobListingsContainer = document.getElementById('jobtype1');
    jobListingsContainer.innerHTML = '';
    JOBS.forEach(job => {
        jobListingsContainer.innerHTML+=`
        
        <div class="type1">
        <div class="box">Full Time</div>

        <i class="fa-solid fa-heart"  id="heart"></i>
        <div class="img">
            <div class="image"></div>
            <a href="#" >${job.title}</a>
        <p>${job.location}</p>    
        </div>
     <button class="apply"><a href="jobapplication.html" style=" text-decoration:none">APPLY NOW</a></button>
    </div>
        `
    });
}

// Call the function to load jobs when the page loads
window.onload = loadJobs;

