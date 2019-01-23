//Funciones Útiles
import { stringToDate } from "@Utils/functions"

const beneficios = {
    'Automotor': [ //'Automotor'
        {
            key: 1,
            titulo: 'Cuota Anual',
            secciones: ['Contribucion'], //'Contribucion'
            columnaCondicion: 'vencimiento',
            condicion: (row) => {
                const year = typeof row.concepto.split('/')[0] == 'string' ? parseInt(row.concepto.split('/')[0]) : 1900;

                if (year == 2019) {
                    row.data = {
                        ...row.data,
                        checked: true,
                        invisible: false,
                        disabled: true,
                    };
                } else {
                    row.data = {
                        ...row.data,
                        checked: false,
                        invisible: true,
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
            titulo: '1ra ½ Cuota',
            secciones: ['Contribucion'], //'Contribucion'
            columnaCondicion: 'vencimiento',
            condicion: (row) => {
                const year = typeof row.concepto.split('/')[0] == 'string' ? parseInt(row.concepto.split('/')[0]) : 1900;
                const month = typeof row.concepto.split('/')[1] == 'string' ? parseInt(row.concepto.split('/')[1]) : -1;

                if ([1, 2, 3, 4, 5, 6].indexOf(month) != -1 && year == 2019) {
                    row.data = {
                        ...row.data,
                        checked: true,
                        invisible: false,
                        disabled: true,
                    };
                } else {
                    row.data = {
                        ...row.data,
                        checked: false,
                        invisible: true,
                        disabled: false,
                    };
                }
                
                return row;
            },
            tableDisabled: true
        },
        {
            key: 2,
            titulo: '2da ½ Cuota',
            secciones: ['Contribucion'], //'Contribucion'
            columnaCondicion: 'vencimiento',
            condicion: (row) => {
                const year = typeof row.concepto.split('/')[0] == 'string' ? parseInt(row.concepto.split('/')[0]) : 1900;
                const month = typeof row.concepto.split('/')[1] == 'string' ? parseInt(row.concepto.split('/')[1]) : -1;

                if ([7, 8, 9, 10, 11, 12].indexOf(month) != -1 && year == 2019) {
                    row.data = {
                        ...row.data,
                        checked: true,
                        invisible: false,
                        disabled: true,
                    };
                } else {
                    row.data = {
                        ...row.data,
                        checked: false,
                        invisible: true,
                        disabled: false,
                    };
                }
                
                return row;
            },
            tableDisabled: true
        }
    ],
};

export default beneficios;