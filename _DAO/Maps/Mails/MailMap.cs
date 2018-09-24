using System;
using System.Linq;
using _Model;
using _Model.Mails.Entities;

namespace _DAO.Maps.Mails
{
    class MailMap : BaseEntityMap<Mail>
    {
        public MailMap()
        {
            //Tabla
            Table("Mail");

            Map(x => x.Content, "Content").Not.Nullable();
            Map(x => x.KeyValue, "KeyValue").CustomType(typeof(Enums.Mail)).Not.Nullable();
        }
    }
}