const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize');
const Role = require('../_helpers/role');
const workflowService = require('./workflow.service');

// routes
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.get('/employee/:employeeid', authorize(), getByEmployeeId);
router.post('/', authorize(), createSchema, create);
router.post('/onboarding', authorize(), onboardingSchema, createOnboarding);
router.put('/:id', authorize(), updateSchema, update);
router.put('/:id/status', authorize(), updateStatusSchema, updateStatus);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
    workflowService.getAll()
        .then(workflows => res.json(workflows))
        .catch(next);
}

function getById(req, res, next) {
    workflowService.getById(req.params.id)
        .then(workflow => res.json(workflow))
        .catch(next);
}

function getByEmployeeId(req, res, next) {
    workflowService.getByEmployeeId(req.params.employeeid)
        .then(workflows => res.json(workflows))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        employeeid: Joi.number().required(),
        type: Joi.string().required(),
        details: Joi.string().allow('', null),
        status: Joi.string().default('Completed'),
        comments: Joi.string().allow('', null),
        handledBy: Joi.number().allow(null)
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    workflowService.create(req.body)
        .then(workflow => res.json(workflow))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        type: Joi.string(),
        details: Joi.string().allow('', null),
        status: Joi.string()
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    workflowService.update(req.params.id, req.body)
        .then(workflow => res.json(workflow))
        .catch(next);
}

function updateStatusSchema(req, res, next) {
    const schema = Joi.object({
        status: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function updateStatus(req, res, next) {
    workflowService.updateStatus(req.params.id, req.body.status)
        .then(workflow => res.json(workflow))
        .catch(next);
}

function _delete(req, res, next) {
    workflowService.delete(req.params.id)
        .then(() => res.json({ message: 'Workflow deleted successfully' }))
        .catch(next);
}

function onboardingSchema(req, res, next) {
    const schema = Joi.object({
        employeeid: Joi.number().required(),
        details: Joi.string().allow('', null),
        type: Joi.string().default('Onboarding'),
        status: Joi.string().default('Pending')
    });
    validateRequest(req, next, schema);
}

function createOnboarding(req, res, next) {
    workflowService.createOnboarding(req.body)
        .then(workflow => res.json(workflow))
        .catch(next);
} 