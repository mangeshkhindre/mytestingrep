'@**************************************************************************************************
'@ TestStory: PTAC-1352 Construction Management
'@ TestCase:
   'PTAC-564 - Test #3 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 13 Months, No I.O.
   'PTAC-565 - Test #2 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 12 Months, No I.O.
   'PTAC-566 - Test #1 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 9 Months, No I.O.
   'PTAC-567 - Test #4 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 9 Months, I.O. = 60 mths
   'PTAC-568 - Test #5 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 12 Months, I.O. = 6 mths
   'PTAC-569 - Test #6 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 13 Months, I.O. = 6 mths
   'PTAC-570 - Test #8 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 9 Months, I.O. = 6 mths, Balloon & MI
   'PTAC-571 - Test #9 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 12 Months, I.O. = 36 mths, Balloon & MI
   'PTAC-572 - Test #10 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 13 Months, I.O. = 60 mths, Balloon & MI
   'PTAC-574 - Test #7 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 12 Months, No I.O., Balloon & MI
'@ Test Automation JIRA Task: PTAC-1381 ConstructionManagement_ConstructionPerm_AdjustablePayment_StepRate
'@ TestData:
   '01 ConstructionManagement,SetConstructionMortPeriod and ConstructionManagement_13MoNoInterest
   '02 ConstructionManagement,SetConstructionMortPeriod and ConstructionManagement_12MoNoInterest
   '03 ConstructionManagement,SetConstructionMortPeriod and ConstructionManagement_9MoNoInterest
   '04 ConstructionManagement,SetConstructionMortPeriod and ConstructionManagement_9Mo60Interest
   '05 ConstructionManagement,SetConstructionMortPeriod and ConstructionManagement_12Mo6MInterest
   '06 ConstructionManagement,SetConstructionMortPeriod and ConstructionManagement_13Mo6MInterest
   '07 ConstructionManagement,SetConstructionMortPeriod and ConstructionManagement_12Mo6MInterest
   '08 ConstructionManagement,SetConstructionMortPeriod and ConstructionManagement_9Mo6MInterest_withMortage
   '09 ConstructionManagement,SetConstructionMortPeriod and ConstructionManagement_12Mo36MInterest240Ballons_withMortage
   '10 ConstructionManagement,SetConstructionMortPeriod and ConstructionManagement_13Mo60MInterest240Ballons_withMortage
'@ Pre-conditions: 
'@ Description: Construction to Perm Loans - Adjustable Payment (AP) Table logic - STEP RATE.
'@ TestSteps:
   '1 Log into Encompass as Admin/password
   '2 Navigate to Pipeline tab > Click on New Loan icon (right corner)
   '3 Click on New Bank Loan button
   '4 Enter the data mentioned in Test Data column, save
   '5 Go to Reg-Z Form, and validate the Adjustable Payment section fields
'@ ExpectedResult:
   '1 Admin should be able to login successfully
   '2 New Loan pop up displayed
   '3 It navigates to Loan tab
   '4 The Loan is created successfully
   '5 The Adjustable Payment Table section is displayed with the following:
   '  Interest Only Payment? 
   '  Optional Payment? 
   '  Step Payments? 
   '  Seasonal Payments? 
   '  Monthly Principal and Interest Payments
   '  First Change/Amount 
   '  Subsequent Changes 
   '  Maximum Payment 

'***************************************************************************************************

'====== Go to Pipeline>>Construction Management ======
BIZ_Nav_Pipeline_Forms_FormType "My Pipeline", "Construction Management"

'====== Create a loan with 12 Months, Interest Only = 36 months, Balloon = 240 Months, Mortgage Insurance ======
ConstructionManagement_LoanCreation Parameter("strRowID") 

'====== Construction to Perm, Fixed to Fixed with Step Rate, Construction Period = 12 Months, Interest Only = 36 months, Balloon = 240 Months, Mortgage Insurance validation ======
BIZ_ConstructionManagement_AdjustablePaymentTable_Validate Parameter("strRowID")

'===== Save Loan =====
'BIZ_Loan_Save()

'===== Exit Loan ======
BIZ_Loan_Exit False


Function ConstructionManagement_LoanCreation(strRowID)
   
    FRM_Logger_ReportInfoEvent "LoanCreation for Construction Management", "Loan Creation for AP validations in construction management", null
    
	Dim objBorrowerPage,objData,objTabswf,objData1
	
	Set objData				= FRM_DS_GetTestData("ConstructionManagement", "SetConstructionMortPeriod", strRowID)
	Set objBorrowerPage		= SwfWindow("swfname:=MainForm").Page("micclass:=Page")
	Set objTabswf			= SwfWindow("swfname:=MainForm").swfWindow("swfname:=MainScreen").SwfTab("swfname:=tabControlForm")
	
	If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "1240_HomeEmail"))) Then
		Set objData1 = FRM_DS_GetTestData("ConstructionManagement", "LotLandDetails", strRowID)
	End IF
	
	If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "1240_HomeEmail"))) Then
	   GUI_SwfTab_Click objTabswf,"Basic Info"
	   GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=l_1240","index:=0"), Trim(FRM_DS_GetValue(objData, "1240_HomeEmail"))
	   GUI_SwfTab_Click objTabswf,"Loan Info"
	End IF
	
	If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "1109_LoanAmount"))) Then
	   GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=TextBox1","index:=0"), Trim(FRM_DS_GetValue(objData, "1109_LoanAmount"))
	End IF
		
	If UTIL_String_IsEmpty(Trim(FRM_DS_GetValue(objData, "1240_HomeEmail"))) Then
		'Loan Info tab
		If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "19_PurposeofLoan"))) Then 
		   GUI_WebCheckbox_Set objBorrowerPage.WebCheckBox("html id:=__cid_CheckBox10_Ctrl"), Trim(FRM_DS_GetValue(objData, "19_PurposeofLoan"))
		End If
	Else
		If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "19_PurposeofLoan1"))) Then 
		   GUI_WebCheckbox_Set objBorrowerPage.WebCheckBox("html id:=__cid_CheckBox9_Ctrl"), Trim(FRM_DS_GetValue(objData, "19_PurposeofLoan1"))
		End If
		If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "4084_ConstructionPerm"))) Then 
		   GUI_WebCheckbox_Set objBorrowerPage.WebCheckbox("html id:=__cid_CheckBox21_Ctrl"), "ON"
		End If
		If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "1811_PropertyWillbe"))) Then 
		   GUI_WebCheckbox_Set objBorrowerPage.WebCheckbox("html id:=__cid_CheckBox4_Ctrl"), "ON"
		End If
		If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "1964_Acquistion"))) Then 
		   GUI_WebCheckbox_Set objBorrowerPage.WebCheckbox("html id:=__cid_CheckBox11_Ctrl"), "ON"
		End If
	End IF
	
	If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "1172_LoanType"))) Then 
	   GUI_WebCheckbox_Set objBorrowerPage.WebCheckBox("html id:=__cid_CheckBox1_Ctrl"), Trim(FRM_DS_GetValue(objData, "1172_LoanType"))
	End If 
	If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "420_LienPosition"))) Then 
	   GUI_WebCheckbox_Set objBorrowerPage.WebCheckBox("html id:=__cid_CheckBox7_Ctrl"), Trim(FRM_DS_GetValue(objData, "420_LienPosition"))
	End If
	If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "SYS6_EstInterestOn"))) Then 
	   GUI_WebList_Select objBorrowerPage.WebList("html id:=DropdownBox2","index:=0"), Trim(FRM_DS_GetValue(objData, "SYS6_EstInterestOn"))
	End If
	If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "1962_NoOfdays"))) Then 
	   GUI_WebList_Select objBorrowerPage.WebList("html id:=DropdownBox3","index:=0"), Trim(FRM_DS_GetValue(objData, "1962_NoOfdays"))
	End If
	
	'Additional Details:
	If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "682_FirstPaymentDate"))) Then
		GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=TextBox14","index:=0"), Trim(FRM_DS_GetValue(objData, "682_FirstPaymentDate"))
	End IF
	If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "1240_HomeEmail"))) Then
		If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "763_EstClosingDate"))) Then
			GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=TextBox13","index:=0"), Trim(FRM_DS_GetValue(objData, "763_EstClosingDate"))
		End IF
		If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "1963_ConstructionCompletionDate"))) Then
			GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=TextBox15","index:=0"), Trim(FRM_DS_GetValue(objData, "1963_ConstructionCompletionDate"))
		End IF
	End IF
	'Amortization
	If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "608_AmortizationType"))) Then 
		GUI_WebCheckbox_Set objBorrowerPage.WebCheckBox("html id:=__cid_CheckBox27_Ctrl"), Trim(FRM_DS_GetValue(objData, "608_AmortizationType"))
	End If
	If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "1176_RegZLEperiod"))) Then 
		GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=TextBox28"), Trim(FRM_DS_GetValue(objData, "1176_RegZLEperiod"))
	End If
	If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "1677_InterestRate"))) Then 
		GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=TextBox29"), Trim(FRM_DS_GetValue(objData, "1677_InterestRate"))
	End If

	'Construction Only section:
	If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "1240_HomeEmail"))) Then
	
		If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "3_NoteRate"))) Then 
			GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=l_3"), Trim(FRM_DS_GetValue(objData, "3_NoteRate"))
		End If
		If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "1014_QualRate"))) Then 
			GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=l_4"), Trim(FRM_DS_GetValue(objData, "1014_QualRate"))
		End If
		If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "4_Term"))) Then 
			GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=l_5"), Trim(FRM_DS_GetValue(objData, "4_Term"))
		End If
		If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "325_DueIn"))) Then 
			GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=l_6"), Trim(FRM_DS_GetValue(objData, "325_DueIn"))
		End If
	Else
		If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "3_NoteRate"))) Then 
			GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=TextBox42"), Trim(FRM_DS_GetValue(objData, "3_NoteRate"))
		End If
		If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "1014_QualRate"))) Then 
			GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=TextBox43"), Trim(FRM_DS_GetValue(objData, "1014_QualRate"))
		End If
		If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "4_Term"))) Then 
			GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=TextBox44"), Trim(FRM_DS_GetValue(objData, "4_Term"))
		End If
		If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "325_DueIn"))) Then 
			GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=TextBox45"), Trim(FRM_DS_GetValue(objData, "325_DueIn"))
		End If
	End If
	
	If UTIL_String_IsEmpty(Trim(FRM_DS_GetValue(objData, "1240_HomeEmail"))) Then
		
		'Enter Lot and Land details
		If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData1, "F20"))) Then 
			GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=TextBox5"), Trim(FRM_DS_GetValue(objData1, "F20"))
		End If
		If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData1, "21_OriginalCost"))) Then 
			GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=TextBox6"), Trim(FRM_DS_GetValue(objData1, "21_OriginalCost"))
		End If
		If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData1, "10_ExistingLien"))) Then 
			GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=TextBox7"), Trim(FRM_DS_GetValue(objData1, "10_ExistingLien"))
		End If
		If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData1, "22_Presentvalue"))) Then 
			GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=TextBox8"), Trim(FRM_DS_GetValue(objData1, "22_Presentvalue"))
		End If
		If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData1, "23_CostOfImprovement"))) Then 
			GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=TextBox9"), Trim(FRM_DS_GetValue(objData1, "23_CostOfImprovement"))
		End If
	End if
	
	If UTIL_String_IsEmpty(Trim(FRM_DS_GetValue(objData, "1240_HomeEmail"))) Then
	
		BIZ_Forms_Open "Borrower Summary - Origination"
		GUI_Object_IsExist objBorrowerPage.WebEdit("html id:=l_1240")
		
		If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "1178_BorrowerEmail"))) Then 
			GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=l_1240"), Trim(FRM_DS_GetValue(objData, "1178_BorrowerEmail"))
		End If
		
		If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "1177_InterestOnly"))) Then 
			GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=l_1177"), Trim(FRM_DS_GetValue(objData, "1177_InterestOnly"))
		End If
		
		BIZ_Forms_Open "RegZ - LE"
		GUI_Object_IsExist objBorrowerPage.WebList("html id:=DropdownBox16")
		
		If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "RegZ_1stIntChangeAdj"))) Then 
			GUI_WebList_Select objBorrowerPage.WebList("html id:=DropdownBox16"), Trim(FRM_DS_GetValue(objData, "RegZ_1stIntChangeAdj"))
		End If
		
		If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "1766_Min"))) Then
			BIZ_Forms_Open "RegZ - CD"
			Wait 10   ' Due to sync issue using explicit wait
			GUI_Object_WaitTillExistX objBorrowerPage.WebEdit("html id:=l_1766","index:=0"),100
			GUI_Object_IsExist objBorrowerPage.WebEdit("html id:=l_1766","index:=0")
			
			If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "1766_Min"))) Then 
				GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=l_1766","index:=0"), Trim(FRM_DS_GetValue(objData, "1766_Min"))
			End If
			
			If UTIL_String_IsNotEmpty(Trim(FRM_DS_GetValue(objData, "1198_Months"))) Then 
				GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=l_1198","index:=0"), Trim(FRM_DS_GetValue(objData, "1198_Months"))
			End If
		
		End If
	End if
	
	'BIZ_Loan_Save()
	
	'strLoanNo = BIZ_Loan_GetLoanNumber()
	
	'BIZ_ConstructionManagement_LoanCreation = strLoanNo	
		
	Set objBorrowerPage	= Nothing
	Set objData			= Nothing
	Set objTabswf		= Nothing
	Set objData1		= Nothing
	
End Function
