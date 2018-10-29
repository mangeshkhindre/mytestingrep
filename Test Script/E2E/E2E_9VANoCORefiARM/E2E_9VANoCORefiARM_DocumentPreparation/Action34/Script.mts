'@******************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM 
'@ TestCase : PTAC-2368 Doc Preparation 3 - Fill the closing Vendor information form
'@ Test Automation JIRA Task: PTAC-2930 E2E_9VANoCORefiARM_DocumentPreparation
'@ TestData: 
    '1 Tools_FileContacts, CopySettlementService and E2E_VANoCORefiARM1
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'01 Click tools and click 'file contacts' and click on 'Escrow company' from the list.
	'02 Click on the book icon next to the company name and select the escrow company.
	    'Double Click on the first line item which is the escrow company.
	'03 Click 'copy to settlement service provider list' button. Click ok.
	'04 Now click on 'Title insurance company'from the list.
	'05 Click on the book icon next to the company name and select the title company.
	    'Double Click on the first line item which is title insurance.
	'06 Click 'copy to settlement service provider list' button. Click ok.
	'07 Now click on'Docs prepared by' under file contacts.
	'08 Click on the book icon next to the company name and select the 'Docs prepared by' company.
	    'Double click on the first line item which is Docs prepared by.
	'09 Click 'copy to settlement service provider list' button. Click ok.
	'10 Go to forms and click 'Closing vendor information form'.
	    'Verify if the company name, address, city, state and zip is populated for Title insurance company, escrow company and Docs prepared by company.
'@ ExpectedResult: 
	'01 Escrow company details will open.
	'02 A new window pop up will open.All values will be populated in the fields.
	'03 Pop up will open 'selected conatct was copied to SSPL successfully.
	'04 Title company details will open.
	'05 A new pop up window will open. All values will be populated in the Tile insurance company name and detail fields.
	'06 Pop up will open 'selected conatct was copied to SSPL successfully.
	'07 'Docs prepared by' company details will open.
	'08 A new pop up window will open.All details will be populated in the Docs prepared by company name and detail fields.
	'09 Pop up will open with the following message 'selected contact was copied to SSPL successfully'.
	'10 All data should be populated.
'********************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2368","Doc Preparation 3 - Fill the closing Vendor information form", Null

BIZ_FileContacts_CopyBusinessContactsSettlementService "E2E_VANoCORefiARM1"

BIZ_FileContacts_CopyBusinessContactsSettlementService "E2E_VANoCORefiARM2"

BIZ_FileContacts_CopyBusinessContactsSettlementService "E2E_VANoCORefiARM3"