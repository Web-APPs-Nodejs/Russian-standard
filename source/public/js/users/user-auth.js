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
                $('#username-login').val('');
                $('#password-login').val('');
            });
    });
} ());