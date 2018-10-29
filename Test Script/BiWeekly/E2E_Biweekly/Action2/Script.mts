'@**************************************************************************************************
'@ TestStory:CBIZ-13631
'@ TestCase: "Loan Term Calculation  180 Months (CBIZ-10321)","Loan Term Label = Field 3291(CBIZ-10316)","LEpg2 Section G (CBIZ-12816)"



'@ Test Automation JIRA Task: 
'@ TestData: 
	'1 Forms_AggregateEscrowAccount, SetData, PTAC-1078_SetData
	'2 Forms_AggregateEscrowAccount, SetData, PTAC-1078_DeleteCityTaxDueDate
	'3 Forms_BorrowerSummaryOrigination, SetHeadInfo, PTAC-1078_SetData
	'4 Forms_BorrowerSummaryOrigination, SetBorrower, PTAC-1078_SetData
	'5 Forms_BorrowerSummaryOrigination, SetTransactionDetails, PTAC-1078_SetData
'@ Pre-conditions: The user is logged into Encompass.
'@ Description: Validate LE PAge 1 LE1.x29 Validate 3291='Biweekly' When Biweekly checkbox 329 Is checked.
	'1 Yearly Escrow = (Monthly Escrow Amount * 12)
	'2 Total Monthly Payment = Sum of Monthly Escrow amounts 
	'3 Escrowed Payment = Sum of Scheduled Monthly Escrowed amount:
 '@ TestSteps:
	'1 Create a new loan with basic borrower information as mentioned in the test data.
	'2 Go to Forms tab and click on 'Aggregate Escrow Account' form.
	'3 In the 'Aggregate Escrow Account' form:
	  '1 Select '1st Payment Date' as 1st of next calendar month.
	  '2 Enter the Monthly Escrow amount as per the test data.
	  '3 Check the Yearly Escrow amount
	'4 Verify the 'Total Monthly Payment' field
	'5 Verify the 'Escrowed' and 'Escrowed Payment' fields before scheduling the Escrow Setup.
	'6 Click on 'Setup' button  in 'Aggregate Escrow Account' form.
	'7 In the 'Initial Escrow Account Setup' window: For all the escrow types, enter the 'Due Date 1' as '1st Payment Date' and click on tab.
	'8 Click on 'OK' in 'Initial Escrow Account Setup' window.
	'9 In the 'Aggregate Escrow Account' form, verify the 'Escrowed' check boxes after scheduling the Escrow Setup.
	'10 Verify the 'Escrowed Payment' field after scheduling the Escrow Setup.
	'11 Click on 'Setup' button.
	'12 In the 'Initial Escrow Account Setup' window: Delete the 'Due Date 1' date for 'City Taxes' (City Property Tax)
	'13 In the 'Aggregate Escrow Account' form, verify the 'Escrowed Payment' field after removing the 'City Taxes' escrow schedule.
'@ ExpectedResult:
	'1 A new loan with basic borrower information is created.
	'2 Aggregate Escrow Form is opened.
	
FRM_Logger_ReportStepEvent "Validate Loan Term Calculation 180 Months(CBIZ-10321) ","Verify the field value for LE1.X2 and LE1.X3 ",null

'====== Change the Loan Data F3 (Note Rate)=5.5% ======
SetNoteRate "5"

VerifyLE1PageDetails("Biweekly")


FRM_Logger_ReportStepEvent "Validate Per Diem Interest Daily Amount Calculation 364 Days per year(CBIZ-9780)" ,"Validate Per Diem Interest Daily Amount Calculation 364 Days per year(CBIZ-9780) ", null

'====== Open FHA Management Form ======
BIZ_Forms_Open "FHA Management"
Set objFNMA = SwfWindow("swfname:=MainForm").Page("index:=0")
wait 2
'=====click on the Prequalifications Fields tab===========
GUI_SwfTab_Click SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControlForm"),"Prequalification"
GUI_WebButton_Click objFNMA.WebButton("html id:=StandardButton1")
GUI_SwfEdit_Set SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MIPDialog").SwfEdit("swfname:=rateFundingTxt"),"1"
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MIPDialog").SwfButton("swfname:=okBtn")

'====== Change the Loan Data F3 (Note Rate)=5.0% ======
SetNoteRate "5"
GUI_WebEdit_Set objFNMA.WebEdit("html id:=l_4"),"360"	'Set the New Value for Term


'====== Set the Test data in SYS.X2 field ======
SetREGZ_CD_SYSX2("364")
	
'====== Verify 2015 Itemisation Fields ======
Verify2015ItemisationF333("13.8736")

'====== Set the Test data in SYS.X2 field ======
SetREGZ_CD_SYSX2("365")
	
'====== Verify 2015 Itemisation Fields ======
Verify2015ItemisationF333("13.8356")

'====== Set the Test data in SYS.X2 field ======
SetREGZ_CD_SYSX2("360")
	
'====== Verify 2015 Itemisation Fields ======
Verify2015ItemisationF333("14.0278")

'====== Open Closing Disclosure Page 1 Form ======

Set objFNMA = SwfWindow("swfname:=MainForm").Page("index:=0")
BIZ_Forms_Open "Closing Disclosure Page 1"
wait 2
'====== Verify Closing disclosure page 2 F3291 Fields ======
FRM_VerifyEqual "Biweekly",GUI_Object_GetPropertyValue (objFNMA.WebEdit("html id:=TextBox39"),"value"),"Validate F3291 (CD2 page)","F3291 (CD2 page)"
'====== Verify Field F3291 should be Readonly ======
GUI_Object_ValidateDisabled objFNMA.WebEdit("html id:=TextBox39"),"Field F3291 should be Readonly"

'===================================================================================================================================

'====== Open Loan Estimate Page 2 Form ======
BIZ_Forms_Open "Loan Estimate Page 2"
wait 2

'=============== Validate labels on LE2 page =========================
ValidateLabelperweekforLE2Page("per bwk for")

'=============== Validate labels on LE2 page =========================
ValidateLabelbwksLE2Page("bwks")

'====== Open Closing Disclosure Page 2 Form ======
BIZ_Forms_Open "Closing Disclosure Page 2"

'=============== Validate labels on Closing Disclosure Page 2 =========================

ValidateLabelbwksCD2Page("bwks")

BIZ_Loan_Save()








'msgbox "hi"



	
	
	
	

