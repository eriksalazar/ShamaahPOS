using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.AccessControl;
using System.Web;
using NPoco;

namespace ShamaahPOS.Models
{
    [TableName("DailyCorporationExpense")]
    [PrimaryKey("DailyCorporationExpenseId")]
    public class DailyCorporationExpense
    {
         [Column("DailyCorporationExpenseId")]
        public int DailyCorporationExpenseId { get; set; }
        [Column("ExpenseTypeId")]
        public int ExpenseTypeId { get; set; }
        [Column("CorporationId")]
        public int CorporationId { get; set; }
        [Column("DailyCorporationDate")]
        public DateTime DailyCorporationDate { get; set; }
        [Column("DailyCorporationExenseAmount")]
        public decimal DailyCorporationExenseAmount { get; set; }
        [Column("DailyCorporationExpenseNote")]
        public string DailyCorporationExpenseNote { get; set; }
    }
}