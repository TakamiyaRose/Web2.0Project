var mongoose = require('mongoose');
var schema = mongoose.Schema;
var foodSchema = {};
var foodModel;
var menuSchema = {};
var menuModel;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


var database = {
    connect: function () {
        mongoose.connect('mongodb://localhost:27017/projectFoodDB', function(err){
            if(err==null) {
                console.log("Connected to Mongo DB");

                foodSchema = schema({
                    name : String,
                    store : String,
                    costOfFood : String,
                    contactNumber : Number,
                    availability : Boolean
                });
                menuSchema = schema({
                    foodName : String,
                    store : String,
                    costOfFood : String,
                    image : String,
                    availability : Boolean
                });
                var connection = mongoose.connection;
                foodModel = connection.model('FoodDonations', foodSchema);
                menuModel = connection.model('menuItems', menuSchema);

            } else {
                console.log("Error connecting to Mongo DB");
            }
        })
    },



    //Food donation related
    getFoodDonations: function(callback){ //gets every donation in the database
        foodModel.find({}, callback);
    },
    donateFood: function (n, s, f, c, callback) { // adds a new donation to the database
        var newDonation = new foodModel({
            name : n,
            store : s,
            costOfFood : f,
            contactNumber : c,
            availability : true
        });
        newDonation.save(callback);
    },
    redeemFood: function(id){ // changes the availability of the donation to false searching by its id
        foodModel.findOneAndUpdate(
            {"_id" : id},
            {$set : {"availability" : false}}
        )    
    },



    //Store Menu Related
    getMenu: function(s, callback){ //gets every food item from the store name
        menuModel.find({store : s}, callback);
    },
    postMenu: function (f, s, c, i, callback) { //function for if we figure out how to make authentication for admin acc
        var newMenuFood = new menuModel({
            foodName : f,
            store : s,
            costOfFood : c,
            image : i,
            availability : true
        });
        newMenuFood.save(callback);
    },
    deleteFoodMenuItem: function(id,callback) { // Deleted food item by id
        menuModel.findByIdAndDelete(id,callback);
    }

}; //database end

module.exports = database;