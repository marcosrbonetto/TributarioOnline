using System;
using System.Linq;

namespace UI_Internet.Api.Utils
{
    [Serializable]
    public class ResultadoServicio<Entity>
    {
        public Entity Return { get; set; }
        public string Error { get; set; }
        public bool Ok
        {
            get
            {
                return string.IsNullOrEmpty(Error);
            }
        }
    }
}