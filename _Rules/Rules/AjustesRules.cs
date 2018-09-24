using System;
using System.Linq;
using _DAO.DAO;
using _Model;
using _Model.Entities;

namespace _Rules.Rules
{
    public class AjustesRules : BaseRules<Ajustes>
    {
        private readonly AjustesDAO dao;

        public AjustesRules(UsuarioLogueado data)
            : base(data)
        {
            dao = AjustesDAO.Instance;
        }

        public Resultado<Ajustes> Get()
        {
            return dao.Get();
        }
    }
}