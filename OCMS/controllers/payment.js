const dbcon = require('../Database/dbConnection');
const { getDate }= require('../Database/dateFormat');

/* GET Doctor List... */
exports.getPaymentInfo=(req,res)=>{
    if(req.session.loggedin){
        var pmt_id=0;
        var cdate=getDate();
        var getPmtNo="select max(PNo) as PNO from payment";
           dbcon.query(getPmtNo,function(error,res){
               if(error) throw error;
               if(res[0].PNO == null){
                   pmt_id=1;
               }else{
                   pmt_id=parseInt(res[0].PNO)+1;
               }
            });
        var getInfo="SELECT COUNT(A.APID) AS NoPatients, D.DocID, D.dname, D.dfees, (D.dfees * COUNT(A.APID)) AS TOPAY " +
                     "FROM appointments as A JOIN doctor D ON A.DocID = D.DocID WHERE A.paid='Yes' and A.DPFLAG='NO' and A.apDate between ? and ?" +
                     "GROUP BY D.DocID";
            dbcon.query(getInfo,[cdate,cdate],(err,results)=>{
                if(err) throw err;
                res.render('payment', {VDate:cdate,pmtno:pmt_id,FromDate:cdate,ToDate:cdate,title: 'List Of Doctors Checked The Patients', User_logIn:req.session.user, records:results}); 
            });         
    }
};
/* FIND LIST BY DATE In Collection page functions... */
exports.FindByDatePayment=(req,res) =>{
    if(req.session.loggedin){
        const {fromdate,todate} = req.body;
        var pmt_id=0;
        var vdate=getDate();
        var getPmtNo="select max(PNo) as PNO from payment";
           dbcon.query(getPmtNo,function(error,res){
               if(error) throw error;
               if(res[0].PNO == null){
                   pmt_id=1;
               }else{
                   pmt_id=parseInt(res[0].PNO)+1;
               }
            });
        var getInfo="SELECT COUNT(A.APID) AS NoPatients, D.DocID, D.dname, D.dfees, (D.dfees * COUNT(A.APID)) AS TOPAY " +
                     "FROM appointments as A JOIN doctor D ON A.DocID = D.DocID WHERE A.paid='Yes' and A.DPFLAG='NO' and A.apDate between ? and ?" +
                     "GROUP BY D.DocID";    
                     dbcon.query(getInfo,[fromdate,todate],(err,results)=>{
                        if(err) throw err;
                        res.render('payment', {VDate:vdate,pmtno:pmt_id,FromDate:fromdate,ToDate:todate,title: 'List Of Doctors Checked The Patients', User_logIn:req.session.user, records:results}); 
                    });         
    }
};
/* Post Payment Processing Info... */
exports.PaymentProcessing=(req,res)=>{
    if(req.session.loggedin){
        const {txtvno,txtvdate,frmdt,todt,txtDocID,txtnptns,txtamt,txtpby}=req.body;
        var qinsert="INSERT INTO payment SET ?";
        var updateQuery='UPDATE appointments SET DPFLAG="YES" WHERE paid="Yes" and DocID=? and apDate between ? and ?';
        var forPeriod=frmdt+ "_" +todt;
        dbcon.query(qinsert,{PNo:txtvno,PDate:txtvdate,ForPeriod:forPeriod,DocID:txtDocID,NPChecked:txtnptns,AmtPaid:txtamt,ProcessBy:txtpby},(err,result)=>{
            if(err){
                console.log(err);
            }
            dbcon.query(updateQuery,[txtDocID,frmdt,todt],function(err,response){
                if(err) throw err;
                res.redirect('/payment');
              });
        });
    }
};