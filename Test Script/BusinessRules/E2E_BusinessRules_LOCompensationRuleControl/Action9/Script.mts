'@**************************************************************************************************
'@ TestStory: PTAC-1553, Business Rules
'@ TestCase: PTAC-1428  Enforce compliance to the LO Compensation paid-by rule Set fields ON & 3rd Party
'@ Test Automation JIRA Task: PTAC-2667  BusinessRules_LOCompensationRule_LOCompensationRuleControl
'@ TestData: 
   'BusinessRule_LOCompensation, LOCompensationData and BR_LoCompensation_3rdParty
   'BusinessRule_LOCompensation, LOCompensationData and BR_LoCompDisplayWarn_FieldOn3rdParty
   'Forms_2015Itemization, Set800Section and  BR_LoCompensationPaidTo
   'Forms_2015Itemization, Set800Section and BR_LoCompPaidByFieldOn
'@ Pre-conditions:
'@ Description: Enforce compliance to the LO Compensation paid-by rule Set fields ON & 3rd Party
'@ TestSteps:
   '1 Login to Encompass with Admin user and Navigate to through Encompass Settings -> Business Rules -> "LO Compensation rule"
   '2 Select "Enforce compliance to the LO Compensation paid-by rule", from drop down 
      'Select some fields as below,
      '801.a. Loan Origination Fee
      '801.b. Application Fees
      '801.c.Processing Fees, 
      'Treat seller-paid broker compensation as 'Third-Party' Save.
   '3 Create a new loan and go to  "2015 itemization" form.
   '4 Enter details mentioned in test data for the 'fees' and select 'B' option under 'Paid to', verify the green symbol next to fees.
   '5 Select 'L' option from 'Paid By' for Application Fees'.
   '6 Select the radio button 'Make all Paid By 3rd Party', click OK button, and Verify
   '7 Change the Paid By to 'B' for the 'Loan origination fees', and 'O' for'Application fees', verify
   '8 Change the Paid By to ""(blank) for the 'Processing fees', verify
'@ ExpectedResult:
   '1 Admin user to be logged in successfully and "LO Compensation" rule screen screen should be displayed.
   '2 The rule to be saved successfully.
   '3 The 2015 Itemization form should open.
   '4 The green symbol is displayed before the fee name.
   '5 It populates the 'LO Compensation Violation' popup window
   '6 All Paid By should changed to "L" for the matched rule lines 
   '7 It should change it to 'B' and 'o' successfully, without any popup windows.
   '8 It show the 'LO Compensation Violation' popup window.
'***************************************************************************************************

Set objData = FRM_DS_GetTestData("BusinessRule_LOCompensation", "LOCompensationData", "BR_LoCompensation_3rdParty")
	ExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")
	If ExecutionFlag = "Y" Then
	
	FRM_Logger_ReportStepEvent "Start Test Case :PTAC-1428 ","TestCase Name -Enforce compliance to the LO Compensation paid-by rule Set fields ON & 3rd Party", Null
	
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
	 
    '====== Openes new Loan ======
    BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "","Automation"
    
    '====== Openes the 2015 Itemization Form ======
	BIZ_Forms_Open "2015 Itemization"
	
	'====== Sets the value in 2015 Itemization in Paid To ======
	BIZ_2015Itemization_Set800Section "BR_LoCompensationPaidTo"
	
	'====== Verify Green Dollar Icon is displayed or not  ======
	BR_2015Itemization_VerifyGreenSymbolExist()
	
	'====== Sets the value in 2015 Itemization Form ======
	BIZ_2015Itemization_Set800Section "BR_LoCompPaidByFieldOn"
	
	'====== Validates whether pop up message is displayed or not ======
	BR_2015Itemization_VerifyLOCompensationViolationPopUpExist()
	
	'====== Sets the value in popup message ======
	BR_2015Itemization_LOCompViolationPopUp_HowToProceed "BR_LoCompDisplayWarn_FieldOn3rdParty"
	
	'===== Validate 'L' in popup message ======
	BR_2015Itemization_VerifyPaidBy "L"
	
	'====== Sets the value in 2015 Itemization in Paid By ======
	BIZ_2015Itemization_Set800Section "BR_LoCompPaidByFieldOn_3rdParty1"
	
	'====== Validates whether pop up message is displayed or not ======
	BR_2015Itemization_VerifyLOCompensationViolationPopUpNotExist()
	
	'====== Sets the value in 2015 Itemization in Paid By ======
	BIZ_2015Itemization_Set800Section "BR_LoCompPaidByFieldOn_3rdParty2"
	
	'====== Validates whether pop up message is displayed or not ======
	BR_2015Itemization_VerifyLOCompensationViolationPopUpExist()
	wait 10
	GUI_SwfButton_Click objViolationPopUp.SwfButton("swfname:=btnCancel")
	
	'====== Close the loan ======
	BIZ_Loan_Exit True

    '====== Releases the Object ======
	Set objViolationPopUp = Nothing
	
End if
