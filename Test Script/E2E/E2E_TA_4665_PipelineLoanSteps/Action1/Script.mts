'@**************************************************************************************************
'@ Test Automation JIRA Task: TA-4665   TA-4657 Automate E2E Pipeline Loan steps
'@ Pre-conditions: BuildVerificationTest Loan Folder should exist
'@ Description:
'@ Test Steps
		'1	Login to Encompass  
		'2	Load Settings 
		'3	Close Settings Page 
		'4	Originate  a new loan from Pipeline 
		'5	Edit Loan 
		'6	Save Loan 
		'7	Order Credit Report 
		'8	Cancel Credit Report 
		'9	Import a Loan
		'10	Duplicate a Loan 
		'11	Move to Folder 
		'12	Delete  a Loan 
		'13	Tools Disclosure Tracking - Create a disclosure Tracking record 
		'14	Loan Transfer 
		'15	Show All Forms 
		'16	Home Page 
		'17	Tabs - Loan/Trade/Contacts/Dashboards/Reports
		'18 Peform Load Form Validations and Button checks 
		'19	Loan Reassignment
'**************************************************************************************************

	FRM_RT_SetupTest(null)
	
    '1 Login to Encompass
    FRM_Logger_ReportInfoEvent "Start Step Login","Login to Application", Null		
	BIZ_Login_UserLogin "admin_default"
	
	'Check if Loan Folder exists. If does not exist then create and relogin.
	VerifyLoanFolderAndCreateIfNotExist FolderMoveTo()
	
	'2 Load Settings & 3 Close Settings Page
	FRM_Logger_ReportInfoEvent "Start Step 'Setting' page test","Case Encompass - Setting Page", Null
	LoadAndCloseSettingPage
	
	'Go to Settings -> Docs Setup -> eDisclosure Stacking Templates and select "Default" template
    FRM_Logger_ReportInfoEvent "Select default eDisclosure Stacking Template","Select default template as: Default Stacking Template - eDisclosures", Null
    BIZ_Nav_HierarchyTree "Docs Setup", "eDisclosure Stacking Templates"
    Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
    GUI_List_ClickRow objSettings.SwfObject("swfname:=gvStackingOrders"),Null,"Name","Default Stacking Template - eDisclosures",True,False,False,"Single"
    boolEnabled = GUI_Object_IsEnabled (objSettings.SwfButton("swfname:=btnSetAsDefault"))
    If boolEnabled = True Then
    	GUI_SwfButton_Click objSettings.SwfButton("swfname:=btnSetAsDefault")
    End If  
    BIZ_Nav_Settings_Close
   
    BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View", "My Pipeline"
   	
	'9 Import a Loan
   	FRM_Logger_ReportInfoEvent "Start Step 'Import Loan' test","Case Import FNMA Loan", Null
    ImportLoan FNMAFilePath() '"FNMA-PipelineLoanStepsTest.fnm"
    
	'7 Order Credit Report & 8 Cancel Credit Report
    FRM_Logger_ReportInfoEvent "Start Step 'Credit Order' test","Case Initialize and cancel credit", Null
    VerifyCreditOrderDialog
    
	'10 Duplicate a Loan
    FRM_Logger_ReportInfoEvent "Start Step 'Duplicate Loan' test","Case Duplicate Loan", Null
    DuplicateLoan
    
	'14 Loan Transfer
    FRM_Logger_ReportInfoEvent "Start Step 'Transfer Loan' test","CaseTransfer Loan", Null
    Transfer
    
	'11 Move to Folder
    FRM_Logger_ReportInfoEvent "Start Step 'Move Loan' test","Case Move Loan", Null
    MoveLoan
    
	'12	Delete  a Loan
    FRM_Logger_ReportInfoEvent "Start Step 'Delete Loan' test","Case Delete Loan", Null
    DeleteLoan
    
	'4	Originate  a new loan from Pipeline & 5 Edit Loan & 6	Save Loan 
    FRM_Logger_ReportInfoEvent "Start Step 'New Loan' test","Case Create & Update Loan", Null
    CreateNewLoan
    
	'13	Tools Disclosure Tracking - Create a disclosure Tracking record
'    FRM_Logger_ReportInfoEvent "Start Step 'Send Disclosure' test","Case Send Disclosure", Null
'    CompleteSendDisclosure
    
  '18 Peform Load Form Validations and Button checks 
    '======= Load Form Validations =======
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3321","Load Form Validations", Null
	'BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","My Pipeline"
	BIZ_Forms_Open "1003 Page 1"
	BIZ_Forms_Open "1003 Page 1"

	'======= Loan Form -Button checks =======
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3323","Loan Form - Button checks", Null
	Forms_1003Page1_ButtonCheckValidation()
	Forms_1003Page1_ButtonCheckValidation()
	'BIZ_Loan_Exit False  
	
	'15	Show All Forms
    FRM_Logger_ReportInfoEvent "Start Step 'Show All Forms' test","Case Show All Forms", Null
    VerifyFormsShowAll
    
    '17 Tabs - Loan/Trade/Contacts/Dashboards/Reports & 16 Home Page
    FRM_Logger_ReportInfoEvent "Start Step 'Tabs' test","Case Verify Tabs", Null
    VerifyTabs
    
    BIZ_Login_UserLogout()
    
    '19 Peform Load Reassignment 
    '======= Loan Reassignment =======
	RunAction "PTAC-3214_LoanReassignment", oneIteration
	
	FRM_RT_TeardownTest(null)
	
    'In case we need to order actual credit or DU we can implement this:
    'BIZ_Services_OrderCredit "Equifax Mortgage Solutions","999EL31714","00vGdxXrjdFfg"
    'BIZ_Services_RequestUnderwriting "FNMA_DU1"


'===================================================================================
'Verify tab existence and open tabs under test
Function VerifyTabs()
	TabToOpen "Contacts", "Contacts View"
	TabToOpen "Dashboard", "Dashboard View"
	TabToOpen "Trades", "Trades View"
	TabToOpen "Loan", "Borrowers"
	TabToOpen "Reports", "Reports"	
	TabToOpen "Home","Encompass Home Page"
End Function    

'reusable function to open tab
Function TabToOpen(strTab,strToCheck)
    BIZ_Nav_SelectTabControl strTab
	If strTab = "Loan" Then
	   Set objToTest = SwfWindow("swfname:=MainForm").SwfObject("swfname:=pnlHeader").SwfLabel("text:="&strToCheck,"index:=0") 	
	ElseIf strTab = "Reports" Then
	   Set objToTest = SwfWindow("swfname:=MainForm").SwfObject("swfname:=ReportMainControl").SwfObject("swfname:=gcListView","text:="&strToCheck&".*") 
	ElseIf strTab = "Home" Then
	    Set objToTest = SwfWindow("swfname:=MainForm").Page("title:="&strToCheck)
	ElseIf strTab = "Trades" Then
		GUI_Dialog_Encompass_No ""
		Set objToTest = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gradientPanel1").SwfLabel("text:="&strToCheck,"index:=0")
	Else
		Set objToTest = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gradientPanel1").SwfLabel("text:="&strToCheck,"index:=0")
	End If
	
	If strTab = "Dashboard" Then
	    If SwfWindow("swfname:=MainForm").Dialog("Micclass:=Dialog").WinButton("text:=OK", "index:=0").Exist(5) Then
	    	SwfWindow("swfname:=MainForm").Dialog("Micclass:=Dialog").WinButton("text:=OK", "index:=0").Click	
	    End If
		If SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DashboardViewTemplateFormDialog").SwfButton("text:=Cancel","Index:=0").Exist(5) Then
			SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DashboardViewTemplateFormDialog").SwfButton("text:=Cancel","Index:=0").Click	
		End If
	End If
	If objToTest.Exist(60) Then
		FRM_Logger_ReportPassEvent "Open Tab " &strTab,"Opened Tab " &strTab , Null  	
    Else
        FRM_Logger_ReportFailEvent "Open Tab " &strTab,"NOT Opened Tab " &strTab , Null     
	End If
	
End Function


'verify if Show All checkbox chnages numbers of forms in the list
Function VerifyFormsShowAll()
    GUI_list_Select SwfWindow("swfname:=MainForm").SwfTab("swfname:=toolsFormsTabControl"), "Forms"
    Set objForms = SwfWindow("swfname:=MainForm").SwfTab("swfname:=toolsFormsTabControl")
    GUI_SwfCheckbox_Set SwfWindow("swfname:=MainForm").SwfCheckBox("swfname:=allFormBox"), "OFF"
    intFormsCountBefore = cint(objForms.SwfList("swfname:=emFormMenuBox","index:=0").GetItemsCount)
    BIZ_Forms_ShowAll
    intFormsCountAfter = cint(objForms.SwfList("swfname:=emFormMenuBox","index:=0").GetItemsCount)	
    If intFormsCountAfter >= intFormsCountBefore Then
       FRM_Logger_ReportPassEvent "Show All Forms","CheckBox 'Show All Forms works. Showed forms before click: " & intFormsCountBefore & "; Showed Forms after click: " & intFormsCountAfter , Null  	
'    ElseIf intFormsCountAfter = intFormsCountBefore Then
'       FRM_Logger_ReportWarnEvent "Show All Forms","CheckBox 'Show All Forms may be broken. Number of forms did not change. Showed forms before click: " & intFormsCountBefore & "; Showed Forms after click: " & intFormsCountAfter , Null  	
    Else
       FRM_Logger_ReportFailEvent "Show All Forms","CheckBox 'Show All Forms DOES NOT work. Showed forms before click: " & intFormsCountBefore & "; Showed Forms after click: " & intFormsCountAfter , Null   
    End If
    BIZ_Forms_Open "Additional Requests Information"
End Function
    
    
'complete disclosure process    
Function CompleteSendDisclosure()

	'======== Settings->Additional Services->eDisclosure Fulfillment ========
	BIZ_Nav_Settings_eDisclosureFulfillment()
	
	'======== Make sure Fulfillment Service is stopped/Started ========
	BIZ_eDisclosureFulfillment_Service "Stop"
	BIZ_Nav_Settings_Close()
	
	BIZ_Nav_eFoler_Open()
	BIZ_Documents_SendeDisclosure "E2E_DisclosureTracking", "E2E_DisclosureTracking", "E2E_DisclosureTracking"
	GUI_Window_Close SwfWindow("swfname:=eFolderDialog")
	BIZ_Tools_Open "Disclosure Tracking"	
    Set objDisclosureHistory = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvHistory")
    GUI_List_ValidateCellData objDisclosureHistory, 0, "Method", "eFolder eDisclosures"
    GUI_List_ValidateCellData objDisclosureHistory, 0, "Disclosure Type", "Initial"
    GUI_List_ValidateCellData objDisclosureHistory, 0, "LE Sent?", "Yes"
    
    BIZ_Loan_Save()
    
	Set objDisclosureHistory = Nothing
    
	
End Function
 
 'creates new loan for test
Function CreateNewLoan ()

	BIZ_Nav_SelectPipelineTab()
	BIZ_Loan_AddNewBlankLoan()
	BIZ_Loan_SwitchFormVersion "RESPA-TILA 2015 LE and CD"
	BIZ_Forms_Open "Borrower Summary - Origination"
	Wait 10
	BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_DTrackingPipelineSteps"
	BIZ_BorrowerSummaryOrigination_SetProperty "E2E_DisclosureTracking"
	BIZ_BorrowerSummaryOrigination_SetTransactionDetails "E2E_DisclosureTracking"
	BIZ_BorrowerSummaryOrigination_SetBorrowerIncome "E2E_DisclosureTracking"
	BIZ_1003Page3_SetDeclarations "Shared_Declarations1"
	BIZ_Forms_Open "2015 Itemization"
	Wait 10
	BIZ_2015Itemization_Set900Section "E2E_DisclosureTracking"	
	BIZ_USDAMangement_SelectInterestBasisDays "Shared_InterestBasisDays"	
	BIZ_Forms_Open "RegZ - LE"
	Wait 10
	BIZ_RegZ_LE_SetDisclosureInformation "E2E_DisclosureTracking"
    BIZ_RegZ_LE_SetLateChargeInformation "E2E_PipelineLoanSteps" 
    BIZ_Forms_Open "Closing Disclosure Page 1"
    GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebEdit("html id:=I_748"), Date
	BIZ_Loan_Save()
	BIZ_Loan_SaveLoanNumber()

End Function 
 
 'verify credit dialog
Function VerifyCreditOrderDialog()
    BIZ_Forms_Open "Borrower Summary - Origination"
    Wait 20
    GUI_WebButton_Click SwfWindow("swfname:=MainForm").Page("index:=0").WebButton("name:=Order Credit")
    Set objCreditDialog = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=OrderDialog")
    If objCreditDialog.SwfTab("swfname:=orderTab","index:=0").Exist(60) Then
    	cnt = objCreditDialog.SwfTab("swfname:=orderTab","index:=0").GetItemsCount	
    	If cint(cnt) = 2 Then
    	   strTab1  = objCreditDialog.SwfTab("swfname:=orderTab","index:=0").GetItem(0)	
    	   strTab2  = objCreditDialog.SwfTab("swfname:=orderTab","index:=0").GetItem(1)	
    	   FRM_Logger_ReportPassEvent "Credit Report Dialog","Dialog has tabs: " & cnt , Null
    	   If strTab1 = "My Providers" and strTab2 = "All Providers" Then
    	   	  FRM_Logger_ReportPassEvent "Credit Report Dialog","Dialog has tabs labels: " & strTab1 & ";" & strTab2 , Null
    	   Else
              FRM_Logger_ReportFailEvent "Credit Report Dialog","Dialog has tabs labels: " & strTab1 & ";" & strTab2 , Null     	   
    	   End If
    	Else
    	   FRM_Logger_ReportFailEvent "Credit Report Dialog","Dialog has tabs: " & cnt , Null
    	End If
    	
    	GUI_SwfButton_Click objCreditDialog.SwfButton("swfname:=cancelBtn1","index:=0")
    	wait 1
    	If not objCreditDialog.SwfTab("swfname:=orderTab","index:=0").Exist(5) Then
    		FRM_Logger_ReportPassEvent "Credit Report Dialog Cancelled","Dialog disapeared" , Null
    	Else
            FRM_Logger_ReportFailEvent "Credit Report Dialog Cancelled","Dialog did not disapear" , Null   	
    	End If
    	
    Else
       FRM_Logger_ReportFailEvent "Credit Report Dialog","No creadit dialog appeared" , Null
    End If
    BIZ_Loan_Save 
   	
End Function     
    
 'transfer loan
Function Transfer()

    BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View", "My Pipeline"
    'intNumberOfLoansBeforeTransfer = cint(BIZ_Pipeline_GetNumberOfLoansInPipeline()) 
    intNumberOfLoansBeforeTransfer = Fix(CDBL((BIZ_Pipeline_GetNumberOfLoansInPipeline())))
    BIZ_Pipeline_TransferLoan "3010000024","","Test Subject","Test Message"
    intNumberOfLoansAfterTransfer = cint(BIZ_Pipeline_GetNumberOfLoansInPipeline()) 
    If intNumberOfLoansBeforeTransfer = intNumberOfLoansAfterTransfer Then
    	FRM_Logger_ReportPassEvent "Transfer Loan performed","Loan Count in folder not changed " & intNumberOfLoansAfterTransfer , Null	
    Else
        FRM_Logger_ReportFailEvent "Transfer Loan performed","Loan Count in  folder changed. Before " & intNumberOfLoansBeforeTransfer & ". After Transfer:  " & intNumberOfLoansAfterTransfer , Null	    
    End If
	
End Function 
 
 
 
 'move loan   
Function MoveLoan()

    BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View", FolderMoveTo()
    intNumberOfLoansBeforeMoveinTo = cint(BIZ_Pipeline_GetNumberOfLoansInPipeline())
    BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View", "My Pipeline"
    intNumberOfLoansBeforeMoveinFrom = cint(BIZ_Pipeline_GetNumberOfLoansInPipeline()) 
    BIZ_Pipeline_MoveToFolder FolderMoveTo()
    intNumberOfLoansAfterMoveinFrom = cint(BIZ_Pipeline_GetNumberOfLoansInPipeline()) 
    BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View", FolderMoveTo()
    intNumberOfLoansAfterMoveinTo= cint(BIZ_Pipeline_GetNumberOfLoansInPipeline()) 
    intDiffTo = intNumberOfLoansAfterMoveinTo - intNumberOfLoansBeforeMoveinTo
    intDiffFrom = intNumberOfLoansBeforeMoveinFrom - intNumberOfLoansAfterMoveinFrom
    If intDiffTo = 1 and intDiffFrom = 1 Then
    	FRM_Logger_ReportPassEvent "Move Loan performed","Loan Count in Move To folder increased by " & intDiffTo & ". Loan Cound in Move From folder decreased by  " & intDiffFrom , Null	
    Else
        FRM_Logger_ReportFailEvent "Move Loan performed","Loan Count in Move To folder increased by " & intDiffTo & ". Loan Cound in Move From folder decreased by  " & intDiffFrom , Null	    
    End If
	
End Function 

'delete loan
Function DeleteLoan()
	BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View", FolderMoveTo()
    intNumberOfLoansBeforeDelete = cint(BIZ_Pipeline_GetNumberOfLoansInPipeline())
    BIZ_Loan_DeleteLoan
    intNumberOfLoansAfterDelete = cint(BIZ_Pipeline_GetNumberOfLoansInPipeline())
    intDlDiff = intNumberOfLoansBeforeDelete - intNumberOfLoansAfterDelete
    FRM_Logger_ReportInfoEvent "Delete Loan","Delete Loan dialog box opened during the process with the message 'Are you sure you want to delete...?'. Options Yes and No are available"  , Null
    If intDlDiff = 1 Then
    	FRM_Logger_ReportPassEvent "Delete Loan performed","Loan Count decreased by " & intDlDiff  , Null	
    Else
        FRM_Logger_ReportFailEvent "Delete Loan performed","Loan Count decreased by "& intDlDiff  , Null	    
    End If
End Function
        
              
'duplicate loan    
Function DuplicateLoan()    
    BIZ_Nav_SelectPipelineTab
    BIZ_Pipeline_DuplicateLoan "My Pipeline",  "Duplicate", "","Yes"
    SaveDuplicatedLoan()
End Function

'save duplicated loan    
Function SaveDuplicatedLoan()
    BIZ_Forms_Open "Borrower Summary - Origination"
    Wait 20
    Set objOrigPage = SwfWindow("swfname:=MainForm").Page("title:=.*") 
	If objOrigPage.WebEdit("html id:=l_36","index:=0").Exist(2) Then
	    GUI_WebEdit_Set objOrigPage.WebEdit("html id:=l_36","index:=0"), "Alice"
	    strLoanNo =  objOrigPage.WebEdit("html id:=l_364","index:=0").GetROProperty("value")
	    FRM_RT_SetPropValue g_FRM_Prop_LoanNo, strLoanNo
	    BIZ_Loan_Save    
        FRM_Logger_ReportInfoEvent "Duplicated Loan Saved with Loan Number", strLoanNo, null	    
    End If
End Function    

'import loan
Function ImportLoan(strFilePath)
    LoanImport_SelectFNMimport "No template required"
    UTIL_File_SetFolderAndFilesPermissionNotReadOnly FRM_RT_DataDirPath()
    UTIL_File_DeleteFiles FRM_RT_ReportDirPath() , "Copy_"
    BIZ_Nav_SelectPipelineTab
    prfx = UTIL_Date_FormatDateByPattern(now, "ddmmyyHHnnss")
    strFirstName = "Alice_"&prfx
    destFile = FNMADestFilePath(prfx)
	srcFile = FNMAFilePath()
	UTIL_File_Copy srcFile, destFile, false
	UTIL_File_ReplaceTextInFile destFile,"Alice",strFirstName
	intNumberOfLoansBeforeImport = cLng(BIZ_Pipeline_GetNumberOfLoansInPipeline())
    BIZ_Pipeline_ImportFNMAFile destFile,"My Pipeline"
    Wait 10
    UTIL_File_DeleteFiles FRM_RT_ReportDirPath() , "Copy_"
    intNumberOfLoansAfterImport = Fix(cLng(BIZ_Pipeline_GetNumberOfLoansInPipeline()))
    Wait 10
    intDiff = intNumberOfLoansAfterImport - intNumberOfLoansBeforeImport
    BIZ_Loan_OpenLoanByColFieldValue "Borrower Name", strFirstName
'    BIZ_Loan_SearchLoanByColumnValue "Borrower Name", strFirstName
    If intDiff = 1 Then
    	FRM_Logger_ReportPassEvent "Imported Loan","Loan Count increased by " & intDiff & ". Loan Borrower First Name: " & strFirstName , Null	
    Else
        FRM_Logger_ReportFailEvent "Imported Loan","Loan Count increased by "& intDiff &". Loan Borrower First Name: " & strFirstName , Null	    
    End If
    
End Function
    
'setting page validation   
Function LoadAndCloseSettingPage()
	BIZ_Settings_ExpandTreeView "Settings Overview"
    Set objMain = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
    If objMain.Exist(2) Then
    	FRM_Logger_ReportPassEvent "Load Setting Page","Setting Page is loaded", Null	
        GUI_SwfButton_Click objMain.SwfButton("swfname:=btnClose", "index:=0")
        wait 2
        If Not objMain.Exist(2) then
           FRM_Logger_ReportPassEvent "Close Setting Page","Setting Page is closed", Null	
        Else
           FRM_Logger_ReportFailEvent "Close Setting Page","Setting Page is NOT closed", Null 
        End If 
    
    Else
        FRM_Logger_ReportFailEvent "Load Setting Page","Setting Page is NOT loaded", Null	    
    End If  
End Function
 
'setting data
Function FNMAFilePath()
	FNMAFilePath = FRM_RT_DataDirPath() & "FNMA-PipelineLoanStepsTest.fnm"
End Function

Function FNMADestFilePath(prfx)
    prfx = "Copy_"&prfx&"_"
	FNMADestFilePath = FRM_RT_ReportDirPath() & prfx & "FNMA-PipelineLoanStepsTest.fnm"
End Function
    
Function FolderMoveTo()
	FolderMoveTo = "BuildVerificationTest"
End Function

Function VerifyLoanFolderAndCreateIfNotExist(strFolderName)
    BIZ_Nav_SelectPipelineTab()
	GUI_Object_WaitTillExistX SwfWindow("swfname:=MainForm").SwfComboBox("swfname:=cboFolder"),60
	strList = SwfWindow("swfname:=MainForm").SwfComboBox("swfname:=cboFolder").GetROProperty("all items")
	If instr(strList,strFolderName) = 0  Then
		BIZ_Settings_CreateNewLoanFolder(strFolderName)
		BIZ_Login_UserLogout()
		BIZ_Login_UserLogin "admin_default"
	End If
End Function
'This function is used to select "No template required" under Loan Templates>>Loan Template Sets
'@code
'    LoanImport_SelectFNMimport(strVal)
'@endcode
'@param strVal - Value of FNM file import dropdown under Loan Templates>>Loan Template Sets
Function LoanImport_SelectFNMimport(strVal)
	Dim objSettingWindow
	Set objSettingWindow = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
	FRM_Logger_ReportInfoEvent "Select FNM file import", "Select FNM file import as '"&strVal&"'", Null
	BIZ_Nav_HierarchyTree "Loan Templates","Loan Template Sets"
	GUI_SwfComboBox_Select objSettingWindow.SwfComboBox("swfname:=cboFannieMae"), strVal
	BIZ_Settings_ClickClose()
	Set objSettingWindow = Nothing
End Function
