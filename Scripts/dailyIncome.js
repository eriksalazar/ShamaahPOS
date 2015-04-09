function formatCurrency(value) {
    return "$" + value.toFixed(2);
}

define(['knockout', 'lodash', 'DailyIncome/dailyCompanyIncomesVm', 'DailyIncome/dailyCorpIncomesVm', 'DailyIncome/dailyCorpCashDrawerVm', 'DailyIncome/dailyCorpWithdrawalVm', 'DailyIncome/dailyCorpReconciliationVm'], function (ko, _, dCompVm, dCorpVm, dCorpCashDrawerVm, dCorpWithdrawalVm, dCorpReconciliationVm) {

    return function (rawModel) {
        var self = this;

        self.dailyIncomes = ko.observableArray();
        self.initialCash = ko.observable();
        self.bankDrawer = ko.observable();
        self.dailyCorporationIncomes = ko.observableArray();      
        self.dailyCorporationCashDrawers = ko.observableArray();
        self.dailyCorporationWithdrawals = ko.observableArray();
        self.dailyCompanyPayouts = ko.observableArray();
        self.dailyCorporationReconciliations = ko.observableArray();
        //Company Income Totals
        self.IncomeAmountGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyIncomes(), function () { total += parseFloat(this.IncomeAmount() ? this.IncomeAmount():0) });
            return total;
        });
        self.CommissionCompanyAmountGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyIncomes(), function () { total += parseFloat(this.DailyCompanyCommission()  ? this.DailyCompanyCommission():0) });
            return total;
        });
        self.CompanyAmountGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyIncomes(), function () { total += parseFloat(this.DailyCompanyIncomeTotal() ? this.DailyCompanyIncomeTotal():0) });
            return total;
        });
        self.CommissionCorporationAmountGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyIncomes(), function () { total += parseFloat(this.DailyCorporationCommission() ? this.DailyCorporationCommission():0) });
            return total;
        });
        self.GrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyIncomes(), function () { total += parseFloat(this.DailyCorporationIncomeTotal() ? this.DailyCorporationIncomeTotal() : 0) });
            return total;
        });

        //Corporation Income Totals
        self.corporationIncomeAmountGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyCorporationIncomes(), function () { total += parseFloat(this.incomeAmount() ? this.incomeAmount() : 0) });
            return total;
        });
        self.corporationCommissionAmountGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyCorporationIncomes(), function () { total += parseFloat(this.dailyCorporationCommission() ? this.dailyCorporationCommission() : 0) });
            return total;
        });
        self.corporationGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyCorporationIncomes(), function () { total += parseFloat(this.dailyCorporationIncomeTotal() ? this.dailyCorporationIncomeTotal() : 0) });
            return total;
        });
        //Withdrawals Totals
        self.corporationWithdrawalAmountGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyCorporationWithdrawals(), function () { total += parseFloat(this.withdrawalAmount() ? this.withdrawalAmount() : 0) });
            return total;
        });
       
        //Company Payouts Total
        self.payoutIncomeAmountGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyCompanyPayouts(), function () { total += parseFloat(this.IncomeAmount() ? this.IncomeAmount() : 0) });
            return total;
        });
        self.payoutCommissionCorporationAmountGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyCompanyPayouts(), function () { total += parseFloat(this.DailyCorporationCommission() ? this.DailyCorporationCommission() : 0) });
            return total;
        });
        self.payoutGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyCompanyPayouts(), function () { total += parseFloat(this.DailyCorporationIncomeTotal() ? this.DailyCorporationIncomeTotal() : 0) });
            return total;
        });


        //Corporation Reconciliations Totals
        self.corporationReconciliationAmountGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyCorporationReconciliations(), function () { total += parseFloat(this.reconciliationAmount() ? this.reconciliationAmount() : 0) });
            return total;
        });

        self.addDailyIncome = function () {
            self.dailyIncomes.push(new dCompVm({
                DailyCompanyServiceIncomeId: null, CompanyServiceProvidedId: null, IncomeAmount: 0,
                DailyCompanyCommission: 0, DailyCorporationCommission: 0, DailyServiceDate: getParameterByName('serviceDate'),
                ManualCompanyServiceName: null, IsPayout:0
                }));
            
            
        };
        
        self.removeDailyIncome = function (data) {
            self.dailyIncomes.remove(data);
            $.ajax({
                url: '/DailyIncome/Remove',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({ dailyCompanyServiceIncomeId: data.DailyCompanyServiceIncomeId() })
            });
        }

        self.reset =function() { return self.loadData() }

        self.loadData = function () {
            self.dailyIncomes(_.map(rawModel.DailyCompanyServiceIncomes, function (d) {
                return new dCompVm(d);
            }));
            self.dailyCorporationCashDrawers(_.map(rawModel.DailyCorporationCashDrawers, function (d) {
                return new dCorpCashDrawerVm(d);
            }));

            self.dailyCorporationIncomes(_.map(rawModel.DailyCorporationServiceIncomes, function (d) {
                return new dCorpVm(d);
            }));
            self.dailyCorporationWithdrawals(_.map(rawModel.DailyCorporationWithdrawals, function (d) {
                return new dCorpWithdrawalVm(d);
            }));
            self.dailyCompanyPayouts(_.map(rawModel.DailyCompanyPayouts, function (d) {
                return new dCompVm(d);
            }));

            self.dailyCorporationReconciliations(_.map(rawModel.DailyCorporationReconciliations, function (d) {
                return new dCorpReconciliationVm(d);
            }));
        };
      

        self.applyBindings = function () {
            ko.applyBindings(self);
        };


        ko.bindingHandlers.numeric = {
            init: function (element, valueAccessor) {
                $(element).on("keydown", function (event) {
                    // Allow: backspace, delete, tab, escape, and enter
                    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
                        // Allow: Ctrl+A
                        (event.keyCode == 65 && event.ctrlKey === true) ||
                        // Allow: . ,
                        (event.keyCode == 188 || event.keyCode == 190 || event.keyCode == 110) ||
                        // Allow: home, end, left, right
                        (event.keyCode >= 35 && event.keyCode <= 39)) {
                        // let it happen, don't do anything
                        return;
                    }
                    else {
                        // Ensure that it is a number and stop the keypress
                        if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                            event.preventDefault();
                        }
                    }
                });

            }

        };
    };
});
