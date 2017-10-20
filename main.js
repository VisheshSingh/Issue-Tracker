document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e){
    e.preventDefault();
    var issueDesc = document.getElementById('issueDesc').value;
    var issueSeverity = document.getElementById('issueSeverity').value;
    var issueAssigned= document.getElementById('issueAssigned').value;
    var issueId = chance.guid();
    var issueStatus = 'Open';

    var issue = {
        id: issueId,
        desc: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssigned,
        status: issueStatus
    }

    if(localStorage.getItem('issues') == null){
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }
    document.getElementById('issueInputForm').reset();
    fetchIssues();
}

function setStatusClosed(id){
    var issues = JSON.parse(localStorage.getItem('issues'));
    for(var i = 0; i < issues.length; i++) {
        if(issues[i].id == id){
            issues[i].status = 'Closed';
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

function deleteIssue(id){
    var issues = JSON.parse(localStorage.getItem('issues'));
    for(var i = 0; i < issues.length; i++) {
        if(issues[i].id == id){
            issues.splice(i,1);
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem('issues')) || [];
    var issueList = document.getElementById('issueList');

    issueList.innerHTML = '';
    for(var i = 0; i < issues.length; i++) {
        var id = issues[i].id;
        var desc = issues[i].desc;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;

        issueList.innerHTML += `
        <div class="card my-3">
                <div class="card-body">
                    <h6 class="card-title">Issue ID: ${id}</h6>
                    <p><span class="badge badge-info">${status}</span></p>
                    <h3 class="card-title">${desc}</h3>
                    <p style="display:inline-block"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> ${severity}</p>
                    <p style="display:inline-block"><i class="fa fa-user" aria-hidden="true"></i> ${assignedTo}</p><br/>
                    <button onClick="setStatusClosed(\'${id}\')" class="btn btn-warning">Close</button>
                    <button onClick="deleteIssue(\'${id}\')" class="btn btn-danger">Delete</button>
                </div>
           </div>
        `;
    }
}