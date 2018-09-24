using System;
using System.Linq;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using _Model;
using _Model.Entities;
using _Rules.Rules;
using _Rules;

namespace WS_Intranet.v0.Rules
{
    public class WSRules_BaseAjustes : WSRules_Base<BaseEntity>
    {
        private readonly AjustesRules rules;

        public WSRules_BaseAjustes(UsuarioLogueado data)
            : base(data)
        {
            rules = new AjustesRules(data);
        }

        public ResultadoServicio<Ajustes> Get()
        {
            var resultado = new ResultadoServicio<Ajustes>();

            var resultadoAjustes = rules.Get();
            if (!resultadoAjustes.Ok)
            {
                resultado.Error = resultadoAjustes.Error;
                return resultado;
            }

            resultado.Return = resultadoAjustes.Return;
            return resultado;
        }

        public ResultadoServicio<JObject> GetAppData()
        {
            var resultado = new ResultadoServicio<JObject>();

            try
            {
                var resultadoAjustes = Get();
                if (!resultadoAjustes.Ok)
                {
                    resultado.Error = resultadoAjustes.Error;
                    return resultado;
                }

                resultado.Return = JsonConvert.DeserializeObject<JObject>(resultadoAjustes.Return.App);
            }
            catch (Exception e)
            {
                resultado.Error = "Error procesando la solicitud";
            }

            return resultado;
        }
    }
}