using Newtonsoft.Json.Linq;
using RestSharp.Portable;
using RestSharp.Portable.HttpClient;
using System;
using System.Linq;
using _Model.WSVecinoVirtual;

namespace _Rules
{
    public class RestCall
    {
        public static RestClient ApiClient(string url)
        {
            var client = new RestClient(url);
            return client;
        }

        public static RestRequest ApiRequest(Method method)
        {
            var request = new RestRequest(method);
            request.AddHeader("Cache-Control", "no-cache");
            request.AddHeader("Content-Type", "application/json");
            return request;
        }

        public static VVResult<T> CallGet<T>(string url)
        {
            return Call<T>(url, Method.GET, null);
        }

        public static VVResult<T> CallPost<T>(string url, object body = null)
        {
            return Call<T>(url, Method.POST, body);
        }

        public static VVResult<T> CallPut<T>(string url, object body = null)
        {
            return Call<T>(url, Method.PUT, body);
        }

        public static VVResult<T> Call<T>(string url, Method metodo, object body = null)
        {
            try
            {
                var client = ApiClient(url);
                var request = ApiRequest(metodo);
                if (client == null || request == null)
                {
                    var resultado = new VVResult<T>();
                    resultado.Error = "Error procesando la solicitud";
                    return resultado;
                }

                if (body != null)
                {
                    request.AddBody(body);
                }

                IRestResponse response = client.Execute(request).Result;
                var json = JObject.Parse(response.Content);

                //Devuelvo
                return json.ToObject<VVResult<T>>();

            }
            catch (Exception e)
            {
                var resultado = new VVResult<T>();
                resultado.Error = "Error procesando la solicitud";
                return resultado;
            }
        }
    }
}