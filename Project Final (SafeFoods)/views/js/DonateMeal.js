$(document).ready(function () {
    $.ajax({
        url: "/api/foodDonations",
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function(donation) {
                    $(".donations").append(
                    `<table class="donationTable">
                     <tr>
                    <th>Name:${donation.name}<br><br>
                   
                    ${donation.store}<br><br>
                    
                    Cost:${donation.costOfFood}</th><br><br>
                   
                    </tr>
                    </table>
                   
                 `);
                });
            }
        )
        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )
})