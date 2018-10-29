FRM_RT_SetupTest(null)
'=========== Validate CompensationPlan_Record ========
Set objData	= FRM_DS_GetTestData("Settings_TablesFees", "TableAndFees", "CompensationPlan_Record")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag) = "yes" Then
	RunAction "CompensationPlan_Record", oneIteration
End If

'=========== Validate CompensationPlan_LOPersona========
Set objData	= FRM_DS_GetTestData("Settings_TablesFees", "TableAndFees", "CompensationPlan_LOPersona")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag) = "yes" Then
	RunAction "CompensationPlan_LOPersona", oneIteration
End If

'=========== Validate CompensationPlan_DefaultAndExport ========  
Set objData	= FRM_DS_GetTestData("Settings_TablesFees", "TableAndFees", "CompensationPlan_Exoprt")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag) = "yes" Then
	RunAction "CompensationPlan_DefaultAndExport", oneIteration
End If

FRM_RT_TearDownTest(Null)

