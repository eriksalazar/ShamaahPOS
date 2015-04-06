using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShamaahPOS.Models
{
    public class DailyCorporationServiceViewModel
    {
        public DailyCompanyServiceIncomeRow[] DailyCompanyServiceIncomes;
        public DailyCorporationCashDrawerRow[] DailyCorporationCashDrawers;
        public DailyCorporationServiceIncomeRow[] DailyCorporationServiceIncomes;
        public DailyCompanyServiceIncomeRow[] DailyCompanyPayouts;
        public decimal BankDeposit;
        public decimal MoneyTransferCancelled;
        public string MoneyTransferCancelledNote;
        public DailyCorporationExpense[] DailyCorporationExpenses;
        public DailyCorporationReconciliation[] DailyCorporationReconciliations;
    }
}