var bodyParser = require('body-parser');
var locationController = require('./Controllers/locationController.js');

var db = require('./services/dataservice.js');

db.connect();

var routes = function () {
    var router = require('express').Router();
    
    router.use(bodyParser.urlencoded({
        extended: true
    }));

    router.get('/', function(req, res) {
        res.sendFile(__dirname+"/views/index.html");
    });

    router.get('/', function(req, res) {
        res.sendFile(__dirname+"/views/English Pages/index.html");
    });

    router.get('/Donate', function(req,res){
        res.sendFile(__dirname+"/views/English Pages/DonateAMeal.html");
    });

    router.get('/Redeem', function(req,res){
        res.sendFile(__dirname+"/views/English Pages/RedeemAMeal.html");
    });

    router.get('/Chinese', function(req,res){
        res.sendFile(__dirname+"/views/English Pages/ChineseStall.html");
    });

   
    router.get('/api/chineseMenu', function (req, res) {
        db.getMenu("Chinese Store", function(err,menu){
            if (err) {
                res.status(500).send("Unable to get all food donations from database");
            } else {
                res.status(200).send(menu);
            }
        })
    })

    router.get('/Malay', function(req,res){
        res.sendFile(__dirname+"/views/English Pages/MalayStall.html");
    });

    router.get('/api/malayMenu', function (req, res) {
        db.getMenu("Malay Store", function(err,menu){
            if (err) {
                res.status(500).send("Unable to get all food donations from database");
            } else {
                res.status(200).send(menu);
            }
        })
    })

    router.get('/Indian', function(req,res){
        res.sendFile(__dirname+"/views/English Pages/IndianStall.html");
    });

    router.get('/api/indianMenu', function (req, res) {
        db.getMenu("Indian Store", function(err,menu){
            if (err) {
                res.status(500).send("Unable to get all food donations from database");
            } else {
                res.status(200).send(menu);
            }
        })
    })

    router.get('/About', function(req,res){
        res.sendFile(__dirname+"/views/English Pages/AboutUs.html");
    });
    
    router.get('/Payment', function(req,res){
        res.sendFile(__dirname+"/views/English Pages/Payment.html");
    });

    router.get('/Location', function(req,res){
        res.sendFile(__dirname+"/views/English Pages/Location.html");
    });

    router.get('/ThankYou', function(req,res){
        res.sendFile(__dirname+"/views/English Pages/ThankYou.html");
    });

    router.get('/Locations',function(req,res){
        res.send(locationController.getLocations());
    })

    router.post('/Locations',function(req,res)
    {
        var data = req.body;

        var location = {

            address:data.address,
            postalcode:data.postalcode
        }

       

        locationController.addLocations(location);
        
        res.redirect('back');


    })

   


   router.get('/css/*', function(req, res)  {
        res.sendFile(__dirname+"/views/"+req.originalUrl);
    });

    router.get('/Images/*', function(req, res)  {
        res.sendFile(__dirname+"/views"+req.originalUrl);
    });
    
    router.get('/js/*', function(req, res)  {
        res.sendFile(__dirname+"/views/"+req.originalUrl);
    });

    // Food donations Related
    router.get('/api/foodDonations', function (req, res) {
        db.getFoodDonations(function(err,donations){
            if (err) {
                res.status(500).send("Unable to get all food donations from database");
            } else {
                res.status(200).send(donations);
            }
        })
    })

    //add Donation to database
    router.post('/api/foodDonations', function (req, res) {
        var data = req.body;
        db.donateFood(data.name,data.store,data.costOfFood,data.contactNumber,function(err,donation){
            if (err) {
                res.status(500).send("Unable to add your new donation to the database");
            } else {
                res.sendFile(__dirname+"/views/English Pages/ThankYou.html");
            }
        })
    });

    router.put('/api/foodDonations/:id', function (req, res) {
        var data = req.body;
        db.redeemFood(data._id,function(err,donation){
            if (err) {
                res.status(500).send("Unable to redeem the donation");
            } else {
                if (donation==null || donation.n == 0) {
                    res.status(200).send("No donation exists");
                } else {
                    res.status(200).sendFile(__dirname+"/views/English Pages/Location.html");
                }
            } 
        })
    });

    //Store menu related
    router.post('/api/menuItems', function (req, res) { //function for if we figure out how to make authentication for admin acc
        var data = req.body;
        db.postMenu(data.foodName,data.store,data.costOfFood,data.image,function(err,menu){
            if (err) {
                res.status(500).send("Unable to add your new donation to the database");
            } else {
                res.status(200).send(menu);
            }
        })
    });

    return router;

};

module.exports = routes();