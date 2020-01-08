/*
// Created by Academy on 20/10/16
// Controller for Managing Colleges
*/
var HttpStatus = require('http-status');
var College = require('../models/College');
var Country = require('../models/master/Country');
var State = require('../models/master/State');
var City = require('../models/master/City');
var Validation = require('../services/ValidationService');

//Export the save method to save a College
//Check if the College already exists
//throw a College already exists error
//If not then create the College
//Use the validationErrors service for any validation errors
exports.save = function(req, res){
    //Write your save code here
		   
		 var college = new College();
		college.name = req.body.name;
		college.addressLine1 = req.body.addressLine1;
		college.addressLine2 = req.body.addressLine2;
		college.state = req.body.state;
		college.city = req.body.city;
		college.country = req.body.country;
		// Default value should be true/active
		college.activeStatus = 'true';
		college.createdOn = new Date();
		college.updatedOn = new Date();
		college.save(function(saveErr, saveCollege) {
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
				data: college,
				error: ''
			});
		});

};

//Export the list method to return a list of all Colleges
exports.list = function(req, res){
    //Write your list code here
	College.find({})
		.populate('country')
			.populate('state')
				.populate('city')
            .exec(function(error, colleges) {
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
				status: 'success',
				code: HttpStatus.OK,
				data: colleges,
				error: ''
				});
		
            })
};

//Export the activeList method to return a list of all Active Colleges
exports.activeList = function(req, res){
	//Write your activeList code here
	College.find({activeStatus: true})
		.populate('country')
			.populate('state')
				.populate('city')
            .exec(function(error, colleges) {
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
				status: 'success',
				code: HttpStatus.OK,
				data: colleges,
				error: ''
				});
		
            })
};

//Export the getByCountry method to list 
//all active Colleges for a given Country
//The Country id is passed as id in the request parameters
exports.getByCountry = function(req, res){
    //Write your getByCountry code here
		College.find()
		.and([
			{ "country": req.params.id},
			{ "activeStatus": true}
		])
		.exec(function(error, colleges) {
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
				data: colleges,
				error: ''
				});
		})
};

//Export the get method to return
//a College object given the id in the request parameters
exports.get = function(req, res){
    //Write your get code here
	College.
			findOne({ _id: req.params.id })
				.populate('country')
				.populate('state')
				.populate('city')
					.exec(function(err, college) {

        if (err) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });

            return;
        }
        if (college == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: Validation.validationErrors("College not found")
            });
            return;
        } else {                 
            res.status(HttpStatus.OK).json({
                status: 'Success',
                code: HttpStatus.OK,
                data: college,
                error: ''
            });
        }
	});
};

//Export the update method
//Find the College by id passed in the request parameters 
//and update it with the College object in the request body
//Throw an error
//If the College name already exists
//If the College is not found
//Use the validationErrors service for any validation errors
exports.update = function(req, res){
    //Write your update code here
	   
	College.findById(req.params.id, function(err, college) {

        if (err) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });

            return;
        }
        if (college == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: Validation.validationErrors("College not found")
            });
            return;
        }
        college.name = req.body.name;
        college.addressLine1 = req.body.addressLine1;
		college.addressLine2 = req.body.addressLine2;
		college.state = req.body.state;
		college.city = req.body.city;
		college.country = req.body.country;
		college.updatedOn = new Date();
		college.save(function(saveErr, saveCollege) {
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
                data: saveCollege,
                error: ''
            });
        });
    })

};

//Export the activate method
//Find the College by the id request parameter
//Update the College activeStatus to true
//Throw an error
//If the College is not found
//Use the validationErrors service for any validation errors
exports.activate = function(req, res){
	//Write your activate code here
	College.findById(req.params.id, function(err, college) {

        if (err) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });

            return;
        }
        if (college == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: Validation.validationErrors("College not found")
            });
            return;
        }
        college.activeStatus = true;
		college.updatedOn = new Date();
		college.save(function(saveErr, saveCollege) {
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
                data: saveCollege,
                error: ''
            });
        });
    });
};

//Export the deactivate method
//Find the College by the id request parameter
//Update the College activeStatus to false
//Throw an error
//If the College is not found
//Use the validationErrors service for any validation errors
exports.deactivate = function(req, res){
	//Write your deactivate code here
	College.findById(req.params.id, function(err, college) {

        if (err) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });

            return;
        }
        if (college == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: Validation.validationErrors("College not found")
            });
            return;
        }
        college.activeStatus = false;
		college.updatedOn = new Date();
		college.save(function(saveErr, saveCollege) {
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
                data: saveCollege,
                error: ''
            });
        });
    });
};