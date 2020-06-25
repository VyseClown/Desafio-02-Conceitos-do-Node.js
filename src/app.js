const express = require('express');
const cors = require('cors');

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (request, response) => {
  return response.status(200).json(repositories);
});

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body;
  repositories.push({ id: uuid(), title, url, techs, likes: 0 });
  return response.status(200).json(repositories);
});

app.put('/repositories/:id', (request, response) => {
  const index = repositories.findIndex(
    (item) => item.id === request.params.id
  );
  if (index === -1)
    return response
      .status(400)
      .json({ message: 'Repository not found' });

  const { title, url, techs } = request.body;
  repositories[index].title = title;
  repositories[index].url = url;
  repositories[index].techs = techs;
  return response.status(200).json(repositories[index]);
});

app.delete('/repositories/:id', (request, response) => {
  const index = repositories.findIndex(
    (item) => item.id === request.params.id
  );
  if (index === -1)
    return response
      .status(400)
      .json({ message: 'Repository not found' });

  removed = repositories.splice(index, 1);
  return response.status(204).send();
});

app.post('/repositories/:id/like', (request, response) => {
  const index = repositories.findIndex(
    (item) => item.id === request.params.id
  );
  if (index === -1)
    return response
      .status(400)
      .json({ message: 'Repository not found' });

  repositories[index].likes++;
  return response.status(200).json(repositories[index]);
});

module.exports = app;
