const dbcon = require('../Database/dbConnection');
const { getDate }= require('../Database/dateFormat');

/* GET Appointments Details For Current Date... */
exports.getapptmts=(req,res) =>{
    if(req.session.loggedin){
      var CDate=getDate();
      var getASum="select count(APID) as atotal from appointments where apDate=?";
      var getCSum="select sum(amount) as Tamt from collection where rcpt_date between ? AND ?";
      var getPSum="select sum(AmtPaid) as Pamt from payment where PDate between ? AND ?";

      var getDPay="select p.PNo,d.dname,p.NPChecked,p.PDate,p.AmtPaid,p.ForPeriod,p.ProcessBy " +
                  "from payment as p,doctor as d where p.DocID=d.DocID and p.PDate BETWEEN ? AND ?";
      var getCQuery="SELECT C.rcpt_no, C.rcpt_date, C.amount, A.fname, A.APID " + 
                    "FROM collection as C INNER JOIN appointments as A ON A.APID = C.APID " +
                    "WHERE C.rcpt_date BETWEEN ? AND ?";
      var getApointList="SELECT A.APID, A.fname, A.phone, A.illness, D.DocID, D.dname, D.dfees, A.apDate, A.feePaid " +
                      "FROM appointments as A INNER JOIN doctor as D ON D.DocID = A.DocID " +
                      "and A.apDate=?";                
        dbcon.query(getCSum,[CDate,CDate],function(err,Cres_sum){ 
          dbcon.query(getPSum,[CDate,CDate],function(err,Pres_sum){ 
            dbcon.query(getASum,[CDate],function(err,Ares_sum){
           
              dbcon.query(getApointList,[CDate],function(err,aresult){
                dbcon.query(getCQuery,[CDate,CDate],function(err,cresult){
                    dbcon.query(getDPay,[CDate,CDate],function(err,presult){
             
             res.render('report', {CFromDate:CDate,CToDate:CDate,PFromDate:CDate,PToDate:CDate,Ctotal:Cres_sum,Atotal:Ares_sum,Ptotal:Pres_sum,cdate: CDate,ptitle:'List of Payment Report',ctitle:'List of Collection Report', atitle: 'List of Booked Appointments',User_logIn:req.session.user, Arecords:aresult,Crecords:cresult,Precords:presult});
                    });
                });
              });
            });
          });
        });
    }
};
/* GET Appointments Details For Date... */
exports.getapptmtsbydt=(req,res) =>{
  if(req.session.loggedin){
    const {sdt}=req.body;
    var CDate=getDate();
      var getASum="select count(APID) as atotal from appointments where apDate=?";
      var getCSum="select sum(amount) as Tamt from collection where rcpt_date between ? AND ?";
      var getPSum="select sum(AmtPaid) as Pamt from payment where PDate between ? AND ?";

      var getDPay="select p.PNo,d.dname,p.NPChecked,p.PDate,p.AmtPaid,p.ForPeriod,p.ProcessBy " +
                  "from payment as p,doctor as d where p.DocID=d.DocID and p.PDate between ? AND ?";
      var getCQuery="SELECT C.rcpt_no, C.rcpt_date, C.amount, A.fname, A.APID " + 
                    "FROM collection as C INNER JOIN appointments as A ON A.APID = C.APID " +
                    "WHERE C.rcpt_date BETWEEN ? AND ?";
      var getApointList="SELECT A.APID, A.fname, A.phone, A.illness, D.DocID, D.dname, D.dfees, A.apDate, A.feePaid " +
                      "FROM appointments as A INNER JOIN doctor as D ON D.DocID = A.DocID " +
                      "and A.apDate=?";                
        dbcon.query(getCSum,[CDate,CDate],function(err,Cres_sum){ 
          dbcon.query(getPSum,[CDate,CDate],function(err,Pres_sum){ 
            dbcon.query(getASum,[sdt],function(err,Ares_sum){
           
              dbcon.query(getApointList,[sdt],function(err,aresult){
                dbcon.query(getCQuery,[CDate,CDate],function(err,cresult){
                    dbcon.query(getDPay,[CDate,CDate],function(err,presult){
             
             res.render('report', {CFromDate:CDate,CToDate:CDate,PFromDate:CDate,PToDate:CDate,Ctotal:Cres_sum,Atotal:Ares_sum,Ptotal:Pres_sum,cdate: sdt,ptitle:'List of Payment Report',ctitle:'List of Collection Report', atitle: 'List of Booked Appointments',User_logIn:req.session.user, Arecords:aresult,Crecords:cresult,Precords:presult});
                    });
                });
              });
            });
          });
        });
  }
};
/* GET Collections Details By Date... */
exports.getcllctnsbydt=(req,res) =>{
  if(req.session.loggedin){
    const {fromdate,todate}=req.body;
    var CDate=getDate();
      var getASum="select count(APID) as atotal from appointments where apDate=?";
      var getCSum="select sum(amount) as Tamt from collection where rcpt_date between ? AND ?";
      var getPSum="select sum(AmtPaid) as Pamt from payment where PDate between ? AND ?";

      var getDPay="select p.PNo,d.dname,p.NPChecked,p.PDate,p.AmtPaid,p.ForPeriod,p.ProcessBy " +
                  "from payment as p,doctor as d where p.DocID=d.DocID and p.PDate between ? AND ?";
      var getCQuery="SELECT C.rcpt_no, C.rcpt_date, C.amount, A.fname, A.APID " + 
                    "FROM collection as C INNER JOIN appointments as A ON A.APID = C.APID " +
                    "WHERE C.rcpt_date BETWEEN ? AND ?";
      var getApointList="SELECT A.APID, A.fname, A.phone, A.illness, D.DocID, D.dname, D.dfees, A.apDate, A.feePaid " +
                      "FROM appointments as A INNER JOIN doctor as D ON D.DocID = A.DocID " +
                      "and A.apDate=?";                
        dbcon.query(getCSum,[fromdate,todate],function(err,Cres_sum){ 
          dbcon.query(getPSum,[CDate,CDate],function(err,Pres_sum){ 
            dbcon.query(getASum,[CDate],function(err,Ares_sum){
           
              dbcon.query(getApointList,[CDate],function(err,aresult){
                dbcon.query(getCQuery,[fromdate,todate],function(err,cresult){
                    dbcon.query(getDPay,[CDate,CDate],function(err,presult){
             
             res.render('report', {CFromDate:fromdate,CToDate:todate,PFromDate:CDate,PToDate:CDate,Ctotal:Cres_sum,Atotal:Ares_sum,Ptotal:Pres_sum,cdate: CDate,ptitle:'List of Payment Report',ctitle:'List of Collection Report', atitle: 'List of Booked Appointments',User_logIn:req.session.user, Arecords:aresult,Crecords:cresult,Precords:presult});
                    });
                });
              });
            });
          });
        });
  }
};
/* GET Payments Details By Date... */
exports.getpymntsbydt=(req,res) =>{
  if(req.session.loggedin){
    const {fromdate,todate}=req.body;
    var CDate=getDate();
      var getASum="select count(APID) as atotal from appointments where apDate=?";
      var getCSum="select sum(amount) as Tamt from collection where rcpt_date between ? AND ?";
      var getPSum="select sum(AmtPaid) as Pamt from payment where PDate between ? AND ?";

      var getDPay="select p.PNo,d.dname,p.NPChecked,p.PDate,p.AmtPaid,p.ForPeriod,p.ProcessBy " +
                  "from payment as p,doctor as d where p.DocID=d.DocID and p.PDate between ? and ?";
      var getCQuery="SELECT C.rcpt_no, C.rcpt_date, C.amount, A.fname, A.APID " + 
                    "FROM collection as C INNER JOIN appointments as A ON A.APID = C.APID " +
                    "WHERE C.rcpt_date BETWEEN ? AND ?";
      var getApointList="SELECT A.APID, A.fname, A.phone, A.illness, D.DocID, D.dname, D.dfees, A.apDate, A.feePaid " +
                      "FROM appointments as A INNER JOIN doctor as D ON D.DocID = A.DocID " +
                      "and A.apDate=?";                
        dbcon.query(getCSum,[CDate,CDate],function(err,Cres_sum){ 
          dbcon.query(getPSum,[fromdate,todate],function(err,Pres_sum){ 
            dbcon.query(getASum,[CDate],function(err,Ares_sum){
           
              dbcon.query(getApointList,[CDate],function(err,aresult){
                dbcon.query(getCQuery,[CDate,CDate],function(err,cresult){
                    dbcon.query(getDPay,[fromdate,todate],function(err,presult){
             
             res.render('report', {CFromDate:CDate,CToDate:CDate,PFromDate:fromdate,PToDate:todate,Ctotal:Cres_sum,Atotal:Ares_sum,Ptotal:Pres_sum,cdate: CDate,ptitle:'List of Payment Report',ctitle:'List of Collection Report', atitle: 'List of Booked Appointments',User_logIn:req.session.user, Arecords:aresult,Crecords:cresult,Precords:presult});
                    });
                });
              });
            });
          });
        });
  }
};