using System;
using System.Linq;
using _Rules.Rules;

namespace WS_Intranet.v0.Rules
{
    public class WSRules_BaseTributario
    {
        private readonly _ServicioTributarioRules rules;

        public WSRules_BaseTributario()
        {
            rules = new _ServicioTributarioRules();
        }

        public ResultadoServicio<object> GetCuitConsulta(string cuit)
        {
            var resultado = new ResultadoServicio<object>();

            var resultadoRules = rules.GetCuitConsulta(cuit);
            if (!resultadoRules.Ok)
            {
                resultado.Error = resultadoRules.Error;
                return resultado;
            }

            resultado.Return = resultadoRules.Return;
            return resultado;
        }
    }
}