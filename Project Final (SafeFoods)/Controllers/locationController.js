var location = [];


var locationController = {

    getLocations:function()
    {
        return location;
       
    },

    addLocations: function(newLocation){

        location.push(newLocation);
       
    },

    
};

module.exports=locationController;