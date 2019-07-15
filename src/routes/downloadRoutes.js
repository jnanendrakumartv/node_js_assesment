import { addNewUser, getUsers, login,getUser, updateUser, deleteUser } from '../controllers/downloadController'
const { check } = require('express-validator/check')
const routes = (app) => {
  // app.route('/assement') 
 
  app.route('/login')    
    .post(login)    
  
  app.post('/assesment', [
    check('Firstname').isEmpty(),
    check('Lastname').isEmpty(),
    check('Email').isEmpty().custom(email => {
      if (alreadyHaveEmail(email)) {
        throw new Error('Entered Email are already registered')
      }
    }),
    check('Password')
      .isLength({ min:8 })
      .matches('[0-9]').withMessage("number are must use")
      .matches('[a-z]').withMessage("small letter are must use")
      .matches('[A-Z]').withMessage("capital letter must use")
      .equals('ConformPassword').withMessage("Entered password are mismatch"),
    check('ConformPassword').isEmpty()
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



