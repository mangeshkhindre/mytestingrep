'@**************************************************************************************************
'@ TestStory: ENC-10540 FHA Maximum Mortgage Calculation Updates – Refinance
'@ TestCase:  ENC-26509 TC #2 and TC #3 ENC-10540 Validate Mortgage Basis Value
'@ Test Automation JIRA Task: TA-4572
'@ Object Repository: 
'@ Pre-conditions: Pipeline View  and loan folder must exist 
'@ Description:  
	'@ Test Step
		'- 1) Login to Encompass Application using the following credentials:
                    'a.	User Name/Password:  Admin/password            
       '- 2)  Open existing loan created in TestCase 1
       '- 4)  Update loan data to use in case 2 - No-Cash Out Refi
       '- 5)  Validate Mortgage Basis and related values
       '- 6)  Update loan data to use in case 3 - Cash Out Refi
       '- 7)  Validate Mortgage Basis and related values       
	'@ Expected Result
		'- 4. Values of Mortgage Basis and related values as expected for No Cash Out loan
		'- 5. Values of Mortgage Basis and related values as expected for Cash Out loan
'**************************************************************************************************

	'========CASE 2 Set Up and Validations ======================
	FRM_Logger_ReportInfoEvent "Start test case 2 - ENC-26513", "FHA Maximum Mortgage Calculation (No Cash-Out Refinance)", Null
	
	FRM_Logger_ReportInfoEvent "2015 Itemization","Validate values of Estimated Closing Cost and PrePaid Items", Null 
	
	'Click on '2015 Itemization' form and add fees manually '- Estimated Closing Costs' value (F137) and 'Estimated Prepaid Items' (F138)
	ValidateEstimatedClosingCostAndPrepaidItems	
	
	FRM_Logger_ReportInfoEvent "FHA Management", "Validate values on Prequalification form", Null
	'Click on 'FHA Management' > 'Prequalification' form and process required validations
	ValidateMortgageCalculationSectionLocation	
	ValidateBasicLTVFactor
	ValidateExistingDebtCalculation
	FRM_Logger_ReportInfoEvent "FHA Management", "Validate mortgage basis when Calculated Basic LTV Factor is greater than Debt", Null
	ValidateMortgageBasis_NoCashOutRefi()
	
	'=========Change values to revert Lessers =================
	'Change the data point values for 'Existing Debt Calculation' such that the 'Existing Debt' (F3052) or 
	''Multiplied by LTV Factor' (F1154) is less than the other 
	
	FRM_Logger_ReportInfoEvent "Change Lesser","Update Appraised value to make it less than Debt", Null
	Set objPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
	currApprValue = GUI_Object_GetPropertyValue(objPage.WebEdit("html id:=TextBox2","index:=0"),"value")
	GUI_WebEdit_Set objPage.WebEdit("html id:=TextBox2","index:=0"), cdbl(currApprValue) - 100000
	objPage.WebEdit("html id:=TextBox2","index:=0").click  'Field 356: The appraised value of the subject property.
	FRM_Logger_ReportInfoEvent "FHA Management", "Validate mortgage basis when Calculated Basic LTV Factor is less than Debt", Null
	ValidateMortgageBasis_NoCashOutRefi()
    GUI_WebEdit_Set objPage.WebEdit("html id:=TextBox2","index:=0"), currApprValue
     
    '===============Case 3 Set Up and Validations=================
    FRM_Logger_ReportInfoEvent "Start test case 3 - ENC=26554", "FHA Maximum Mortgage Calculation (Cash-Out Refinance)", Null
       
    SetDataForNoCashoutRefiCase3
     
    '========Validations================
	'Click on 'FHA Management' > 'Prequalification' form and validate required sections
    ValidateSectionExistanceCase3
	
	'Validate the 'Mortgage Basis'(GMCAW.X1) = 'Appraised Value Multiplied by LTV Factor when Purchase Date to be more than 12 months before Application Date' 
    'ValidateMortgageBasisPurchDateMoreAppDate12Months
    ValidateMortgageBasis_CashOutRefi(True)
	
	'Change F1518 (Purchase Date) to be less than 12 months before Application Date (F745). Appraised value is greater than sales price. 
	Set objPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
	strPurchDate =  UTIL_Date_FormatDateByPattern(now - 200,"mm/dd/yyyy")
    GUI_WebEdit_Set objPage.WebEdit("html id:=TextBox4","index:=0"), strPurchDate
    objPage.WebEdit("html id:=TextBox8","index:=0").click
    
	'validate required sections
    'ValidateMortgageBasisPurchDateLessAppDate12MonthsSalesPriceLesser
    ValidateMortgageBasis_CashOutRefi(False)
	ValidateSectionExistanceCase3
	
	'Change EEM.X63 (Original Sales Price) to be greater than Appraised value
	Set objPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
	strPurchDate = GUI_Object_GetPropertyValue(objPage.WebEdit("html id:=TextBox4","index:=0"),"value")
	dblAppraisedValue = cdbl(GUI_Object_GetPropertyValue(objPage.WebEdit("html id:=TextBox19","index:=0"),"value"))
    GUI_WebEdit_Set objPage.WebEdit("html id:=TextBox13","index:=0"), dblAppraisedValue + 25000
    objPage.WebEdit("html id:=TextBox8","index:=0").click
	
    'ValidateMortgageBasisPurchDateLessAppDate12MonthsAppraisedLesser
    ValidateMortgageBasis_CashOutRefi(False)
    
    
'------------------------------------------------------------------------------
Function ValidateEstimatedClosingCostAndPrepaidItems()
	BIZ_Forms_Open "2015 Itemization"
	Set objPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
	GUI_WebEdit_Set objPage.WebEdit("html id:=TextBox12","index:=0"), "1"   'Loan Origination Fees - field id:388
	objPage.WebEdit("html id:=l_454","index:=0").Click
	Do
		intCount = intCount + 1
		wait 1	
		if inCount > 60 then
		    FRM_Logger_ReportFailEvent "Validate Estimated Prepaid Items", "Estimated Prepaid Items was not set by application. ", Null 
			Exit Do
		End If
	Loop While GUI_Object_GetPropertyValue  (objPage.WebEdit("html id:=l_138","index:=0"),"value") = ""
	
	strEstimatedPrepaidItems =  GUI_Object_GetPropertyValue  (objPage.WebEdit("html id:=l_138","index:=0"),"value")
	strEstimatedClosingCost =  GUI_Object_GetPropertyValue  (objPage.WebEdit("html id:=l_137","index:=0"),"value")
		
	FRM_RT_SetPropValue "10540_EstPrepaidItems", strEstimatedPrepaidItems
	FRM_RT_SetPropValue "10540_EstClosingCost", strEstimatedClosingCost
	
	If NOT strEstimatedPrepaidItems = ""  and Not strEstimatedClosingCost = ""  Then
		FRM_Logger_ReportPassEvent "Validate Estimated Closing Cost", "Estimated Closing Cost is: " & strEstimatedClosingCost, Null
		FRM_Logger_ReportPassEvent "Validate Estimated Prepaid Items", "Estimated Prepaid Items is: " & strEstimatedPrepaidItems, Null
	Else
		FRM_Logger_ReportFailEvent "Validate Estimated Closing Cost and Pre-Paid Items", "Estimated Closing Cost is: " & strEstimatedClosingCost & ";  Estimated Prepaid Items is: " & strEstimatedPrepaidItems, Null
	End If

End Function

Function ValidateMortgageCalculationSectionLocation()
	BIZ_Forms_ShowAll
	BIZ_Forms_Open "FHA Management"
    SwfWindow("swfname:=MainForm").SwfWindow("swfname:=LoanPage","index:=0")._
        SwfTab("swfname:=tabControlForm","index:=0").Select "Prequalification"
	Set objPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
	

	GUI_Object_ValidateProperty objPage.WebElement("html id:=Label24","index:=0"), "innertext", "LTV Factor Calculation - Basic","Mortgage Calculation Section"
	GUI_Object_ValidateProperty objPage.WebElement("html id:=Label28","index:=0"), "innertext", "Existing Debt Calculation","Mortgage Calculation Section"
	GUI_Object_ValidateProperty objPage.WebElement("html id:=Label35","index:=0"), "innertext", "Maximum Mortgage Amount","Mortgage Calculation Section"
	
    intY_MtgCalc = cint(GUI_Object_GetPropertyValue(objPage.WebElement("html id:=Label35","index:=0"),"y"))
    intY_Ratio = cint(GUI_Object_GetPropertyValue(objPage.WebElement("html tag:=TD","innerhtml:=Ratio","index:=0"),"y"))
    intY_EEM = cint(GUI_Object_GetPropertyValue(objPage.WebElement("html tag:=TD","innerhtml:=EEM","index:=0"),"y"))
    
    If intY_EEM > intY_MtgCalc  and intY_Ratio > intY_MtgCalc  Then
		FRM_Logger_ReportPassEvent "Validate The existing 'Ratio' location", "The existing 'EEM' section is displayed below the new 'Mortgage Calculation' section", Null
		FRM_Logger_ReportPassEvent "Validate The existing 'EEM' location", "The existing 'Ratio' section is displayed below the new 'Mortgage Calculation' section", Null
	Else
		FRM_Logger_ReportFailEvent "Validate The existing 'Ratio' and 'EEM' location", "The existing 'Ratio' and 'EEM' sections are NOT displayed below the new 'Mortgage Calculation' section", Null
	End If
	
End Function

Function ValidateBasicLTVFactor()
	Set objData = FRM_DS_GetTestData("Forms_BorrowerSummaryOrigination", "SetProperty", "Property_FHA26509")
	Set objPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
	cdblApppraisedVal = cdbl(FRM_DS_GetValue(objData, "AppraisedValue"))
	Set objData = NOTHING
	lblPercent = GUI_Object_GetPropertyValue(objPage.WebElement("html id:=Label26","index:=0"),"innerhtml")
	dblMultiplier = cdbl(trim(replace(replace(lblPercent,"*",""),"% LTV Factor =",""))) / 100
	dblLtvFactorExpect = cdblApppraisedVal * dblMultiplier
	dblLtvFactorActual = cdbl(GUI_Object_GetPropertyValue(objPage.WebEdit("html id:=TextBox3","index:=0"),"value"))
	
    If dblLtvFactorExpect = dblLtvFactorActual  Then
		FRM_Logger_ReportPassEvent "Validate Basic LTV Factor Calculation (Appraised Value * LTV Factor)", "The existing Basic LTV factor calculation is as expected: " & dblLtvFactorExpect , Null
	Else
		FRM_Logger_ReportFailEvent "Validate Basic LTV Factor Calculation (Appraised Value * LTV Factor)", "The existing Basic LTV factor calculation is NOT as expected. Expected: " & dblLtvFactorExpect & "; Actual: " & dblLtvFactorActual, Null
	End If
End Function

Function ValidateExistingDebtCalculation()
    Set objPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
	Set objData = FRM_DS_GetTestData("Forms_1003page", "1003Page1", "1003P1_FHA26509")
	dblUPB = cdbl(FRM_DS_GetValue(objData, "ExistingLien/UPB"))
	dblRepair = cdbl(FRM_DS_GetValue(objData, "Cost"))
	Set objData = NOTHING	
	
	Set objData = FRM_DS_GetTestData("Forms_FNMAStreamlined", "FNMAStreamlined", "FNMAStrmlnd_FHA26509")
	dblDiscountPoints =  cdbl(FRM_DS_GetValue(objData, "DiscountPoints"))
	dblMIPRefund = cdbl(FRM_DS_GetValue(objData, "MIPRefund"))
	Set objData = NOTHING
	
	dblPrepaidExpences =  cdbl(FRM_RT_GetPropValue ("10540_EstPrepaidItems", true)) 
    dblClosCost =  cdbl(FRM_RT_GetPropValue ("10540_EstClosingCost", true)) 	
    
    dblDebtExpected = dblUPB + dblRepair + dblPrepaidExpences + dblClosCost + dblDiscountPoints - dblMIPRefund
    dblDebtActual = cdbl(GUI_Object_GetPropertyValue(objPage.WebEdit("html id:=TextBox10","index:=0"),"value"))
    
    If dblDebtExpected = dblDebtActual  Then
		FRM_Logger_ReportPassEvent "Validate Existing Debt Calculation", "The Existing Debt Calculation is as expected: " & dblDebtExpected , Null
	Else
		FRM_Logger_ReportFailEvent "Validate Existing Debt Calculation", "The Existing Debt Calculation is NOT as expected. Expected: " & dblDebtExpected & "; Actual: " & dblDebtActual, Null
	End If
    Set objPage = NOTHING
End Function


Function ValidateMortgageBasis_NoCashOutRefi() 
    Set objPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
	dblLtvFactorActual = cdbl(GUI_Object_GetPropertyValue(objPage.WebEdit("html id:=TextBox3","index:=0"),"value"))
	dblDebtActual = cdbl(GUI_Object_GetPropertyValue(objPage.WebEdit("html id:=TextBox10","index:=0"),"value"))
	dblBasicMtg = cdbl(GUI_Object_GetPropertyValue(objPage.WebEdit("html id:=TextBox12","index:=0"),"value"))
	dblLesser = UTIL_Math_Min(dblLtvFactorActual,dblDebtActual)	
	
	strSummaryLog = "Validate the 'Mortgage Basis'(GMCAW.X1) is lesser of 'LTV Factor Calculation' and 'Existing Debt Calculation'"
	strDetailLog = "The 'Existing Debt Calculation' is: " & dblDebtActual & "; LTV Factor Calculation: " & dblLtvFactorActual & "; Basic Mortgage: " & dblBasicMtg
    If dblBasicMtg = dblLesser   Then
		FRM_Logger_ReportPassEvent strSummaryLog, strDetailLog, Null
	Else
		FRM_Logger_ReportFailEvent strSummaryLog, strDetailLog, Null
	End If	
End Function

Function SetDataForNoCashoutRefiCase3()
    Set objPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")   
    GUI_WebEdit_Set objPage.WebEdit("html id:=l_26","index:=0"), "180000"  'field ID 26 (Unpaid Principle Balance) The amount of any existing liens on the property.

    SwfWindow("swfname:=MainForm").SwfWindow("swfname:=LoanPage","index:=0")._
        SwfTab("swfname:=tabControlForm","index:=0").Select "Basic Info"
    val = "Cash-Out Refinance"
    GUI_WebCheckBox_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebCheckbox("html id:=__cid_CheckBox.*_Ctrl", "value:="&val), "ON"
     
    strPurchDate =  UTIL_Date_FormatDateByPattern(now - 400,"mm/dd/yyyy")
    GUI_WebEdit_Set objPage.WebEdit("html id:=TextBox8","index:=0"), strPurchDate  'Field ID 1518: purchase date of the subject property

    BIZ_Forms_Open "Energy Efficient Mortgage Calculation"
    GUI_WebEdit_Set objPage.WebEdit("html id:=l_EEMX63","index:=0"), "225000" 'Field ID EEM.X63: Original Sales price if the property has been owned for less than 12 months.
    
    GUI_List_Select SwfWindow("swfname:=MainForm").SwfList("swfname:=emFormMenuBox"), "VOL"
    GUI_WebEdit_Set objPage.WebEdit("html id:=l_FL0013","index:=0"), "180000"  'Field ID FL0113: The current balance of the liability.

    BIZ_Forms_Open "FHA Management"
    SwfWindow("swfname:=MainForm").SwfWindow("swfname:=LoanPage","index:=0")._
        SwfTab("swfname:=tabControlForm","index:=0").Select "Prequalification"
  End Function


Function ValidateSectionExistanceCase3()
    'validate existence of sections
    Set objPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
    GUI_Object_ValidateProperty objPage.WebElement("html id:=Label2","index:=0"), "innertext", "LTV Factor Calculation","Mortgage Calculation Section"
	GUI_Object_ValidateProperty objPage.WebElement("html id:=Label44","index:=0"), "innertext", "Maximum Mortgage Amount","Mortgage Calculation Section"
End Function


Function ValidateMortgageBasis_CashOutRefi(boolPurchaseDateMoreThan12MonthsOfAppDate)

	Set objPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
	strPurchDate = GUI_Object_GetPropertyValue(objPage.WebEdit("html id:=TextBox4","index:=0"),"value")
	dblAppraisedValue = cdbl(GUI_Object_GetPropertyValue(objPage.WebEdit("html id:=TextBox19","index:=0"),"value"))   
    lblPercent = GUI_Object_GetPropertyValue(objPage.WebElement("html id:=Label38","index:=0"),"innerhtml")
	dblMultiplier = cdbl(trim(replace(replace(lblPercent,"*",""),"% LTV Factor",""))) / 100 
	
	strSalesValue = GUI_Object_GetPropertyValue(objPage.WebEdit("html id:=TextBox13","index:=0"),"value")
	'If UTIL_String_IsEmpty(strSalesValue) Then
	If boolPurchaseDateMoreThan12MonthsOfAppDate Then
		dblExpectedLTVFactor = dblAppraisedValue * dblMultiplier
		strCondition = "Purchase Date is more than 12 month from Application Date"
	Else
		dblSalesValue = cdbl(strSalesValue)	
		dblExpectedLTVFactor = cdbl( UTIL_Math_Min(dblAppraisedValue, dblSalesValue) ) * dblMultiplier
		strCondition = "Purchase Date is less than 12 month from Application Date"
	End If
	
	dblMtgBasis = cdbl(GUI_Object_GetPropertyValue(objPage.WebEdit("html id:=TextBox16","index:=0"),"value"))
     
    strDetailLog =  "The Mortgage Basis=" & dblMtgBasis & "; Appraised Value=" & dblAppraisedValue & "; Sales Price Value=" & dblSalesValue _
	      & "; LTV Factor=" & dblMultiplier & "; Calculated Value=" & dblExpectedLTVFactor & "; Purchase Date=" &  strPurchDate
	    
    If dblMtgBasis = dblExpectedLTVFactor   Then
		FRM_Logger_ReportPassEvent "'Mortgage Basis'=Lesser of ('Appraised Value' [field 356], 'Original Sales Price' [EEM.X63]) * 'LTV Factor'", strDetailLog & "; Condition " &strCondition, Null
	Else
		FRM_Logger_ReportFailEvent "'Mortgage Basis'=Lesser of ('Appraised Value' [field 356], 'Original Sales Price' [EEM.X63]) * 'LTV Factor'", strDetailLog & "; Condition " &strCondition, Null
	End If
	
End Function

