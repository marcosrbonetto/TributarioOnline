$(function () {
    $.each($('.resource > .heading h2 > a'), function (index, element) {
        let titulo = $(element).text().toLowerCase();
        let indice = titulo.indexOf('_v');

        if (indice !== -1) {
            titulo = titulo.substring(0, indice);
            $(element).text(titulo);
        }

        if (titulo === 'usuario') {
            $.each($(element).parent().parent().parent().find('.put.operation'), function (index2, element2) {
                if (element2.id.indexOf('IniciarSesion') !== -1) {
                    $(element2).addClass('IniciarSesion');
                }
            });
        }
    });

    $('.operation').click(function () {
        let token = $('.IniciarSesion .response_body code span')[1].innerText;
        if (token) {
            $(this).find('[name=Token]').val(token.substring(1, token.length - 1));
        }
    });
});