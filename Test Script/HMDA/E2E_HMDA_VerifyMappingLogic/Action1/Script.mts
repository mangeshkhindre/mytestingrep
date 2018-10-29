'@**************************************************************************************************
 '@ TestStory: E2E - HMDA -Verify mapping logic for Action(1393) = 1.Loan Originated and 6.Purchased Loan-18.1
 '@ TestCase:
    '1 CTA-264 E2E - HMDA -Verify mapping logic for Action(1393) = 1.Loan Originated and 6.Purchased Loan (18.1 release)
 '@ Test Automation JIRA Task: CTA-266 E2E - HMDA -Verify mapping logic for Action(1393) = 1.Loan Originated and 6.Purchased Loan (18.1 release)
 '@ TestData: "HMDA","HMDA_Profile_Creation","CTA-134"
 '@ TestData: "Setttings_CompanyUserSetup", "OrganizationUsers_CreateUser", "BR_NonAdminUser"
 '@ TestData: "Forms_BorrowerSummaryOrigination", "SetHeadInfo", "SecondaryMarket_CorrespondentLoan"
 '@ TestData: "Forms_BorrowerSummaryOrigination", "SetBorrower", "TC1_CBIZ17_BorrowerInfo"
 '@ TestData: "Forms_BorrowerSummaryOrigination", "SetTransactionDetails", "CTA-134"
 '@ TestData: "Forms_BorrowerSummaryOrigination", "SetProperty", "PTAC-3103" 
 '@ TestData: "Forms_HMDAInformation", "LoanAndOriginationInformation", "CTA-134" 
 '@ TestData: "Forms_2015Itemization", "Set800Section", "CTA-266"
 '@ TestData: "Forms_2015Itemization", "Set800Section", "CTA-266-1"
 '@ TestData: "Forms_HMDAInformation", "LoanAndOriginationInformation", "CTA-266"  
 '@ TestData: "Forms_FNMAStreamlined", "FNMAStreamlined", "CBIZ-11355"
 '@ TestData: "ULDDPDD", "Fannie Mae", "CBIZ-11355"	
 '@ Pre-conditions: 
 	'1. User logged into Encompass with Admin credentials.
	'2. User have created a 'Loan Folder'- HMDA
 '@ Description: 
 '@ TestSteps:
    'CTA-264 Teststeps
     '01 Login to Encompass with the following credentials: admin
     '02 Navigate to Encompass >> Settings >> Loan Setup >> HMDA Profiles
     '03 Click on New HMDA Profiles Add Icon and create a new profile with HMDA Application Date as '745 - Application Date'
     '04 Click on Save and close HMDA Profile form
     '05 Click on Company/User setup--> Orginazation/users. Click on 'Administration' on left side under  'organization'. > Click on Edit Icon.
     '06 Click on + icon next to ' Legal Entity Idetentifier(LEI) on the organization Details Window and select the newly created HMDA Profile in Step 03
     '07 Create a new user
     '08 Logout and Login with Newly created User
     '09 Click on Pipeline and create a new loan under HMDA folder.
	 '10 Fill all the fields in Borrower Summary origination page as per test data.    
	 '11 Navigate to HMDA Information form and set HMDA Reporting Year (HMDA.X27) as 2018
	 '12 Select Action Taken as "Loan Originated" and Save the loan	 
	 '13 Select Credit Scoring Model(4175) as '8.Other Credit Scoring Model'
	 		'a) Verify Other Scoring Model (4176) should be enabled and User can enter Alphanumeric, Width up to 100 characters
	 '14 Select Credit Scoring Model(4178) as '8.Other Credit Scoring Model'
	 		'a) Verify Other Scoring Model (4179) should be enabled and User can enter Alphanumeric, Width up to 100 characters
     '15 Select Action Taken as "Loan Originated"
			'a) Verify Reason for Denial #1(HMDA.X21) = '10. Not Applicable' should appear
     '16 Select 'Action Taken' as 'Application withdrawn by applicant'
     		'a) Verify Reason for Denial #1(HMDA.X21) = '10. Not Applicable' should appear
			'b) Verify Credit Score for Decision Making(4174) = '8888.Not Applicable'
			'c) Verify Credit Score for Decision Making(4177) = '8888.Not Applicable'
			'd) Verify Other Scoring Model (4176) = '9. Not Applicable'
			'e) Verify Other Scoring Model (4179) = '9. Not Applicable'     
     '17 Select Reason for Denial #1(HMDA.X21) as '1.Debt to income ratio'
			'a) Verify Other Denial Reason(s)(HMDA.X34) should be disabled
	 '18 Select Reason for Denial #1(HMDA.X21) as '9.other'
			'a) Verify Other Denial Reason(s)(HMDA.X34) should be enabled
	 '19 Set Line 801 Loan Origination Fees (388)= '3' field in 2015 Itemization form		
			'a) Go to 'Forms tab' --> select Section 32 HOEPA form and verify S32DISC.X51 = 'Does' should appear
     '20 Select Action Taken as "Loan Originated"
     		'a) Verify HOEPA Status(HMDA.X13) = '1. High Cost Mortgage' should appear			
	 '21 Select Action Taken a "Purchased Loan"		
			'a) Verify HOEPA Status(HMDA.X13) ='3. Not Applicable' should appear
	 '22 Set Line 801 Loan Origination Fees (388)= '0' field in 2015 Itemization form		
			'a) Go to 'Forms tab' --> select Section 32 HOEPA form and verify S32DISC.X51 = 'Does not' should appear	
     '23 Select Action Taken as "Loan Originated"
     		'a) Verify HOEPA Status(HMDA.X13) = '2. Not a High Cost Mortgage' should appear					
			'b) Verify Verify Rate Spread (HMDA.X15)= 'NA'
	 '24 Click on 'Tools' tab --> select 'Underwriter Summary' --> 'Income, Assets, Liabilities, and Expenses' section --> uncheck the Checkbox for Employee Loan (4181)		
	 '25 Select 'Action Taken' as 'Application withdrawn by applicant'
			'a) Verify Type of Purchaser(1397)= '0. Not Applicable'
     '26 Select Action Taken as "Loan Originated"
     		'a) Verify Age (4183) = Calculated age based on DOB (1402) 
     		'b) Verify Age (4184) = Calculated age based on DOB (1403)
	 '27 Select 'Action Taken' as "Application denied" 
	 		'a) Verify Application Date ( HMDA.X29) = 745 = Todays date
     '28 Navigate to Borrower summary- Origination form and Select Loan Type (F1172) = 'USDA-RHS'
     		'a) Verify HMDA.X30 = 'USDA-RHS or FSA'
     '29 Navigate to Borrower summary- Origination form and Select Loan Type (F1172) = CONV
			'a) Verify HMDA.X30 = 'CONV'
	 '30 Set HMDA Information Form->2018 Originated/Adverse Action Loans->NMLS button->Set initial Application Amount (NMLS.X11)=440000
     '31 Set FNMA Streamlined 1003->HELOC Credit Limit (CASASRN.X168) =450555
     '32 Set ULDD/PDD Subject Loan Unpaid principal Balance Amt.(ULDD.X1) = 444444.00
	 '33 Select 'Action Taken' as "Preapproval request denied" 
	 		'a) Verify HMDA.X31 = NMLS.X11   
	 '34 Verify HMDA.X31 = Loan Amount(1109) after setting: 
	 		'a) Action Taken as "Loan Originated"	 		
	 		'b) Open End Credit Indicator(HMDA.X57) as "Not an open end credit indicator"
	 		'c) Reverse Mortgage Indicator(HMDA.X56) as "Not a reverse mortgage indicator"
	 '35 Verify HMDA.X31 = CASASRN.X168 after setting: 
	 		'a) Action Taken as "Loan Originated"	 		
	 		'b) Open End Credit Indicator(HMDA.X57) as "Open end credit indicator"
	 '36 Verify HMDA.X31 = Loan Amount(1109) after setting: 
	 		'a) Action Taken as "Application denied"	 		
	 		'b) Open End Credit Indicator(HMDA.X57) as blank
	 		'c) Reverse Mortgage Indicator(HMDA.X56) as "Reverse mortgage indicator"
	 '37 Verify HMDA.X31 = Subject Loan Unpaid Principal Balance Amt(ULDD.X1) after setting: 
	 		'a) Action Taken as "Purchased Loan"	 		
	 		'b) Reverse Mortgage Indicator(HMDA.X56) as blank
 '**************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case: CTA-264","Script Name - CTA-264-HMDA -Verify mapping logic for Action(1393) = 1.Loan Originated and 6.Purchased Loan", Null

FRM_Logger_ReportStepEvent "Start Test Step","Verify mapping logic for Action Taken as 'Loan Originated'", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"

BIZ_Settings_CreateLoanFolder "Automation","OFF","OFF"

'====== Go to Settings/Loan Setup,HMDA Settings ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."

'====== Create new HMDA Profile ======
BIZ_HMDA_AddNewHMDAProfile "CTA-134"

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Company/User Setup","Organization/Users"
wait(3)
GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=stdIconBtnEditOrg")
FRM_Logger_ReportInfoEvent "Click on Edit Object","Clicked on Edit Object", Null
GUI_SwfObject_Click SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=AddEditOrgDialog").SwfObject("swfname:=stdButtonNewHMDAProfile")
FRM_Logger_ReportInfoEvent "Click on Add button","Clicked on Add Button on Legal Entity Identifer", Null
wait(3)
Set objProfileList2 = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=AddEditOrgDialog").SwfWindow("swfname:=AddEditLEIDialog").SwfObject("swfname:=gvHMDAProfile")
Set objScrollBar = objProfileList2.SwfScrollBar("swfname:=vPanelScrollBar") 

Set objProfileDetails=FRM_DS_GetTestData("HMDA","HMDA_Profile_Creation","CTA-134")
wait(3)
'====== Click on Profile Name======
GUI_List_ClickRow objProfileList2,objScrollBar,"Profile Name",FRM_DS_GetValue(objProfileDetails,"ProfileName"),True,False,False,"Single"

Set objProfileDetails=Nothing
Set objProfileList2 =Nothing
wait(3)
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=AddEditOrgDialog").SwfWindow("swfname:=AddEditLEIDialog").SwfButton("swfname:=okBtn")

'GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=AddEditOrgDialog").SwfButton("swfname:=okBtn")
SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=AddEditOrgDialog").SwfButton("swfname:=okBtn").Object.PerformClick
wait(3)
'====== Create a new user======

BIZ_OrganizationUsers_CreateUser("BR_NonAdminUser")

wait(3)
Set objSettingWindow   = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")

BIZ_Nav_HierarchyTree "Company/User Setup", "User Groups"
GUI_SwfList_Select objSettingWindow.SwfListView("swfname:=lvGroup"), "All Users"
GUI_SwfTab_Click objSettingWindow.SwfTab("swfname:=tabControl1"), "Loans"
GUI_SwfList_SetCheckbox objSettingWindow.SwfListView("swfname:=listViewLoanFolders"),"Automation", micChecked
If objSettingWindow.SwfObject("swfname:=stdIconBtnSave").GetROProperty("Enabled") = True Then
	GUI_SwfObject_Click objSettingWindow.SwfObject("swfname:=stdIconBtnSave")
End If
wait(3)
BIZ_Nav_Settings_Close

BIZ_Login_UserLogout()
wait(3)
'====== Login to the Encompass with BR_NonAdminUser profile ======
BIZ_Login_UserLogin "BR_NonAdminUser"

BIZ_Nav_SelectPipelineTab()

'BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "Automation" 
wait(3)
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Administrator - Default View", "Automation" 

'BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "",""

'====== Set Borrower Header Information======
BIZ_BorrowerSummaryOrigination_SetHeadInfo "SecondaryMarket_CorrespondentLoan"
wait(3)
'====== Set Borrower Information======
BIZ_BorrowerSummaryOrigination_SetBorrower "TC1_CBIZ17_BorrowerInfo"

'====== Set Transaction Details Information======
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "CTA-134"
wait(3)
'====== Set Subject Property Information======
BIZ_BorrowerSummaryOrigination_SetProperty "PTAC-3103"

wait(3)
'====== Set Action taken as '1. Loan Originated"====== 
BIZ_HMDA_2018LoanAndOriginationInformation "CTA-134"

BIZ_Loan_Save()

wait(3)
'====== Set Credit Scoring Model 4175=====
If BIZ_HMDAPageObj.WebButton("html id:=FieldLock22").Exist(2) Then
	FRM_Logger_ReportStepEvent "Test Step 10","Other Scoring Model 4176 should be enabled if Credit Scoring Model 4175 is '8. Other credit scoring model'", Null
	GUI_WebButton_Click BIZ_HMDAPageObj.WebButton("html id:=FieldLock22")
	'GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=l_4175"), "8. Other credit scoring model"
	GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=l_4175_2017"), "8. Other credit scoring model"
	FRM_logger_ReportInfoEvent "4175_Credit Scoring Model","Field 4175_Credit Scoring Model has been set as '8. Other credit scoring model'", null 	
	'======Validate that Other Scoring Model 4176 field is enabled and has length of 100======
	If BIZ_HMDAPageObj.WebEdit("html id:=TextBox13").Exist(2) Then	
		GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=TextBox13"),"readonly","0","Other Scoring Model 4176"
		GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=TextBox13"),"max length","100","Other Scoring Model 4176"
	End If
End If
wait(2)
'====== Set Credit Scoring Model 4178=====
If BIZ_HMDAPageObj.WebButton("html id:=FieldLock23").Exist(2) Then
	FRM_Logger_ReportStepEvent "Test Step 11","Other Scoring Model 4178 should be enabled if Credit Scoring Model 4178 is '8. Other credit scoring model'", Null
	GUI_WebButton_Click BIZ_HMDAPageObj.WebButton("html id:=FieldLock23")
	'GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=l_4178"), "8. Other credit scoring model"
	GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=l_4178_2017"), "8. Other credit scoring model"
	FRM_logger_ReportInfoEvent "4178_Credit Scoring Model","Field 4178_Credit Scoring Model has been set as '8. Other credit scoring model'", null 	
	'======Validate that Other Scoring Model 4179 field is enabled and has length of 100======
	If BIZ_HMDAPageObj.WebEdit("html id:=TextBox15").Exist(2) Then	
		GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=TextBox15"),"readonly","0","Other Scoring Model 4179"
		GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=TextBox15"),"max length","100","Other Scoring Model 4179"
	End If
End If
wait(2)
'======Verify Reason for Denial#1 HMDA.X21 should be '10. Not applicable'=====
If BIZ_HMDAPageObj.WebList("html id:=DropdownBox15").Exist(2) Then	
	FRM_Logger_ReportStepEvent "Test Step 12","Reason for Denial#1 HMDA.X21 should be '10. Not applicable' since Action taken is '1. Loan Originated'", Null
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=DropdownBox15"),"selection","10. Not applicable","Reason for Denial#1 HMDA.X21"	
End If



'====== Select 'Action Taken' as 4.Application withdrawn by applicant===== 
If BIZ_HMDAPageObj.WebList("html id:=DropDownBox3").Exist(2) Then
	GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=DropDownBox3"), "4. Application withdrawn by applicant"
	FRM_logger_ReportInfoEvent "1393_ActionTaken","Field 1393_ActionTaken has been set as '4. Application withdrawn by applicant'", null
	'Added as a part of Functional change as per Requirement to get old values:- CBIZ-14517
	GUI_WebButton_Click BIZ_HMDAPageObj.WebButton("html id:=FieldLock22")
	GUI_WebButton_Click BIZ_HMDAPageObj.WebButton("html id:=FieldLock23")
	wait 2
	'Added as a part of Functional change as per Requirement to get old values:- CBIZ-14517
	'======Verify Reason for Denial#1 HMDA.X21 should be '10. Not applicable"=====
	If BIZ_HMDAPageObj.WebList("html id:=DropdownBox15").Exist(2) Then
		FRM_Logger_ReportStepEvent "Test Step 13a","Reason for Denial#1 HMDA.X21 should be '10. Not applicable' since Action Taken is '4. Application withdrawn by applicant'", Null
		GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=DropdownBox15"),"selection","10. Not applicable","Reason for Denial#1 HMDA.X21"
	End If
	'======Verify Credit Score for Decision Making 4174 should be '8888. Not applicable"=====
	If BIZ_HMDAPageObj.ActiveX("progid:=JedCombo2.ComboFull.1","index:=0").Exist(2) Then	
		FRM_Logger_ReportStepEvent "Test Step 13b","Credit Score for Decision Making 4174 should be '8888. Not applicable' since Action Taken is '4. Application withdrawn by applicant'", Null
		
		GUI_Object_ValidateProperty BIZ_HMDAPageObj.ActiveX("progid:=JedCombo2.ComboFull.1","index:=0").WinEdit("index:=0"),"text","8888. Not applicable   ","Credit Score for Decision Making 4174"
	End If
	'======Verify Credit Score for Decision Making 4177 should be '8888. Not applicable"=====
	If BIZ_HMDAPageObj.ActiveX("progid:=JedCombo2.ComboFull.1","index:=1").Exist(2) Then
		'New field vbalue should be Blank CBIZ-15658
		FRM_Logger_ReportStepEvent "Test Step 13c","Credit Score for Decision Making 4177 should be Blank since Action Taken is '4. Application withdrawn by applicant'", Null	
		GUI_Object_ValidateProperty BIZ_HMDAPageObj.ActiveX("progid:=JedCombo2.ComboFull.1","index:=1").WinEdit("index:=0"),"text","   ","Credit Score for Decision Making 4177"
'		FRM_Logger_ReportStepEvent "Test Step 13c","Credit Score for Decision Making 4177 should be '8888. Not applicable' since Action Taken is '4. Application withdrawn by applicant'", Null	
'		GUI_Object_ValidateProperty BIZ_HMDAPageObj.ActiveX("progid:=JedCombo2.ComboFull.1","index:=1").WinEdit("index:=0"),"text","8888. Not applicable   ","Credit Score for Decision Making 4177"
	End If  
	'======Validate that Credit Scoring Model 4175 field is 9. Not applicable======
	If BIZ_HMDAPageObj.WebList("html id:=l_4175").Exist(2) Then	
		FRM_Logger_ReportStepEvent "Test Step 13d","Credit Scoring Model 4175 field should be '9. Not applicable' since Action Taken is '4. Application withdrawn by applicant'", Null	
		GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=l_4175"),"selection","9. Not applicable","Credit Scoring Model 4175"	
	End If	
	'======Validate that Credit Scoring Model 4178 field is 9. Not applicable=====
	If BIZ_HMDAPageObj.WebList("html id:=l_4178").Exist(2) Then	
		'New field vbalue should be Blank CBIZ-15658
		FRM_Logger_ReportStepEvent "Test Step 13e","Credit Scoring Model 4178 field should be #0 since Action Taken is '4. Application withdrawn by applicant'", Null	
		GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=l_4178"),"selection","#0","Credit Scoring Model 4178"	
'		FRM_Logger_ReportStepEvent "Test Step 13e","Credit Scoring Model 4178 field should be '9. Not applicable' since Action Taken is '4. Application withdrawn by applicant'", Null	
'		GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=l_4178"),"selection","9. Not applicable","Credit Scoring Model 4178"		
	End If  
End If

'Code Commented for Functional Update in script for JIRA 14517 for checking the Desablity and enablity of Reason for Denial #1
'************************************************************************************************************************************************************************
'======Set Reason For Denial#1 HMDA.X21======
'If BIZ_HMDAPageObj.WebButton("html id:=FieldLock24").Exist(2) Then
'	FRM_Logger_ReportStepEvent "Test Step 14","Other Denial Reason should be disabled if Reason For Denial#1 is '1. Debt-to-income ratio'", Null
'	GUI_WebButton_Click BIZ_HMDAPageObj.WebButton("html id:=FieldLock24")
'	GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=DropdownBox15"), "1. Debt-to-income ratio"
'	FRM_logger_ReportInfoEvent "HMDA.X21_ReasonForDenial#1","Field HMDA.X21_ReasonForDenial#1 has been set as '1. Debt-to-income ratio'", null 	
'	'======Validate that field Other Denial Reason HMDA.X34 gets disabled ======
'	If BIZ_HMDAPageObj.WebEdit("html id:=MultilineTextBox1").Exist(2) Then	
'		GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=MultilineTextBox1"),"readonly","1","Other Denial Reason HMDA.X34"	
'	End If
'	FRM_Logger_ReportStepEvent "Test Step 15","Other Denial Reason should be enabled if Reason For Denial#1 is '9. Other'", Null
'	'======Set Reason For Denial#1 HMDA.X21 as '9. Other'======
'	GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=DropdownBox15"), "9. Other"
'	'======Validate that field Other Denial Reason HMDA.X34 gets enabled ======
'	If BIZ_HMDAPageObj.WebEdit("html id:=MultilineTextBox1").Exist(2) Then	
'		GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=MultilineTextBox1"),"readonly","0","Other Denial Reason HMDA.X34"	
'	End If	
'Else
'	FRM_logger_ReportInfoEvent "HMDA.X21_ReasonForDenial#1","Field HMDA.X21_ReasonForDenial#1 is not present", null 	
'End If 
'************************************************************************************************************************************************************************
'Checking the Reason for Denial Fields for Action taken as 4. Application withdrawn by applicant
FRM_Logger_ReportStepEvent "Test Step 14","Other Denial Reason and HMDA.X21_ReasonForDenial#1 should be disabled for Action taken as '4. Application withdrawn by applicant'", Null

GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=DropdownBox15"),"disabled","1","Reason for Denial #1"	'Reason for Denial #1
GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=MultilineTextBox1"),"readonly","1","Other Denial Reason HMDA.X34"	'Other Denial Reason

'Checking the Reason for Denial Fields for Action taken as 7. Application withdrawn by applicant
GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=DropDownBox3"), "7. Preapproval request denied"
FRM_logger_ReportInfoEvent "1393_ActionTaken","Field 1393_ActionTaken has been set as '7. Preapproval request denied'", null
wait 2
'Both the Feilds below should be enabled
GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=DropdownBox15"),"disabled","0","Reason for Denial #1"	'Reason for Denial #1
GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=DropdownBox15"), "9. Other"
wait 1
GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=MultilineTextBox1"),"readonly","0","Other Denial Reason HMDA.X34"	'Other Denial Reason

'Changes finished



'====== Set 2015 Itemization (Our Origination Charge section and Origination / Discount Point Adjustment section)======
BIZ_2015Itemization_Set800Section "CTA-266"

BIZ_Forms_Open "Section 32 HOEPA"

'======Validate Field S32.DISCX51=====
If BIZ_HMDAPageObj.WebEdit("html id:=l_S32DISCX51").Exist(2) Then	
	FRM_Logger_ReportStepEvent "Test Step 17","Field S32.DISCX51 should have value 'does'", Null	
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=l_S32DISCX51"),"value","does","Field S32.DISCX51"	
End If 

BIZ_Forms_Open "HMDA Information"

'183 Changes added for step 18 CBIZ-14716 for Covering three scenarios for HOEPA section
'====== Select 'Action Taken' as '1. Loan Originated'===== 
If BIZ_HMDAPageObj.WebList("html id:=l_1393").Exist(2) Then
	GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=l_1393"), "1. Loan originated"
elseif BIZ_HMDAPageObj.WebList("html id:=DropdownBox3").Exist(2) Then
	GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=DropdownBox3"), "1. Loan originated"
End if	
FRM_logger_ReportInfoEvent "1393_ActionTaken","Field 1393_ActionTaken has been set as '1. Loan originated'", null
'======Verify HOEPA Status HMDA.X13 should be '3. Not applicable"=====
	If BIZ_HMDAPageObj.WebList("html id:=DropdownBox4").Exist(2) Then
		FRM_Logger_ReportStepEvent "Test Step 18","HOEPA Status HMDA.X13 should be '1. High Cost Mortgage' since Action Taken is '1. Loan originated'", Null
		GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=DropdownBox4"),"selection","1. High-cost mortgage","HOEPA Status HMDA.X13"
	End If
BIZ_Forms_Open "ATR/QM Management"
'=== Fill details in ATR/QM Management form ====
GUI_SwfTab_Click SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControlForm"), "ATR/QM Eligibility"

GUI_WebCheckbox_Set BIZ_HMDAPageObj.WebCheckBox("html id:=__cid_CheckBox1_Ctrl"),"ON"

BIZ_Forms_Open "HMDA Information"
'183 Changes added for step 18

'====== Select 'Action Taken' as 6.Purchased Loan===== 

If BIZ_HMDAPageObj.WebList("html id:=DropDownBox3").Exist(2) Then
	GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=DropDownBox3"), "6. Purchased loan"
	FRM_logger_ReportInfoEvent "1393_ActionTaken","Field 1393_ActionTaken has been set as '6. Purchased loan'", null
	'======Verify HOEPA Status HMDA.X13 should be '3. Not applicable"=====
	If BIZ_HMDAPageObj.WebList("html id:=l_HMDAX13").Exist(2) Then
		FRM_Logger_ReportStepEvent "Test Step 19","HOEPA Status HMDA.X13 should be '3. Not applicable' since Action Taken is '6. Purchased Loan'", Null
		GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=l_HMDAX13"),"selection","3. Not applicable","HOEPA Status HMDA.X13"
	End If	
End if	
If BIZ_HMDAPageObj.WebList("html id:=l_1393").Exist(2) Then
	GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=l_1393"), "6. Purchased loan"
	FRM_logger_ReportInfoEvent "1393_ActionTaken","Field 1393_ActionTaken has been set as '6. Purchased loan'", null
	'======Verify HOEPA Status HMDA.X13 should be '3. Not applicable"=====
	If BIZ_HMDAPageObj.WebList("html id:=DropdownBox4").Exist(2) Then
		FRM_Logger_ReportStepEvent "Test Step 19","HOEPA Status HMDA.X13 should be '3. Not applicable' since Action Taken is '6. Purchased Loan'", Null
		GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=DropdownBox4"),"selection","3. Not applicable","HOEPA Status HMDA.X13"
	End If	
End If

BIZ_Forms_Open "ATR/QM Management"
'=== Fill details in ATR/QM Management form ====
GUI_SwfTab_Click SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControlForm"), "ATR/QM Eligibility"

GUI_WebCheckbox_Set BIZ_HMDAPageObj.WebCheckBox("html id:=__cid_CheckBox1_Ctrl"),"OFF"
'====== Set 2015 Itemization (Our Origination Charge section)======
BIZ_2015Itemization_Set800Section "CTA-266-1"

BIZ_Forms_Open "Section 32 HOEPA"

'======Validate Field S32.DISCX51=====
If BIZ_HMDAPageObj.WebEdit("html id:=l_S32DISCX51").Exist(2) Then	
	FRM_Logger_ReportStepEvent "Test Step 21","Field S32.DISCX51 should have value 'does not'", Null	
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=l_S32DISCX51"),"value","does not","Field S32.DISCX51"	
End If 

BIZ_Forms_Open "HMDA Information"

'====== Select 'Action Taken' as '1. Loan Originated'===== 
If BIZ_HMDAPageObj.WebList("html id:=l_1393").Exist(2) Then
	GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=l_1393"), "1. Loan originated"
elseif BIZ_HMDAPageObj.WebList("html id:=DropdownBox3").Exist(2) Then
	GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=DropdownBox3"), "1. Loan originated"
End if	
	FRM_logger_ReportInfoEvent "1393_ActionTaken","Field 1393_ActionTaken has been set as '1. Loan originated'", null
	'======Verify HOEPA Status HMDA.X13 should be '2. Not a high-cost mortgage"=====
	If BIZ_HMDAPageObj.WebList("html id:=DropdownBox4").Exist(2) Then
		FRM_Logger_ReportStepEvent "Test Step 23","HOEPA Status HMDA.X13 should be '2. Not a high-cost mortgage' since Action Taken is '1. Loan Originated'", Null
		GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=DropdownBox4"),"selection","2. Not a high-cost mortgage","HOEPA Status HMDA.X13"
	End If	
	
	'183 Functional change for Rate Spread value .Its blank for Action taken 1. Loan originated.JIRA 12620
	'Now its lock field with editbale option after clicking on lock item.Original validation is commented as a result.
	
	'======Verify Rate Spread HMDA.X15 should be NA"=====
	If BIZ_HMDAPageObj.WebEdit("html id:=TextBox11").Exist(2) Then
		FRM_Logger_ReportStepEvent "Test Step 24","Rate Spread HMDA.X15 should be 'NA' since Action Taken is '1. Loan Originated'", Null
		GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=TextBox11"),"value","","Rate Spread HMDA.X15"
'		GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=TextBox11"),"value","NA","Rate Spread HMDA.X15"
	End If	
'End If	

BIZ_Tools_Open "Underwriter Summary"

'======Uncheck 4181 Employee Loan========
SwfWindow("swfname:=MainForm").Page("index:=0").WebCheckBox("html id:=__cid_CheckBox20_Ctrl").Set "Off"

BIZ_Forms_Open "HMDA Information"

'====== Select 'Action Taken' as 4.Application withdrawn by applicant===== 
If BIZ_HMDAPageObj.WebList("html id:=DropDownBox3").Exist(2) Then
	GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=DropDownBox3"), "4. Application withdrawn by applicant"
	FRM_logger_ReportInfoEvent "1393_ActionTaken","Field 1393_ActionTaken has been set as '4. Application withdrawn by applicant'", null
	'======Verify Type of Purchaser 1397 should be '0. Not applicable"=====
	If BIZ_HMDAPageObj.WebList("html id:=DropdownBox8").Exist(2) Then
		FRM_Logger_ReportStepEvent "Test Step 26","Type of Purchaser 1397 should be '0. Not applicable' since Action Taken is '4. Application withdrawn by applicant'", Null
		GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=DropdownBox8"),"selection","0. Not applicable","Type of Purchaser 1397"
	End If
End If 

'====== Select 'Action Taken' as '1. Loan originated'===== 
If BIZ_HMDAPageObj.WebList("html id:=DropDownBox3").Exist(2) Then
	GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=DropDownBox3"), "1. Loan originated"
	FRM_logger_ReportInfoEvent "1393_ActionTaken","Field 1393_ActionTaken has been set as '1. Loan originated'", null
	'======Get the value of Borrower Age 4183=====
	strBorrDOB=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*").WebEdit("html id:=TextBox6"),"value")
	strBorrDOB=cdate(strBorrDOB)
	expectedAge=DateDiff("yyyy",strBorrDOB,date)
	actualAge=clng(GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*").WebEdit("html id:=TextBox7"),"value"))	
	If expectedAge=actualAge Then
		FRM_Logger_ReportPassEvent "Borrower age check", "Age "&actualAge&" matches with calcualted age based on DOB "&strBorrDOB, Null
	Else
		FRM_Logger_ReportFailEvent "Borrower age check", "Age "&actualAge&" does not matches with calcualted age based on DOB "&strBorrDOB, Null
	End If
End If

'====== Select 'Action Taken' as '3. Application denied'===== 
If BIZ_HMDAPageObj.WebList("html id:=DropDownBox3").Exist(2) Then
	GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=DropDownBox3"), "3. Application denied"
	FRM_logger_ReportInfoEvent "1393_ActionTaken","Field 1393_ActionTaken has been set as '3. Application denied'", null
	'======Get the value of Application Date HMDA.X29=====
	strAppDate=cdate(GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*").WebEdit("html id:=l_HMDAX29"),"value"))	
	If strAppDate=Date Then
		FRM_Logger_ReportPassEvent "Application Date check", "Application Date "&strAppDate&" matches with today's date", Null
	Else
		FRM_Logger_ReportFailEvent "Application Date check", "Application Date "&strAppDate&" does not matches with today's date", Null
	End If
End If

BIZ_Forms_Open "Borrower Summary - Origination"

'======Set Loan Type as USDA-RHS========
If SwfWindow("swfname:=MainForm").Page("index:=0").WebCheckBox("html id:=__cid_CheckBox24_Ctrl").Exist(2) Then
	SwfWindow("swfname:=MainForm").Page("index:=0").WebCheckBox("html id:=__cid_CheckBox24_Ctrl").Set "On"
	FRM_logger_ReportInfoEvent "Loan Type F1172","Loan Type has been set as 'USDA-RHS'", null	
	BIZ_Forms_Open "HMDA Information"	
	'======Verify Loan Type HMDA.X30 should be '4. USDA-RHS or FSA'=====
	If BIZ_HMDAPageObj.WebList("html id:=DropdownBox1").Exist(2) Then
		FRM_Logger_ReportStepEvent "Test Step 30","Loan Type HMDA.X30 should be '4. USDA-RHS or FSA' since Loan Type in Borrower Summary is set as 'USDA-RHS'", Null
		GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=DropdownBox1"),"selection","4. USDA-RHS or FSA","Loan Type HMDA.X30"
	End If
End If

BIZ_Forms_Open "Borrower Summary - Origination"

'======Set Loan Type as Conv========
If SwfWindow("swfname:=MainForm").Page("index:=0").WebCheckBox("html id:=__cid_CheckBox19_Ctrl").Exist(2) Then
	SwfWindow("swfname:=MainForm").Page("index:=0").WebCheckBox("html id:=__cid_CheckBox19_Ctrl").Set "On"
	FRM_logger_ReportInfoEvent "Loan Type F1172","Loan Type has been set as 'CONV'", null
	BIZ_Forms_Open "HMDA Information"	
	'======Verify Loan Type HMDA.X30 should be '1. Conventional'=====
	If BIZ_HMDAPageObj.WebList("html id:=DropdownBox1").Exist(2) Then
		FRM_Logger_ReportStepEvent "Test Step 32","Loan Type HMDA.X30 should be '1. Conventional' since Loan Type in Borrower Summary is set as 'CONV'", Null
		GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=DropdownBox1"),"selection","1. Conventional","Loan Type HMDA.X30"
	End If	
End If

BIZ_HMDA_2018LoanAndOriginationInformation "CTA-266"

'====== Set FNMA Streamlined 1003 Information====== 
BIZ_Forms_Open "Borrower Summary - Origination"
FRM_logger_ReportInfoEvent "Entering Data on  field 4470 ","Field CASASRN.X168_HelocCreditLimit has been locked in 18.4 release ", null		

Set SubOrdntWndw = SwfWindow("swfname:=MainForm").SwfWindow("text:=Subordinate.*","swfname:=SubFinancingHelocDialog")

Set ObjEdit  = SubOrdntWndw.SwfEdit("swfname:=textBox7","swfname path:=textBox7.*")

Set objSubFinacng = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebButton("value:=Sub. Financing")

Set objData9 = FRM_DS_GetTestData("Forms_FNMAStreamlined", "FNMAStreamlined", "CBIZ-11355")

GUI_WebButton_Click objSubFinacng
FRM_logger_ReportInfoEvent "Entering Data on  field 4470 ","Entering the value by clicking on 'Sub Monitoring' field", null		
If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData9, "CASASRN.X168_HelocCreditLimit")) then 
		valHelocCreditLimit=FRM_DS_GetValue(objData9, "CASASRN.X168_HelocCreditLimit")	
		GUI_SwfEdit_Set ObjEdit, valHelocCreditLimit		
		FRM_logger_ReportInfoEvent "Entering Data on  field 4470 ","Field 4470 has been set as " &valHelocCreditLimit& " ", null	
End If

FRM_logger_ReportInfoEvent "Entering Data on  field 4470 ","closing the 'Subordinate Mortgage Loan Amounts' window ", null
GUI_SwfButton_Click SubOrdntWndw.SwfButton("swfname:=okBtn")

BIZ_Forms_Open "FNMA Streamlined 1003"

wait(3)

Set objPage2 = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=I_CASASRNX168")

If objPage2.Exist Then
FRM_logger_ReportInfoEvent "CASASRN.X168_HelocCreditLimit "," Filed 'CASASRN.X168_HelocCreditLimit' is displayed on the form successfully", null	

   	 If objPage2.GetROProperty("readonly") Then
		FRM_logger_ReportInfoEvent "CASASRN.X168_HelocCreditLimit "," Filed 'CASASRN.X168_HelocCreditLimit' locked", null
	else
		FRM_Logger_ReportFailEvent "CASASRN.X168_HelocCreditLimit "," Filed 'CASASRN.X168_HelocCreditLimit' NOT locked", null	
	End If
else
FRM_Logger_ReportFailEvent "CASASRN.X168_HelocCreditLimit "," Filed 'CASASRN.X168_HelocCreditLimit' is displayed on the form successfully", null		
End If
wait(2)

'====== get the value of "HELOC Credit Limit" field CASASRN.X168 from FNMA Streamlined 1003 form ====== 
valHelocCreditLimit=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=I_CASASRNX168"),"value")
valHelocCreditLimit=Replace(valHelocCreditLimit,",","")

'====== Set ULDD/PDD Information====== 
BIZ_ULDDPDD_SetHOEPAStatus "Fannie Mae","CBIZ-11355"
wait(3)
'====== get the value of "Subject Loan Unpaid Principal Balance Amt" field ULDD.X1 from ULDD/PDD form ====== 
valAmt=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox1"),"value")
valAmt=Replace(valAmt,",","")

Set objData = FRM_DS_GetTestData("Forms_HMDAInformation", "LoanAndOriginationInformation","CBIZ-11355")

If( UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData,"NMLS.X11_InitialApplicationAmount"))) Then
    valInitialApplicationAmount=FRM_DS_GetValue(objData,"NMLS.X11_InitialApplicationAmount") 
End If	

BIZ_Forms_Open "HMDA Information"
wait(3)
'====== Select 'Action Taken' as '7. Preapproval request denied'===== 
If BIZ_HMDAPageObj.WebList("html id:=DropDownBox3").Exist(2) Then
	GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=DropDownBox3"), "7. Preapproval request denied"
	FRM_logger_ReportInfoEvent "1393_ActionTaken","Field 1393_ActionTaken has been set as '7. Preapproval request denied'", null
	'====== Get the value of "Loan amount" field HMDA.X31 from "2018 HMDA Originated/Adverse Action Loans" form ====== 
	loanAmt=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox4"),"value")
	loanAmt=Replace(loanAmt,",","")	
	FRM_Logger_ReportStepEvent "Test Step 36","Loan Type HMDA.X31 should be equal to NMLS.X11_Initial Application Amount", Null
	If IsNumeric(valInitialApplicationAmount) And IsNumeric(loanAmt) Then	
		If clng(valInitialApplicationAmount)=clng(loanAmt) Then
			FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X31 Loan Amount "&loanAmt&" matches with NMLS.X11_Initial Application Amount "&valInitialApplicationAmount, Null
		Else
			FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X31 Loan Amount "&loanAmt&" does not matches with NMLS.X11_Initial Application Amount "&valInitialApplicationAmount, Null
		End If
	Else 
		If valInitialApplicationAmount=loanAmt Then
			FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X31 Loan Amount "&loanAmt&" matches with NMLS.X11_Initial Application Amount "&valInitialApplicationAmount, Null
		Else
			FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X31 Loan Amount "&loanAmt&" does not matches with NMLS.X11_Initial Application Amount "&valInitialApplicationAmount, Null
		End If	
	End If	
End If

BIZ_Forms_Open "1003 Page 1"
wait(3)
'====== get the value of "Loan Amount" field 1109 from 1003 Page 1====== 
loanAmount=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=l_1109"),"value")
loanAmount=Replace(loanAmount,",","")

BIZ_Forms_Open "HMDA Information"
wait(3)
'====== Select 'Action Taken' as '1. Loan Originated'===== 
If BIZ_HMDAPageObj.WebList("html id:=DropDownBox3").Exist(2) Then
	GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=DropDownBox3"), "1. Loan originated"
	FRM_logger_ReportInfoEvent "1393_ActionTaken","Field 1393_ActionTaken has been set as '1. Loan originated'", null	
	'======Set Open End Line of Credit HMDA.X57 as '2. Not an open-end line of credit"=====
	If BIZ_HMDAPageObj.WebList("html id:=l_HMDAX57").Exist(2) Then		
		GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=l_HMDAX57"), "2. Not an open-end line of credit"
		FRM_logger_ReportInfoEvent "Open End Line of Credit HMDA.X57","Open End Line of Credit HMDA.X57 has been set as '2. Not an open-end line of credit'", null	
	ElseIf BIZ_HMDAPageObj.WebList("html id:=DropdownBox33").Exist(2) Then		
		GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=DropdownBox33"), "2. Not an open-end line of credit"
		FRM_logger_ReportInfoEvent "Open End Line of Credit HMDA.X57","Open End Line of Credit HMDA.X57 has been set as '2. Not an open-end line of credit'", null						
	End If	
	'======Set Reverse Mortgage HMDA.X56 as '2. Not a reverse mortgage"=====
	If BIZ_HMDAPageObj.WebList("html id:=l_HMDAX56").Exist(2) Then		
		GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=l_HMDAX56"), "2. Not a reverse mortgage"
		FRM_logger_ReportInfoEvent "Reverse Mortgage HMDA.X56","Reverse Mortgage HMDA.X56 has been set as '2. Not a reverse mortgage'", null	
	ElseIf BIZ_HMDAPageObj.WebList("html id:=DropdownBox34").Exist(2) Then		
		GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=DropdownBox34"), "2. Not a reverse mortgage"
		FRM_logger_ReportInfoEvent "Reverse Mortgage HMDA.X56","Reverse Mortgage HMDA.X56 has been set as '2. Not a reverse mortgage'", null							
	End If	
	'====== Get the value of "Loan amount" field HMDA.X31 from "2018 HMDA Originated/Adverse Action Loans" form ====== 
	loanAmt=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox4"),"value")
	loanAmt=Replace(loanAmt,",","")	
	FRM_Logger_ReportStepEvent "Test Step 37","Loan Type HMDA.X31 should be equal to 1109_Loan Amount", Null
	If IsNumeric(loanAmount) And IsNumeric(loanAmt) Then	
		If clng(loanAmount)=clng(loanAmt) Then
			FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X31 Loan Amount "&loanAmt&" matches with 1109_Loan Amount "&loanAmount, Null
		Else
			FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X31 Loan Amount "&loanAmt&" does not matches with 1109_Loan Amount "&loanAmount, Null
		End If
	Else 
		If loanAmount=loanAmt Then
			FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X31 Loan Amount "&loanAmt&" matches with 1109_Loan Amount "&loanAmount, Null
		Else
			FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X31 Loan Amount "&loanAmt&" does not matches with 1109_Loan Amount "&loanAmount, Null
		End If	
	End If	
End If
wait(3)
'====== Select 'Action Taken' as '1. Loan Originated'===== 
If BIZ_HMDAPageObj.WebList("html id:=DropDownBox3").Exist(2) Then
	GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=DropDownBox3"), "1. Loan originated"
	FRM_logger_ReportInfoEvent "1393_ActionTaken","Field 1393_ActionTaken has been set as '1. Loan originated'", null	
	'======Set Open End Line of Credit HMDA.X57 as '1. Open-end line of credit"=====
	If BIZ_HMDAPageObj.WebList("html id:=l_HMDAX57").Exist(2) Then		
		GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=l_HMDAX57"), "1. Open-end line of credit"
		FRM_logger_ReportInfoEvent "Open End Line of Credit HMDA.X57","Open End Line of Credit HMDA.X57 has been set as '1. Open-end line of credit'", null	
	ElseIf BIZ_HMDAPageObj.WebList("html id:=DropdownBox33").Exist(2) Then		
		GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=DropdownBox33"), "1. Open-end line of credit"
		FRM_logger_ReportInfoEvent "Open End Line of Credit HMDA.X57","Open End Line of Credit HMDA.X57 has been set as '1. Open-end line of credit'", null								
	End If	
	
	'Code Changes for JIRA defect CBIZ-16412'
	'***************************************************************************************************
	'Sandhya needds to confirm
	
	'Code Changes for JIRA defect CBIZ-16412'
	'***************************************************************************************************
	wait(3)
	'====== Get the value of "Loan amount" field HMDA.X31 from "2018 HMDA Originated/Adverse Action Loans" form ====== 
	loanAmt=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox4"),"value")
	loanAmt=Replace(loanAmt,",","")	
	FRM_Logger_ReportStepEvent "Test Step 38","Loan Type HMDA.X31 should be equal to CASASRN.X168_HELOC Credit Limit", Null
	If IsNumeric(valHelocCreditLimit) And IsNumeric(loanAmt) Then	
		If clng(valHelocCreditLimit)=clng(loanAmt) Then
			FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X31 Loan Amount "&loanAmt&" matches with CASASRN.X168_HELOC Credit Limit "&valHelocCreditLimit, Null
		Else
			FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X31 Loan Amount "&loanAmt&" does not matches with CASASRN.X168_HELOC Credit Limit "&valHelocCreditLimit, Null
		End If
	Else 
		If valHelocCreditLimit=loanAmt Then
			FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X31 Loan Amount "&loanAmt&" matches with CASASRN.X168_HELOC Credit Limit "&valHelocCreditLimit, Null
		Else
			FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X31 Loan Amount "&loanAmt&" does not matches with CASASRN.X168_HELOC Credit Limit "&valHelocCreditLimit, Null
		End If	
	End If	
End If		
wait(3)
'====== Select 'Action Taken' as '3. Application denied'===== 
If BIZ_HMDAPageObj.WebList("html id:=DropDownBox3").Exist(2) Then
	GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=DropDownBox3"), "3. Application denied"
	FRM_logger_ReportInfoEvent "1393_ActionTaken","Field 1393_ActionTaken has been set as '3. Application denied'", null	
	'======Set Open End Line of Credit HMDA.X57 as blank=====
	If BIZ_HMDAPageObj.WebList("html id:=l_HMDAX57").Exist(2) Then		
		GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=l_HMDAX57"), "#0"
		FRM_logger_ReportInfoEvent "Open End Line of Credit HMDA.X57","Open End Line of Credit HMDA.X57 has been set as blank", null	
	ElseIf BIZ_HMDAPageObj.WebList("html id:=DropdownBox33").Exist(2) Then		
		GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=DropdownBox33"), "#0"
		FRM_logger_ReportInfoEvent "Open End Line of Credit HMDA.X57","Open End Line of Credit HMDA.X57 has been set as blank", null				
	End If	
	'======Set Reverse Mortgage HMDA.X56 as '1. Reverse mortgage"=====
	If BIZ_HMDAPageObj.WebList("html id:=l_HMDAX56").Exist(2) Then		
		GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=l_HMDAX56"), "1. Reverse mortgage"
		FRM_logger_ReportInfoEvent "Reverse Mortgage HMDA.X56","Reverse Mortgage HMDA.X56 has been set as '1. Reverse mortgage'", null	
	ElseIf BIZ_HMDAPageObj.WebList("html id:=DropdownBox34").Exist(2) Then		
		GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=DropdownBox34"), "1. Reverse mortgage"
		FRM_logger_ReportInfoEvent "Reverse Mortgage HMDA.X56","Reverse Mortgage HMDA.X56 has been set as '1. Reverse mortgage'", null				
	End If	
	'====== Get the value of "Loan amount" field HMDA.X31 from "2018 HMDA Originated/Adverse Action Loans" form ====== 
	loanAmt=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox4"),"value")
	loanAmt=Replace(loanAmt,",","")	
	FRM_Logger_ReportStepEvent "Test Step 39","Loan Type HMDA.X31 should be equal to 1109_Loan Amount", Null
	If IsNumeric(loanAmount) And IsNumeric(loanAmt) Then	
		If clng(loanAmount)=clng(loanAmt) Then
			FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X31 Loan Amount "&loanAmt&" matches with 1109_Loan Amount "&loanAmount, Null
		Else
			FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X31 Loan Amount "&loanAmt&" does not matches with 1109_Loan Amount "&loanAmount, Null
		End If
	Else 
		If loanAmount=loanAmt Then
			FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X31 Loan Amount "&loanAmt&" matches with 1109_Loan Amount "&loanAmount, Null
		Else
			FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X31 Loan Amount "&loanAmt&" does not matches with 1109_Loan Amount "&loanAmount, Null
		End If	
	End If	
End If
wait(3)
'====== Select 'Action Taken' as 6.Purchased Loan===== 
If BIZ_HMDAPageObj.WebList("html id:=DropDownBox3").Exist(2) Then
	GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=DropDownBox3"), "6. Purchased loan"
	FRM_logger_ReportInfoEvent "1393_ActionTaken","Field 1393_ActionTaken has been set as '6. Purchased loan'", null
	'======Set Reverse Mortgage HMDA.X56 as blank"=====
	If BIZ_HMDAPageObj.WebList("html id:=l_HMDAX56").Exist(2) Then		
		GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=l_HMDAX56"), "#0"
		FRM_logger_ReportInfoEvent "Reverse Mortgage HMDA.X56","Reverse Mortgage HMDA.X56 has been set as blank", null	
	ElseIf BIZ_HMDAPageObj.WebList("html id:=DropdownBox34").Exist(2) Then		
		GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=DropdownBox34"), "1. Reverse mortgage"
		FRM_logger_ReportInfoEvent "Reverse Mortgage HMDA.X56","Reverse Mortgage HMDA.X56 has been set as blank", null				
	End If	
	'====== Get the value of "Loan amount" field HMDA.X31 from "2018 HMDA Originated/Adverse Action Loans" form ====== 		
	loanAmt=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX31"),"value")
	loanAmt=Replace(loanAmt,",","")	
	FRM_Logger_ReportStepEvent "Test Step 39","Loan Type HMDA.X31 should be equal to 1109_Loan Amount", Null
	If IsNumeric(valAmt) And IsNumeric(loanAmt) Then	
		If clng(valAmt)=clng(loanAmt) Then
			FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X31 Loan Amount "&loanAmt&" matches with 'Subject Loan Unpaid Principal Balance Amt' field ULDD.X1 "&valAmt, Null
		Else
			FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X31 Loan Amount "&loanAmt&" does not matches with 'Subject Loan Unpaid Principal Balance Amt' field ULDD.X1 "&valAmt, Null
		End If
	Else 
		If valAmt=loanAmt Then
			FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X31 Loan Amount "&loanAmt&" matches with 'Subject Loan Unpaid Principal Balance Amt' field ULDD.X1 "&valAmt, Null
		Else
			FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X31 Loan Amount "&loanAmt&" does not matches with 'Subject Loan Unpaid Principal Balance Amt' field ULDD.X1 "&valAmt, Null
		End If	
	End If	
End If

BIZ_Loan_Exit "True"

'====== Logout From Encompass ======
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null) 
