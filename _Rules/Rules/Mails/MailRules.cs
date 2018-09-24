using System;
using System.Linq;
using _DAO.DAO.Mails;
using _Model;
using _Model.Mails.Entities;

namespace _Rules.Rules.Mails
{
    public class MailRules : BaseRules<Mail>
    {
        private readonly MailDAO dao;

        public MailRules(UsuarioLogueado data)
            : base(data)
        {
            dao = MailDAO.Instance;
        }

        public Resultado<Mail> GetByKeyValue(Enums.Mail keyValue)
        {
            return dao.GetByKeyValue(keyValue);
        }
    }
}