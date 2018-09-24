using System;
using System.Linq;
using WS_Intranet.v0.Rules;
using WS_Intranet.v0;

namespace WS_Intranet.v1.Rules
{
    public class WSRules_Tributario
    {
        private readonly WSRules_BaseTributario rules;

        public WSRules_Tributario()
        {
            rules = new WSRules_BaseTributario();
        }

        public ResultadoServicio<object> GetCuitConsulta(string cuit)
        {
            return rules.GetCuitConsulta(cuit);
        }
    }
}