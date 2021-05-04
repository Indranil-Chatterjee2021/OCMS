const dbcon = require('../Database/dbConnection');
const { getDate }= require('../Database/dateFormat');

/* GET Doctor Lists... */
exports.getDoctors=(req,res) =>{
  if(req.session.loggedin){
    var getDoctorList="select * from doctor";
    dbcon.query(getDoctorList,function(err,result){
    if(err) throw err;
     res.render('doctor', { title: 'List of Doctors', User_logIn:req.session.user, records:result});
    });
  }
};

/* ADD Doctors Functions... */
exports.addDoctor=(req,res) => {
  if(req.session.loggedin){

    console.log(req.body);
    const {fName,phno,address,drgno,ddscp,doctcat,wkdys,fees,vtime} = req.body;
        var isActive='Yes';
        var JoinDate=getDate();
        console.log(JoinDate);
        //CreateOn.format("dd/mm/yyyy");
        dbcon.query('INSERT INTO doctor SET ?', {dname:fName, phone:phno, address:address, regno:drgno, desc:ddscp, ucat:doctcat, wkdys:wkdys, dfees:fees, timings:vtime, isPresent:isActive, jndate:JoinDate, isActive:isActive}, (err,results)=>{
            if(err){
                console.log(err);
            }
            else{
              console.log(results);
              var getDoctorList="select * from doctor";
              dbcon.query(getDoctorList,function(err,result){
              if(err) throw err;
              res.render('doctor', { title: 'List of Doctors', User_logIn:req.session.user, records:result});
              });
                
                //res.redirect('/doctor'); 
                //res.render('doctor', { User_logIn:req.session.user });
             }
        })
  }
}

/* UPDATE Doctor Functions... */
exports.updateDoctor=(req,res) =>{
  if(req.session.loggedin){
    const {docID,txtphno,txttmngs,txtfee,txtprsnt,txtedate,txtactv} = req.body;
    var updateQuery='UPDATE doctor SET phone=?,timings=?,dfees=?,isPresent=?,enddate=?,isActive=? WHERE DocID=?';
    dbcon.query(updateQuery,[txtphno,txttmngs,txtfee,txtprsnt,txtedate,txtactv,docID],function(err,response){
      if(err) throw err;
      res.redirect('/doctor');
    });
  }
}

/* DELETE Doctor Functions... */
exports.deleteDoctor=(req,res) =>{
  if(req.session.loggedin){
    var id=req.params.DocID;
    var deleteQuery="DELETE from doctor where DocID=?";
      dbcon.query(deleteQuery,id,function(error){
         if(error) throw error;
         res.redirect('/doctor');
     });
  }
}
