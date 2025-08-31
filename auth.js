import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged }
    from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// 🔧 ตั้งค่า Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA4OrZERUoxWPiShCEWVvz1MK9cYGO3_K8",
    authDomain: "new-record-3ccd6.firebaseapp.com",
    projectId: "new-record-3ccd6",
    storageBucket: "new-record-3ccd6.appspot.com",
    messagingSenderId: "1065863160189",
    appId: "1:1065863160189:web:25313e55b0733f5e126c14",
    measurementId: "G-JW6N2HYR58"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ ลงทะเบียนผู้ใช้งานใหม่
document.getElementById("registerBtn").addEventListener("click", async () => {
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value.trim();
    const result = document.getElementById("regResult");

    // ตรวจสอบความถูกต้องเบื้องต้น
    if (!email || !password) {
        result.textContent = "กรุณากรอกอีเมลและรหัสผ่าน";
        result.style.color = "red";
        return;
    }
    if (password.length < 6) {
        result.textContent = "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร";
        result.style.color = "red";
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        // ไม่ต้องแสดงผลสำเร็จที่นี่ เพราะ onAuthStateChanged จะจัดการเอง
    } catch (error) {
        result.textContent = `❌ ลงทะเบียนไม่สำเร็จ: ${error.message}`;
        result.style.color = "red";
    }
});

// 🔐 เข้าสู่ระบบ
document.getElementById("loginBtn").addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const result = document.getElementById("loginResult");

    // ตรวจสอบความถูกต้องเบื้องต้น
    if (!email || !password) {
        result.textContent = "กรุณากรอกอีเมลและรหัสผ่าน";
        result.style.color = "red";
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, password);
        // ไม่ต้องแสดงผลสำเร็จที่นี่ เพราะ onAuthStateChanged จะจัดการเอง
    } catch (error) {
        result.textContent = `❌ เข้าสู่ระบบไม่สำเร็จ: ${error.message}`;
        result.style.color = "red";
    }
});

// 🚪 ออกจากระบบ
document.getElementById("logoutBtn").addEventListener("click", async () => {
    await signOut(auth);
});

// 🔄 ตรวจสอบสถานะผู้ใช้
onAuthStateChanged(auth, (user) => {
    const loginSection = document.getElementById("loginSection");
    const registerSection = document.getElementById("registerSection");
    const downloadSection = document.getElementById("downloadSection");

    if (user) {
        // ผู้ใช้ล็อกอินแล้ว
        loginSection.style.display = "none";
        registerSection.style.display = "none";
        downloadSection.style.display = "block";
    } else {
        // ผู้ใช้ยังไม่ได้ล็อกอิน
        loginSection.style.display = "block";
        registerSection.style.display = "block";
        downloadSection.style.display = "none";
    }
});
