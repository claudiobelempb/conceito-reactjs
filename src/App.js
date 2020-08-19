import React, { useState, useEffect } from "react";
import api from '../src/services/api'

import "./styles.css";

function App() {
  
  const [repositorys, setRepositorys] = useState([])
  
  useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepositorys(response.data)
      //console.log(response)
    })
  }, [])
  
  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: "Desafio Node.js",
      url: "https://github.com/rocketseat-education/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs",
      techs: "Node.js"
    })
    const repository = response.data
    setRepositorys([...repositorys, repository])
  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`repositories/${id}`)
    const repositoryUpdated = repositorys.filter((response) => response.id !== id);
  
    setRepositorys([...repositoryUpdated]);
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositorys.map((repository, index) => (
          <li key={index}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
