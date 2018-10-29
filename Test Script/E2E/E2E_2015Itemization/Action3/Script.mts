'@******************************************************************************************
'@ TestStory: 
'@ TestCase: E2E_2015Itemization
'@ Test Automation JIRA Task: TA-4709
'@ TestData: "Forms_BorrowerSummaryOrigination","SetBorrower","E2E_2015Itemization_BorrwerInfo"
'@ TestData: "Forms_BorrowerSummaryOrigination","SetTransactionDetails","E2E_2015Itemization_TransactionDetail"
'@ TestData: "Forms_BorrowerSummaryOrigination","SetProperty","E2E_2015Itemization_PropertyInfo"
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Login to Encompass as an admin user
	'2 Create new blank loan and add data in Summary - Origination Form
	'3 Enter data in 1003 Page
	'4 Apply closing cost template created in previous step
	'5 Verify fees on 2015Itemization form
'@ ExpectedResult: 1.Below alerts should be triggered
                    '- eSign Consent Not Yet Received
                    '- Send Initial Disclosures
'                   2.Total fees value should be same as total of all fees set in particular section.
'					
'******************************************************************************************************
'enable alert "Send Initial Disclosures"---this is a prerequisite
'BIZ_LoanSetup_Alerts_EditAlert "Alerts_SendInitialDisc"

'====== Navigate to Pipeline and and select Pipeline view and Loan Folder =======
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View","Automation"
BIZ_Loan_AddNewBlankLoan()

FRM_Logger_ReportInfoEvent "TC2","Test step-1 Set Data for newly created loan",Null

'==================Add Values in Borrower Summary Origination Form===================
BIZ_BorrowerSummaryOrigination_SetBorrower("E2E_2015Itemization_BorrwerInfo")
BIZ_BorrowerSummaryOrigination_SetTransactionDetails("E2E_2015Itemization_TransactionDetail")
BIZ_BorrowerSummaryOrigination_SetProperty("E2E_2015Itemization_PropertyInfo")

Dim objMainForm
Set objMainForm = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")

'========Go to 1003 Page 2 form=========
BIZ_Forms_Open "1003 Page 2"

'=============Set Base Income============
GUI_WebEdit_Set objMainForm.WebEdit("html id:=l_101"),"6000"

'========Save Loan=============
BIZ_Loan_Save()

FRM_Logger_ReportStepEvent "TC2","Verify if eConsent Not Yet Received,Send Initial Disclosures alerts are triggered.",Null

'============Verify if Send Initial Disclosures alrert is triggered============
BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages","Send Initial Disclosures"

'============Verify if eSign Consent Not Yet Received alrert is triggered============
BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages","eConsent Not Yet Received"

FRM_Logger_ReportInfoEvent "TC3","Apply closing cost template created in previous step.",Null

'=============Apply closing cost template=============
BIZ_Loan_ApplyClosingCostTemplate("E2E_2015Itemization")

'============Open 2015 Itemization==============
BIZ_Forms_Open "2015 Itemization"

'=============Wait till exists===============
GUI_Object_WaitTillExistX objMainForm.WebEdit("html id:=TextBox12"),20

FRM_Logger_ReportStepEvent "TC3","Verify if all the values set in closing cost template are getting populated correctly.",Null

'============Verify checkboxes checked in 800 line==========
VerifyClickedCheckboxFeeDetails "801d",Array("Impacts APR")
'VerifyClickedCheckboxFeeDetails "804",Array("Seller Obligated")

'============Verify checkboxes checked in 900 line==========
VerifyClickedCheckboxFeeDetails "904",Array("Borrower Can Shop")
VerifyClickedCheckboxFeeDetails "907", Array("Borrower Can Shop","Borrower Did Shop")
VerifyClickedCheckboxFeeDetails "908", Array("Property Taxes")
VerifyClickedCheckboxFeeDetails "911", Array("Other")
VerifyClickedCheckboxFeeDetails "912", Array("Homeowner's Insurance")

Set objData801b = FRM_DS_GetTestData("Forms_2015Itemization", "SetFeeDetails", "E2E_2015Itemization_801b")

'============Verify fees set on line details page==============
strArrAllFieldID801b = Array("txtBorFinanced","txtBorPOC")
strArrAllColumn801b = Array("Bor_Financed","Bor_POC")

VerifyFees "801b",strArrAllFieldID801b,objData801b,strArrAllColumn801b

Set objData801c = FRM_DS_GetTestData("Forms_2015Itemization", "SetFeeDetails", "E2E_2015Itemization_801c")

'=================Validate Paid to type value=======================
GUI_Object_ValidateValue objMainform.WebList("html id:=DropdownBox83"),"L","Paid To Type"

strArrAllFieldID801c = Array("txtBorFinanced","txtBorPOC","txtBrokerPAC","txtOtherPAC")
strArrAllColumn801c = Array("Bor_Financed","Bor_POC","Broker_PAC","Other_PAC")

VerifyFees "801c",strArrAllFieldID801c,objData801c,strArrAllColumn801c

Set objData805 = FRM_DS_GetTestData("Forms_2015Itemization", "SetFeeDetails", "E2E_2015Itemization_805")

'=================Validate Paid to type value=======================
GUI_Object_ValidateValue objMainform.WebList("html id:=DropdownBox7"),"B","Paid To Type"

Set objData800 = FRM_DS_GetTestData("Forms_2015Itemization", "Set800Section", "E2E_2015Itemization_Section800_CC")
 
'=================Verify fee values in 800 section============== 
strArrAllFieldID800 = Array("TextBox12","l_L228","TextBox66","TextBox67","l_640","TextBox50A","l_336","l_L230","TextBox135"_
                       ,"TextBox136","TextBox137","TextBox124","TextBox125","TextBox126","TextBox127")
strArrAllColumn800 = Array("801a_LoanOriginationFess","801b_ApplicationFees","801c_ProcessingFees","801d_UnderwritingFees","804_Borrower"_
                     ,"805_Borrower","806_Borrower","807_Borrower","ApplicationFees_Seller","ProcessingFees_Seller","UnderwritingFees_Seller"_
                     ,"AppraisalFees_Seller","CreditReport_Seller","TaxService_Seller","FloodCert_Seller")
                     
'============Verify fees paid by Borrower and Seller================
VerifyFees "",strArrAllFieldID800,objData800,strArrAllColumn800

'==================Loan Origination Fees====================
intLoanOriginationFeesActual = CINT(GUI_Object_GetPropertyValue(objMainForm.WebEdit("html id:=l_454"),"value"))

'============Open 2015 Itemization==============
BIZ_Forms_Open "Borrower Summary - Origination"

'===================Get loan amount======================
dblLoanAmount = CDBL(GUI_Object_GetPropertyValue(objMainForm.WebEdit("html id:=l_1109"),"value"))

'============Open 2015 Itemization==============
BIZ_Forms_Open "2015 Itemization"

'===============Wait to open form===============
Wait 10

'===========Get value of Loan Origination fees percent==============
intLoanOriginationFeesPercent = CINT(GUI_Object_GetPropertyValue(objMainForm.WebEdit("html id:=TextBox12"),"value"))

intLoanOriginationFeesCalc = CINT((dblLoanAmount*intLoanOriginationFeesPercent)/100)

Set objData900 = FRM_DS_GetTestData("Forms_2015Itemization", "Set900Section", "E2E_2015Itemization_Section900_CC")

'=================Verify fee values in 900 section============== 
strArrAllFieldID900 = Array("l_L251","TextBox658","TextBox666","TextBox660","TextBox668","TextBox661","TextBox669","TextBox664","TextBox672","TextBox665"_
                       ,"TextBox673","l_1850","TextBox43","TextBox56","TextBox359","TextBox358")
strArrAllColumn900 = Array("903_mths","904_mths","904_Taxes","907_mths","907_Taxes","908_mths","908_Taxes","911_mths","911_Taxes","912_mths","912_Taxes"_
                       ,"904_Seller","907_Seller","908_Seller","911_Seller","912_Seller")

'============Verify fees paid by Borrower and Seller================
VerifyFees "",strArrAllFieldID900,objData900,strArrAllColumn900

'=================Verify Borrower fee values in 903 line============== 
CalculateVerifyBorrowerFees "Borrower fee values in 903 line", "l_L251","l_230_2","l_642",""

'=================Verify Borrower fee values in 904 line============== 
CalculateVerifyBorrowerFees "Borrower fee values in 904 line", "TextBox658","TextBox666","l_1849","l_1850"

'=================Verify fee values in 907 section============== 
CalculateVerifyBorrowerFees "Borrower fee values in 907 line", "TextBox660","TextBox668","l_L260","TextBox43"

'=================Verify fee values in 908 section============== 
CalculateVerifyBorrowerFees "Borrower fee values in 908 line", "TextBox661","TextBox669","l_1667","TextBox56"

'=================Verify fee values in 911 section============== 
CalculateVerifyBorrowerFees "Borrower fee values in 911 line", "TextBox664","TextBox672","l_NEWHUDX1588","TextBox359"

'=================Verify fee values in 912 section============== 
CalculateVerifyBorrowerFees "Borrower fee values in 912 line", "TextBox665","TextBox673","l_NEWHUDX1596","TextBox358"

Set objData1000 = FRM_DS_GetTestData("Forms_2015Itemization", "Set1000Section", "E2E_2015Itemization_Section1000_CC")
 
'=================Verify fee values in 1000 section============== 
'============Verify fees paid by Borrower and Seller================
strArrAllFieldID1000 = Array("l_1386","l_231","TextBox384")
strArrAllColumn1000 = Array("1004_mths","1004_Taxes","1004_Seller")

'============Verify fees paid by Borrower and Seller================
VerifyFees "",strArrAllFieldID1000,objData1000,strArrAllColumn1000

'=================Verify fee values in 1002 section============== 
CalculateVerifyBorrowerFees "Borrower fee values in 1002 line", "l_1387","l_230","TextBox103","TextBox386"

'=================Verify fee values in 1004 section============== 
CalculateVerifyBorrowerFees "Borrower fee values in 1004 line", "l_1386","l_231","TextBox106","TextBox384"

Set objData1100 = FRM_DS_GetTestData("Forms_2015Itemization", "Set1100Section", "E2E_2015Itemization_Section1100_CC")

'=================Verify fee values in 1100 section============== 
'============Verify fees paid by Borrower and Seller================
strArrAllFieldID1100 = Array("TextBox161","TextBox162","TextBox163","TextBox145","TextBox148","TextBox424","TextBox61","TextBox29","TextBox172"_
                       ,"TextBox173","TextBox174","TextBox633","TextBox634","TextBox635","TextBox129","TextBox130")
strArrAllColumn1100 = Array("1101a_Borrower","1101b_Borrower","1101c_Borrower","1102a_Borrower","1102b_Borrower","1102c_Borrower","1103_Borrower"_
                    ,"1104_Borrower","1101a_Seller","1101b_Seller","1101c_Seller","1102a_Seller","1102b_Seller","1102c_Seller","1103_Seller","1104_Seller")
                    
'============Verify fees paid by Borrower and Seller================
VerifyFees "",strArrAllFieldID1100,objData1100,strArrAllColumn1100

Set objData1200 = FRM_DS_GetTestData("Forms_2015Itemization", "Set1200Section", "E2E_2015Itemization_Section1200_CC")

'=================Verify fees values in 1200 section============
'============Verify fees paid by Borrower and Seller================
strArrAllFieldID1200 = Array("TextBox35","TextBox15","TextBox36","TextBox38","TextBox44","TextBox133","TextBox114","TextBox115")
strArrAllColumn1200 = Array("1202_Borrower","1203_Borrower","1204_Borrower","1205_Borrower","1202_Seller","1203_Seller","1204_Seller","1205_Seller")

'============Verify fees paid by Borrower and Seller================
VerifyFees "",strArrAllFieldID1200,objData1200,strArrAllColumn1200

Set objData1300 = FRM_DS_GetTestData("Forms_2015Itemization", "Set1300Section", "E2E_2015Itemization_Section1300_CC")

'=================Verify fees values in 1300 section============
'============Verify fees paid by Borrower and Seller================
strArrAllFieldID1300 = Array("l_339","l_645","l_564","l_590","l_591")
strArrAllColumn1300 = Array("1302_Borrower","1304_Borrower","1302_Seller","1303_Seller","1304_Seller")

'============Verify fees paid by Borrower and Seller================
VerifyFees "",strArrAllFieldID1300,objData1300,strArrAllColumn1300
