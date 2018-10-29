'@**************************************************************************************************
'@ TestStory: PTAC - 1129 HAPPYPATH_E2E
'@ TestCase:  PTAC-1138 HP Conditional Approval 2-Complete VOD Verifications
'@ Test Automation JIRA Task: PTAC - 1144 - E2E_HappyPath_ConditionalApproval
'@ TestData: None
'@ Pre-conditions: Loan Number that finished the Submittal milestone is in E2E Property file
'@ Description: Order title and closing and finish milestone 
'@ TestSteps:
	'1 Click on 'Forms' tab, and select 'VOD'.
	'2 Check for already created VOD record in 1003 Page 2.
	'3 Verify the VOD record level details.
	   'Note: If data is not populated completely user need to enter.
	   'Note: Login credentials will auto-populate, if not use the provided credentials
'@ ExpectedResult:  
    'The record level details should be populated as same as 1003 page 2.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1138","TestCase Name - HP Conditional Approval 2-Complete VOD Verifications", Null

Dim intNumberofRows, objVODDetailsList
Set objVODDetailsList = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridList")

'Open VOD form
BIZ_Forms_Open "VOD"
intNumberofRows = GUI_List_GetNumberofRows(objVODDetailsList)

If (intNumberofRows > 0) Then 
	FRM_Logger_ReportPassEvent "Assign Loan Officer To Loan", "Loan is created with the Template " &FRM_DS_GetValue(objData, "LoanTemplate"), Null	
End If

Set objVODDetailsList = Nothing
