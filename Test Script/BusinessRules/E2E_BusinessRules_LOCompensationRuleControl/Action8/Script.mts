'@**************************************************************************************************
'@ TestStory: PTAC-1553 Business Rules
'@ TestCase:  PTAC-1429  Enforce compliance to the LO Compensation paid-by rule Set fields OFF
'@ Test Automation JIRA Task: PTAC-2667  BusinessRules_LOCompensationRule_LOCompensationRuleControl
'@ TestData: 
   'BusinessRule_LOCompensation, LOCompensationData and BR_LoCompensationEnforceCompliance
   'Forms_2015Itemization, Set800Section and BR_LoCompensationPaidBy
   'Forms_2015Itemization, Set800Section and BR_LoCompensationPaidTo_DontEnforce
'@ Pre-conditions:
'@ Description: Enforce compliance to the LO Compensation paid-by rule Set fields OFF 
'@ TestSteps:
   '1 Login to Encompass with Admin user and Navigate to through Encompass Settings -> Business Rules -> "LO Compensation rule"
   '2 Select "Enforce compliance to the LO Compensation paid-by rule", from drop down 
      'NOT select fields 
      'Treat seller-paid broker compensation as 'Borrower' Save.
   '3 Create a new loan and go to  "2015 itemization" form.
   '4 Select the 'Paid To' to 'B' for the fields, and verify the green symbol.
   '5 Select the 'Paid By' to 'L' for the fields and verify the LO Compensation popup window
'@ ExpectedResult:
   '1 Admin user to be logged in successfully and "LO Compensation" rule screen screen should be displayed.
   '2 The rule to be saved successfully.
   '3 The 2015 Itemization form should open.
   '4 The green symbol should not displayed before the fee name.
   '5 "LO Compensation Violation" window should not be appear.
'***************************************************************************************************
	Set objData = FRM_DS_GetTestData("BusinessRule_LOCompensation", "LOCompensationData", "BR_LoCompensationEnforceCompliance")
	ExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")
	If ExecutionFlag = "Y" Then
	
	FRM_Logger_ReportStepEvent "Start Test Case :PTAC-1429 ","TestCase Name - Enforce compliance to the LO Compensation paid-by rule Set fields OFF", Null
	
	'====== Navigate to Encompass->Settings ======
	BIZ_Nav_OpenMenuItem "Encompass;Settings..."
	
	'====== Navigate to Business Rules->LO Compensation Rule ======
	BIZ_Nav_HierarchyTree "Business Rules", "LO Compensation Rule"
	
	'====== Sets the value in LO Compensation Rule ======
	BR_LOCompensationRule "BR_LoCompensationEnforceCompliance"
	GUI_Window_Close (SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer"))
	
	'====== Navigates to Pipeline Tab ======
	BIZ_Nav_SelectPipelineTab()
	
	'====== Openes new Loan ======
	BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "","Automation"
	
    '====== Sets the value in 2015 Itemization in Paid To ======
	BIZ_2015Itemization_Set800Section "BR_LoCompensationPaidTo_DontEnforce"
	
	'====== Verify Green Dollar Icon is displayed or not  ======
	BR_2015Itemization_VerifyGreenSymbolNotExist()
	
	'====== Sets the value in 2015 Itemization Form in Paid By ======
	BIZ_2015Itemization_Set800Section "BR_LoCompensationPaidBy"
	
	'====== Validates whether pop up message is displayed or not ======
	BR_2015Itemization_VerifyLOCompensationViolationPopUpNotExist()
	
	'====== Close the loan ======
	BIZ_Loan_Exit True
	
	End if
