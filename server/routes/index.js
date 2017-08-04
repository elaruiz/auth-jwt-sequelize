const usersController = require('../controllers').users;
const plansController = require('../controllers').plans;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the User API!',
  }));

  app.post('/api/signup', usersController.create);
  app.post('/api/signin', usersController.authentication);
  app.put('/api/update/:id', usersController.update);

  app.post('/api/plans', plansController.create);
  app.get('/api/plans', plansController.list);
  app.get('/api/plans/:id', plansController.retrieve);
  app.put('/api/plans/:id', plansController.update);
  app.delete('/api/plans/:id', plansController.destroy)
};