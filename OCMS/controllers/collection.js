const dbcon = require('../Database/dbConnection');
const { getDate }= require('../Database/dateFormat');

/* GET LIST BY Receipt DATE In Collection page functions... */
exports.getListByDateCollection=(req,res) =>{
    if(req.session.loggedin){
        var rDate=getDate();
        var getQuery="SELECT C.rcpt_no, C.rcpt_date, C.amount, A.fname, A.APID " + 
                      "FROM collection as C INNER JOIN appointments as A ON A.APID = C.APID " +
                      "WHERE C.rcpt_date BETWEEN ? AND ?";
        var getSum="select sum(amount) as Tamt from collection where rcpt_date between ? AND ?";              
        dbcon.query(getQuery,[rDate,rDate],function(err,result){
             if(err) throw err;
            dbcon.query(getSum,[rDate,rDate],function(error,res_sum){ 
             if(error) throw error;  
             res.render('collection', { FromDate:rDate,ToDate:rDate,Stotal:res_sum,title: 'List of Collections', User_logIn:req.session.user, records:result});
            });
        });
    }
};

/* FIND LIST BY Receipt DATE In Collection page functions... */
exports.FindByDateCollection=(req,res) =>{
    if(req.session.loggedin){
        const {fromdate,todate} = req.body;
        var getQuery="SELECT C.rcpt_no, C.rcpt_date, C.amount, A.fname, A.APID " + 
                      "FROM collection as C INNER JOIN appointments as A ON A.APID = C.APID " +
                      "WHERE C.rcpt_date BETWEEN ? AND ?";
        var getSum="select sum(amount) as Tamt from collection where rcpt_date between ? AND ?";              
        dbcon.query(getQuery,[fromdate,todate],function(err,result){
             if(err) throw err;
            dbcon.query(getSum,[fromdate,todate],function(error,res_sum){ 
             if(error) throw error;  
             res.render('collection', { FromDate:fromdate,ToDate:todate,Stotal:res_sum,title: 'List of Collections', User_logIn:req.session.user, records:result});
            });
        });
    }
};