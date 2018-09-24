using System;
using System.Linq;

namespace _Model
{
    [Serializable]
    public abstract class BaseEntity
    {
        public virtual int Id { get; set; }
        public virtual DateTime? FechaAlta { get; set; }
        public virtual DateTime? FechaBaja { get; set; }
        public virtual DateTime? FechaModificacion { get; set; }
        public virtual string Observaciones { get; set; }
        public virtual int IdUsuarioCreador { get; set; }
        public virtual int? IdUsuarioModificador { get; set; }
    }
}