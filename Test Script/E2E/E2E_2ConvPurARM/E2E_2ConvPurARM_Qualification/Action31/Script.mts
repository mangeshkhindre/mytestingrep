'@******************************************************************************************
'@ TestStory: PTAC-871 E2E_2CONVPURARM
'@ TestCase : PTAC-320 Qualification 4 - Order Automated underwriting/Import conditions
'@ Test Automation JIRA Task: PTAC-992 E2E_2CONVPURARM_Qualification
'@ TestData: Services, Underwriting, E2E_CONVPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'01 Click on services and click Request Underwriting
	'02 Select Fanniemae DU on Epass and click 'submit' button 
	'03 Click on "update DU Settings" 
	'04 Fill in the username and password if not populated by default.click ok 
	'05 Click on "submit DU" 
	'06 Click edit credit reference info 
	'07 Select test credit agency(200) and click ok 
	'08 Click submit
	'09 Click continue '(Note: Please make sure that DU direct settings file is in the right path  For this)
	'10 Open remove UAC exe file 
	'11 click on "Open Encompass Data Folder" button 
	'12 Click on settings 
	'13 Click on e-pass 
	'14 Make sure that DUdirect settings file is here  If it is not you have to place it here 
	'15 click import conditions button in the Du underwriting page 
	'16 Select a condition from the list and click import 
	'17 Go to e-folder and click preliminary conditions 
	'18 Click add 
	'19 Select add conditions from DU findings radio button and click ok 
'@ ExpectedResult: 
	'01 Underwriting window popup should open
	'02 Service view tab should open 
	'03 Update DU via elliemae network window should open 
	'04 DU window will close 
	'05 DU via Elliemae network window opens 
	'06 Edit credit reference information will open 
	'07 Goes back to DU via Elliemae network and acct number and password will populate 
	'08 Incomplete loan application window will open if there are any incomplete fields 
	'09 In services view tab DU finding underwriting will be generated with recommendation : approve/eligible 
	'10 A list of conditions will be shown 
	'11 Condition will be imported 
	'12 E-folder will open 
	'13 Add condition pop up window will open 
	'14 Condition will be added 
'********************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-320", "Qualification 4 - Order Automated underwriting/Import conditions", null

BIZ_Service_UnderwritingImportConditions "E2E_CONVPURARM"

'Navigate to eFolder
BIZ_Nav_SelectLoanTab()

BIZ_PreliminaryConditions_AddDUFindings()
