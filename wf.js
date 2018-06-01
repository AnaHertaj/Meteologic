
$(document).ready(function(){

    $("#forescastTable").hide();
    
    $("#submitForecast").click(function(){
        return getForecast();
    });

});

function getForecast(){
    var city = $("#city").val();
    var days = $("#days").val();
    
    if(city != '' && days != ''){
        
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + "&units=metric" + "&cnt=" + days + "&APPID=c10bb3bd22f90d636baa008b1529ee25",
            type: "GET",
            dataType: "jsonp",
            success: function(data){

               $("#forecastTable").show('fast');
                
                var table = '';
                
                var header = '<h2 style="font-weight:bold; font-size:25px; margin-top:20px;color:#cc4209; text-align:center">Weather forecast for ' + data.city.name + ', ' + data.city.country + '</h2>'
                
                         // ----  FECHEANDO  ----- //

                                  // VAR TODAY //

                                    var today = new Date();
                                    var dd = today.getDate();
                                    var mm = today.getMonth()+1; //January is 0!
                                    var yyyy = today.getFullYear();

                                    if(dd<10) {dd = '0'+dd} 

                                    if(mm<10) {mm = '0'+mm} 

                                    today = mm + '/' + dd + '/' + yyyy;

                                    // VAR NEXT15 //

                                    var next15 = new Date();
                                    next15.setDate(next15.getDate() + 15);
                                    var dd2 = next15.getDate();
                                    var mm2 = next15.getMonth()+1; 
                                    var yyyy2= next15.getFullYear();

                                    if(dd2<10) {dd2 = '0'+dd2} 

                                    if(mm2<10) {mm2 = '0'+mm2} 

                                    next15 = mm2 + '/' + dd2 + '/' + yyyy2;

                                    // ARRAYF ECHA // 

                                    var startDate = new Date(today); //YYYY-MM-DD
                                    var endDate = new Date(next15); //YYYY-MM-DD
                                   
                                    var getDateArray = function(start, end) {
                                        var arr = new Array();
                                        var dt = new Date(start);
                                        while (dt <= end) {
                                            arr.push(new Date(dt));
                                            dt.setDate(dt.getDate() + 1);
                                        }
                                        return arr;
                                    }


                                    var dateArr = getDateArray(today, endDate);


var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
//document.getElementById("xx").innerHTML = days.toString();

                    for(var i = 0; i < data.list.length; i++){

                            table += "<tr>";
 
                            table += "<td>" + "<strong>" + dateArr[i].getDate() + '/' + dateArr[i].getMonth() + '/' + dateArr[i].getFullYear() + "</strong>" + "<br/>" + "<p style='color:#cc4600;font-size:18px;text-transform: uppercase;' class='dia'>" + days[dateArr[i].getDay()] + "</p>"  + "</td>";

                            table += "<td>" + "<img width='120' src='http://openweathermap.org/img/w/"+data.list[i].weather[0].icon+".png'>" + "</td>";
                            table += "<td>" + "<span style='font-size:23px'>" + data.list[i].weather[0].main + "</span>" + "<br/>" + "<span style='color:grey;font-size:18px;color: #e29055;text-transform: capitalize'>" + data.list[i].weather[0].description + "</span>" + "</td>";
                            table += "<td>" + data.list[i].temp.min + "&deg;C" + " / " + "<span style='font-size:23px'>" + data.list[i].temp.max + "&deg;C" + "</span>" +"</td>";
                            table += "</tr>";
                        }
                
                $("#forecastWeather").html(table);
                $("#header").html(header);
                
                $("#city").val('');
                $("#days").val('')
                
            }
            
            
        });
        
    } else {

        $("#error").html("<div class='alert alert-danger' id='errorCity'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>City field cannot be empty</div>");
    }
    
}