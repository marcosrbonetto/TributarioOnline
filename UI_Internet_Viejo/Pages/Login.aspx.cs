using System;
using System.Configuration;
using System.Linq;

namespace UI_Internet.Pages
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Page.Title = "Vecino Virtual · Acceder a " + ConfigurationManager.AppSettings["APP_NAME"];
        }
    }
}