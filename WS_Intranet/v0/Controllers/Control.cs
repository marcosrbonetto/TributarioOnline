using _Rules;
using _Rules.Rules;
using System;
using System.Linq;
using System.Web.Http;

namespace WS_Intranet.v0.Controllers
{
    public class Control : ApiController
    {
        protected string GetToken()
        {
            return Request.Headers.GetValues("Token").First();
        }

        public ResultadoServicio<UsuarioLogueado> GetUsuarioLogeado()
        {
            var token = GetToken();
            var resultado = new ResultadoServicio<UsuarioLogueado>();

            try
            {
                var resultadoIdByToken = new _VecinoVirtualUsuarioRules(null).GetIdByToken(token);
                if (!resultadoIdByToken.Ok)
                {
                    resultado.Error = resultadoIdByToken.Error;
                    return resultado;
                }

                var usuarioLogeado = new UsuarioLogueado();

                usuarioLogeado.IdUsuario = resultadoIdByToken.Return;
                usuarioLogeado.Token = token;

                resultado.Return = usuarioLogeado;
            }
            catch (Exception)
            {
                resultado.SetError();
            }

            return resultado;
        }

        public ResultadoServicio<bool> ValidarToken()
        {
            var token = GetToken();
            var resultado = new ResultadoServicio<bool>();

            try
            {
                var resultadoValidarToken = new _VecinoVirtualUsuarioRules(null).ValidarToken(token);
                if (!resultadoValidarToken.Ok)
                {
                    resultado.Error = resultadoValidarToken.Error;
                    return resultado;
                }

                resultado.Return = resultadoValidarToken.Return;
            }
            catch (Exception)
            {
                resultado.SetError();
            }

            return resultado;
        }
    }
}