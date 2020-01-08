/*
// Created by Academy on 20/10/16
// Controller for Managing Students
*/
var Student = require('../models/Student');
var College = require('../models/College');
var Hostel = require('../models/Hostel');
var Validation = require('../services/ValidationService');
var HttpStatus = require('http-status');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

//Export the save method to save a Student
//Check if the Roll No already exists 
//throw a Roll no already exists error
//If not then create the Student
//Use the validationErrors service for any validation errors
exports.save = function(req, res){
    //Write your save code here
	   
		 var student = new Student();
		student.name = req.body.name;
	//	student.email = req.body.email;
		student.rollNo = req.body.rollNo;
		student.mobileNumber = req.body.mobileNumber;
		student.dob = req.body.dob;
		student.yearOfJoining = req.body.yearOfJoining;
		student.year = req.body.year;
		student.college = req.params.id;
		student.hostel = req.body.hostel;
		// Default value should be true/active
		student.activeStatus = 'true';
		student.createdOn = new Date();
		student.updatedOn = new Date();
		student.save(function(saveErr, student) {
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
				data: student,
				error: ''
			});
		});

};

//Export the get method to return
//a Student object given the id in the request parameters
//If the student is not found
//Throw a student not found error
exports.get = function(req, res){
    //Write your get code here
	Student
		.findOne({ _id: req.params.id })
            .exec(function(err, student) {
			 if (err) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });

            return;
        }
        if (student == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: Validation.validationErrors("Student not found")
            });
            return;
        } else {                 
            res.status(HttpStatus.OK).json({
                status: 'Success',
                code: HttpStatus.OK,
                data: student,
                error: ''
            });
        }
		
    })
};

//Export the list method to return a list of all Students
exports.list = function(req, res){
    //Write your list code here
		Student.find({})
		.populate('college')
		.populate('hostel')
            .exec(function(error, students) {
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
				data: students,
				error: ''
				});
		
            })
};

//Export the getByCollege method to list 
//all active Students for a given Student
//The Student id is passed as id in the request parameters
exports.getByCollege = function(req,res){
    //Write your getByCollege code here
	Student.
			find({college:req.params.id})
				.populate('college')
				.populate('hostel')
					.exec(function(err, students) {

        if (err) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });

            return;
        }
        if (students == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: Validation.validationErrors("student not found")
            });
            return;
        } else {                 
            res.status(HttpStatus.OK).json({
                status: 'Success',
                code: HttpStatus.OK,
                data: students,
                error: ''
            });
        }
	});
};

//Export the update method
//Find the Student by id passed in the request parameters 
//and update it with the Student object in the request body
//Throw an error
//If the Student Roll No already exists
//If the Roll No is not found
//Use the validationErrors service for any validation errors
exports.update = function(req, res){
    //Write your update code here
   
			Student.findById(req.params.id, function(err, student) {

        if (err) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });

            return;
        }
        if (student == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: 'Student not found'
            });
            return;
        }
		
		student.name = req.body.name;
		student.rollNo = req.body.rollNo;
		student.mobileNumber = req.body.mobileNumber;
		student.dob = req.body.dob;
		student.yearOfJoining = req.body.yearOfJoining;
		student.year = req.body.year;
		student.college = req.body.college;
		student.hostel = req.body.hostel;
		student.activeStatus = req.body.activeStatus;
		student.updatedOn = new Date();
		student.save(function(saveErr, saveStudent) {
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
                data: saveStudent,
                error: ''
            });
        });
    })

	
};

//Export the activate method
//Find the Student by the id request parameter
//Update the Student activeStatus to true
//Throw an error
//If the Student is not found
//Use the validationErrors service for any validation errors
exports.activate = function(req, res){
    //Write your activate code here
	Student.findById(req.params.id, function(err, student) {

        if (err) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });

            return;
        }
        if (student == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: 'Student not found'
            });
            return;
        }
        student.activeStatus = true;
		student.updatedOn = new Date();
        student.save(function(saveErr, saveStudent) {
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
                data: saveStudent,
                error: ''
            });
        });
    })
};

//Export the deactivate method
//Find the Student by the id request parameter
//Update the Student activeStatus to false
//Throw an error
//If the Student is not found
//Use the validationErrors service for any validation errors
exports.deactivate = function(req, res){
    //Write your deactivate code here
	Student.findById(req.params.id, function(err, student) {

        if (err) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });

            return;
        }
        if (student == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: 'Student not found'
            });
            return;
        }
        student.activeStatus = false;
		student.updatedOn = new Date();
        student.save(function(saveErr, saveStudent) {
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
                data: saveStudent,
                error: ''
            });
        });
    })
};
