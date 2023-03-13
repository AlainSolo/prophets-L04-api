const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('prophets').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('prophets')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};
//request the information to get ready to send to the database mongoDB
const createInfo = async (req, res) => {
  const details = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().db().collection('contacts').insertOne(details);
// If acknowledged is true, then the MongoDB server has acknowledged the write concern. If false , 
//then the write concern is not enabled. The MongoDB server will still write data.
//http code 201  status code means that a request is successful to a resource that was created as a result.
//Http code  500 internal server error is a general error message. It covers unexpected issues that don't fit into existing error codes. 
//HTTP 500 errors are difficult to troubleshoot because a range of issues on the server side can trigger them.
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the info.');
  }
};
//In case the data already in the database mongoDb, then we update the info
const updateInfo = async (req, res) => {

  const infoId = new ObjectId(req.params.id);
  // 
  const details = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  }
  const response = await mongodb.getDb().db().collection('contacts').replaceOne({ _id: infoId }, details);

  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the info.');
  }
  

  };
  //In case to delete
  const deleteInfo = async (req, res) => {
    const infoId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('prophets').remove({ _id: infoId }, true);
  
//The HTTP 204 means no Content success status response code indicates that a request has succeeded, 
//but that the client doesn't need to navigate away from its current page.
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the info.');

    }
  };
module.exports = { getAll, getSingle, createInfo, updateInfo, deleteInfo }
