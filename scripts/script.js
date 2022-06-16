$(document).ready(function () {
    $('#navbar-area').load('scripts/navbar.js');

    $.ajax({
        url: "test_data/test_temp1.csv",
        async: false,
        dataType: "text",
        success: function(data)
        {
            var temp_data = data.split(",");
            console.log(temp_data);
            for(var i = 0; i < temp_data.length; i++) {
                $('#temp-data').append(temp_data[i] + " ");
            }
        }
    })
});