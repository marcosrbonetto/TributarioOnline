using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;
using UI_Internet.Api.Utils;

namespace UI_Internet.Api.Controllers.ActionFilters
{
    public class ConToken : ActionFilterAttribute
    {
        public override void OnActionExecuted(HttpActionExecutedContext actionContext)
        {
            if (!actionContext.Request.Headers.Contains("Token"))
            {
                actionContext.Response = Error(HttpStatusCode.OK, "Debe mandar su token de acceso de Vecino Virtual");
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