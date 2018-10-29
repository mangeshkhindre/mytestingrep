'@**************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase : PTAC-3166 FHAPURCHASEFIX - Processing 5- Forms VOD, VOE, VOR, VOL
'@ Test Automation JIRA Task: PTAC-3153 E2E_4FHAPURCASHFIX_Processing
'@ TestData: 
	'1 Forms_VOD, SetVODData, E2E_FHAPURCASHFIX
	'2 Forms_VOE, SetVOEData, E2E_FHAPURCASHFIX
	'3 Forms_VOR, SetVORData, E2E_FHAPURCASHFIX
	'4 Forms_VOL, SetVOLData, E2E_FHAPURCASHFIX
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click forms tab and click VOD.
	'2 click new verify and select VOD is for borrower. Fill the date,name address, ph no, email id.
	'3 Click forms and click VOE.
	'4 click new verif and select VOE is for borrower.
	'5 fill the date,badge id,business name business ph no, email id and date hired from borrower summary.
    '6 Click forms and click VOR
	'7 click new verif and select VOR is for borrower.
	'8 click forms and click VOL.
	'9 Under creditor select the first line and  select VOL is for borrower.
'@ ExpectedResult: 
	'1 Borrower VOD's should be added.
	'2 Borrower VOE's should be added.
	'3 Borrower VOR's should be added.
	'4 VOL window will be shown. Should be able to select values.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-3166","FHAPURCHASEFIX - Processing 5- Forms VOD, VOE, VOR, VOL", Null

Dim objCreditorList,objScroll, intCounter, intCreditortcount, strCreditName, strCreditNumber
Set objCreditorList = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridList")
Set objScroll 		= SwfWindow("swfname:=MainForm").SwfScrollBar("swfname:=vPanelScrollBar")

'Updating the Borrower Details in the VOD form
BIZ_VOD_SetVODData "E2E_FHAPURCASHFIX_Borrower"

'Updating the Co-Borrower Details in the VOD form
BIZ_VOD_SetVODData "E2E_FHAPURCASHFIX_CoBorrower"

'Update the details in VOE Form
BIZ_VOE_SetVOEData "E2E_FHAPURCASHFIX"

'Update the details in VOE Form
BIZ_VOR_SetVORData "E2E_FHAPURCASHFIX"

'Open the VOL Form
BIZ_Forms_Open "VOL"
GUI_Dialog_Encompass_YesX 25,""

Set objCreditorList = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfObject("swfname:=gridList")
intCounter = 0
intCreditortcount = GUI_List_GetNumberofRows(objCreditorList)

For CreditorNumber = 0 To intCreditortcount-1 Step 1
	strCreditName = GUI_List_GetCellData(objCreditorList, intCounter, 1)
	
	If (strCreditName <> "Other Liability") Then 
		strCreditNumber = GUI_List_ClickRow(objCreditorList, objScroll, 0, strCreditName, True, False, False, "Double")
		
		If (strCreditNumber = True) Then 
			BIZ_Common_SetVOLData SwfWindow("swfname:=MainForm").Page("micClass:=Page") , "E2E_FHAPURCASHFIX"
			intCounter = intCounter + 1
		End If
	Else
		GUI_List_ClickOnCellData objCreditorList, 0, 0, True, False, False, "Double"
		SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfObject("swfname:=btnDelete").Click
		Wait g_TinyWaitSmall
		GUI_Dialog_Encompass_YesX 60, ""
	End If
Next

Set objScroll 		= Nothing
Set objCreditorList = Nothing