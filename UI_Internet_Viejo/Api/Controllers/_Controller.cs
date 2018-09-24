using System;
using System.Linq;
using System.Web.Http;

namespace UI_Internet.Api.Controllers
{
    public class _Control : ApiController
    {
        protected string GetToken()
        {
            return Request.Headers.GetValues("Token").First();
        }
    }
}