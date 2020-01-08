/*
// Created by Academy on 20/10/16
// Controller for Managing Hostels
*/

var HttpStatus = require('http-status');
var College = require('../models/College');
var Hostel = require('../models/Hostel');
var Validation = require('../services/ValidationService');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

//Export the save method to save a Hostel
//Check if the Hostel already exists for the given College
//throw a Hostel already exists error
//If not then create the Hostel for the Given College
//Use the validationErrors service for any validation errors
exports.save = function(req, res){
    //Write your save code here
		
				 var hostel = new Hostel();
				hostel.name = req.body.name;
				//console.log("request body -- "+req.body.countries);
				//console.log("request body 111 -- "+req.body.countries.country[0]);
				hostel.college = req.body.college;
				//console.log("country -- "+req.body.country._id);
				// Default value should be true/active
				hostel.activeStatus = 'true';
				hostel.createdOn = new Date();
				hostel.updatedOn = new Date();
				hostel.save(function(saveErr, saveHostel) {
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
						data: hostel,
						error: ''
					});
				});
	
};

//Export the list method to return a list of all Hostels
exports.list = function(req, res){
    //Write your list code here
	
	Hostel.find({})
		.populate('college')
            .exec(function(error, hostels) {
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
				data: hostels,
				error: ''
				});
		
            })
};

//Export the getByCollege method to list 
//all Hostels for a given College
//The College id is passed as id in the request parameters
exports.getByCollege = function(req, res){
    //Write your getByCollege code here
	Hostel.
			find({college:req.params.id})
				.populate('college')
					.exec(function(err, hostels) {

        if (err) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });

            return;
        }
        if (hostels == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: Validation.validationErrors("Hostel not found")
            });
            return;
        } else {                 
            res.status(HttpStatus.OK).json({
                status: 'Success',
                code: HttpStatus.OK,
                data: hostels,
                error: ''
            });
        }
	});
};

//Export the activeListByCollege method to list 
//all active Hostels for a given College
//The College id is passed as id in the request parameters
exports.activeListByCollege = function(req, res){
    //Write your activeListByCollege code here
	Hostel.find()
		.and([
				{ "college": req.params.id},
				{ "activeStatus": true}
			])	
				.populate('college')
					.exec(function(err, hostels) {

        if (err) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });

            return;
        }
        if (hostels == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: Validation.validationErrors("Hostel not found")
            });
            return;
        } else {                 
            res.status(HttpStatus.OK).json({
                status: 'Success',
                code: HttpStatus.OK,
                data: hostels,
                error: ''
            });
        }
	});
}

//Export the get method to return
//a Hostel object given the id in the request parameters
exports.get = function(req, res){
    //Write your get code here
		Hostel.findById(req.params.id, function(err, hostel) {

        if (err) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });

            return;
        }
        if (hostel == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: Validation.validationErrors("Hostel not found")
            });
            return;
        } else {                 
            res.status(HttpStatus.OK).json({
                status: 'Success',
                code: HttpStatus.OK,
                data: hostel,
                error: ''
            });
        }
    })
};

//Export the update method
//Find the Hostel by id passed in the request parameters 
//and update it with the Hostel object in the request body
//Throw an error
//If the Hostel name already exists
//If the Hostel is not found
////Use the validationErrors service for any validation errors
exports.update = function(req, res){
    //Write your update code here
		   
			Hostel.findById(req.params.id, function(err, hostel) {

        if (err) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });

            return;
        }
        if (hostel == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: 'Hostel not found'
            });
            return;
        }
        hostel.name = req.body.name;
        hostel.country = req.body.country;
		hostel.updatedOn = new Date();
		hostel.save(function(saveErr, saveHostel) {
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
                data: saveHostel,
                error: ''
            });
        });
    })

};

//Export the activate method
//Find the Hostel by the id request parameter
//Update the Hostel activeStatus to true
//Throw an error
//If the Hostel is not found
//Use the validationErrors service for any validation errors
exports.activate = function(req, res){
    //Write your activate code here
	Hostel.findById(req.params.id, function(err, hostel) {

        if (err) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });

            return;
        }
        if (hostel == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: 'Hostel not found'
            });
            return;
        }
        hostel.activeStatus = true;
		hostel.updatedOn = new Date();
        hostel.save(function(saveErr, saveHostel) {
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
                data: saveHostel,
                error: ''
            });
        });
    })
};

//Export the deactivate method
//Find the Hostel by the id request parameter
//Update the Hostel activeStatus to false
//Throw an error
//If the Hostel is not found
//Use the validationErrors service for any validation errors
exports.deactivate = function(req, res){
    //Write your deactivate code here
	Hostel.findById(req.params.id, function(err, hostel) {

        if (err) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });

            return;
        }
        if (hostel == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: 'Hostel not found'
            });
            return;
        }
        hostel.activeStatus = false;
		hostel.updatedOn = new Date();
        hostel.save(function(saveErr, saveHostel) {
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
                data: saveHostel,
                error: ''
            });
        });
    })
};