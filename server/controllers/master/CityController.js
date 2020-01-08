/*
// Created by Academy on 20/10/16
// Controller for Managing City Master
*/

var HttpStatus = require('http-status');
var State = require('../../models/master/State');
var City = require('../../models/master/City');
var Validation = require('../../services/ValidationService');

//Export the save method to save a City
//Check if the city already exists 
//throw a city already exists error
//If not then create the city
//Use the validationErrors service for any validation errors
exports.save = function(req, res){
    //Write your save code here
	   
		 var city = new City();
		city.name = req.body.name;
		city.state = req.body.state;
		// Default value should be true/active
		city.activeStatus = 'true';
		city.createdOn = new Date();
		city.updatedOn = new Date();
		city.save(function(saveErr, saveCity) {
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
				data: city,
				error: ''
			});
		});
};

//Export the list method to return a list of all Cities
exports.list = function(req, res){
    //Write your list code here
		City.find({})
		.populate('state')
            .exec(function(error, cities) {
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
				data: cities,
				error: ''
				});
		
            })
};


//Export the activeList method to list all active Cities
exports.activeList = function(req, res){
    //Write your activeList code here
	City.find({activeStatus : true}, function(err, city) {
        if (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });
            return;
        }
        if (city == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: 'City not found'
            });
            return;
        }
        res.status(HttpStatus.OK).json({
            status: 'Success',
            code: HttpStatus.OK,
            data: city,
            error: ''
        });
    });
};

//Export the getByState method to list 
//all active Cities for a given State
//The state id is passed as id in the request parameters
exports.getByState = function(req, res){
    //Write your code to get the list of Cities for a given state
	City.find()
		.and([
			{ "state": req.params.id},
			{ "activeStatus": true}
		])
		.exec(function(error, cities) {
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
				data: cities,
				error: ''
				});
		
            })
}

//Export the get method to return
//a City object given the id in the request parameters
exports.get = function(req, res){
    //Write your code the  get a city for given an id
	City.findById(req.params.id, function(err, city) {

        if (err) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });

            return;
        }
        if (city == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: Validation.validationErrors("City not found")
            });
            return;
        } else {                 
            res.status(HttpStatus.OK).json({
                status: 'Success',
                code: HttpStatus.OK,
                data: city,
                error: ''
            });
        }
    })
	
};

//Export the update method
//Find the city by id passed in the request parameters 
//and update it with the city object in the request body
//Throw an error
//If the city name already exists
//If the city is not found
//Use the validationErrors service for any validation errors
exports.update = function(req, res){
    //Write your update code here
	   
	City.findById(req.params.id, function(err, city) {

        if (err) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });

            return;
        }
        if (city == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: 'City not found'
            });
            return;
        }
        city.name = req.body.name;
        city.state = req.body.state;
		city.updatedOn = new Date();
		city.save(function(saveErr, saveCity) {
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
                data: saveCity,
                error: ''
            });
        });
    })
};

//Export the activate method
//Find the city by the id request parameter
//Update the city activeStatus to true
//Throw an error
//If the city is not found
//Use the validationErrors service for any validation errors
exports.activate = function(req, res){
    //Write your activate code here
	City.findById(req.params.id, function(err, city) {

        if (err) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });

            return;
        }
        if (city == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: 'City not found'
            });
            return;
        }
		city.activeStatus = true;
		city.updatedOn = new Date();
		city.save(function(saveErr, saveCity) {
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
                data: saveCity,
                error: ''
            });
        });
    })
};

//Export the deactivate method
//Find the city by the id request parameter
//Update the city activeStatus to false
//Throw an error
//If the city is not found
//Use the validationErrors service for any validation errors
exports.deactivate = function(req, res){
    //Write your deactivate code here
	City.findById(req.params.id, function(err, city) {

        if (err) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });

            return;
        }
        if (city == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: 'City not found'
            });
            return;
        }
		city.activeStatus = false;
		city.updatedOn = new Date();
		city.save(function(saveErr, saveCity) {
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
                data: saveCity,
                error: ''
            });
        });
    })
};