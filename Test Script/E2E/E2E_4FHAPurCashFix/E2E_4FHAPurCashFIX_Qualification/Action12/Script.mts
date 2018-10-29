'@**************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase : PTAC-3081 FHAPURCHASEFIX - Qualification 2 - Fill 2015 Itemization and FHA Management
'@ Test Automation JIRA Task: PTAC-3151 E2E_4FHAPURCASHFIX_Qualification
'@ TestData: 
	'1 Forms_2015Itemization, Set800Section and E2E_FHAPURCASHFIX
	'2 Forms_2015Itemization, Set900Section and E2E_FHAPURCASHFIX
	'3 Forms_2015Itemization, Set1000Section and E2E_FHAPURCASHFIX
	'4 Forms_2015Itemization, Set1100Section and E2E_FHAPURCASHFIX
	'5 Forms_2015Itemization, Set1200Section and E2E_FHAPURCASHFIX
	'6 Forms_FHAManagement, BasicInfo and E2E_FHAPURCASHFIX
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 In forms select 2015 Itemization form
	'2 Enter the values as in test data
	'3 Go to FHA Management screen and fill the data as per test data
	'4 Go to Regz-LE, enter data No. days 
'@ ExpectedResult: 
	'1 2015 Itemization Form should open.
	'2 should be able to input values
	'3 Loan data should be saved.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3081", "FHAPURCHASEFIX - Qualification2-Fill 2015 Itemization and FHA Management", Null

'Open 2015 Itemization form
BIZ_Forms_ShowAll
BIZ_Forms_Open "2015 Itemization"

'Fill required details in sections 800, 900, 1000, 1100, 1200 in Itemization form
BIZ_2015Itemization_Set800Section "E2E_FHAPURCASHFIX"
BIZ_2015Itemization_Set900Section "E2E_FHAPURCASHFIX"
BIZ_2015Itemization_Set1000Section "E2E_FHAPURCASHFIX"
BIZ_2015Itemization_Set1100Section "E2E_FHAPURCASHFIX"
BIZ_2015Itemization_Set1200Section "E2E_FHAPURCASHFIX"

'Set the Disclosure
BIZ_RegZ_LE_SetInterestOnlyInformation "E2E_FHAPURCASHFIX"
BIZ_RegZ_LE_SetConstructionMortgage "E2E_FHAPURCASHFIX"
BIZ_RegZ_LE_SetLateChargeInformation "E2E_FHAPURCASHFIX"
BIZ_FHAManagement_BasicFHAInfonew "E2E_FHAPURCASHFIX"	