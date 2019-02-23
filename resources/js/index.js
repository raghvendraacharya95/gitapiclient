baseUrl = "https://api.github.com/repos"
methods = {
	"issues":"issues"
}

sinceDays = [1,7];

// - Total number of open issues - totalIssues
// - Number of open issues that were opened in the last 24 hours - last24Issues
// - Number of open issues that were opened more than 24 hours ago but less than 7 days ago - (totalIssuesIn7Days - last24HoursIssue) last24_7daysIssues
// - Number of open issues that were opened more than 7 days ago -(totalIssues - totalIssues)

var totalIssues = 0;
var last24Issues = 0;
var last24_7daysIssues = 0;
var moreThan7DaysIssues = 0;
var issuesCountObj = {};

function getOpenIssues(){
	//getBackDate
	if (validateInput()){
		$("#fetch").attr("disabled",true);
		$("#fetch").text("Fetching....");
		//total issue
		totalIssues = getIssuesInPeriod();
		//last24hoursIssue
		last24Issues = getIssuesInPeriod(sinceDays[0]);
		//last24_7days = total7daysIssues - IssuesIn24Hours ()
		var issuesInLast7Days = getIssuesInPeriod(sinceDays[1]);
		last24_7daysIssues = issuesInLast7Days - last24Issues;
		//moretha7daysissue
		moreThan7DaysIssues = totalIssues - issuesInLast7Days;
		issuesCountObj["totalIssues"] = totalIssues;
		issuesCountObj["last24Issues"] = last24Issues;
		issuesCountObj["last24_7daysIssues"] = last24_7daysIssues;
		issuesCountObj["moreThan7DaysIssues"] = moreThan7DaysIssues;
		setHtml(issuesCountObj);
	}
	else{
		show_error("Please pass valid inputs");
	}
    
    }

function getIssuesInPeriod(sinceDays){
	var issueCount = 0;
	var inputUrl = $("#url").val();
	var url = "";
	if (sinceDays == undefined){
		url = getFinalUrl(baseUrl,inputUrl,methods["issues"]);
	}
	else{
		var sinceDate = getBackDate(sinceDays)
		var since = {"since":sinceDate};
		url = getFinalUrl(baseUrl,inputUrl,methods["issues"],since);
	}
	var data = httpGet(url)
	issueCount = getSizeOfObject(data);
	$("#fetch").attr("disabled",null);
	$("#fetch").text("Fetch");
	return issueCount;
}