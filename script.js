// Firebase Configuration
var firebaseConfig = {
    apiKey: "AIzaSyAP_PgBQYUDt4lzAVYZ2Mdnmp87fgFbBvs",
    authDomain: "flaromart.firebaseapp.com",
    databaseURL: "https://flaromart-default-rtdb.firebaseio.com",
    projectId: "flaromart",
    storageBucket: "flaromart.appspot.com",
    messagingSenderId: "124085810939",
    appId: "1:124085810939:web:da089fda0d9a4a8c27e25e",
    measurementId: "G-4MFVHLBYFS"
};
firebase.initializeApp(firebaseConfig);

// Sample login data
const users = {
    "AbuzarTheMaster": "Abuzar1335",
    "SalmanTheKing": "Salman17598",
    "SrizonTheLegend": "Srizon526"
};

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (users[username] === password) {
        window.location.href = 'main.html';
    } else {
        alert("ইউজারনেম অথবা পাসওয়ার্ড ভুল হয়েছে।");
    }
}

function loadOptions() {
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = ''; // Clear existing options

    firebase.database().ref('options').once('value', function(snapshot) {
        let optionCount = 0;
        snapshot.forEach(function(childSnapshot) {
            const option = childSnapshot.val().name;
            const optionBtn = document.createElement("button");
            optionBtn.className = "option-btn";
            optionBtn.textContent = option;
            optionBtn.onclick = function() {
                selectOption(this);
            };
            optionsDiv.appendChild(optionBtn);
            optionCount++;
        });

        if (optionCount === 0) {
            const noOptionsMsg = document.createElement("p");
            noOptionsMsg.textContent = "কোনো অপশন পাওয়া যায়নি।";
            optionsDiv.appendChild(noOptionsMsg);
        }
    });
}

function selectOption(button) {
    button.classList.toggle("selected");

    const selectedOptions = document.querySelectorAll(".selected");
    document.getElementById("check-luck").disabled = selectedOptions.length !== 3;
}

function checkLuck() {
    const selectedOptions = document.querySelectorAll(".selected");
    const selectedNumbers = [];

    selectedOptions.forEach(option => {
        selectedNumbers.push(option.textContent);
    });

    // Save selected numbers to Firebase
    firebase.database().ref('lottery').push({
        selected: selectedNumbers.join(", ")
    });

    localStorage.setItem('selectedNumbers', selectedNumbers.join(", "));
    window.location.href = 'result.html';
}

function displayResult() {
    const resultText = document.getElementById("result-text");
    const selectedNumbers = localStorage.getItem('selectedNumbers');

    if (selectedNumbers) {
        resultText.textContent = "আপনি নির্বাচন করেছেন: " + selectedNumbers;
    } else {
        resultText.textContent = "কোনো ফলাফল পাওয়া যায়নি।";
    }
}

function goBack() {
    window.location.href = 'main.html';
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.endsWith('main.html')) {
        loadOptions();
    } else if (window.location.pathname.endsWith('result.html')) {
        displayResult();
    }
});
