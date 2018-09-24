using System;
using System.Linq;
using System.Web.Http;
using System.Web.Routing;
using UI_Internet.Api.App;

namespace UI_Internet
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            RegisterRoutes(RouteTable.Routes);

            SwaggerConfig.Register();
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }

        protected void RegisterRoutes(RouteCollection routes)
        {
            routes.MapPageRoute("", "Login", "~/Pages/Login.aspx");
        }

        /*
        // Para manejar session en ApiRest
        protected void Application_PostAuthorizeRequest()
        {
            HttpContext.Current.SetSessionStateBehavior(SessionStateBehavior.Required);
        }
        */
    }
}