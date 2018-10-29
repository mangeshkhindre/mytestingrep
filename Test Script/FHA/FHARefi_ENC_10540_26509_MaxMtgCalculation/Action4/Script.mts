'@**************************************************************************************************
'@ TestStory: ENC-10540 FHA Maximum Mortgage Calculation Updates – Refinance
'@ TestCase:  ENC-26563 - ENC-26565 TC #4 and TC #5 ENC-10540 Validate Mortgage Basis Value 
'@ when Streamline with and without Appraisal 
'@ Test Automation JIRA Task: TA-4597
'@ Object Repository: 
'@ Pre-conditions: Pipeline View  and loan folder must exist 
'@ Description:  
	'@ Test Step
		'- 1) Login to Encompass Application using the following credentials:
                    'a.	User Name/Password:  Admin/password            
       '- 2)  Open existing loan created in TestCase 1
       '- 4)  Update loan data to use in case 4 - No-Cash Out Refi w/o Appraisal
       '- 5)  Validate Mortgage Basis and related values
       '- 6)  Update loan data to use in case 5 - No-Cash Out Refi with Appraisal
       '- 7)  Validate Mortgage Basis and related values       
	'@ Expected Result
		'- 4. Values of Mortgage Basis and related values as expected for No-Cash Out Refi w/o Appraisal
		'- 5. Values of Mortgage Basis and related values as expected for No-Cash Out Refi with Appraisal
'**************************************************************************************************

	'========CASE 4 Set Up and Validations ======================
	FRM_Logger_ReportInfoEvent "Start test case 4 - ENC-26563", "FHA Maximum Mortgage Calculation (Streamline - No Appraisal)", Null
	
	'Set data for case 4 Streamline NO Appraisal
	SetDataForStreamlineNoAppraisalCase4
	
	'Validate Maximum Mortgage Amount section existance
	ValidateSectionExistanceCase "Label64"
	
	'Validate Existing Debt Calculation
	ValidateExistingDebtCalculation_NoAppraisal
	
	'Validate Maximum Mortgage Amount No Appraisal
	ValidateMaximumMortgageAmount_NoAppraisal


'========CASE 5 Set Up and Validations ======================
	FRM_Logger_ReportInfoEvent "Start test case 5 - ENC-26565", "FHA Maximum Mortgage Calculation (Streamline - With Appraisal)", Null

    'Set data for case 4 Streamline With Appraisal
    SetDataForStreamlineWithAppraisalCase5

    'Validate Maximum Mortgage Amount section existance
    ValidateSectionExistanceCase "Label21"

    'Validate Maximum Mortgage Amount With Appraisal
    ValidateMaximumMortgageAmount_WithAppraisal
    
'------------------------------------------------------------------------------


Function SetDataForStreamlineNoAppraisalCase4()

    BIZ_Forms_Open "FHA Management"
    SwfWindow("swfname:=MainForm").SwfWindow("swfname:=LoanPage","index:=0")._
    SwfTab("swfname:=tabControlForm","index:=0").Select "Prequalification"
    Set objPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")   
    
    val = "NoCash-Out Refinance"
    GUI_WebCheckBox_Set objPage.WebCheckbox("html id:=__cid_CheckBox.*_Ctrl", "value:="&val), "ON"   
    val = "StreamlineWithoutAppraisal"
    GUI_WebCheckBox_Set objPage.WebCheckbox("html id:=__cid_CheckBox.*_Ctrl", "value:="&val), "ON"    
    GUI_WebButton_Click objPage.WebButton("html id:=StandardButton1","index:=0")    
    GUI_SwfEdit_Set SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MIPDialog").SwfEdit("swfname:=rateFundingTxt","index:=0"),"0.1"    
    GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MIPDialog").SwfButton("swfname:=okBtn","index:=0")   
    
    Do
		intCount = intCount + 1
		wait 1	
		if inCount > 60 then
		    FRM_Logger_ReportFailEvent "Validate UFMP FieldValue", "UFMIP Value was not set by application. ", Null 
			Exit Do
		End If
	Loop While GUI_Object_GetPropertyValue  (objPage.WebEdit("html id:=l_1045","index:=0"),"value") = "" 
    
    GUI_WebEdit_Set objPage.WebEdit("html id:=TextBox28","index:=0"), "205000"  'field ID 26 (Unpaid Principle Balance) The amount of any existing liens on the property.  
    GUI_List_Select SwfWindow("swfname:=MainForm").SwfList("swfname:=emFormMenuBox"), "VOL"
    GUI_WebEdit_Set objPage.WebEdit("html id:=l_FL0013","index:=0"), "205000"  'Field ID FL0113: The current balance of the liability.
    FRM_Logger_ReportInfoEvent "Set test data in the loan", "Updated values on Prequalification and VOL pages", Null   
    BIZ_Forms_Open "FHA Management"
    SwfWindow("swfname:=MainForm").SwfWindow("swfname:=LoanPage","index:=0")._
    SwfTab("swfname:=tabControlForm","index:=0").Select "Prequalification"
  End Function

Function SetDataForStreamlineWithAppraisalCase5()

    BIZ_Forms_Open "FHA Management"
    SwfWindow("swfname:=MainForm").SwfWindow("swfname:=LoanPage","index:=0")._
    SwfTab("swfname:=tabControlForm","index:=0").Select "Prequalification"    
    Set objPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")      
    val = "StreamlineWithAppraisal"
    GUI_WebCheckBox_Set objPage.WebCheckbox("html id:=__cid_CheckBox.*_Ctrl", "value:="&val), "ON"

  End Function



Function ValidateSectionExistanceCase(strID)
    'validate existence of sections
    Set objPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
    GUI_Object_ValidateProperty objPage.WebElement("html id:=" &strID,"index:=0"), "innertext", "Maximum Mortgage Amount","Mortgage Calculation Section"
End Function


Function ValidateExistingDebtCalculation_NoAppraisal() 
    Set objPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
	dblUnpaidPrincipalBalance = cdbl(GUI_Object_GetPropertyValue(objPage.WebEdit("html id:=TextBox28","index:=0"),"value"))
	dblMIPRefund = cdbl(GUI_Object_GetPropertyValue(objPage.WebEdit("html id:=TextBox30","index:=0"),"value"))
	dblExistingDebt = cdbl(GUI_Object_GetPropertyValue(objPage.WebEdit("html id:=TextBox26","index:=0"),"value"))	
	dblExistingDebtExpected = dblUnpaidPrincipalBalance - dblMIPRefund			
	strSummaryLog = "Validate the 'Existing Debt Calculation' is 'Unpaid Principal Balance' (F26) - 'MIP Refund'"
	strDetailLog = "The 'Existing Debt Calculation' actual is: " & dblExistingDebt & "; Unpaid Balance: " & dblUnpaidPrincipalBalance & "; MIP Refund: " & dblMIPRefund & "; 'Existing Debt Calculation' expected: " & dblExistingDebtExpected
    If dblExistingDebt = dblExistingDebtExpected   Then
		FRM_Logger_ReportPassEvent strSummaryLog, strDetailLog, Null
	Else
		FRM_Logger_ReportFailEvent strSummaryLog, strDetailLog, Null
	End If	
End Function

Function ValidateMaximumMortgageAmount_NoAppraisal() 
    Set objPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
	dblExistingDebt = cdbl(GUI_Object_GetPropertyValue(objPage.WebEdit("html id:=TextBox25","index:=0"),"value"))
	dblUFMIP = cdbl(GUI_Object_GetPropertyValue(objPage.WebEdit("html id:=TextBox22","index:=0"),"value"))
	dblMtgBasis = cdbl(GUI_Object_GetPropertyValue(objPage.WebEdit("html id:=TextBox27","index:=0"),"value"))	
	dblMtgBasisExpected = dblExistingDebt + dblUFMIP	
	strSummaryLog = "Validate the 'Maximum Mortgage Amount' is 'Mortgage Basis'(GMCAW.X1) = 'Existing Debt' (F3052) + 'UFMIP' (F1045)"
	strDetailLog = "The 'Mortgage Basis' actual is: " & dblMtgBasis & "; Existing Debt: " & dblExistingDebt & "; UFMIP: " & dblUFMIP & "; 'Mortgage Basis' expected: " & dblMtgBasisExpected
    If dblMtgBasis = dblMtgBasisExpected   Then
		FRM_Logger_ReportPassEvent strSummaryLog, strDetailLog, Null
	Else
		FRM_Logger_ReportFailEvent strSummaryLog, strDetailLog, Null
	End If	
End Function

Function ValidateMaximumMortgageAmount_WithAppraisal() 
    Set objPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
	dblUnpaidPrincipalBalance = cdbl(GUI_Object_GetPropertyValue(objPage.WebEdit("html id:=TextBox23","index:=0"),"value"))
	dblUFMIP = cdbl(GUI_Object_GetPropertyValue(objPage.WebEdit("html id:=TextBox9","index:=0"),"value"))
	dblMtgBasis = cdbl(GUI_Object_GetPropertyValue(objPage.WebEdit("html id:=TextBox24","index:=0"),"value"))	
	dblMtgBasisExpected = dblUnpaidPrincipalBalance + dblUFMIP
	strSummaryLog = "Validate the 'Maximum Mortgage Amount' is 'Mortgage Basis' = 'Unpaid Principal Balance (F26) + 'UFMIP'"
	strDetailLog = "The 'Mortgage Basis' actual is: " & dblMtgBasis & "; Unpaid Principle Balance: " & dblUnpaidPrincipalBalance & "; UFMIP: " & dblUFMIP & "; 'Mortgage Basis' expected: " & dblMtgBasisExpected
    If dblMtgBasis = dblMtgBasisExpected   Then
		FRM_Logger_ReportPassEvent strSummaryLog, strDetailLog, Null
	Else
		FRM_Logger_ReportFailEvent strSummaryLog, strDetailLog, Null
	End If	
End Function












