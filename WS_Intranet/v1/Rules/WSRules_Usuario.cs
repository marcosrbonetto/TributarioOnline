using System;
using System.Linq;
using WS_Intranet.v1.Entities.Resultados;
using _Rules;
using WS_Intranet.v0.Rules;
using WS_Intranet.v0;
using _Model.WSVecinoVirtual.Comandos;

namespace WS_Intranet.v1.Rules
{
    public class WSRules_Usuario
    {
        private UsuarioLogueado usuarioLogeado;
        private readonly WSRules_BaseUsuario rules;

        public WSRules_Usuario(UsuarioLogueado data)
        {
            usuarioLogeado = data;
            rules = new WSRules_BaseUsuario(data);
        }

        public UsuarioLogueado GetUsuarioLogueado()
        {
            return usuarioLogeado;
        }

        public ResultadoServicio<string> IniciarSesion(ComandoApp_IniciarSesion comando)
        {
            var comandoBase = new VVComando_IniciarSesion()
            {
                Username = comando.Username,
                Password = comando.Password
            };

            return rules.IniciarSesion(comandoBase);
        }

        public ResultadoServicio<bool> CerrarSesion()
        {
            return rules.CerrarSesion();
        }

        public ResultadoServicio<int> GetIdUsuario()
        {
            return rules.GetIdUsuario();
        }

        public ResultadoServicio<ResultadoApp_Usuario> GetUsuario()
        {
            var resultado = new ResultadoServicio<ResultadoApp_Usuario>();

            var resultadoUsuario = rules.GetUsuario();
            if (!resultadoUsuario.Ok)
            {
                resultado.Error = resultadoUsuario.Error;
                return resultado;
            }

            resultado.Return = new ResultadoApp_Usuario(resultadoUsuario.Return);
            return resultado;
        }

        public ResultadoServicio<bool> ValidarToken()
        {
            return rules.ValidarToken();
        }

        public ResultadoServicio<bool> ValidadoRenaper()
        {
            return rules.ValidadoRenaper();
        }

        public ResultadoServicio<bool> AplicacionBloqueada()
        {
            return rules.AplicacionBloqueada();
        }
    }
}