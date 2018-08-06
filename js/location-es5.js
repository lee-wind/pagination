let url = {
    get: function(parameterName){
        var locationSearch = window.location.search;
        if(locationSearch.indexOf("?") >= 0){
            locationSearch = locationSearch.substring(1);
        }
        var queryStringArr = locationSearch.split("&");
        var parameterValue = '';
        queryStringArr.forEach(function(queryString){
            let keyValueArr = queryString.split("=");
            console.log(keyValueArr);
            if(keyValueArr[0] === parameterName){
                console.log(keyValueArr[1]);
                parameterValue = keyValueArr[1];
            }
        });
        return parameterValue;
    }
};