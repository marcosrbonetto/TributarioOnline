using System;
using System.Linq;

namespace _Model.Resultados
{
    [Serializable]
    public class Resultado_Base<Entidad> where Entidad : BaseEntity
    {
        public virtual int Id { get; set; }
        public virtual DateTime? FechaAlta { get; set; }
        public virtual string FechaAltaString { get; set; }
        public virtual DateTime? FechaBaja { get; set; }
        public virtual string FechaBajaString { get; set; }
        public virtual DateTime? FechaModificacion { get; set; }
        public virtual string FechaModificacionString { get; set; }
        public virtual string Observaciones { get; set; }
        public virtual int IdUsuarioCreador { get; set; }
        public virtual int? IdUsuarioModificador { get; set; }

        public Resultado_Base()
        {
        }

        public Resultado_Base(Entidad baseEntity)
        {
            if (baseEntity == null)
            {
                return;
            }

            Id = baseEntity.Id;

            FechaAlta = baseEntity.FechaAlta;
            var fechaAltaString = Utils.DateTimeToString(FechaAlta);
            if (fechaAltaString == null)
            {
                fechaAltaString = "";
            }
            FechaAltaString = fechaAltaString;

            FechaBaja = baseEntity.FechaBaja;
            var fechaBajaString = Utils.DateTimeToString(FechaBaja);
            if (fechaBajaString == null)
            {
                fechaBajaString = "";
            }
            FechaBajaString = fechaBajaString;

            FechaModificacion = baseEntity.FechaModificacion;
            var fechaModificacionString = Utils.DateTimeToString(FechaModificacion);
            if (fechaModificacionString == null)
            {
                fechaModificacionString = "";
            }
            FechaModificacionString = fechaModificacionString;

            Observaciones = baseEntity.Observaciones;

            IdUsuarioCreador = baseEntity.IdUsuarioCreador;
            IdUsuarioModificador = baseEntity.IdUsuarioModificador;
        }
    }
}
