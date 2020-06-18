import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);


  useEffect(() => {

    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })

  }, [])

  async function handleAddRepository() {

    const response = await api.post('/repositories', {
      title: `Repository ${Date.now()}`,
      url: 'https://github.com/pablohdev/desafio-conceito-node-express',
      techs: ["React", "Node"],
    });

    const respository = response.data;

    setRepositories([...repositories, respository])


  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`)

    const new_repository = repositories.filter(repository => !repository.id.includes(id))



    setRepositories(new_repository)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
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
