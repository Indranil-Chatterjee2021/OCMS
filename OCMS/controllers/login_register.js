const dbcon = require('../Database/dbConnection');
const { getDate }= require('../Database/dateFormat');

/* Register page functions... */
exports.register=(req,res) =>{
    console.log(req.body);
    const {fName,phno,city,email,pwd,cpwd } = req.body;
    var formData={
        Fname: req.body.fName,
        PhNo: req.body.phno,
        City: req.body.city,
        Email: req.body.email
    };
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
                Error: 'That Email Is Already Registered',fData:formData
            })
        }
        else if( pwd == '' || !chkpwd.test(pwd)){
            return res.render('register',{
                Error: 'Password must contain 8 chars,including Upper/lowercase and Numbers/Special Chars',fData:formData});
        }   
         else if( pwd !== cpwd ){
            return res.render('register',{
                Error: 'Password Confirmation does not match password',fData:formData});
        } 
        var utype='patient';
        var CreateOn=getDate();
        console.log(CreateOn);
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
};
/* Login page functions... */
exports.login=(req,res) =>{
    try {
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
                        uname=results[0].fname;
                        req.session.loggedin = true;
                        req.session.user=uname;
                        res.redirect('/dashboard');
                    }else{
                        var uname=results[0].fname;
                        req.session.loggedin = true;
                        req.session.user=uname;
                        res.redirect('/Pdashboard');
                        }
                    
                }
                else{
                        return res.status(401).render('login',{
                        Error:'Email/Phone No or Password is Incorrect...!'
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
                            res.redirect('/dashboard');
                        }else{
                            var uname=results[0].fname;
                            req.session.loggedin = true;
                            req.session.user=uname;
                            res.redirect('/Pdashboard');
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
};

/* Reset password page functions... */
exports.resetpwd=(req,res) =>{
    try {
        const { emailphno, pwd, rpwd } = req.body;
        var chkpwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
        if( !emailphno || !pwd ) {
            return res.status(400).render('forgotpassword',{
                Error:'Please provide an Email/Phone No and Password'
            })
        }else if( pwd == '' || !chkpwd.test(pwd)){
            return res.render('forgotpassword',{
                Error: 'Password must contain 8 chars,including Upper/lowercase and Numbers/Special Chars'
            });
        }   
         else if( pwd !== rpwd ){
            return res.render('forgotpassword',{
                Error: 'Retype Password does not match New Password'
            });
        }
        else{
            if(isNaN(emailphno)){
                dbcon.query('SELECT * FROM user WHERE email = ?',[emailphno], (error, results) =>{
                if(results.length > 0 ){
                    var updpwd='UPDATE user SET password=? WHERE email=?';
                    dbcon.query(updpwd,[pwd,emailphno],(err,response)=>{
                        if(err) throw err;
                        res.render('forgotpassword',{success: 'Password Reset Successfully '})
                    })
                }
                else{
                        return res.status(401).render('forgotpassword',{
                        Error:'Email or Phone No is Incorrect...!'
                        })
                    }
                })
            }
            else{
                dbcon.query('SELECT * FROM user WHERE phone = ?',[emailphno], (error, results) =>{
                    if(results.length > 0 ){
                        var updpwd='UPDATE user SET password=? WHERE phone=?';
                        dbcon.query(updpwd,[pwd,emailphno],(err,response)=>{
                            if(err) throw err;
                            res.render('forgotpassword',{success: 'Password Reset Successfully '})
                        })
                    }
                    else{
                            return res.status(401).render('forgotpassword',{
                            Error:'Email or Phone No is Incorrect...!'
                            })
                        }
                    }) 
            }
        }
        
    } catch (error) {
       console.log(error); 
    }
};