var assert = require('assert');
var apiService = require('../src/services/placeService.js');
var apiModel = require('../src/models/placeModel.js');

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Places = require('../src/models/placeModel');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Places REST API Test', function () {

  afterEach((done) => {
    Places.find({ name: "T1" }).remove({}, (err) => {
      done();
    });
  });
  /*
  * Test the /GET route
  */
  describe('/GET Places', () => {
    it('it should GET all the places', (done) => {
      chai.request(server)
        .get('/places')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(3);
          done();
        });
    });
  });
  /*
  * Test the /GET route
  */
  describe('/GET Place by Name', () => {
    it('it should GET all the places by Name', (done) => {
      var name = "Home1";
      var url = '/places/' + name;
      chai.request(server)
        .get(url)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          done();
        });
    });
  });

  /*
  * Test the /POST route
  */
  describe('/POST Place', () => {
    it('it should add a place', (done) => {

      let newPlace = {
        latitude: 12,
        longitude: 23,
        address: "123, Main St, NJ 00745",
        desc: "Test Place",
        name: "T1"
      };

      chai.request(server)
        .post('/places')
        .send(newPlace)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.name.should.be.eql("T1");
          done();
        });
    });
  });
  /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id place', () => {
    it('it should DELETE a place given the id', (done) => {
      let newPlace = new Places({
        latitude: 12,
        longitude: 23,
        address: "123, Main St, NJ 00745",
        desc: "Test Place",
        name: "T1"
      });

      newPlace.save((err, newPlace) => {
      var url = '/places/' + newPlace.id;
      chai.request(server)
        .delete(url)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
      });
    });
  });

});