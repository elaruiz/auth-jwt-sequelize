'use strict';

const Plan = require('../models').Plan;

module.exports = {
	create(req, res) {
		return Plan
			.create({
				name: req.body.name,
				price: req.body.price
			})
			.then(plan => res.status(201).send(plan))
			.catch(error => res.status(400).send(error));
	},
	list(req, res) {
		return Plan
			.findAll()
			.then(plans => res.status(200).send(plans))
			.catch(error => res.status(400).send(error));

	},
	retrieve(req, res) {
		return Plan
			.findById(req.params.id)
			.then(plan => {
				if (!plan) {
					return res.status(404).send({
						message: 'Plan Not Found',
					})
				}
				return res.status(200).send(plan);
			})
			.catch(error => res.status(400).send(error));
	},
	update(req, res) {
		return Plan
			.findById(req.params.id)
			.then(plan => {
				if (!plan) {
					return res.status(404).send({
						message: 'Plan Not Found',
					});
				}
				return plan
					.update({
						name: req.body.name || plan.name,
						price: req.body.price || plan.price
					})
					.then(() => res.status(200).send(plan)) //Send back the updated plan
					.catch((error) => res.status(400).send(error));
			})
			.catch((error) => res.status(400).send(error));
	},
	destroy(req, res) {
		return Plan
			.findById(req.params.id)
			.then(plan => {
				if (!plan) {
			        return res.status(400).send({
			          message: 'plan Not Found',
			        });
			    }
			    return plan
			    	.destroy()
			    	.then(() => res.status(204).send())
			    	.catch(error => res.status(400).send(error));
			})
			.catch(error => res.status(400).send(error));
	},

};