using System;
using System.Linq;
using System.Net.Http.Headers;
using System.Web.Http;
using Newtonsoft.Json.Serialization;

namespace UI_Internet.Api.App
{
    public class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            var appXmlType = config.Formatters.XmlFormatter.SupportedMediaTypes.FirstOrDefault(t => t.MediaType == "application/xml");
            if (appXmlType != null)
            {
                config.Formatters.XmlFormatter.SupportedMediaTypes.Remove(appXmlType);
            }

            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/json"));
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            config.MapHttpAttributeRoutes();
        }
    }
}