using System;
using System.Linq;
using _Model.Mails.Entities;

namespace _DAO.Maps.Mails
{
    class MailAjustesMap : BaseEntityMap<MailAjustes>
    {
        public MailAjustesMap()
        {
            //Tabla
            Table("MailAjustes");

            Map(x => x.MuniNombre, "MuniNombre").Not.Nullable();
            Map(x => x.MuniImagen, "MuniImagen").Not.Nullable();
            Map(x => x.MuniUrl, "MuniUrl").Not.Nullable();
            Map(x => x.SistemaNombre, "SistemaNombre").Not.Nullable();
            Map(x => x.SistemaImagen, "SistemaImagen").Not.Nullable();
            Map(x => x.SistemaUrl, "SistemaUrl").Not.Nullable();
            Map(x => x.Facebook, "Facebook").Not.Nullable();
            Map(x => x.Instagram, "Instagram").Not.Nullable();
            Map(x => x.Twitter, "Twitter").Not.Nullable();
            Map(x => x.Youtube, "Youtube").Not.Nullable();
        }
    }
}