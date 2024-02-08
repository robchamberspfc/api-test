const express = require('express');
const router = express.Router();

const content = require('./content/test.json')

// Helpers
getIndex = (field, entry) => {
  let index = ""
  for (i = 0; i < content.length; i++) {
    if (content[i][field] == entry) {
      index = i
      return index
    }
  }
}

// Define routes
router.get('/users', (req, res) => {
  res.send(content);
});

router.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const index = getIndex("id", userId)
  res.send(content[index]);
});

// router.post('/users', (req, res) => {
//   res.send('Create a new user');
// });

// router.put('/users/:id', (req, res) => {
//   const userId = req.params.id;
//   res.send(`Update user ${userId}`);
// });

// router.delete('/users/:id', (req, res) => {
//   const userId = req.params.id;
//   res.send(`Delete user ${userId}`);
// });

module.exports = router;