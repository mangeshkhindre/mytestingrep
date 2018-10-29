'@**************************************************************************************************
'@ TestStory: PTAC-871- E2E_2CONVPURARM
'@ TestCase: PTAC-904 Doc Preparation 2 - Complete Vesting and closing conditions
'@ Test Automation JIRA Task: PTAC-1021 E2E_2CONVPURARM_DocumentPreparation
'@ TestData: 
	'1 FRM_DS_GetTestData, Forms_ClosingConditions, SetClosingConditions, E2E_CONVPURARM
	'2 Forms_BorrowerInformationVesting, SetVestingInformation, E2E_CONVPURARM
	'3 Forms_BorrowerInformationVesting, VerifyBIVesting, E2E_CONVPURARM
	'4 Forms_ClosingConditions, AddClosingConditions, E2E_CONVPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click forms and click 'show all' check box.select Borrower information- Vesting.
	'2 Manner in which Title will be held- select husband and wife from dropdown. Click build final vesting button.
	'3 Click forms and click closing conditons.
	'4 Enter the data as per test data column.
	'5 Click closing condition list icon.
	'6 Select add conditions from condition sets and click ok.
	'7 Select "copy of appraisal to borrower" and click add. Select 'zip code look up' and click add
'@ ExpectedResult: 
	'1 Borrower information vesting will open.
	'2 Final vesting to build will populate John Homeowner and Mary Homeowner husband and wife.
	'3 Closing conditions window will open.
	'4 Add conditions window will open.
	'5 Condition sets window will open.
	'6 The copy of appraisal details and zip code look up details will get added to the form.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-904","Test Case Name: Doc Preparation 2 - Complete Vesting and closing conditions", Null

BIZ_BorrowerInformationVesting_SetVestingInformation "E2E_CONVPURARM"
BIZ_BorrowerInformationVesting_ClickBuildFinalVesting()
BIZ_Forms_Open "Closing Conditions"

'==== Enter test data in closing conditions form ====
BIZ_ClosingConditions_SetClosingConditionsData "E2E_CONVPURARM"

'=== Add closing conditions ====
BIZ_ClosingConditions_AddClosingConditions "E2E_CONVPURARM"