
define(['knockout', 'lodash', 'jquery', 'knockout.mapping', 'utils'], function (ko, _, $, mapping) {

    return function (data) {
        var self = this;
        self.IsSaving = ko.observable(false);
        self.dailyCorporationReconciliationId = ko.observable(data.DailyCorporationReconciliationId);
        self.corporationId = ko.observable(data.CorporationId);
        self.denominationTypeId = ko.observable(data.DenominationTypeId);
        self.denominationTypeName = ko.observable(data.DenominationTypeName);
        self.reconciliationAmount = ko.observable(data.ReconciliationAmount);
        self.reconciliationDate = ko.observable(data.ReconciliationDate);
        self.reconciliationDescription = ko.observable(data.ReconciliationDescription);
        self.reconciliationAmountTotal = ko.pureComputed(function () {
            return parseFloat(self.reconciliationAmount() ? self.reconciliationAmount() : 0);
        });

        var save = ko.computed(function () {
            var reconciliationAmount = self.reconciliationAmount();
             
            if (ko.computedContext.isInitial()) return;
            self.IsSaving(true);
            $.ajax({
                url: '/DailyIncome/SaveDailyCorporationReconciliation',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({
                    dailyCorporationReconciliationId: self.dailyCorporationReconciliationId(),
                    reconciliationAmount: reconciliationAmount,
                    dailyServiceDate: getParameterByName('serviceDate')
                })
            }).done(function (data) {
                self.dailyCorporationReconciliationId(data);
                self.IsSaving(false);
            });;

        });
        save.extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });
    };
});