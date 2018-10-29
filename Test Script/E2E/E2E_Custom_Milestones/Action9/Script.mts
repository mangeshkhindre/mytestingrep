'@****************************************************************************************** 
'@ TestSteps:
	'start of TC9
	'1 click on Loan->Manage milestone dates->Change Milestone dates
	'2 verify that the change milestone dates window comes up
	'3 Verify the column headers
	'4 verify that the checkbox for automatic recalculation of dates is checked by default
	'5 Retrieve the milestone dates
	'6 Select the log tab
	'7 verify the milestone dates in the worksheet
	'8 click on Loan->Manage milestone dates->Change Milestone dates
	'9 update the milestone date and verify of it gets updated on the worksheet
	'10 click on Loan->Manage milestone dates->Change Milestone dates
	'11 set the date of the 2nd milestone to previous than the 1st milestone
	'12 verify that the invalid date dialog comes up
	'13 click on Loan->Manage milestone dates->Change Milestone dates
	'14 set OFF the checkbox for automatic date recalculation
	'15 update the milestone date and verify of it gets updated on the worksheet
	'16 click on Loan->Manage milestone dates->Change Milestone dates
	'17 set the date of the 2nd milestone to previous than the 1st milestone
	'18 verify that the invalid date dialog comes up
	'19 set the date of the 2nd milestone later than that of 3rd milestone
	'20 verify that the invalid date dialog comes up
	'
'@****************************************************************************************** 


'******************start of TC9**********************
FRM_Logger_ReportStepEvent "TC9_E2E_CustomMilestones", "Validate the milestone dates", Null

'click on Loan->Manage milestone dates->Change Milestone dates
BIZ_Nav_OpenMenuItem "Loan;Manage Milestone Dates...;Change Milestone Dates..."

'verify that the change milestone dates window comes up
GUI_Object_ValidateExists Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates"), 5, "Change milestone dates window"

'verify the column headers
FRM_VerifyEqual Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").SwfObject("swfname:=gvMilestones").Object.Columns.Item(0).Text, "Milestone", "1st column", "Verify that 1st column is Milestone"
FRM_VerifyEqual Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").SwfObject("swfname:=gvMilestones").Object.Columns.Item(1).Text, "Role", "2nd column", "Verify that 2nd column is Role"
FRM_VerifyEqual Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").SwfObject("swfname:=gvMilestones").Object.Columns.Item(2).Text, "Date", "3rd column", "Verify that 3rd column is Date"

'verify that the checkbox for automatic recalculation of dates is checked by default
GUI_Object_ValidateChecked Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").SwfCheckBox("swfname:=chkManual"), True, "Automatically recalculate date checkbox"

'Retrieve the milestone dates
milestoneCount = Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").SwfObject("swfname:=gvMilestones").Object.Items.Count
ReDim arrMilestones(milestoneCount), arrMilestoneDates(milestoneCount)
For i = 0 To (milestoneCount - 1)
	arrMilestones(i) = Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").SwfObject("swfname:=gvMilestones").Object.Items.Item(i).Text
	arrMilestoneDates(i) = Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").SwfCalendar("swfname:=datepicker:" & i).Object.Text
Next
GUI_SwfButton_Click Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").SwfButton("swfname:=btnCancel")

'select the Log tab
GUI_SwfObject_SelectTab SwfWindow("swfname:=MainForm").SwfObject("swfname:=tabsLog"), "Log"

'verify the milestone dates in the worksheet
For i = 0 To (milestoneCount - 1)
	GUI_List_ClickRow SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLog"), Null, 0, arrMilestones(i), False, False, False, "Single"
	milestoneWorksheetDate = Mid(SwfWindow("swfname:=MainForm").SwfCalendar("swfname:=dtPickerFinish").Object.Text, 1, 10)
	FRM_VerifyEqual milestoneWorksheetDate, arrMilestoneDates(i), "milestone date", "Verify that the milestone dates match"
Next

'click on Loan->Manage milestone dates->Change Milestone dates
BIZ_Nav_OpenMenuItem "Loan;Manage Milestone Dates...;Change Milestone Dates..."

'update the milestone date and verify of it gets updated on the worksheet
milestoneCurrentDate = Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").SwfCalendar("swfname:=datepicker:0").Object.Text
milestoneUpdatedDate = Dateadd("d", -1, cdate(milestoneCurrentDate))
Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").SwfCalendar("swfname:=datepicker:0").setdate(milestoneUpdatedDate)
milestoneName = Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").SwfObject("swfname:=gvMilestones").Object.Items.Item(0).Text
GUI_SwfButton_Click Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").SwfButton("swfname:=btnApply")
GUI_List_ClickRow SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLog"), Null, 0, milestoneName, False, False, False, "Single"
milestoneWorksheetDate = Mid(SwfWindow("swfname:=MainForm").SwfCalendar("swfname:=dtPickerFinish").Object.Text, 1, 10)
FRM_VerifyEqual milestoneWorksheetDate, CStr(Right("0" & DatePart("m",milestoneUpdatedDate), 2) &"/" & Right("0" & DatePart("d",milestoneUpdatedDate),2)&"/"&DatePart("yyyy",milestoneUpdatedDate)), "Updated milestone date", "Verify that the updated milestone date matches with the date in the worksheet"

'click on Loan->Manage milestone dates->Change Milestone dates
BIZ_Nav_OpenMenuItem "Loan;Manage Milestone Dates...;Change Milestone Dates..."

'set the date of the 2nd milestone to previous than the 1st milestone
firstMilestoneDate = Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").SwfCalendar("swfname:=datepicker:0").Object.Text
firstMilestoneUpdatedDate = Dateadd("d", -1, cdate(firstMilestoneDate))
Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").SwfCalendar("swfname:=datepicker:1").setdate(firstMilestoneUpdatedDate)
GUI_SwfButton_Click Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").SwfButton("swfname:=btnApply")

'verify that the invalid date dialog comes up
GUI_Object_ValidateExists Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").Dialog("text:=Encompass").Static("text:=One or more date.*"), 3, "Invalid date dialog"
GUI_WinButton_Click Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").Dialog("text:=Encompass").WinButton("text:=OK")

GUI_SwfButton_Click Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").SwfButton("swfname:=btnCancel")

'click on Loan->Manage milestone dates->Change Milestone dates
BIZ_Nav_OpenMenuItem "Loan;Manage Milestone Dates...;Change Milestone Dates..."

'set the checkbox for automatic recalculation OFF
GUI_SwfCheckBox_Set Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").SwfCheckBox("swfname:=chkManual"), "OFF"

'update the milestone date and verify of it gets updated on the worksheet
milestoneCurrentDate = Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").SwfCalendar("swfname:=datepicker:0").Object.Text
milestoneUpdatedDate = Dateadd("d", 1, cdate(milestoneCurrentDate))
Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").SwfCalendar("swfname:=datepicker:0").setdate(milestoneUpdatedDate)
milestoneName = Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").SwfObject("swfname:=gvMilestones").Object.Items.Item(0).Text
GUI_SwfButton_Click Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").SwfButton("swfname:=btnApply")
GUI_List_ClickRow SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLog"), Null, 0, milestoneName, False, False, False, "Single"
milestoneWorksheetDate = Mid(SwfWindow("swfname:=MainForm").SwfCalendar("swfname:=dtPickerFinish").Object.Text, 1, 10)
FRM_VerifyEqual milestoneWorksheetDate, CStr(Right("0" & DatePart("m",milestoneUpdatedDate), 2) &"/" & Right("0" & DatePart("d",milestoneUpdatedDate),2)&"/"&DatePart("yyyy",milestoneUpdatedDate)), "Updated milestone date", "Verify that the updated milestone date matches with the date in the worksheet"

'click on Loan->Manage milestone dates->Change Milestone dates
BIZ_Nav_OpenMenuItem "Loan;Manage Milestone Dates...;Change Milestone Dates..."
GUI_SwfCheckBox_Set Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").SwfCheckBox("swfname:=chkManual"), "OFF"

'set the date of the 2nd milestone to previous than the 1st milestone
firstMilestoneDate = Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").SwfCalendar("swfname:=datepicker:0").Object.Text
firstMilestoneUpdatedDate = Dateadd("d", -1, cdate(firstMilestoneDate))
Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").SwfCalendar("swfname:=datepicker:1").setdate(firstMilestoneUpdatedDate)
GUI_SwfButton_Click Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").SwfButton("swfname:=btnApply")

'verify that the invalid date dialog comes up
GUI_Object_ValidateExists Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").Dialog("text:=Encompass").Static("text:=One or more date.*"), 3, "Invalid date dialog"
GUI_WinButton_Click Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").Dialog("text:=Encompass").WinButton("text:=OK")

'set the date of the 2nd milestone later than that of 3rd milestone
thirdMilestoneDate = Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").SwfCalendar("swfname:=datepicker:2").Object.Text
thirdMilestoneUpdatedDate = Dateadd("d", 1, cdate(thirdMilestoneDate))
Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").SwfCalendar("swfname:=datepicker:1").setdate(thirdMilestoneUpdatedDate)
GUI_SwfButton_Click Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").SwfButton("swfname:=btnApply")

'verify that the invalid date dialog comes up
GUI_Object_ValidateExists Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").Dialog("text:=Encompass").Static("text:=One or more date.*"), 3, "Invalid date dialog"
GUI_WinButton_Click Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").Dialog("text:=Encompass").WinButton("text:=OK")
GUI_SwfButton_Click Swfwindow("swfname:=MainForm").swfwindow("swfname:=ChangeMilestoneDates").SwfButton("swfname:=btnCancel")

'go to settings->Company/USer setup->Milestones
BIZ_Nav_HierarchyTree "Company/User Setup", "Milestones"
Set objSettingWindow = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")

'go to the tab Milestone Templates
GUI_SwfTab_Click objSettingWindow.SwfTab("swfname:=tabMilestones"), "Milestone Templates"

BIZ_MilestoneTemplate_Delete "CMtemA"
BIZ_MilestoneTemplate_Delete "CMtemB"
BIZ_MilestoneTemplate_Delete "Milestone Template"
BIZ_MilestoneTemplate_Delete "MT_1"&Month(Date) & "_" & Day(Date) & "_" & Year(Date)


