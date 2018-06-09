var express = require('express');
var mongoose = require('mongoose');
var User = require('../dbSchemas/userAdvocate');
var session = require('express-session');
var Product = require('../dbSchemas/productAdvocate');
// Getting the Scheme Contract
var Contract  = require('../dbSchemas/contractAdvocate');
var fs = require('fs');
var crypto = require("crypto");


