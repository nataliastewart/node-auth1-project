const bcryptjs = require("bcryptjs");

const router = require("express").Router();

const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
  // validate the body, to make sure there is a username and password.
  const { username, password } = req.body;

  // hash user passwordjs (install bcryptjs)
  const rounds = process.env.HASH_ROUNDS || 8; // change to a higher number in production
  const hash = bcryptjs.hashSync(password, rounds);

  Users.add({ username, password: hash })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => res.send(err));
});

router.post("/login", (req, res) => {
  // validate the body, to make sure there is a username and password.
  const { username, password } = req.body;

  // verify user passwordjs

  Users.findBy({ username })
    .then(([user]) => {
      //   console.log("user:", user);
      if (user && bcryptjs.compareSync(password, user.password)) {
        res.status(200).json({ welcome: user.username, session: req.session });
      } else {
        res.status(401).json({ you: "cannot pass" });
      }
    })
    .catch((err) => {
      console.log("error on login", err);
      res.status(500).send(err);
    });
});
module.exports = router;
