using System;
using System.Linq;
using _Model;
using _Model.Entities;

namespace _DAO.DAO
{
    public class AjustesDAO : BaseDAO<Ajustes>
    {
        private static AjustesDAO instance;

        public static AjustesDAO Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new AjustesDAO();
                }
                return instance;
            }
        }

        public Resultado<Ajustes> Get()
        {
            var result = new Resultado<Ajustes>();

            try
            {
                var query = GetSession().QueryOver<Ajustes>();
                result.Return = query.Where(x => x.FechaBaja == null).OrderBy(x => x.FechaAlta).Desc.List().First();
            }
            catch (Exception e)
            {
                result.SetError(e);
            }

            return result;
        }
    }
}