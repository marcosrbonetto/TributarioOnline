using System;
using System.Linq;

namespace _Model
{
    [Serializable]
    public class Resultado<Entity>
    {
        public Entity Return { get; set; }

        public string Error { get; set; }

        public object InfoError { get; set; }
        public bool Ok
        {
            get
            {
                return string.IsNullOrEmpty(Error);
            }
            set
            {
                Ok = value;
            }
        }

        public void SetError(object info)
        {
            this.Error = "Error procesando la solicitud";
            this.InfoError = info;
        }
    }
}