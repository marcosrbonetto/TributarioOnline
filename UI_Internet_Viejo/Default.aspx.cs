using System;
using System.Linq;

namespace UI_Internet
{
    public partial class Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Response.Redirect("~/Login", false);
        }
    }
}