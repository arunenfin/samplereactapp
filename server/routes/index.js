const express = require('express');
const router = express.Router();
const adminService = require('../services/admins.service');

/* Login */
router.post('/', async (req, res, next) => {
  try {
    const token = await adminService.authenticate(req.body);
    res.json({ success: true, token });
  } catch(e) {
    res.json({ success: false });
  }
});

module.exports = router;
