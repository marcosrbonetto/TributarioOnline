using System;
using System.Linq;
using System.Web.Http;
using WS_Intranet.App;

namespace WS_Intranet
{
    public class Global : System.Web.HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            SwaggerConfig.Register();
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}