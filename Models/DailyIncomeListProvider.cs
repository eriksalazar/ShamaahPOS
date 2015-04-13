using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.SqlTypes;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Web;
using NPoco;

namespace ShamaahPOS.Models
{

    public class DailyIncomeListProvider 
    {
        private readonly IDatabase _db;
        public DailyIncomeListProvider()
        {
            IDatabase db = new Database("DefaultConnection");
            _db = db;
        }

        public DailyIncomeViewModel LoadList(int? month, int? year)
        {
            var data = _db.Fetch<DailyCorporationIncome>("exec dbo.getDailyCorporationIncomeList @0, @1, @2", month, year, 1);//TODO Change to CorporationId from selected corp on login

            var vm = new DailyIncomeViewModel
            {
                DailyCorporationIncomeList = data
            };
            return vm;
        }

       
    }

    public class DailyIncomeViewModel
    {
        public List<DailyCorporationIncome> DailyCorporationIncomeList;
    }

    public class DailyCorporationIncome
    {
        public DateTime DailyServiceDate { get; set; }
        public Decimal DailyIncomeAmountTotal { get; set; }
        public Decimal DailyCompanyCommissionTotal { get; set; }
        public Decimal DailyCorporationCommissionTotal { get; set; }
        public Decimal DailyCorporationServiceAmountTotal { get; set; }
        public Decimal DailyCorporationPayoutCommissionTotal { get; set; }
        public Decimal DailyCorporationPayoutAmountTotal { get; set; }
        public Decimal DailyCorporationWithdrawalsTotal { get; set; }
        public Decimal DailyCorporationExpensesTotal { get; set; }
        public Decimal DailyCashTotal { get; set; }
        public Decimal DailyExistingCashTotal { get; set; }
        public Decimal CashDifference { get; set; }
    }
}