'@**************************************************************************************************
'@ TestStory: PTAC-899 Tables and Fees
'@ TestCase: 
    '1 PTAC-257 Verify the plan settings are populates in Compensation plan record as default and making active record 
    '2 PTAC-255 Verify export of all data in grid of LO Compensation into excel file 
 '@ Test Automation JIRA Task: PTAC-1043 Settings_TablesAndFees_CompensationPlan_DefaultAndExport
'@ TestData: Settings_TablesFees, CompensationPlan and PTAC-257
'@ Pre-conditions:
    '1 Login as Admin user
    '2 Go to Setting window
    '3 Select Tables and Fees: LO Compensation
'@ Description: Compensation Plan Record creation,Editting,Duplicating,Deleting
'@ TestSteps:
	'1 Go to Default Plan Settings section.
	    'Change the fields data in below fields
		'Loan officer/Broker,Trigger basis,Minimum term days,Rounding,Lender paid/Broker paid/Excempt
	    'Click Save icon.	
	'2 Click on New icon
	   'Check the plan settings populates as default fields
	   'Loan officer/Broker,Trigger basis,Minimum term 	
	'3 Enter field values as per test data	
	'4 Click on Active check box ans save the record
    '5 '1 Click LO Compensation page
       '2 Click on Excel icon
       '3 Select "Export list of Comp plans" radio button in LO Compensation Export alert message
       '4 Click on Cancel
       '5 Click on Export   
	'6 Check the exported data in Excel with column values under LO Compensation plans grid and Default plan settings section
		'Plan Name
		'Description
		'Status	
		'LO/Broker
		'Min # Days
		'Activation Date
		'Rounding Type
		'Loan Amount %
		'% of Additional $ Amount
		 'Minimum $
		 'Maximum $
'@ ExpectedResult:
	'1 Default settings page saved with changed data 
	'2 System should populates default setting values in Compensation page and user is able to change if require
	'3 System should allow to enter the data
	'4 System save the record with all details and available in grid.
    '5  After Step4, No data exported
       'After Step5, LO Compensation Data should be exported into Excel in local drive
	'6 System should check all values in Grid & section w.r.t to each row in excel
'***************************************************************************************************
'======== Login to the Encompass as admin========     
BIZ_Login_UserLogin "admin_core2p"

FRM_Logger_ReportStepEvent "Scenario #3: Verify Plan Settings are populates in Compensation Plan Record as default and making active record and Export into Excel file","Validate Plan Settings are populates in Compensation Plan Record as default and making active record and Export into Excel file", Null

Dim strRowID, strFileName, strPlanName, strExcelFilePath
strRowID		=	"CompensationPlan_Exoprt"
strFileName		=	"CompensationPlanRecord.xlsx"

'====== Go to Settings/'Tables and Fees'/LO Compensation ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Tables and Fees", "LO Compensation"

'====== Verify the plan settings are populates in Compensation plan record as default and making active record  ======
FRM_Logger_ReportStepEvent "Test Case #1 Verify the plan settings are populates in Compensation plan record as default and making active record","Validate the plan settings are populates in Compensation plan record as default and making active record", Null
BIZ_Settings_TablesAndFees_LOCompensation_SetDefaultPlanSetting(strRowID)

BIZ_Settings_ClickAdd()
BIZ_Settings_TablesAndFees_LOCompensation_VerifyDefaultPlanSetting(strRowID)
strPlanName = BIZ_Settings_TablesAndFees_SetLOCompPlanDetails(strRowID)

'====== Verify export of all data in grid of LO Compensation into excel file   ======
FRM_Logger_ReportStepEvent "Verify export of all data in grid of LO Compensation into excel file","Validate export of all data in grid of LO Compensation into excel file", Null
BIZ_TablesAndFees_ValidateCompensationPlanDetails strPlanName,strRowID

UTIL_Win_CloseExcel()
BIZ_Settings_TablesAndFees_Export_CompensationPlanToExcel(strFileName)
'strFileName		=	"LOData.xlsx"
BIZ_Settings_TablesAndFees_Verify_ExportedCompensationPlanDetailsInExcel strRowID,strFileName,strPlanName
strExcelFilePath   = Pathfinder.Locate("Test Report\")&strFileName
UTIL_Excel_Opened_File_Delete strExcelFilePath

'====== Delete LO Compensation Plan ======
BIZ_Settings_TablesAndFees_DeleteLOCompPlan strPlanName
BIZ_Settings_ClickClose

'===== To logout from Encompass =====
BIZ_Login_UserLogout()
 
