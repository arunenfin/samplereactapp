const express = require('express');
const router = express.Router();
const userService = require('../services/users.service');
const multer  = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '../public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
const upload = multer({ storage: storage })

/* GET users listing. */
router.get('/:id?', async (req, res, next) => {
  try {
    if(req.params.id) {
      const user = await userService.getUserById(req.params);
      res.json({ success: true, user });
    } else {
      const users = await userService.getUsers();
      res.json({ success: true, users });
    }
  } catch(e) {
    res.json({ success: false });
  }
});

router.put('/', upload.single('image'), async (req, res, next) => {
  try {
    await userService.updateUserById(req.body)
    res.json({ success: true });
  } catch(e) {
    res.json({ success: false });
  }
})

module.exports = router;
