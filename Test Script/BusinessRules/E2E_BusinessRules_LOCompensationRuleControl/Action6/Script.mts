'@**************************************************************************************************
'@ TestStory: PTAC-1553 Business Rules
'@ TestCase: PTAC-1431  Display warning when all compensation fields are not compliant Set fields ON & 3rd Party Paid By
'@ Test Automation JIRA Task: PTAC-2667  BusinessRules_LOCompensationRule_LOCompensationRuleControl
'@ TestData: 
   'BusinessRule_LOCompensation, LOCompensationData and BR_LoCompDisplayWarn_FieldOn3rdParty
   'Forms_2015Itemization, Set800Section and  BR_LoCompensationPaidTo
   'Forms_2015Itemization, Set800Section and BR_LoCompensationPaidBy
   'Forms_2015Itemization, Set800Section and BR_LoCompPaidByFieldOn_3rdParty1
   'Forms_2015Itemization, Set800Section and BR_LoCompPaidByFieldOn_3rdParty2
'@ Pre-conditions:
'@ Description: Display warning when all compensation fields are not compliant Set fields ON & 3rd Party Paid By
'@ TestSteps:
   '1 Login to Encompass with Admin user and Navigate to through Encompass Settings -> Business Rules -> "LO Compensation rule"
   '2 Select "Display warning when all compensation fields are not compliant", from drop down 
      'Select some fields as below,
      '801.a. Loan Origination Fee
      '801.b. Application Fees
      '801.c.Processing Fees, 
      'Treat seller-paid broker compensation as 'Third-Party' Save.
   '3 Create a new loan and go to  "2015 itemization" form.
   '4 Enter details mentioned in test data for the 'fees' and select 'B' option under 'Paid to', verify the green symbol next to fees.
   '5 Select 'L' option from 'Paid By' for Application Fees'.
   '6 Select the radio button 'Make all Paid by 3rd party', click OK button, and Verify
   '7 Change the Paid By to 'B' for the 'Loan origination fees', and 'O' for'Application fees', verify
   '8 Change the Paid By to ""(blank) for the 'Processing fees', verify
'@ ExpectedResult:
   '1 Admin user to be logged in successfully and "LO Compensation" rule screen screen should be displayed.
   '2 The rule to be saved successfully.
   '3 The 2015 Itemization form should open.
   '4 The green symbol is displayed before the fee name.
   '5 It populates the 'LO Compensation Violation' popup window with default selection is "Take no action"
   '6 All 'Paid By' is changed to "L" for the matched rule lines
   '7 It should change it to 'B' and 'O' successfully, without any popup windows.
   '8 It show the 'LO Compensation Violation' popup window.
'***************************************************************************************************
	Set objData = FRM_DS_GetTestData("BusinessRule_LOCompensation", "LOCompensationData", "BR_LoCompDisplayWarn_FieldOn3rdParty")
	ExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")
	If ExecutionFlag = "Y" Then
	
	FRM_Logger_ReportStepEvent "Start Test Case :PTAC-1431 ","TestCase Name -  Display warning when all compensation fields are not compliant Set fields ON & 3rd Party Paid By", Null
	
	'====== Declaration of Objects ====== 
	Dim objViolationPopUp
	
	Set objViolationPopUp = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=LOCompensationViolationDialog")
	
	'====== Navigate to Encompass->Settings ======
	BIZ_Nav_OpenMenuItem "Encompass;Settings..."
	
	'====== Navigate to Business Rules->LO Compensation Rule ======
	BIZ_Nav_HierarchyTree "Business Rules", "LO Compensation Rule"
	
	'====== Sets the value in LO Compensation Rule ======
	BR_LOCompensationRule "BR_LoCompDisplayWarn_FieldOn3rdParty"
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
	BIZ_2015Itemization_Set800Section "BR_LoCompensationPaidBy"
	
	'====== Validate popup message with taken no action ======
	BR_2015Itemization_VerifyLOCompensationViolationPopUpExistNoActions()
	
	'====== Validates whether pop up message is displayed or not ======
	BR_2015Itemization_LOCompViolationPopUp_HowToProceed "BR_LoCompDisplayWarn_FieldOn3rdParty"
	
	'====== Validate whether 'L' display on screen or not ======
	BR_2015Itemization_VerifyPaidBy "L"
	
	'====== Sets the value in 2015 Itemization Form ======
	BIZ_2015Itemization_Set800Section "BR_LoCompPaidByFieldOn_3rdParty1"
	
	'====== Validate whether pop up message displayed or not ======
	BR_2015Itemization_VerifyLOCompensationViolationPopUpNotExist()
	
	'====== Sets the value in 2015 Itemization Form ======
	BIZ_2015Itemization_Set800Section "BR_LoCompPaidByFieldOn_3rdParty2"
	
	'====== Validate whether pop up message displayed or not ======
	BR_2015Itemization_VerifyLOCompensationViolationPopUpExist()
	wait 10
	GUI_SwfButton_Click objViolationPopUp.SwfButton("swfname:=btnCancel")
	
	'====== Close the loan ======
	BIZ_Loan_Exit True

    '======  Release the Object ====== 
	Set objViolationPopUp = Nothing
	
	End if
