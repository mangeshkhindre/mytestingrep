﻿'@**************************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase : PTAC-1409 CONVNOCASHREFIARM - Doc Preparation 2 - Complete Vesting and closing conditions
'@ Test Automation JIRA Task: PTAC-1836 E2E_1ConvNoRefiARM_DocumentPreparation
'@ TestData: 
    '1 Forms_ClosingConditions, SetClosingConditions and E2E_ConvNoRefiARM
	'2 Forms_ClosingConditions, AddClosingConditions and E2E_ConvNoRefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
    '1 Click forms and click show all check box.select Borrower information- Vesting
    '2 Manner in which Title will be held- select husband and wife from dropdown. Click build final vesting button
    '3 Click forms and click closing conditons
    '4 Enter the data as per test data column
    '5 Click closing condition list icon
    '6 Select add conditions from condition sets and click ok
    '7 Select Appraisal copy delivered to borrower and click add.Select Income- child support and click add
'@ ExpectedResult: 
    '1 Borrower information vesting will open
    '2 Final vesting to build will populate John Homeowner and Mary Homeowner husband and wife
    '3 Closing conditions window will open
    '4 Should be able to enter data.
    '5 Add conditions window will open
    '6 Condition sets window will open
    '7 The Appraisal copy delivered to borrower and Income-child support added to the form
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1409","CONVNOCASHREFIARM - Doc Preparation 2 - Complete Vesting and closing conditions", Null

BIZ_BorrowerInformationVesting_SetVestingInformation "E2E_ConvNoRefiARM"
BIZ_BorrowerInformationVesting_ClickBuildFinalVesting()

BIZ_Forms_Open "Closing Conditions"

'==== Enter test data in closing conditions form ====
BIZ_ClosingConditions_SetClosingConditionsData "E2E_ConvNoRefiARM"

'=== Add closing conditions ====
BIZ_ClosingConditions_AddClosingConditions "E2E_ConvNoRefiARM"
