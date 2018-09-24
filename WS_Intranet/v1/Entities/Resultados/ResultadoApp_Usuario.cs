using _Model.WSVecinoVirtual.Resultados;
using System;
using System.Collections.Generic;
using System.Linq;

namespace WS_Intranet.v1.Entities.Resultados
{
    [Serializable]
    public class ResultadoApp_Usuario
    {
        // Datos basicos
        public int IdCerrojo { get; set; }
        public DateTime FechaAlta { get; set; }
        public DateTime? FechaBaja { get; set; }

        // Datos personales
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public int? Dni { get; set; }
        public string Cuil { get; set; }
        public bool SexoMasculino { get; set; }
        public DateTime? FechaNacimiento { get; set; }
        public string IdentificadorFotoPersonal { get; set; }
        public string DomicilioLegal { get; set; }
        public int? EstadoCivilId { get; set; }
        public string EstadoCivilNombre { get; set; }
        public string DomicilioDireccion { get; set; }
        public string DomicilioAltura { get; set; }
        public string DomicilioPiso { get; set; }
        public string DomicilioDepto { get; set; }
        public string DomicilioTorre { get; set; }
        public string DomicilioCodigoPostal { get; set; }
        public string DomicilioBarrioNombre { get; set; }
        public int? DomicilioBarrioId { get; set; }
        public string DomicilioCiudadNombre { get; set; }
        public int? DomicilioCiudadId { get; set; }
        public string DomicilioProvinciaNombre { get; set; }
        public int? DomicilioProvinciaId { get; set; }

        // Datos de acceso
        public string Username { get; set; }

        // Datos de contacto
        public string Email { get; set; }
        public string TelefonoFijo { get; set; }
        public string TelefonoCelular { get; set; }
        public string Facebook { get; set; }
        public string Twitter { get; set; }
        public string Instagram { get; set; }
        public string LinkedIn { get; set; }

        // Datos empleado
        public bool Empleado { get; set; }
        public string Funcion { get; set; }
        public string Cargo { get; set; }
        public DateTime? FechaJubilacion { get; set; }

        // Datos de validacion
        public bool ValidacionEmail { get; set; }
        public bool ValidacionDNI { get; set; }
        public bool ValidacionPersonal { get; set; }
        public bool ValidacionDomicilio { get; set; }

        public ResultadoApp_Usuario(VVResultado_Usuario usuario)
        {
            if (usuario == null)
            {
                return;
            }

            IdCerrojo = usuario.IdCerrojo;
            FechaAlta = usuario.FechaAlta;
            FechaBaja = usuario.FechaBaja;

            // Datos personales
            Nombre = usuario.Nombre;
            Apellido = usuario.Apellido;
            Dni = usuario.Dni;
            Cuil = usuario.Cuil;
            SexoMasculino = usuario.SexoMasculino;
            FechaNacimiento = usuario.FechaNacimiento;
            IdentificadorFotoPersonal = usuario.IdentificadorFotoPersonal;
            DomicilioLegal = usuario.DomicilioLegal;
            EstadoCivilId = usuario.EstadoCivilId;
            EstadoCivilNombre = usuario.EstadoCivilNombre;
            DomicilioDireccion = usuario.DomicilioDireccion;
            DomicilioAltura = usuario.DomicilioAltura;
            DomicilioPiso = usuario.DomicilioPiso;
            DomicilioDepto = usuario.DomicilioDepto;
            DomicilioTorre = usuario.DomicilioTorre;
            DomicilioCodigoPostal = usuario.DomicilioCodigoPostal;
            DomicilioBarrioNombre = usuario.DomicilioBarrioNombre;
            DomicilioBarrioId = usuario.DomicilioBarrioId;
            DomicilioCiudadNombre = usuario.DomicilioCiudadNombre;
            DomicilioCiudadId = usuario.DomicilioCiudadId;
            DomicilioProvinciaNombre = usuario.DomicilioProvinciaNombre;
            DomicilioProvinciaId = usuario.DomicilioProvinciaId;

            // Datos de acceso
            Username = usuario.Username;

            // Datos de contacto
            Email = usuario.Email;
            TelefonoFijo = usuario.TelefonoFijo;
            TelefonoCelular = usuario.TelefonoCelular;
            Facebook = usuario.Facebook;
            Twitter = usuario.Twitter;
            Instagram = usuario.Instagram;
            LinkedIn = usuario.LinkedIn;

            // Datos empleado
            Empleado = usuario.Empleado;
            Funcion = usuario.Funcion;
            Cargo = usuario.Cargo;
            FechaJubilacion = usuario.FechaJubilacion;

            // Datos de validacion
            ValidacionEmail = usuario.ValidacionEmail;
            ValidacionDNI = usuario.ValidacionDNI;
            ValidacionPersonal = usuario.ValidacionPersonal;
            ValidacionDomicilio = usuario.ValidacionDomicilio;
        }

        public static List<ResultadoApp_Usuario> ToList(IList<VVResultado_Usuario> list)
        {
            return list.Select(x => new ResultadoApp_Usuario(x)).ToList();
        }
    }
}