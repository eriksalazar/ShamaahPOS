
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
        self.dailyServiceQuantity = ko.observable(data.DailyServiceQuantity);
        self.commissionPercent = ko.observable(data.CommissionPercent);
        self.commissionPerQuantity = ko.observable(data.CommissionPerQuantity);
        self.serviceProvidedId = ko.observable(data.ServiceProvidedId);
        self.DailyCorporationIncomeTotal = ko.pureComputed(function () {
            var transferIncomeAmount = parseFloat(self.IncomeAmount() ? self.IncomeAmount() : 0);
            var dailyCompanyCommission =  parseFloat(self.DailyCompanyCommission() ? self.DailyCompanyCommission() : 0);
            var dailyCorporationCommission = (self.serviceProvidedId() != 5 && self.serviceProvidedId() != 12) ? parseFloat(self.DailyCorporationCommission() ? self.DailyCorporationCommission() : 0) : 0;
            var dailyCorporationTotal = transferIncomeAmount + dailyCompanyCommission + (!self.IsPayout() && self.CompanyServiceProvidedId() !=9  ? dailyCorporationCommission : 0 );

            return dailyCorporationTotal
             //parseFloat(self.IncomeAmount() ? self.IncomeAmount() : 0) + (self.serviceProvided()!=5 && self.serviceProvided() !=12? (parseFloat(self.DailyCompanyCommission() ? self.DailyCompanyCommission() : 0) + (!self.IsPayout() && self.CompanyServiceProvidedId() !=9  ?  parseFloat(self.DailyCorporationCommission() ? self.DailyCorporationCommission() : 0) : 0)) : 0);
        });
        self.DailyCompanyIncomeTotal = ko.pureComputed(function () {
            return parseFloat(self.IncomeAmount() ? self.IncomeAmount() : 0) + parseFloat(self.DailyCompanyCommission() ? self.DailyCompanyCommission() : 0) - ((self.serviceProvidedId() == 12 || self.serviceProvidedId() ==5) ? self.DailyCorporationCommission() : 0);
        });

        self.ManualCompanyServiceName = ko.observable(data.ManualCompanyServiceName);
        self.IsPayout = ko.observable(data.IsPayout);

        ko.computed(function (){
            var dailyCompanyCommission = self.DailyCompanyCommission();
            if (ko.computedContext.isInitial()) return;
            if (self.commissionPercent() != null && !self.IsPayout() && !self.serviceProvidedId()==12) {
                self.DailyCorporationCommission(parseFloat(parseFloat(dailyCompanyCommission) * parseFloat(self.commissionPercent() ? self.commissionPercent() : 0)).toFixed(2))

            }
        }).extend({ rateLimit: { timeout: 700, method: "notifyWhenChangesStop" } });
        
      

        ko.computed(function () {
            var dailyServiceQuantity = self.dailyServiceQuantity();
            if (ko.computedContext.isInitial()) return;
            if(self.commissionPerQuantity() !=null)
            {
                var commissionQuantity = self.commissionPerQuantity();
                if (commissionQuantity.indexOf(":")>0)
                {
                    var commissionCompanyPercent = commissionQuantity.split(":")[0];
                    var commissionCorporationPercent = commissionQuantity.split(":")[1];
                    self.DailyCorporationCommission(parseFloat(commissionCorporationPercent) * dailyServiceQuantity);
                    self.DailyCompanyCommission(parseFloat(commissionCompanyPercent) * dailyServiceQuantity);
                }
                else
                {
                    self.DailyCorporationCommission(parseFloat(self.commissionPerQuantity() * dailyServiceQuantity));
                }

            }

        }).extend({ rateLimit: { timeout: 700, method: "notifyWhenChangesStop" } });

        var save = ko.computed(function () {
            var incomeAmount = self.IncomeAmount();
            var dailyCompanyCommission = self.DailyCompanyCommission();
            var dailyCorporationCommission = self.DailyCorporationCommission();
            var manualCompanyServiceName = self.ManualCompanyServiceName();
            var dailyServiceQuantity = self.dailyServiceQuantity();
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
                    dailyServiceDate: getParameterByName('serviceDate'),
                    dailyServiceQuantity: dailyServiceQuantity
                })
            }).done(function (data) {
                self.DailyCompanyServiceIncomeId(data);
                self.IsSaving(false);
            });;

        });
        save.extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });
    };
});