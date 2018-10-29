'@**************************************************************************************************
'@ TestStory: PTAC-1129 HAPPYPATH_E2E 
'@ TestCase:  PTAC-1139 - HP Conditional Approval 3-Complete VOE & VOR Verifications 
'@ Test Automation JIRA Task: PTAC - 1144  E2E_HappyPath_ConditionalApproval
'@ TestData: None
'@ Pre-conditions: Loan Number that finished the Submittal milestone is in E2E Property file
'@ Description:  Order title and closing and finish milestone
'@ TestSteps:
    '1 Click on 'Forms' tab, and select 'VOE'.
	'2 Check for already created VOE record in Borrower Summary Origination page.
	'3 Verify the VOE record level details.
    '4 Enter the values in 'Employment' and 'Gross Monthly Income' sections as per test data.
    '5 Click on 'Forms' tab, and select 'VOR'.
	'6 Check for already created VOR record in Borrower Summary Origination page.
	'7 Verify the VOR record level details.
	'8 Enter the values for To (Name and Address of Landlord) section
'@ ExpectedResult: 
	'1 The record level details should be populated as same as Borrower Summary Origination page.
	'2 Data is entered and total should be calculated.
	'3 The record level (Present Address) details should be populated as same as Borrower Summary Origination page.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1139","TestCase Name - HP Conditional Approval 3-Complete VOE & VOR Verifications ", Null

Dim objVOEDetailsList, intNumberofRows, objVORDetailsList
Set objVOEDetailsList = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridList")
Set objVORDetailsList = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridList")

'Open the VOE Form
BIZ_Forms_Open "VOE"	

intNumberofRows = GUI_List_GetNumberofRows(objVOEDetailsList)

If (intNumberofRows > 0) Then 
	FRM_Logger_ReportPassEvent "Check for created VOE record in Borrower Summary Origination", "VOE Details are populated", null	
End If

BIZ_VOE_SetVOEData "E2E_HappyPath"

'Open the VOR Form
BIZ_Forms_Open "VOR"
intNumberofRows = GUI_List_GetNumberofRows(objVORDetailsList)

If (intNumberofRows > 0) Then 
	FRM_Logger_ReportPassEvent "Check for created VOR record in Borrower Summary Origination", "VOR Details are populated", null	
End If

Set objVORDetailsList = Nothing
Set objVOEDetailsList = Nothing
