'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase : PTAC-3200 CONVCASHOUTREFIFIX - Processing 5- Forms VOD,VOE, VOL
'@ Test Automation JIRA Task: PTAC-3374 E2E_3CONVCASHOUTREFIFIX_Processing
'@ TestData: Loans, Milestone, E2E_ConvNoRefiARM_Processing
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   'Step1:
   '1 Click on 'Forms' tab and click on 'VOD'.
   '2 Click 'New verif' and select VOD is for borrower.
   '3 Fill the date,name address, ph no, email id, account type, account number and balance.
   '4 Now repeat step 2 for co-borrower. add account number and a checking account with 20,000$
   'Step2:
   '1 Click on 'Forms' and click VOE.
   '2 Click 'New verif' and select VOE is for borrower.
   '3 Fill the date,badge id,business name business ph no, email id and date hired from borrower summary.
   '4 Now repeat step 2 for co-borrower
   'Step3:
   '1 Click on 'Forms' and click on 'VOL'.
   '2 Under creditor select the first line and  select VOL is for borrower.
   '3 Repeat the same for other 4 creditors.
'@ ExpectedResult: 
   '1 Borrower and Co-borrower's VOD's should be added. 
   '2 Borrower and Co-borrower VOE'S should be added.
   '3 VOL window will be shown.
   '4 Should be able to select values.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-3200","CONVCASHOUTREFIFIX - Processing 5- Forms VOD,VOE, VOL", Null

Dim objCreditorList, intItemsFound, intCounter, intCreditortcount, strCreditName, strCreditNumber

'Updating the Borrower Details in the VOD form
BIZ_VOD_SetVODData "E2E_ConvNoRefiARM_Borrower"

'Updating the Co-Borrower Details in the VOD form
BIZ_VOD_SetVODData "E2E_ConvNoRefiARM_CoBorrower"

'Update the details in VOE Form
BIZ_VOE_SetVOEData "E2E_ConvNoRefiARM"

'Update the details in VOR Form
BIZ_VOR_SetVORData "E2E_ConvNoRefiARM"

'Open the VOL Form
BIZ_Forms_Open "VOL"
GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfLabel("swfname:=titleLbl","text:=VOL"), "VOL", "VOL page is opened"
GUI_Dialog_Encompass_YesX 5,""

Set objCreditorList = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfObject("swfname:=gridList")
intItemsFound = 0
intCounter = 0
intCreditortcount = GUI_List_GetNumberofRows(objCreditorList)

For CreditorNumber = 0 To intCreditortcount-1 Step 1
	strCreditName = GUI_List_GetCellData(objCreditorList, Counter, 1)
	
	If(strCreditName <> "Other Liability") Then 
	   strCreditNumber = GUI_List_ClickRow(objCreditorList, Null, 0, strCreditName, True, False, False, "Double")
		
	   If(strCreditNumber = True) Then 
		  BIZ_Common_SetVOLData SwfWindow("swfname:=MainForm").Page("micClass:=Page") , "E2E_ConvNoRefiARM"
		  Counter = Counter + 1
	   End If
	Else
	   GUI_List_ClickOnCellData objCreditorList, 0, 0, True, False, False, "Double"
	   SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfObject("swfname:=btnDelete").Click
	   Wait g_TinyWaitSmall
	   GUI_Dialog_Encompass_YesX 60, ""
	End If
Next

Set objCreditorList = Nothing
