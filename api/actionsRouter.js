const express = require('express');
const router = express.Router();
const method = require("../data/helpers/actionModel")
const prjHelper = require("../data/helpers/projectModel")

router.get('/', (req, res) => {
  method.get()
  .then(acts => {
    res.status(200).json(acts)
  })
  .catch(err => console.error(err))
});

router.get('/:id', (req, res) => {
  const id = req.params.id
  method.get(id)
  .then(act => {
    res.status(200).json(act)
  })
  .catch(err => console.error(err))
})

router.post('/:id', (req, res) => {
  // this id is for a specific project's id
  const id = req.params.id
  req.body.project_id = id
  const newAction = req.body

  // get a project id to make sure it exists and we're not inserting into nothing
  prjHelper.get(id)
  .then(i => {
    if(i) {
      method.insert(newAction)
      .then(newAct => {
        res.status(201).json({ data: newAct })
      })
      .catch(err => console.error(err))
    } else {
      res.status(400).json({ errorMessage: `no project at id ${id}` })
    }
  })
  .catch(err => console.error(err))

})

router.put('/:id', (req, res) => {
  // this id is the action's id that we're trying to update
  const id = req.params.id
  const changes = req.body

  method.update(id, changes)
  .then(update => {
    res.status(200).json({ data: update })
  })
  .catch(err => console.error(err))
})

router.delete('/:id', (req, res) => {
  // this id is the action's id that we're trying to remove
  const id = req.params.id

  method.remove(id)
  .then(removed => {
    if(removed > 0) {
      res.status(200).json({ message: "it's gone" })
    } else {
      res.status(400).json({ message: `no action at id ${id}`})
    }
  })
  .catch(err => console.error(err))
})

module.exports = router;