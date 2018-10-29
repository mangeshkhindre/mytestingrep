'@**************************************************************************************************
'@ TestStory: PTAC-1352
'@ TestCase: PTAC-562 To verify the Initial Aquisition and Refinace fields availability for Loan Purpose Construction and Construction Perm
'@ Test Automation JIRA Task: PTAC-1380
'@ TestData: 
'@ Pre-conditions: 
'@ Description: To verify the Initial Aquisition and Refinace fields availability for Loan Purpose Construction and Construction Perm
'@ TestSteps:
   '1 Log into Encompass as Admin/password
   '2 Navigate to Pipeline tab > Click on New Loan icon (right corner)
   '3 Click on New Bank Loan button
   '4 Go to Borrower Origination form, check 'Loan Purpose' field
   '5 Go to Construction Management form >Loan info page and Verify the Initial Acquisition and refinance fields checkboxes
   '6 Go to RegZ- LE form and Verify the Initial Acquisition and refinance fields checkboxes
   '7 Go to RegZ- CD form and Verify the Initial Acquisition and refinance fields checkboxes
 '@ ExpectedResult:
   '1 Admin should be able to login successfully
   '2 New Loan pop up dyisplayed
   '3 It navigates to Loan tab
   '4 The option to be selected.
   '5 The 'Initial Acquisition' and 'Refinance' fields checkboxes should be editable.
   '6 Initial Acquisition of land' and 'Refinance' fields checkboxes should be editable under 'Construction Mortgage' section.
   '7 Initial Acquisition and refinance fields checkboxes should be editable  under 'Construction Mortgage' section.
'***************************************************************************************************
FRM_RT_SetupTest(null)

FRM_Logger_ReportStepEvent "Start Test Case","PTAC-562 - To verify the Initial Aquisition and Refinace fields availability for Loan Purpose Construction and Construction Perms", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

'====== Run test for  Contruction only and validate Initialaquisition and Refinance fields ======
RunAction "ConstructionManagement_ConstructionOnly_InitialAquisition_and_Refinancefields_01", oneIteration

'====== Run test for  Contruction only and validate Initialaquisition and Refinance fields ======
RunAction "ConstructionManagement_ConstructionPerm_InitialAquisition_and_Refinancefields_02", oneIteration

'====== RunAction to Validate Homeowner’s Insurance and Property Taxes As appraised value Initial Aquisition Checked ======
FRM_Logger_ReportStepEvent "Start Test Case - PTAC-1112","TC 3 - CBIZ-3873 Verify Homeowner’s Insurance and Property Taxes calculation should be defaulted to use", Null
RunAction "ConstrLoan_ConstrPerm_InitialAquisitionChecked_HousingTaxesValidate", oneIteration, "1352_ConstrLoan_AsAppraisedVal_IntAqChck", "ON", "1352_ConstrLoan_AsAppraisedVal_ConstrOnly_IntAqChck", "1352_ConstrLoan_AsAppraisedVal_ConstrPerm_IntAqChck"

BIZ_Loan_Exit False

BIZ_Nav_Pipeline_Forms_FormType "My Pipeline", "Borrower Summary - Origination"
'====== RunAction to Validate Homeowner’s Insurance and Property Taxes As appraised value Initial Aquisition UnChecked ======
FRM_Logger_ReportStepEvent "Start Test Case - PTAC-1113","TC 4- CBIZ-3873 Verify Homeowner’s Insurance and Property Taxes calculation should be defaulted to use As Completed Appraised Value", Null
RunAction "ConstrLoan_ConstrPerm_InitialAquisitionChecked_HousingTaxesValidate", oneIteration, "1352_ConstrLoan_AsAppraisedVal_IntAqUnChck", "OFF", "1352_ConstrLoan_AsAppraisedVal_ConstrOnly_IntAqUnChck", "1352_ConstrLoan_AsAppraisedVal_ConstrPerm_IntAqUnChck"

FRM_Logger_ReportStepEvent "Start Test Case:PTAC-1095","TC 2 - CBIZ-3873 Verify calculation for 'As Completed Purchase Price' and 'As Completed Appraised Value' fileds",Null

BIZ_Forms_Open "Borrower Summary - Origination"

'SetTransaction details in transaction section
BIZ_Common_BorrowerSummaryOrigination_SetTransactionDetails SwfWindow("swfname:=MainForm").Page("micclass:=Page"), "PTAC-1095"

BIZ_Loan_save

'======= Validate as Appraised and Purchase value in Loan Info Tab oc Construction Management Form
CM_ConstrPerm_AsAppraisedandPurchaseValue_Validate()

'====== Exit Loan ======
BIZ_Loan_Exit False


BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)


