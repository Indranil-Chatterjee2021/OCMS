const express=require('express');
const dbcon = require('../Database/dbConnection');
const { getDate }= require('../Database/dateFormat');
const LoginRegisterController=require('../controllers/login_register');
const DashboardController=require('../controllers/admin_dashboard');
const DoctorsController=require('../controllers/doctor');
const ProfileController=require('../controllers/profile');
const CollectionController=require('../controllers/collection');
const FeedbackController=require('../controllers/feedback');
const PaymentController=require('../controllers/payment');
const ReportController=require('../controllers/report');
const UserController=require('../controllers/patient');
const router=express.Router();
var username;
/* GET HOME PAGE */
router.get('/', (req,res) => {
    var getDoctorList="select * from doctor";
    dbcon.query(getDoctorList,function(err,result){
    if(err) throw err;
     res.render('home', { records:result});
    });
    //res.render('home');
});

/* GET REGISTER PAGE */
router.get('/register', (req,res) => {
    res.render('register');
});

/* POST REGISTER PAGE */
router.post('/register', LoginRegisterController.register);

/* GET LOGIN PAGE */
router.get('/login', (req,res) => {
    res.render('login');
});

/* POST LOGIN PAGE */
router.post('/login', LoginRegisterController.login);

/* GET Reset PassWord Page */
router.get('/forgotpassword', (req,res) => {
    res.render('forgotpassword');
});

/* POST Forgot Password PAGE */
router.post('/forgotpassword', LoginRegisterController.resetpwd);

/* GET/POST DASHBOARD */
router.get('/dashboard', DashboardController.getadminDashboard);

router.get('/dashboard/:APID', DashboardController.viewReceiptDashboard);

router.post('/dashboards', DashboardController.getListByDateDashboard);

router.post('/dasboards', DashboardController.getListByRcptDateDashboard);

router.post('/receipt', DashboardController.SaveReceipt);

router.post('/dashboard', DashboardController.getadminBooking);

//Redirect to Doctor page...
router.get('/doctor', DoctorsController.getDoctors);

router.post('/doctor', DoctorsController.addDoctor);
//Update Doctor...
router.post('/updatedoctor', DoctorsController.updateDoctor);

router.get('/deletedoctor/:DocID', DoctorsController.deleteDoctor);

//GET Profile page...
router.get('/profile', ProfileController.getMyprofile);

//POST Profile page...
router.post('/profile', ProfileController.UpdMyprofile);
router.post('/profile/addnew', ProfileController.addAdmin);

/* GET Collection Page */
router.get('/collection', CollectionController.getListByDateCollection);

/* POST Collection by date search */
router.post('/collection', CollectionController.FindByDateCollection);

/* GET FeedBack Page */
router.get('/feedback', FeedbackController.getFeedbacks);

/* POST FeedBack Reply Form */
router.post('/feedback', FeedbackController.postFeedbackReply);

/* GET Payment Page */
router.get('/payment', PaymentController.getPaymentInfo);

/* POST By Date in Payment */
router.post('/payment/SearchByDate', PaymentController.FindByDatePayment);
/* POST Payment Procesing */
router.post('/payment/processing', PaymentController.PaymentProcessing);


/* GET-POST Reports Page */
router.get('/report',ReportController.getapptmts);
router.post('/report/appointemnts',ReportController.getapptmtsbydt);
router.post('/report/collection',ReportController.getcllctnsbydt);
router.post('/report/payment',ReportController.getpymntsbydt);

/* GET-POST USER PAGE Operations */
router.get('/Pdashboard', UserController.getDoctors);
router.post('/patient', UserController.postPBooking);
//GET MyProfile page...
router.get('/Mprofile', UserController.getMyprofile);
//POST MyProfile page...
router.post('/Mprofile', UserController.UpdMyprofile);
router.get('/Mappnt', UserController.getAppointDetails);
router.get('/Mfdbk', (req,res) => {
    if(req.session.loggedin){
    res.render('Mfdbk',{User_logIn:req.session.user});
    }
});
router.post('/Mfdbk', UserController.postFeedBack);

//LogOut...
router.get('/logout', (req,res) => {
    req.session.loggedin = false;
    req.session = null;
    res.redirect('/');
});



module.exports=router;
