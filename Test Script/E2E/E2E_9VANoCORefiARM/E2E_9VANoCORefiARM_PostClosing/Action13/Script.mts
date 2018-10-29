'@**************************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase : PTAC-2395 Post Closing 2 - Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac
'@ Test Automation JIRA Task: PTAC-2943 E2E_9VANoCORefiARM_PostClosing
'@ TestData: 
'@ Pre-conditions: 
'@ Description: 
'@ TestSteps:
	'1 Under forms click on ULDD/PDD.
	'2 Click on 'Export' button.
	'3 Click 'yes' in the pop up window.
	'4 Click on magnifying lens and select a location where you want to save the file and click 'ok'.
	'5 Click 'ok ' in the pop up window.
	'6 Now click on 'Freddie Mac' tab and repeat process from step 3 to step 6. 
	'7 Now click on 'Ginnie Mae' tab and repeat process from step 3 to step 6.
'@ ExpectedResult:
	'1 ULDD/PDD page will open.
	'2 A pop up will open with the following message" Do you want to save the loan before exporting?".
	'3 Export to Freddie mac' window will open. 
	'4 Freddie file has been saved to' window will open.
	'5 Pop up will close.
	'6 Same results as steps 3 to 6.
	'7 Same results as steps 3 to 6.
	'8 Should be saved and logged out.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2395","Post Closing 2 - Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac", Null

'Freddie Mae' tab and repeat process from step 3 to step 6.
BIZ_ULDDPDD_Export "Fannie Mae"

'Freddie Mae' tab and repeat process from step 3 to step 6.
BIZ_ULDDPDD_Export "Freddie Mac"

'Ginnie Mae' tab 
BIZ_ULDDPDD_Export "Ginnie Mae"