'@**************************************************************************************************
'@ TestStory: ENC-10540 FHA Maximum Mortgage Calculation Updates – Refinance
'@ TestCase:  ENC-26509 TC #1 ENC-10540 - FHA Maximum Mortgage Calculation Updates: New Checkbox 'Simple Refinance (FHA to FHA)'
'@ Test Automation JIRA Task: TA-4553
'@ Pre-conditions: Pipeline View  and loan folder must exist 
'@ Description:  
	'@ Test Step
		'- 1) Login to Encompass Application using the following credentials:
                    'a.	User Name/Password:  Admin/password            
       '- 2)  Create new loan using given data
       '- 3)  Re-open existing loan and check if values of the Checkbox 'Simple Refinance (FHA to FHA) on different pages as expected    
	'@ Expected Result
		'- 1. User was able to login
		'- 2. New loan is created. data is saved.
		'- 3. Values of checkboxes as expected
'**************************************************************************************************
	
	'======== Login to the Encompass as Admin user ========   
    FRM_Logger_ReportInfoEvent "Start Test","Login to Application", Null	
	BIZ_Login_UserLogin "admin_default"
	S10540_HomePage_Validate
	 
	'======== Create new loan========
	FRM_Logger_ReportInfoEvent "Set up loan for the test","Create Loan with a given data", Null
	BIZ_Pipeline_SelectPipelineViewAndLoanFolder PipelineView(), LoanFolder()
	BIZ_Loan_AddNewBlankLoan()
	BIZ_BorrowerSummaryOrigination_SetBorrower "Borr_FHA26509"
	BIZ_BorrowerSummaryOrigination_SetTransactionDetails "Loan_FHA26509"	
	BIZ_BorrowerSummaryOrigination_SetProperty "Property_FHA26509"	
	BIZ_1003Page1_SetData "1003P1_FHA26509" 
	BIZ_REGZ_CD_SetData "RegZCD_FHA26509"
	BIZ_FNMAStreamlined_SetData "FNMAStrmlnd_FHA26509"
	BIZ_VOL_SetVOLData "liab_FHA26509"

	
	'========= CASE 1 Set Up and Validations==================	
    FRM_Logger_ReportInfoEvent "Start Test Case 1 - ENC-26509", "Modify values of check boxes and validate values", Null 

    S10540_SetCheckBox_SimpleRefinanceFHAtoFHA "FHA Management","Basic Info","ON"
    S10540_ValidateCheckBox_SimpleRefinanceFHAtoFHA "FHA Management","Basic Info","1"
    
    S10540_ValidateCheckBox_SimpleRefinanceFHAtoFHA "FHA Management","Prequalification","1"
    S10540_SetCheckBox_SimpleRefinanceFHAtoFHA "FHA Management","Prequalification","OFF"    
    S10540_ValidateCheckBox_SimpleRefinanceFHAtoFHA "FHA Management","Prequalification","0"
 
    S10540_ValidateCheckBox_SimpleRefinanceFHAtoFHA "HUD-92900LT FHA Loan Transmittal","","0" 
    S10540_SetCheckBox_SimpleRefinanceFHAtoFHA "HUD-92900LT FHA Loan Transmittal","","ON"
    S10540_ValidateCheckBox_SimpleRefinanceFHAtoFHA "HUD-92900LT FHA Loan Transmittal","","1"
    
	BIZ_Loan_Save()
	wait 5
	BIZ_Loan_SaveLoanNumber()
	strLoanNo = FRM_RT_GetPropValue ("LoanNo", true)
	FRM_Logger_ReportInfoEvent "Loan Number","Loan number " & strLoanNo & " is assigned to the loan", Null 
    BIZ_Loan_Exit(False)
	BIZ_Login_UserLogout()
		
	'========Re-Login and Validate Saved Values========
	FRM_Logger_ReportInfoEvent "Continue Test Case 1","Validate values of check boxes after saving on three pages", Null 
	BIZ_Login_UserLogin "admin_default"
    BIZ_Pipeline_SelectPipelineViewAndLoanFolder PipelineView(), LoanFolder()
	strLoanNo = FRM_RT_GetPropValue ("LoanNo", true)
	BIZ_Loan_OpenLoanByColFieldValue "Loan Number", strLoanNo
	if SwfWindow("swfname:=MainForm").SwfWindow("swfname:=UnlockLoanDialog").SwfButton("swfname:=btnUnlock", "index:=0").Exist(4) then
	   SwfWindow("swfname:=MainForm").SwfWindow("swfname:=UnlockLoanDialog").SwfButton("swfname:=btnUnlock", "index:=0").Click
	End If
	wait 5
	BIZ_Forms_ShowAll
    S10540_ValidateCheckBox_SimpleRefinanceFHAtoFHA "FHA Management","Basic Info","1"
    S10540_ValidateCheckBox_SimpleRefinanceFHAtoFHA "FHA Management","Prequalification","1"
    S10540_ValidateCheckBox_SimpleRefinanceFHAtoFHA "HUD-92900LT FHA Loan Transmittal","","1"
    
    
'--------------------------------------------------------------------------------------    
Function S10540_ValidateCheckBox_SimpleRefinanceFHAtoFHA(strForm,strTab,strExp)
		
    If strTab <> "" Then
        BIZ_Forms_Open strForm
        SwfWindow("swfname:=MainForm").SwfWindow("swfname:=LoanPage","index:=0")._
        SwfTab("swfname:=tabControlForm","index:=0").Select strTab	
    Else
       BIZ_Forms_Open strForm 
    End If
    FRM_Logger_ReportInfoEvent "Validate Simple Refi FHA to FHA checkbox", "'User is navigated to the " & strForm & " > " & strTab & " form", Null			
    
    
    Select Case strTab
		Case "Basic Info"
		    strHtmlId = "__cid_CheckBox22_Ctrl"
		    Set objSimpleRefiChkBox = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebTable("column names:=Loan Information", "index:=0").WebCheckBox("html id:=" & strHtmlId,"index:=0")
		    
		    intYSimpleRefi =  int(SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebTable("column names:=Loan Information", "index:=0").WebElement("outertext:=Simple Refinance .FHA to FHA.","html tag:=LABEL","index:=0").GetROProperty("abs_y"))
	        intYStrimlineWA =  int(SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebTable("column names:=Loan Information", "index:=0").WebElement("outertext:=Streamline Refinance .w/ appraisal.","html tag:=LABEL","index:=0").GetROProperty("abs_y"))
		
		Case "Prequalification"
		    strHtmlId = "__cid_CheckBox9_Ctrl"
		    Set objSimpleRefiChkBox = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebCheckBox("html id:=" & strHtmlId,"index:=0")
		
	        intYSimpleRefi =  int(SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebElement("outertext:=Simple Refinance .FHA to FHA.","html tag:=LABEL","index:=0").GetROProperty("abs_y"))
	        intYStrimlineWA =  int(SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebElement("outertext:=Streamline Refinance .w/appraisal.","html tag:=LABEL","index:=0").GetROProperty("abs_y"))
		
		Case ""
		    strHtmlId = "__cid_CheckBox32_Ctrl"
		    Set objSimpleRefiChkBox = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebTable("column names:=Mortgage Information", "index:=0").WebCheckBox("html id:=" & strHtmlId,"index:=0")
            
            intYSimpleRefi =  int(SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebTable("column names:=Mortgage Information", "index:=0").WebElement("outertext:=Simple Refinance .FHA to FHA.","html tag:=LABEL","index:=0").GetROProperty("abs_y"))
	        intYStrimlineWA =  int(SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebTable("column names:=Mortgage Information", "index:=0").WebElement("outertext:=Streamline Refinance .w/ appraisal.","html tag:=LABEL","index:=0").GetROProperty("abs_y"))
			
	End Select

    		
	If intYStrimlineWA - intYSimpleRefi <=20 and  intYStrimlineWA - intYSimpleRefi > 0 Then
	   FRM_Logger_ReportPassEvent "'Purpose of Loan' section", "In the 'Purpose of Loan' section, the check box 'Simple Refinance (FHA to FHA)' is displayed above 'Streamline (w/appraisal)' ", Null		
	Else
       FRM_Logger_ReportPassEvent "'Purpose of Loan' section", "In the 'Purpose of Loan' section, the check box 'Simple Refinance (FHA to FHA)' was NOT found displayed above 'Streamline (w/appraisal)' ", Null			
	End If
	

	GUI_Object_ValidateChecked objSimpleRefiChkBox, strExp,"Simple Refinance (FHA to FHA)"
End Function	


Function S10540_SetCheckBox_SimpleRefinanceFHAtoFHA(strForm,strTab,strVal)
		
    If strTab <> "" Then
        BIZ_Forms_Open strForm
        SwfWindow("swfname:=MainForm").SwfWindow("swfname:=LoanPage","index:=0")._
        SwfTab("swfname:=tabControlForm","index:=0").Select strTab	
    Else
       BIZ_Forms_Open strForm 
    End If
    FRM_Logger_ReportInfoEvent "Set Simple Refi FHA to FHA checkbox ON", "'User is navigated to the " & strForm & " > " & strTab & " form", Null			
    	
	Select Case strTab
		Case "Basic Info"
		    strHtmlId = "__cid_CheckBox22_Ctrl"
		    Set objSimpleRefiChkBox = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebTable("column names:=Loan Information", "index:=0").WebCheckBox("html id:=" & strHtmlId,"index:=0")
		Case "Prequalification"
		    strHtmlId = "__cid_CheckBox9_Ctrl"
		    Set objSimpleRefiChkBox = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebCheckBox("html id:=" & strHtmlId,"index:=0")
		Case ""
		    strHtmlId = "__cid_CheckBox32_Ctrl"
		    Set objSimpleRefiChkBox = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebTable("column names:=Mortgage Information", "index:=0").WebCheckBox("html id:=" & strHtmlId,"index:=0")
	End Select

	
	GUI_WebCheckbox_Set objSimpleRefiChkBox, strVal
	
	Set objSimpleRefiChkBox = NOTHING

End Function	


Function PipelineView()
   PipelineView = "Super Administrator - Default View"
End Function

Function LoanFolder()
   LoanFolder = "BuildVerificationTest"
End Function



Function S10540_HomePage_Validate()

	Set objTab = SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl")		
	GUI_Object_WaitTillEnabledX objTab,30
	GUI_Object_ValidateSelection objTab, "Home", "TabControl"
	
	
	Set objEle = SwfWindow("swfname:=MainForm").Page("index:=0").WebElement("innertext:=Welcome,.*","index:=0")
	isHomePageExist = GUI_Object_WaitTillExistX(objEle, 30)
	If isHomePageExist Then
		FRM_Logger_ReportPassEvent "Validate the Encompass Home Page", "Encompass opens and ‘Home’ tab is automatically selected which displays the Encompass Home Page", Null
	Else
		FRM_Logger_ReportFailEvent "Validate the Encompass Home Page", "The Encompass Home Page was not displayed", Null
		'FRM_RT_AddScreenshotToDoc "Encompass Home Page","Encompass Home Page Failed to display" 
	End If
End Function
	    
