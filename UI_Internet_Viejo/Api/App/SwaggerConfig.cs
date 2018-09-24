using System;
using System.Collections.Generic;
using System.Configuration;
using System.Web.Http;
using System.Web.Http.Description;
using Swashbuckle.Application;
using Swashbuckle.Swagger;

namespace UI_Internet.Api.App
{
    public class SwaggerConfig
    {
        private const string ASSEMBLY_NAME = "UI_Internet";

        private static List<string> urlsSinToken = new List<string>(new string[] {
            "Api/Ajustes/AppData",
            "Api/Usuario/IniciarSesion"
        });

        private static List<string> urlsConValidarApp = new List<string>(new string[] {
            "Api/Ajustes/AppData"
        });

        public static void Register()
        {
            GlobalConfiguration.Configuration
                .EnableSwagger(c =>
                {
                    c.PrettyPrint();
                    c.SingleApiVersion("v1", ASSEMBLY_NAME + " " + ConfigurationManager.AppSettings["APP_NAME"]);
                    c.OperationFilter<AddRequiredHeaderParameter>();
                    c.IncludeXmlComments(String.Format(@"{0}\bin\\Api\\Resources\\Documentacion.XML", System.AppDomain.CurrentDomain.BaseDirectory));
                })
                .EnableSwaggerUi(c =>
                {
                    var thisAssembly = typeof(SwaggerConfig).Assembly;

                    c.DocumentTitle(ASSEMBLY_NAME + " " + ConfigurationManager.AppSettings["APP_NAME"]);
                    c.InjectStylesheet(thisAssembly, ASSEMBLY_NAME + ".Api.Resources.Swagger.css");
                    c.InjectJavaScript(thisAssembly, ASSEMBLY_NAME + ".Api.Resources.Swagger.js");
                    c.EnableDiscoveryUrlSelector();
                });
        }

        public class AddRequiredHeaderParameter : IOperationFilter
        {
            public void Apply(Operation operation, SchemaRegistry schemaRegistry, ApiDescription apiDescription)
            {
                if (operation.parameters == null)
                {
                    operation.parameters = new List<Parameter>();
                }

                AddHeaderByMethod(operation.parameters, apiDescription.RelativePath);
            }

            private void AddHeaderByMethod(IList<Parameter> parametros, string url)
            {
                AddToken(parametros, url);
                AddValidarApp(parametros, url);
            }

            private void AddToken(IList<Parameter> parametros, string url)
            {
                if (urlsSinToken.Contains(url)) return;

                parametros.Add(new Parameter
                {
                    name = "Token",
                    @in = "header",
                    type = "string",
                    description = "Token",
                    required = true
                });
            }
            private void AddValidarApp(IList<Parameter> parametros, string url)
            {
                if (!urlsConValidarApp.Contains(url)) return;

                parametros.Add(new Parameter
                {
                    name = "Identificador",
                    @in = "header",
                    type = "string",
                    description = "Identificador",
                    required = true
                });

                parametros.Add(new Parameter
                {
                    name = "Key",
                    @in = "header",
                    type = "string",
                    description = "Key",
                    required = true
                });
            }
        }
    }
}