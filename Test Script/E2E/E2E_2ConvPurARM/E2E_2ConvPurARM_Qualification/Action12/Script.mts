'@**************************************************************************************************
'@ TestStory: PTAC-871 E2E_2CONVPURARM
'@ TestCase:  PTAC-319 Qualification 2-Fill 2015 Itemization
'@ Test Automation JIRA Task: PTAC-992 E2E_2CONVPURARM_Qualification
'@ TestData: 
	'1 Forms_2015Itemization, Set800Section, E2E_CONVPURARM
	'2 Forms_2015Itemization, Set900Section, E2E_CONVPURARM
	'3 Forms_2015Itemization, Set1000Section, E2E_CONVPURARM
	'4 Forms_2015Itemization, Set1100Section, E2E_CONVPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 In forms select 2015 Itemization form
	'2 Enter the values as in test data
'@ ExpectedResult: 
	'1 Form should open
	'2 should be able to input values
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-319", "Qualification 2-Fill 2015 Itemization", Null

'Open 2015 Itemization form
BIZ_Forms_ShowAll
BIZ_Forms_Open "2015 Itemization"

'Fill required details in sections 800, 900, 1000, 1100 in Itemization form
BIZ_2015Itemization_Set800Section "E2E_CONVPURARM"
BIZ_2015Itemization_Set900Section "E2E_CONVPURARM"
BIZ_2015Itemization_Set1000Section "E2E_CONVPURARM"
BIZ_2015Itemization_Set1100Section "E2E_CONVPURARM"

'Set the Disclosure
BIZ_RegZ_LE_SetDisclosureInformation "E2E_CONVPURARM"