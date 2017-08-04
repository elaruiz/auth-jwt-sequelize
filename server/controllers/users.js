const User = require('../models').User;
const bCrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
var access = require('../config/access'); // get our access file
var generateHash = (password) => bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

module.exports = {
  create(req, res) {
    return User
    	.findOne({
    		where: {
    			email: req.body.email.toLowerCase()
    		}
    	})
    	.then(user => {
    		if(user) {
    			return res.status(409).send({
    				message: 'email already taken!'
    			})
    		}
    		else {
    			 var userPassword = generateHash(req.body.password);
    			 User.create({
    			 	firstname: req.body.firstname,
			        lastname: req.body.lastname,
			        email: req.body.email,
			        password: userPassword,
			        plan: req.body.plan
			    })
    			 .then(user => res.status(201).send(user))
    			 .catch(error => res.status(400).send(error));
    		}
    	})
    	.catch(error => res.status(400).send(error));
  },
  authentication(req, res) {
  	return User
    	.findOne({
    		where: {
    			email: req.body.email.toLowerCase()
    		}
    	})
    	.then(user => {
    		if(!user) {
    			return res.status(404).send({
						message: 'User Not Found',
    			})
    		}
    		else {
    			bCrypt.compare(req.body.password, user.password, (err, isMatching) => {
		        if (!isMatching) {
		          return res.status(401).send({
		          	message: 'Invalid password',
		          })
		        }
		        var token = jwt.sign({user: user.email}, config.TOKEN_SECRET, {
		          expiresIn: '1440m',
		          algorithm: 'HS256'
		        });
		        return res.status(200).send({
						token: token,
					});
		      });
    		}
    	})
    	.catch(error => res.status(400).send(error));
  }, 
  update(req, res) {
  	return User
  		.findById(req.params.id)
  		.then(user => {
  			if(!user) {
  				return res.status(404).send({
  					message: 'User not found'
  				});
  			}
  			return user
  				.update({
  					firstname: req.body.firstname || user.firstname,
			        lastname: req.body.lastname || user.lastname,
			        email: req.body.email || user.email,
			        password: userPassword || user.password,
  				})
  				.then(() => res.status(200).send(user))
  				.catch((error) => res.status(400).send(error))
  		})
  		.catch((error) => res.status(400).send(error))
  }
};