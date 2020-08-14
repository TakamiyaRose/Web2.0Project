$(document).ready(function () {
    $.ajax({
        url: "/api/chineseMenu",
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function(menu) {
                    $(".chineseMenu").append(
                    `
                   <table> 
                   <tr>
                   <th> ${menu.foodName}<br><br>
                    ${menu.costOfFood} <br><br>
                   
                   <a href="/Payment"><button type="button">Pay</button></a><br></th><br>
                   <td> <img id="image1" src=${menu.image} width="150" height="150"></td> <br>
                  
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