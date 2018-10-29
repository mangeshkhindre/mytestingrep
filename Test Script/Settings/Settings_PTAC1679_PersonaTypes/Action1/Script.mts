'Validating Different Persona Types . Default values in Tabs and then the re-enforcement of the Persona

FRM_RT_SetupTest(null)

'=========== Validate Loan Officer Persona Type ========
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "LoanOfficer")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")

If lcase(strExecutionFlag)= "yes" Then
	BIZ_Login_UserLogin "admin_core2p"
	RunAction "LoanOfficer", oneIteration
End If

'=========== Validate Loan Processor Persona Type ========

Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "LoanProcessor")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	BIZ_Login_UserLogin "admin_core2p"
	RunAction "LoanProcessor", oneIteration
	
End If

'=========== Validate Closer Persona Type ========

Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Closer")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	BIZ_Login_UserLogin "admin_core2p"
	RunAction "Closer", oneIteration
End If

'=========== Validate Underwriter Persona Type ========

Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Underwriter")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	BIZ_Login_UserLogin "admin_core2p"
	RunAction "Underwriter", oneIteration
End If

'=========== Validate LoanOpener Persona Type ========

Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "LoanOpener")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	BIZ_Login_UserLogin "admin_core2p"
	RunAction "LoanOpener", oneIteration
End If


'=========== Validate Custom Persona Type ========

Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "CustomPersona")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	BIZ_Login_UserLogin "admin_core2p"
	RunAction "CustomPersona", oneIteration
End If

FRM_RT_TeardownTest(null)
