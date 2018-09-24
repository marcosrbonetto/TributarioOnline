using System;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using WS_Internet.v0;

namespace WS_Internet.v1.Controllers
{
    [RoutePrefix("v1/Ajustes")]
    public class Ajustes_v1Controller : ApiController
    {
        [HttpGet]
        [Route("AppData")]
        public ResultadoServicio<JObject> GetAppData()
        {
            return RestCall.Call<JObject>(Request);
        }
    }
}