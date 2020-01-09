$(document).ready(function(){

	 initializePeoplePicker('peoplepickerid');

});


	function initializePeoplePicker(peoplePickerElementId) {
	
		var schema = {};
	    schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
	    schema['SearchPrincipalSource'] = 15;
	    schema['ResolvePrincipalSource'] = 15;
	    schema['AllowMultipleValues'] = true;
	    schema['MaximumEntitySuggestions'] = 50;
	    schema['Width'] = '260px';
	    
	    this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
	}
	
	function fnCreateItem()
	{
    getUserInfo();
	}
	
	// Query the picker for user information.
	function getUserInfo() {
    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan;
    var users = peoplePicker.GetAllUserInfo();
    getUserId(users[0].Key);
	}

	// Get the user ID.
	function getUserId(loginName) {
    var context = new SP.ClientContext.get_current();
    this.user = context.get_web().ensureUser(loginName);
    context.load(this.user);
    context.executeQueryAsync(
         Function.createDelegate(null, ensureUserSuccess), 
         Function.createDelegate(null, onFail)
    );
	}

	function ensureUserSuccess() {
    addListItem('https://<SiteURL>','TestList',this.user.get_id());
	}
	
	function onFail(sender, args) {
    alert('Query failed. Error: ' + args.get_message());
	}
