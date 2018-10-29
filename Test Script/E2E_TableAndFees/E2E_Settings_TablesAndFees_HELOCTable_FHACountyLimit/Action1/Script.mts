FRM_RT_SetupTest(null)

'=========== Validate Heloc Table in Loan ========
Set objData=FRM_DS_GetTestData("Settings_TablesFees", "TableAndFees", "HelocTable_ReEnforcement")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	RunAction "HelocTable_ReEnforcement", oneIteration
End If

'=========== Validate FHA Count Limits in FHA Loan ========
Set objData=FRM_DS_GetTestData("Settings_TablesFees", "TableAndFees", "FHA_County_Limits")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
RunAction "FHA_County_Limits", oneIteration
End If

'=========== Validate Itemizarion Fee Management ========
Set objData=FRM_DS_GetTestData("Settings_TablesFees", "TableAndFees", "ItemizationFeeManagement")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	RunAction "ItemizationFeeManagement", oneIteration
End If

FRM_RT_TearDownTest(Null)
