var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);


describe('ERP', function() {
  it('should list ALL country on /countries GET', function(done) {
  chai.request('http://localhost:5000')
    .get('/countries')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
});


it('should active list ALL country on /activeCountries GET', function(done) {
    chai.request('http://localhost:5000')
	.get('/activeCountries')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
});

it('should list ALL city by providing STATE ID on /state/:id/cities GET', function(done) {
    chai.request('http://localhost:5000')
	.get('/state/5a214606dbf58f099c8f8fdd/cities')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
});


it('should list ALL active colleges by providing country ID on /country/:id/colleges GET', function(done) {
    chai.request('http://localhost:5000')
	.get('/country/5a2145fddbf58f099c8f8fdc/colleges')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
});


it('should list ALL active hostels by providing college ID on /college/:id/activeHostels GET', function(done) {
    chai.request('http://localhost:5000')
	.get('/college/5a1fd9d9cdff6021e8fd58f1/activeHostels')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
});
});
