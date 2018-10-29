'@**************************************************************************************************
'@ TestStory: PTAC-1553 Business Rules
'@ TestCase: PTAC-1430  Display warning when all compensation fields are not compliant Set fields ON & Borrower Paid By 
'@ Test Automation JIRA Task: PTAC-2667  BusinessRules_LOCompensationRule_LOCompensationRuleControl
'@ TestData: 
   'BusinessRule_LOCompensation, LOCompensationData and BR_LoCompDisplayWarn_FieldOn3rdBorrower
   'Forms_2015Itemization, Set800Section and  BR_LoCompensationPaidTo
   'Forms_2015Itemization, Set800Section and BR_LoCompPaidByFieldOn
'@ Pre-conditions:	
'@ Description: Display warning when all compensation fields are not compliant Set fields ON & Borrower Paid By
'@ TestSteps:
   '1 Login to Encompass with Admin user and Navigate to through Encompass Settings -> Business Rules -> "LO Compensation rule"
   '2 Select "Display warning when all compensation fields are not compliant", from drop down 
      'Select some fields as below,
      '801.a. Loan Origination Fee
      '801.b. Application Fees
      '801.c.Processing Fees, 
      'Treat seller-paid broker compensation as 'Borrower' Save.
   '3 Create a new loan and go to  "2015 itemization" form.
   '4 Enter details mentioned in test data for the 'fees' and select 'B' option under 'Paid to', verify the green symbol next to fees.
   '5 Select 'L' option from 'Paid By' for Application Fees'.
   '6 Select the radio button 'Make all Paid by Borrower', click OK button, and Verify.
'@ ExpectedResult:
   '1 Admin user to be logged in successfully and "LO Compensation" rule screen screen should be displayed.
   '2 The rule to be saved successfully.
   '3 The 2015 Itemization form should open.
   '4 The green symbol is displayed before the fee name.
   '5 It populates the 'LO Compensation Violation' popup window with default selection is "Take no action".
   '6 All 'Paid By' is changed to " " for the matched rule lines.
'***************************************************************************************************
	Set objData = FRM_DS_GetTestData("BusinessRule_LOCompensation", "LOCompensationData", "BR_LoCompDisplayWarn_FieldOn3rdBorrower")
	ExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")
	If ExecutionFlag = "Y" Then
	
	FRM_Logger_ReportStepEvent "Start Test Case :PTAC-1430 ","TestCase Name -  Display warning when all compensation fields are not compliant Set fields ON & Borrower Paid By", Null
	
	'====== Navigate to Encompass->Settings ======
	BIZ_Nav_OpenMenuItem "Encompass;Settings..."
	
	'====== Navigate to Business Rules->LO Compensation Rule ======
	BIZ_Nav_HierarchyTree "Business Rules", "LO Compensation Rule"
	
	'====== Sets the value in LO Compensation Rule ======
	BR_LOCompensationRule "BR_LoCompDisplayWarn_FieldOn3rdBorrower"
	GUI_Window_Close (SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer"))
	
    '====== Navigates to Pipeline Tab ======
	BIZ_Nav_SelectPipelineTab()
	
	'====== Openes new Loan ======
	BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "","Automation"
	
	'====== Sets the value in 2015 Itemization in Paid To ======
	BIZ_2015Itemization_Set800Section "BR_LoCompensationPaidTo"
	
	'====== Verify Green Dollar Icon is displayed or not  ======
	BR_2015Itemization_VerifyGreenSymbolExist()
	
	'====== Sets the value in 2015 Itemization Form ======
	BIZ_2015Itemization_Set800Section "BR_LoCompPaidByFieldOn"
	
	'====== Validate popup message with taken no action ======
	BR_2015Itemization_VerifyLOCompensationViolationPopUpExistNoActions()

    '====== Sets the input in popup message ======
	BR_2015Itemization_LOCompViolationPopUp_HowToProceed "BR_LoCompDisplayWarn_FieldOn3rdBorrower"
	
	'====== Verify Paid By ======
	BR_2015Itemization_VerifyPaidBy "#0"
	
	'====== Close the loan ======
	BIZ_Loan_Exit True
	
	End if	
	

