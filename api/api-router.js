const router = require('express').Router()
const authRouter = require('../auth/auth-router')
const userRouter = require('../users/user-router')
const jwt = require('jsonwebtoken');
const restricted = require('../middleware/restricted-middleware')

router.use('/auth', authRouter)
router.use('/users', restricted, userRouter)

router.get('/', (req,res) => {
    res.json({api: 'Welcome to party town'})
});

// router.get('/token', (req, res) => {

//     const payload = {
//       subject: 'thisuser',
//       userid: 'samirhub',
//       favoriteCookie: 'White Chocolate Macadamia',
//     };
  
//     const secret = 'wubbalubbadubdub';
//     const options = {
//       expiresIn: '1h'
//     };
  
//     const token = jwt.sign(payload, secret, options);
  
//     res.json(token);
//   })

module.exports = router