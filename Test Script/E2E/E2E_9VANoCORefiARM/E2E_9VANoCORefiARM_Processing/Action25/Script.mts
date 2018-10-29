'@******************************************************************************************
'@ TestStory:  PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase: PTAC-2333 -Processing 5- Forms VOD, VOE, VOR, VOL
'@ Test Automation JIRA Task: PTAC-2897 - E2E_9VANoCORefiARM_Processing
'@ TestData: 
	'1 Forms_VOD, SetVODData and E2E_VANoCORefiARM
	'2 Forms_VOE, SetVOEData and E2E_VANoCORefiARM
	'3 Forms_VOR, SetVORData and E2E_VANoCORefiARM
	'4 Forms_VOL, SetVOLData and E2E_VANoCORefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click forms tab and click VOD.
	'2 click new verif and select VOD is for borrower. Fill the date,name address, ph no, email id.
	'3 Now repeat step 2 for co-borrower. add account number and any checking account with 20,000$.
	'4 Click forms and click VOE. click new verif and select VOE is for borrower.
	'5 fill the date,badge id,business name business ph no, email id and date hired from borrower summary.
	'6 Now repeat step 2 for co-borrower
	'7 Click forms and click VOR. click new verif and select VOR is for borrower.
	'8 click forms and click VOL.
	'9 under creditor select the first line and  select VOL is for borrower.
	'10 Repeat the same for other 4 creditors.
'@ ExpectedResult: 
	'1 borrower and co-borrower VOD's should be added.
	'2 Borrower and co-borrower VOE'S should be added.
	'3 Borrowers VOR should be added.
	'4 VOL window will be shown.
	'5 should be able to select values.
'********************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2333","Processing 5- Forms VOD, VOE, VOR, VOL", Null

Dim objCreditorList,objScroll, intItemsFound, intCounter, intCreditortcount, intCreditorNumber, strCreditName, strCreditNumber
Set objScroll 		= SwfWindow("swfname:=MainForm").SwfScrollBar("swfname:=vPanelScrollBar")

'Updating the Borrower Details in the VOD form
BIZ_VOD_SetVODData "E2E_VANoCORefiARM_Borrower"

'Updating the Co-Borrower Details in the VOD form
BIZ_VOD_SetVODData "E2E_VANoCORefiARM_CoBorrower"

'Update the details in VOE Form
BIZ_VOE_SetVOEData "E2E_VANoCORefiARM"

'Update the details in VOE Form
BIZ_VOR_SetVORData "E2E_VANoCORefiARM"

'Open the VOL Form
BIZ_Forms_Open "VOL"
GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfLabel("swfname:=titleLbl","text:=VOL"), "VOL", "VOL page is opened"
GUI_Dialog_Encompass_YesX 25,""

Set objCreditorList = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfObject("swfname:=gridList")
intItemsFound = 0
intCounter = 0
intCreditortcount = GUI_List_GetNumberofRows(objCreditorList)
For intCreditorNumber = 0 To intCreditortcount-1 Step 1
	strCreditName = GUI_List_GetCellData(objCreditorList, intCounter, 1)
	
	If (strCreditName <> "Other Liability") Then 
		strCreditNumber = GUI_List_ClickRow(objCreditorList, objScroll, 0, strCreditName, True, False, False, "Double")
		
		If(strCreditNumber = True) Then 
			BIZ_Common_SetVOLData SwfWindow("swfname:=MainForm").Page("micClass:=Page") , "E2E_VANoCORefiARM"
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