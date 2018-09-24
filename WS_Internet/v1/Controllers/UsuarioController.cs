using System;
using System.Linq;
using System.Web.Http;
using WS_Internet.v0;
using WS_Internet.v1.Entities.Resultados;

namespace WS_Internet.v1.Controllers
{
    [RoutePrefix("v1/Usuario")]
    public class Usuario_v1Controller : ApiController
    {

        [HttpPut]
        [Route("IniciarSesion")]
        public ResultadoServicio<string> IniciarSesion(ComandoApp_IniciarSesion comando)
        {
            return RestCall.Call<string>(Request, comando);
        }

        [HttpPut]
        [Route("CerrarSesion")]
        public ResultadoServicio<bool> CerrarSesion()
        {
            return RestCall.Call<bool>(Request);
        }

        [HttpGet]
        [Route("IdUsuario")]
        public ResultadoServicio<int> GetIdUsuario()
        {
            return RestCall.Call<int>(Request);
        }

        [HttpGet]
        [Route("Usuario")]
        public ResultadoServicio<ResultadoApp_Usuario> GetUsuario()
        {
            return RestCall.Call<ResultadoApp_Usuario>(Request);
        }

        [HttpGet]
        [Route("ValidarToken")]
        public ResultadoServicio<bool> ValidarToken()
        {
            return RestCall.Call<bool>(Request);
        }

        [HttpGet]
        [Route("ValidadoRenaper")]
        public ResultadoServicio<bool> ValidadoRenaper()
        {
            return RestCall.Call<bool>(Request);
        }

        [HttpGet]
        [Route("AplicacionBloqueada")]
        public ResultadoServicio<bool> AplicacionBloqueada()
        {
            return RestCall.Call<bool>(Request);
        }
    }
}