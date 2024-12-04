document.getElementById('showSignInBtn').addEventListener('click', function () {
    toggleForms('signin');
});

document.getElementById('showRegisterBtn').addEventListener('click', function () {
    toggleForms('register');
});

document.getElementById('registrationForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value.trim().toLowerCase();
    const lastName = document.getElementById('lastName').value.trim().toLowerCase();;
    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim().toLowerCase();;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
        alert('Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    const payload = {
        firstName,
        lastName,
        email,
        username,
        password,
    };

    try {
        const response = await fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (result.token) {
            localStorage.setItem('authToken', result.token);
            alert('Registration successful!');
        } else {
            alert(result.message || 'Registration failed!');
        }
        
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong');
    }
});

document.getElementById('signInForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('signInEmail').value.trim();
    const password = document.getElementById('signInPassword').value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (result.token) {
            localStorage.setItem('authToken', result.token);
            alert(result.message || 'Login successful');
        } else {
            alert(result.message || 'Login failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong');
    }
});
function toggleForms(type) {
    const registrationForm = document.getElementById('registrationForm');
    const signInForm = document.getElementById('signInForm');
    // const showSignInBtn = document.getElementById('showSignInBtn');
    const showRegisterBtn = document.getElementById('showRegisterBtn');

    if (type === 'signin') {
        signInForm.classList.remove('hidden-form');
        signInForm.classList.add('active-form');
        registrationForm.classList.remove('active-form');
        registrationForm.classList.add('hidden-form');
        // showSignInBtn.classList.add('active');
        showRegisterBtn.classList.remove('active');
    } else {
        registrationForm.classList.remove('hidden-form');
        registrationForm.classList.add('active-form');
        signInForm.classList.remove('active-form');
        signInForm.classList.add('hidden-form');
        // showRegisterBtn.classList.add('active');
        // showSignInBtn.classList.remove('active');
    }
}

