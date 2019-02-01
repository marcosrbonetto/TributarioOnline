import React from "react";

export const infoExplicativaTributos = (idTipoTributo) => {
    switch (idTipoTributo) {
        case 1:
            return <span><b>Sr. Contribuyente de Automotores:</b><br /><br />

                Para el año 2019, si Ud. abona la <b>cuota anual</b> tendrá un <b>descuento del 10%</b> (calculado sobre el anual 2018) y si lo hace abonando los <b>periodos bimestrales al vencimiento</b>  por Homebanking, Débito en Tarjeta Naranja, Cabal o por <b>Mercado Pago</b> tendrá un <b>descuento del 4%</b> (calculado sobre el anual 2019).<br /><br />

                Para el <b>Contribuyente Cumplidor 2018</b> (sin deuda al 18 de diciembre), <b>se descontó</b> del total a abonar en 2019 <b>el 10%</b> sobre la Tasa Anual y se aplicó la rebaja <b>distribuida en los periodos bimestrales</b>.<br /><br />

                <span style={{ fontWeight: 'bold', color: 'red' }}>El descuento por abonar la Cuota Anual es seleccionando el mismo desde el botón "Beneficios" y no seleccionando períodos individuales.</span></span>;
        case 2:
            return <span><b>Sr. Contribuyente de Inmuebles:</b><br /><br />

                Para el año 2019, si Ud. abona las <b>medias cuotas</b> tendrá un <b>descuento del 10%</b> (calculado sobre el anual 2018) y si lo hace abonando los <b>periodos mensuales al vencimiento</b>  por Homebanking, Débito en Tarjeta Naranja, Cabal o por <b>Mercado Pago</b> tendrá un <b>descuento del 4%</b> (calculado sobre el anual 2019).<br /><br />

                Para el <b>Contribuyente Cumplidor 2018</b> (sin deuda al 18 de diciembre), <b>se descontó</b> del total a abonar en 2019 <b>el 10%</b> sobre la Tasa Anual y se aplicó la rebaja <b>distribuida en los periodos mensuales</b>.<br /><br />

                <span style={{ fontWeight: 'bold', color: 'red' }}>El descuento por abonar cada Media Cuota es seleccionando una por vez y no seleccionando períodos individuales.</span></span>;
        case 3:
            return false;
        case 4:
            return false;
        case 5:
            return false;
        case 6:
            return false;
        case 7:
            return false;
        case 8:
            return false;
        case 9:
            return false;
    }
}

export const arrayIdTipoTributoInfo = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9];
}