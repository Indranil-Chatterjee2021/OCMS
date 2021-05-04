const dbcon = require('../Database/dbConnection');
const { getDate }= require('../Database/dateFormat');
exports.login=(req,res) => {
    try {
        console.log(req.body);
        const { emailphno, pwd } = req.body;
        if( !emailphno || !pwd ) {
            return res.status(400).render('login',{
                Error:'Please provide an Email/Phone No and Password'
            })
        }
        else{
            if(isNaN(emailphno)){
                dbcon.query('SELECT * FROM user WHERE email = ? AND password = ?',[emailphno , pwd], (error, results) =>{
                console.log(results);
                console.log('Email Address');
                if(results.length > 0 ){
                    if(results[0].type == 'admin'){
                        var uname=results[0].fname;
                        req.session.loggedin = true;
                        req.session.user=uname;
                        dbcon.query('SELECT dname FROM doctor',(err,result)=>{
                            console.log(result);
                            res.status(200).render('dashboard',{User_logIn:req.session.user,dropdownVals:result})
                            // res.render('dasboard', {})
                        })
                        //res.status(200).render('dashboard',{User_logIn:req.session.user})
                    }else{
                        var uname=results[0].fname;
                        req.session.loggedin = true;
                        req.session.user=uname;
                        dbcon.query('SELECT dname FROM doctor',(err,result)=>{
                            console.log(result);
                            res.status(200).render('Pdashboard',{User_logIn:req.session.user,dropdownVals:result})
                            // res.render('dasboard', {})
                        })
                        //res.status(200).render('Pdashboard',{User_logIn:req.session.user}) 
                    }
                    
                }
                else{
                        return res.status(401).render('login',{
                        Error:'Email/Phone No or Password is incorrect'
                        })
                  }
                })
            }
            else{
                dbcon.query('SELECT * FROM user WHERE phone = ? AND password = ?',[emailphno , pwd], (error, results) =>{
                    console.log(results);
                    console.log('Phone No');
                    if(results.length > 0 ){
                        if(results[0].type == 'admin'){
                            var uname=results[0].fname;
                            req.session.loggedin = true;
                            req.session.user=uname;
                            dbcon.query('SELECT dname FROM doctor',(err,result)=>{
                                console.log(result);
                                res.status(200).render('dashboard',{User_logIn:req.session.user,dropdownVals:result})
                                // res.render('dasboard', {})
                            })
                            
                        }else{
                            var uname=results[0].fname;
                            req.session.loggedin = true;
                            req.session.user=uname;
                            dbcon.query('SELECT dname FROM doctor',(err,result)=>{
                                console.log(result);
                                res.status(200).render('Pdashboard',{User_logIn:req.session.user,dropdownVals:result})
                                // res.render('dasboard', {})
                            })
                            //res.status(200).render('Pdashboard',{User_logIn:req.session.user}) 
                        }
                    }
                    else{
                            return res.status(401).render('login',{
                            Error:'Email/Phone No or Password is incorrect'
                            })
                      }
                    }) 
            }
        }
        
    } catch (error) {
       console.log(error); 
    }
}

exports.register=(req,res) => {
    console.log(req.body);
    const {fName,phno,city,email,pwd,cpwd } = req.body;
    
    var chkpwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    dbcon.query('SELECT email FROM user WHERE email = ?',[email], (error, results) => {
        if(error){
            console.log(error);
        }
        if( fName == ''){
            return res.render('register', {
                Error: 'Full Name Required'
            })
        }
        else if( phno.length < 10 ){
            console.log(typeof phn);
            return res.render('register',{
                Error: 'Phone no must be 10 digit NUMBER'
            });
            
        }
        else if( city == '' ){
            return res.render('register',{
                Error: 'City Name Required'
            });
        }
        else if( email == '' ){
            return res.render('register',{
                Error: 'Email Address Required'
            });
        }
        else if( results.length > 0 ){
            return res.render('register', {
                Error: 'That Email Is Already Registered'
            })
        }
        else if( pwd == '' || !chkpwd.test(pwd)){
            console.log(formData);
            return res.render('register',{
                Error: 'Password must contain 8 chars,including Upper/lowercase and Numbers/Special Chars'
                });
        }   
         else if( pwd !== cpwd ){
             console.log(formData);
            return res.render('register',{
                Error: 'Password Confirmation does not match password'
                });
        } 
        var utype='patient';
        var CreateOn=getDate();
        console.log(CreateOn);
        //CreateOn.format("dd/mm/yyyy");
        dbcon.query('INSERT INTO user SET ?', {fname:fName, phone:phno, city:city, email:email, password:pwd, type:utype, created_on:CreateOn}, (err,results)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(results);
                return res.render('register',{
                    success: 'Thank You, Registered Successfully'
                });
            }
        })
    });
    //res.send("Form Submitted");
}