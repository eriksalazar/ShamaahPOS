using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShamaahPOS.Models
{
    public class DailyCorporationService
    {
        public int DailyCorporationServiceId { get; set; }
        public int CorporationServiceId { get; set; }
        
        public decimal DailyCorporationServiceAmount { get; set; }
        public string DailyCorporationServiceNote { get; set; }
        public DateTime DailyCorporationServiceDate { get; set; }

    }
}