
define(['knockout', 'lodash', 'jquery', 'knockout.mapping', 'utils'], function (ko, _, $, mapping) {

    return function (data) {
        var self = this;
        self.dailyCorporationServiceIncomeId = ko.observable(data.DailyCorporationServiceIncomeId);
        self.corporationServiceProvidedId = ko.observable(data.CorporationServiceProvidedId);
        self.corporationServiceProvidedName = ko.observable(data.CorporationServiceProvidedName);
        self.incomeAmount = ko.observable(data.IncomeAmount);
        self.dailyCorporationCommission = ko.observable(data.DailyCorporationCommission);
        self.dailyCorporationIncomeDate = ko.observable(data.DailyCorporationIncomeDate);
        self.dailyCorporationIncomeNote = ko.observable(data.dailyCorporationIncomeNote);
        self.dailyCorporationIncomeTotal = ko.pureComputed(function () {
            return parseFloat(self.incomeAmount() ? self.incomeAmount() : 0) + parseFloat(self.dailyCorporationCommission() ? self.dailyCorporationCommission() : 0);
        });

        self.IsSaving = ko.observable(false);
        var save = ko.computed(function () {
            var incomeAmount = self.incomeAmount();
            var dailyCorporationCommission = self.dailyCorporationCommission();
            
            if (ko.computedContext.isInitial()) return;
            self.IsSaving(true);
            $.ajax({
                url: '/DailyIncome/SaveDailyCorporationIncome',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({
                    dailyCorporationServiceIncomeId: self.dailyCorporationServiceIncomeId(),
                    incomeAmount: incomeAmount,
                    dailyCorporationCommission: dailyCorporationCommission,
                    dailyServiceDate: getParameterByName('serviceDate')
                })
            }).done(function (data) {
                self.dailyCorporationServiceIncomeId(data);
                self.IsSaving(false);
            });;

        });
        save.extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });
    };
});