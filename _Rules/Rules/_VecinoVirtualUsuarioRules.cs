using System;
using System.Configuration;
using System.Linq;
using _Model;
using _Model.WSVecinoVirtual.Comandos;
using _Model.WSVecinoVirtual.Resultados;

namespace _Rules.Rules
{
    public class _VecinoVirtualUsuarioRules
    {
        private readonly string appKey = ConfigurationManager.AppSettings["APP_KEY_VECINO_VIRTUAL"];
        private readonly string baseUrl = ConfigurationManager.AppSettings["URL_WS_VECINO_VIRTUAL"];

        private UsuarioLogueado data;

        public _VecinoVirtualUsuarioRules(UsuarioLogueado data)
        {
            this.data = data;
        }

        protected UsuarioLogueado GetUsuarioLogueado()
        {
            return data;
        }

        public Resultado<VVResultado_Usuario> IniciarSesion(VVComando_IniciarSesion comando)
        {
            var resultado = new Resultado<VVResultado_Usuario>();

            try
            {
                var url = baseUrl + "/v1/Usuario/IniciarSesion";
                var resultadoIniciarSesion = RestCall.CallPut<VVResultado_Usuario>(url, comando);

                if (!resultadoIniciarSesion.Ok)
                {
                    resultado.Error = resultadoIniciarSesion.Error;
                    return resultado;
                }

                resultado.Return = resultadoIniciarSesion.Return;
            }
            catch (Exception e)
            {
                resultado.SetError(e);
            }

            return resultado;
        }

        public Resultado<bool> CerrarSesion()
        {
            return CerrarSesion(data.Token);
        }

        public Resultado<bool> CerrarSesion(string token)
        {
            var resultado = new Resultado<bool>();

            try
            {
                var url = baseUrl + "/v1/Usuario/CerrarSesion?token=" + token;
                var resultadoCerrarSesion = RestCall.CallPut<bool?>(url);
                if (!resultadoCerrarSesion.Ok)
                {
                    resultado.Error = resultadoCerrarSesion.Error;
                    return resultado;
                }

                resultado.Return = true;
            }
            catch (Exception e)
            {
                resultado.SetError(e);
            }

            return resultado;
        }

        public Resultado<int> GetIdByToken()
        {
            return GetIdByToken(data.Token);
        }

        public Resultado<int> GetIdByToken(string token)
        {
            var resultado = new Resultado<int>();

            try
            {
                var url = baseUrl + "/v1/Usuario/GetId?token=" + token;

                var resultadoId = RestCall.CallGet<int?>(url);
                if (!resultadoId.Ok)
                {
                    resultado.Error = resultadoId.Error;
                    return resultado;
                }

                resultado.Return = resultadoId.Return.Value;
            }
            catch (Exception e)
            {
                resultado.SetError(e);
            }

            return resultado;
        }

        public Resultado<VVResultado_Usuario> GetByToken()
        {
            return GetByToken(data.Token);
        }

        public Resultado<VVResultado_Usuario> GetByToken(string token)
        {
            var resultado = new Resultado<VVResultado_Usuario>();

            try
            {
                var url = baseUrl + "/v1/Usuario?token=" + token;
                var resultadoUsuario = RestCall.Call<VVResultado_Usuario>(url, RestSharp.Portable.Method.GET);
                if (!resultadoUsuario.Ok)
                {
                    resultado.Error = resultadoUsuario.Error;
                    return resultado;
                }

                resultado.Return = resultadoUsuario.Return;
            }
            catch (Exception e)
            {
                resultado.SetError(e);
            }

            return resultado;
        }

        public Resultado<bool> ValidarToken()
        {
            return ValidarToken(data.Token);
        }

        public Resultado<bool> ValidarToken(string token)
        {
            var resultado = new Resultado<bool>();

            try
            {
                var url = baseUrl + "/v1/Usuario/ValidarToken?token=" + token;

                var resultadoValidarToken = RestCall.CallGet<bool?>(url);
                if (!resultadoValidarToken.Ok)
                {
                    resultado.Error = resultadoValidarToken.Error;
                    return resultado;
                }

                resultado.Return = resultadoValidarToken.Return.Value;
            }
            catch (Exception e)
            {
                resultado.SetError(e);
            }

            return resultado;
        }

        public Resultado<bool> ValidadoRenaper()
        {
            return ValidadoRenaper(data.Token);
        }

        public Resultado<bool> ValidadoRenaper(string token)
        {
            var resultado = new Resultado<bool>();

            try
            {
                var url = baseUrl + "/v1/Usuario/ValidadoRenaper?token=" + token;
                var resultadoValidadoRenaper = RestCall.Call<bool?>(url, RestSharp.Portable.Method.GET);
                if (!resultadoValidadoRenaper.Ok)
                {
                    resultado.Error = resultadoValidadoRenaper.Error;
                    return resultado;
                }

                resultado.Return = resultadoValidadoRenaper.Return.Value;
            }
            catch (Exception e)
            {
                resultado.SetError(e);
            }

            return resultado;
        }

        public Resultado<bool> AplicacionBloqueada()
        {
            return AplicacionBloqueada(data.Token);
        }

        public Resultado<bool> AplicacionBloqueada(string token)
        {
            var resultado = new Resultado<bool>();

            try
            {
                var url = baseUrl + "/v1/Usuario/AplicacionBloqueada?token=" + token + "&app=" + appKey;
                var resultadoAplicacionBloqueada = RestCall.Call<bool>(url, RestSharp.Portable.Method.GET);
                if (!resultadoAplicacionBloqueada.Ok)
                {
                    resultado.Error = resultadoAplicacionBloqueada.Error;
                    return resultado;
                }

                resultado.Return = resultadoAplicacionBloqueada.Return;
            }
            catch (Exception e)
            {
                resultado.SetError(e);
            }

            return resultado;
        }
    }
}