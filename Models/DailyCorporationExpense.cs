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
        [Column("DailyCorporationExpenseDate")]
        public DateTime DailyCorporationExpenseDate { get; set; }
        [Column("DailyCorporationExpenseAmount")]
        public decimal? DailyCorporationExpenseAmount { get; set; }
        [Column("DailyCorporationExpenseNote")]
        public string DailyCorporationExpenseNote { get; set; }
    }
    public class DailyCorporationExpenseRow
    {
        public int DailyCorporationExpenseId { get; set; }
        public int ExpenseTypeId { get; set; }
        public int CorporationId { get; set; }
        public String ExpenseTypeName { get; set; }
        public DateTime DailyCorporationExpenseDate { get; set; }
        public decimal? DailyCorporationExpenseAmount { get; set; }
        public string DailyCorporationExpenseNote { get; set; }
    }
}