FRM_RT_SetupTest(null)

'=========== Validate City Tax in Loan ========
Set objData=FRM_DS_GetTestData("Settings_TablesFees", "TableAndFees", "CityTax")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	RunAction "CityTax", oneIteration
End If

'=========== Validate State Tax in  Loan ========
Set objData=FRM_DS_GetTestData("Settings_TablesFees", "TableAndFees", "StateTax")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	RunAction "StateTax", oneIteration
End If

'=========== Validate User Defined Fee in Loan ========
Set objData	= FRM_DS_GetTestData("Settings_TablesFees", "TableAndFees", "UserDefinedRecord")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag) = "yes" Then
	RunAction "UserDefinedRecord", oneIteration
End If

FRM_RT_TearDownTest(Null)


