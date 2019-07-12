import { addNewUser, getUsers, login,getUser, updateUser, deleteUser } from '../controllers/downloadController'
const { check } = require('express-validator/check')
const routes = (app) => {
  app.route('/assesment') 
    .get(getUsers)

  app.route('/login')    
    .post(login)    
  app.route('/assement/:id')   
    .get(getUser)    
    .put(updateUser)    
    .delete(deleteUser)

  app.post('/assesment', [
    check('Firstname').isEmpty(),
    check('Lastname').isEmpty(),
    check('Email').isEmpty(),
    check('Password')
      .isLength({ min:8 })
      .matches('[0-9]').withMessage("must and should use number")
      .matches('[a-z]').withMessage("must and should use small letter")
      .matches('[A-Z]').withMessage("must and should use capital letter"),
    check('ConformPassword').isLength({ min: 5, max:8 })
  ],addNewUser, (req, res) => {
    const errors = validationResult(req,res);
    if (errors.isEmpty().isLength().matches()) {
      return res.status(422).json({ errors: errors.array() });
    }
    app.post(addNewUser)
    User.create({
      Firstname: req.body.Firstname,
      Lastname: req.body.Lastname,
      Email: req.body.Email,
      Password: req.body.Password,
      ConformPassword: req.body.ConformPassword  
    }).then(user => res.json(user));
  });
}
export default routes;




