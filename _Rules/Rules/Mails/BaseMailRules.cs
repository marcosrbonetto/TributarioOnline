using System;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using _DAO.DAO.Mails;
using _Model;
using _Model.Comandos.Mails;

namespace _Rules.Rules.Mails
{
    public class BaseMailRules
    {

        private UsuarioLogueado data;
        private readonly MailAjustesDAO mailAjustesDAO;

        protected UsuarioLogueado GetUsuarioLogueado()
        {
            return data;
        }

        public BaseMailRules(UsuarioLogueado data)
        {
            this.data = data;
            this.mailAjustesDAO = MailAjustesDAO.Instance;
        }

        protected Resultado<bool> EnviarEmail(ComandoMail comando)
        {
            var resultado = new Resultado<bool>();

            try
            {
                if (!comando.Validar())
                {
                    resultado.Error = "Error con el comando";
                    return resultado;
                }

                comando.Encode();

                MailMessage message = new MailMessage();
                message.To.Add(comando.ReceptorMail);

                //Mando el mail
                message.Subject = comando.Asunto;
                if (string.IsNullOrEmpty(comando.Contenido))
                {
                    message.Body = "";
                }
                else
                {
                    message.Body = comando.Contenido;
                }

                if (comando.EsHtml)
                {
                    message.IsBodyHtml = true;
                }


                if (comando.Adjuntos != null)
                {
                    comando.Adjuntos.ForEach(x => message.Attachments.Add(new Attachment(new MemoryStream(x.Data), x.Nombre)));
                }

                //Prioridad
                message.Priority = MailPriority.Normal;

                Task.Run(async () => await SendEmail(message));

                resultado.Return = true;
            }
            catch (Exception e)
            {
                resultado.InfoError = e;
            }

            return resultado;
        }

        public async Task SendEmail(MailMessage mailMessage)
        {
            var smtpClient = new SmtpClient();
            smtpClient.SendCompleted += (s, e) =>
            {
                smtpClient.Dispose();
            };
            await smtpClient.SendMailAsync(mailMessage);
        }

        protected Resultado<string> GetHtml(Enums.Mail mail)
        {
            var resultado = new Resultado<string>();

            var resultadoMail = new MailRules(GetUsuarioLogueado()).GetByKeyValue(mail);
            if (!resultadoMail.Ok || resultadoMail.Return == null || string.IsNullOrEmpty(resultadoMail.Return.Content))
            {
                resultado.InfoError = "Verificar mail KeyValue " + mail.ToString();
                return resultado;
            }

            var resultadoAjustesMail = mailAjustesDAO.GetAll();
            if (!resultadoAjustesMail.Ok || resultadoAjustesMail.Return == null || resultadoAjustesMail.Return.FirstOrDefault() == null)
            {
                resultado.InfoError = "Verificar mail ajustes";
                return resultado;
            }

            var html = resultadoMail.Return.Content;
            var ajustes = resultadoAjustesMail.Return.FirstOrDefault();

            html = html.Replace("{fecha}", Utils.DateTimeToString(DateTime.Now));

            html = html.Replace("{muni-nombre}", ajustes.MuniNombre);
            html = html.Replace("{muni-imagen}", ajustes.MuniImagen);
            html = html.Replace("{muni-url}", ajustes.MuniUrl);

            html = html.Replace("{sistema-nombre}", ajustes.SistemaNombre);
            html = html.Replace("{sistema-imagen}", ajustes.SistemaImagen);
            html = html.Replace("{sistema-url}", ajustes.SistemaUrl);

            html = html.Replace("{facebook}", ajustes.Facebook);
            html = html.Replace("{twitter}", ajustes.Instagram);
            html = html.Replace("{instagram}", ajustes.Twitter);
            html = html.Replace("{youtube}", ajustes.Youtube);

            resultado.Return = html;

            return resultado;
        }
    }
}