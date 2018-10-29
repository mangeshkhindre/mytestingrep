'@**************************************************************************************************
'@ TestStory: PTAC-1129  HAPPYPATH_E2E 
'@ TestCase: 
	'PTAC-1122 HP Qualification 1- Complete RegZ LE Form
	'PTAC-1106 HP Qualification 2-Fill 2015 Itemization
	'PTAC-1092 HP Qualification 3-Complete LE Disclosure & E-sign
	'PTAC-1123 HP Qualification 4 - Assign Loan opener and Finish the milestone
'@ Test Automation JIRA Task:   PTAC-1133 E2E_HappyPath_Qualification
'@ TestData: Global_Data,Login,admin_171
	'1 Forms_RegZ-LE,SetDisclosureInformation,E2E_HPQualification1
	'2 Forms_RegZ-LE,InterestOnly,E2E_DisclosureTracking_Step1
	'3 Forms_RegZ-LE,SetLateCharge,Core2p_Integration
	'4 Forms_2015Itemization,Set800Section,E2E_HPQualification3
	'5 Forms_2015Itemization,Set900Section,E2E_HPQual3
	'6 Forms_2015Itemization,Set1000Section,E2E_HPQual3
	'7 Forms_2015Itemization,Set1100Section,E2E_HPQual3
	'8 Forms_2015Itemization,Set1200Section,E2E_HPQual3
	'9 eFolder_Tab,SelectPackageTypeAndPlanCode,CFUN81_PackageType
	'10 eFolder_Tab,SelecteDisclosureDocs,E2E_DisclosureTracking
	'11 eFolder_Tab,SendeDisclosures,E2E_HPQual3
	'12 WebCenter_Application,Basic,E2E_HPQualification3
	'13 Global_Data,Website,Core2p_Integration
'@ Pre-conditions: File started milestone completed
'@ Description:  
'@ TestSteps: 
	'1 Complete Filling RegZ LE DETAILS
	'2 Complete filling 2015 Itemization Details
	'3 Complete LE Disclosure & E-Sign
	'4 Assign Loan Opener and Finish the Milestones
'@ ExpectedResult:
	'1 Details are filled for the Loan and Qualification Milestone is completed
'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-1133","Script Name: E2E_HappyPath_Qualification", Null

'====== PTAC-1122 HP Qualification 1 Complete RegZ LE Form ======
RunAction "Qualification_CompleteRegzLE_001", oneIteration

'====== PTAC-1106 HP Qualification 2 Fill 2015 Itemization ======
RunAction "Qualification_2015Itemization_002", oneIteration

'====== PTAC-1092 HP Qualification 3 Complete LE Disclosure & E-sign ======
RunAction "Qualification_LEDisclosure_003", oneIteration

'====== PTAC-1123 HP Qualification 4 Assign Loan opener and Finish the milestone ======
RunAction "Qualification_FinishMilestone_004", oneIteration

'====== Save loan and exit ======
BIZ_Loan_Exit "True"

'====== Logout from Encompass ======
BIZ_Login_UserLogout()

FRM_RT_TearDownTest(Null)
