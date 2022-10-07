/*
    Login url: https://reqres.in/api/login
    Body:
    {
      email: "eve.holt@reqres.in",
      password: "ok"
    }

    Users url: https://reqres.in/api/users
*/

let state = []

function renderUsers() {
    let usersHTML = '';
    for(let user of state) {
        usersHTML += `<li class="list-group-item"></li>`
    }

    document.getElementById('user-list-container').innerHTML = usersHTML;
}

document.getElementById('login').onsubmit = function (event) {
    event.preventDefault();
    let email = event.target.elements.email.value;
    let password = event.target.elements.password.value;
    let body = JSON.stringify({
        email: email,
        password: password
    });
    fetch('https://reqres.in/api/login', {
        method: 'POST',
        body: body,
        headers: {
            'Content-type': 'application/json'
        },
    })
        .then((response) => {
            if (!response.ok) {
                return Promise.reject('login error')
            }
        })
        .then((res) => fetch('https://reqres.in/api/users'))
        .then((res) => {
            if (!res.ok) {
                return Promise.reject('users error');
            }
            return res.json();
        })
        .then((userPage) => {
            state = userPage.data;
            renderUsers();
        })
        .catch(console.log)
}
