using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _Model.Comandos.Mails
{
    public class ComandoMail
    {
        public string ReceptorMail { get; set; }
        public string Asunto { get; set; }
        public string Contenido { get; set; }
        public bool EsHtml { get; set; }
        public List<ComandoMailAdjunto> Adjuntos { get; set; }

        public bool Validar()
        {
            if (string.IsNullOrEmpty(ReceptorMail)) return false;
            if (string.IsNullOrEmpty(Asunto)) return false;

            if (Adjuntos != null && Adjuntos.Count != 0)
            {
                foreach (var a in Adjuntos)
                {
                    if (a.Data == null) return false;
                    if (string.IsNullOrEmpty(a.Nombre)) return false;
                }
            }
            return true;
        }

        public void Encode()
        {
            if (!Validar()) return;
            ReceptorMail = HttpUtility.JavaScriptStringEncode(ReceptorMail);
            Asunto = HttpUtility.JavaScriptStringEncode(Asunto);

            if (Adjuntos != null && Adjuntos.Count != 0)
            {
                foreach (var a in Adjuntos)
                {
                    a.Nombre = HttpUtility.JavaScriptStringEncode(a.Nombre);
                }
            }
        }
    }
}