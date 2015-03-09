using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
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
        public ActionResult Index()
        {
            var vm = new DailyIncomeListProvider();

            return View(vm.LoadList(System.DateTime.Now.Month, DateTime.Now.Year));
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
        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult GetAll()
        {
            return  Json(_db.Fetch<DailyCompanyServiceIncome>("select * from DailyCorporationServiceIncome"));
        }

        [HttpPost]
        public void Save(IList<DailyCompanyServiceIncome> DailyCorporationIncomes)
        {
            foreach(DailyCompanyServiceIncome oDailyCorporationIncome in DailyCorporationIncomes)
            {
                oDailyCorporationIncome.DailyServiceDate = Convert.ToDateTime("3/4/2014");
                if (oDailyCorporationIncome.DailyCompanyServiceIncomeId >0)
                {
                    _db.Update("DailyCorporationIncome", "DailyCorporationServiceIncomeId", oDailyCorporationIncome);
                }
                else
                {
                    _db.Insert("DailyCorporationIncome", "DailyCorporationServiceIncomeId", true, oDailyCorporationIncome);

                }
                //_hub.Clients.All.updated(oDailyCorporationIncome);
            }

            //var DailyCorporationIncome = _db.Single<DailyCorporationIncome>("select * from tickets where id=@0", t.id);

            //ticket.state = t.state;
            //_db.Update("tickets", "id", ticket);
            //_hub.Clients.All.updated(ticket);
        }
        [HttpPost]
        public void Remove(DailyCompanyServiceIncome oDailyCorporationIncome)
        {
            _db.Delete("DailyCorporationServiceIncome", "DailyCorporationServiceIncomeId", oDailyCorporationIncome);
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
        public ActionResult Edit(int id)
        {
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
