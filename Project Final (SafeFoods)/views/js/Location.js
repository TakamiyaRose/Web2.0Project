$(document).ready(function () {
    $.ajax({
        url: "/Locations",
        method: "get"
    })

    .done(
        function(data){
        
            if(data.length>0) {
                $(".LocationsSection").show();
            }

            data.forEach(function (location) {
                $(".LocationsSection").append("Food to be delivered to <br>"  +location.address+"<br><br> Postal code would be <br>" + location.postalcode);
                
            
            });
    })   
    .fail(
        function(err) {
            console.log(err.responseText);
        }
    )

   
})