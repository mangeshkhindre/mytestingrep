FRM_RT_SetupTest(null)

'=========== Validate TitleInsuranceValue_DefaultRefinance in Loan ========
Set objData=FRM_DS_GetTestData("Settings_TablesFees", "TableAndFees", "TitleInsurance_DefaultRefinance")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	RunAction "TitleInsuranceValue_DefaultRefinance", oneIteration
End If


'=========== Validate TitleInsurance_DefaultPurchase in Loan ========\
Set objData=FRM_DS_GetTestData("Settings_TablesFees", "TableAndFees", "TitleInsurance_DefaultPurchase")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	RunAction "TitleInsurance_DefaultPurchase", oneIteration
End If

'=========== Validate Escrow in Loan ========
Set objData=FRM_DS_GetTestData("Settings_TablesFees", "TableAndFees", "Escrow_DefaultCheck")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	RunAction "Escrow_DefaultCheck", oneIteration
End If

FRM_RT_TearDownTest(Null)

