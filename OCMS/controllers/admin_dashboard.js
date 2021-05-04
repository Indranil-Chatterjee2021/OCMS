const dbcon = require('../Database/dbConnection');
const { getDate }= require('../Database/dateFormat');
const convert = require('number-to-words');
/* GET Admin Dashboard page functions... */
exports.getadminDashboard=(req,res) =>{
    if(req.session.loggedin){
        var rpt_id=0;
        var Date=getDate();
        dbcon.query('SELECT * FROM doctor',(err,results)=>{
                console.log(results);
                //res.status(200).render('dashboard',{User_logIn:req.session.user,dropdownVals:result})
           var getRcptId="select max(rcpt_no) as RcptNo from collection";
           dbcon.query(getRcptId,function(error,res){
               if(error) throw error;
               if(res[0].RcptNo == null){
                  rpt_id=1;
               }else{
                rpt_id=parseInt(res[0].RcptNo)+1;
               }
            });    
           /* View Paid Receipts on Dashboard page functions... */
           
           var viewQuery="SELECT R.rcpt_no, R.rcpt_date, R.amount, A.fname, A.APID " + 
                      "FROM collection as R INNER JOIN appointments as A ON A.APID = R.APID ";
                      //"and R.APID=?";
            dbcon.query(viewQuery,function(err,resultss){
                if(err) throw err;

           var getfeesSum="select sum(feePaid) as sfpd from appointments where apDate=?";
           dbcon.query(getfeesSum,[Date],function(err,res_sum){
                if(err) throw err;
                    
           //var getApointList="select * from appointments where apDate=?";
           var getApointList="SELECT A.APID, A.fname, A.phone, A.illness, D.DocID, D.dname, D.dfees, A.apDate, A.feePaid " +
                             "FROM appointments as A INNER JOIN doctor as D ON D.DocID = A.DocID " +
                             "and A.apDate=?";
            dbcon.query(getApointList,[Date],function(err,result){
             if(err) throw err;
             res.render('dashboard', { Sfees:res_sum,receipt:resultss, rcptid:rpt_id, cdate: Date, title: 'List of Appointments', rtitle: 'List of Receipts',  User_logIn:req.session.user, records:result, dropdownVals:results});
            });
          });
        });
      });
    }
};

/* GET LIST BY DATE In Dashboard page functions... */
exports.getListByDateDashboard=(req,res) =>{
    if(req.session.loggedin){
        var Date=getDate();
        const {sdt} = req.body;
        //var col_id=0;
        dbcon.query('SELECT * FROM doctor',(err,results)=>{
                console.log(results);

                var getRcptId="select max(rcpt_no) as RcptNo from collection";
                dbcon.query(getRcptId,function(error,res){
                    if(error) throw error;
                    if(res[0].RcptNo == null){
                        rpt_id=1;
                     }else{
                      rpt_id=parseInt(res[0].RcptNo)+1;
                     }
                });
                var viewQuery="SELECT R.rcpt_no, R.rcpt_date, R.amount, A.fname, A.APID " + 
                      "FROM collection as R INNER JOIN appointments as A ON A.APID = R.APID ";
                      //"and R.APID=?";
                      dbcon.query(viewQuery,function(err,resultss){
                        if(err) throw err;

                var getfeesSum="select sum(feePaid) as sfpd from appointments where apDate=?";
                    dbcon.query(getfeesSum,[sdt],function(err,res_sum){
                        if(err) throw err;        

            var getApointList="SELECT A.APID, A.fname, A.phone, A.illness, D.DocID, D.dname, D.dfees, A.apDate, A.feePaid " +
                "FROM appointments as A INNER JOIN doctor as D ON D.DocID = A.DocID " +
                "and A.apDate=?";
            dbcon.query(getApointList,[sdt],function(err,result){
             if(err) throw err;
             res.render('dashboard', { Sfees:res_sum,receipt:resultss, rcptid:rpt_id, sdt:sdt, cdate: Date, title: 'List of Appointments',rtitle: 'List of Receipts', User_logIn:req.session.user, records:result, dropdownVals:results});
            });
          });
        });    
    });
    }
};

/* GET LIST BY Receipt DATE In Dashboard page functions... */
exports.getListByRcptDateDashboard=(req,res) =>{
    if(req.session.loggedin){
        var Date=getDate();
        const {sdt} = req.body;
        var col_id=0;
        var apid=parseInt(req.body.apid);
        dbcon.query('SELECT * FROM doctor',(err,results)=>{
                console.log(results);

                var getRcptId="select max(rcpt_no) as RcptNo from collection";
                dbcon.query(getRcptId,function(error,res){
                    if(error) throw error;
                    if(res[0].RcptNo == null){
                        rpt_id=1;
                     }else{
                      rpt_id=parseInt(res[0].RcptNo)+1;
                     }
                });
                 
                var viewQuery="SELECT R.rcpt_no, R.rcpt_date, R.amount, A.fname, A.APID " + 
                      "FROM collection as R INNER JOIN appointments as A ON A.APID = R.APID " +
                      "and R.APID=?";
                      dbcon.query(viewQuery,[apid],function(err,resultss){
                        if(err) throw err;

                var getfeesSum="select sum(feePaid) as sfpd from appointments where apDate=?";
                    dbcon.query(getfeesSum,[sdt],function(err,res_sum){
                        if(err) throw err;        

            var getApointList="SELECT A.APID, A.fname, A.phone, A.illness, D.DocID, D.dname, D.dfees, A.apDate, A.feePaid " +
                "FROM appointments as A INNER JOIN doctor as D ON D.DocID = A.DocID " +
                "and A.apDate=?";
            dbcon.query(getApointList,[sdt],function(err,result){
             if(err) throw err;
             res.render('dashboard', { Sfees:res_sum,receipt:resultss, rcptid:rpt_id, apid:apid, sdt:sdt, cdate: Date, title: 'List of Appointments',rtitle: 'List of Receipts', User_logIn:req.session.user, records:result, dropdownVals:results});
            });
          });  
        }); 
    });
  }
};

/* Main Admin Dashboard page functions... */
exports.getadminBooking=(req,res) =>{
    console.log(req.body);
    if(req.session.loggedin){
        const {fName,phno,city,age,illness,doctor } = req.body;
        var utype='patient';
        var ApntDate=getDate();
        console.log(ApntDate);
        //CreateOn.format("dd/mm/yyyy");
        dbcon.query('INSERT INTO appointments SET ?', {fname:fName, phone:phno, city:city, age:age, illness:illness, DocID:doctor, type:utype, apDate:ApntDate}, (err,results)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(results);
                  res.redirect('/dashboard');
                // return res.render('dashboard',{
                //     success: 'Appointment Confirmed For ['+fName+']',User_logIn:req.session.user
                // });
            }
        })
    }
};

/* Payment Receipt Dashboard page functions... */
exports.SaveReceipt=(req,res) =>{
    console.log(req.body);
    if(req.session.loggedin){
        const {txtrno,txtrdate,txtamt,apid,txtpby} = req.body;
        dbcon.query('INSERT INTO collection SET ?', {rcpt_no:txtrno, rcpt_date:txtrdate, amount:txtamt, APID:apid, user:txtpby}, (err,results)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(results);
                var paid="Yes";
                var updateQuery='UPDATE appointments SET feePaid=?,paid=? WHERE APID=?';
                dbcon.query(updateQuery,[txtamt,paid,apid],function(err,response){
                if(err) throw err;
                res.redirect('/dashboard');
            });
                
            }
        });
    }
};


exports.viewReceiptDashboard=(req,res) =>{
    if(req.session.loggedin){
                 
    }
};
