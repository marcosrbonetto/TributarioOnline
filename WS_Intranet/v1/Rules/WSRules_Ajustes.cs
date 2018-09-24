using System;
using System.Linq;
using Newtonsoft.Json.Linq;
using WS_Intranet.v1.Entities.Resultados;
using _Model.Entities;
using _Rules;

namespace WS_Intranet.v0.Rules
{
    public class WSRules_Ajustes : WSRules_Base<Ajustes>
    {
        private readonly WSRules_BaseAjustes rulesBase;

        public WSRules_Ajustes(UsuarioLogueado data)
            : base(data)
        {
            rulesBase = new WSRules_BaseAjustes(data);
        }

        public ResultadoServicio<ResultadoApp_Ajustes> Get()
        {
            var resultado = new ResultadoServicio<ResultadoApp_Ajustes>();

            var resultadoAjustes = rulesBase.Get();
            if (!resultadoAjustes.Ok)
            {
                resultado.Error = resultadoAjustes.Error;
                return resultado;
            }

            resultado.Return = new ResultadoApp_Ajustes(resultadoAjustes.Return);
            return resultado;
        }

        public ResultadoServicio<JObject> GetAppData()
        {
            return rulesBase.GetAppData();
        }
    }
}