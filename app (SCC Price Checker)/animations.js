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
    availableCurrencyMaster = {
        "Canadian Dollar": "CAD",
        "Chinese Yuan": "CNY",
        "Euro": "EUR",
        "Indian Rupee": "INR",
        "Japanese Yen": "JPY",
        "Pound Sterling": "GBP",
        "Singapore Dollar": "SGD",
        "United States Dollar": "USD"
    };
    availableCryptocurrencyMaster = {
        "Bitcoin": "BTC",
        "Ethereum": "ETH"
    };
    availableCurrency = {};
    availableCryptocurrency = {};
    for (item in availableCurrencyMaster) {
        if (availableCurrencyMaster[item] != currentCurrency) {
            availableCurrency[item] = availableCurrencyMaster[item];
        };
    };
    for (item in availableCryptocurrencyMaster) {
        if (availableCryptocurrencyMaster[item] != currentCurrency) {
            availableCryptocurrency[item] = availableCryptocurrencyMaster[item];
        };
    };

    currentPrice = 987.65;
    currentTrend = 2; // 0 for down, 1 for neutral, 2 for up
    // End of to-change
    // vars of list. Part 1 is any inititals matching. Part 2 is if the key is cointained in any part of the string. Part 2 shows after Part 1.
    var availableStocksList = [];
    var availableStocksListPart2 = [];
    var availableCurrencyList = [];
    var availableCurrencyListPart2 = [];
    var availableCryptocurrencyList = [];
    var availableCryptocurrencyListPart2 = [];
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
    availableCurrencyList = [...availableCurrencyList, ...availableCurrencyListPart2];
    availableCryptocurrencyList = [...availableCryptocurrencyList, ...availableCryptocurrencyListPart2];
    return [availableStocksList, availableCurrencyList, availableCryptocurrencyList];
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
                marginTop: (multiplier * - 50 - 2).toString() + "px"
            }, 0);
            $("#searchDivider").animate({ // show the divider between searchbar and options
                opacity: "1"
            }, 50);
            $("#topAssetsBody, #topAssets, #topAssetsDivider0").animate({
                marginTop: $(window).height(),
                opacity: 0
            }, 250);
            setTimeout(function() {
                for (var i = 0; i < 3; i++) {
                    lengthsSum += displayableListLengths[i];
                };
                if (lengthsSum != -2) {
                    for (var i = 0; i < displayableListLengths[searchContent]; i++) {
                        // Change the following codes to get real data once available
                        currentPrice = Math.round(Math.random() * 10000)/100;
                        currentTrend = Math.round(Math.random() * 2);
                        // Change end
                        $(".dropdownAppender").append(
                            "<div class = 'dropdownElementMaster' id = 'dropdownElementMaster'>"
                            + "<div class = 'dropdownElementIcon' id = 'itemIcon'></div>"
                            + "<div class = 'dropdownElement' id = 'itemShortName'>" + displayableList[searchContent][i][1] + "</div>" 
                            + "<div class = 'dropdownElement' id = 'itemLongName'>" + displayableList[searchContent][i][0] + "</div>" 
                            + "<div class = 'dropdownElement' id = 'itemPrice" + i.toString() + "' style = 'width: 125px; text-align: center;'>" + "$" + currentPrice + "</div>"
                            + "</div>"
                        );
                        if (currentTrend == 2) {
                            $("#itemPrice" + i.toString()).animate({
                                color: "#32a852"
                            }, 0);
                        } else if (currentTrend == 0) {
                            $("#itemPrice" + i.toString()).animate({
                                color: "#a83232"
                            }, 0);
                        } else {
                            $("#itemPrice" + i.toString()).animate({
                                color: "#696969"
                            }, 0);
                        };
                    };
                    noResults = 0
                } else {
                    $(".dropdownAppender").append(
                        "<div class = 'dropdownElementMaster' id = 'dropdownElementMaster'>"
                        + "<div class = 'dropdownElement' id = 'noResultsFoundText'>No Results Found</div>"
                        + "</div>"
                    );
                    noResults = 1
                };
            }, 75);
            setTimeout(function() {
                $(".dropdownElementIcon").animate({
                    "backgroundColor": iconColours[clickedID]
                }, 0);
            }, 150);
            setTimeout(function() {
                if (noResults == 0) {
                    $(".dropdownElementMaster").hover(function() {
                        $(this).stop().animate({
                            backgroundColor: "rgba(255, 255, 255, 0.2)"
                        }, 100);
                    }, function() {
                        $(this).stop().animate({
                            backgroundColor: "transparent"
                        }, 100);
                    });
                    $(".dropdownElementMaster").css({
                        "cursor": "hand"
                    });
                    $(".dropdownElementMaster").click(function() {
                        dropdownElementMasterClicked($(this), 0);
                    })
                } else {
                    $(".dropdownElementMaster").css({
                        "cursor": "default"
                    });
                };
            }, 150);
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
            $("#topAssetsBody").animate({
                marginTop: $(window).height() * 0.45,
                opacity: 1
            }, 400);
            $("#topAssets").animate({
                marginTop: $(window).height() * 0.36,
                opacity: 1
            }, 400);
            $("#topAssetsDivider0").animate({
                marginTop: $(window).height() * 0.41,
                opacity: 1
            }, 400);
        };
    };
    previousSearch = $("#searchBar").val();
};

function dropdownElementMasterClicked(thisElement, dropdownOrTop) {
    if (dropdownOrTop == 0) {
        currentOverlayAsset = thisElement.find("#itemShortName").html();
        showAssetOverlay(thisElement.find("#itemShortName").html(), thisElement.find("#itemLongName").html());
    } else {
        currentOverlayAsset = thisElement.find(".topAssetsShortName").html();
        showAssetOverlay(thisElement.find(".topAssetsShortName").html(), thisElement.find(".topAssetsLongName").html());
    };
    assetOverlayEnabled = 1;
    setTimeout(function() {
        if (searchContent == 1 || searchContentTopAsset == 1) {
            $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                stroke: "#20BF55"
            });
            $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                fill: "url(#MyGradient2)"
            });
        } else if (searchContent == 2 || searchContentTopAsset == 2) {
            $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                stroke: "#eaee00"
            });
            $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                fill: "url(#MyGradient3)"
            });
        } else {
            $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                stroke: "#01BAEF"
            });
            $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                fill: "url(#MyGradient1)"
            });
        };
        $("#assetOverlayCostPrice").val(currentCurrency + chartValues[chartValues.length - 1]);
        $("#assetOverlayAssetPrice").html(currentCurrency + chartValues[chartValues.length - 1]);
        if (searchContentTopAsset != searchContent) {
            if (searchContent > searchContentTopAsset) {
                var tempSearchContent = searchContent;
            } else {
                var tempSearchContent = searchContentTopAsset
            };
        } else {
            var tempSearchContent = searchContent
        };
        $("#assetOverlayRangeCalculatorLabel").css({
            color: iconColours[tempSearchContent]
        });
        costCalculatorCalculate();
        profitCalculatorCalculate();
    }, 150);
};

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

function searchCurrency1Click() {
    if (currencyChangeClicked == 0) {
        $("#searchCurrency").animate({
            height: "350px",
            backgroundColor: "#333333",
            borderRadius: "10px"
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
            borderRadius: "12.5px"
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
};

function hideAssetOverlay() {
    $("#assetOverlayFilter").animate({
        marginTop: (-8 - ($(window).height() * 3)).toString() + "px"
    }, 400);
    $("#searchBarDiv").animate({
        zIndex: 2
    }, 400);
    $("#assetOverlay").animate({
        marginTop: ($(window).height() * -1).toString() + "px"
    }, 400);
    assetOverlayEnabled = 0;
    currentOverlayAsset = "";
    searchContentTopAsset = 0;
};

function showAssetOverlay(shortAssetName, longAssetName) {
    $("#assetOverlayFilter").animate({
        marginTop: "-8px"
    }, 400);
    $("#searchBarDiv").animate({
        zIndex: -2
    }, 0);
    $("#assetOverlay").animate({
        marginTop: ($(window).height() * 0.4 - 300).toString() + "px"
    }, 400);
    assetOverlayEnabled = 1;
    $("#assetOverlayAssetName").html(shortAssetName + " | " + longAssetName);
    chartValues = []
    for (var index = 0; index < 200; index++) {
        chartValues.push(Math.round(Math.random() * Math.random() * Math.random() * 1 * 100) / 100);
    };
    // Replace following lines of code when real data is available
    chartData = {
        labels: [],
        series: [chartValues]
    };
    // End of replacement
    chartDataOptions = {
        width: $(window).width() * 0.2 + 900,
        height: $(window).height() * 0.4 + 100,
        showPoint: false,   
        axisY: {showLabel: false, showGrid: false},
        showArea: true,
        chartPadding: {
            top: $(window).height() * 0.1,
            right: 0,
            bottom: 0,
            left: $(window).width() * 0.05
        },
    };
    assetChart = new Chartist.Line(".ct-chart", chartData, chartDataOptions);
    setTimeout(function() {
        $(".ct-chart-line").css({
            width: "calc(20vw + 1000px)"
        });
        mouseMove();
    }, 150)
};

function costCalculatorCalculate() {
    if (isNaN($("#assetOverlayCostQuantity").val()) == false && $("#assetOverlayCostQuantity").val().length > 0) {
        $("#assetOverlayCostQuantityLabel3").html("Total Cost - " + currentCurrency + parseFloat($("#assetOverlayCostQuantity").val()) * chartValues[chartValues.length - 1]);
    } else {
        $("#assetOverlayCostQuantityLabel3").html("");
    };
};

function profitCalculatorCalculate() {
    if (isNaN($("#assetOverlayProfitQuantity").val()) == false && $("#assetOverlayProfitQuantity").val().length > 0 && isNaN($("#assetOverlayProfitCost").val()) == false && $("#assetOverlayProfitCost").val().length > 0 && $("#assetOverlayProfitCurrency").val().length == 3 && $("#assetOverlayProfitDate").val().length == 10 && $("#assetOverlayProfitDate").val().split("/").join("").length == 8 && supportedCurrencies.includes($("#assetOverlayProfitCurrency").val().toUpperCase())) {
        if ($("#assetOverlayProfitCurrency").val() == "BTC" || $("#assetOverlayProfitCurrency").val() == "ETH") {
            var currencyType = 1;
        } else {
            var currencyType = 0;
        };
        var valueChange = Math.round((parseFloat(parseFloat($("#assetOverlayProfitQuantity").val()) * chartValues[chartValues.length - 1]) - parseFloat(parseFloat($("#assetOverlayProfitQuantity").val()) * $("#assetOverlayProfitCost").val())) * 100) / 100
        var percentageChange = Math.round((valueChange / $("#assetOverlayProfitQuantity").val()) / chartValues[chartValues.length - 1] * 10000) / 100;
        if (currentCurrency == $("#assetOverlayProfitCurrency").val().toUpperCase()) {
            if (valueChange > 0) {
                $("#assetOverlayProfitQuantityLabel5").html("Profit +" + currentCurrency + valueChange + " (+" + percentageChange + "%)");
                $("#assetOverlayProfitQuantityLabel5").stop().animate({
                    color: iconColours[1]
                }, 100);
            } else if (valueChange < 0) {
                $("#assetOverlayProfitQuantityLabel5").html("Profit -" + currentCurrency + Math.abs(valueChange) + " (" + percentageChange + "%)");
                $("#assetOverlayProfitQuantityLabel5").stop().animate({
                    color: "red"
                }, 100);
            } else {
                $("#assetOverlayProfitQuantityLabel5").html("Profit " + currentCurrency + "0 (0%)");
                $("#assetOverlayProfitQuantityLabel5").stop().animate({
                    color: "#757575"
                }, 100);
            };
        } else {
            // get forex exchange rate once available & change the following lines of code
            var exchangeRate = 1
            // end of change
            var finalLocalValueChange = Math.round((parseFloat(parseFloat($("#assetOverlayProfitQuantity").val()) * chartValues[chartValues.length - 1]) - parseFloat($("#assetOverlayProfitQuantity").val()) * exchangeRate * $("#assetOverlayProfitCost").val()) * 100) / 100
            var percentageChangeLocal = Math.round((finalLocalValueChange / $("#assetOverlayProfitQuantity").val()) / chartValues[chartValues.length - 1] * 10000) / 100;
            if (valueChange > 0) {
                $("#assetOverlayProfitQuantityLabel5").html("Profit +" + currentCurrency + valueChange + " (+" + percentageChange + "%) / +" + $("#assetOverlayProfitCurrency").val().toUpperCase() + finalLocalValueChange + " (+" + percentageChangeLocal + "%)");
                $("#assetOverlayProfitQuantityLabel5").stop().animate({
                    color: iconColours[1]
                }, 100);
            } else if (valueChange < 0) {
                $("#assetOverlayProfitQuantityLabel5").html("Profit -" + currentCurrency + Math.abs(valueChange) + " (" + percentageChange + "%) / -" + $("#assetOverlayProfitCurrency").val().toUpperCase() + Math.abs(finalLocalValueChange) + " (" + percentageChangeLocal + "%)");
                $("#assetOverlayProfitQuantityLabel5").stop().animate({
                    color: "red"
                }, 100);
            } else {
                $("#assetOverlayProfitQuantityLabel5").html("Profit " + currentCurrency + "0 (0%) / " + $("#assetOverlayProfitCurrency").val().toUpperCase() + "0 (0%)");
                $("#assetOverlayProfitQuantityLabel5").stop().animate({
                    color: "#757575"
                }, 100);
            };

        };
    } else {
        $("#assetOverlayProfitQuantityLabel5").html("");
    };
};

// Global Variables
var searchContent = 0; // 0 for stocks, 1 for currency, 2 for crypto
var searchContentTopAsset = 0; // 0 for stocks, 1 for currency, 2 for crypto
var previousSearch = ""; // to disable refresh if there is no change
var searchBarFocused = false;
var currencyChangeClicked = 0; // index of supportedCurrencies
var supportedCurrencies = ["USD", "SGD", "EUR", "JPY", "CNY", "GBP", "CAD", "INR", "BTC", "ETH"];
var currentCurrency = "USD";
var assetOverlayEnabled = false;
var assetOverlayRange = 2; // default as DAY
var assetOverlayRangeCalculator = 2; // default as COST
var assetOverlayRangeOptions = {
    "HOUR": 1, 
    "DAY": 2, 
    "WEEK": 3, 
    "MONTH": 4, 
    "YEAR": 5, 
    "ALL": 6
};
var assetChart;
var chartData;
var chartDataOptions;
var currentOverlayAsset; // what is being showed
var iconColours = ["#01BAEF", "#20BF55", "#eaee00"];

function mainCode() {
    if (searchContent == 0) {
        $("#stocks").animate({
            color: "#FBFBFF"
        }, 0);
    };  
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
        searchCurrency1Click();
    });
    $("#searchCurrencyList1").hover(function() {
        $("#searchCurrency").animate({
            backgroundColor: "#333333"
        }, 150);
    }, function() {
        if (currencyChangeClicked == 0) {
            $("#searchCurrency").animate({
                height: "35px",
                backgroundColor: "#121212"
            }, 150);
        };
    });
    $(".searchCurrencyList").hover(function() {
        if ($(this).attr("id") != "searchCurrencyList1") {
            $(this).animate({
                color: "#FBFBFF",
                backgroundColor: "#333333"
            }, 75);
        };
    }, function() {
        if ($(this).attr("id") != "searchCurrencyList1") {
            $(this).animate({
                color: "#787878",
                backgroundColor: "#121212"
            }, 75);
        };
    });
    $(".searchCurrencyList").click(function() {
        if ($(this).attr("id") != "searchCurrencyList1" && currencyChangeClicked == 1) {
            if (currentOverlayAsset == $(this).html()) {
                return;
            };
            var clickedCurrency = $(this).html();
            var supportedCurrenciesTemp = [clickedCurrency];
            for (var itemIndex = 0; itemIndex < supportedCurrencies.length; itemIndex++) {
                if (supportedCurrencies[itemIndex] != clickedCurrency) {
                    supportedCurrenciesTemp.push(supportedCurrencies[itemIndex]);
                };
            };
            $(".searchCurrencyList").remove();
            for (var i = 0; i < supportedCurrencies.length; i++) {
                if (i != supportedCurrencies.length - 1) {
                    $(".searchCurrency").append("<div class = 'searchCurrencyList' id = 'searchCurrencyList" + (i + 1).toString() + "'>" + supportedCurrenciesTemp[i] + "</div>");
                } else {
                    $(".searchCurrency").append("<div class = 'searchCurrencyList' id = 'searchCurrencyList-1'>" + supportedCurrenciesTemp[i] + "</div>");
                };
            };
            searchCurrency1Click();
            currentCurrency = supportedCurrenciesTemp[0];
            if (typeof chartValues !== 'undefined') {
                $("#assetOverlayCostPrice").val(currentCurrency + chartValues[chartValues.length - 1]);
            };
            searchBarSearch(searchContent, 1);
            mainCode();
        } else if ($(this).attr("id") != "searchCurrencyList1" && assetOverlayEnabled == 1) {
            hideAssetOverlay();
            assetOverlayEnabled = 0;
        };
    });
    $("#assetOverlayFilter, #backButton").click(function() {
        hideAssetOverlay();
    });
    $(".assetOverlayRangeOptions").click(function() {
        if (assetOverlayRangeOptions[$(this).html()] != assetOverlayRange) {
            $("#assetOverlayRangeOptions" + assetOverlayRange).css({
                fontWeight: "normal",
                color: "#B4B4B4"
            });
            assetOverlayRange = assetOverlayRangeOptions[$(this).html()];
            $(this).css({
                fontWeight: "bold",
                color: "#FBFBFF"
            });
        };
    });
    $("#assetOverlayRangeCalculatorOptions1, #assetOverlayRangeCalculatorOptions2").click(function() {
        if ($(this).attr("id").substr($(this).attr("id").length - 1, 1) != assetOverlayRangeCalculator) {
            $("#assetOverlayRangeCalculatorOptions" + assetOverlayRangeCalculator).css({
                fontWeight: "normal",
                color: "#B4B4B4"
            });
            if (assetOverlayRangeCalculator == 2) {
                assetOverlayRangeCalculator--;
                $(".assetOverlayCost").animate({
                    opacity: "0",
                    zIndex: "2"
                }, 200);
                setTimeout(function() {
                    $(".assetOverlayProfit").animate({
                        opacity: "1",
                        zIndex: "5"
                    }, 200);
                }, 100);
            } else {
                assetOverlayRangeCalculator++;
                $(".assetOverlayProfit").animate({
                    opacity: "0",
                    zIndex: "2"
                }, 200);
                setTimeout(function() {
                    $(".assetOverlayCost").animate({
                        opacity: "1",
                        zIndex: "5"
                    }, 200);
                }, 100);
            };
            $("#assetOverlayRangeCalculatorOptions" + assetOverlayRangeCalculator).css({
                fontWeight: "bold",
                color: "#FBFBFF"
            });
        };
    })
    $(window).resize(function() {
        setTimeout(function() {
            chartDataOptions = {
                width: $(window).width() * 0.2 + 900,
                height: $(window).height() * 0.4 + 100,
                showPoint: false,   
                axisY: {showLabel: false, showGrid: false},
                showArea: true,
                chartPadding: {
                    top: $(window).height() * 0.1,
                    right: 0,
                    bottom: 0,
                    left: $(window).width() * 0.05
                },
            };
            if (typeof chartValues !== 'undefined') {
                assetChart.update(chartData, chartDataOptions);
            };
            if (searchContent == 1 || searchContentTopAsset == 1) {
                $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                    stroke: "#20BF55"
                });
                $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                    fill: "url(#MyGradient2)"
                });
            } else if (searchContent == 2 || searchContentTopAsset == 2) {
                $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                    stroke: "#eaee00"
                });
                $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                    fill: "url(#MyGradient3)"
                });
            } else {
                $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                    stroke: "#01BAEF"
                });
                $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                    fill: "url(#MyGradient1)"
                });
            };
            mouseMove();
        }, 0);
    });
    $("#assetOverlayCostQuantity").keyup(function() {
        costCalculatorCalculate();
    });
    $("#assetOverlayProfitQuantity, #assetOverlayProfitCost, #assetOverlayProfitCurrency, #assetOverlayProfitDate").keyup(function() {
        profitCalculatorCalculate();
    });
    $(".topAssetsAsset1, .topAssetsAsset2, .topAssetsAsset3").click(function() {
        if ($(this).find(".topAssetsShortName").html() != currentCurrency) {
            searchContentTopAsset = $(this).attr("class").substr($(this).attr("class").length - 1, 1) - 1;
            dropdownElementMasterClicked($(this), 1);
        };
    });
};

function mouseMove() {
    $(window).mousemove(function() {
        if (assetOverlayEnabled) {
            var xCoords = event.pageX - (0.4 * $(window).width() - 492);
            var yCoords = event.pageY;
            if ($("svg").find("line")[0]["x1"]["baseVal"]["value"] <= xCoords && $("svg").find("line")[$("svg").find("line").length - 1]["x1"]["baseVal"]["value"] >= xCoords) {
                if ($("svg").find("line").offset().top <= yCoords && $("svg").find("line")[0]["y2"]["baseVal"]["value"] - $("svg").find("line")[0]["y1"]["baseVal"]["value"] + $("svg").find("line").offset().top >= yCoords) {
                    var dictOfLines = $("svg").find("line");
                    var lineX;
                    var closestIndex = 0
                    var maxDiff = (dictOfLines[1]["x1"]["baseVal"]["value"] - dictOfLines[0]["x1"]["baseVal"]["value"]) / 2
                    for (var i = 0; i < dictOfLines.length; i++) {
                        lineX = dictOfLines[i]["x1"]["baseVal"]["value"];
                        if (lineX + maxDiff > xCoords && lineX - maxDiff < xCoords) {
                            closestIndex = i;
                            break
                        };
                    };
                    if (searchContentTopAsset != searchContent) {
                        if (searchContent > searchContentTopAsset) {
                            var tempSearchContent = searchContent;
                        } else {
                            var tempSearchContent = searchContentTopAsset
                        };
                    } else {
                        var tempSearchContent = searchContent
                    };
                    $("#chartHighlighter").css({
                        backgroundColor: iconColours[tempSearchContent],
                        marginLeft: lineX,
                        opacity: 0.25,
                        marginTop: $("svg").find("line")[0]["y1"]["baseVal"]["value"], 
                        height: $("svg").find("line")[0]["y2"]["baseVal"]["value"] - $("svg").find("line")[0]["y1"]["baseVal"]["value"]
                    });
                    $("#chartHighlighterPrice").css({
                        color: iconColours[tempSearchContent],
                        marginLeft: lineX - 37.5,
                        marginTop: $("svg").find("line")[0]["y2"]["baseVal"]["value"] + 10
                    });
                    $("#chartHighlighterPrice").html("$" + chartValues[closestIndex]);
                };
            };
        };
    });
};

$(document).ready(function() {
    mainCode();
});