/*
// Created by Academy on 20/10/16
// Controller for Managing the Country Master
*/

var Country = require('../../models/master/Country');
var HttpStatus = require('http-status');
var Validation = require('../../services/ValidationService');
//Export the save method to save a Country
//Check if the country already exists 
//throw a country already exists error
//If not then create the country
//Use the validationErrors service for any validation errors
exports.save = function(req, res){
    //Write your save code here
           var country = new Country();
			country.name = req.body.name;
			// Default value should be true/active
			country.activeStatus = 'true';
			country.createdOn = new Date();
			country.updatedOn = new Date();
			country.save(function(saveErr, saveCountry) {
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
				data: country,
				error: ''
			});
            });
    
};

//Export the list method to return a list of all Countries
exports.list = function(req, res){
    //Write your list code here
	 Country.find({}, function(err, countries) {

        if (err) {
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
            data: countries,
            error: ''
        });

    })
	
};

//Export the activeList method to list all active Countries
exports.activeList = function(req, res){
    //Write your activeList code here
	
	 Country.find({activeStatus : true}, function(err, country) {
        if (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });
            return;
        }
        if (country == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: 'Country not found'
            });
            return;
        }
        res.status(HttpStatus.OK).json({
            status: 'success',
            code: HttpStatus.OK,
            data: country,
            error: ''
        });
    });
	
};

//Export the update method
//Find the Country by id passed in the request parameters 
//and update it with the country object in the request body
//Throw an error
//If the country name already exists
//If the country is not found
//Use the validationErrors service for any validation errors
exports.update = function(req, res){
    //Write your update code here
		Country.findById(req.params.id, function(err, country) {

        if (err) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });

            return;
        }
        if (country == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: 'Country not found'
            });
            return;
        }
        country.name = req.body.name;
		country.updatedOn = new Date();
        country.save(function(saveErr, saveCountry) {
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
                data: saveCountry,
                error: ''
            });
        });
    })

};

//Export the activate method
//Find the Country by the id in request parameter
//Update the Country's activeStatus to true
//Throw an error
//If the country is not found
//Use the validationErrors service for any validation errors
exports.activate = function(req, res){
    //Write your activate code here
	Country.findById(req.params.id, function(err, country) {

        if (err) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });

            return;
        }
        if (country == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: 'Country not found'
            });
            return;
        }
        country.activeStatus = true;
		country.updatedOn = new Date();
		//console.log("updated date" + state.updatedOn);
//		country.createdOn = req.body.createdOn;
        country.save(function(saveErr, saveCountry) {
            if (saveErr) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    status: 'failure',
                    code: HttpStatus.BAD_REQUEST,
                    data: '',
                    error: Validation.validatingErrors(saveErr)
                });
                return;
            }
            res.status(HttpStatus.OK).json({
                status: 'success',
                code: HttpStatus.OK,
                data: saveCountry,
                error: ''
            });
        });
    })
	
};

//Export the deactivate method
//Find the Country by the id in request parameter
//Update the Country's activeStatus to false
//Throw an error
//If the country is not found
//Use the validationErrors service for any validation errors
exports.deactivate = function(req, res){
    //Write your deactivate code here
Country.findById(req.params.id, function(err, country) {

        if (err) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });

            return;
        }
        if (country == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: 'Country not found'
            });
            return;
        }
        country.activeStatus = false;
		country.updatedOn = new Date();
		//console.log("updated date" + state.updatedOn);
//		country.createdOn = req.body.createdOn;
        country.save(function(saveErr, saveCountry) {
            if (saveErr) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    status: 'failure',
                    code: HttpStatus.BAD_REQUEST,
                    data: '',
                    error: Validation.validatingErrors(saveErr)
                });
                return;
            }
            res.status(HttpStatus.OK).json({
                status: 'success',
                code: HttpStatus.OK,
                data: saveCountry,
                error: ''
            });
        });
    })
	
};