
let userStatus = document.getElementById('status');
let token = localStorage.getItem('id_token') || null;
if (token) {
    userStatus.innerHTML = 'Logout';
}
else {
    userStatus.innerHTML = 'Login';
}


userStatus.addEventListener('click', () => {
    if (token) {
        localStorage.removeItem('id_token');
        window.location.href = 'index.html';
    }
    else {
        window.location.href = 'login.html';
    }
})

function signup() {
    window.location.href = 'signup.html';
}
function posts() {
    if (token) {
        window.location.href = 'posts.html';
    }
    else {
        alert('please login first');
    }
}

document.getElementById('homelink').addEventListener('click',()=>{
    window.location.href='index.html'
})
