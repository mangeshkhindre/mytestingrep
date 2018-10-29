'@**************************************************************************************************
'@ TestStory:  PTAC-1753 Create Loans From different Source
'@ TestCase: PTAC-1544 Creating a Blank loan from encompass
'@ Test Automation JIRA Task: PTAC-1832 CreateLoansfromDifferentSources_Pipeline_LoanCreation
'@ TestData: 
	'1 Forms_BorrowersummarOrigination,SetBorrower,PTAC-1832_LoanDetails
'@ Pre-conditions: 
'@ Description: Creation of new blank loan without a  loan template
'@ TestSteps: 
   '1 Launch Encompass and Login as admin
   '2 Go to Pipeline tab
   '3 Click on the New Loan(+) icon
   '4 Click on 'New Blank Loan' button
   '5 Enter Firstname, last name, save
   '6 Enter any Email address, and click OK button, verify the Loan number and Application Date
   '7 Search with Loan number in the pipeline and open the Loan then verify
'@ ExpectedResult:
   '1 Admin user should be logged in successfully
   '2 It should navigate to Pipeline tab
   '3 It displays the 'New Loan' pop up window
   '4 It should open the blank loan under Loan tab
   '5 It opens the 'Email Check' popup
   '6 It should create the 'loan number' in the header and  'Application Date' in 'Borrower Summary Origination' section successfully
   '7 It should display the first name, last name with Email ID successfully
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Test Case #2: Create a new loan from Pipeline","Validating create a new loan from Pipeline", Null
'====== Navigate to pipeline and create a new loan ======  
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "Automation" 

BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC_1832_BorrDetails" 

'====== Save Loan and get Loan Number=======
BIZ_Loan_Save()
BIZ_Loan_SaveLoanNumber()
strLoanNumber=BIZ_Loan_GetLoanNumber()

'===========Exit Loan======
BIZ_Loan_Exit False

'============== Open existing loan and verify the details=====
Set objData 			= FRM_DS_GetTestData("Forms_BorrowerSummaryOrigination", "SetBorrower", "PTAC_1832_BorrDetails")
FRM_Logger_ReportInfoEvent "Verifying loan details after created loan from Pipeline","Validating loan details after created loan from Pipeline",Null
BIZ_Loan_OpenByLoanNumber strLoanNumber
BIZ_Forms_Open "Borrower Summary - Origination"
Set objBorrower = SwfWindow("swfname:=MainForm").Page("micclass:=Page","index:=0")
GUI_Object_ValidateValue objBorrower.WebEdit("html id:=l_36"), FRM_DS_GetValue(objData,"FirstName") , "First Name"
GUI_Object_ValidateValue objBorrower.WebEdit("html id:=l_37"), FRM_DS_GetValue(objData,"LastName"), "Last Name"
GUI_Object_ValidateValue objBorrower.WebEdit("html id:=l_1240"), FRM_DS_GetValue(objData,"HomeMail"), "Home Email"
Set objData=Nothing

Parameter("strLoanNumber")=strLoanNumber
'===========Exit Loan======
BIZ_Loan_Exit False
