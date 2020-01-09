 $(document).ready(function(){	

 		//retriveListItem();
 		
 		//GetValues();
 		getData();
 		  	 
 		 //alert(lookupId);
 		   
 	$('#Approved').click(function(){
 		 	updateApprove();
 	});   
 	
 	$('#Rejected').click(function(){
 			updateReject();
 	});
 	
 	$('#Cancel').click(function(){
 			var url = "https://outlook.office.com/mail/inbox";
			$(location).attr('href',url);
 	});

 		    
   	$("#Exit").click(function(){	
   	
		var url = "https://xenfoss.sharepoint.com/sites/Registration/Lists/ajaxCrudOperations/AllItems.aspx";
		$(location).attr('href',url);
		
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
				 	
				    } else {
					    //swal("Your Item has been Successfully Deleted");
						  }
					});*/
  			});
	});

		/*function getDate(data dt){
		var n = $("#Dobid").val(data.d.results[0].DOB);
		 var dt = n.toLocaleDateString();
		 return dt;
		//console.log(dt);
	 }*/
	 	 
	 	
	 	 
	 function getActualDate(dateValue) {
	    var newDate= new Date(dateValue);
	    var day = newDate.getDate();
	    var month = newDate.getMonth()+1;
	    var year = newDate.getFullYear();
	    //return month + "-" + day  + "-" + year;
	    return month+"-"+day+"-"+year;
	}
		
    var urlBase = window.location.href.split('&')[0];
	var urlId = urlBase.substring(urlBase.lastIndexOf('=') + 1);
	var lookupId; 
	//alert(lookupId);
  function getData(){  
		  	  
		    $.ajax  
		    	({  
			    url:  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ajaxCrudOperations')/items?$select=FirstName1,LastName,Title,EmployeId,Email,Phone,DOB,JoiningDate,userAddress,WorkflowStatus,SuccessStatus,EmployeManager/EMail,EmployeManager/FirstName,EmployeManager/LastName,EmployeManager/Title,EmployeManager/ID&$expand=EmployeManager&$filter=ID eq '"+urlId+"'",
		        type: "GET",  
		         
		        headers:  
		        {  
		            "Accept": "application/json;odata=verbose",  
		            "Content-Type": "application/json;odata=verbose",  
		           
		        },  
		       
		        success: function(data)   
		        {  
		        //alert("get");
		        	console.log(data.d.results);
		        	$("#FstName").val(data.d.results[0].FirstName1);
		        	$("#LstName").val(data.d.results[0].LastName);
		        	$("#Usernameid").val(data.d.results[0].Title);
					$("#Empid").val(data.d.results[0].EmployeId );
					$("#Emailid").val(data.d.results[0].Email);    
					$("#Phoneid").text(data.d.results[0].Phone);
					$("#Joinid").val(getActualDate(data.d.results[0].JoiningDate));
					$("#Addressid").text(data.d.results[0].userAddress);
					$("#Dobid").val(getActualDate(data.d.results[0].DOB));
					$("#Statusid").val(data.d.results[0].WorkflowStatus);
					$("#peoplePickerDiv").val(data.d.results[0].EmployeManager.Title); 
					lookupId = data.d.results[0].EmployeManager.ID;	
					approveId =  data.d.results[0].SuccessStatus;
					validate(lookupId,approveId);
					//alert(lookupId);
		           }, 
		            
		      	error: function(data)  
		        {  
					
					alert(data);
				}  
		    });  
		   }  
		   
		  

		 var urlBase = window.location.href.split('&')[0];
		 var urlId = urlBase.substring(urlBase.lastIndexOf('=') + 1);   
			   
		   function updateApprove()  
				{ 
					var Approve = 'Approved';
					var url = "https://outlook.office.com/mail/inbox";

			  $.ajax  
			    ({  
			        url:  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ajaxCrudOperations')/items("+urlId+")",		        
			        type: "POST",  
			        data: JSON.stringify  
			        ({  
			            __metadata:  
			            {  
			                type: "SP.Data.AjaxCrudOperationsListItem"  
			            },  
			            SuccessStatus:Approve,
			          }),  
			        headers:  
			        {  
			            "Accept": "application/json;odata=verbose",  
			            "Content-Type": "application/json;odata=verbose",  
			            "X-RequestDigest": $("#__REQUESTDIGEST").val(), 
			            "X-HTTP-Method": "MERGE" ,
			            "IF-MATCH": "*",  
			             
			        },  
			        success: function(data, status, xhr){
			        	console.log(data);
			        	$(location).attr('href',url);
			        	//alert('Approved');
			        },  
			        error: function(xhr, status, error){
			        }  
			    });  
		     }   

	  		function updateReject()  
				{  
				   var reject = 'Rejected';
				   var url = "https://outlook.office.com/mail/inbox";    
		    $.ajax  
			    ({  
			        url:  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ajaxCrudOperations')/items("+urlId+")",		        
			        type: "POST",  
			        data: JSON.stringify  
			        ({  
			            __metadata:  
			            {  
			                type: "SP.Data.AjaxCrudOperationsListItem"  
			            },  
			            SuccessStatus: reject 
			        }),  
			        headers:  
			        {  
			            "Accept": "application/json;odata=verbose",  
			            "Content-Type": "application/json;odata=verbose",  
			            "X-RequestDigest": $("#__REQUESTDIGEST").val(), 
			            "X-HTTP-Method": "MERGE" ,
			            "IF-MATCH": "*",  
			             
			        },  
			        success: function(data, status, xhr){
						console.log(data);
						$(location).attr('href',url);
						//alert('rejected');			        
					 },  
			        error: function(xhr, status, error){
			        }  
			    });  
		     }   
				

			/*var lookupId;
			var approveId; 
	 		getData();*/
	 		 
		function validate(lookupId,approveId){
					
			var userid  = _spPageContextInfo.userId; 
			
				if(userid != lookupId ){
					 $('#Approved').hide();
					 $('#Rejected').hide();
					 $('#Cancel').hide();
					}else if(approveId == 'Approved'){
						 	 $('#Approved').hide();
							 $('#Rejected').hide();
							 $('#Cancel').hide();
					}else if(approveId == 'Rejected'){
							$('#Approved').hide();
						    $('#Rejected').hide();
							$('#Cancel').hide();
					}else{
			   			$('#Approved').show();
					    $('#Rejected').show();
						$('#Cancel').show();
						$('#Exit').hide();
					 }
						 
				/*if(userid == lookupId && approveId = ''){
					
						 $('#Approved').show();
						 $('#Rejected').show();
						 $('#Cancel').show();
						 $('#Exit').hide();
					
				}else if(approveId == 'Resubmitted'){
							  $('#Approved').show();
							  $('#Rejected').show();
							  $('#Cancel').show();
							  $('#Exit').hide();
						}*/
					   
					

				       	
				}

		//alert(userid );
		
	/*	$(function(){
			var approvedBtn=$("input[name$='Approved']");
			approvedBtn.attr("onclick","if(!ApprovedValidate()) return false;"+approvedBtn.attr("onclick"));
			var rejectedBtn=$("input[name$='Rejected']");
			rejectedBtn.attr("onclick","if(!RejectedValidate()) return false;"+rejectedBtn.attr("onclick"));
		});
		function ApprovedValidate(){
			//code
			//$("#appsuccess").val('Approved');
			Approve();
			//alert("Approved button click");
			return false;
		 }
		function RejectedValidate(){
			//code
			//$("#appsuccess").val('Rejected');
			Reject();
			//alert("Rejected button click");
			return false;
		 }*/

  		

		//var lookupId = 	UserId;
	
		
		
		
		/*function GetCurrentUser() {
				
			var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + userid+ ")";
			
			var requestHeaders = { "accept" : "application/json;odata=verbose" };
			
			$.ajax({
			  url : requestUri,
			  contentType : "application/json;odata=verbose",
			  headers : requestHeaders,
			  success : onSuccess,
			  error : onError
			  });
			}
			
			function onSuccess(data, request) {
			    var loginName = data.d.Title;
			    alert("Hello " + loginName);
			    //alert(userid );
			
			    // to set the "hello username" into the page
			   // document.getElementById("id").innerHTML = "Hello " + loginName;
			    }
			
			function onError(error) {
			  alert(error);
			  }*/
			
		