'@**************************************************************************************************
'@ TestStory: PTAC-1129 E2E_HAPPYPATH
'@ TestCase : PTAC-1101 HP File started 8- Assign Loan officer by Loan Opener & Accept file
'@ Test Automation JIRA Task: PTAC-1130 E2E_HappyPath_FileStarted
'@ TestData: Loans, Milestone, E2E_HappyPath_FileStarted
'@ Pre-conditions: Loan Number should be present
'@ Description:  
'@ TestSteps:
	'1 Click on 'file started' and select 'emilylo' as loan officer.
	'2 Click on log tab and click on Qualification and click on 'Accept File' button.
	'3 Click 'Ok' in the window.
'@ ExpectedResult: 
	'1 The loan officer will be selected
	'2 A pop up window will open with the following message will open"Milestone alert has been cleared".
	'3 The pop-up will be cleared 
'***************************************************************************************************

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-1101","HP File started 8- Assign Loan officer by Loan Opener & Accept file", Null

Dim objData, objProcessorSelectionDialog, objuserAvaliable, objSelectUserScrollBar

Set objData                     = FRM_DS_GetTestData("Loans", "Milestone", "E2E_HappyPath_FileStarted")
Set objProcessorSelectionDialog = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog")
Set objuserAvaliable            = objProcessorSelectionDialog.SwfObject("swfname:=gvUsers")
Set objSelectUserScrollBar      = objProcessorSelectionDialog.SwfScrollBar("swfname:=vPanelScrollBar")

'Click on compliance review alert 
BIZ_AlertsAndLog_ClickOnRecord "Log", "File started"

GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=pictureBoxNextLA")

GUI_List_ClickRow objuserAvaliable, objSelectUserScrollBar, 0, FRM_DS_GetValue(objData, "CurrentUser"), True, False, False, "Single"

GUI_SwfButton_Click objProcessorSelectionDialog.SwfButton("swfname:=okBtn")

BIZ_AlertsAndLog_ClickOnRecord "Log","Qualification"

GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfButton("swfname:=acceptBtn")

Wait g_TinyWaitMedium

GUI_Dialog_Encompass_OKX 10, "The milestone alert has been cleared"

'Appended the current timestamp to the Borrower Last Name 
CurrentTimeStamp = Second(Now) & Minute(Now) & Hour(Now) & Day(Now) & Month(Now)
Set objData = FRM_DS_GetTestData("Forms_BorrowerSummaryOrigination", "SetBorrower", "E2E_HappyPath")
FRM_DS_ChangeExcelReadonlyToReadandWrite "Forms_BorrowerSummaryOrigination"
strBorrowerLastName =  FRM_DS_GetValue(objData, "LastName")
strLastNames = Split(strBorrowerLastName, "E2E")
FRM_DS_SetCellData "Forms_BorrowerSummaryOrigination", "SetBorrower", "E2E_HappyPath", "LastName", strLastNames(0) & "E2E" & CurrentTimeStamp
FRM_DS_ChangeExcelReadandWriteToReadonly  "Forms_BorrowerSummaryOrigination"

Set objData                     = Nothing
Set objProcessorSelectionDialog = Nothing
Set objuserAvaliable            = Nothing
Set objSelectUserScrollBar      = Nothing
