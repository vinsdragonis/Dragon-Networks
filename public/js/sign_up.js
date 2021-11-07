const users_data = [];

window.onload = function () {
    fetch('http://localhost:3000/auth/users')
        .then((response) => response.json())
        .then((data) => {
            data.forEach((user) => {
                users_data.push({ name: user.username, email: user.email });
            });
        });
}

function checkName() {
    var name = document.getElementById("username");
    var naRegx = /^([a-z A-Z]+){5,40}$/;
    if (name.value.trim() == "") {
        document.getElementById("lb1").innerHTML = "Invalid";
        document.getElementById("lb1").style.display = "inline";
        name.style.border = "2px solid red";
        return false;
    }
    else if (naRegx.test(name.value.trim())) {
        let userExist = false;
        users_data.forEach((user) => {
            if (name.value == user.name) {
                userExist = true;
            }
        });
        if (userExist == false) {
            name.style.border = "1px solid #e1e1e1";
            document.getElementById("lb1").style.display = "none";
            return true;
        }
        else {
            document.getElementById("lb1").innerHTML = "Username already exists";
            document.getElementById("lb1").style.display = "inline";
            name.style.border = "2px solid red";
            return false;
        }
    }
    else {
        document.getElementById("lb1").innerHTML = "Invalid";
        document.getElementById("lb1").style.display = "inline";
        name.style.border = "2px solid red";
        return false;
    }
}

function checkEmail() {
    var email = document.getElementById("email");
    var emRegx = /^([a-z 0-9/.-]+)@([a-z 0-9-]+).([a-z]{2,8})(.[a-z]{2,8})$/;
    if (email.value.trim() == "") {
        document.getElementById("lb2").innerHTML = "Invalid";
        email.style.border = "2px solid red";
        document.getElementById("lb2").style.display = "inline";
        return false;
    }
    else if (emRegx.test(email.value.trim())) {
        let userExist = false;
        users_data.forEach((user) => {
            if (email.value == user.email) {
                userExist = true;
            }
        });
        if (userExist == false) {
            email.style.border = "1px solid #e1e1e1";
            document.getElementById("lb2").style.display = "none";
            return true;
        }
        else {
            document.getElementById("lb2").innerHTML = "Email already exists";
            document.getElementById("lb2").style.display = "inline";
            email.style.border = "2px solid red";
            return false;
        }
    }
    else {
        document.getElementById("lb2").innerHTML = "Invalid";
        email.style.border = "2px solid red";
        document.getElementById("lb2").style.display = "inline";
        return false;
    }
}

function checkPassword() {
    var password = document.getElementById("password");
    var paRegx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    if (password.value.trim() == "") {
        password.style.border = "2px solid red";
        document.getElementById("lb3").style.display = "inline";
        return false;
    }
    else if (paRegx.test(password.value.trim())) {
        password.style.border = "1px solid #e1e1e1";
        document.getElementById("lb3").style.display = "none";
        return true;
    }
    else {
        password.style.border = "2px solid red";
        document.getElementById("lb3").style.display = "inline";
        return false;
    }
}

function checkAll() {
    var username = checkName();
    var email = checkEmail();
    var password = checkPassword();
    let name = document.getElementById('username').value;
    let emailId = document.getElementById('email').value;
    let userPassword = document.getElementById('password').value;
    if (username == true && email == true && password == true) {
        fetch('http://localhost:3000/auth/register',
            {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ username: name, email: emailId, password: userPassword })
            }
        )
            .then((response) => response.json())
            .then((data) => {
                // localStorage.setItem('username', name);
                location.href = "http://localhost:3000";
            });
    }
}