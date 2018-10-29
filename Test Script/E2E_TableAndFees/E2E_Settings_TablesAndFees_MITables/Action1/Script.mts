
FRM_RT_SetupTest(null)

'=========== Validate MI Data in Conventional Loan ========
Set objData	= FRM_DS_GetTestData("Settings_TablesFees", "TableAndFees", "MITable_Conventional_Loan")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag) = "yes" Then
   RunAction "MITable_Conventional_Loan", oneIteration
End If

'=========== Validate MI Data in FHA Loan ========\
Set objData=FRM_DS_GetTestData("Settings_TablesFees", "TableAndFees", "MITable_FHA_Loan")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
   RunAction "MITable_FHA_Loan", oneIteration
End If

'=========== Validate MI Data in VA Loan========
Set objData=FRM_DS_GetTestData("Settings_TablesFees", "TableAndFees", "MITable_VA_Loan")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
   RunAction "MITable_VA_Loan", oneIteration
End If

'=========== Validate MI Data in Other Loan ========
Set objData=FRM_DS_GetTestData("Settings_TablesFees", "TableAndFees", "MITable_Other_Loan")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
   RunAction "MITable_Other_Loan", oneIteration
End If

FRM_RT_TearDownTest(Null)


