using System;
using System.Collections.Generic;
using System.Linq;
using NHibernate;
using NHibernate.Criterion;
using NHibernate.Transform;
using _Model;

namespace _DAO.DAO
{
    public class BaseDAO<Entity> where Entity : BaseEntity
    {
        private static BaseDAO<Entity> instance;

        public static BaseDAO<Entity> Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new BaseDAO<Entity>();
                }
                return instance;
            }
        }

        public ISession GetSession()
        {
            return SessionManager.Instance.GetSession();
        }

        public bool Transaction(Func<bool> action)
        {
            return SessionManager.Instance.Transaction(action);
        }

        public virtual Resultado<Entity> Insert(Entity entity)
        {
            var result = new Resultado<Entity>();
            Transaction(() =>
            {
                //Ejecuto el insert
                try
                {
                    GetSession().Save(entity);
                    GetSession().Flush();
                    result.Return = entity;
                }
                catch (Exception e)
                {
                    result.SetError(e);
                }

                return result.Ok;
            });
            return result;
        }

        public Resultado<bool> ValidarExiste(int id)
        {
            var result = new Resultado<bool>();

            var session = GetSession().QueryOver<Entity>();
            result.Return = session.Where(x => x.Id == id && x.FechaBaja == null).RowCount() != 0;
            return result;
        }

        public Resultado<List<Entity>> Insert(List<Entity> entities)
        {
            var result = new Resultado<List<Entity>>();

            Transaction(() =>
            {
                //Ejecuto el update
                foreach (var entity in entities)
                {
                    try
                    {
                        GetSession().Save(entity);
                    }
                    catch (Exception e)
                    {
                        result.SetError(e);
                    }

                    if (result.Ok)
                    {
                        result.Return = entities;
                        GetSession().Flush();
                    }
                }

                return result.Ok;
            });

            return result;
        }

        public Resultado<Entity> Update(int id, Entity entity)
        {
            var result = new Resultado<Entity>();

            Transaction(() =>
            {
                //Ejecturo el update
                try
                {
                    entity.Id = id;
                    GetSession().Merge(entity);
                    GetSession().Flush();
                    result.Return = entity;
                }
                catch (Exception e)
                {
                    result.SetError(e);
                }

                return result.Ok;
            });

            return result;
        }

        public Resultado<Entity> Update(Entity entity)
        {
            return Update(entity.Id, entity);
        }

        public Resultado<List<Entity>> Update(List<Entity> entities)
        {
            var result = new Resultado<List<Entity>>();

            Transaction(() =>
            {
                //Ejecuto el update
                foreach (var entity in entities)
                {
                    try
                    {
                        GetSession().Merge(entity);
                    }
                    catch (Exception e)
                    {
                        result.SetError(e);
                    }

                    if (result.Ok)
                    {
                        result.Return = entities;
                        GetSession().Flush();
                    }
                }

                return result.Ok;
            });

            return result;
        }

        public Resultado<Entity> Delete(Entity entity)
        {
            var result = new Resultado<Entity>();

            Transaction(() =>
            {

                //Ejecuto el delete
                try
                {
                    GetSession().Delete(entity);
                    GetSession().Flush();
                }
                catch (Exception e)
                {
                    result.SetError(e);
                }

                return result.Ok;
            });

            return result;
        }

        public Resultado<List<Entity>> Delete(List<Entity> entities)
        {
            var result = new Resultado<List<Entity>>();

            Transaction(() =>
            {

                //Ejecuto el delete
                foreach (var entity in entities)
                {
                    try
                    {
                        GetSession().Delete(entity);
                    }
                    catch (Exception e)
                    {
                        result.SetError(e);
                    }

                    if (result.Ok)
                    {
                        result.Return = entities;
                        GetSession().Flush();
                    }
                }

                return result.Ok;
            });

            return result;
        }

        public void Evict(Entity entity)
        {
            GetSession().Evict(entity);
        }

        public Resultado<Entity> GetById(int id)
        {
            var result = new Resultado<Entity>();

            try
            {
                result.Return = GetSession().Get<Entity>(id);
            }
            catch (Exception e)
            {
                result.SetError(e);
            }

            return result;
        }

        public virtual Resultado<Entity> GetByIdObligatorio(int id)
        {
            var result = new Resultado<Entity>();

            try
            {
                var obj = GetSession().Get<Entity>(id);
                result.Return = obj;

                if (result.Return == null)
                {
                    result.Error = "La entidad consultada no existe";
                    return result;
                }
                if (result.Return.FechaBaja != null)
                {
                    result.Error = "La entidad consultada se encuentra dada de baja";
                    return result;
                }

            }
            catch (Exception e)
            {
                result.SetError(e);
            }

            return result;
        }

        public Resultado<List<Entity>> GetById(List<int> ids)
        {
            var result = new Resultado<List<Entity>>();

            try
            {
                var session = GetSession().QueryOver<Entity>();
                session.Where(x => x.Id.IsIn(ids));
                result.Return = new List<Entity>(session.List());
            }
            catch (Exception e)
            {
                result.SetError(e);
            }

            return result;
        }

        public Resultado<List<Entity>> GetAll()
        {
            return GetAll(null);
        }

        public Resultado<List<Entity>> GetAll(bool? dadosDeBaja)
        {
            var result = new Resultado<List<Entity>>();

            try
            {
                var query = GetSession().QueryOver<Entity>();

                if (dadosDeBaja.HasValue)
                {
                    if (dadosDeBaja.Value)
                    {
                        query.Where(x => x.FechaBaja != null);
                    }
                    else
                    {
                        query.Where(x => x.FechaBaja == null);
                    }
                }
                result.Return = new List<Entity>(query.List());
            }
            catch (Exception e)
            {
                result.SetError(e);
            }

            return result;
        }
        public bool EjecutarEnOtraSession(Func<bool> func)
        {
            return SessionManager.Instance.EjecutarEnOtraSession(func);
        }

        public Resultado<List<T>> ProcedimientoAlmacenado<T>(string name)
        {
            var resultado = new Resultado<List<T>>();

            try
            {
                IQuery query = GetSession().CreateSQLQuery("exec " + name);

                if (!typeof(T).IsPrimitive && typeof(T) != typeof(Decimal) && typeof(T) != typeof(String))
                {
                    query.SetResultTransformer(Transformers.AliasToBean<T>());
                    resultado.Return = query.List<T>().ToList();
                }
                else
                {
                    var data = new List<T>();
                    foreach (var item in query.List<object>().ToList())
                    {
                        data.Add((T)item);
                    }
                    resultado.Return = data;
                }
            }
            catch (Exception e)
            {
                resultado.SetError(e);
            }

            return resultado;
        }
    }
}