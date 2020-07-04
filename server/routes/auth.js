const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

router.post('/', async (req, res) => {

  const { username , password } = req.body;

  if(password.length < 6) {
    res.status(500).json({msg: "Password Length Must Be Greater Than 6 Characters."});
    return;
  }

  let newUser = new User({
    username,
    passwordHash: bcrypt.hashSync(password, 10),
    numNotes: 0
  });

  newUser
    .save()
    .then(user => {
      jwt.sign(
        { username: newUser.username },
        'secret',
        (err, token) => {
          if (err) throw err; // error generating token
          res.send({
            token,
            user: { username: user.username }
          });
        }
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({msg: `User ${err.keyValue['username']} already exists. Try Logging In`})
    });

});

router.post('/login', (req, res) => {
  const { username , password } = req.body;
  User
    .findOne({username})
    .then(user => {

      if(!user) {
        res.status(500).json({msg: 'No User with that username: ' + username});
        return;
      } else if(!bcrypt.compareSync(password, user.passwordHash)) {
        res.status(500).json({msg: 'Invalid Password'});
        return;
      }

      //otherwise return a user with the updated json web token.
      jwt.sign(
        { username: user.username },
        'secret',
        (err, token) => {
          if (err) throw err; // error generating token
          res.send({
            token,
            user: { username: user.username }
          });
        }
      );
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
}); 

router.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.send("User Deleted"))
    .catch(err => res.json({msg: "No User Exists with that ID"}));
})

module.exports = router;