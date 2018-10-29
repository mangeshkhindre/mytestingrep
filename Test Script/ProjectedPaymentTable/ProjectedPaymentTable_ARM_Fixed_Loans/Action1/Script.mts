
FRM_RT_SetupTest(null)

'===== Login to Encompass=====
BIZ_Login_UserLogin "admin_core2p"

'====== ARM Loans with InterestOnly and without InterestOnly =====
Set objData=FRM_DS_GetTestData("Forms_LoanEstimatePage", "ProjectedPayments_ExecutionFlag", "ARM_LoanType_InterestOnly")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	RunAction "ARM_LoanType_InterestOnly", oneIteration
End If

'====== ARM Balloon And MITermination Loans with InterestOnly and without InterestOnly =====
Set objData=FRM_DS_GetTestData("Forms_LoanEstimatePage", "ProjectedPayments_ExecutionFlag", "ARM_LoanType_BalloonInterestOnly")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	RunAction "ARM_LoanType_BalloonAndMITerminationInterestOnly", oneIteration
End If

'===== Logging Out Of Encompass =====
BIZ_Login_UserLogout()

'===== Login to Encompass=====
BIZ_Login_UserLogin "admin_core2p"

'====== Fixed Loans with InterestOnly and without InterestOnly =====
Set objData=FRM_DS_GetTestData("Forms_LoanEstimatePage", "ProjectedPayments_ExecutionFlag", "Fixed_LoanType_InterestOnly")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	RunAction "Fixed_LoanType_InterestOnly", oneIteration
End If

'====== Fixed Balloon And MITermination Loans with InterestOnly and without InterestOnly =====
Set objData=FRM_DS_GetTestData("Forms_LoanEstimatePage", "ProjectedPayments_ExecutionFlag", "Fixed_LoanType_BalloonInterestOnly")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	RunAction "Fixed_LoanType_BalloonAndMITerminationInterestOnly", oneIteration	
End If

'===== Logging Out Of Encompass =====
BIZ_Login_UserLogout()
FRM_RT_TeardownTest(null)
