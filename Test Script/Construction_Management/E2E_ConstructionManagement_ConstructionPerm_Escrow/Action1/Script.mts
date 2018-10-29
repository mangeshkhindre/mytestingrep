'@**************************************************************************************************
'@ TestStory: PTAC-1352 Construction Management
'@ TestCase:
   '1 PTAC-1156 TC #8 - CBIZ-3873; Scenario #1 -Estimated escrow row calculation for Construction-Perm for ARM rate and 1st Amort date
   '2 PTAC-1161 - TC #9 - CBIZ- 3873- Estimated escrow row calculation for Construction to Perm for Amort date
   '3 PTAC-1156 - TC #8 - CBIZ- 3873- Estimated escrow row calculation for Construction-Perm for ARM rate and 1st Amort date
   '4 PTAC-864 - TC #7 - CBIZ- 3873- Estimated escrow row calculation for Construction to Perm for ARM rate
'@ Test Automation JIRA Task: PTAC-1648 ConstructionManagement_ConstructionPerm_EstimatedEscrow_Amortdate
'@ TestData:  
   'Forms_BorrowerSummaryOrigination,SetBorrwer,1352_ConstrPerm_ARM_EstEscrow
   'Forms_BorrowerSummaryOrigination,SetProperty,1352_ConstrPerm_ARM_EstEscrow
   'Forms_BorrowerSummaryOrigination,SetTransactionDetails,1352_ConstrPerm_ARM_EstEscrow
   'Forms_RegZ-LE,SetARM,Shared_ConstrPerm_EstEscrow
   'Forms_1003Page,SetMiandPiDetails,Shared_ConstrPerm_EstEscrow
   'Forms_2015Itemization,1000Section,Shared_ConstrPerm_EstEscrow
   'Forms_2015Itemization,SetFeeDetails,Shared_ConstrPerm_EstEscrow_1002
   'Forms_2015Itemization,SetFeeDetails,Shared_ConstrPerm_EstEscrow_1003
   'Forms_2015Itemization,SetFeeDetails,Shared_ConstrPerm_EstEscrow_1004
   'Forms_2015Itemization,SetFeeDetails,Shared_ConstrPerm_EstEscrow_1005
   'Forms_2015Itemization,SetFeeDetails,Shared_ConstrPerm_EstEscrow_1006
   'Forms_2015Itemization,SetFeeDetails,Shared_ConstrPerm_EstEscrow_1007  
'@ Pre-conditions:
'@ Description: ConstructionManagement ConstructionPerm Estimated Escrow Amortdate validate
'@ TestSteps:
   '1 Log into Encompass as Admin/password
'@ ExpectedResult:
   '1 Admin should be able to login successfully 
'************************************************************************************************** 
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case:PTAC-1648","Script Name : ConstructionManagement_ConstructionPerm_EstimatedEscrow_Amortdate", Null

 '====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

'======= RunAction to validate the Escrow account in LE page 1 for Fixed int loan ======
RunAction "ConstrMgmt_ConstrPerm_Fixed_EstEscrow_Verify_001",OneIteration

'======= RunAction to validate the Escrow account in LE page 1 for Fixed int loan with AggregateEscrowAccount info ======
RunAction "ConstrMgmt_ConstrPerm_Fixed_Aggregate_EstEscrow_Verify_002",OneIteration

'======= RunAction to validate the Escrow account in LE page 1 for ARM int loan with AggregateEscrowAccount info ======
RunAction "ConstrMgmt_ConstrPerm_ARM_Aggregate_EstEscrow_Verify_003",OneIteration

'======= RunAction to validate the Escrow account in LE page 1 for ARM int loan with AggregateEscrowAccount info ======
RunAction "ConstrMgmt_ConstrPerm_ARM_EstEscrow_Verify_004",OneIteration

FRM_Logger_ReportStepEvent "Start Test Case - PTAC-673","TC 15 - CBIZ- 3873- CD4.X41 cals for Construction-Perm loans with Escrow 1st payment date as blank", Null

'Set data in BSO form
BIZ_ConstructionManagement_ConstructionLoanProgram_SetBorrowerDetails "1352_EscrowPayment_CD4"

'Navigate to 1003 page 1
BIZ_Forms_Open "1003 Page 1"

'Set data in 1003 page form1 in MIPI window
BIZ_Common_1003Page1_SetMiandPiDetails "1352_EscrowPayment_CD4"

'Set data in Loan Info details in Construction Management form
BIZ_ConstructionManagement_SetLoanInfo "1352_EscrowPayment_CD4"

'Validate the Purchase Price  and Appraiosed values in loan info details section Construction Mgmt Page
ConstructionMangement_EscrowPaymentOperationsLocal "1352_EscrowPayment_CD4Validate","LoanInfoValidate"

'Navigate to 1003 page 2
BIZ_Forms_Open "1003 Page 2"

'Set data in 1003 page 2 in Monthly Housing Expenses section
ConstructionMangement_EscrowPaymentOperationsLocal "1352_EscrowPayment_CD4Validate","SetData"

'Naviagate to 2015 Itemization
BIZ_Forms_Open "2015 Itemization"

'Set fee details in 1002 section
BIZ_2015Itemization_SetFeeDetails "1002","1352_EscrowPayment_CD4_1002"

'Set fee details in 1003 section
BIZ_2015Itemization_SetFeeDetails "1003","1352_EscrowPayment_CD4_1003"

'Set fee details in 1004 section
BIZ_2015Itemization_SetFeeDetails "1004","1352_EscrowPayment_CD4_1004"

'Set HOA Due data in Escrowtax window  of 2015 Itemization form
BIZ_Forms_2015Itemization_FieldRuleWindow_SetEscrowDetails "1352_EscrowPayment_CD4"

'Set fee details in 1005 section
BIZ_2015Itemization_SetFeeDetails "1005","1352_EscrowPayment_CD4_1005"

'Set fee details in 1006 section
BIZ_2015Itemization_SetFeeDetails "1006","1352_EscrowPayment_CD4_1006"

'Set fee details in 1007 section
BIZ_2015Itemization_SetFeeDetails "1007","1352_EscrowPayment_CD4_1007"                                     													

'Navigate to CD4 form and validate CDX41 field
BIZ_Forms_Open "Closing Disclosure Page 4" 

'Validate the Non-Escrowed property costs within 1 year of Consummation in Loan Disclosures Escrow Section
ConstructionMangement_EscrowPaymentOperationsLocal "1352_EscrowPayment_CD4Validate","EscrowValidate"

BIZ_Loan_Exit False

FRM_Logger_ReportStepEvent "Start Test Case - PTAC-1508","TC 5- CBIZ-3873 Verify Escrow First Payment date should be equal to first payment date for all non Construction to Perm", Null

'Set data in BSO form
BIZ_ConstructionManagement_ConstructionLoanProgram_SetBorrowerDetails "1352_EscrowPayment_CD4_A"

'Set input data in forms(miscellineous)
ConstructionManagement_EscrowFirstPayment_SetDataMiscellineous "1352_EscrowPayment_CD4_A","RegZ - CD"
ConstructionManagement_EscrowFirstPayment_SetDataMiscellineous "1352_EscrowPayment_CD4_A","Aggregate Escrow Account"
 
'Validate the Escrow first payment date 
BIZ_CostructionManagement_NonConstrPermLoan_EscrowFirstPayment_Verify "1352_EscrowPayment_CD4_A"

BIZ_Loan_Exit False

'======= Log Out =======
BIZ_Login_UserLogout()

FRM_RT_TearDownTest(Null)


''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
'
' List of functions here
' @code
'
'   Function ConstructionMangement_EscrowPaymentOperationsLocal(strRowID,strEventType)
' 	Function ConstructionManagement_EscrowFirstPayment_SetDataMiscellineous(strRowID,strInputForm)
'
'@endcode
' @{
''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

'This function is used to set data for varios valiadtionsa like Loan info Escrow Validate like that
'@code
'   ConstructionMangement_EscrowPaymentOperationsLocal(strRowID,strEventType)
'@endcode
'@param strRowID - Loan Details data in test data
'@param strEventType - it includes LoanInfoValidate,SetData,EscrowValidate,


Function ConstructionMangement_EscrowPaymentOperationsLocal(strRowID,strEventType)
	
	Dim objBorrowerPage,objData,strNonEscrowCons
	
	Set objBorrowerPage	 = SwfWindow("swfname:=MainForm").Page("micclass:=Page")
	Set objData			 = FRM_DS_GetTestData("ConstructionManagement", "SetLoanInfo", "1352_EscrowPayment_CD4Validate")

	Select Case strEventType
		Case "LoanInfoValidate"
			If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "PurchasePrice")) Then
				GUI_Object_ValidateValue objBorrowerPage.WebEdit("html id:=l_const58"),FormatNumber(FRM_DS_GetValue(objData, "PurchasePrice"),2), "As Completed Purchase Value"
			End If
			
			If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "AppraisedValue")) Then
				GUI_Object_ValidateValue objBorrowerPage.WebEdit("html id:=l_const59"),FormatNumber(FRM_DS_GetValue(objData,"AppraisedValue"),2), "As Completed Appraised Value"
			End If 
		Case "SetData"
			If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData,"233_HomeownersAssociationDues")) Then
				GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=l_125"), FRM_DS_GetValue(objData,"233_HomeownersAssociationDues")
			End If 
		Case "EscrowValidate"
			strNonEscrowCons = GUI_Object_GetPropertyValue(objBorrowerPage.WebEdit("html id:=txtCDX41"),"value")
	
			If UTIL_String_IsEmpty(strNonEscrowCons) Then
				FRM_Logger_ReportPassEvent "Non-Escrowed property costs within 1 year of Consummation in Loan Disclosures Escrow Section","Non-Escrowed property costs within 1 year of Consummation is blank",Null
			Else
				FRM_Logger_ReportFailEvent "Non-Escrowed property costs within 1 year of Consummation in Loan Disclosures Escrow Section","Non-Escrowed property costs within 1 year of Consummation is not  blank",Null
			End If
		Case Else
			FRM_Logger_ReportFailEvent "Escrow Payment Operations Local","No Data found for required operation to perform",Null
	End Select
	
	Set objBorrowerPage	= Nothing
	Set objData	        = Nothing

End Function




'This function is used to set data in RegZ-CD ,Escrow Forms (Single data)
'@code
'  ConstructionManagement_EscrowFirstPayment_SetDataMiscellineous(strRowID,strInputForm)
'@endcode
'@param strRowID - Loan Details data in test data
'@param strEventType - it includes LoanInfoValidate,SetData,EscrowValidate,

Function ConstructionManagement_EscrowFirstPayment_SetDataMiscellineous(strRowID,strInputForm)
	
	Dim objData,objBorrowerPage

	Set objData 		= FRM_DS_GetTestData("ConstructionManagement", "SetLoanInfo", strRowID)
	Set objBorrowerPage = SwfWindow("swfname:=MainForm").Page("micclass:=Page","index:=0")
	
	Select Case strInputForm
		Case "RegZ - CD"	
		BIZ_Forms_Open strInputForm
		
		If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData,"2533_DisbursementDate")) Then
			GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=l_L244"),FRM_DS_GetValue(objData,"2533_DisbursementDate")
		End If
		Case "Aggregate Escrow Account"
		BIZ_Forms_Open strInputForm
		
		If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData,"682_FirstPaymentDate")) Then
			GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=l_682"),FRM_DS_GetValue(objData,"682_FirstPaymentDate")
			FRM_Logger_ReportPassEvent "Set First Payment date F682","First Payment date is set as "&FRM_DS_GetValue(objData,"682_FirstPaymentDate"),Null
		End If
		Case Else
		FRM_Logger_ReportFailEvent "Select the inform to set Miscellineous dat in Loan forms","No input form selected",Null
	End Select
	
	Set objData  		= Nothing
	Set objBorrowerPage = Nothing
	
End Function

'}@
