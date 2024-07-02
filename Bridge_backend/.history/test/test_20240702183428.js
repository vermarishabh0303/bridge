const request = require('supertest');
const express = require('express');
const app = require('../app'); // Make sure to correctly require your app

describe('GET /Tokens', function() {
  it('should return a 200 status code', function(done) {
    request(app)
      .get('/Tokens')
      .expect(200, done);
  });
});

describe('GET /quote', function() {
  it('should return a 200 status code', function(done) {
    request(app)
      .get('/quote')
      .expect(200, done);
  });
});

