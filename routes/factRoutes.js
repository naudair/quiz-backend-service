const { Router } = require('express')
const {createFacts, getFacts, getUserfacts, deleteFacts, updateFacts, addLikes, addDislikes} = require('../controllers/factController')
const router = Router()


router.post('/facts', createFacts)  //create facts
router.get('/facts', getFacts)  //get all facts
router.get('/facts/:userID', getUserfacts)  //get user facts
router.put('/facts/:factID', updateFacts)  //edit facts
router.delete('/facts/:factID', deleteFacts)  //delete facts
router.post('/facts/likes/:factID/:userID', addLikes)  //like
router.post('/facts/dislikes/:factID/:userID', addDislikes)  //dislike


module.exports = router
