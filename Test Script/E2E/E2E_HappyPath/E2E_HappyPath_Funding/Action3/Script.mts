'@**************************************************************************************************
'@ TestStory: PTAC-1129  HAPPYPATH_E2E
'@ TestCase: PTAC-1170 HP Funding 2- Complete Funding Work sheet
'@ Test Automation JIRA Task: PTAC-1176 E2E_HappyPath_Funding
'@ TestData: 
	'1 Tools_FundingWorkSheet,SetFundingClosing,1129_FundingWorksheet
	'2 Tools_FundingWorkSheet,SetFundingSource,1129_FundingWorksheet
	'3 Tools_FundingWorkSheet,SetWireInformation,1129_FundingWorksheet
'@ Pre-conditions: 
'@ Description: 
'@ TestSteps:
	'1 Click on Tools > Funding Worksheet
	'2 Complete Funding,Closing, Funding Source,Warehouse Bank, Wire Information section as per test data.
	'3 Select all checkboxes at the end of Funding Worksheet
'@ ExpectedResult: 
	'1 Funding worksheet should open.
	'2 Data should be displayed
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1170","HP Funding 2- Complete Funding Work sheet", Null

BIZ_Tools_Open "Funding Worksheet"

'Verify Funding Worksheet opened
GUI_Object_ValidateVisible SwfWindow("swfname:=MainForm").SwfLabel("swfname:=titleLbl","text:=Funding Worksheet")_
,True,"Funding Worksheet"

'Set test data in Funding Worksheet
BIZ_FundingWorksheet_SetFundingClosing "1129_FundingWorksheet"

BIZ_FundingWorksheet_SetFundingSource "1129_FundingWorksheet"

BIZ_FundingWorksheet_SetWireInformation "1129_FundingWorksheet"

'Select all checkboxes at the end of Funding Worksheet
BIZ_FundingWorksheet_CheckFeeLines()
