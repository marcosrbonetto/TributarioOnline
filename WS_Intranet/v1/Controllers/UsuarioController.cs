using System;
using System.Linq;
using System.Web.Http;
using WS_Intranet.v0;
using WS_Intranet.v0.ActionFilters;
using WS_Intranet.v0.Controllers;
using WS_Intranet.v1.Entities.Resultados;
using WS_Intranet.v1.Rules;

namespace WS_Intranet.v1.Controllers
{
    [RoutePrefix("v1/Usuario")]
    public class Usuario_v1Controller : Control
    {

        [HttpPut]
        [Route("IniciarSesion")]
        public ResultadoServicio<string> IniciarSesion(ComandoApp_IniciarSesion comando)
        {
            return new WSRules_Usuario(null).IniciarSesion(comando);
        }

        [HttpPut]
        [ConToken]
        [Route("CerrarSesion")]
        public ResultadoServicio<bool> CerrarSesion()
        {
            var resultado = new ResultadoServicio<bool>();

            var usuarioLogeado = GetUsuarioLogeado();
            if (!usuarioLogeado.Ok)
            {
                resultado.Error = usuarioLogeado.Error;
                return resultado;
            }

            return new WSRules_Usuario(usuarioLogeado.Return).CerrarSesion();
        }

        [HttpGet]
        [ConToken]
        [Route("IdUsuario")]
        public ResultadoServicio<int> GetIdUsuario()
        {
            var resultado = new ResultadoServicio<int>();

            var usuarioLogeado = GetUsuarioLogeado();
            if (!usuarioLogeado.Ok)
            {
                resultado.Error = usuarioLogeado.Error;
                return resultado;
            }

            return new WSRules_Usuario(usuarioLogeado.Return).GetIdUsuario();
        }

        [HttpGet]
        [ConToken]
        [Route("Usuario")]
        public ResultadoServicio<ResultadoApp_Usuario> GetUsuario()
        {
            var resultado = new ResultadoServicio<ResultadoApp_Usuario>();

            var usuarioLogeado = GetUsuarioLogeado();
            if (!usuarioLogeado.Ok)
            {
                resultado.Error = usuarioLogeado.Error;
                return resultado;
            }

            return new WSRules_Usuario(usuarioLogeado.Return).GetUsuario();
        }

        [HttpGet]
        [ConToken]
        [Route("ValidarToken")]
        public ResultadoServicio<bool> ValidarToken()
        {
            return base.ValidarToken();
        }

        [HttpGet]
        [ConToken]
        [Route("ValidadoRenaper")]
        public ResultadoServicio<bool> ValidadoRenaper()
        {
            var resultado = new ResultadoServicio<bool>();

            var usuarioLogeado = GetUsuarioLogeado();
            if (!usuarioLogeado.Ok)
            {
                resultado.Error = usuarioLogeado.Error;
                return resultado;
            }

            return new WSRules_Usuario(usuarioLogeado.Return).ValidadoRenaper();
        }

        [HttpGet]
        [ConToken]
        [Route("AplicacionBloqueada")]
        public ResultadoServicio<bool> AplicacionBloqueada()
        {
            var resultado = new ResultadoServicio<bool>();

            var usuarioLogeado = GetUsuarioLogeado();
            if (!usuarioLogeado.Ok)
            {
                resultado.Error = usuarioLogeado.Error;
                return resultado;
            }

            return new WSRules_Usuario(usuarioLogeado.Return).AplicacionBloqueada();
        }
    }
}