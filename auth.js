import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
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
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const result = document.getElementById("regResult");

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    result.textContent = "ลงทะเบียนสำเร็จ! ยินดีต้อนรับ " + userCredential.user.email;
    result.style.color = "green";
  } catch (error) {
    result.textContent = "เกิดข้อผิดพลาด: " + error.message;
    result.style.color = "red";
  }
});

// 🔐 เข้าสู่ระบบ
document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const result = document.getElementById("loginResult");

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    result.textContent = "เข้าสู่ระบบสำเร็จ! ยินดีต้อนรับกลับ " + userCredential.user.email;
    result.style.color = "green";
  } catch (error) {
    result.textContent = "เข้าสู่ระบบไม่สำเร็จ: " + error.message;
    result.style.color = "red";
  }
});
