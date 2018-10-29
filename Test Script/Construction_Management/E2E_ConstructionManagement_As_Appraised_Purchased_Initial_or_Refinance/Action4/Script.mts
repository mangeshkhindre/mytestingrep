'@**************************************************************************************************
'@ TestStory: PTAC-1352
'@ TestCase: PTAC-562 To verify the Initial Aquisition and Refinace fields availability for Loan Purpose Construction Perm
'@ Test Automation JIRA Task: PTAC-1380
'@ TestData: 
'@ Pre-conditions: 
'@ Description: Construction to Perm, Fixed to Fixed with Step Rate, Construction Period = 13 Months, No Interest Only.
'@ TestSteps:
   '1 Navigate to Pipeline tab > Click on New Loan icon (right corner) 
   '2 Click on New Bank Loan button
   '3 Go to Borrower Origination form, check 'Loan Purpose' field
   '4 Go to Construction Management form >Loan info page and Verify the Initial Acquisition and refinance fields checkboxes.
   '5 Go to RegZ- LE form and Verify the Initial Acquisition and refinance fields checkboxes.
   '6 Go to RegZ- CD form and Verify the Initial Acquisition and refinance fields checkboxes.
'@ ExpectedResult:
   '1 Admin should be able to login successfully
   '2 New Loan pop up displayed
   '3 It navigates to Loan tab
   '4 The option to be selected.
   '5 The 'Initial Acquisition' and 'Refinance' fields checkboxes should be editable.
   '6 Initial Acquisition of land' and 'Refinance' fields checkboxes should be editable under 'Construction Mortgage' section.
   '7 Initial Acquisition and refinance fields checkboxes should be editable  under 'Construction Mortgage' section.
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test","To verify the Initial Aquisition and Refinace fields availability for Loan Purpose Construction Perm", Null
    
'====== Go to Borrower Summary - Origination ======
BIZ_Forms_Open "Borrower Summary - Origination"

'====== Set loan purpose and check the checkbox ======
ConstructionManagement_SetLoanpurpose_Verifycheckbox "Construction Perm", "__cid_CheckBox15_Ctrl"

'====== Validate the initial acquisition and refinance fields in constuction management form ======
ConstructionManagement_CM_RegZLE_RegZCD_Acquisition_Refinance_Validations "Construction Management"

'====== Validate the initial acquisition and refinance fields in RegZ-LE form ======
ConstructionManagement_CM_RegZLE_RegZCD_Acquisition_Refinance_Validations "RegZ - LE"

'====== Validate the initial acquisition and refinance fields in RegZ-CD form ======
ConstructionManagement_CM_RegZLE_RegZCD_Acquisition_Refinance_Validations "RegZ - CD"


