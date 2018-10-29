'@**************************************************************************************************
'@ TestStory: PTAC-3134 VA
'@ TestCase:
   '1 PTAC-2902 VA/FHA Seller Contribution U.I. Updates & Triggers
'@ Test Automation JIRA Task: PTAC-3134 VA_SellerContribution_UpdatesandTriggers
'@ TestData: 
   '1 Forms_BorrowerSummaryOrigination,SetProperty,3134_VA_SellerContribution
   '2 Forms_1003Page1,1003Page1,3134_VA_SellerContribution
   '3 Forms_FHAManagement,BasicInfo,3134_VA_SellerContribution
   '4 Forms_FHAManagement,VerifyFHADetails,3134_VA_SellerContribution
   '5 Forms_1003Page1,SetData,3134_VA_SellerContribution_01
'@ Pre-conditions: 
'@ Description: VA/FHA Seller Contribution U.I. Updates & Triggers
'@ TestSteps:
   '1 Log into Encompass as Admin and enter a new blank loan according to 'Test Data' column
   '2 Click on FHA Management > Prequalification tab > Seller Contribution section and confirm the expected results
   '3 Click on VA Management > Qualification tab > Seller Contribution section and confirm the expected results
   '4 Change F135 (Total Seller Paid CC) according to 'Test Data' column
   '5 Change F356 (Appraised Value) according to 'Test Data' column
   '6 Change F136 (Purchase Price) according to 'Test Data' column
   '7 Change F1172 (Loan Type) according to 'Test Data' column
   '8 Click on FHA Management > prequalification tab > Seller Contribution section and confirm the expected results
   '9 Change F135 (Total Seller Paid CC) according to 'Test Data' column
   '10 Change F136 (Purchase Price) according to 'Test Data' column Change F135 (Total Seller Paid CC) according to 'Test Data' column
   '11 Change F356 (Appraised Value) according to 'Test Data' column
   '12 Click on VA Management > Qualification tab > Seller Contribution section and confirm the expected results
'@ ExpectedResult:
   '1 New loan is created
   '2 Validate the following:
	   'First Row text continues to display '6% of Purchase Price'
	   'F1116 calculated value is $6,000 (6% * Purchase Price)
   '3 Validate the following:
	   'First row displays text as 'Maximum Seller Contribution (4%)'
	   'First row field (formerly F1116) is replaced with F4180
	   'Maximum Seller Contribution (4%)' calculated value is $4,800 (4% * Appraised Value)
	   'F3053 (Excess Contribution) = $1 
   '4 Validate F3053 (Excess Contribution) = null
   '5 Validate the following:
	   'VA Maximum Seller Contribution' calculated value is $4,400 (4% * Appraised Value)
	   'F3053 (Excess Contribution) = $400
  '6 Validate the following remained unchanged:
       'VA Maximum Seller Contribution' calculated value is $4,400 (4% * Appraised Value)
	   'F3053 (Excess Contribution) = $400
  '7 Loan is changed to FHA
  '8 Validate the following:
	   'First row continues to display '6% of Purchase Price' 
	   'F1116 calculated value is $5,400 (6% * Purchase Price)
	   'F3053 (Excess Contribution) = null
 '9 Validate F3053 (Excess Contribution) = $1
 '10 Validate the following:
	  'F1116 calculated value = $4800
	  'F3053 (Excess Contribution) = null
 '11 Validate the following remained unchanged:
	  'F1116 calculated value = $4800
      'F3053 (Excess Contribution) = null
 '12 Validate the following:
	 'First row continues to display text as 'Maximum Seller Contribution (4%)'
	 'First row field (formerly F1116) is replaced with F4180
	 'Maximum Seller Contribution (4%)' calculated value is $4,200 (4% * Appraised Value)
	 'F3053 (Excess Contribution) = Null Note: Calculation is based on FHA field F1116, not the VA F4180
'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Start Test Case-PTAC-3134","VA_SellerContribution_UpdatesandTriggers", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

FRM_Logger_ReportStepEvent "Start Test PTAC-2902","VA/FHA Seller Contribution U.I. Updates & Triggers", Null

'====== Go to Pipeline>>NewLoanButton>>Forms ======
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","My Pipeline"
BIZ_Forms_Open "Borrower Summary - Origination"

'====== Set Basic Borrower info in borrower section ======
BIZ_BorrowerSummaryOrigination_SetProperty "3134_VA_SellerContribution"

BIZ_Forms_Open "1003 Page 1"
BIZ_1003Page1_SetData "3134_VA_SellerContribution"

Set objData 	= FRM_DS_GetTestData("Forms_FHAManagement", "BasicInfo", "3134_VA_SellerContribution")
Set objDataFHA  = FRM_DS_GetTestData("Forms_FHAManagement", "VerifyFHADetails", "3134_VA_SellerContribution")
Set objPage 	= SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")

BIZ_Forms_Open "FHA Management"
GUI_SwfTab_Click SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControlForm"), "Prequalification"
GUI_WebEdit_Set objPage.WebEdit("html id:=l_135"),FRM_DS_GetValue(objData,"135_TotalSellerpaid")
GUI_Object_ValidateProperty objPage.WebElement("html id:=Label105"),"innertext",FRM_DS_GetValue(objDataFHA,"1116_SellerContriTxt"),"First Row text continues to display "&FRM_DS_GetValue(objDataFHA,"1116_SellerContriTxt")&" under Seller Contribution"
GUI_Object_ValidateValue objPage.WebEdit("html id:=l_1116"),FRM_DS_GetValue(objDataFHA,"1116_MaxSellerContri_VA"),"F1116 calculated value is" &FRM_DS_GetValue(objDataFHA,"1116_MaxSellerContri")  

VA_FHA_Qualification_PreQualification_Validatedata "3134_VA_SellerContribution","VA Management","Qualification"

BIZ_Forms_Open "1003 Page 1"
BIZ_1003Page1_SetData "3134_VA_SellerContribution_01"
VA_FHA_Qualification_PreQualification_Validatedata "3134_FHA_SellerContribution","FHA Management", "Prequalification"

Set objData = FRM_DS_GetTestData("Forms_FHAManagement", "VerifyFHADetails", "3134_VA_SellerContribution1")

BIZ_Forms_Open "VA Management"
GUI_SwfTab_Click SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControlForm"), "Qualification"
GUI_Object_ValidateProperty objPage.WebElement("html id:=Label105"),"innertext",FRM_DS_GetValue(objData,"1116_SellerContriTxt"),"First row displays text as 'Maximum Seller Contribution (4%)'"
GUI_Object_ValidateProperty objPage.WebEdit("html id:=l_4180"),"title",FRM_DS_GetValue(objData,"1116_Label"),"First row field (formerly F1116) is replaced with F4180"
GUI_Object_ValidateValue objPage.WebEdit("html id:=l_4180"),FRM_DS_GetValue(objData,"1116_MaxSellerContri"),"F4180 calculated value is " &FRM_DS_GetValue(objData,"1116_MaxSellerContri") 
GUI_Object_ValidateValue objPage.WebEdit("html id:=TextBox81"),FRM_DS_GetValue(objData,"3053_ExcessContri"),"Validate F3053 (Excess Contribution) is Null"

Set objData    = Nothing
Set objDataFHA = Nothing
Set objPage    = Nothing

BIZ_Loan_Exit False
BIZ_Nav_SelectHomeTab()
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)
