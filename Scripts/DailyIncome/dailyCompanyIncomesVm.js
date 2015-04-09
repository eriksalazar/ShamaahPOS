
define(['knockout', 'lodash', 'jquery', 'knockout.mapping', 'utils'], function (ko, _, $, mapping) {

    return function (data) {
        var self = this;
        self.IsSaving = ko.observable(false);
        self.DailyCompanyServiceIncomeId = ko.observable(data.DailyCompanyServiceIncomeId);
        self.CompanyServiceProvidedId = ko.observable(data.CompanyServiceProvidedId);
        self.CompanyServiceProvidedName = ko.observable(data.CompanyServiceProvidedName);
        self.IncomeAmount = ko.observable(data.IncomeAmount);
        self.DailyCompanyCommission = ko.observable(data.DailyCompanyCommission);
        self.DailyCorporationCommission = ko.observable(data.DailyCorporationCommission);
        self.DailyServiceDate = ko.observable(data.DailyServiceDate);
        self.DailyCorporationIncomeTotal = ko.pureComputed(function () {
            return parseFloat(self.IncomeAmount() ? self.IncomeAmount() : 0) + parseFloat(self.DailyCompanyCommission() ? self.DailyCompanyCommission() : 0) + parseFloat(self.DailyCorporationCommission() ? self.DailyCorporationCommission() : 0);
        });
        self.DailyCompanyIncomeTotal = ko.pureComputed(function () {
            return parseFloat(self.IncomeAmount() ? self.IncomeAmount() : 0) + parseFloat(self.DailyCompanyCommission() ? self.DailyCompanyCommission() : 0);
        });
        self.ManualCompanyServiceName = ko.observable(data.ManualCompanyServiceName);
        self.IsPayout = ko.observable(data.IsPayout);
       
        var save = ko.computed(function () {
            var incomeAmount = self.IncomeAmount();
            var dailyCompanyCommission = self.DailyCompanyCommission();
            var dailyCorporationCommission = self.DailyCorporationCommission();
            var manualCompanyServiceName = self.ManualCompanyServiceName();
            if (ko.computedContext.isInitial()) return;
            self.IsSaving(true);
            $.ajax({
                url: '/DailyIncome/SaveDailyCompanyIncome',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({
                    dailyCompanyServiceIncomeId: self.DailyCompanyServiceIncomeId(),
                    incomeAmount: incomeAmount,
                    dailyCompanyCommission: dailyCompanyCommission,
                    dailyCorporationCommission: dailyCorporationCommission,
                    manualCompanyServiceName: manualCompanyServiceName,
                    dailyServiceDate: getParameterByName('serviceDate')
                })
            }).done(function (data) {
                self.DailyCompanyServiceIncomeId(data);
                self.IsSaving(false);
            });;

        });
        save.extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });
    };
});