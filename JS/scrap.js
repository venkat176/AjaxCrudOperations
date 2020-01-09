function createItem(UserId){
		               
		         /* var firstname = $('#FstName').val();
		          var lastname = $('#LstName').val();
		          var username = $('#Usernameid').val();
		          var employeid = $('#Empid').val();
		          var emailid = $('#Emailid').val();
		          var phone = $('#Phoneid').val();
		          var dob = $('#Dobid').val();
		          var joindate = $('#Joinid').val();
		          var address = $('#Addressid').val();
		          var manager = $('#peoplePickerDiv').val();
		          var status = 'Success';*/
		          var url = "https://xentechn.sharepoint.com/sites/Registration/Lists/EmployeList/AllItems.aspx";
		          
		          
		           var item = $.extend({ "__metadata": { "type": "SP.Data.EmployeListListItem"}},
   						   {   						  
   						  		'FirstName': $('#FstName').val(),
					            'Last_x0020_Name': $('#LstName').val(),
					           ' Title': $('#Usernameid').val(),
					            'Employe_x0020_ID': $('#Empid').val(),
					            'Email': $('#Emailid').val(),
					            'Phone': $('#Phoneid').val(),
					            'DOB': $('#Dobid').val(),
					            'Joining_x0020_Date': $('#Joinid').val(),
					            'WorkAddress': $('#Addressid').val(),
					            'Submitstatus': 'Success',
					           ' EmployemanagerId':userid

   						  });
		                         	
		   $.ajax  
		        ({  
		        url: _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('EmployeList')/items?$select=EmployemanagerId/ID&$expand=EmployemanagerId", 
		        processData: false, 
		        type: "POST",
		        contentType: "application/json;odata=verbose",
		        data: JSON.stringify(item ), 
		        headers:  
		         {  
		            "Accept": "application/json;odata=verbose",  
		            //"Content-Type": "application/json;odata=verbose",  
		            "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
		            "X-HTTP-Method": "POST"  
		         },  
		      
		        
		        /*({  
		            __metadata:  
		            {  
		                type: "SP.Data.EmployeListListItem"  
		            },  
		            FirstName: firstname,
		            Last_x0020_Name: lastname,
		            Title: username ,
		            Employe_x0020_ID: employeid,
		            Email: emailid,
		            Phone: phone,
		            DOB: dob,
		            Joining_x0020_Date: joindate,
		            WorkAddress: address,
		            Submitstatus: status,
		            EmployemanagerId:{"results": [UserId]}
		         }),  */
		         
		        success: function(data, status, xhr)  
		        {  
		           // retriveListItem(); 
		           console.log(data); 
		          // alert("Submitted Successfully");
		          // $(location).attr('href',url);
		           
		        },  
		        error: function(xhr, status, error)  
		        {  
		        alert('error');
		           // $("#ResultDiv").empty().text(data.responseJSON.error);  
		        }  
		    }); 
		}		
	
