using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace UI_Internet.Api.Controllers.ActionFilters
{
    public class JsonContent : HttpContent
    {
        private readonly MemoryStream stream = new MemoryStream();

        public JsonContent(object value)
        {
            var serializerSettings = new JsonSerializerSettings();
            serializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var writer = new JsonTextWriter(new StreamWriter(stream));
            writer.Formatting = Formatting.Indented;

            var content = JsonConvert.SerializeObject(
                value, new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                });

            writer.WriteRaw(content);
            writer.Flush();
            stream.Position = 0;
        }

        protected override Task SerializeToStreamAsync(Stream stream, TransportContext context)
        {
            return stream.CopyToAsync(stream);
        }

        protected override bool TryComputeLength(out long length)
        {
            length = stream.Length;
            return true;
        }
    }
}