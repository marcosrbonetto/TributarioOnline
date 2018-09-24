using System;
using System.Collections.Generic;
using System.Linq;
using _Model;
using _DAO.DAO;

namespace _Rules.Rules
{
    public class BaseRules<Entity> where Entity : BaseEntity
    {
        private UsuarioLogueado data;

        protected UsuarioLogueado getUsuarioLogueado()
        {
            return data;
        }

        private readonly BaseDAO<Entity> dao;

        public BaseRules()
        {
            dao = BaseDAO<Entity>.Instance;
        }

        public BaseRules(UsuarioLogueado data)
            : this()
        {
            this.data = data;
        }

        public virtual Resultado<Entity> Insert(Entity entity)
        {
            var result = ValidateInsert(entity);

            if (!result.Ok)
            {
                return result;
            }

            return dao.Insert(entity);
        }

        public virtual Resultado<Entity> ValidateInsert(Entity entity)
        {
            if (data != null)
            {
                entity.IdUsuarioCreador = getUsuarioLogueado().IdUsuario;
            }
            entity.FechaAlta = DateTime.Now;

            var result = new Resultado<Entity>();

            // Datos Necesarios
            var resultDatosNecesarios = ValidateDatosNecesarios(entity);
            if (!resultDatosNecesarios.Ok)
            {
                result.Error = resultDatosNecesarios.Error;
                return result;
            }

            if (!result.Ok)
            {
                return result;
            }

            result.Return = entity;
            return result;
        }

        public virtual Resultado<Entity> Update(Entity entity)
        {
            var result = ValidateUpdate(entity);
            if (!result.Ok)
            {
                return result;
            }
            return dao.Update(entity);
        }

        public virtual Resultado<Entity> ValidateUpdate(Entity entity)
        {
            entity.FechaModificacion = DateTime.Now;

            if (data != null)
            {
                entity.IdUsuarioModificador = getUsuarioLogueado().IdUsuario;
            }

            var result = new Resultado<Entity>();

            // Datos necesarios
            var resultDatosNecesarios = ValidateDatosNecesarios(entity);
            if (!resultDatosNecesarios.Ok)
            {
                result.Error = resultDatosNecesarios.Error;
                return result;
            }

            if (!result.Ok)
            {
                return result;
            }

            result.Return = entity;
            return result;
        }

        public virtual Resultado<Entity> Delete(Entity entity)
        {
            var result = ValidateDelete(entity);
            if (!result.Ok)
            {
                return result;
            }
            return dao.Update(entity);
        }

        public virtual Resultado<Entity> ValidateDelete(Entity entity)
        {
            if (data != null)
            {
                entity.IdUsuarioModificador = getUsuarioLogueado().IdUsuario;
            }
            entity.FechaBaja = DateTime.Now;

            var result = new Resultado<Entity>();

            // Datos necesarios 
            var resultDatosNecesarios = ValidateDatosNecesarios(entity);
            if (!resultDatosNecesarios.Ok)
            {
                result.Error = resultDatosNecesarios.Error;
                return result;
            }

            if (entity.Id <= 0)
            {
                result.Error = "La entidad nunca dada de alta";
                return result;
            }

            if (!result.Ok)
            {
                return result;
            }

            result.Return = entity;
            return result;
        }

        public virtual Resultado<Entity> DeleteById(int id)
        {
            var resultQuery = GetById(id);
            if (!resultQuery.Ok)
            {
                return resultQuery;
            }

            var entity = resultQuery.Return;
            if (entity.FechaAlta == null)
            {
                entity.FechaAlta = DateTime.Now;
            }

            return Delete(entity);
        }

        public Resultado<Entity> GetById(int id)
        {
            return dao.GetById(id);
        }

        public Resultado<Entity> GetByIdObligatorio(int id)
        {
            return dao.GetByIdObligatorio(id);
        }

        public Resultado<List<Entity>> GetById(List<int> ids)
        {
            return dao.GetById(ids);
        }

        public Resultado<List<Entity>> GetAll()
        {
            return dao.GetAll();
        }

        public Resultado<List<Entity>> GetAll(bool? dadosDeBaja)
        {
            return dao.GetAll(dadosDeBaja);
        }

        public Resultado<List<Entity>> GetAll(bool? dadosDeBaja, List<int> IdsArea)
        {
            return dao.GetAll(dadosDeBaja);
        }

        /* Validaciones */
        public virtual Resultado<Entity> ValidateDatosNecesarios(Entity entity)
        {
            var result = new Resultado<Entity>();

            //Fecha Alta
            if (entity.FechaAlta == null)
            {
                result.Error = "Falta la fecha de alta";
                return result;
            }

            //Usuario
            if (entity.IdUsuarioCreador <= 0)
            {
                result.Error = "Falta el usuario";
                return result;
            }

            result.Return = entity;
            return result;
        }

        public Resultado<List<T>> ProcedimientoAlmacenado<T>(string name)
        {
            return dao.ProcedimientoAlmacenado<T>(name);
        }
    }
}