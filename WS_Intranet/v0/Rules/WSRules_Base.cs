using System;
using System.Linq;
using _Model;
using _Rules.Rules;
using _Rules;

namespace WS_Intranet.v0.Rules
{
    public class WSRules_Base<Entity> where Entity : BaseEntity
    {
        private readonly BaseRules<Entity> rules;

        private UsuarioLogueado data;

        private WSRules_Base()
        {
            rules = new BaseRules<Entity>(data);
        }

        public WSRules_Base(UsuarioLogueado data)
            : this()
        {
            this.data = data;
        }

        protected UsuarioLogueado getUsuarioLogueado()
        {
            return data;
        }

        protected void setUsuarioLogueado(UsuarioLogueado data)
        {
            this.data = data;
        }
    }
}