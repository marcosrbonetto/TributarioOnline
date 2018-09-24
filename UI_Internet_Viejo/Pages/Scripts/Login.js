document.addEventListener('DOMContentLoaded', function (e) {
    window.addEventListener('message', function (e) {
        if (e === undefined || e.data === undefined) return;

        let data = e.data;
        setToken(data.Token);
    });
});

function setToken(token) {
    let iframe = document.querySelector('iframe');

    var miInit = {
        method: 'GET',
        headers: { token: token },
        mode: 'cors',
        cache: 'default'
    };

    fetch(ResolveUrl('~/Api/Usuario/ValidarToken'), miInit)
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            if (!result.ok) {
                iframe.contentWindow.postMessage('reintentar-login', '*');
                return;
            }

            iframe.contentWindow.postMessage('login-completado', '*');
            setTimeout(function () {
                location.reload();
            }, 500);
        })
        .catch(function (error) {
            iframe.contentWindow.postMessage('reintentar-login', '*');
        });
}

// Utils
function ResolveUrl(url) {
    if (url.indexOf("~/") === 0) {
        url = baseUrl + url.substring(2);
    }
    return url;
}