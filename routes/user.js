const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");
const router = require("express").Router();
const User = require("../models/User");

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if(req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.PASS_SEC
            ).toString();
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },{new: true}
        );
        res.status(200).json(updatedUser);
    }catch(err) {res.status(500).json(err)};
    });
// router.get("/try",verifyToken, (req, res) => {
//     res.status(200).json(req.user)}
// );
// router.get("/usertest", (req, res) => {
//     res.send("user test is successful");
// });

// router.post("/userposttest", (req, res) => {
//     const username = req.body.username;
//     console.log(username);
//     res.send("your username is: " + username);
// });
module.exports = router