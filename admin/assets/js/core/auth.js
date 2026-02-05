import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBKByzJePrIg-EHOQWIfVLfKpWPghlMySU",
    authDomain: "hypro-cabs-c2dbd.firebaseapp.com",
    projectId: "hypro-cabs-c2dbd",
    storageBucket: "hypro-cabs-c2dbd.firebasestorage.app",
    messagingSenderId: "387501375200",
    appId: "1:387501375200:web:7799a06db3cb6982f69a85"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- SECURITY CHECK (ഗാർഡ്) ---
onAuthStateChanged(auth, (user) => {
    const path = window.location.pathname;

    if (user) {
        // User ലോഗിൻ ചെയ്തിട്ടുണ്ട്
        console.log("Admin Logged In");
        if (path.includes("login.html")) {
            window.location.replace("/admin/index.html");
        }
    } else {
        // User ലോഗിൻ ചെയ്തിട്ടില്ല
        if (path.includes("/admin/") && !path.includes("login.html")) {
            // പേജ് കാണിക്കാതെ മറച്ചുവെക്കുക
            document.body.style.display = 'none';
            // ലോഗിൻ പേജിലേക്ക് വിടുക
            window.location.replace("/admin/login.html");
        }
    }
});

// --- LOGIN FUNCTION ---
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const btn = document.getElementById('loginBtn');
        const err = document.getElementById('error-msg');

        btn.innerText = "Checking...";
        
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                window.location.href = "/admin/index.html";
            })
            .catch((error) => {
                btn.innerText = "Login";
                err.style.display = "block";
                err.innerText = "Email or Password Wrong!";
            });
    });
}

// --- LOGOUT FUNCTION ---
window.logoutAdmin = () => {
    if(confirm("Logout?")) {
        signOut(auth).then(() => window.location.href = "/admin/login.html");
    }
};
