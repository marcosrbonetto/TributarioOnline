using System;
using System.Linq;
using _Model.Mails.Entities;

namespace _DAO.DAO.Mails
{
    public class MailAjustesDAO : BaseDAO<MailAjustes>
    {
        private static MailAjustesDAO instance;

        public static MailAjustesDAO Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new MailAjustesDAO();
                }
                return instance;
            }
        }
    }
}