/*
// Created by Academy on 20/10/16
*/
var HttpStatus = require('http-status');

var StudentController = require('./controllers/StudentController');
var CountryController = require('./controllers/master/CountryController');
var StateController = require('./controllers/master/StateController');
var CityController = require('./controllers/master/CityController');
var CollegeController = require('./controllers/CollegeController');
var HostelController = require('./controllers/HostelController');

module.exports = function(router){

	router.all('/', function (req, res) {
		res.sendFile('index.html', { root:'./public/'});
	});

    router.all('/isServerRunning', function(req,res) {
        res.status(200).json({code:200, data: "Server Running..."})
    });

    router.all('/getTime', function(req,res) {
        res.status(200).json({code:200, data: {date: new Date().toUTCString()}})
    });

    /*
        Add your routes here
     */

    // Student routes
	router.post('/college/:id/student', StudentController.save);
	//router.get('/students', StudentController.list);
	router.put('/student/:id', StudentController.update);
    router.put('/student/:id/deactivate', StudentController.deactivate); 
	router.put('/student/:id/activate', StudentController.activate); 
	router.get('/college/:id/students',  StudentController.getByCollege)
	router.get('/student/:id',  StudentController.get);

    // Country routes
	router.post('/country', CountryController.save); // save country
	router.get('/activeCountries', CountryController.activeList); // get active country list
	router.get('/countries', CountryController.list)// get entire country list
	router.put('/country/:id', CountryController.update); // update country
    router.put('/country/:id/deactivate', CountryController.deactivate); // deactivate country
	router.put('/country/:id/activate', CountryController.activate); // activate country	
	// State routes
	router.post('/state', StateController.save); // save state
	router.get('/activeStates', StateController.activeList); // get active state list
	router.get('/states', StateController.list)// get entire state list
	router.put('/state/:id', StateController.update); // update state
	router.put('/state/:id/deactivate', StateController.deactivate); // deactivate state
	router.put('/state/:id/activate', StateController.activate); // activate state	
	router.get('/country/:id/states',  StateController.getByCountry);// get state list by country
    // College routes
	router.post('/college', CollegeController.save);
	router.get('/colleges', CollegeController.list);
	router.get('/college/:id', CollegeController.get);
	router.put('/college/:id', CollegeController.update);
    router.put('/college/:id/deactivate', CollegeController.deactivate); 
	router.put('/college/:id/activate', CollegeController.activate); 
	router.get('/country/:id/colleges',  CollegeController.getByCountry)
    
    // Hostel routes
	router.post('/hostel', HostelController.save);
	router.get('/hostels', HostelController.list);
	router.put('/hostel/:id', HostelController.update);
    router.put('/hostel/:id/deactivate', HostelController.deactivate); 
	router.put('/hostel/:id/activate', HostelController.activate); 
	router.get('/college/:id/hostels',  HostelController.getByCollege)
	router.get('/college/:id/activeHostels',  HostelController.activeListByCollege)
	router.get('/hostel/:id', HostelController.get);
    // City routes
    router.post('/city', CityController.save);
	router.get('/city/:id', CityController.get);
	router.get('/cities', CityController.list);
	router.put('/city/:id', CityController.update);
    router.put('/city/:id/deactivate', CityController.deactivate); 
	router.put('/city/:id/activate', CityController.activate); 
	router.get('/state/:id/cities',  CityController.getByState);// get city list by state
};