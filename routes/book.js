const express = require('express');
const router = express.Router();
const book =  require('../controllers/book') 

router.get('/' , book.get)
router.get('/:id' , book.getById)
router.post('/' , book.post)
router.put('/',book.update)
router.delete('/' , book.deleted)

module.exports  = router