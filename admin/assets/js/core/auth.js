import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// താങ്കളുടെ Firebase Config
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

// --- സുരക്ഷാ പരിശോധന (SECURITY CHECK) ---
onAuthStateChanged(auth, (user) => {
    const currentPath = window.location.pathname;

    if (user) {
        // 1. User ലോഗിൻ ചെയ്തിട്ടുണ്ട് (ID കാർഡ് ഉണ്ട്)
        console.log("Admin Active:", user.email);

        // ലോഗിൻ ചെയ്തയാൾ പിന്നെയും ലോഗിൻ പേജിൽ നിൽക്കണ്ട, ഡാഷ്ബോർഡിലേക്ക് വിടുക
        if (currentPath.includes("login.html")) {
            window.location.replace("/admin/index.html");
        }
    } else {
        // 2. User ലോഗിൻ ചെയ്തിട്ടില്ല (ID കാർഡ് ഇല്ല)
        console.log("No Access!");

        // അയാൾ നിൽക്കുന്നത് അഡ്മിൻ ഫോൾഡറിലാണെങ്കിൽ, ഉടനെ പുറത്താക്കി ലോഗിൻ പേജിലേക്ക് വിടുക
        // (എന്നാൽ അയാൾ ഇപ്പോൾ നിൽക്കുന്നത് ലോഗിൻ പേജിൽ തന്നെയാണെങ്കിൽ പുറത്താക്കരുത്)
        if (currentPath.includes("/admin/") && !currentPath.includes("login.html")) {
            // അഡ്മിൻ പേജുകൾ ലോഡ് ആകുന്നതിന് മുമ്പ് തടയുക
            document.body.style.display = "none"; 
            window.location.replace("/admin/login.html");
        }
    }
});

// --- ലോഗിൻ ചെയ്യാനുള്ള ഫംഗ്‌ഷൻ ---
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorMsg = document.getElementById('error-msg');
        const btn = document.getElementById('loginBtn');

        btn.innerText = "Checking...";
        
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                window.location.href = "/admin/index.html";
            })
            .catch((error) => {
                btn.innerText = "Login";
                errorMsg.style.display = "block";
                errorMsg.innerText = "Password or Email Wrong!";
            });
    });
}

// --- ലോഗൗട്ട് (Logout) ---
window.logoutAdmin = () => {
    if(confirm("Logout ചെയ്യണോ?")) {
        signOut(auth).then(() => {
            window.location.href = "/admin/login.html";
        });
    }
};
