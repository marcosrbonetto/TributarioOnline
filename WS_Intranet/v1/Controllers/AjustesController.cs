using System;
using System.Linq;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using WS_Intranet.v0.Controllers;
using WS_Intranet.v0.ActionFilters;
using WS_Intranet.v0;
using WS_Intranet.v0.Rules;

namespace WS_Intranet.v1.Controllers
{
    [RoutePrefix("v1/Ajustes")]
    public class Ajustes_v1Controller : Control
    {
        [HttpGet]
        [ValidarApp]
        [Route("AppData")]
        public ResultadoServicio<JObject> GetAppData()
        {
            return new WSRules_Ajustes(null).GetAppData();
        }
    }
}