const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const people = require('./content/people.json')

// Helpers
getIndex = (field, entry) => {
  let index = ""
  for (i = 0; i < people.length; i++) {
    if (people[i][field] == entry) {
      index = i
      return index
    }
  }
}

getInterests = () => {
  let interests = []

  //loop through to get the selection if interests for each person
  for (i = 0; i < people.length; i++) {
    let d = people[i].interests

    //loop through to get the individual interestas and add to array if not already there
    for (j = 0; j < d.length; j++) {
      if (!interests.includes(d[j].name)) {
        interests.push(d[j].name);
      }
    }
  }

  // loop through again and structure unique values for response
  for (k = 0; k<interests.length; k++) {
    interests[k] = {"name":interests[k]}
  }

  return interests
}


// Define routes
router.get('/people', (req, res) => {
  res.send(people);
});

router.get('/people/:id', (req, res) => {
  const userId = req.params.id;
  const index = getIndex("id", userId)
  res.send(people[index]);
});

router.get('/interests', (req, res) => {
  const interests = getInterests()
  res.send(interests);
});

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

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