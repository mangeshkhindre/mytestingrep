'@**************************************************************************************************
'@Test Story: Automate 15.2 ENC-24618 15.2 Commit - Ability to record borrower consent to order credit report
'@Test Case : ENC-26777: TC #3 ENC-24618 - Ability to record borrower consent to order credit report: New 'Credit Information' Fields (Business Rules Settings)
'@ Test Automation JIRA Task: TA-4663
'@ Test Data: Forms_BorrowerSummaryOrigination.xls SetCreditInformation 24618_CreditInformation
'			  Forms_BorrowerSummaryProcessing.xls SetCreditInformation 24618_CreditInformation
'@ Pre-conditions: NA
'@ Description:  
'@ Test Steps:
	'1. Go to Settings->Business rules->Field data entry
	'2. Delete the rule if it already exists
	'3. Create a new rule for the pre-required fields for the ORder credit button
	'4. Activate the rule and close settings
	'5. Logout of the application
	'6. Login to the application as Loan officer
	'7. Select Pipeline View and Create a new blank loan
	'8. Go to Borrower Summary - Origination form
	'9. Click the order credit button
	'10. Validate that the dialog for entering data in pre-required fields pops up
	'11. Populate the data in the pre-required credit information fields
	'12. Click the order credit button again
	'13. Validate that the list of providers comes up
	'14. Logout of the application
	'15. Login as Loan processor
	'16. Select Pipeline View and Create a new blank loan
	'17. Go to Borrower Summary - Processing form
	'18. Click the order credit button
	'19. Validate that the dialog for entering data in pre-required fields pops up
	'20. Populate the data in the pre-required credit information fields
	'21. Click the order credit button again
	'22. Validate that the list of providers comes up
	'23. Exit out of loan
	'24. Navigate to home tab
			
'@ Revision History:
	'2/19/2016	 New create Script.
'*************************************************************************************************


	FRM_Logger_ReportStepEvent "TC3_ENC24618_BusinessRule", "Validate business rules settings for Order credit button", Null
	
	'==============Go to Settings->Business rules->Field data entry=======================
	BIZ_Nav_Settings_Open "Business Rules"
	BIZ_Nav_HierarchyTree "Business Rules", "Field Data Entry"
	
	'===================================Delete the rule if it already exists=============
	BIZ_BR_FieldDataEntry_DeleteExisting "Rule_TC3_ENC24618"
		
	'===========================Create a new rule for the pre-required fields for the ORder credit button===================================
	BIZ_BR_FieldDataEntry_CreateRule_PreRequiredFields "Rule_TC3_ENC24618", "BUTTON_ORDERCREDIT", "4073,4074,4075,4076,4077,4078,4079"
	
	'======================Activate the rule and Close settings========================
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfButton("swfname:=activeBtn")
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfButton("swfname:=btnClose")
	
	BIZ_Nav_HierarchyTree "Company/User Setup", "Organization/Users"
	BIZ_OrganizationUsers_DeleteExistingUser "sven_officer"
	BIZ_OrganizationUsers_DeleteExistingUser "sven_processor"
	BIZ_Nav_Settings_Close()
	BIZ_OrganizationUsers_CreateUser "sven_officer"
	BIZ_OrganizationUsers_CreateUser "sven_processor"
	'=======================Logout of Application========================
    BIZ_Login_UserLogout
   
   '==========================Login to Encompass as loan officer==================================	
    BIZ_Login_UserLogin "sven_officer"
    
	'=====================Select Pipeline View and Create a new blank loan====================
	BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "", "My Pipeline"
	
	'===================Open Borrower Summary Origination Form======================
	BIZ_Forms_Open "Borrower Summary - Origination"
	
	Set objItemizationPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
	
	'==================Click the order credit button=========================
	GUI_WebButton_Click objItemizationPage.WebButton("html id:=Button4")
	
	'===================Validate that the dialog for entering data in pre-required fields pops up=============
	GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfWindow("swfname:=PreRequiredDialog").SwfLabel("swfname:=labelDesc") , 10, "Pre-required fields dialog"
	
	If Not GUI_Object_IsExist(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=PreRequiredDialog").SwfLabel("swfname:=labelDesc")) Then
		FRM_Logger_ReportFailEvent "Exit Action", "Dialog for entering pre-required fields does not come up", Null
		ExitAction
	End If
	
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=PreRequiredDialog").SwfButton("swfname:=closeBtn")
	
	'================populate the data in the pre-required credit information fields====================
	BIZ_BorrowerSummaryOrigination_SetCreditInformation("24618_CreditInformation")
	
	'======================Click the order credit button again========================
	GUI_WebButton_Click objItemizationPage.WebButton("html id:=Button4")
	
	'=======================Validate that the list of providers comes up========================
	GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfWindow("swfname:=OrderDialog").SwfList("swfname:=myLst"), 10, "Providers list"
	
	If Not GUI_Object_IsExist(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=OrderDialog").SwfList("swfname:=myLst")) Then
		FRM_Logger_ReportFailEvent "Exit Action", "List of providers does not come up", Null
		ExitAction
	End If
	
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=OrderDialog").SwfButton("swfname:=cancelBtn1")
	
	'=======================Logout of Application========================
    BIZ_Login_UserLogout
   
   '==========================Login to Encompass==================================	
    BIZ_Login_UserLogin "sven_processor"
    
	'=====================Select Pipeline View and Create a new blank loan====================
	BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "", "My Pipeline"
	
	'===================Open Borrower Summary Processing Form======================
	BIZ_Forms_Open "Borrower Summary - Processing"
	
	'=======================Click the order credit button==================
	GUI_WebButton_Click objItemizationPage.WebButton("html id:=Button17")
	
	'========================Validate that the dialog for entering data in pre-required fields comes up============
	GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfWindow("swfname:=PreRequiredDialog").SwfLabel("swfname:=labelDesc") , 10, "Pre-required fields dialog"
	
	If Not GUI_Object_IsExist(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=PreRequiredDialog").SwfLabel("swfname:=labelDesc")) Then
		FRM_Logger_ReportFailEvent "Exit Action", "Dialog for entering pre-required fields does not come up", Null
		ExitAction
	End If
	
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=PreRequiredDialog").SwfButton("swfname:=closeBtn")
	
	'=============Popualte the data in the pre-required credit information fields==================
	BIZ_BorrowerSummaryProcessing_SetCreditInformation("24618_CreditInformation")
	
	'====================Click the order credit button again============================
	GUI_WebButton_Click objItemizationPage.WebButton("html id:=Button17")
	
	'==================Validate that the list of providers comes up========================
	GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfWindow("swfname:=OrderDialog").SwfList("swfname:=myLst"), 10, "Providers list"
	
	If Not GUI_Object_IsExist(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=OrderDialog").SwfList("swfname:=myLst")) Then
		FRM_Logger_ReportFailEvent "Exit Action", "List of providers does not come up", Null
		ExitAction
	End If
	
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=OrderDialog").SwfButton("swfname:=cancelBtn1")
	
	'================Exit out of loan=======================
	BIZ_Loan_Exit(False)

	 '==================Navigate to home tab==============================
    BIZ_Nav_SelectHomeTab
    
  	'=======================Logout of Application========================
    BIZ_Login_UserLogout
   
   '==========================Login to Encompass as Admin==================================	
    BIZ_Login_UserLogin "sven_admin"
    
    '==============Go to Settings->Business rules->Field data entry=======================
	BIZ_Nav_Settings_Open "Business Rules"
	BIZ_Nav_HierarchyTree "Business Rules", "Field Data Entry"
	
	'===================================Delete the rule if it already exists=============
	BIZ_BR_FieldDataEntry_DeleteExisting "Rule_TC3_ENC24618"
	
