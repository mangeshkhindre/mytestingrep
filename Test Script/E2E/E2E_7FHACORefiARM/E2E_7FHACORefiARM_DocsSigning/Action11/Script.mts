'@**************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM
'@ TestCase : PTAC-2731 FHACOREFIARM Docs Signing 1 - Receive Closing conditions
'@ Test Automation JIRA Task: PTAC-2722  E2E_7FHACORefiARM_DocsSigning
'@ TestData: 
   '1 Global_Data, Login and E2E_closer
   '2 eFolder_Tab, SetDocumentsStatus and E2E_FHACORefiARM_AllDocument
   '3 Loans, LoanTemplate and E2E_Closer
   '4 Loans, Milestone and E2E_FHACORefiARM_DocsSigning
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Login as Closer
   '2 Go to your loan and click on e-folder
   '3 Select 'Closing documents' from the 'Document Group ' dropdown
   '4 Open each closing document and select 'Received' and 'Reviewed' for each
   '5 Click on magnifying lens and select 'funder user' as funder and click on finished
'@ ExpectedResult: 
   '1 Should be able to login
   '2 E-folder should open
   '3 Should be able to see a list of closing documents
   '4 Should be able to click received and reviewed
   '5 Should be able to finish the milestone
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2731","FHACOREFIARM Docs Signing 1 - Receive Closing conditions", Null

Dim objData, objDataProcessing
Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_Closer")

'Login to the Encompass as closer
BIZ_Login_UserLogin "E2E_closer" 'Integration Environment

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"

BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData,"PipeLineView"), FRM_DS_GetValue(objData,"LoanFolder")

'Search for loans with MS9Completed as borrowers middle name
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS9Complete_FHACORefiARM","Docs Signing"

Set objDataProcessing = FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHACORefiARM_DocsSigning")

BIZ_Loan_AcceptFiles "Docs Signing", FRM_DS_GetValue(objDataProcessing, "NextUser")
BIZ_Nav_eFoler_Open()
BIZ_Documents_SetDocumentsStatus "E2E_FHACORefiARM_AllDocument"
BIZ_Nav_eFoler_Close()
BIZ_Loan_FinishMilestone_AssignUser "Docs Signing", FRM_DS_GetValue(objDataProcessing, "NextUser")

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Docs signed")) Then 
   FRM_Logger_ReportPassEvent "Finish the Docsigning Milestone", "User is able to finish the milestone", Null
Else
   FRM_Logger_ReportFailEvent "Finish the Docsigning Milestone", "User is not able to finish the milestone", Null
End If

'Save and Exit the Loan Details
BIZ_Loan_Exit True

'Logout from Encompass
BIZ_Login_UserLogout()

Set objData           = Nothing
Set objDataProcessing = Nothing
