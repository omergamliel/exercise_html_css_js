// מערך של משתמשים
const users = [
    { username: 'omer', email: 'omer@gmail.com', password: '1234' },
    { username: 'eyal', email: 'eyal@yvc.co.il', password: '5678' },
    { username: 'segev', email: 'segev@gett.com', password: 'blabla' }
];

// פונקציה שבודקת האם המשתמש קיים במערך
const isUserValid = (email, password) => {
    return users.some(user => user.email === email && user.password === password);
}

// פונקציה שמחזירה את שם המשתמש לפי כתובת המייל
const getUsernameByEmail = (email) => {
    const user = users.find(user => user.email === email);
    return user ? user.username : null;
}

// פונקציה שמטפלת בהתחברות
const handle_login = (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (isUserValid(email, password)) {
        const username = getUsernameByEmail(email);
        localStorage.setItem('currentUser', username);
        alert("התחברת בהצלחה!");
        window.location.href = "home.html";
    } else {
        alert("ההתחברות נכשלה!");
    }
}

// פונקציה ששולחת את שם המשתמש לאחר ההתחברות
// ההתחברות לפי המייל כך שמאתרת את שם המשתמש המשויך לכתובת מייל
document.addEventListener('DOMContentLoaded', function() {
    let username = localStorage.getItem('currentUser');
    if (!username) {
        username = 'עומר גמליאל'; // הגדרת ברירת מחדל למקרה שהמשתנה username ריק
    }
    document.getElementById('username_placeholder').innerText = username;
});

// פונקציה שמטפלת בהרשמה
const handle_register = (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!validateEmail(email)) {
        alert('כתובת מייל לא חוקית');
        return;
    }

    if (password !== confirmPassword) {
        alert('הסיסמא ואימות הסיסמא אינם תואמים');
        return;
    }

    users.push({ username, email, password });
    alert('ההרשמה הושלמה בהצלחה');
    registrationForm.reset();
    window.location.href = 'index.html';
}

// פונקציה לבדיקת תקינות כתובת המייל
function validateEmail(email) {
    const email_formats = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email_formats.test(email);
}