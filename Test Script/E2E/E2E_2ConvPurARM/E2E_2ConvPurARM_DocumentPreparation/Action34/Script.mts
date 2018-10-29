'@**************************************************************************************************
'@ TestStory: PTAC-871- E2E_2CONVPURARM
'@ TestCase: PTAC-923 Doc Preparation 3 - Fill the closing Vendor information form
'@ Test Automation JIRA Task: PTAC-1021 E2E_2CONVPURARM_DocumentPreparation
'@ TestData: 
	'1 Tools_FileContacts, CopySettlementService, E2E_CONVPURARM1
	'2 Tools_FileContacts, CopySettlementService, E2E_CONVPURARM2
	'3 Tools_FileContacts, CopySettlementService, E2E_CONVPURARM3	
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click tools and click 'file contacts' and click on 'Escrow company' from the list.
	'2 Click on the book icon next to the company name and select the escrow company.
	   'Double Click on the first line item which is the escrow company.
	'3 Click 'copy to settlement service provider list' button. Click ok.
	'4 Now click on 'Title insurance company'from the list.
	'5 Click on the book icon next to the company name and select the title company.
	   'Double Click on the first line item which is title insurance.
	'6 Click 'copy to settlement service provider list' button. Click ok.
	'7 Now click on'Docs prepared by' under file contacts.
	'8 Click on the book icon next to the company name and select the 'Docs prepared by' company.
	   'Double click on the first line item which is Docs prepared by.
	'9 Click 'copy to settlement service provider list' button. Click ok.
	'10 Go to forms and click 'Closing vendor information form'.
	    'Verify if the company name, address, city, state and zip is populated for Title insurance company, escrow company and Docs prepared by company.
'@ ExpectedResult: 
	'1 Escrow company details will open.
	'2 A new window pop up will open.All values will be populated in the fields.
	'3 Pop up will open 'selected conatct was copied to SSPL successfully.
	'4 Title company details will open.
	'5 A new pop up window will open. All values will be populated in the Tile insurance company name and detail fields.
	'6 Pop up will open selected conatct was copied to SSPL successfully.
	'7 Docs prepared by company details will open.
	'8 A new pop up window will open.All details will be populated in the Docs prepared by company name and detail fields.
	'9 Pop up will open with the following message 'selected contact was copied to SSPL successfully'.
	'10 All data should be populated.
'********************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case PTAC-923","Test Case Name: Doc Preparation 3 - Fill the closing Vendor information form", Null

BIZ_FileContacts_CopyBusinessContactsSettlementService "E2E_CONVPURARM1"
BIZ_FileContacts_CopyBusinessContactsSettlementService "E2E_CONVPURARM2"
BIZ_FileContacts_CopyBusinessContactsSettlementService "E2E_CONVPURARM3"