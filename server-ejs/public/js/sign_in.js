function redirectYourPage() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let userExist = false;
    fetch('http://localhost:3000/auth/login',
        {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ username: username, password: password })
        }
    )
        .then((response) => {
            if (response.status == 200) {
                userExist = true;
                location.href = "/";
            }
            else {
                userExist = false;
                document.getElementById('lb3').style.display = 'inline';
            }
            return response.json();
        })
        .then((data) => {
        });
}