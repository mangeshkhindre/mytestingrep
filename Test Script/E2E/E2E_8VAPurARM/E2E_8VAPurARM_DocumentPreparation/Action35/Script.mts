'@**************************************************************************************************
'@ TestStory: PTAC-2398 E2E_8VAPURARM
'@ TestCase : PTAC-2245 Doc Preparation 2 - Complete Vesting and closing conditions
'@ Test Automation JIRA Task: PTAC-2402 E2E_8VAPURARM_DocumentPreparation
'@ TestData: 
	'1 Forms_ClosingConditions, SetClosingConditions, E2E_VAPURARM
	'2 Forms_BorrowerInformationVesting, SetVestingInformation, E2E_VAPURARM
	'3 Forms_BorrowerInformationVesting, VerifyBIVesting, E2E_VAPURARM
	'4 Forms_ClosingConditions, AddClosingConditions, E2E_VAPURARM
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
	'5 Add conditions window will open.
	'6 Condition sets window will open.
    '7 The VA-Alive and Well Affidavit and VA-CAIVRS details will get added to the form.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2245","Doc Preparation 2 - Complete Vesting and closing conditions", Null

BIZ_BorrowerInformationVesting_SetVestingInformation "E2E_VAPURARM"
BIZ_BorrowerInformationVesting_ClickBuildFinalVesting()

'BIZ_BorrowerInformationVesting_VerifyFinalVestingToRead "E2E_VAPURARM"
BIZ_Forms_Open "Closing Conditions"

'==== Enter test data in closing conditions form ====
BIZ_ClosingConditions_SetClosingConditionsData "E2E_VAPURARM"

'=== Add closing conditions ====
BIZ_ClosingConditions_AddClosingConditions "E2E_VAPURARM"
