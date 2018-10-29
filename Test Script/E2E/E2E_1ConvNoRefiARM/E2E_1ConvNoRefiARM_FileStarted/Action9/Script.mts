'@**************************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase : PTAC-1260 CONVNOCASHREFIARM - File started 5 - Add VOL for subject property and attach to VOM
'@ Test Automation JIRA Task: PTAC-1666 E2E_1ConvNoRefiARM_FileStarted
'@ TestData: Forms_VOL, SetVOLData and E2E_ConvNoRefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click on 'Verifs' tab and click on 'VOL'.
	  'Click 'Yes' in the message pop up window.
	'2 Click on 'New verif' icon.
	'3 Select 'VOL' is for borrower from the dropdown.
	   'Enter the following fields:
	   'Name: Wells Fargo
	   'Account type: Mortgage
	   'Account in name of :
	   'John Homeowner
	   'Factor for revolving debt 
	   'balance: 50,000 months left: 240
	   'check the check box -will be paid off.
	   'payment: 200
	'4 Click on 'Verifs' tab and click on 'VOM'.
    '5 Click on 'new verif' icon.
    '6 Check the check box for wells fargo and click on 'ok'.
	'7 Enter the following data in VOM page that opens:
	   'Check the check box for subject property.
	   'For 'property is used as' select 'primary residence' from the dropdown.
	   'Click on Attach/Show liens button.
	   'Type of property: Single family
	   'Date acquired: 01/01/1985
'@ ExpectedResult:
	'1 VOL page should open. An Encompass pop up will also open with a Fannie Mae message.Pop up will close.
	'2 New VOL page should open.
	'3 Should be able to enter all fields.
	'4 VOM page should open.
    '5 Import mortgage from liability window will open.
    '6 Pop up will close and VOM page should be visible.
	'7 Should be able to enter the values.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1260","CONVNOCASHREFIARM - File started 5 - Add VOL for subject property and attach to VOM", Null

Dim objVOLPage, objMainForm, objVOMPage, objNewMortgageDialog

'====== Go to Verifs/VOL ======
BIZ_Nav_OpenMenuItem "Verifs;VOL"

If GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").Dialog("text:=Encompass").WinButton("text:=&Yes"), 90) Then
   GUI_WinButton_Click SwfWindow("swfname:=MainForm").Dialog("text:=Encompass").WinButton("text:=&Yes")
End If 

SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfObject("swfname:=btnNew").Click

Set objVOLPage = SwfWindow("swfname:=MainForm").Page("index:=0")
BIZ_Common_SetVOLData objVOLPage, "E2E_ConvNoRefiARM"
Set objVOLPage = Nothing

'====== Go to Verifs/VOM ======
BIZ_Nav_OpenMenuItem "Verifs;VOM"
BIZ_VOM_SelectLiability "E2E_ConvNoRefiARM"
BIZ_VOM_SetVOMData "E2E_ConvNoRefiARM"

Set objMainForm = SwfWindow("swfname:=MainForm")
Set objVOMPage = objMainForm.Page("index:=0")

objVOMPage.WebButton("html id:=Button1").Click

Set objNewMortgageDialog = objMainForm.SwfWindow("swfname:=NewMortgageDialog")
GUI_Object_WaitTillExistX objNewMortgageDialog.SwfButton("swfname:=okBtn"), 10
objNewMortgageDialog.SwfButton("swfname:=okBtn").Click

Set objVOLPage           = Nothing
Set objVOMPage           = Nothing
Set objMainForm 		 = Nothing
Set objNewMortgageDialog = Nothing