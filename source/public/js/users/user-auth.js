/* globals $ requester toastr */

(function () {
    $('#btn-login').on('click', () => {
        let username = $('#username-login').val().trim(),
            password = $('#password-login').val().trim(),
            body = {
                username: username,
                password: password
            };

        requester.postJSON('/login', body)
            .then((res) => {
                toastr.success(res);
                setTimeout(() => { window.location = '/'; }, 1000);
            })
            .catch((err) => {
                toastr.error(err.responseText);
                $('#username-login').val();
                $('#password-login').val('');
            });
    });

    $('#btn-register').on('click', () => {
        let body = {
            username: $('#username-register').val().trim(),
            password: $('#password-register').val().trim(),
            reenterPassword: $('#reenter-password-register').val().trim(),
            firstName: $('#first-name-register').val().trim(),
            lastName: $('#last-name-register').val().trim(),
            gender: $('#gender-register').val().trim(),
            age: $('#age-register').val().trim(),
            avatar: $('#avatar-register').val().trim(),
            email: $('#email-register').val().trim()
        };

        if (Object.keys(body).length == 0) {
            toastr.error('Please fill out all of the fields!');
            return;
        }

        for (let prop in body) {
            if (!body[prop].trim()) {
                toastr.error('Please fill out all of the fields!');
                return;
            }
        }

        if (!body.password || body.password !== body.reenterPassword) {
            toastr.error('Passwords do not match!');
            $('#password-register').val('');
            $('#reenter-password-register').val('');
            return;
        }

        if (isNaN(+body.age) || +body.age < 1 || +body.age > 120) {
            toastr.error('Invalid age!');
            $('#age-register').val('');
            return;
        }

        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(body.email)) {
            toastr.error('Invalid E-Mail!');
            $('#email-register').val('');
            return;
        }

        requester.postJSON('/register', body)
            .then((res) => {
                console.log(res);
                toastr.success('Registration successful! Redirecting...');
                setTimeout(() => { window.location = '/'; }, 1500);
            })
            .catch((err) => {
                console.log(err);
                if (err.responseJSON.code === 11000) {
                    toastr.error(`Username "${body.username}" already exists!`);
                    $('#username-register').val('');
                }
                else {
                    console.log(err);
                    toastr.error('An error occurred! Please try again!');
                }
            });
    });
} ());