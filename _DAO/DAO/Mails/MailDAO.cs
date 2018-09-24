using System;
using System.Linq;
using _Model;
using _Model.Mails.Entities;

namespace _DAO.DAO.Mails
{
    public class MailDAO : BaseDAO<Mail>
    {
        private static MailDAO instance;

        public static MailDAO Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new MailDAO();
                }
                return instance;
            }
        }

        public Resultado<Mail> GetByKeyValue(Enums.Mail keyValue)
        {
            var result = new Resultado<Mail>();

            try
            {
                var query = GetSession().QueryOver<Mail>();
                query.Where(x => x.KeyValue == keyValue);

                result.Return = query.List().FirstOrDefault();
            }
            catch (Exception e)
            {
                result.InfoError = e;
            }

            return result;
        }
    }
}