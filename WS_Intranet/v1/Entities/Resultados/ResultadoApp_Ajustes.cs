using System;
using System.Linq;
using _Model.Entities;

namespace WS_Intranet.v1.Entities.Resultados
{
    [Serializable]
    public class ResultadoApp_Ajustes
    {
        public string App { get; set; }

        public ResultadoApp_Ajustes(Ajustes entity)
        {
            if (entity == null)
            {
                return;
            }

            App = entity.App;
        }
    }
}