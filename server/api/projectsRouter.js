const express = require('express');
const router = express.Router();
const method = require("../data/helpers/projectModel")

router.get('/', (req, res) => {
  method.get()
  .then(projects => {
    res.status(200).json(projects)
  })
  .catch(err => console.error(err))
});

router.get('/:id', (req, res) => {
  const id = req.params.id
  method.get(id)
  .then(project => {
    if(project) {
      res.status(200).json(project)
    } else {
      res.status(400).json({ errorMessage: `no project at id ${id}`})
    }
  })
  .catch(err => console.error(err))
})

router.get('/:id/actions', (req, res) => {
  const id = req.params.id
  method.getProjectActions(id)
  .then(project => {
    if(project) {
      res.status(200).json(project)
    } else {
      res.status(400).json({ errorMessage: `no project at id ${id}`})
    }
  })
  .catch(err => console.error(err))
})

router.post('/', (req, res) => {
  let newProject = req.body
  method.insert(newProject)
  .then(post => {
    res.status(201).json(post)
  })
  .catch(err => console.error(err))
});

router.put('/:id', (req, res) => {
  let updates = req.body
  let id = req.params.id
  method.update(id, updates)
  .then(update => {
    if(update) {
      console.log(update)
      res.status(200).json(update)
    } else {
      res.status(500).json({ errorMessage: "cannot update at this time" })
    }
  })
  .catch(err => console.error(err))
})

router.delete('/:id', (req, res) => {
  let id = req.params.id
  method.remove(id)
  .then(del => {
    if(del > 0) {
      console.log(del)
      res.status(200).json({ message: "well done, it's gone" })
    } else {
      res.status(500).json({ errorMessage: `could not find project at id ${id}` })
    }
  })
  .catch(err => console.error(err))
})

module.exports = router;