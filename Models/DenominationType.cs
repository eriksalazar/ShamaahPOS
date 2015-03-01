using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NPoco;

namespace ShamaahPOS.Models
{
    [TableName("DenominationType")]
    [PrimaryKey("DenominationTypeId")]
    public class DenominationType
    {
        [Column("DenominationTypeId")]
        public int DenominationTypeId { get; set; }
        [Column("DenominationTypeName")]
        public string DenominationTypeName { get; set; }
        [Column("IsActive")]
        public bool IsActive { get; set; }
    }
}