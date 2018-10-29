'@**************************************************************************************************
'@ TestStory: PTAC-3356 Borrower Vesting
'@ TestCase: 
   '1 PTAC-3277 Add additional values to Vesting and Manner which Title will be Held for EDS
'@ Test Automation JIRA Task: PTAC-3699 BorrowerVesting_AdditionalValuesToVestingAndManner_TitleHeldForEDS
'@ TestData:
   '1 Forms_BorrowerInformationVesting, SetVestingInformation, PTAC-3277
'@ Pre-conditions: 
'@ Description: 
   '1 Test case will verify the field value for 33 on Borrower vesting form in manner drop down. 
   '2 And should not be available on 1003 page 1, USDA Management, FNMA Streamlined Page
'@ TestSteps:
   '1 Login to the encompass with Admin user
   '2 create a New Blank Loan, Go to Borrower Information Vesting form, Go to Field 33 and verify the value Spouses married to each other in the drop down value
   '3 Go to 1003 page 1 and verify the drop down values of Manner.
   '4 Go to FNMA streamlined 1003 page and verify the value of manner drop down
   '5 Go to page USDA management and verify the manner drop down value.
'@ ExpectedResult:
   '1 User should be able to login successfully
   '2 A new blank loan is created, 'Spouses married to Each Other' should be available in the drop down.
   '3 Spouses married to each other should not be available.
   '4 Spouses married to each other should not be available.
   '5 Spouses married to each other should not be available.
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3699", "Script Name : BorrowerVesting_AdditionalValuesToVestingAndManner_TitleHeldForEDS", Null

Dim objMainForm, objParentObject, objData, strEstateHeldInVal

strRowID						=	"PTAC-3277"
Set objMainForm					=	SwfWindow("swfname:=MainForm")
Set objParentObject				= 	objMainForm.Page("title:=.*","index:=0")  
Set objData						=	FRM_DS_GetTestData("Forms_BorrowerInformationVesting", "SetVestingInformation", strRowID)
strEstateHeldInVal				=	Trim(FRM_DS_GetValue(objData,"1066_EstHeldIn"))

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3277", "Add additional values to Vesting and Manner which Title will be Held for EDS", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"   

'@ Step 2
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","My Pipeline"
BIZ_Forms_Open "Borrower Information - Vesting"

'@ Validation
If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "33_Manner")) Then
	GUI_SwfComboBox_Select objMainForm.SwfComboBox("swfname:=cboTitle"), Trim(FRM_DS_GetValue(objData,"33_Manner"))
	boolItemVal	=	GUI_SwfComboBox_VerifyItemExists (objMainForm.SwfComboBox("swfname:=cboTitle"), Trim(FRM_DS_GetValue(objData,"33_Manner")))
	FRM_VerifyTrue boolItemVal, "Verify Dropdown Field Value Existence", "'"&FRM_DS_GetValue(objData,"33_Manner")&"' Exists"
End If

'@ Step 3
BIZ_BorrowerVesting_SearchMannerDropDownValNotEqual "Spouses Married to Each Other", strEstateHeldInVal, "1003 PAGE 1"

'@ Step 4
BIZ_BorrowerVesting_SearchMannerDropDownValNotEqual "Spouses Married to Each Other", strEstateHeldInVal, "FNMA STREAMLINED 1003"

'@ Step 5
BIZ_BorrowerVesting_SearchMannerDropDownValNotEqual "Spouses Married to Each Other", strEstateHeldInVal, "USDA MANAGEMENT"
BIZ_Loan_Exit False

Set objMainForm					=	Nothing
Set objParentObject				= 	Nothing
Set objData						=	Nothing

'====== Log out Application ======
BIZ_Nav_SelectHomeTab()
BIZ_Login_UserLogout()

FRM_RT_TearDownTest(Null)
