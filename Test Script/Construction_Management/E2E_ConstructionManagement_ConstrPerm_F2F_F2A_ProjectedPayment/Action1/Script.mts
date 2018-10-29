'@**************************************************************************************************
'@ TestStory: PTAC-1352 Construction Management
'@ TestCase: PTAC-862 TC#3 (CBIZ-4509) - F2F & F2A Inclusive Scenarios - Construction-to-Perm Loans - Projected Payments table logic
'@ Test Automation JIRA Task: PTAC-2895 ConstructionManangement_ConstrPerm_F2F_F2AInclusive_ProjPayLogic
'@ TestData:
   '1 ConstructionManagement, SetBasicInfoDetails and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step1
   '2 ConstructionManagement, SetLoanInfoDetails and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step
   '3 Forms_RegZ-LE, VerifyProjectedPayment and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step1
   '4 ConstructionManagement, SetBasicInfoDetails and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step5
   '5 ConstructionManagement, SetLoanInfoDetails and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step5
   '6 Forms_RegZ-LE, VerifyProjectedPayment and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step5
   '7 ConstructionManagement, SetBasicInfoDetails and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step2
   '8 ConstructionManagement, SetLoanInfoDetails and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step2
   '9 Forms_RegZ-LE, VerifyProjectedPayment and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step2
   '10 Forms_AggregateEscrowAccount, SetData and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step2
   '11 Forms_2015Itemization, SetFeeDetails and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step2
   '12 ConstructionManagement, SetBasicInfoDetails and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step6
   '13 ConstructionManagement, SetLoanInfoDetails and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step6
   '14 Forms_RegZ-LE, VerifyProjectedPayment and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step6
   '15 Forms_AggregateEscrowAccount, SetData and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step6
   '16 Forms_2015Itemization, SetFeeDetails and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step6
   '17 ConstructionManagement, SetBasicInfoDetails and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step3
   '18 ConstructionManagement, SetLoanInfoDetails and 1352_ConstrMgmt_F2F_ProjPayTable_862_Ste3
   '19 Forms_RegZ-LE, VerifyProjectedPayment and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step3
   '20 Forms_AggregateEscrowAccount, SetData and 1352_ConstrMgmt_F2F_ProjPayTable_862_Ste3
   '21 Forms_2015Itemization, SetFeeDetails and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step3
   '22 Forms_RegZ-LE, SetMiandPiDetails and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step3
   '23 Forms_1003Page1, 1003Page1 and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step3
   '24 ConstructionManagement, SetBasicInfoDetails and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step4
   '25 ConstructionManagement, SetLoanInfoDetails and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step4
   '26 Forms_RegZ-LE, VerifyProjectedPayment and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step4
   '27 Forms_AggregateEscrowAccount, SetData and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step4
   '28 Forms_2015Itemization, SetFeeDetails and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step4
   '29 Forms_RegZ-LE, SetMiandPiDetails and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step4
   '30 Forms_1003Page1, 1003Page1 and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step4
   '31 ConstructionManagement, SetBasicInfoDetails and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step7
   '32 ConstructionManagement, SetLoanInfoDetails and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step7
   '33 Forms_RegZ-LE, VerifyProjectedPayment and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step7
   '34 Forms_AggregateEscrowAccount, SetData and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step7
   '35 Forms_2015Itemization,SetFeeDetails and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step7
   '36 Forms_RegZ-LE, SetMiandPiDetails and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step7
   '37 Forms_1003Page1, 1003Page1 and 1352_ConstrMgmt_F2F_ProjPayTable_862_Step7
'@ Pre-conditions: 
'@ Description: F2F & F2A Inclusive Scenarios - Construction-to-Perm Loans - Projected Payments table logic
'@ TestSteps:
   '1 Log into Encompass as Admin/password
   '2 Navigate to Pipeline tab > Click on New Loan icon (right corner) 
   '3 Click on New Bank Loan button
   '4 Enter the data mentioned in Test Data column, save.
   '5 Go to RegZ-LE form, verify the Projected payments columns
'@ ExpectedResult:
   '1 Admin should be able to login successfully
   '2 New Loan pop up displayed
   '3 It navigates to Loan tab
   '4 The Loan is created
   '5 It should display field values under respective columns as below,
	  'Year 
	  'P&I Min
      'P&I Max
	  'Interest Only
	  'Mortgage Insurance
	  'Estimated Escrows
	  'Total Est. Monthly Payment Min
	  'Total Est. Monthly Payment Max
'***************************************************************************************************
FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2895","Script Name - ConstructionManangement_ConstrPerm_F2F_F2AInclusive_ProjPayLogic", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

BIZ_Nav_Pipeline_Forms_FormType "My Pipeline", "Borrower Summary - Origination"

FRM_Logger_ReportStepEvent "Start Test Case:PTAC-666","To verify the Construction Only Method-A Est. Interest Only Payments - Fixed", Null

'Set Input Data in Borrower Summary Origination and Construiction Management Page -Create a loan
Set objSummaryPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")

BIZ_Common_BorrowerSummaryOrigination_SetHeadInfo objSummaryPage,"1352_ConstOnly_Fixed"
BIZ_Common_BorrowerSummaryOrigination_SetBorrower objSummaryPage, "1352_ConstOnly_Fixed"
BIZ_Common_BorrowerSummaryOrigination_SetTransactionDetails objSummaryPage,"1352_ConstOnly_Fixed"

BIZ_Forms_Open "Construction Management"
BIZ_ConstructionManagement_SetLoanInfoDetails "1352_ConstOnly_Fixed"

'Set data in 2015 Itemizationform
BIZ_Forms_Open "2015 Itemization"
CM_ConstructionOnly_SetLoanOriginationFees "801a","1352_ConstOnly_Fixed"
BIZ_2015Itemization_FeeDetails_ClickCheckbox "801a",Array("Impacts APR")

'Set input data RegZ - LE and validate the required fields
BIZ_Forms_Open "RegZ - LE"

'Set No of days 360/360,365/365,365/360 in RegZ-LE form
BIZ_RegZ_LE_SetConstructionMortgage "1352_ConstOnly_Fixed_01"
BIZ_RegZ_LE_SetConstructionMortgage "1352_ConstOnly_Fixed_02"
BIZ_RegZ_LE_SetConstructionMortgage "1352_ConstOnly_Fixed_03"

BIZ_Loan_Exit False

'Navigate to the Pipeline>>Construction Management
BIZ_Nav_Pipeline_Forms_FormType "My Pipeline", "Construction Management"
BIZ_ConstructionManagement_SetBasicInfoDetails "1352_ConstrMgmt_F2F_ProjPayTable_703_Step1"

FRM_Logger_ReportStepEvent "Start Step-Step i ","'Fixed to ARM' Construction-to-Perm Loans - Projected Payments table logic ", Null
RunAction "ConstructionManagement_ConstPerm_F2F_F2A_ProjPayTable_Validate_001", oneIteration, "1352_ConstrMgmt_F2F_ProjPayTable_774_Step1"

'====== RunAction to validate Projected Payments Table in RegZ-LE page for Fixed rate,No Interest Constr. Perm Loan ======
FRM_Logger_ReportStepEvent "Start Step-Step i","'Fixed to Fixed' Construction-to-Perm Loans - Projected Payments table logic,No Interest ,Interest Rate 4%", Null
RunAction "ConstructionManagement_ConstPerm_F2F_F2A_ProjPayTable_Validate_001",OneIteration, "1352_ConstrMgmt_F2F_ProjPayTable_703_Step1"

'====== RunAction to validate LoanTermsTable Bullet3 for Fixed rate Constr. Perm Loan ======
FRM_Logger_ReportStepEvent "Start Step-Step i ","Fixed to Fixed - Construction-to-Perm Loans - Projected Payments table logic-No Permanent Interest ", Null
RunAction "ConstructionManagement_ConstPerm_F2F_F2A_ProjPayTable_Validate_001", oneIteration, "1352_ConstrMgmt_F2A_ProjPayTable_862_Step1"

'====== RunAction to validate LoanTermsTable Bullet3 for Fixed rate Constr. Perm Loan ======
FRM_Logger_ReportStepEvent "Start Step-Step v ","'Fixed to ARM' Construction-to-Perm Loans - Projected Payments table logic ' ,'Amortization ARM'", Null
RunAction "ConstructionManagement_ConstPerm_F2F_F2A_ProjPayTable_Validate_001", OneIteration, "1352_ConstrMgmt_F2A_ProjPayTable_862_Step5"

BIZ_Loan_Exit False

'Navigate to the Pipeline>>Construction Management
BIZ_Nav_Pipeline_Forms_FormType "My Pipeline", "Construction Management"
BIZ_ConstructionManagement_SetBasicInfoDetails "1352_ConstrMgmt_F2F_ProjPayTable_703_Step2"

FRM_Logger_ReportStepEvent "Start Step-Step ii ","'Fixed to ARM' Construction-to-Perm Loans,Aggregate Escrow and 2015 Itemization- Projected Payments table logic ", Null
RunAction "ConstructionManagement_ConstPerm_F2F_F2A_ProjPayTable_Validate_003",OneIteration, "1352_ConstrMgmt_F2F_ProjPayTable_774_Step2"

BIZ_Loan_Exit False

'Navigate to the Pipeline>>Construction Management
BIZ_Nav_Pipeline_Forms_FormType "My Pipeline", "Construction Management"
BIZ_ConstructionManagement_SetBasicInfoDetails "1352_ConstrMgmt_F2F_ProjPayTable_703_Step2"

'====== RunAction to validate Projected Payments Table in RegZ-LE page for Fixed rate,Interest Only Constr. Perm Loan ======
FRM_Logger_ReportStepEvent "Start Step-Step ii","'Fixed to Fixed' Construction-to-Perm Loans - Projected Payments table logic,Interest only ,Interest Rate 4%", Null
RunAction "ConstructionManagement_ConstPerm_F2F_F2A_ProjPayTable_Validate_003",OneIteration, "1352_ConstrMgmt_F2F_ProjPayTable_703_Step2"

'====== RunAction to validate LoanTermsTable Bullet1 for Fixed rate Constr. Perm Loan ======
FRM_Logger_ReportStepEvent "Start Step-Step ii ","'Fixed to Fixed' Construction-to-Perm Loans - Projected Payments table logic ',Permanent Interest 60  Months'", Null
RunAction "ConstructionManagement_ConstPerm_F2F_F2A_ProjPayTable_Validate_003", oneIteration, "1352_ConstrMgmt_F2A_ProjPayTable_862_Step2"

'====== RunAction to validate LoanTermsTable Bullet1 for Fixed rate Constr. Perm Loan ======
FRM_Logger_ReportStepEvent "Start Step -Step vi","'Fixed to ARM' Construction-to-Perm Loans - Projected Payments table logic ',' Permanent Interest 6 Months' ,'Amortization ARM'", Null
RunAction "ConstructionManagement_ConstPerm_F2F_F2A_ProjPayTable_Validate_003", oneIteration,"1352_ConstrMgmt_F2A_ProjPayTable_862_Step6"
'
BIZ_Loan_Exit False

'Navigate to the Pipeline>>Construction Management
BIZ_Nav_Pipeline_Forms_FormType "My Pipeline", "Construction Management"
BIZ_ConstructionManagement_SetBasicInfoDetails "1352_ConstrMgmt_F2F_ProjPayTable_703_Step3"

FRM_Logger_ReportStepEvent "Start Step-Step iii ","'Fixed to ARM' Construction-to-Perm Loans,Aggregate Escrow,RegZ-LE,1003Page1 and 2015 Itemization- Projected Payments table logic ", Null
RunAction "ConstructionManagement_ConstPerm_F2F_F2A_ProjPayTable_Validate_002",OneIteration, "1352_ConstrMgmt_F2F_ProjPayTable_774_Step3"

FRM_Logger_ReportStepEvent "Start Step-Step iv ","'Fixed to ARM' Construction-to-Perm Loans,Aggregate Escrow,RegZ-LE,1003Page1 and 2015 Itemization- Projected Payments table logic ", Null
RunAction "ConstructionManagement_ConstPerm_F2F_F2A_ProjPayTable_Validate_002",OneIteration, "1352_ConstrMgmt_F2F_ProjPayTable_774_Step4"

BIZ_Loan_Exit False

'Navigate to the Pipeline>>Construction Management
BIZ_Nav_Pipeline_Forms_FormType "My Pipeline", "Construction Management"
BIZ_ConstructionManagement_SetBasicInfoDetails "1352_ConstrMgmt_F2F_ProjPayTable_703_Step3"

'====== RunAction to validate LoanTermsTable Bullet2 for Fixed rate Constr. Perm Loan ======
FRM_Logger_ReportStepEvent "Start Step-Step iii" ,"'Fixed to Fixed' Construction-to-Perm Loans - Projected Payments table logic ',No Permanent Interest' with 1003 page 'Duein 180'", Null
RunAction "ConstructionManagement_ConstPerm_F2F_F2A_ProjPayTable_Validate_002",OneIteration, "1352_ConstrMgmt_F2A_ProjPayTable_862_Step3"

'====== RunAction to validate LoanTermsTable Bullet1 for Fixed rate Constr. Perm Loan ======
FRM_Logger_ReportStepEvent "Start Step-Step iv ","'Fixed to Fixed' Construction-to-Perm Loans - Projected Payments table logic ',No Permanent Interest' with 1003 page 'Duein 240'", Null
RunAction "ConstructionManagement_ConstPerm_F2F_F2A_ProjPayTable_Validate_002",OneIteration, "1352_ConstrMgmt_F2A_ProjPayTable_862_Step4"

BIZ_Loan_Exit False

'Navigate to the Pipeline>>Construction Management
BIZ_Nav_Pipeline_Forms_FormType "My Pipeline", "Construction Management"
BIZ_ConstructionManagement_SetBasicInfoDetails "1352_ConstrMgmt_F2F_ProjPayTable_703_Step3"

'====== RunAction to validate Projected Payments Table in RegZ-LE page for Fixed rate,No Interest Only,Due In Constr. Perm Loan ======
FRM_Logger_ReportStepEvent "Start Step-Step iii","'Fixed to Fixed' Construction-to-Perm Loans - Projected Payments table logic,No Interest only ,Due In 180,Interest Rate 4%", Null
RunAction "ConstructionManagement_ConstPerm_F2F_F2A_ProjPayTable_Validate_002",OneIteration,"1352_ConstrMgmt_F2F_ProjPayTable_703_Step3"

'====== RunAction to validate Projected Payments Table in RegZ-LE page for Fixed rate,No Interest Only,Due In Constr. Perm Loan ======
FRM_Logger_ReportStepEvent "Start Step-Step iv","'Fixed to Fixed' Construction-to-Perm Loans - Projected Payments table logic,No Interest only ,Due In 240,Interest Rate 9%", Null
RunAction "ConstructionManagement_ConstPerm_F2F_F2A_ProjPayTable_Validate_002",OneIteration,"1352_ConstrMgmt_F2F_ProjPayTable_703_Step4"

BIZ_Loan_Exit False

'Navigate to the Pipeline>>Construction Management
BIZ_Nav_Pipeline_Forms_FormType "My Pipeline", "Construction Management"
BIZ_ConstructionManagement_SetBasicInfoDetails "1352_ConstrMgmt_F2F_ProjPayTable_703_Step3"

'====== RunAction to validate LoanTermsTable Bullet2 for Fixed rate Constr. Perm Loan ======
FRM_Logger_ReportStepEvent "Start Step-Step vii ","'Fixed to ARM' Construction-to-Perm Loans - Projected Payments table logic ',No Permanent Interest' ,Amortization:'ARM' with 1003 page 'Duein 180'", Null
RunAction "ConstructionManagement_ConstPerm_F2F_F2A_ProjPayTable_Validate_002",OneIteration,"1352_ConstrMgmt_F2A_ProjPayTable_862_Step7"


BIZ_Loan_Exit False

BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)


''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
'ConstructionManagement
'
' List of functions here
' @code
'   Function CM_ConstructionOnly_SetLoanOriginationFees(strLine,strRowID)
'@endcode
' @{
''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
Function CM_ConstructionOnly_SetLoanOriginationFees(strLine,strRowID)

	Dim objFeeDetailsBtn,objFeeDetailsPage, objData
	
	Set objFeeDetailsBtn = SwfWindow("swfname:=MainForm").Page("micclass:=Page","index:=0").WebButton("html id:=btnPop"&strLine)
	
	GUI_WebButton_Click objFeeDetailsBtn
	
	Set objFeeDetailsPage = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=QuickEntryPopupDialog").Page("micclass:=Page","index:=0")
	Set objData 		  = FRM_DS_GetTestData("Forms_2015Itemization", "SetFeeDetails", strRowID)
		
	GUI_WebButton_Click objFeeDetailsPage.WebButton("html id:=btnUnitLock")
	
	If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "monthlyfee")) Then
	    GUI_WebEdit_Set objFeeDetailsPage.WebEdit("html id:=txtUnitBorPaid"), FRM_DS_GetValue(objData, "monthlyfee")		
	End If
	
	Set objFeeDetailsPage = Nothing
	Set objFeeDetailsBtn  = Nothing
	Set objData           = Nothing
	
	GUI_Window_Close SwfWindow("swfname:=MainForm").SwfWindow("swfname:=QuickEntryPopupDialog")

End Function



