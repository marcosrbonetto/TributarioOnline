using System;
using System.Linq;

namespace WS_Intranet.v1.Entities.Resultados
{
    [Serializable]
    public class ComandoApp_IniciarSesion
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}