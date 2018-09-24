using System;
using System.Linq;
using _Model.WSVecinoVirtual.Comandos;
using _Model.WSVecinoVirtual.Resultados;
using _Rules.Rules;
using _Rules;

namespace WS_Intranet.v0.Rules
{
    public class WSRules_BaseUsuario
    {
        private UsuarioLogueado usuarioLogeado;
        private readonly _VecinoVirtualUsuarioRules rules;

        public WSRules_BaseUsuario(UsuarioLogueado data)
        {
            usuarioLogeado = data;
            rules = new _VecinoVirtualUsuarioRules(data);
        }

        public UsuarioLogueado GetUsuarioLogueado()
        {
            return usuarioLogeado;
        }

        public ResultadoServicio<string> IniciarSesion(VVComando_IniciarSesion comando)
        {
            var resultado = new ResultadoServicio<string>();

            var resultadoIniciarSesion = rules.IniciarSesion(comando);
            if (!resultadoIniciarSesion.Ok)
            {
                resultado.Error = resultadoIniciarSesion.Error;
                return resultado;
            }

            resultado.Return = resultadoIniciarSesion.Return.Token;
            return resultado;
        }

        public ResultadoServicio<bool> CerrarSesion()
        {
            var resultado = new ResultadoServicio<bool>();

            var resultadoCerrarSesion = rules.CerrarSesion();
            if (!resultadoCerrarSesion.Ok)
            {
                resultado.Error = resultadoCerrarSesion.Error;
                return resultado;
            }

            resultado.Return = resultadoCerrarSesion.Return;
            return resultado;
        }

        public ResultadoServicio<int> GetIdUsuario()
        {
            var resultado = new ResultadoServicio<int>();

            var resultadoIdByToken = rules.GetIdByToken();
            if (!resultadoIdByToken.Ok)
            {
                resultado.Error = resultadoIdByToken.Error;
                return resultado;
            }

            resultado.Return = resultadoIdByToken.Return;
            return resultado;
        }

        public ResultadoServicio<VVResultado_Usuario> GetUsuario()
        {
            var resultado = new ResultadoServicio<VVResultado_Usuario>();

            var resultadoByToken = rules.GetByToken();
            if (!resultadoByToken.Ok)
            {
                resultado.Error = resultadoByToken.Error;
                return resultado;
            }

            resultado.Return = resultadoByToken.Return;
            return resultado;
        }

        public ResultadoServicio<bool> ValidarToken()
        {
            var resultado = new ResultadoServicio<bool>();

            var resultadoValidarToken = rules.ValidarToken();
            if (!resultadoValidarToken.Ok)
            {
                resultado.Return = false;
                return resultado;
            }

            resultado.Return = resultadoValidarToken.Return;
            return resultado;
        }

        public ResultadoServicio<bool> ValidadoRenaper()
        {
            var resultado = new ResultadoServicio<bool>();

            var resultadoValidadoRenaper = rules.ValidadoRenaper();
            if (!resultadoValidadoRenaper.Ok)
            {
                resultado.Error = resultadoValidadoRenaper.Error;
                return resultado;
            }

            resultado.Return = resultadoValidadoRenaper.Return;
            return resultado;
        }

        public ResultadoServicio<bool> AplicacionBloqueada()
        {
            var resultado = new ResultadoServicio<bool>();

            var resultadoAplicacionBloqueada = rules.AplicacionBloqueada();
            if (!resultadoAplicacionBloqueada.Ok)
            {
                resultado.Error = resultadoAplicacionBloqueada.Error;
                return resultado;
            }

            resultado.Return = resultadoAplicacionBloqueada.Return;
            return resultado;
        }
    }
}