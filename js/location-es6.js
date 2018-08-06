let url = {
    get(parameterName){
        let locationSearch = window.location.search;
        if(locationSearch.includes("?")){
            locationSearch = locationSearch.substring(1);
        }
        let queryStringArr = locationSearch.split("&");
        for(let queryString of queryStringArr){
            let keyValueArr = queryString.split("=");
            console.log(keyValueArr);
            if(keyValueArr[0] === parameterName){
                return keyValueArr[1];
            }
        }
    }
};