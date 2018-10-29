FRM_RT_SetupTest(null)

'=========== Validate Amortization Schedule in Conventional Loan ========
Set objData=FRM_DS_GetTestData("Tools_AmortizationSchedule", "Amortization_Schedule", "Conventional_Loan")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	RunAction "AmortizationSchedule_ConventionalLoan", oneIteration
End If

'=========== Validate Amortization Schedule in FHA Loan ========
Set objData=FRM_DS_GetTestData("Tools_AmortizationSchedule", "Amortization_Schedule", "FHA_Loan")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	RunAction "AmortizationSchedule_FHALoan", oneIteration
End If

'=========== Validate Amortization Schedule in VA Loan========
Set objData=FRM_DS_GetTestData("Tools_AmortizationSchedule", "Amortization_Schedule", "VA_Loan")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	RunAction "AmortizationSchedule_VALoan", oneIteration
End If

'=========== Amortization Schedule in USDA Loan ========
Set objData=FRM_DS_GetTestData("Tools_AmortizationSchedule", "Amortization_Schedule", "USDA_Loan")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	RunAction "AmortizationSchedule_USDALoan", oneIteration
End If

FRM_RT_TearDownTest(Null)



