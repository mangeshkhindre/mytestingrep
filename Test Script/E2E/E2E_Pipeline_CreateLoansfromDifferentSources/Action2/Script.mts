'@**************************************************************************************************
'@ TestStory:  PTAC-1753 Create Loans From different Source
'@ TestCase: 
   '1 PTAC-1543 Creating a loan from Encompass with template
'@ Test Automation JIRA Task: PTAC-1832 CreateLoansFromDifferentSources_LoanCreation
'@ TestData: 
	'1 Forms_BorrowerSummaryOrigination,SetBorrower,PTAC-1832_LoanCreation
	'2 Forms_BorrowerSummaryOrigination, SetBorrower, PTAC-1832_LoanDetails
'@ Pre-conditions: 
'@ Description: Creation of New blank loan from a new template created in Loan template Sets
'@ TestSteps:
   '1 Launch Encompass and Login as admin
   '2 Go to Pipeline tab
   '3 Click on the New Loan(+) icon
   '4 Select 'Folder' with 'Public Loan Templates' option and select the 'New  Loan template', then click on 'New Blank Loan' button
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
FRM_Logger_ReportStepEvent "Test Case #1: Create a new loan using Loan Template","Validating create a new loan using Loan Template", Null

Set objData 			= FRM_DS_GetTestData("Forms_BorrowerSummaryOrigination", "SetBorrower", "PTAC_1832_BorrDetails")
'===== Naviagte to Settings,"Data Templates" and Create Data Template========  
BIZ_Nav_Settings_Open "Loan Templates"
BIZ_Nav_HierarchyTree "Loan Templates", "Data Templates"
DataTemplates_CreateNew "CreateNewLoan_Template","PTAC_1832_BorrDetails"
BIZ_Nav_Settings_Close

'====== Navigate to pipeline and create a new loan ======  
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "Automation" 

'===== Append template to new loan ========   
BIZ_Loan_AppendDataTemplate "CreateNewLoan_Template"

'====== Save Loan and get Loan Number=======
BIZ_Loan_Save()
BIZ_Loan_SaveLoanNumber()
strLoanNumber=BIZ_Loan_GetLoanNumber()

'===========Exit Loan======
BIZ_Loan_Exit False

'============== Open existing loan and verify the details=====
FRM_Logger_ReportInfoEvent "Verifying loan details after created loan using Loan Template","Validating loan details after created loan using Loan Template",Null
BIZ_Loan_OpenByLoanNumber strLoanNumber
BIZ_Forms_Open "Borrower Summary - Origination"
Set objBorrower = SwfWindow("swfname:=MainForm").Page("micclass:=Page","index:=0")
GUI_Object_ValidateValue objBorrower.WebEdit("html id:=l_36"), FRM_DS_GetValue(objData,"FirstName") , "First Name"
GUI_Object_ValidateValue objBorrower.WebEdit("html id:=l_37"), FRM_DS_GetValue(objData,"LastName"), "Last Name"
GUI_Object_ValidateValue objBorrower.WebEdit("html id:=l_1240"), FRM_DS_GetValue(objData,"HomeMail"), "Home Email"
Set objData=Nothing

'===========Exit Loan======
BIZ_Loan_Exit False




'This function is used to keep existing datatemplate with provided name and create a new Data Template
'@code
'    BIZ_DataTemplates_CreateNew("Test Template")
'@endcode
'@param strDataTemplateName - The name of new created Data Template
Function DataTemplates_CreateNew(strDataTemplateName,strRowIDBorrower)

	FRM_Logger_ReportInfoEvent "Create a new Data Template", "Create a new data template in Data Templates", null

	Dim boolExist, objDataTemplateList
	Set objDataTemplateList = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=gvDirectory")
	
	GUI_Object_WaitTillVisible SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfLabel("text:=Data Templates")
	
	boolExist = GUI_List_ClickRow(objDataTemplateList, scrollbarDataTemplate, "Name", strDataTemplateName, True, False, False, "Single")	
	If NOT boolExist Then
		'GUI_Object_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=btnDelete"), "SwfObject", "Delete Data Template"
		'GUI_Dialog_Encompass_Yes ""
		GUI_Object_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=btnAdd"), "SwfObject", "Add Data Template"
	    GUI_SwfEdit_Set SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfEdit("micclass:=SwfEdit"), strDataTemplateName
	    GUI_Object_Click objDataTemplateList, "SwfObject", "Data Template List"
	    
	    BIZ_DataTemplates_OpenDataTemplate strDataTemplateName 
   
       '===== Enter basic data in Data Templates Details Window ========  
     	BIZ_DataTemplatesDetails_SetBorrower strRowIDBorrower 	 
     	
     	'===== Save Data Template ========   
     	BIZ_DataTemplatesDetails_Save	
	End If   
	Set objDataTemplateList = nothing	
End Function
