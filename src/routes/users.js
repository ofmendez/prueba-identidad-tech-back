export const createUserRouter = ({ route, ctrl }) => {
  route.get('/', ctrl.getAll);
  route.post('/', ctrl.create);
  route.post('/file', ctrl.createManyByFile);

  route.get('/:id', ctrl.getById);
  route.delete('/:id', ctrl.delete);
  route.patch('/:id', ctrl.update);
};
