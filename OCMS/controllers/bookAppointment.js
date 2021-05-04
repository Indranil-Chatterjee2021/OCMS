const dbcon = require('../Database/dbConnection');
const { getDate }= require('../Database/dateFormat');

exports.bookAppointment=(req,res) => {
    console.log(req.body);
    const {fName,phno,city,age,illness,doctor } = req.body;
        var utype='patient';
        var ApntDate=getDate();
        console.log(ApntDate);
        //CreateOn.format("dd/mm/yyyy");
        dbcon.query('INSERT INTO appointments SET ?', {fname:fName, phone:phno, city:city, age:age, illness:illness, RefDoctor:doctor, type:utype, apDate:ApntDate}, (err,results)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(results);
                return res.render('dashboard',{
                    success: 'Appointment Confirmed For ['+fName+']',User_logIn:req.session.user
                });
            }
        })
}