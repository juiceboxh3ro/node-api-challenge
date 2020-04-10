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

  const actionGetter = (id) => {
    fetch(`http://localhost:5000/act/${id}`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => setAction(res))
    .catch(err => console.error(err))
  }

  useEffect(() => {
    getter()
  },[])

  return (
    <div>
      {project && project.map(item => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <button onClick={() => actionGetter(item.id)}>Show me actions</button>
            {action && action.map(item => (
              <div key={item.id}>
                <p>{item.description}</p>
              </div>
            ))}
        </div>
      ))}
    </div>
  )
}
