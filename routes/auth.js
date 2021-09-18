const express = require('express');
const router = express.Router();
const auth =  require('../controllers/auth') 
const  jwtAuthMiddleware = require('../middleware/auth')
router.post('/login' , auth.login)
router.post('/register' , auth.register)
router.put('/',auth.update)
router.delete('/' , auth.deleted)
router.post('/verify' ,jwtAuthMiddleware  , auth.verify)


module.exports  = router