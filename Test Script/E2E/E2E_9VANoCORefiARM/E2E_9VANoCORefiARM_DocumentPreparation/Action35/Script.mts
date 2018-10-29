'@******************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM 
'@ TestCase : PTAC-2367 Doc Preparation 2 - Complete Vesting and closing conditions
'@ Test Automation JIRA Task: PTAC-2930 E2E_9VANoCORefiARM_DocumentPreparation
'@ TestData: 
	'1 Forms_ClosingConditions, SetClosingConditions, E2E_VANoCORefiARM
	'2 Forms_BorrowerInformationVesting, SetVestingInformation, E2E_VANoCORefiARM
	'3 Forms_BorrowerInformationVesting, VerifyBIVesting, E2E_VANoCORefiARM
	'4 Forms_ClosingConditions, AddClosingConditions, E2E_VANoCORefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click forms and click 'show all' check box.select Borrower information- Vesting.
	'2 Manner in which Title will be held- select husband and wife from dropdown. Click build final vesting button.
	'3 Click forms and click closing conditons.
	'4 Enter the data as per test data column.
	'5 Click closing condition list icon.
	'6 Select add conditions from condition sets and click ok.
	'7 Select VA-Alive and Well Affidavit' and click add.
	  'Select 'VA-CAIVRS' and click add
'@ ExpectedResult: 
	'1 Borrower information vesting will open.
	'2 Final vesting to build will populate John Homeowner and Mary Homeowner husband and wife.
	'3 Closing conditions window will open.
    '4 Should be able to enter data.
	'4 Add conditions window will open.
	'5 Condition sets window will open.
    '6 The VA-Alive and Well Affidavit and VA-CAIVRS details will get added to the form.
'********************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2367","Doc Preparation 2 - Complete Vesting and closing conditions", Null

BIZ_BorrowerInformationVesting_SetVestingInformation "E2E_VANoCORefiARM"
BIZ_BorrowerInformationVesting_ClickBuildFinalVesting()
BIZ_Forms_Open "Closing Conditions"

'==== Enter test data in closing conditions form ====
BIZ_ClosingConditions_SetClosingConditionsData "E2E_VANoCORefiARM"

'=== Add closing conditions ====
BIZ_ClosingConditions_AddClosingConditions "E2E_VANoCORefiARM"
