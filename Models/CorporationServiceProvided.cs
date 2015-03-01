using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NPoco;

namespace ShamaahPOS.Models
{
    [TableName("CorporationServiceProvided")]
    [PrimaryKey("CorporationServiceProvidedId")]
    public class CorporationServiceProvided
    {
        [Column("CorporationServiceProvidedId")]
        public int CorporationServiceProvidedId { get; set; }
        [Column("CorporationId")]
        public int CorporationId { get; set; }
        [Column("ServiceProvidedId")]
        public int ServiceProvidedId { get; set; }

    }
}