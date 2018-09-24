using System;
using System.Linq;
using System.Web.Http;
using WS_Intranet.v0.ActionFilters;
using WS_Intranet.v0.Controllers;
using WS_Intranet.v0;
using WS_Intranet.v1.Rules;

namespace WS_Intranet.v1.Controllers
{
    [RoutePrefix("v1/Tributario")]
    public class Tributario_v1Controller : Control
    {
        [HttpGet]
        [ConToken]
        [Route("GetCuitConsulta")]
        public ResultadoServicio<object> GetCuitConsulta(string cuit)
        {
            return new WSRules_Tributario().GetCuitConsulta(cuit);
        }
    }
}