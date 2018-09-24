using System;
using System.Linq;
using _Model.Entities;

namespace _DAO.Maps
{
    class AjustesMap : BaseEntityMap<Ajustes>
    {
        public AjustesMap()
        {
            Table("Ajustes");
            ReadOnly();

            Map(x => x.App, "App");
        }
    }
}