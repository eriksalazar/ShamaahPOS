using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.ComponentModel.DataAnnotations;
using NPoco;

namespace ShamaahPOS.Models
{
    public class DailyCorporationIncome 
    {
        public int DailyCorporationIncomeId { get; set; }
        public int? CompanyServiceProvidedId  { get; set; }
        [Display(Name= "Income Amount") ]
        [Required]
        public decimal DailyCorporationIncomeAmount { get; set; }
         [Display(Name = "Company Commission Amount")]
        public decimal DailyCorporationIncomeCompanyCommission { get; set; }
         [Display(Name = "Shamaah Commission Amount")]
        public decimal DailyCorporationIncomeCommission  { get; set; }
         [Display(Name = "Date")]
        public DateTime DailyCorporationIncomeDate  { get; set; }
         [Display(Name = "Manual Company Name")]
         public string ManualCompanyServiceName { get; set; }


    }

   
}