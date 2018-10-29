﻿'@**************************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase : PTAC - 1658 - CONVNOCASHREFIARM Post Closing 2 - Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac
'@ Test Automation JIRA Task: PTAC-1795 E2E_1ConvNoRefiARM_PostClosing
'@ TestData: NA
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
   '8 Save the loan and logout.
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

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1658","CONVNOCASHREFIARM Post Closing 2 - Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac", Null

'Freddie Mae' tab and repeat process from step 3 to step 6.
BIZ_ULDDPDD_Export "Fannie Mae"

'Freddie Mae' tab and repeat process from step 3 to step 6.
BIZ_ULDDPDD_Export "Freddie Mac"

'Ginnie Mae' tab 
BIZ_ULDDPDD_Export "Ginnie Mae"

GUI_Dialog_Encompass_OKX 40, ""