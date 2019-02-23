function show_error(msg) {
    alert(msg);
}

function validateInput() {
    var url = $("#url").val();
    if (url == "") {
        return false;
    }
    return true;
}

function getIsoDateString() {
    var d = new Date();
    return d.toISOString();
}

function getBackDate(days) {
    var d = new Date();
    var backDate =  (d.setDate(d.getDate() - days));
    backDate =  new Date(backDate)
    return backDate.toISOString();
}

function getFinalUrl(baseUrl,inputUrl,method,parameters){
    var restUrlPart = []
    var params = []
    var restUrl = "";
    var endPoint = "";
    restUrlPart.push(baseUrl)
    objStr = inputUrl.split("/");
    repoOwner = objStr[3];
    repoName = objStr[4];
    restUrlPart.push(repoOwner);
    restUrlPart.push(repoName);
    restUrlPart.push(method);
    endPoint = restUrlPart.join("/");
    if (parameters == undefined){
        return endPoint;
    }
    else{
        for (key in parameters){
            p = "";
            p = key+"="+parameters[key];
            params.push(p);
        }
        restUrl = params.join("&");
        return endPoint+"?"+restUrl;
    }
}

function getSizeOfObject(data){    
    var l = data.length;
    return l;
}


function httpGet(url){
    var responseData = [];
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function(response) {
            if (response.length>0) {
				responseData = response;
            } else {
                // show_error("No open issues found!!!!");
                return;
            }
        },
        error: function(response) {
            // show_error("No open issues found!!!!");
            return;
        },
        complete: function() {
            // console.log("");          
        }
    });
    return responseData;
}

function setHtml(content){
    for (key in content){
        $("#"+key).html(content[key]);
    }
    }

function generateHtmlTable(content){
}