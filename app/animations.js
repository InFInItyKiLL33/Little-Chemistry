function getSearch() {
    // change the following line for real data when available
    availableStocks = {
        "Adobe Inc": "ADBE",
        "Alphabet Inc Class A": "GOOGL",
        "Amazon.com, Inc.": "AMZN",
        "American Airlines Group Inc": "AAL",
        "Apple Inc.": "AAPL",
        "Autodesk, Inc.": "ADSK",
        "Facebook, Inc. Common Stock": "FB",
        "Microsoft Corporation": "MSFT",
        "Singapore Airlines Ltd.": "C6L",
        "Tesla Inc": "TSLA"
    };
    availableCurrency = {
        "United States Dollar": "USD",
        "Singapore Dollar": "SGD"
    };
    availableCryptocurrency = {
        "Bitcoin": "BTC",
        "Bitcoin Cash": "BCH",
        "Ethereum": "ETH",
        "Ripple": "XRP",
        "Litecoin": "LTC"
    };
    // End of to-change
    // vars of list. Part 1 is any inititals matching. Part 2 is if the key is cointained in any part of the string. Part 2 shows after Part 1.
    var availableStocksList = []
    var availableStocksListPart2 = []
    var availableCurrencyList = []
    var availableCurrencyListPart2 = []
    var availableCryptocurrencyList = []
    var availableCryptocurrencyListPart2 = []
    searchKey = $("#searchBar").val();
    // loops through all the 3 types and search for any matching keys
    for (var stockName in availableStocks) {
        if (searchKey.toUpperCase() == stockName.substr(0, searchKey.length).toUpperCase() || searchKey.toUpperCase() == availableStocks[stockName].substr(0, searchKey.length).toUpperCase()) {
            availableStocksList.push([stockName, availableStocks[stockName]]);
        } else if ((stockName.toUpperCase()).includes(searchKey.toUpperCase()) || (availableStocks[stockName].toUpperCase()).includes(searchKey.toUpperCase())) {
            availableStocksListPart2.push([stockName, availableStocks[stockName]]);
        };
    };
    for (var curName in availableCurrency) {
        if (searchKey.toUpperCase() == curName.substr(0, searchKey.length).toUpperCase() || searchKey.toUpperCase() == availableCurrency[curName].substr(0, searchKey.length).toUpperCase()) {
            availableCurrencyList.push([curName, availableCurrency[curName]]);
        } else if ((curName.toUpperCase()).includes(searchKey.toUpperCase()) || (availableCurrency[curName].toUpperCase()).includes(searchKey.toUpperCase())) {
            availableCurrencyListPart2.push([curName, availableCurrency[curName]]);
        };
    };
    for (var coinName in availableCryptocurrency) {
        if (searchKey.toUpperCase() == coinName.substr(0, searchKey.length).toUpperCase() || searchKey.toUpperCase() == availableCryptocurrency[coinName].substr(0, searchKey.length).toUpperCase()) {
            availableCryptocurrencyList.push([coinName, availableCryptocurrency[coinName]]);
        } else if ((coinName.toUpperCase()).includes(searchKey.toUpperCase()) || (availableCryptocurrency[coinName].toUpperCase()).includes(searchKey.toUpperCase())) {
            availableCryptocurrencyListPart2.push([coinName, availableCryptocurrency[coinName]]);
        };
    };
    // combining the two lists
    availableStocksList = [...availableStocksList, ...availableStocksListPart2];
    availableCurrencyList = [...availableCurrencyList, ...availableCurrencyListPart2]
    availableCryptocurrencyList = [...availableCryptocurrencyList, ...availableCryptocurrencyListPart2]
    return [availableStocksList, availableCurrencyList, availableCryptocurrencyList]
};  

function switchContent(clickedID) {
    var contents = ["#stocks", "#currency", "#cryptocurrency"];
    if (clickedID != searchContent) {
        $(contents[clickedID]).animate({
            color: "#FBFBFF"
        }, 50);
        $(contents[searchContent]).animate({
            color: "#787878"
        }, 50);
        searchContent = clickedID;
        searchBarSearch(clickedID, 1);
    };
};

function hoverContent(hoverID) {
    var contents = ["#stocks", "#currency", "#cryptocurrency"]
    if (hoverID != searchContent) {
        $(contents[hoverID]).animate({
            color: "#FBFBFF"
        }, 50);
    };
};

function unhoverContent(hoverID) {
    var contents = ["#stocks", "#currency", "#cryptocurrency"]
    if (hoverID != searchContent) {
        $(contents[hoverID]).animate({
            color: "#787878"
        }, 50);
    };
};

function searchBarSearch(clickedID, type) { // type is just used to bypass same search check
    var iconColours = ["#01BAEF", "#20BF55", "#eaee00"];
    if ($("#searchBar").val() != previousSearch || type == 1) { // checking for if the search is the same (e.g. pressing control button)
        setTimeout(function() {
            $(".dropdownElementMaster").remove();
        }, 50);
        if ($("#searchBar").val() != "") { // checking for non-empty value
            // $("#searchIcon").hide();
            var displayableList = getSearch(); // search for appropriate items
            var displayableListLengths = [-1, -1, -1]; // lengths of each list in displayableList
            var multiplier = 0; // how much should the search bar drop down by
            var lengthsSum = 0;
            displayableListLengths[searchContent] = displayableList[searchContent].length;
            if (displayableListLengths[searchContent] != 0) {
                multiplier += (displayableListLengths[searchContent]);
            };
            if (multiplier >= 9) { // maximum drop of 450px, total 500px
                multiplier = 9;
            } else if (multiplier == 0) { // for "No Search Results"
                multiplier = 1;
            };
            $("#searchBar").animate({ // dropdown animation
                height: (multiplier * 50 + 52).toString() + "px",
                paddingBottom: (multiplier * 50 + 7).toString() + "px"
            },  0);
            $("#options").animate({ // available options master div
                height: (multiplier * 50).toString() + "px",
                marginTop: (multiplier * -50 - 2).toString() + "px"
            }, 0);
            $("#searchDivider").animate({ // show the divider between searchbar and options
                opacity: "1"
            }, 50);
            setTimeout(function() {
                for (var i = 0; i < 3; i++) {
                    lengthsSum += displayableListLengths[i];
                };
                console.log(lengthsSum);
                if (lengthsSum != -2) {
                    for (var i = 0; i < displayableListLengths[searchContent]; i++) {
                        $(".dropdownAppender").append(
                            "<div class = 'dropdownElementMaster' id = 'dropdownElementMaster'>"
                            + "<div class = 'dropdownElementIcon' id = 'itemIcon'></div>"
                            + "<div class = 'dropdownElement' id = 'itemShortName'>" + displayableList[searchContent][i][1] + "</div>" 
                            + "<div class = 'dropdownElement' id = 'itemLongName'>" + displayableList[searchContent][i][0] + "</div>" 
                            + "</div>"
                        );
                    };
                } else {
                    $(".dropdownAppender").append(
                        "<div class = 'dropdownElementMaster' id = 'dropdownElementMaster'>"
                        + "<div class = 'dropdownElement' id = 'noResultsFoundText'>No Results Found</div>"
                        + "</div>"
                    );
                };
            }, 75);
            setTimeout(function() {
                $(".dropdownElementIcon").animate({
                    "backgroundColor": iconColours[clickedID]
                }, 0);
            }, 75);
            setTimeout(function() {
                $(".dropdownElementMaster").hover(function() {
                    $(this).stop().animate({
                        backgroundColor: "rgba(34, 34, 34, 1)"
                    }, 100);
                }, function() {
                    $(this).stop().animate({
                        backgroundColor: "transparent"
                    }, 100);
                });
            }, 75);
        } else {
            // $("#searchIcon").show();
            $("#searchBar").animate({ // collapse animation
                height: "50px",
                paddingBottom: "7px"
            }, 100);
            $("#searchDivider").animate({ // available options master div
                opacity: "0"
            }, 50);
            $("#options").animate({ // hides the divider between searchbar and options
                height: "0px",
                marginTop: "0px"
            }, 100);
        };
    };
    previousSearch = $("#searchBar").val();
}

function searchBarHighlight() {
    $("#searchBar").css({
        border: "2px solid #757575",
        boxShadow: "#757575 0px 0px 8px 0px"
    }, 200);
};

function searchBarUnHighlight() {
    $("#searchBar").css({
        border: "1px solid rgb(180, 180, 180)",
        boxShadow: "none"
    }, 200);
};

// Global Variables
var searchContent = 0; // 0 for stocks, 1 for currency, 2 for crypto
var previousSearch = ""; // to disable refresh if there is no change
var searchBarFocused = false;
var currencyChangeClicked = 0;

$(document).ready(function() {
    $("#stocks").animate({
        color: "#FBFBFF"
    }, 0);
    // event handler for typing
    $("#searchBar").keyup(function() {
        searchBarSearch(searchContent, 0);
    });
    // event handlers for changing content searched
    $("#stocks").click(function() {
        switchContent(0);
    });
    $("#currency").click(function() {
        switchContent(1);
    });
    $("#cryptocurrency").click(function() {
        switchContent(2);
    });
    $("#stocks").hover(function() {
        hoverContent(0);
    }, function() {
        unhoverContent(0);
    });
    $("#currency").hover(function() {
        hoverContent(1);
    }, function() {
        unhoverContent(1);
    });
    $("#cryptocurrency").hover(function() {
        hoverContent(2);
    }, function() {
        unhoverContent(2);
    });
    $("#searchBar").hover(function() {
        searchBarHighlight();
    }, function() {
        if (searchBarFocused == false) {
            searchBarUnHighlight();
        };
    });
    $("#searchBar").focus(function() {
        searchBarHighlight();
        searchBarFocused = true;
    });
    $("#searchBar").blur(function() {
        if ($("#searchBar").val() == "") {
            searchBarUnHighlight();
            searchBarFocused = false;
        };
    });
    $("#searchCurrencyList1").click(function() {
        if (currencyChangeClicked == 0) {
            $("#searchCurrency").animate({
                height: "350px",
                backgroundColor: "#333333",
                borderRadius: "20px"
            }, 250);
            // $(".searchCurrencyList").show(300);
            $(".searchCurrencyList").animate({
                opacity: "1",
            }, 250);
            $(".searchCurrencyList").css({
                cursor: "pointer"
            });
            currencyChangeClicked = 1;
        } else {
            $("#searchCurrency").animate({
                height: "35px",
                backgroundColor: "#121212",
                borderRadius: "25px"
            }, 250);
            $(".searchCurrencyList").animate({
                opacity: "0"
            }, 10);
            $(".searchCurrencyList").css({
                cursor: "default"
            });
            $("#searchCurrencyList1").css({
                cursor: "pointer"
            });
            $("#searchCurrencyList1").stop().animate({
                opacity: "1"
            }, 0);
            currencyChangeClicked = 0;
        };
    });
    $("#searchCurrencyList1").hover(function() {
        $("#searchCurrency").animate({
            backgroundColor: "#333333",
            borderRadius: "20px"
        }, 150);
    }, function() {
        if (currencyChangeClicked == 0) {
            $("#searchCurrency").animate({
                height: "35px",
                backgroundColor: "#121212",
                borderRadius: "25px"
            }, 150);
        };
    });
    $(".searchCurrencyList").hover(function() {
        if ($(this).attr("id") != "searchCurrencyList1") {
            $(this).animate({
                color: "#FBFBFF",
                backgroundColor: "#333333"
            }, 100);
        };
    }, function() {
        if ($(this).attr("id") != "searchCurrencyList1") {
            $(this).animate({
                color: "#787878",
                backgroundColor: "121212"
            }, 100);
        };
    });
});