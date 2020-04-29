const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secret.js');

const Users = require('../users/user-model.js');


function gT (user){
    const payload ={
        uid: user.id,
        username: user.username,
        roles: user.deparment,
    };
    const options = {expiresIn: '1h'};
    const token = jwt.sign(payload, secrets.jwtSecret, options);
    console.log(token);
    return token;
}

router.post('/register', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    Users.add(user)
        .then((user) => {
            const token = gT(user);

            res.status(201).json({created_user: user, token});
        })
        .catch((error)=>{
            res.status(500).json({message:"you dun goofed", error});
        });
});

router.post('/login', (req, res) =>{
    const {username, password} = req.body;

    Users.findBy({username})
        .first()
        .then((user)=> {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = gT(user);

                res.status(200).json({username: user.username, token});
            }else{
                res.status(401).json({message:'Invalid Credentials'});
            }
        })
        .catch(error =>{
            res.status(500).json(error);
        });
});

router.delete("/logout", (req, res) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          res.status(400).json("seems like there was an issue logging you out!");
        } else {
          res.json("You have been successfully logged out!");
        }
      });
    }
  });

module.exports = router;
