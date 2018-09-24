using System;
using System.Linq;
using FluentNHibernate.Mapping;
using _Model;

namespace _DAO.Maps
{
    class BaseEntityMap<Entity> : ClassMap<Entity> where Entity : BaseEntity
    {
        public BaseEntityMap()
        {
            Id(x => x.Id, "Id").GeneratedBy.Identity();
            Map(x => x.FechaAlta, "FechaAlta").Nullable();
            Map(x => x.FechaBaja, "FechaBaja").Nullable();
            Map(x => x.FechaModificacion, "FechaModificacion").Nullable();
            Map(x => x.IdUsuarioCreador, "IdUsuarioCreador").Not.Nullable();
            Map(x => x.IdUsuarioModificador, "IdUsuarioModificador").Nullable();
            Map(x => x.Observaciones, "Observaciones").Nullable().CustomType("StringClob").CustomSqlType("nvarchar(max)");
        }
    }
}