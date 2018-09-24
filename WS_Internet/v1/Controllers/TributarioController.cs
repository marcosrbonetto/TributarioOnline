using System;
using System.Linq;
using System.Web.Http;
using WS_Internet.v0;

namespace WS_Internet.v1.Controllers
{
    [RoutePrefix("v1/Tributario")]
    public class Tributario_v1Controller : ApiController
    {
        [HttpGet]
        [Route("GetCuitConsulta")]
        public ResultadoServicio<object> GetCuitConsulta(string cuit)
        {
            return RestCall.Call<object>(Request);
        }
    }
}