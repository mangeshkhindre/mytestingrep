'@**************************************************************************************************
'@ TestCase: Build_Acceptance_Test
'@ Object Repository: "Encompass360.tsr","EncompassSetting.tsr", "EncompassLoan.tsr"
'@ Pre-conditions: Pipeline View  and loan folder must exist , Borrower name column must exist
'@ Description:  
	'@ Test Step
		'- 1) Login to Encompass Application using the following credentials:
                    'a.	User Name/Password:  Admin/password
                    'b.	The server name gets populated by default.  
 
       '- 2)  Encompass opens and ‘Home’ tab is automatically selected which displays the Encompass Home Page
       '- 3)  Go Pipe lines
              'a. Check if Loans are displayed
              'b. Doubleclick any loan and check if Loan details are displayed
       '- 4)  Create New blank loan and make sure it is displayed     
       '- 5)  Create new loan and populate Borrower orig Summary and 1003 pages. save. verify the date is saved 
       '- 6)  Re-open existing loan. Edit data and save. Verify if edited data is saved.       
	'@ Expected Result
		'- 1. User was able to login
		'- 2. Home page is displayed after log in
		'- 3. List of Loans is displayed in Pipeline tab. Loan details are displayed in the Loan tab after opening loan
		'- 4. New loan is displayed
		'- 5. New loan is created. dat is saved.
		'- 6. Data in existing loan can be edited
'************************************************************************************************** @@ hightlight id_;_7674088_;_script infofile_;_ZIP::ssf1.xml_;_
	FRM_RT_SetupTest(null)	
	
	'======== 1. Login to the Encompass as Admin in defaulted server========   
    FRM_Logger_ReportInfoEvent "Start Test Case 1","Login to Application", Null	
	BIZ_Login_UserLogin "admin_default"
	
	'======== 2. Verify if user gets to the Home Page after Login======== 
	FRM_Logger_ReportInfoEvent "Start Test Case 2","Home Page Validation", Null
	BIZ_HomePage_Validate
	 
	'======== 4. Create new loan========
	FRM_Logger_ReportInfoEvent "Start Test Case 4","Loan Create", Null
	BIZ_Pipeline_SelectPipelineViewAndLoanFolder PipelineView(), LoanFolder()
	BIZ_Loan_AddNewBlankLoan()
	 
	'======== 5. Enter Data and Save======== 
	FRM_Logger_ReportInfoEvent "Start Test Case 5","Save Loan Validation ", Null
	BIZ_BorrowerSummaryOrigination_SetBorrower "BVT_Login_BuildTest1"
    strMiddleName = "AUTO-" & UTIL_Date_FormatDateByPattern(now, "mmdd-HHnnss")
    FRM_RT_SetPropValue "BorrrMidName", strMiddleName
    GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*").WebEdit("html id:=TextBox10","index:=0"), strMiddleName
	BIZ_BorrowerSummaryOrigination_SetTransactionDetails "BVT_Login_BuildTest1"	 
	BIZ_BorrowerSummaryOrigination_SetProperty "BVT_Login_BuildTest1"	
	BIZ_1003Page1_SetData "BVT_Login_BuildTest1"
	BIZ_Loan_Save()
	BIZ_Loan_SaveLoanNumber()
	BIZ_Loan_Exit(False)
	BIZ_Login_UserLogout()
		
	'========Re-Login and Validate Saved Values========
	BIZ_Login_UserLogin "admin_default"	
	
    BIZ_Pipeline_SelectPipelineViewAndLoanFolder PipelineView(), LoanFolder()
	strBorrMName = FRM_RT_GetPropValue ("BorrrMidName", true)
	BIZ_Loan_OpenLoanByColFieldValue "Borrower Name", strBorrMName
        BIZ_Loan_UnlockLoanDialog
	BIZ_BorrowerSummaryOrigination_VerifyBorrower "BVT_Login_BuildTest1"
	BIZ_BorrowerSummaryOrigination_VerifyTransactionDetails "BVT_Login_BuildTest1"
    BIZ_1003Page1_VerifyProperty "BVT_Login_BuildTest1"
          
    '========6. Re-open existing loan. Edit e-mail field value. Save and verify if edited data is saved========
	FRM_Logger_ReportInfoEvent "Start Test Case 6","Edit and save the loan", Null
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*").WebEdit("html id:=l_1240","index:=0"), "bvt_auto@elliemae.com"
	BIZ_Loan_Save()
	BIZ_Loan_Exit(False)
    BIZ_Login_UserLogout()
    
	BIZ_Login_UserLogin "admin_default"	
    BIZ_Pipeline_SelectPipelineViewAndLoanFolder PipelineView(), LoanFolder()
	strBorrMName = FRM_RT_GetPropValue ("BorrrMidName", true)
	BIZ_Loan_OpenLoanByColFieldValue "Borrower Name", strBorrMName	
        BIZ_Loan_UnlockLoanDialog
    BIZ_Forms_Open "Borrower Summary - Origination"
    GUI_Object_ValidateValue SwfWindow("swfname:=MainForm").Page("title:=.*").WebEdit("html id:=l_1240","index:=0"), "bvt_auto@elliemae.com" ,"Home E-Mail"

	'======== 3. Open Pipeline Tab and select first loan in the list======== 
	'=== This Test Case moved to the end because there is possibility that test runs in the new environment where no one loan created yet==== 
	FRM_Logger_ReportInfoEvent "Start Test Case 3","Loan Open ", Null
	BIZ_Loan_SelectFirstLoanInTheList   
    '======== Verify if loan is opened======== 
    BIZ_Loan_IsOpened
	BIZ_Login_UserLogout
	
	FRM_RT_TeardownTest(null)
	
	
'==================================================================================
Function BIZ_HomePage_Validate()

	Set objTab = SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl")		
	GUI_Object_WaitTillEnabledX objTab,30
	GUI_Object_ValidateSelection objTab, "Home", "TabControl"
	
	
	Set objEle = SwfWindow("swfname:=MainForm").Page("index:=0").WebElement("innertext:=Welcome,.*","index:=0")
	'isHomePageExist = GUI_Object_WaitTillExistX(objEle, 30)
	
	If objEle.Exist(120) Then
		FRM_Logger_ReportPassEvent "Validate the Encompass Home Page", "Encompass opens and ‘Home’ tab is automatically selected which displays the Encompass Home Page", Null
	Else
		FRM_Logger_ReportFailEvent "Validate the Encompass Home Page", "The Encompass Home Page was not displayed", Null
		'FRM_RT_AddScreenshotToDoc "Encompass Home Page","Encompass Home Page Failed to display" 
	End If
End Function
	 
	 
	 
Function BIZ_Loan_SelectFirstLoanInTheList()
	BIZ_Pipeline_SelectPipelineViewAndLoanFolder PipelineView(), LoanFolder()
	Set objCmbLoans = SwfWindow("swfname:=MainForm").SwfComboBox("swfname:=cboPageList","index:=0")
	If objCmbLoans.Exist(120) Then
	   strNumberOfLoans = objCmbLoans.GetSelection
	End If
	If Not isNull(strNumberOfLoans) and cint(mid(trim(strNumberOfLoans),1,1)) > 0 Then
	   FRM_Logger_ReportPassEvent "Pipeline Tab", strNumberOfLoans & " loans are shown within the UI", Null 	
	Else
	   FRM_Logger_ReportFailEvent "Pipeline Tab", "No loans are shown within the UI", Null
	End If
	
	Set objFolderList =  SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfObject("swfname:=gvLoans", "index:=0")
    If NOT GUI_List_GetColumnIndexByTitle(objFolderList, "Borrower Name") = "" Then
	   objFolderList.DblClick 147,55
	   If Dialog("text:=Encompass","index:=0").WinButton("text:=&No","index:=0").Exist(3) Then
	   	  Dialog("text:=Encompass","index:=0").WinButton("text:=&No","index:=0").Click
	   End If
	   FRM_Logger_ReportInfoEvent "Pipeline Tab", "Selected Loan with any loan# and double click on it", Null
	Else
	   FRM_Logger_ReportWarnEvent "Pipeline Tab", "'Borrower Name' column not found", Null
    End If	
End Function



Function BIZ_Loan_IsOpened()
    Set objFormsTab = SwfWindow("swfname:=MainForm").SwfTab("swfname:=toolsFormsTabControl")
    
	If objFormsTab.Exist(120) Then
	   FRM_Logger_ReportPassEvent "Loan Tab", "Loan can be opened. Loans details are displayed.", Null 
    Else
       FRM_Logger_ReportFailEvent "Loan Tab", "Loan can NOT be opened. Loans details are Not displayed.", Null 
       'FRM_RT_AddScreenshotToDoc "Loan Tab","Could not open the loan"
	End If

End Function

Function BIZ_Loan_UnlockLoanDialog()
	
	if SwfWindow("swfname:=MainForm").SwfWindow("swfname:=UnlockLoanDialog").SwfButton("swfname:=btnUnlock", "index:=0").Exist(4) then
	   SwfWindow("swfname:=MainForm").SwfWindow("swfname:=UnlockLoanDialog").SwfButton("swfname:=btnUnlock", "index:=0").Click
	End If
	wait 5
	
End Function

Function PipelineView()
   PipelineView = "Super Administrator - Default View"
End Function

Function LoanFolder()
   LoanFolder = "My Pipeline"
End Function
