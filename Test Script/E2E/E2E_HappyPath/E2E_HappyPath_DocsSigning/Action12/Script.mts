'@**************************************************************************************************
'@ TestStory: PTAC-1129 HAPPYPATH_E2E
'@ TestCase: PTAC-1167  HP Docs Signing 2-Received signed Closing Docs
'@ Test Automation JIRA Task: PTAC - 1174 - HappyPath_Docs Signing"
'@ TestData:
	'1 eFolder_Tab,SetDocumentsStatus and E2E_HappyPath
'@ Pre-conditions: 
'@ Description: 
'@ TestSteps:
   '1 Click on E-folder
   '2 For Document group, select closing documents from the dropdown
   '3 Open each closing document by double-clicking 
   '4 Check the checkboxes
	  'Received 
	  'Reviewed 
	  '(Note: Repeat the same steps for all the documents)
'@ ExpectedResult:
   '1 E-folder should open
	  'All the closing documents should be show
   '2 It should open "Document Detail" Window 
	  'It should be checked
	  '(Note: All the documents should be checked for both options)
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1167","TestCase Name - HP Docs Signing 2-Received signed Closing Docs", Null

BIZ_Nav_SelectLoanTab()

BIZ_Documents_SetDocumentsStatus "E2E_HappyPath"
