$(document).ready(function () {

	//alert('jquery successfully installed');

	//initializePeoplePicker('peoplePickerDiv');

	$("#peoplePickerDiv").autocomplete({
		source: search,
		minLength: 1
	});

	// urlget()

	/* function fnCreateItem()
	{
    	
	}*/


	$("#Dobid").datepicker({

		//dateFormat: 'dd-mm-yy',
		maxDate: 0,
		//endDate:'01/01/2012',
		prevText: "Earlier",
		changeMonth: true,
		changeYear: true,
		// yearRange: '1995:2013',
		showAnim: "bounce",
		// regional: "it" ,
		showOtherMonths: true,
		//defaultDate: new Date(1995,1-1,1),

	});
	$("#Joinid").datepicker({

		//dateFormat: 'dd-mm-yy',
		showAnim: "clip",
		showOtherMonths: true,


	});

	$('#FstName').change(function () {
		$('#LstName').change(function () {
			$('#Usernameid').val($('#FstName').val() + " " + $('#LstName').val());
		});
	});



	$("#save").click(function () {
		//alert('working');

		var firstname = $('#FstName').val();
		var lastname = $('#LstName').val();
		var employeid = $('#Empid').val();
		var emailid = $('#Emailid').val();
		var phone = $('#Phoneid').val();
		var dob = $('#Dobid').val();
		var joindate = $('#Joinid').val();
		var address = $('#Addressid').val();
		var manager = $('#peoplePickerDiv').val();
		var isValid = true;

		$(".error").remove();

		if (firstname.length < 1) {
			$('#FstName').after('<span class="error">This field is required*</span>');
			isValid = false;
		}


		if (lastname.length < 1) {
			$('#LstName').after('<span class="error">This field is required*</span>');
			isValid = false;
		}


		if (employeid.length < 1) {
			$('#Empid').after('<span class="error">This field is required*</span>');
			isValid = false;
		}


		if (emailid.length < 1) {
			$('#Emailid').after('<span class="error">This field is required*</span>');
			isValid = false;
		}


		if (phone.length < 1) {
			$('#Phoneid').after('<span class="error">This field is required*</span>');
			isValid = false;
		}


		if (dob.length < 1) {
			$('#Dobid').after('<span class="error">This field is required*</span>');
			isValid = false;
		}

		if (joindate.length < 1) {
			$('#Joinid').after('<span class="error">This field is required*</span>');
			isValid = false;
		}

		if (address.length < 1) {
			$('#Addressid').after('<span class="error">This field is required*</span>');
			isValid = false;
		}

		if (manager.length < 1) {
			$('#peoplePickerDiv').after('<span class="error">This field is required*</span>');
			isValid = false;
		}
		if (firstname.length > 1 && !(/^[A-Za-z]+$/.test(firstname))) {
			$('#FstName').after('<span class="error">Please enter valid text</span>');
			isValid = false;
		}
		if (lastname.length > 1 && !(/^[A-Za-z]+$/.test(lastname))) {
			$('#LstName').after('<span class="error">Please enter valid text</span>');
			isValid = false;
		}
		if (employeid.length > 1 && !(/^[A-Za-z0-9]+$/.test(employeid))) {
			$('#Empid').after('<span class="error">Please enter valid id</span>');
			isValid = false;
		}
		if (emailid.length > 1 && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailid))) {
			$('#Emailid').after('<span class="error">Please enter valid email id</span>');
			isValid = false;
		}
		if (phone.length >= 1 && !(/^\d{10}$/.test(phone))) {
			$('#Phoneid').after('<span class="error">Please enter valid 10 digits mobile number</span>');
			isValid = false;
		}
		if (isValid) {

			//alert('success');
			//getUserInfo();
			//createItem();	
			GetValues();
			//dialog();
		}
	});

	$("#cancel").click(function () {

		var url = "https://xenfoss.sharepoint.com/sites/Registration/Lists/ajaxCrudOperations/AllItems.aspx";
		$(location).attr('href', url);

		/*swal({
			  title: "Are you sure?",
			  text: "You want to exit from this page!",
			  icon: "warning",
			 // cancel:true,
			  //confirm:true,
			  buttons: true,
			  dangerMode: true,
		})
				  .then((willDelete) => {
			 if (willDelete) {
				  $(location).attr('href',url);
				} else {
					//swal("Your Item has been Successfully Deleted");
					  }
			});	*/
	});
});

//this function get the user details from current user id
function search(request, response) {
	//var serverUrl = _spPageContextInfo.webAbsoluteUrl;
	// var restSource = serverUrl+ "/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser";
	// var principalType = this.element[0].getAttribute('principalType');
	$.ajax(
		{
			'url': _spPageContextInfo.webAbsoluteUrl + "/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser",
			'method': 'POST',
			'data': JSON.stringify({
				'queryParams': {
					'__metadata': {
						'type': 'SP.UI.ApplicationPages.ClientPeoplePickerQueryParameters'
					},
					'AllowEmailAddresses': true,
					'AllowMultipleEntities': false,
					'AllUrlZones': false,
					'MaximumEntitySuggestions': 50,
					'PrincipalSource': 15,
					'PrincipalType': 15,
					'QueryString': request.term
				}
			}),
			'headers': {
				'accept': 'application/json;odata=verbose',
				'content-type': 'application/json;odata=verbose',
				'X-RequestDigest': $("#__REQUESTDIGEST").val()
			},
			'success': function (data) {
				var d = data;
				var results = JSON.parse(data.d.ClientPeoplePickerSearchUser);
				if (results.length > 0) {
					response($.map(results, function (item) {
						return { label: item.DisplayText, value: item.DisplayText }
						// return {label:item.DisplayText,value:item.Key}  //Here you can get multiple properties of users
					}));
				}
			},
			'error': function (err) {
				alert("search:" + JSON.stringify(err));
			}
		});
}


// in this function we will get user id & we can call the Add/Update Function	
function GetValues() {
	var success = getDetailFromPPSearchUser($("#peoplePickerDiv").val(), 'Employee'); //here we are passing user displayname, source as any string( here 'Employee')
	success.done(function (employeeresults) {
		$.map(employeeresults, function (employeeItem) {
			//sp.js code to ensure user (this will insert user to site if not present)
			var context = SP.ClientContext.get_current();
			var theUser = context.get_web().ensureUser(employeeItem.Key);
			context.load(theUser);
			context.executeQueryAsync(function () {
				var successUserSelected = GetIDForTheSelectedUser(employeeItem.Key);
				successUserSelected.done(function (UserId) {
					//alert(UserId);
					//Here we can call the function of ADD/Update
					createItem(UserId);

					//addListItem('https://<SiteURL>','TestList',UserID)
				});

			},
				function (sender, args) { alert("GetValues : " + args.get_message()); });

		});
	});
}

// this function to check the user name is in site or not
function getDetailFromPPSearchUser(inputString, source) {
	var deferred = $.Deferred();
	var serverUrl = _spPageContextInfo.webAbsoluteUrl;
	var restSource = serverUrl + "/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser";

	$.ajax(
		{
			'url': restSource,
			'method': 'POST',
			'data': JSON.stringify({
				'queryParams': {
					'__metadata': {
						'type': 'SP.UI.ApplicationPages.ClientPeoplePickerQueryParameters'
					},
					'AllowEmailAddresses': true,
					'AllowMultipleEntities': false,
					'AllUrlZones': false,
					'MaximumEntitySuggestions': 50,
					'PrincipalSource': 15,
					'PrincipalType': 15,
					'QueryString': inputString

				}
			}),
			'headers': {
				'accept': 'application/json;odata=verbose',
				'content-type': 'application/json;odata=verbose',
				'X-RequestDigest': $("#__REQUESTDIGEST").val()
			},
			'success': function (data) {
				//$('body').removeClass('loading');
				var d = data;
				var results = JSON.parse(data.d.ClientPeoplePickerSearchUser);
				if (results.length == 1) {
					deferred.resolve(results);
				}
				else {

				}
			},
			'error': function (err) {
				$('#txtshellUser').unbind("click");
				if (JSON.parse(err.responseText).error.code == "-2130575252, Microsoft.SharePoint.SPException") {
					alert("Security validation of the page expired. Please refresh the page.!")
				}
				else {
					alert(JSON.stringify(err));
				}
				deferred.reject();
			}
		}
	);
	return deferred.promise();
}

/// this function Getting the ID for the selected people picker 
/// username should be passed as 'domain\username'

function GetIDForTheSelectedUser(userName) {

	var deferred = $.Deferred();

	var siteUrl = _spPageContextInfo.siteAbsoluteUrl;

	/// make an ajax call to get the site user
	$.ajax({
		url: siteUrl + "/_api/web/siteusers(@v)?@v='" +
			encodeURIComponent(userName) + "'",
		method: "GET",
		headers: { "Accept": "application/json; odata=verbose" },
		success: function (data) {
			//popup user id received from site users.
			deferred.resolve(data.d.Id);
		},
		error: function (data) {
			console.log(JSON.stringify(data));
			alert(JSON.stringify(data));
			deferred.reject();
		}
	});
	return deferred.promise();
}

/*$.ajax({
url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmployeList')/items?$select=EmployemanagerId/EMail,EmployemanagerId/FirstName,EmployemanagerId/LastName&$expand=EmployemanagerId",
method: "GET",
headers: { "Accept": "application/json; odata=verbose" },
success: function (data) {
	console.log(data);
},
error: function (data) {
	console.log(data);
}
});
 
   //var urlBase = window.location.href.split('&')[0];
 //var urlId = parseInt(urlBase.substring(urlBase.lastIndexOf('=') + 1));
 
/*function initializePeoplePicker(peoplePickerElementId) {
	
var schema = {};
schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
schema['SearchPrincipalSource'] = 15;
schema['ResolvePrincipalSource'] = 15;
schema['AllowMultipleValues'] = true;
schema['MaximumEntitySuggestions'] = 50;
schema['Width'] = '260px';
 
this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
}
	
	
	
// Query the picker for user information.
function getUserInfo() {
var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan;
var users = peoplePicker.GetAllUserInfo();
/*var userInfo = '';
for (var i = 0; i < users.length; i++) {
	var user = users[i];
	for (var userProperty in user) { 
		userInfo += userProperty + ':  ' + user[userProperty] + '<br>';
	}*/
/*         getUserId(users[0].Key);
  }
  
  
 /* var keys = peoplePicker.GetAllUserKeys();
			 $('#userKeys').html(keys);
			  getUserId(users[0].Key);
	}*/

/*	function getUserId(loginName) {
	    var context = new SP.ClientContext.get_current();
	    this.user = context.get_web().ensureUser(loginName);
	    context.load(this.user);
	    context.executeQueryAsync(
	    	 Function.createDelegate(null, ensureUserSuccess), 
	         Function.createDelegate(null, onFail)
   		 );
	}

	function ensureUserSuccess() {
    	//createItem('https://xentechn.sharepoint.com/sites/Registration/Lists','EmployeList',this.user.get_id());
    		 createItem(this.user.get_id());
             //$('#userId').html(this.user.get_id());
           // createItem();
	}
	
	function onFail(sender, args) {
    	alert('Query failed. Error: ' + args.get_message());
	}*/


function createItem(userId) {

	var firstname = $('#FstName').val();
	var lastname = $('#LstName').val();
	var username = $('#Usernameid').val();
	var employeid = $('#Empid').val();
	var emailid = $('#Emailid').val();
	var phone = $('#Phoneid').val();
	var dob = $('#Dobid').val();
	var joindate = $('#Joinid').val();
	var address = $('#Addressid').val();
	var manager = $('#peoplePickerDiv').val();
	var status = 'Success';
	var penstat = 'Pending';
	var uri = "https://xenfoss.sharepoint.com/sites/Registration/Lists/ajaxCrudOperations/AllItems.aspx";

	$.ajax
		({
			url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ajaxCrudOperations')/items",
			processData: false,
			type: "POST",
			data: JSON.stringify
				({
					__metadata:
					{
						type: "SP.Data.AjaxCrudOperationsListItem"
					},
					FirstName1: firstname,
					LastName: lastname,
					Title: username,
					EmployeId: employeid,
					Email: emailid,
					Phone: phone,
					DOB: dob,
					JoiningDate: joindate,
					userAddress: address,
					WorkflowStatus: status,
					EmployeManagerId: userId,
					SuccessStatus: penstat
				}),
			headers:
			{
				"Accept": "application/json;odata=verbose",
				"Content-Type": "application/json;odata=verbose",
				"X-RequestDigest": $("#__REQUESTDIGEST").val(),
				"X-HTTP-Method": "POST"
			},

			success: function (data, status, xhr) {
				// retriveListItem(); 
				//console.log(data); 
				// alert("Submitted Successfully");
				swal({
					title: "Good job!",
					text: "Item has been Successfully added!",
					icon: "success",
					button: "Ok!",
				}).then((value) => {
					$(location).attr('href', uri);
				});
			},
			error: function (xhr, status, error) {
				alert('error');
				// $("#ResultDiv").empty().text(data.responseJSON.error);  
			}
		});
}

