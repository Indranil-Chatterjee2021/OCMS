const dbcon = require('../Database/dbConnection');
const { getDate }= require('../Database/dateFormat');
const { response } = require('express');

/* GET FeedBack Lists... */
exports.getFeedbacks=(req,res) =>{
    if(req.session.loggedin){
      var getfeedbacks="select * from feedback";
      dbcon.query(getfeedbacks,function(err,result){
      if(err) throw err;
       res.render('feedback', { title:'User Feedbacks And Replies',User_logIn:req.session.user, records:result});
      });
    }
};
/* POST FeedBack Reply Form... */
exports.postFeedbackReply=(req,res)=>{
    if(req.session.loggedin){
        var uname=req.session.user;
        var RplyDt=getDate();
        const {fid,rmsg}=req.body;
        var updateQuery='UPDATE feedback SET reply=?,reply_on=?,reply_by=? WHERE fb_id=?';
        dbcon.query(updateQuery,[rmsg,RplyDt,uname,fid],(err,response)=>{
          if(err) throw err;
              res.redirect('/feedback');
         }); 
    }
};