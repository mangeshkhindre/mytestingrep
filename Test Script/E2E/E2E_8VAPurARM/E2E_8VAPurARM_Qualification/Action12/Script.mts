'@**************************************************************************************************
'@ TestStory: PTAC-2398 E2E_8VAPURARM
'@ TestCase : PTAC-2158 Qualification 2-Fill 2015 Itemization
'@ Test Automation JIRA Task: PTAC-2409 E2E_8VAPURARM_Qualification 
'@ TestData: 
	'1 Forms_2015Itemization, Set900Section and E2E_VAPURARM
	'2 Forms_2015Itemization, Set1000Section and E2E_VAPURARM
	'3 Forms_2015Itemization, Set1100Section and E2E_VAPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 In forms select 2015 Itemization form
	'2 Enter the values as in test data
'@ ExpectedResult: 
	'1 2015 Itemization Form should open.
	'2 should be able to input values.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2158", "Qualification 2-Fill 2015 Itemization", Null

'Open 2015 Itemization form
BIZ_Forms_ShowAll
BIZ_Forms_Open "2015 Itemization"

'Fill required details in sections 900, 1000, 1100 in Itemization form
BIZ_2015Itemization_Set800Section "E2E_VAPURARM"
BIZ_2015Itemization_Set900Section "E2E_VAPURARM"
BIZ_2015Itemization_Set1000Section "E2E_VAPURARM"
BIZ_2015Itemization_Set1100Section "E2E_VAPURARM"

'Set the Disclosure
BIZ_RegZ_LE_SetDisclosureInformation "E2E_VAPURARM"