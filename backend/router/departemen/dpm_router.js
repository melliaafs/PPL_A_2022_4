const express = require('express');
const dpm = express.Router();

const departemen= require('../../controller/departemen/dpm_controller');
const VerifyOn = require('../../middleware/verifyUser');


dpm.get('/departemen',VerifyOn.verifyUser,VerifyOn.adminOnly,departemen.getDepartement );
dpm.post('/departemen', departemen.createDepartement);
dpm.get('/departemen/:id',VerifyOn.verifyUser,VerifyOn.adminOnly, departemen.getDepartementById)
dpm.put('/departemen/:id',VerifyOn.verifyUser,VerifyOn.adminOnly, departemen.updateDepartement)
dpm.delete('/departemen/:id',VerifyOn.verifyUser,VerifyOn.adminOnly, departemen.deletedDepartement)



module.exports = dpm;
