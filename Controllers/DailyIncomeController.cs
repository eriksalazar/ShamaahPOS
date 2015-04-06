using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using ShamaahPOS.Models;
using Microsoft.AspNet.SignalR.Infrastructure;
using NPoco;

namespace ShamaahPOS.Controllers
{
    public class DailyIncomeController : Controller
    {
        private readonly IDatabase _db;
        private readonly DailyCorporationServiceProvider _serviceProvider;

       // readonly Microsoft.AspNet.SignalR.IHubContext _hub;
        public DailyIncomeController()
        {
            IDatabase db = new Database("DefaultConnection");
            _db = db;
            DailyCorporationServiceProvider serviceProvider = new DailyCorporationServiceProvider();
            _serviceProvider = serviceProvider;
        }
        
        //
        // GET: /DailyIncome/
        public ActionResult Index(int? month, int? year)
        {
            var vm = new DailyIncomeListProvider();
            
            if (month == null && year ==null)
            {
                month = DateTime.Now.Month;
                year = DateTime.Now.Year;
            }
            return View(vm.LoadList(month, year));
        }

        //
        // GET: /DailyIncome/Edit/
        public ActionResult Detail(string serviceDate)
        {
            serviceDate = Convert.ToDateTime(serviceDate).ToShortDateString();
            ViewBag.serviceDate = serviceDate;
            var model = _serviceProvider.Load(serviceDate);

            return View(model);
        }       
        //
        // GET: /DailyIncome/Create
        public ActionResult Create(string serviceDate)
        {
            var todayServiceDate = Convert.ToDateTime(serviceDate).ToShortDateString();
            ViewBag.serviceDate = todayServiceDate;
            var dailyServiceIncome=    _db.Fetch<DailyCompanyServiceIncome>(
                    "select * from DailyCompanyServiceIncome where DailyServiceDate = @0", Convert.ToDateTime(todayServiceDate));
            if (dailyServiceIncome.Count > 0)
            {
                var routeValues = new RouteValueDictionary {{"valid", 0}};
                return RedirectToAction("Index", routeValues);
            }
            _db.Execute("dbo.DailyIncomeServiceSetup @0, @1", Convert.ToDateTime(todayServiceDate), 1); // TODO Pass corporationId

            var detailRouteValues = new RouteValueDictionary { { "serviceDate", serviceDate } };

            return RedirectToAction("Detail", detailRouteValues);
        }

        [HttpPost]
        public ActionResult GetAll(string serviceDate)
        {
            var todayServiceDate = Convert.ToDateTime(serviceDate).ToShortDateString();
            ViewBag.serviceDate = todayServiceDate;
            return Json(_db.Fetch<DailyCompanyServiceIncomeRow>(
                    "exec dbo.getDailyCompanyIncome @0", Convert.ToDateTime(todayServiceDate)));
           
        }

        [HttpPost]
        public int? SaveDailyCompanyIncome(int? dailyCompanyServiceIncomeId, decimal? incomeAmount,
            decimal? dailyCompanyCommission, decimal? dailyCorporationCommission, string manualCompanyServiceName, string dailyServiceDate)
        {
            if (dailyCompanyServiceIncomeId > 0)
            {
                var ds = _db.SingleById<DailyCompanyServiceIncome>(dailyCompanyServiceIncomeId);
                ds.IncomeAmount = incomeAmount;
                ds.DailyCompanyCommission = dailyCompanyCommission;
                ds.DailyCorporationCommission = dailyCorporationCommission;
                _db.Update(ds);
                return dailyCompanyServiceIncomeId;
            }
            else
            {
                var ds = new DailyCompanyServiceIncome()
                {
                    IncomeAmount = incomeAmount,
                    DailyCompanyCommission = dailyCompanyCommission,
                    DailyCorporationCommission = dailyCorporationCommission,
                    ManualCompanyServiceName = manualCompanyServiceName,
                    DailyServiceDate = Convert.ToDateTime(dailyServiceDate),
                    IsPayout = false,
                    ManualCorporationId = manualCompanyServiceName != null? 1 : new int?() //TODO Change to CorporationId from selected corp on
                  
                };
                _db.Insert(ds);
                return ds.DailyCompanyServiceIncomeId;
            }
        }
     
        [HttpPost]
        public void Remove(int? dailyCompanyServiceIncomeId)
        {
            var ds = new DailyCompanyServiceIncome();
            _db.Delete("DailyCompanyServiceIncome", "DailyCompanyServiceIncomeId", ds, dailyCompanyServiceIncomeId);
        }

        [HttpPost]
        public int? SaveDailyCorporationIncome(int? dailyCorporationServiceIncomeId, decimal? incomeAmount,
             decimal? dailyCorporationCommission, string dailyServiceDate)
        {
            if (dailyCorporationServiceIncomeId > 0)
            {
                var ds = _db.SingleById<DailyCorporationServiceIncome>(dailyCorporationServiceIncomeId);
                ds.DailyCorporationServiceIncomeAmount = incomeAmount;
                ds.DailyCorporationServiceCommission = dailyCorporationCommission;
                _db.Update(ds);
                return dailyCorporationServiceIncomeId;
            }
            else
            {
                return 0;
            }
        }
        [HttpPost]
        public int? SaveDailyCorporationCashDrawer(int? dailyCorporationCashDrawerId, decimal? cashDrawerAmount,
            string cashDrawerDate)
        {
            if (dailyCorporationCashDrawerId > 0)
            {
                var dcd = _db.SingleById<DailyCorporationCashDrawer>(dailyCorporationCashDrawerId);
                dcd.CashDrawerAmount = cashDrawerAmount;
                _db.Update(dcd);
                return dailyCorporationCashDrawerId;
            }
            else
            {
                return 0;
            }
        }
    }
}
