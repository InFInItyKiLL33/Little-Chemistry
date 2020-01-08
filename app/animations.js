$(document).ready(function() {
    $("#searchBar").keyup(function() {
        console.log($("#searchBar").val());
        if ($("#searchBar").val() != "") {
            // $("#searchIcon").hide();
            $("#searchBar").animate({
                height: "500px",
                paddingBottom: "457px"
            },  0);
            $("#searchDivider").animate({
                opacity: "1"
            }, 50);
        } else {
            // $("#searchIcon").show();
            $("#searchBar").animate({
                height: "50px",
                paddingBottom: "7px"
            }, 20);
            $("#searchDivider").animate({
                opacity: "0"
            }, 50);
        };
    });
});