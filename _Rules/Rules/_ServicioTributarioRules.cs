using System;
using System.Linq;
using _Model;

namespace _Rules.Rules
{
    public class _ServicioTributarioRules
    {
        public Resultado<Object> GetCuitConsulta(string cuit)
        {
            var resultado = new Resultado<Object>();

            var client = new ServiceReferenceTributario.ServicioTributarioClient();
            try
            {
                client.Open();

                resultado.Return = client.getCuitConsulta(cuit);
            }
            catch (Exception e)
            {
                resultado.SetError(e);
            }
            finally
            {
                client.Close();
            }

            return resultado;
        }
    }
}