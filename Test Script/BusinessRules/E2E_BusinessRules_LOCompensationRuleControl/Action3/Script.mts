'@**************************************************************************************************
'@ TestStory: PTAC-1553 Business Rules
'@ TestCase:  PTAC-1436  Treat seller-paid broker compensation as Third-Party
'@ Test Automation JIRA Task: PTAC-2667  BusinessRules_LOCompensationRule_LOCompensationRuleControl
'@ TestData: 
   'BusinessRule_LOCompensation, LOCompensationData and BR_LoCompensation_3rdParty
   'Forms_2015Itemization, Set800Section and  BR_LoCompensationPaidTo
   'Forms_2015Itemization, Set800Section and BR_LoCompensationPaidBy
'@ Pre-conditions: 
'@ Description: Treat seller-paid broker compensation as Third-Party
'@ TestSteps:
   '1 Login to Encompass with Admin user and Navigate to through Encompass Settings -> Business Rules -> "LO Compensation rule"
   '2 Select "Enforce compliance to the LO Compensation paid-by rule", from drop down 
      'Select some fields as below,
       '801.a. Loan Origination Fee
       '801.b. Application Fees
       '801.c.Processing Fees, 
      'Treat seller-paid broker compensation as 'Third Party', Save.
   '3 Create a new loan and go to "2015 itemization" form.
   '4 Enter details mentioned in test data for the 'fees' and select 'B' option under 'Paid to', verify the green symbol next to fees.
   '5 Select the 'Paid By' to 'L' for the fee fields(Origination fees) and verify the 'LO Compensation violation' popup window.
'@ ExpectedResult:
   '1 Admin user to be logged in successfully and "LO Compensation" rule screen screen should be displayed.
   '2 The rule to be saved successfully.
   '3 The 2015 Itemization form should open.
   '4 The green symbol is displayed before the fee name.
   '5 "LO Compensation Violation" window should appear.
'***************************************************************************************************
	Set objData = FRM_DS_GetTestData("BusinessRule_LOCompensation", "LOCompensationData", "BR_LoCompensation_3rdParty")
	ExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")
	If ExecutionFlag = "Y" Then
		
	FRM_Logger_ReportStepEvent "Start Test Case :PTAC-1436 ","TestCase Name - Treat seller-paid broker compensation as Third-Party", Null
	
	'====== Declaration of Objects ======
	Dim objViolationPopUp
	
	Set objViolationPopUp = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=LOCompensationViolationDialog")
	
	'====== Navigate to Encompass->Settings ======
	BIZ_Nav_OpenMenuItem "Encompass;Settings..."
	
	'====== Navigate to Business Rules->LO Compensation Rule ======
	BIZ_Nav_HierarchyTree "Business Rules", "LO Compensation Rule"
	
	'====== Sets the value in LO Compensation Rule ======
	BR_LOCompensationRule "BR_LoCompensation_3rdParty"
	GUI_Window_Close (SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer"))
	
	'====== Navigates to Pipeline Tab ======
	BIZ_Nav_SelectPipelineTab()
	
	'====== Openes new blank Loan ======
	BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "","Automation"

    '====== Sets the value in 2015 Itemization in Paid To ======
	BIZ_2015Itemization_Set800Section "BR_LoCompensationPaidTo"
	
	'====== Verify Green Dollar Icon is displayed or not  ======
	BR_2015Itemization_VerifyGreenSymbolExist()
	
	'====== Sets the value in 2015 Itemization Form in Paid By ======
	BIZ_2015Itemization_Set800Section "BR_LoCompensationPaidBy"
	
	'====== Validates whether pop up message is displayed or not ======
	BR_2015Itemization_VerifyLOCompensationViolationPopUpExist()
	wait 10
	GUI_SwfButton_Click objViolationPopUp.SwfButton("swfname:=btnCancel")
	
	'====== Close the loan ======
	BIZ_Loan_Exit True

    '====== Release the Object ======
	Set objViolationPopUp = Nothing
	
	End if
