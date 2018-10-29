
'@**************************************************************************************************
'@ TestStory: CTA-370 - KBYO2 Automation
'@ TestCase: CTA-372 - TC03: KBYO2 End to End flow for Borrower vesting-NBO
'@ Test Automation JIRA Task: CTA-373 - E2E_KBYO2_BorrowerVesting_NBO
'@ TestData:	BorrowerSummaryOrigination, SetBorrower, "E2E_KBYO2_NBO"
'				BorrowerSummaryOrigination, SetCoBorrower, "E2E_KBYO2_NBO"
'				FileContacts, NonBorrowerOwner, "E2E_KBYO2_NBO"
'				
'@ Pre-conditions: NA
'@ Description:  
	'@ Test Step
	'1. Login to Encompass
	'2. Go to Forms>>Borrower Summary Origination. Input data.
	'3. Go to tools- File contacts. Enter data.
	
'@Expected Results
	'1. Go to Borrower Information vesting. Verify Vesting Information.
	'2. Verify added NBO synced to Vesting screen.
	'3. Verify "Connected to Borrower Pair".
	'4. Go to borrower Summary origination and verify that the 4008 dropdown is not having options listed in test data
	'5. Go to borrower Summary Processing and verify that the 4008 dropdown is not having options listed in test data
'******************************************************************************************************************************************

strRowID = "E2E_KBYO2_NBO"
FRM_Logger_ReportStepEvent "Start test case","KBYO2 Borrower Vesting NBO",Null

'======== Create new loan========
FRM_Logger_ReportInfoEvent "New Loan","Create New Loan", Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "", "Automation"

'===== Enter data in Borrower Summary Origination =======
BIZ_BorrowerSummaryOrigination_SetBorrower strRowID
BIZ_BorrowerSummaryOrigination_SetCoBorrower strRowID
BIZ_BorrowerSummaryOrigination_SetProperty strRowID
BIZ_BorrowerSummaryOrigination_SetTransactionDetails strRowID

'========== Enter data in file Contacts ==========
BIZ_FileContacts_NonBorrowerOwner strRowID

'============ Go to Borrower Information - Vesting ========
BIZ_Forms_Open "Borrower Information - Vesting"

Set objVestingInfo = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvVesting")
Set objFileContactData = FRM_DS_GetTestData("Tools_FileContacts", "NonBorrowingOwner", strRowID)
Set objBorrowerData = FRM_DS_GetTestData("Forms_BorrowerSummaryOrigination", "SetBorrower", strRowID)
Set objCoBorrowerData = FRM_DS_GetTestData("Forms_BorrowerSummaryOrigination", "SetCoBorrower", strRowID)

strName = FRM_DS_GetValue(objFileContactData, "NBOC0101.FirstName") + "  " + FRM_DS_GetValue(objFileContactData, "NBOC0103.LastName")
boolCheck = GUI_List_ClickRow (objVestingInfo,Null, "Name", strName, True, False, False, "Single")
If boolCheck Then
	FRM_Logger_ReportPassEvent "Verify Name","Name is showing correctly: " & strName , Null
else	
	FRM_Logger_ReportFailEvent "Verify Name","Name is not showing correctly: " & strName, Null
End If

strDOB = FRM_DS_GetValue(objFileContactData, "NBOC0116.DOB")
boolCheck = GUI_List_ClickRow (objVestingInfo,Null, "DOB", strDOB, True, False, False, "Single")
If boolCheck Then
	FRM_Logger_ReportPassEvent "Verify DOB","DOB is showing correctly: " & strDOB, Null
else	
	FRM_Logger_ReportFailEvent "Verify DOB","DOB is not showing correctly: " & strDOB, Null
End If

strType = FRM_DS_GetValue(objFileContactData, "VestingType")
boolCheck = GUI_List_ClickRow (objVestingInfo,Null, "Type", strType, True, False, False, "Single")
If boolCheck Then
	FRM_Logger_ReportPassEvent "Verify Type","Type is showing correctly: " & strType, Null
else	
	FRM_Logger_ReportFailEvent "Verify Type","Type is not showing correctly: " & strType, Null
End If

strBorrowerName = FRM_DS_GetValue(objBorrowerData, "FirstName") + " " + FRM_DS_GetValue(objBorrowerData, "LastName")
boolCheck = GUI_List_ClickRow (objVestingInfo,Null, "Name", strBorrowerName, True, False, False, "Single")
If boolCheck Then
	FRM_Logger_ReportPassEvent "Verify Borrower Name","Borrower Name is showing correctly: " & strBorrowerName, Null
else	
	FRM_Logger_ReportFailEvent "Verify Borrower Name","Borrower Name is not showing correctly: " & strBorrowerName, Null
End If

strBorrowerSSN = FRM_DS_GetValue(objBorrowerData, "SSN") 
boolCheck = GUI_List_ClickRow (objVestingInfo,Null, "SSN", strBorrowerSSN, True, False, False, "Single")
If boolCheck Then
	FRM_Logger_ReportPassEvent "Verify SSN","SSN is showing correctly: " & strBorrowerSSN, Null
else	
	FRM_Logger_ReportFailEvent "Verify SSN","SSN is not showing correctly: " & strBorrowerSSN, Null
End If

strBorrowerDOB = FRM_DS_GetValue(objBorrowerData, "DOB") 
boolCheck = GUI_List_ClickRow (objVestingInfo,Null, "DOB", strBorrowerDOB, True, False, False, "Single")
If boolCheck Then
	FRM_Logger_ReportPassEvent "Verify DOB","DOB is showing correctly: " & strBorrowerDOB, Null
else	
	FRM_Logger_ReportFailEvent "Verify DOB","DOB is not showing correctly: " & strBorrowerDOB, Null
End If

boolCheck = GUI_List_ClickRow (objVestingInfo,Null, "Type", "Individual", True, False, False, "Single")
If boolCheck Then
	FRM_Logger_ReportPassEvent "Verify Type","Individual Type is showing correctly", Null
else	
	FRM_Logger_ReportFailEvent "Verify Type","Individual Type is not showing correctly", Null
End If

strCoBorrowerName = FRM_DS_GetValue(objCoBorrowerData, "FirstName") + " " + FRM_DS_GetValue(objCoBorrowerData, "LastName")
boolCheck = GUI_List_ClickRow (objVestingInfo,Null, "Name", strCoBorrowerName, True, False, False, "Single")
If boolCheck Then
	FRM_Logger_ReportPassEvent "Verify Co-Borrower Name","Co-Borrower Name is showing correctly: " & strCoBorrowerName, Null
else	
	FRM_Logger_ReportFailEvent "Verify Co-Borrower Name","Co-Borrower Name is not showing correctly: " & strCoBorrowerName, Null
End If

strCoBorrowerDOB = FRM_DS_GetValue(objCoBorrowerData, "DOB")
boolCheck = GUI_List_ClickRow (objVestingInfo,Null, "DOB", strCoBorrowerDOB, True, False, False, "Single")
If boolCheck Then
	FRM_Logger_ReportPassEvent "Verify Co-Borrower DOB","Co-Borrower DOB is showing correctly: " & strCoBorrowerDOB, Null
else	
	FRM_Logger_ReportFailEvent "Verify Co-Borrower DOB","Co-Borrower DOB is not showing correctly: " & strCoBorrowerDOB, Null
End If

GUI_List_ClickRow objVestingInfo,Null, "Name", strName, True, False, False, "Double"
Set objBorrowerVesting = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=BorrowerVestingDetail")
strBorrowerPair = FRM_DS_GetValue(objBorrowerData, "FirstName") + " and " + FRM_DS_GetValue(objCoBorrowerData, "FirstName") + " " + FRM_DS_GetValue(objBorrowerData, "LastName")
strText = GUI_Object_GetPropertyValue (objBorrowerVesting.SwfComboBox("swfname:=cboBorPair"), "text")
FRM_VerifyEqual strText, strBorrowerPair, "Verify Borrower Pair", "Borrower Pair details are showing correctly"
GUI_SwfButton_Click objBorrowerVesting.SwfButton("swfname:=cancelBtn")

'============ Go to Borrower Summary - Origination ========
BIZ_Forms_Open "Borrower Summary - Origination"

strText = GUI_Object_GetPropertyValue (SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebList("html id:=DropdownBox5"),"outertext")
If instr(1,strText,"Title only",0) > 0 OR instr(1,strText,"Title Only Trustee",0) > 0 OR instr(1,strText,"Title Only Settler Trustee",0) > 0 Then
	FRM_Logger_ReportFailEvent "Verify Vesting Type options","Vesting Type options are showing", Null
Else
	FRM_Logger_ReportPassEvent "Verify Vesting Type options","Vesting Type options are not showing", Null
End If 

'============ Go to Borrower Summary - Processing ========
BIZ_Forms_Open "Borrower Summary - Processing"
strText = GUI_Object_GetPropertyValue (SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebList("html id:=DropdownBox4"),"outertext")
If instr(1,strText,"Title only",0) > 0 OR instr(1,strText,"Title Only Trustee",0) > 0 OR instr(1,strText,"Title Only Settler Trustee",0) > 0 Then
	FRM_Logger_ReportFailEvent "Verify Vesting Type options","Vesting Type options are showing", Null
Else
	FRM_Logger_ReportPassEvent "Verify Vesting Type options","Vesting Type options are not showing", Null
End If 

'============ Go to Construction Management ========
BIZ_Forms_Open "Construction Management"
GUI_WebCheckbox_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebCheckBox("html id:=__cid_CheckBox21_Ctrl"), "ON"
GUI_SwfTab_Click SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControlForm"),"Linked Loans"
GUI_WebButton_Click SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebButton("html id:=newlinkbutton")

Set objMainView = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TemplateSelectionDialog").SwfObject("swfname:=gvDirectory")
SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TemplateSelectionDialog").Activate
wait g_TinyWaitLarge 'Added for sync purpose
GUI_List_ClickRow objMainView,Null,"Name","Const-to-Perm Sync",True,False,False,"Single"
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TemplateSelectionDialog").SwfButton("swfname:=selectBtn")
GUI_Dialog_Encompass_Yes ""
GUI_WebButton_Click SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebButton("html id:=makecurrentbutton")
GUI_Dialog_Encompass_OK ""
GUI_Dialog_Encompass_OK ""

'============ Go to File Contacts ===========
BIZ_Tools_Open "File Contacts"

Set objMainView = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridViewContacts")
boolCheck = GUI_List_ClickRow (objMainView,Null,"Category/Role","Non-Borrowing Owner",True,False,False,"Single")
If boolCheck Then
	FRM_Logger_ReportPassEvent "Validate NBO","NBO is showing correctly for linked loan",Null
Else 
	FRM_Logger_ReportFailEvent "Validate NBO","NBO is not showing correctly for linked loan",Null
End If

BIZ_Loan_Exit False


