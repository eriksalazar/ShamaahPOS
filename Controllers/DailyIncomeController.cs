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
       // readonly Microsoft.AspNet.SignalR.IHubContext _hub;
      
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
        // GET: /DailyIncome/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        public DailyIncomeController()
        {
            IDatabase db = new Database("DefaultConnection");
            _db = db;
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
            _db.Execute("dbo.DailyIncomeServiceSetup @0", Convert.ToDateTime(todayServiceDate));

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
                    IsPayout = false
                  
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

        //
        // POST: /DailyIncome/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /DailyIncome/Edit/5
        public ActionResult Detail(string serviceDate)
        {
            serviceDate = Convert.ToDateTime(serviceDate).ToShortDateString();
            ViewBag.serviceDate = serviceDate;
            return View();
        }

        //
        // POST: /DailyIncome/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /DailyIncome/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /DailyIncome/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
