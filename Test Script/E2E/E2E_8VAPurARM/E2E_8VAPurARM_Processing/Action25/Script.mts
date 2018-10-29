﻿'@**************************************************************************************************
'@ TestStory:  PTAC-2398 - E2E_8VAPURARM
'@ TestCase:   PTAC-2168 - Processing 5- Forms VOD, VOE, VOR, VOL
'@ Test Automation JIRA Task: PTAC-2411 - E2E_8VAPURARM_Processing
'@ TestData: 
   '1 Forms_VOD, SetVODData, E2E_CONVPURARM
   '2 Forms_VOE, SetVOEData, E2E_CONVPURARM
   '3 Forms_VOR, SetVORData, E2E_CONVPURARM
   '4 Forms_VOL, SetVOLData, E2E_CONVPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   'Step1 Test Steps
	'1 Click forms and click VOD.
	'2 click new verif and select VOD is for borrower. Fill the date,name address, ph no, email id.
	'3 Now repeat step 2 for co-borrower. add account number and any checking account with 20,000$.
   'Step2 Test Steps
	'1 Click forms and click VOE.
	'2 click new verif and select VOE is for borrower.
	   'fill the date,badge id,business name business ph no, email id and date hired from borrower summary.
	'3 Now repeat step 2 for co-borrower
   'Step3 Test Steps
	'1 Click forms and click VOR
	'2 click new verif and select VOR is for borrower.
   'Step4 Test Steps
	'1 click forms and click VOD.
	'2 under creditor select the first line and  select VOL is for borrower.
	'3 Repeat the same for other 4 creditors.
'@ ExpectedResult: 
	'Borrower and co-borrower VOD's should be added.
	'Borrower and co-borrower VOE'S should be added.
	'Borrowers VOR should be added.
	'VOL window will be shown.
	'should be able to select values.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2168","TestCase Name - Processing 5- Forms VOD, VOE, VOR, VOL", Null

Dim objCreditorList,objScroll,intCounter,intCreditortcount
Set objCreditorList = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridList")
Set objScroll 		= SwfWindow("swfname:=MainForm").SwfScrollBar("swfname:=vPanelScrollBar")

'Updating the Borrower Details in the VOD form
BIZ_VOD_SetVODData "E2E_VAPURARM_Borrower"

'Updating the Co-Borrower Details in the VOD form
BIZ_VOD_SetVODData "E2E_VAPURARM_CoBorrower"

'Update the details in VOE Form
BIZ_VOE_SetVOEData "E2E_VAPURARM"

'Update the details in VOE Form
BIZ_VOR_SetVORData "E2E_VAPURARM"

'Open the VOL Form
BIZ_Forms_Open "VOL"
GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfLabel("swfname:=titleLbl","text:=VOL"), "VOL", "VOL page is opened"
GUI_Dialog_Encompass_YesX 25,""

Set objCreditorList = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfObject("swfname:=gridList")
intCounter        = 0
intCreditortcount = GUI_List_GetNumberofRows(objCreditorList)
For CreditorNumber = 0 To intCreditortcount-1 Step 1
	strCreditName = GUI_List_GetCellData(objCreditorList, intCounter, 1)
	If (strCreditName <> "Other Liability") Then 
	   strCreditNumber = GUI_List_ClickRow(objCreditorList, objScroll, 0, strCreditName, True, False, False, "Double")
		If (strCreditNumber = True) Then 
			BIZ_Common_SetVOLData SwfWindow("swfname:=MainForm").Page("micClass:=Page") , "E2E_VAPURARM"
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
