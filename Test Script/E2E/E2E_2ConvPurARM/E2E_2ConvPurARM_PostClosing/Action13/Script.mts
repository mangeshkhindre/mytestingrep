'@**************************************************************************************************
'@ TestStory: PTAC-871 - E2E_2CONVPURARM
'@ TestCase:PTAC-1282 - Post Closing 2 - Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac
'@ Test Automation JIRA Task: PTAC-1071 E2E_2CONVPURARM_PostClosing
'@ TestData: NA
'@ Pre-conditions: 
'@ Description: 
'@ TestSteps:
	'Under forms click on ULDD/PDD.
	'Click on 'Export' button.
	'Click 'yes' in the pop up window.
	'Click on magnifying lens and select a location where you want to save the file and click 'ok'.
	'Click 'ok ' in the pop up window.
	'Now click on 'Freddie Mac' tab and repeat process from step 3 to step 6. 
	'Now click on 'Ginnie Mae' tab and repeat process from step 3 to step 6.
	'Save the loan and logout.
'@ ExpectedResult:
	'ULDD/PDD page will open.
	'A pop up will open with the following message" Do you want to save the loan before exporting?".
	''Export to Freddie mac' window will open. 
	''Freddie file has been saved to' window will open.
	'Pop up will close.
	'Same results as steps 3 to 6.
	'Same results as steps 3 to 6.
	'Should be saved and logged out.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1282","Test Case Name - Post Closing 2 - Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac", Null

'Freddie Mae' tab and repeat process from step 3 to step 6.
BIZ_ULDDPDD_Export "Fannie Mae"

'Freddie Mae' tab and repeat process from step 3 to step 6.
BIZ_ULDDPDD_Export "Freddie Mac"

'Ginnie Mae' tab 
BIZ_ULDDPDD_Export "Ginnie Mae"

GUI_Dialog_Encompass_OKX 40, ""
