'@**************************************************************************************************
'@ TestStory: PTAC-1352
'@ TestCase:  PTAC-562 To verify the Initial Aquisition and Refinace fields availability for Loan Purpose Construction only
'@ Test Automation JIRA Task: PTAC-1380
'@ TestData:  
'@ Pre-conditions: 
'@ Description: To verify the Initial Aquisition and Refinace fields availability for Loan Purpose Construction and Construction Perm
'@ TestSteps:
   '1 Log into Encompass as Admin/password
   '2 Navigate to Pipeline tab > Click on New Loan icon (right corner)
   '3 Click on New Bank Loan button
   '4 Enter the data mentioned in Test Data column, save
   '5 Go to Reg-Z Form, and validate the Adjustable Payment section fields
'@ ExpectedResult:
   '1 Admin should be able to login successfully
   '2 New Loan pop up displayed
   '3 It navigates to Loan tab
   '4 The option to be selected.
   '5 The 'Initial Acquisition' and 'Refinance' fields checkboxes should be editable.
   '6 Initial Acquisition of land' and 'Refinance' fields checkboxes should be editable under 'Construction Mortgage' section.
   '7 Initial Acquisition and refinance fields checkboxes should be editable  under 'Construction Mortgage' section.
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test","To verify the Initial Aquisition and Refinace fields availability for Loan Purpose Construction only", Null
    
'====== Go to Pipeline>>NewLoanButton>>Forms ======
BIZ_Nav_Pipeline_Forms_FormType "My Pipeline", "Borrower Summary - Origination"

'====== Set loan purpose and check the checkbox ======
ConstructionManagement_SetLoanpurpose_Verifycheckbox "Construction Only", "__cid_CheckBox13_Ctrl"

'====== Validate the initial acquisition and refinance fields in constuction management form ======
ConstructionManagement_CM_RegZLE_RegZCD_Acquisition_Refinance_Validations "Construction Management"

'====== Validate the initial acquisition and refinance fields in RegZ-LE form ======
ConstructionManagement_CM_RegZLE_RegZCD_Acquisition_Refinance_Validations "RegZ - LE"

'====== Validate the initial acquisition and refinance fields in RegZ-CD form ======
ConstructionManagement_CM_RegZLE_RegZCD_Acquisition_Refinance_Validations "RegZ - CD"


