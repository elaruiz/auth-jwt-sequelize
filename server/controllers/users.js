const User = require('../models').User;
const bCrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
var config = require('../config/auth'); // get our config file
var generateHash = (password) => bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

module.exports = {
  create(req, res) {
    return User
    	.findOne({
    		where: {
    			email: req.body.email
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
    			email: req.body.email
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
		        var token = jwt.sign({user: user.email}, config.secret, {
		          expiresIn: '1440m',
		          algorithm: 'HS256'
		        });
		        return user
					.update({
						token: token,
					})
					.then(() => res.status(200).send({
						token: user.token
					})) //Send back the updated todo
					.catch((error) => res.status(400).send(error));
		      });
    		}
    	})
    	.catch(error => res.status(400).send(error));
  },
};
        
    
 
