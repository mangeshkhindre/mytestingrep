'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix
'@ TestCase : PTAC-1826 FHANOCHOTREFIFIX Processing 5- Forms VOD,VOE, VOL
'@ Test Automation JIRA Task: PTAC-2880 E2E_5FHANoCHOTRefiFix_Processing
'@ TestData: 
	'1 Forms_VOD, SetVODData, E2E_FHANoCHOTRefiFix
	'2 Forms_VOE, SetVOEData, E2E_FHANoCHOTRefiFix
	'3 Forms_VOR, SetVORData, E2E_FHANoCHOTRefiFix
	'4 Forms_VOL, SetVOLData, E2E_FHANoCHOTRefiFix
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
    '1 Click on 'Forms' tab and click on 'VOD'
    '2 Click 'New verif' and select VOD is for borrower.Fill the date,name address, ph no, email id, account type, account number and balance
    '3 Now repeat step 2 for co-borrower. add account number and a checking account with 20,000$
    '4 Click on 'Forms' and click VOE
    '5 Click 'New verif' and select VOE is for borrower.Fill the date,badge id,business name business ph no, email id and date hired from borrower summary
    '6 Now repeat step 2 for co-borrower
    '7 Click on 'Forms' and click on 'VOL'
    '8 Under creditor select the first line and  select VOL is for borrower
    '9 Repeat the same for other 4 creditors
'@ ExpectedResult: 
    '1 Borrower and Co-borrower's VOD's should be added
    '2 Borrower and Co-borrower VOE'S should be added
    '3 VOL window will be shown.Should be able to select values
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1826","FHANOCHOTREFIFIX Processing 5- Forms VOD,VOE, VOL", Null

Dim objScroll,intCreditortcount,strCreditName,strCreditNumber,intCounter, objCreditorList, intCreditorNumber
Set objScroll  = SwfWindow("swfname:=MainForm").SwfScrollBar("swfname:=vPanelScrollBar")

'Updating the Borrower Details in the VOD form
BIZ_VOD_SetVODData "E2E_FHANoCHOTRefiFix_Borrower"

'Updating the Co-Borrower Details in the VOD form
BIZ_VOD_SetVODData "E2E_FHANoCHOTRefiFix_CoBorrower"

'Update the details in VOE Form
BIZ_VOE_SetVOEData "E2E_FHANoCHOTRefiFix"

'Update the details in VOE Form
BIZ_VOR_SetVORData "E2E_FHANoCHOTRefiFix"

'Open the VOL Form
BIZ_Forms_Open "VOL"
GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfLabel("swfname:=titleLbl","text:=VOL"), "VOL", "VOL page is opened"
GUI_Dialog_Encompass_YesX 25,""

Set objCreditorList = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfObject("swfname:=gridList")
intCounter          = 0
intCreditortcount   = GUI_List_GetNumberofRows(objCreditorList)

For intCreditorNumber = 0 To intCreditortcount-1 Step 1
	strCreditName     = GUI_List_GetCellData(objCreditorList, intCounter, 1)
	If (strCreditName <> "Other Liability") Then 
	    strCreditNumber = GUI_List_ClickRow(objCreditorList, objScroll, 0, strCreditName, True, False, False, "Double")
	   If (strCreditNumber = True) Then 
		   BIZ_Common_SetVOLData SwfWindow("swfname:=MainForm").Page("micClass:=Page") , "E2E_FHANoCHOTRefiFix"
		   intCounter = intCounter + 1
	   End If
	Else
		GUI_List_ClickOnCellData objCreditorList, 0, 0, True, False, False, "Double"
		SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfObject("swfname:=btnDelete").Click
		Wait g_TinyWaitSmall  'Due to Sync issue we are explicitly passing wait statement
		GUI_Dialog_Encompass_YesX 60, ""
	End If
Next

Set objScroll 		= Nothing
Set objCreditorList = Nothing