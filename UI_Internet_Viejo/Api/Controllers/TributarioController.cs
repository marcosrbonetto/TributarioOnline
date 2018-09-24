using System;
using System.Linq;
using System.Web.Http;
using RestSharp.Portable;
using UI_Internet.Api.Utils;
using UI_Internet.Api.Controllers.ActionFilters;

namespace UI_Internet.Api.Controllers
{
    [RoutePrefix("Api/Tributario")]
    public class TributarioController : _Control
    {
        [HttpGet]
        [ConToken]
        [Route("GetCuitConsulta")]
        public ResultadoServicio<object> GetCuitConsulta(string cuit)
        {
            return RestCall.Call<object>("v1/Tributario/GetCuitConsulta?cuit=" + cuit, Method.GET, null);
        }
    }
}