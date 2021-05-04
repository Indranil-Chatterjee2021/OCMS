const dbcon = require('../Database/dbConnection');
const { getDate }= require('../Database/dateFormat');

/* GET Doctor Lists on Patient dashboard... */
exports.getDoctors=(req,res) =>{
    if(req.session.loggedin){
      var getDoctorList="select * from doctor";
      dbcon.query(getDoctorList,function(err,result){
      if(err) throw err;
       res.render('Pdashboard', { title: 'List of Doctors', User_logIn:req.session.user, records:result});
      });
    }
  };

/* Post booking... */
exports.postPBooking=(req,res) =>{
  console.log(req.body);
  if(req.session.loggedin){
      const {fName,phno,city,age,illness,DocId,txtusr} = req.body;
      var UID=0;
      var utype='patient';
      var dpflag='NO';
      var ApntDate=getDate();
      console.log(ApntDate);
      var getUserId="select * from user where fname=?";
      dbcon.query(getUserId,[txtusr],(error,result)=>{
        if(error){console.log(error)}
        UID=result[0].user_id;
        console.log(UID);
      })
      var getDoctorList="select * from doctor";
      dbcon.query(getDoctorList,function(err,result){
      dbcon.query('INSERT INTO appointments SET ?', {fname:fName, phone:phno, city:city, age:age, illness:illness, DocID:DocId, type:utype, apDate:ApntDate, DPFLAG:dpflag,user_id:UID}, (err,results)=>{
          if(err){
              console.log(err);
          }
          else{
              console.log(results);
                //res.redirect('/dashboard');
              return res.render('Pdashboard',{
                   success: 'Appointment Booked For [ '+fName+' ]',User_logIn:req.session.user,records:result
              });
          }
      })
    })
  }
};  

/* GET MyProfile Details... */
exports.getMyprofile=(req,res) =>{
  if(req.session.loggedin){
    var uname=req.session.user;
    var getuser="select * from user where fname=?";
    dbcon.query(getuser,[uname],function(err,result){
    if(err) throw err;
     res.render('Mprofile', { User_logIn:req.session.user, records:result});
    });
  }
};
/* UPDATE MyProfile Functions... */
exports.UpdMyprofile=(req,res) =>{
  if(req.session.loggedin){
    var uname=req.session.user;
    var mDate=getDate();
    var chkpwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    const {usrid,fName,email,phno,city,opwd,npwd} = req.body;
    dbcon.query('SELECT * FROM user WHERE user_id=?',[usrid],(err,ress)=>{
      if(opwd != ress[0].password){
        res.render('Mprofile', { User_logIn:req.session.user, records:ress, Error: 'Error : Old Password is Incorrect !!'});
      }else if(!chkpwd.test(npwd)){
        res.render('Mprofile', { User_logIn:req.session.user, records:ress, Error: 'Error : Password must contain 8 chars,including Upper/lowercase and Numbers/Special Chars'});
      }else{
        var updateQuery='UPDATE user SET fname=?,email=?,phone=?,city=?,oldpass=?,password=?,modify_on=? WHERE user_id=?';
        dbcon.query(updateQuery,[fName,email,phno,city,opwd,npwd,mDate,usrid],function(err,response){
          if(err) throw err;
          var getuser="select * from user where fname=?";
          dbcon.query(getuser,[uname],function(err,result){
           if(err) throw err;
           res.render('Mprofile', { User_logIn:req.session.user, records:result, success: 'Your Profile Updated Successfully !!'});
          });
        });
      }
    });
    
  }
};

/* Get My Appointment Details */
exports.getAppointDetails=(req,res)=>{
  if(req.session.loggedin){
    var uname=req.session.user;
    var UID=0;
    var getUserId="select * from user where fname=?";
      dbcon.query(getUserId,[uname],(error,result)=>{
        if(error){console.log(error)}
        UID=parseInt(result[0].user_id);
        console.log(UID);
    var getApointList="SELECT A.APID, A.fname, A.age, A.phone, A.city, A.illness, D.dname, D.dfees, A.apDate, A.feePaid, A.DPFLAG " +
                      "FROM appointments as A INNER JOIN doctor as D ON D.DocID = A.DocID and A.user_id=? ";
            dbcon.query(getApointList,[UID],function(err,result){
             if(err) throw err;
             res.render('Mappnt', { title: 'Your Appointment Details', User_logIn:req.session.user, records:result});
            });
        });
  }
};

exports.postFeedBack=(req,res)=>{
  if(req.session.loggedin){
    var uname=req.session.user;
    const {fmsg}=req.body;
    var UID=0;
    var FDate=getDate();
    var getUserId="select * from user where fname=?";
      dbcon.query(getUserId,[uname],(error,result)=>{
        if(error){console.log(error)}
        UID=parseInt(result[0].user_id);
      
    var insertq="Insert into feedback set ?";
    dbcon.query(insertq,{fdate:FDate,user_id:UID,fname:uname,msg:fmsg},(err,result)=>{
      if(err) throw err;
      res.render('Mfdbk', { User_logIn:req.session.user, success:'Thanks for your feedback..!'});
    });
  });  
  }
}
