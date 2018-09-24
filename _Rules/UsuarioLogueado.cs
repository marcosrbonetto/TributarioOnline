using System;
using System.Linq;

namespace _Rules
{
    [Serializable]
    public class UsuarioLogueado
    {
        public int IdUsuario { get; set; }

        public string Token { get; set; }
    }
}