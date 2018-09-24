using System;
using System.Linq;

namespace UI_Internet.Api.Entities.Comandos
{
    [Serializable]
    public class ComandoApp_IniciarSesion
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}