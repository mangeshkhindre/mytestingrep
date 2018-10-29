'@**************************************************************************************************
'@ TestStory: PTAC-1352 Construction Management
'@ TestCase:
   '1 PTAC-1367 TC#4-CBIZ4709- Should not able to change the purpose of loan from 'Construction perm Disclosed separately' to 'Construction ' afterLE and CD disclosed
'@ Test Automation JIRA Task: PTAC-1738 ConstructionManagement_ConstrPermToConstr_LEandCDDisclosed
'@ TestData: 
	'1 Forms_LoanEstimatePage, OthersConsiderations, 1352_LEandCD_AfterDisclose
	'2 Forms_RegZ_CD,SetConstruction, 1352_LEandCD_AfterDisclose
	'3 Forms_2015Itemization, Set900Section, 1352_LEandCD_AfterDisclose
	'4 ConstructionManagement,SetLoanInfo, 1352_LEandCD_AfterDisclose
	'5 Forms_BorrowerSummaryOrigination,SetTransactionDetails,1352_LEandCD_AfterDisclose
	'6 Forms_BorrowerSummaryOrigination,SetTransactionDetails,1352_LEandCD_AfterDisclose_1
	'7 ConstructionManagement,SetLoanInfo, 1352_LEandCD_AfterDisclose
'@ Description: Verify the Linked Loan after LE and CD disclosure_1
'@ Pre-conditions:
'@ TestSteps:
    '1 Log into Encompass as Admin/password
    '2 Navigate to Pipeline tab > Click on New Loan icon (right corner)
    '3 Click on New Bank Loan button
	'4 Enter the data mentioned in Test Data column, save.
	'5 Click on the 'Linked loan' >'New perm' link>select a template with 'Const-to-Perm Sync' and click on 'Select' button
	'6 Click on 'Yes' option
	'7 Click on the 'folder icon' next to '1st Loan #', and click on 'Go to Linked Loan', Verify
	'8 Click on Yes option, 
	'9 Click on Close button, and verify
	'10 Enter the test data mentioned in test data column,save
	'11 Click on the 'folder icon' next to '1st Loan #', and click on 'Go to Linked Loan', Verify
	'12 Click on Yes option, 
	'13 Click on efolder,and then econsent, select the 'Borrower' checkbox and click on 'Send' button
	'14 .Sign-in to loan center with the following credentials
  	'15 Click on the loan from the grid.
	'16 Click view in the electronic signature consent for loan documents.
	'17 Click I Agree in the e-consent.
	'18 Click done button.
	'19 Click on + Add a Disclosure Record, and choose the 'Disclosure Checkbox with LE option, and click on OK button
	'20 Click on + Add a Disclosure Record, and choose the 'Disclosure Checkbox with CD option, and click on OK button
	'21 Go to Forms> Construction Management >  Loans tab
	'22 click on the Construction(19) field, verify the message
	'23 Click on 'ok'
'@ ExpectedResult:
   '1 Admin should be able to login successfully
   '2 New Loan pop up displayed
   '3 It navigates to Loan tab
   '4 The Loan is created 
   '5 It will show the pop up message 'Do you want to Synchronize data between two loans" Yes/No
   '6 sync data displayed in the Perm Loan column.
   '7 It opens a pop up 'Do you want to save the changes to the Current Loan? Yes/No/Cancel
   '8 It opens the pop up window
   '9 It display the 2nd loan details
   '10 The data should be saved
   '11 It opens a pop up 'Do you want to save the changes to the Current Loan? Yes/No/Cancel
   '12 It display the 2nd loan details
   '13 E-consent should be sent to 
   '14 It should1367 navigate to Loan Center Home page (Check Loan Status page)
   '15 It navigates to Loan Details page with "My task" and "Loan Status" tabs
   '16 Agree to receive disclosures electronically should be shown.
   '17 In encompass loan center the Following message will be displayed- "" Thank you for reviewing the electronic consent agreement. you will receive documents for this loan electronically.
   '18 Will go back to loan center and 'consent accepted' with a check mark next to it can be seen under electronic signature consent for loan documents."
   '19 It opens the 'Choose the LE Date issue' pop up with option selected as 'Use Current date (1/10/2017)(Recommended)', record added with LE option as 'Yes' and also,'LE sent', 'LE received' dates are populated
   '20 It opens the 'Choose the CD Date issue' pop up with option selected as 'Use Current date (1/10/2017)(Recommended)',record added with CD option as 'Yes' and also,'CD Sent','CD Received' dates are populated.
   '21 It opens the  Loans tab screen
   '22 The following message should be displayed.You cannot change the loan purpose for linked loan files in a construction-to-permanent transaction after disclosures have been ordered.”"OK"
   '23 The link should not be removed.
'***************************************************************************************************
FRM_RT_SetupTest(Null)

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

'====== Go to PipeLine, Add New Loan =====
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","My Pipeline"

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1288","TC#2-CBIZ4709- Change the loan purpose from 'Construction perm Disclosed separately' to 'Construction' before LE and CD disclosed.", Null 

'Set input for loan creation in Construction Page
BIZ_Forms_Open "Construction Management"
BIZ_ConstructionManagement_SetBasicInfoDetails "1352_Constr_Disclosed"
BIZ_ConstructionManagement_SetLoanInfoDetails "1352_Constr_Disclosed"
BIZ_Loan_Save()

'Validate Construction and Perm after Disclosure
ConstructionManagement_ConstructionPermDisclosed_LinkedLoanValidate "1352_Constr_Disclosed" 


FRM_Logger_ReportInfoEvent "Start Test Case- PTAC-1738", "ConstructionManagement_ConstrPermToConstr_LEandCDDisclosed", Null

BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "",""

FRM_Logger_ReportStepEvent "Start Test Case- PTAC-1367", "TC#4-CBIZ4709- Should not able to change the purpose of loan from 'Construction perm Disclosed separately' to 'Construction ' afterLE and CD disclosed", Null

Dim objPage,objData,val,intTabCount

'====== Linked Loan Creation one ======
ConstructionManagement_AfterLEandCDDisclosure_CreateLoan "1352_LEandCD_AfterDisclose","1352_LEandCD_AfterDisclose",True

'====== Linked Loan Creation two ======
strBorrowerName = ConstructionManagement_AfterLEandCDDisclosure_CreateLoan("1352_LEandCD_AfterDisclose","1352_LEandCD_AfterDisclose_1",False)

'====== Click on eFolder and navigate to eConsent button ======
BIZ_Nav_eFoler_Open()

'====== Send eConsent ======
BIZ_Documents_SendeConsent True,False

'====== Close eFolder window ======
BIZ_Nav_eFoler_Close
	
'====== Login to Loan Center ======
BIZ_LoanCenter_LogIn "2145_BorrowerEsign"

'====== Accept eConsent  and send LE and CD disclosure ======
ConstructionManagement_LoanCenter_AccepteConsent_SendLEandCDDisclosure "1352_LEandCD_AfterDisclose", "Borrower",strBorrowerName 

BIZ_Forms_Open "Construction Management"

Set objPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
Set objData = FRM_DS_GetTestData("ConstructionManagement", "SetLoanInfo", "1352_LEandCD_AfterDisclose")

val=FRM_DS_GetValue(objData ,"19_LoanPurpose")
intTabCount = SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControlForm").GetItemsCount

FRM_VerifyNotNull intTabCount,"Verify Loans tabs screen","Loan tabs screen displayed"
GUI_WebCheckBox_Click objPage.WebCheckBox("html id:=__cid_CheckBox.*_Ctrl","value:="&val)
GUI_Dialog_Encompass_OK FRM_DS_GetValue(objData ,"EncompassTxt(d)")

FRM_VerifyEqual Cint(intTabCount),Cint(FRM_DS_GetValue(objData ,"TabCount"))," The Link","The Link not removed"

'====== Logout from Encomapass ======
BIZ_Login_UserLogout()
FRM_RT_TeardownTest(Null)


