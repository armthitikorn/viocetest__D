<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <title>ระบบดาวน์โหลดไฟล์เสียงฝึกอบรม (New)</title>
    <style>
        body { font-family: sans-serif; padding: 2rem; background: #f9f9f9; }
        button { padding: 0.5rem 1rem; font-size: 1rem; margin-top: 0.5rem; }
        input { margin: 0.5rem 0; padding: 0.5rem; width: 100%; max-width: 300px; }
        .section { margin-bottom: 2rem; }
    </style>
</head>
<body>

    <h2>🎧 ระบบดาวน์โหลดไฟล์เสียงฝึกอบรม</h2>

    <div id="registerSection" class="section">
        <h3>ลงทะเบียนผู้ใช้ใหม่</h3>
        <input type="email" id="regEmail" placeholder="อีเมล">
        <input type="password" id="regPassword" placeholder="รหัสผ่าน">
        <button id="registerBtn">ลงทะเบียน</button>
        <p id="regResult"></p>
    </div>

    <div id="authSection" class="section">
        <h3>เข้าสู่ระบบ</h3>
        <input type="email" id="loginEmail" placeholder="อีเมล">
        <input type="password" id="loginPassword" placeholder="รหัสผ่าน">
        <button id="loginBtn">เข้าสู่ระบบ</button>
        <p id="loginResult"></p>
    </div>

    <div id="downloadSection" style="display:none;">
        <p>ยินดีต้อนรับ! คลิกเพื่อดาวน์โหลดไฟล์:</p>
        </div>

    <script type="module">
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
            result.textContent = ""; // เคลียร์ข้อความเก่า

            if (!email || !password) {
                result.textContent = "กรุณากรอกอีเมลและรหัสผ่านให้ครบถ้วน";
                result.style.color = "red";
                return;
            }
            
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
            result.textContent = ""; // เคลียร์ข้อความเก่า

            if (!email || !password) {
                result.textContent = "กรุณากรอกอีเมลและรหัสผ่านให้ครบถ้วน";
                result.style.color = "red";
                return;
            }

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                result.textContent = "เข้าสู่ระบบสำเร็จ! ยินดีต้อนรับกลับ " + userCredential.user.email;
                result.style.color = "green";
            } catch (error) {
                result.textContent = "เข้าสู่ระบบไม่สำเร็จ: " + error.message;
                result.style.color = "red";
            }
        });
    </script>

</body>
</html>

