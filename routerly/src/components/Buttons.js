import React, { useEffect, useState } from 'react'

export default function Buttons() {
  const [project, setProject] = useState([])
  const [action, setAction] = useState([])

  const getter = async () => {
    fetch("http://localhost:5000/api", {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => setProject(res))
    .catch(err => console.error(err))
  }

  const actionGetter = async (id) => {
    fetch(`http://localhost:5000/api/${id}/actions`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => setAction(res))
    .catch(err => console.error(err))
  }

  const completer = async (id, complete, proj) => {
    const data = {completed: !complete}
    fetch(`http://localhost:5000/act/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .then(() => actionGetter(proj))
    .catch(err => console.error(err))
  }

  const deleter = (id, proj) => {
    console.log(id)
    fetch(`http://localhost:5000/act/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .then(() => actionGetter(proj))
    .catch(err => console.error(err))
  }

  useEffect(() => {
    getter()
  },[])

  return (
    <div id="container">
      <div className="proj">
      {project && project.map(item => (
        <div className="proj-list" key={item.id}>
          <h2>{item.name}</h2>
          <p className="proj-p">{item.description}</p>

          <button onClick={() => actionGetter(item.id)}>Show me the actions</button>
        </div>
      ))}
      </div>

      {action.length > 0 ? (
        <div id="actions">
        <h2>Actions</h2>
        {action && action.map(action => (
          <div className="act-list" key={action.id}>
            <section>           
              <p
                onClick={() => completer(action.id, action.completed, action.project_id)}
                className={action.completed ? 'act-p completed' : 'act-p'}
              >
                {action.description}</p>
              <p>{action.notes}</p>
            </section>
            <button onClick={() => deleter(action.id, action.project_id)}>X</button>
          </div>
        ))}
        </div>
      ) : (<></>)}
    </div>
  )
}
