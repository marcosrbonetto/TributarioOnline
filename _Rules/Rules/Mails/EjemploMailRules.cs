using System;
using System.Linq;
using _Model;
using _Model.Comandos.Mails;

namespace _Rules.Rules.Mails
{
    public class EjemploMailRules : BaseMailRules
    {
        public EjemploMailRules(UsuarioLogueado data)
            : base(data)
        {
        }

        public Resultado<bool> EnviarMailEjemplo(string mensaje)
        {
            var resultado = new Resultado<bool>();

            try
            {
                // Obtengo html
                var resultadoadoHtml = GetHtml(Enums.Mail.EjemploMail);
                if (!resultadoadoHtml.Ok)
                {
                    resultado.InfoError = resultadoadoHtml.InfoError;
                    return resultado;
                }

                if (string.IsNullOrEmpty(resultadoadoHtml.Return))
                {
                    resultado.InfoError = "Problemas con GetHtml";
                    return resultado;
                }

                var html = resultadoadoHtml.Return;

                // Usuario
                var resultadoByToken = new _VecinoVirtualUsuarioRules(GetUsuarioLogueado()).GetByToken();
                if (!resultadoByToken.Ok)
                {
                    resultado.Error = resultadoByToken.Error;
                    return resultado;
                }
                var usuario = resultadoByToken.Return;

                // Personalizo el html
                html = html.Replace("{vecino}", usuario.Apellido + ", " + usuario.Nombre);
                html = html.Replace("{mensaje}", mensaje);

                // Preparo el comando
                ComandoMail comando = new ComandoMail()
                {
                    Asunto = "Ejemplo",
                    Contenido = html,
                    EsHtml = true,
                    ReceptorMail = usuario.Email
                };

                // Mando mail
                var resultadoadoEnviar = EnviarEmail(comando);
                if (!resultadoadoEnviar.Ok)
                {
                    resultado.InfoError = "Error procesando al operacion";
                    return resultado;
                }

                resultado.Return = true;
                return resultado;

            }
            catch (Exception e)
            {
                resultado.InfoError = e;
            }

            return resultado;
        }
    }
}