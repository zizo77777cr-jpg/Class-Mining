const ADMIN_USER = {
    username: "Z_Class",
    password: "Zhz242002Zhz",
    isAdmin: true
};

function getUsers() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (!users.find(u => u.username === ADMIN_USER.username)) users.push(ADMIN_USER);
    return users;
}
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}
function getUser(username) {
    return getUsers().find(u => u.username === username);
}
function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
}
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// تسجيل الدخول
if (window.location.pathname.endsWith('login.html')) {
    document.getElementById('login-form').onsubmit = function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const user = getUser(username);
        if (user && user.password === password) {
            setCurrentUser(user);
            window.location.href = 'dashboard.html';
        } else {
            alert('اسم المستخدم أو كلمة المرور خاطئة!');
        }
    };
    document.getElementById('register-form').onsubmit = function(e) {
        e.preventDefault();
        const username = document.getElementById('new-username').value.trim();
        const password = document.getElementById('new-password').value;
        if (!username || !password) {
            alert('يرجى إدخال جميع البيانات');
            return;
        }
        if (getUser(username)) {
            alert('اسم المستخدم موجود بالفعل');
            return;
        }
        const users = getUsers();
        users.push({ username, password, isAdmin: false });
        saveUsers(users);
        alert('تم التسجيل بنجاح! يمكنك تسجيل الدخول الآن.');
    };
}
