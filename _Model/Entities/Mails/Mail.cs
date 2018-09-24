using System;
using System.Linq;

namespace _Model.Mails.Entities
{
    public class Mail : BaseEntity
    {
        public virtual string Content { get; set; }
        public virtual Enums.Mail KeyValue { get; set; }
    }
}