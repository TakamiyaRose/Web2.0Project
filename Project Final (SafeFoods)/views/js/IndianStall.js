$(document).ready(function () {
    $.ajax({
        url: "/api/indianMenu",
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function(menu) {
                    $(".indianMenu").append(
                    `
                    <table> 
                    <tr>
                    <th>${menu.foodName} <br><br>
                    ${menu.costOfFood} <br><br>
                    <a href="/Payment"><button type="button">Pay</button></a></th>
                   <td> <img id="image3" src=${menu.image} width="150" height="150"></td> <br>
                   
                  
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