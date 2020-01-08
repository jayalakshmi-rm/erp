/*
// Created by Academy on 20/10/16
// Controller for managing the State Master
*/

var State = require('../../models/master/State');
var Country = require('../../models/master/Country');
var City = require('../../models/master/City');
var HttpStatus = require('http-status');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Validation = require('../../services/ValidationService');

//Export the save method to save a State
//Check if the State already exists 
//throw a State already exists error
//If not then create the State
//Use the validationErrors service for any validation errors
exports.save = function(req, res){
    //Write your save code here
				 var state = new State();
					state.name = req.body.name;
					state.country = req.body.country;
					// Default value should be true/active
					state.activeStatus = 'true';
					state.createdOn = new Date();
					state.updatedOn = new Date();
					state.save(function(saveErr, saveState) {
					if (saveErr) {
						res.status(HttpStatus.BAD_REQUEST).json({
							status: 'failure',
							code: HttpStatus.BAD_REQUEST,
							data: '',
						    error: Validation.validationErrors(saveErr)
						});
						return;
					}
					res.status(HttpStatus.OK).json({
						status: 'Success',
						code: HttpStatus.OK,
						data: state,
						error: ''
					});
				});
		

};

//Export the list method to return a list of all States
exports.list = function(req, res){
    //Write your list code here

	State.find({})
		.populate('country')
            .exec(function(error, states) {
				if (error) {
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'Unexpected error in accessing data'
				});
				return;
        }
				res.status(HttpStatus.OK).json({
				status: 'success',
				code: HttpStatus.OK,
				data: states,
				error: ''
				});
		
            })
};

//Export the activeList method to list all active States
exports.activeList = function(req, res){
    //Write your activeList code here
	State.find({activeStatus : true}, function(err, state) {
        if (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });
            return;
        }
        if (state == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: 'State not found'
            });
            return;
        }
        res.status(HttpStatus.OK).json({
            status: 'Success',
            code: HttpStatus.OK,
            data: state,
            error: ''
        });
    });
};

//Export the getByCountry method to list 
//all States for a given Country
//The Country id is passed as id in the request parameters
exports.getByCountry = function(req, res){
    //Write your getbyCountry code here
	State.find( { "country": req.params.id} )
		.exec(function(error, states) {
				if (error) {
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
				});
				return;
				}
				res.status(HttpStatus.OK).json({
				status: 'Success',
				code: HttpStatus.OK,
				data: states,
				error: ''
				});
		
            })
};

//Export the update method
//Find the State by id passed in the request parameters 
//and update it with the State object in the request body
//Throw an error
//If the State name already exists
//If the State is not found
////Use the validationErrors service for any validation errors
exports.update = function(req, res){
    //Write your update code here
	State.find({name : {$regex : new RegExp("^"+req.body.name+"$", "i")}}, function(err, state) {
		// check if length is zero which means to create/save object
		// else is existing state
	   
			State.findById(req.params.id, function(err, state) {

        if (err) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });

            return;
        }
        if (state == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: 'State not found'
            });
            return;
        }
        state.name = req.body.name;
        state.country = req.body.country;
		state.updatedOn = new Date();
		state.save(function(saveErr, saveState) {
            if (saveErr) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    status: 'failure',
                    code: HttpStatus.BAD_REQUEST,
                    data: '',
                    error: Validation.validationErrors(saveErr)
                });
                return;
            }
            res.status(HttpStatus.OK).json({
                status: 'success',
                code: HttpStatus.OK,
                data: saveState,
                error: ''
            });
        });
    })

	});
};

//Export the activate method
//Find the State by the id request parameter
//Update the State activeStatus to true
//Throw an error
//If the State is not found
//Use the validationErrors service for any validation errors
exports.activate = function(req, res){
    //Write your activate code here
	State.findById(req.params.id, function(err, state) {

        if (err) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });

            return;
        }
        if (state == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: 'State not found'
            });
            return;
        }
        state.activeStatus = true;
		state.updatedOn = new Date();
        state.save(function(saveErr, saveState) {
            if (saveErr) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    status: 'failure',
                    code: HttpStatus.BAD_REQUEST,
                    data: '',
                    error: Validation.validationErrors(saveErr)
                });
                return;
            }
            res.status(HttpStatus.OK).json({
                status: 'success',
                code: HttpStatus.OK,
                data: saveState,
                error: ''
            });
        });
    })
};

//Export the deactivate method
//Find the State by the id request parameter
//Update the State activeStatus to false
//Throw an error
//If the State is not found
//Use the validationErrors service for any validation errors
exports.deactivate = function(req, res){
    //Write your deactivate code here
	State.findById(req.params.id, function(err, state) {

        if (err) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });

            return;
        }
        if (state == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: 'State not found'
            });
            return;
        }
        state.activeStatus = false;
		state.updatedOn = new Date();
        state.save(function(saveErr, saveState) {
            if (saveErr) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    status: 'failure',
                    code: HttpStatus.BAD_REQUEST,
                    data: '',
                    error: Validation.validationErrors(saveErr)
                });
                return;
            }
            res.status(HttpStatus.OK).json({
                status: 'success',
                code: HttpStatus.OK,
                data: saveState,
                error: ''
            });
        });
    })
	
};