const express = require('express');
const router = express.Router();
const user =  require('../controllers/user') 

router.get('/' , user.get)
router.get('/:id' , user.getById)
router.post('/' , user.post)
router.put('/',user.update)
router.delete('/' , user.deleted)

module.exports  = router