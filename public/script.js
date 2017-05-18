/**
 * Created by ra on 18/05/2017.
 */
var host = "http://52.65.244.105";
//var host = "http://localhost:2999";

window.onload = function() {
    $.get(host + "/api/rpi_ip", function(data) {
        $(".ssid").text(data[0].ssid);
        $(".ip").text(data[0].ip);
        $(".pi-time").text(new Date(data[0].time).toLocaleString());
    });

    $.get(host + "/api/temperature", function(data) {
        data.forEach(function(i) {
            $(".temp").append($("<li>" + i.temperature + " at: " + new Date(i.time).toLocaleString() + "</li>"))
        })
    })
};