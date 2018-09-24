using System;
using System.Linq;
using System.Web.Http;
using RestSharp.Portable;
using UI_Internet.Api.Controllers.ActionFilters;
using UI_Internet.Api.Utils;
using UI_Internet.Api.Entities.Comandos;
using UI_Internet.Api.Entities.Resultados;

namespace UI_Internet.Api.Controllers
{
    [RoutePrefix("Api/Usuario")]
    public class UsuarioController : _Control
    {
        [HttpPut]
        [Route("IniciarSesion")]
        public ResultadoServicio<string> IniciarSesion(ComandoApp_IniciarSesion comando)
        {
            return RestCall.Call<string>("v1/Usuario/IniciarSesion", Method.PUT, comando);
        }

        [HttpPut]
        [ConToken]
        [Route("CerrarSesion")]
        public ResultadoServicio<bool> CerrarSesion()
        {
            return RestCall.CallConToken<bool>("v1/Usuario/CerrarSesion", Method.PUT, GetToken());
        }

        [HttpGet]
        [ConToken]
        [Route("IdUsuario")]
        public ResultadoServicio<int> IdUsuario()
        {
            return RestCall.CallConToken<int>("v1/Usuario/IdUsuario", Method.GET, GetToken());
        }

        [HttpGet]
        [ConToken]
        [Route("Usuario")]
        public ResultadoServicio<ResultadoApp_Usuario> Usuario()
        {
            return RestCall.CallConToken<ResultadoApp_Usuario>("v1/Usuario/Usuario", Method.GET, GetToken());
        }

        [HttpGet]
        [ConToken]
        [Route("ValidarToken")]
        public ResultadoServicio<bool> ValidarToken()
        {
            return RestCall.CallConToken<bool>("v1/Usuario/ValidarToken", Method.GET, GetToken());
        }

        [HttpGet]
        [ConToken]
        [Route("ValidadoRenaper")]
        public ResultadoServicio<bool> ValidadoRenaper()
        {
            return RestCall.CallConToken<bool>("v1/Usuario/ValidadoRenaper", Method.GET, GetToken());
        }

        [HttpGet]
        [ConToken]
        [Route("AplicacionBloqueada")]
        public ResultadoServicio<bool> AplicacionBloqueada()
        {
            return RestCall.CallConToken<bool>("v1/Usuario/AplicacionBloqueada", Method.GET, GetToken());
        }
    }
}