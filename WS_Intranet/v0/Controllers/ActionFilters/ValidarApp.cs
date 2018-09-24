using System;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;

namespace WS_Intranet.v0.ActionFilters
{
    public class ValidarApp : ActionFilterAttribute
    {
        public override void OnActionExecuted(HttpActionExecutedContext actionContext)
        {
            if (!actionContext.Request.Headers.Contains("Identificador") || !actionContext.Request.Headers.Contains("Key"))
            {
                actionContext.Response = Error(HttpStatusCode.OK, "Debe indicar las credenciales necesarias");
                return;
            }

            var identificador = actionContext.Request.Headers.GetValues("Identificador").First();
            var key = actionContext.Request.Headers.GetValues("Key").First();
            if (identificador != ConfigurationManager.AppSettings["APP_KEY_VECINO_VIRTUAL"] || key != ConfigurationManager.AppSettings["APP_KEY"])
            {
                actionContext.Response = Error(HttpStatusCode.OK, "Credenciales inválidas");
                return;
            }
        }

        private HttpResponseMessage Error(HttpStatusCode code, string mensaje)
        {
            var resultado = new ResultadoServicio<object>();
            resultado.Error = mensaje;

            return new HttpResponseMessage(code)
            {
                Content = new JsonContent(resultado)
            };
        }
    }
}