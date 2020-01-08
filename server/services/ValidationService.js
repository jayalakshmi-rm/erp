/*
// Created on 2nd Dec
// Create ValidationService with a single function validationErrors
// Capture the mongodb errors and return them as Understandable messages
// For example if a required field is not included, then capture the error
// return <field name> is Required
*/
exports.validationErrors = function (err) {
    var errors = {};
        switch (err.name) {
			
            case 'ValidationError':
                for (field in err.errors) {
                    switch (err.errors[field].kind) {
                        case 'required':
						
                            errors[field] = [field] + ' is required';
                            break;
                        case 'user defined':
                            errors[field] = 'Already Exist';
                            break;
                        case 'enum':
                            errors[field] = 'Invalid ' + [field];
                    }
                }
                break;
            case 'CastError':
                console.log(err.type);
                if (err.type === 'number') {
                    errors[err.path] = [err.path] + ' must be a Number';
                }
                if (err.type === 'date') {
                    errors[err.path] = [err.path] + ' must be a Valid Date';
                }
                if (err.type === 'ObjectId') {
                    errors[err.path] = [err.path] + ' is NotValid';
                }
                break;
				
			 case 'MongoError':
			 errors.name = 'Already Exist';
                break;
        }
    return errors;
};