using System;
using System.Linq;

namespace WS_Internet.v0
{
    [Serializable]
    public class ResultadoServicio<Entity>
    {
        public Entity Return { get; set; }
        public string Error { get; set; }
        public bool Ok { get; set; }
    }
}