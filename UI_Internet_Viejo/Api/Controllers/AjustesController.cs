using System;
using System.Linq;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using UI_Internet.Api.Utils;

namespace UI_Internet.Api.Controllers
{
    [RoutePrefix("Api/Ajustes")]
    public class AjustesController : _Control
    {
        [HttpGet]
        [Route("AppData")]
        public ResultadoServicio<JObject> GetAppData()
        {
            return RestCall.CallConValidarApp<JObject>("/v1/Ajustes/AppData", RestSharp.Portable.Method.GET);
        }
    }
}