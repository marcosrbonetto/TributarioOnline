//Funciones Útiles
import { stringToDate } from "@Utils/functions"

const beneficios = {
    'Automotor': [ //'Automotor'
        {
            key: 1,
            titulo: 'Pago Anual',
            secciones: ['Contribucion'], //'Contribucion'
            columnaCondicion: 'vencimiento',
            condicion: (row) => {
                const date = typeof row.vencimiento == 'string' ? new Date(stringToDate(row.vencimiento)) : row.vencimiento;

                if (date.getFullYear() == 2018) {
                    row.data = {
                        ...row.data,
                        checked: true,
                        disabled: true,
                    };
                } else {
                    row.data = {
                        ...row.data,
                        checked: false,
                        disabled: false,
                    };
                }

                return row;
            },
            tableDisabled: true
        }
    ],
    'Inmueble': [ //'Inmueble'
        {
            key: 1,
            titulo: '1as Cuotas',
            secciones: ['Contribucion'], //'Contribucion'
            columnaCondicion: 'vencimiento',
            condicion: (row) => {
                const date = typeof row.vencimiento == 'string' ? new Date(stringToDate(row.vencimiento)) : row.vencimiento;

                if ([1, 2, 3, 4, 5, 6].indexOf((new Date().getMonth() + 1)) != -1 && date.getFullYear() == 2019) {
                    row.checked = true;
                    row.disabled = true;
                    return row;
                }
                else
                    return row;
            },
            tableDisabled: true
        },
        {
            key: 2,
            titulo: '2as Cuotas',
            secciones: ['Contribucion'], //'Contribucion'
            columnaCondicion: 'vencimiento',
            condicion: (row) => {
                const date = typeof row.vencimiento == 'string' ? new Date(stringToDate(row.vencimiento)) : row.vencimiento;

                if ([7, 8, 9, 10, 11, 12].indexOf((new Date().getMonth() + 1)) != -1 && date.getFullYear() == 2019) {
                    row.checked = true;
                    row.disabled = true;
                    return row;
                }
                else
                    return row;
            },
            tableDisabled: true
        }
    ],
};

export default beneficios;