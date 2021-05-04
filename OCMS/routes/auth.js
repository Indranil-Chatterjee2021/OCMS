const express=require('express');
const dbcon = require('../Database/dbConnection');
const router=express.Router();
const authController=require('../controllers/auths');
const authBookController=require('../controllers/bookAppointment');
const addDoctor=require('../controllers/doctor');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/booking',authBookController.bookAppointment);
router.post('/addDoctor',addDoctor.addDoctor);

module.exports=router;
