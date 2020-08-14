$(document).ready(function () {
    $.ajax({
        url: "/api/foodDonations",
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function(donation) {
                    $(".donationsList").append(
                    `
                <form action="api/foodDonations/?id" method="put">
                    <h4>Thank You, <label for="name">${donation.name}</label></h4>
                    Donation for <br>
                    <label for="store">${donation.store}</label><br>
                    <br>For foods that cost <br>
                    <label for="costOfFood">${donation.costOfFood}</label> <br>         
                    <input type="hidden" name="_id" value="${donation._id}"/>
                    <input class="redeemDonationsBtn" type="submit" value="Redeem"/>
               </form>
                   <br>
                    `);
                });
            }
        )
        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )

        $(".redeemDonationsBtn").on("click", () => {
            var _id = $(donation._id).val();
            $.ajax(
                {
                    url: '/api/foodDonations/:id',
                    method: 'put',
                    data: { _id: _id}
                }
            ).done(function (data) {
                $(".statusMessage").text(data);
            }).fail(function (err) {
                console.log(err.responseText);
            });
    
        });
})