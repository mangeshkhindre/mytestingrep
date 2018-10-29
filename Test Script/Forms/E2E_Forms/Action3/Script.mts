'@******************************************************************************************
'@ TestStory: ENC-30271 HOA Dues Field 233 - Add Calculation Logic for LE/CD
'@ TestCase: 
		'1 ENC-30057 TC1_ENC-28063_HOA Dues Field 233 - Add Calculation Logic for LE/CD
		'2 ENC-30104 TC2_ENC-28063_HOA Dues Field 233 - Add Calculation Logic for LE/CD
'@ Test Automation JIRA Task: 
		'1 TA-4693
		'2 CTA-361 Script optimization for module 'Forms'
'@ TestData: "Forms_2015Itemization","Set1000Section","30271_1007Line"
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Create a new loan.
	'2 Go to 1003 Page 2.
	'3 Enter value in HOA Dues Field 233
	'4 Go to LE Page 1
	'5 Go to CD Page 1
	'6 Go to 2015 Itemization form
	'7 Enter value for field 1629 and 1630 in line 1007 in 2015 Itemization
	'8 Go to 1003 Page 2 -> Monthly Housing Expenses" -> click the "Edit field Value " icon of "Other" line and enter Other_Proposed =0
	'9 Go to LE Page 1
	'10 Go to CD Page 1
	'11 Save loan
	'12 Print 1003 Page
'@ ExpectedResult: 1. For step 4,LE1.X29=3000
'				   2. For step 5,CD1.X3=3000
'				   3. For step 6,on 2015 Itemization form,NEWHUD.X351 =true,NEWHUD.X78 =enabled in line 1001
'                  4. For step 9,LE1.X29=3005
'                  5. For step 10,CD1.X3=3005
'				   6. Print preview should be properly loaded.
'********************************************************************************************
FRM_Logger_ReportStepEvent "ENC-30271","Verify calculation logic on LE/CD Page 1 value for HOA Dues(233) on 1003 Page 2.",NULL

'============Value to enter in field 233(HOA dues) on 1003 Page 2=============
intHOADuesF233 = 3000

'=====================Select Pipeline View and Create a new blank loan====================
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation"

'=========Open 1003 Page 2=====
BIZ_Forms_Open "1003 Page 2"

Dim objMainForm
Set objMainForm = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")

'=========Enter value for HOA Dues Field 233=========
GUI_WebEdit_Set objMainForm.WebEdit("html id:=l_233"),intHOADuesF233

'=========Open Loan Estimate Page 1=====
BIZ_Forms_Open "Loan Estimate Page 1"

'=========Get the value of LE1.X29==========
intLE1X29 = CINT(GUI_Object_GetPropertyValue(objMainForm.WebEdit("html id:=TextBox68"),"value"))

FRM_Logger_ReportInfoEvent "Verify Estimated Taxes, Insurance & Assessments amount","Value of LE1.X29 on LE Page 1 should be "&intHOADuesF233,NULL

'==========value of LE1.X29 = HOA Dues Field 233======
FRM_VerifyEqual intLE1X29,intHOADuesF233,"LE1.X29=HOADues233","Value of LE1.X29 and HOA Dues 233 should be same."

'=========Open Closing Disclosure Page 1=====
BIZ_Forms_Open "Closing Disclosure Page 1"

'=========Get the value of CD1.X3==========
intCD1X3 = CINT(GUI_Object_GetPropertyValue(objMainForm.WebEdit("html id:=TextBox9"),"value"))

FRM_Logger_ReportInfoEvent "Verify Estimated Taxes, Insurance & Assessments amount","Value of CD1.X3 on CD Page 1 should be "&intHOADuesF233,NULL

'==========value of CD1.X3 = HOA Dues Field 233======
FRM_VerifyEqual intCD1X3,intHOADuesF233,"CD1.X3=HOADues233","Value of CD1.X3 and HOA Dues 233 should be same."

'=========Open 2015 Itemization=====
BIZ_Forms_Open "2015 Itemization"

If intHOADuesF233 > 0 Then
	FRM_Logger_ReportInfoEvent "Verify checked","NEWHUD.X351 should be checked since field 233 > 0",NULL
	'==========Validate NEWHUD.X351 is checked============
	GUI_Object_ValidateChecked objMainForm.webCheckbox("html id:=__cid_CheckBox47_Ctrl"),1,"NEWHUD.X351"
	FRM_Logger_ReportInfoEvent "Verify enabled","NEWHUD.X78 should be enabled since field 233 > 0",NULL
	'==========Validate NEWHUD.X78 is enabled============
	GUI_Object_ValidateEnabled objMainForm.WebEdit("html id:=TextBox89"),"NEWHUD.X78"	
Else
	'==========Validate NEWHUD.X78 is disabled============
	GUI_Object_ValidateDisabled objMainForm.WebEdit("html id:=TextBox89"),"NEWHUD.X78"
	
	'================check if NEWHUD.X351 is unchecked=======
	strNEWHUDX351 = GUI_Object_GetPropertyValue(objMainForm.webCheckbox("html id:=__cid_CheckBox47_Ctrl"),"checked")
	
	If strNEWHUDX351 = 0 Then
		FRM_Logger_ReportPassEvent "NEWHUD.X351","Checkbox NEWHUD.X351 is not checked in 1001 line.",NULL
	Else
		FRM_Logger_ReportFailEvent "NEWHUD.X351","Checkbox NEWHUD.X351 is checked in 1001 line.",NULL
	End If
End If

FRM_Logger_ReportInfoEvent "2015 Itemization","Enter value for field 1629 and 1630 in 1007 line.",NULL

'==============Set Data for 1629 and 1630 fields=========
BIZ_2015Itemization_Set1000Section("30271_1007Line")

'===========Get the value of Miscellaneous Reserve=1630=====
intMiscellaneousReserve = CINT(GUI_Object_GetPropertyValue(objMainForm.WebEdit("html id:=l_1630"),"value"))

FRM_Logger_ReportInfoEvent "Check Excluded checkbox","On 1003 Page 2,select Excluded checkbox of 1007 for the HOA Insurance and verify if Other=0",NULL

'=========Open 1003 Page 2=====
BIZ_Forms_Open "1003 Page 2"

'=============Section "Monthly Housing Expenses" -> click the "Edit field Value " icon of "Other" line=========
GUI_WebButton_Click objMainForm.WebButton("html id:=StandardButton7")

Dim objOtherHousingExpenses
Set objOtherHousingExpenses = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=OtherExpenseDialog")

If SwfWindow("swfname:=MainForm").SwfWindow("swfname:=OtherExpenseDialog").Exist Then
	'=========select Excluded checkbox of 1007 for the HOA Insurance============
	GUI_SwfCheckbox_Set objOtherHousingExpenses.SwfCheckbox("swfname:=ex1006Chk"),True
	FRM_Logger_ReportInfoEvent "Other housing expense","Checked excluded checkbox against 1007 on 'Other housing expense' popup",NULL
Else
	FRM_Logger_ReportFailEvent "Other housing expense","Other housing expense popup does not appear",NULL		
End If

'============Close Other Housing Expenses window==========
GUI_SwfButton_Click objOtherHousingExpenses.SwfButton("swfname:=okBtn")

'=============Validate value of other_Proposed field is 0==============
GUI_Object_ValidateValue objMainForm.WebEdit("html id:=l_234"),"0.00","Other_Proposed"

'=========Open Loan Estimate Page 1=====
BIZ_Forms_Open "Loan Estimate Page 1"

'=========Get the value of LE1.X29==========
intLE1X29 = CINT(GUI_Object_GetPropertyValue(objMainForm.WebEdit("html id:=TextBox68"),"value"))
FRM_Logger_ReportInfoEvent "Verify Estimated Taxes, Insurance & Assessments amount","Value of LE1.X29 on LE Page 1 should be "&intHOADuesF233+intMiscellaneousReserve,NULL

'==========value of LE1.X29 = HOA Dues Field 233+Miscellaneouse Reserve======
FRM_VerifyEqual intLE1X29,intHOADuesF233+intMiscellaneousReserve,"LE1.X29=HOADues233+Miscellaneouse Reserve","Value of LE1.X29 and HOA Dues 233+Miscellaneouse Reserve should be same."

'=========Open Closing Disclosure Page 1=====
BIZ_Forms_Open "Closing Disclosure Page 1"

'=========Get the value of CD1.X3==========
intCD1X3 = CINT(GUI_Object_GetPropertyValue(objMainForm.WebEdit("html id:=TextBox9"),"value"))
FRM_Logger_ReportInfoEvent "Verify Estimated Taxes, Insurance & Assessments amount","Value of CD1.X3 on CD Page 1 should be "&intHOADuesF233+intMiscellaneousReserve,NULL

'==========value of CD1.X3 = HOA Dues Field 233+Miscellaneouse Reserve======
FRM_VerifyEqual intCD1X3,intHOADuesF233+intMiscellaneousReserve,"CD1.X3=HOADues233+Miscellaneouse Reserve","Value of CD1.X3 and HOA Dues 233+Miscellaneouse Reserve should be same."

'============Save Loan=========
BIZ_Loan_Save()

'=========Open 1003 Page 2=====
BIZ_Forms_Open "1003 Page 2"

'=============click on Print Icon=====
GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfObject("swfname:=printBtn")

'============Select Form to Print=====
GUI_List_ClickRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=FormSelectorDialog").SwfObject("swfname:=gridViewSelectedFiles"),NULL,0,"1003 Page 2",True,False,False,"Single"

'===============Click on Preview button====
BIZ_Forms_Print_Preview()

Wait 30
bflag=False

 Set oDesc = Description.Create
	oDesc("micclass").value = "swfObject"
	oDesc("swfname").value = "gvErrorList"
	
	Set objFormFailureParent=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=FormSelectorDialog").SwfWindow("swfname:=.*ErrorDialog")
	If objFormFailureParent.Exist(2) Then
		

		Set objFormFailure=objFormFailureParent.ChildObjects(oDesc)(0)
		
		
		For i = 1 To (objFormFailure.Object.Items.count/5)
			if instr(objFormFailure.Object.Items.Item(i+((i-1)*5)).SubItems.Item(1).text,"1003 Page") then 
				bflag=True
				Exit for
			FRM_Logger_ReportFailEvent "Print Preview of 1003 Page 2","Form failure recieved for 1003 Page 2 .",NULL
			End If
		Next 
		
		If not(bflag) Then
			objFormFailureParent.SwfButton("swfname:=btnClose").Click
		End If
	End If

Dim objPDFPreviewDialog
Set objPDFPreviewDialog = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=FormSelectorDialog").SwfWindow("swfname:=PdfPreviewDialog").WinObject("text:=AVPageView")

'===============Check if PDF is loaded or not================
If objPDFPreviewDialog.Exist(15) Then
	FRM_Logger_ReportPassEvent "Print Preview of 1003 Page 2","Print preview of 1003 Page 2 is loaded properly and can be printed without any error.",NULL
Else
	FRM_Logger_ReportFailEvent "Print Preview of 1003 Page 2","Print preview of 1003 Page 2 is not loaded properly and cannot be printed.",NULL
End If

'=============Close Preview Window=====
BIZ_Forms_Print_ClosePrviewWindow()

GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=FormSelectorDialog").SwfButton("swfname:=btnClose")

'=============Come out of existing loan====='
BIZ_Loan_Exit(False)
