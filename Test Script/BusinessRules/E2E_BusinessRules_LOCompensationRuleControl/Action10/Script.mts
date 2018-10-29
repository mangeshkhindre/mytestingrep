'@**************************************************************************************************
'@ TestStory: PTAC-1553 Business Rules
'@ TestCase: PTAC-1364 Verify the 'LO Compensation rule'
'@ Test Automation JIRA Task: PTAC-2243 BusinessRule_VerifyLOCompensationRule
'@ TestData: Global_Data, login and PTAC-1533_BusinessRule
'@ Pre-conditions: 
'@ Description: 
'@ TestSteps:
   '1 Login to Encompass with Admin user
   '2 Navigate to through Encompass Settings -> Business Rules -> "LO Compensation rule"
   '3 Select "Enforce compliance to the LO Compensation paid-by rule", from drop down
      'Select some fields as below,801.a. Loan Origination Fee,801.b. Application Fees,801.c.Processing Fees
      ' Treat seller-paid broker compensation as 'Borrower' Save.
   '4 Create a new loan and go to  "2015 itemization" form.
   '5 Enter details mentioned in test data for the 'fees' and select 'B' option under 'Paid to', verify the green symbol next to fees.
   '6 Select 'L' option from 'Paid By' for Application Fees'.
   '7 Select the radio button 'Make all Paid By Borrower', click OK button, and Verify
'@ ExpectedResult:
   '1 Admin user to be logged in successfully
   '2 "LO Compensation" rule screen screen should be displayed.
   '3 The rule to be saved successfully.
   '4 The 2015 Itemization form should open.
   '5 The green symbol is displayed before the fee name.
   '6 It populates the 'LO Compensation Violation' popup window
   '7 All 'Paid By' is 'blank' for the matched rule lines.
      
'***************************************************************************************************

Set objData = FRM_DS_GetTestData("BusinessRule_LOCompensation", "LOCompensationData", "BR_LoCompensation_3rdParty")
	ExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")
	If ExecutionFlag = "Y" Then
	
'====== Navigate to Encompass->Settings ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."

'====== 'Go to Business Rules->LO Compensation Rule ======
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1364","Verify the 'LO Compensation rule'", Null
BIZ_Nav_HierarchyTree "Business Rules", "LO Compensation Rule"
BR_LOCompensationRule "BR_LoCompensation_3rdParty"
GUI_Window_Close (SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer"))

'=====================Select Pipeline View and Create a new blank loan====================
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "","Automation"
BIZ_2015Itemization_Set800Section "PTAC-1364"

BR_Verify_LOCompensationViolation

BIZ_Loan_Exit(False)
BIZ_Nav_SelectHomeTab

End if
