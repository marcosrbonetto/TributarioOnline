using Newtonsoft.Json.Linq;
using RestSharp.Portable;
using RestSharp.Portable.HttpClient;
using System;
using System.Configuration;
using System.Linq;

namespace UI_Internet.Api.Utils
{
    public class RestCall
    {
        public static ResultadoServicio<T> CallConToken<T>(string url, Method metodo, string token, object body = null)
        {
            return Call<T>(url, metodo, token, false, body);
        }

        public static ResultadoServicio<T> CallConValidarApp<T>(string url, Method metodo, object body = null)
        {
            return Call<T>(url, metodo, null, true, body);
        }

        public static ResultadoServicio<T> Call<T>(string url, Method metodo, object body = null)
        {
            return Call<T>(url, metodo, null, false, body);
        }

        public static ResultadoServicio<T> Call<T>(string url, Method metodo, string token = null, bool validarApp = false, object body = null)
        {
            try
            {
                var client = ApiClient(url);
                var request = ApiRequest(metodo);

                if (client == null || request == null)
                {
                    return ErrorDefault<T>();
                }

                // Headers
                if (token != null)
                {
                    request.AddHeader("Token", token);
                }

                if (validarApp)
                {
                    request.AddHeader("Key", ConfigurationManager.AppSettings["APP_KEY"]);
                    request.AddHeader("Identificador", ConfigurationManager.AppSettings["APP_KEY_VECINO_VIRTUAL"]);
                }

                // Body
                if (body != null)
                {
                    request.AddBody(body);
                }

                IRestResponse response = client.Execute(request).Result;
                var json = JObject.Parse(response.Content);
                return json.ToObject<ResultadoServicio<T>>();

            }
            catch (Exception e)
            {
                return ErrorDefault<T>();
            }
        }

        public static RestClient ApiClient(string url)
        {
            return new RestClient(ConfigurationManager.AppSettings["URL_SERVER"] + "/" + url);
        }

        public static RestRequest ApiRequest(Method method)
        {
            var request = new RestRequest(method);

            request.AddHeader("Cache-Control", "no-cache");
            request.AddHeader("Content-Type", "application/json");

            return request;
        }

        private static ResultadoServicio<T> ErrorDefault<T>()
        {
            var ResultadoServicio = new ResultadoServicio<T>();
            ResultadoServicio.Error = "Error procesando la solicitud";
            return ResultadoServicio;
        }
    }
}