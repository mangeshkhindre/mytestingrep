'@**************************************************************************************************
'@ TestStory: PTAC-1129 - HAPPYPATH_E2E
'@ TestCase: PTAC-1179 HP Post Closing 2- Add Conditions from Conditions sets
'@ Test Automation JIRA Task: PTAC-1173 E2E_HappyPath_PostClosing
'@ TestData: 
'	"eFolder_Tab,AddConditionsFromSet,E2E_HappyPath"
'	"eFolder_Tab,SetPostClosingConditionsStatus,E2E_HappyPath"
'@ Pre-conditions: NA
'@ Description:  NA
'@ TestSteps:
    '1 Click on E-folder 
	'2 Click on "Post-Closing Conditions" tab
	'3 Click on "New Conditions" Icon
	'4 Click on "Add conditions from Underwriting Conditions" radio button
	'5 Click on Ok
	   'Select "MERS-Mortgagee's Affidavit" and click Add
	   'Select "Recorded Deed of Trust,Mortgage" and click Add
	   'Click "Add" button in the condition sets window
	'6 Select each condition and mark as cleared
	   'Select the checkbox as "Cleared" and close the window
	   'Note: Repeat the process for next condition
	'7 Click on close window
'@ ExpectedResult: 
	'1 E-folder window should open
	'2 The tab should be selected
	'3 Add Conditions Pop-up window should be open
	'4 The option should be selected
	'5 Conditions sets window should open 
	   'The selected one should be added to rightside grid
	   'The selected one should be added to rightside grid
	   'The pop-up window should be closed and conditions should be shown on Post-Closing Conditions tab.
	'6 The Post-Closing Condition Details should open
	   'The window should be closed
	'7 The window should be closed
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1179","TestCase Name - HP Post Closing 2- Add Conditions from Conditions sets", Null

'Click on E-folder 
BIZ_Nav_eFoler_Open()

GUI_SwfTab_Click SwfWindow("swfname:=eFolderDialog").SwfTab("swfname:=tabMain"),"Post-Closing Conditions"

BIZ_PostClosingConditions_AddConditionsFromSet "E2E_HappyPath1"

BIZ_PostClosingConditions_SetAllConditionsStatus "E2E_HappyPath"

BIZ_Nav_eFoler_Close()
