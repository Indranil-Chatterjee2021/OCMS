const dbcon = require('../Database/dbConnection');
const { getDate }= require('../Database/dateFormat');

/* GET Doctor Lists... */
exports.getMyprofile=(req,res) =>{
  if(req.session.loggedin){
    var uname=req.session.user;
    var getuser="select * from user where fname=?";
    dbcon.query(getuser,[uname],function(err,result){
    if(err) throw err;
     res.render('profile', { User_logIn:req.session.user, records:result});
    });
  }
};
/* UPDATE Profile Functions... */
exports.UpdMyprofile=(req,res) =>{
  if(req.session.loggedin){
    var uname=req.session.user;
    var mDate=getDate();
    var chkpwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    const {usrid,fName,email,phno,city,opwd,npwd} = req.body;
    dbcon.query('SELECT * FROM user WHERE user_id=?',[usrid],(err,ress)=>{
      if(opwd != ress[0].password){
        res.render('profile', { User_logIn:req.session.user, records:ress, Error: 'Error : Old Password is Incorrect !!'});
      }else if(!chkpwd.test(npwd)){
        res.render('profile', { User_logIn:req.session.user, records:ress, Error: 'Error : Password must contain 8 chars,including Upper/lowercase and Numbers/Special Chars'});
      }else{
        var updateQuery='UPDATE user SET fname=?,email=?,phone=?,city=?,oldpass=?,password=?,modify_on=? WHERE user_id=?';
        dbcon.query(updateQuery,[fName,email,phno,city,opwd,npwd,mDate,usrid],function(err,response){
          if(err) throw err;
          var getuser="select * from user where fname=?";
          dbcon.query(getuser,[uname],function(err,result){
           if(err) throw err;
           res.render('profile', { User_logIn:req.session.user, records:result, success: 'Your Profile Updated Successfully !!'});
          });
        });
      }
    });
    
  }
};

/* Create New Admin page functions... */
exports.addAdmin=(req,res) =>{
  if(req.session.loggedin){
  const {fName,phno,city,email,pwd,rpwd } = req.body;
  var chkpwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
  var uname=req.session.user;
  var getuser="select * from user where fname=?";
  dbcon.query(getuser,[uname],function(err,result){
    if(err) throw err;
    dbcon.query('SELECT email FROM user WHERE email = ?',[email], (error, results) => {
      if(error){
          console.log(error);
      }
      if( results.length > 0 ){
          return res.render('profile', {
              Errors: 'Error :That Email Is Already Registered', User_logIn:req.session.user, records:result
          });
      }
      else if( pwd == '' || !chkpwd.test(pwd)){
          return res.render('profile',{
              Errors: ' Error :Password must contain 8 chars,including Upper/lowercase and Numbers/Special Chars',
              User_logIn:req.session.user, records:result
          });
      }   
       else if( pwd !== rpwd ){
          return res.render('profile',{
              Errors: 'Error :Re-type Password does not match Password', User_logIn:req.session.user, records:result
          });
      } 
       var utype='admin';
       var CreateOn=getDate();
       dbcon.query('INSERT INTO user SET ?', {fname:fName, phone:phno, city:city, email:email, password:pwd, type:utype, created_on:CreateOn}, (err,results)=>{
          if(err){console.log(err);}
          else{
              return res.render('profile',{
                  succes: 'New Admin Created Successfully...!!',User_logIn:req.session.user, records:result
              });
          }
        })
      });
    });
  } 
};