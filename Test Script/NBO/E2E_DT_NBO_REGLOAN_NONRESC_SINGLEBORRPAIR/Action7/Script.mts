FRM_Logger_ReportStepEvent "Create a new Non Rescendable Loan for Single Borrower Pair", "Started Creating a New Non Rescendable Loans", Null

'====== Navigate to pipeline and create a new loan ======  
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "Automation" 

'===== Append template to new loan ========   
BIZ_Loan_AppendDataTemplate "E2E_DT_NonResc_SingleBorr"
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetBorrowerIncome "E2E_DisclosureTracking"

'========== Go to Closing Disclosure Page 1 ==============
BIZ_Forms_Open "Closing Disclosure Page 1"
GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebEdit("html id:=I_748"), Date

BIZ_Forms_Open "RegZ - LE"
BIZ_RegZ_LE_SetDisclosureInformation "E2E_DisclosureTracking"
BIZ_RegZ_LE_SetLateChargeInformation "E2E_DisclosureTracking"

BIZ_Forms_Open "2015 Itemization"
BIZ_2015Itemization_Set900Section "E2E_DisclosureTracking"

'================Non Rescindable Setting==========
FRM_Logger_ReportStepEvent "Make Non-Rescindable Loan", "Making Non-Rescindable Loan", Null
BIZ_Forms_Open "Construction Management"
FRM_Logger_ReportInfoEvent "Secured by Curent Dwelling - CONST.X2 should be Checked ", "Secured by Curent Dwelling - CONST.X2 is Checked", Null
GUI_WebCheckBox_Set SwfWindow("swfname:=MainForm").Page("title:=.*").WebCheckBox("html id:=__cid_CheckBox14_Ctrl","index:=0"), "TRUE"

FRM_Logger_ReportInfoEvent "Non-Rescindable Transaction should be Checked ", "Non-Rescindable Transaction is Checked", Null
GUI_WebCheckBox_Set SwfWindow("swfname:=MainForm").Page("title:=.*").WebCheckBox("html id:=__cid_CheckBox15_Ctrl","index:=0"), "TRUE"

GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*").WebEdit("html id:=TextBox58"), "12"
GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*").WebEdit("html id:=TextBox15"), "01/10/2018"

'=============adding NBO to Borrower Pair=========
'========== Enter data in file Contacts ==========
FRM_Logger_ReportStepEvent "Start create a new Non-Borrowing Owner","Started creating a new NBO in File contacts and Adding Non-Borrowing Owner to Borrower Pair", Null
BIZ_FileContacts_NonBorrowerOwner "E2E_DT_NBO1"

'============ Go to Borrower Information - Vesting ========
BIZ_Forms_Open "Borrower Information - Vesting"

'========== select NBO and add to borrower pair=====
Set objVestingInfo = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvVesting")
Set objFileContactData = FRM_DS_GetTestData("Tools_FileContacts", "NonBorrowingOwner", "E2E_DT_NBO1")
Set objDataBorr = FRM_DS_GetTestData("Forms_BorrowerSummaryOrigination", "SetBorrower", "E2E_DisclosureTracking2")
Set objDataCoBorro = FRM_DS_GetTestData("Forms_BorrowerSummaryOrigination", "SetCoBorrower", "E2E_DisclosureTracking")	    
strBorrName=Trim(FRM_DS_GetValue(objDataBorr, "FirstName"))&" "&Trim(FRM_DS_GetValue(objDataBorr, "LastName"))    
strCoBorrName=Trim(FRM_DS_GetValue(objDataCoBorro, "FirstName"))&" "&Trim(FRM_DS_GetValue(objDataCoBorro, "LastName"))
strBorrPair=strBorrName&" and "&strCoBorrName
	
strNBOName = FRM_DS_GetValue(objFileContactData, "NBOC0101.FirstName") + "  " + FRM_DS_GetValue(objFileContactData, "NBOC0103.LastName")   
FRM_Logger_ReportInfoEvent "Adding Non Borrowing Pair: "&strNBOName&" to Borrower Pair: "&strBorrPair, "Added Non Borrowing Pair: "&strNBOName&" to Borrower Pair: "&strBorrPair, Null
GUI_List_ClickRow objVestingInfo,Null, "Name", strNBOName, True, False, False, "Double"
Set objBorrowerVesting = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=BorrowerVestingDetail")
GUI_SwfComboBox_Select objBorrowerVesting.SwfComboBox("swfname:=cboBorPair"), strBorrPair
GUI_SwfButton_Click objBorrowerVesting.SwfButton("swfname:=okBtn")
Set objFileContactData=Nothing
Set objDataBorr=Nothing
Set objDataCoBorro=Nothing

'============ Save loan ============
BIZ_Loan_Save()
BIZ_Loan_SaveLoanNumber()
