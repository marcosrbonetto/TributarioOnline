using System;
using System.Configuration;
using System.Linq;
using FluentNHibernate.Cfg;
using NHibernate;
using NHibernate.Context;
using FluentNHibernate.Cfg.Db;
using _Model;
using Configuration = NHibernate.Cfg.Configuration;

namespace _DAO
{
    public class SessionManager
    {
        private bool deployDatabase;
        private ISessionFactory sessionFactory;

        //Singleton
        private static SessionManager instance;
        public static SessionManager Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new SessionManager();
                }
                return instance;
            }
        }

        public ISessionFactory SessionFactory
        {
            get
            {
                return sessionFactory;
            }
        }

        private SessionManager()
        {
            Init();
        }

        //Iniciliza hibernate para trabajar con la DB
        private void Init()
        {
            deployDatabase = bool.Parse(ConfigurationManager.AppSettings["DEPLOY"]);

            //Connection String
            string connectionString = deployDatabase ?
                ConfigurationManager.ConnectionStrings["DB"].ConnectionString :
                ConfigurationManager.ConnectionStrings["DB_TEST"].ConnectionString;

            //Configuracion de Hibernate
            FluentConfiguration fc = Fluently.Configure()
                .ExposeConfiguration(BuildSchema)
                .Database(MsSqlConfiguration.MsSql2008.ConnectionString(connectionString).ShowSql());
            CreateMappings(fc);
            try
            {
                sessionFactory = fc.BuildSessionFactory();
            }
            catch (Exception e)
            {
                throw new Exception("Error inicializando");
            }
        }

        private static void CreateMappings(FluentConfiguration fmc)
        {
            (from a in AppDomain.CurrentDomain.GetAssemblies()
             select a into assemblies
             select assemblies).ToList().ForEach(a =>
             {
                 if (a.FullName.StartsWith("DAO"))
                 {
                     foreach (var type in a.DefinedTypes)
                     {
                         if (type.FullName.StartsWith("DAO.Maps") && !type.FullName.StartsWith("DAO.Maps.BaseEntityMap"))
                         {
                             fmc.Mappings(m => m.FluentMappings.Add(type));
                         }
                     }
                 }
             });
        }

        private void BuildSchema(Configuration config)
        {
            config.Properties.Add("current_session_context_class", "web");
            config.Properties.Add("cache.use_query_cache", "true");
        }

        /* Session General */
        public ISession GetSession()
        {
            if (otraSession != null && otraSession.IsOpen)
            {
                return otraSession;
            }

            ISession session;
            if (CurrentSessionContext.HasBind(sessionFactory))
            {
                session = sessionFactory.GetCurrentSession();
            }
            else
            {
                session = sessionFactory.OpenSession();
                session.CacheMode = CacheMode.Ignore;
                CurrentSessionContext.Bind(session);
            }
            return session;
        }

        public void EndSession()
        {
            var session = CurrentSessionContext.Unbind(sessionFactory);
            if (session != null && session.IsOpen)
            {

                session.Close();
                session.Dispose();
            }
        }

        /* Transaccion */
        private ITransaction transaction;

        public bool Transaction(Func<bool> action)
        {
            bool iniciado = InitTransaction();
            bool exito = action.Invoke();
            EndTransaction(iniciado, exito);
            return exito;
        }

        private bool InitTransaction()
        {
            //Inicio transaccion
            bool yoInicieLaTransaccion = false;
            if (transaction == null || !transaction.IsActive)
            {
                yoInicieLaTransaccion = true;
                transaction = GetSession().BeginTransaction();
                transaction.Begin();
            }
            return yoInicieLaTransaccion;
        }

        private Resultado<object> EndTransaction(bool yoInicie, bool ok)
        {
            var result = new Resultado<object>();
            if (!yoInicie || transaction == null || !transaction.IsActive)
            {
                return result;
            }

            //Fin Transaccion
            try
            {
                if (!ok)
                {
                    if (!transaction.WasRolledBack)
                    {
                        transaction.Rollback();
                    }
                }
                else
                {
                    if (!transaction.WasCommitted)
                    {
                        transaction.Commit();
                    }
                }
                transaction.Dispose();
                transaction = null;
            }
            catch (Exception e)
            {
                result.SetError(e);
            }
            return result;
        }

        /* Otra Session */
        private ISession otraSession;

        public bool EjecutarEnOtraSession(Func<bool> func)
        {
            //Inicio la Sesion
            otraSession = sessionFactory.OpenSession();
            var transaction = otraSession.BeginTransaction();
            transaction.Begin();

            //Ejecuto la operacion
            var result = func.Invoke();

            //Cierro la Sesion
            if (result)
            {
                otraSession.Transaction.Commit();
            }
            else
            {
                otraSession.Transaction.Rollback();
            }
            otraSession.Close();
            otraSession.Dispose();
            otraSession = null;
            return result;
        }
    }
}