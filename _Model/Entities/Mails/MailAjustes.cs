using System;
using System.Linq;

namespace _Model.Mails.Entities
{
    public class MailAjustes : BaseEntity
    {
        public virtual string MuniNombre { get; set; }
        public virtual string MuniImagen { get; set; }
        public virtual string MuniUrl { get; set; }

        public virtual string SistemaNombre { get; set; }
        public virtual string SistemaImagen { get; set; }
        public virtual string SistemaUrl { get; set; }

        public virtual string Facebook { get; set; }
        public virtual string Instagram { get; set; }
        public virtual string Twitter { get; set; }
        public virtual string Youtube { get; set; }
    }
}