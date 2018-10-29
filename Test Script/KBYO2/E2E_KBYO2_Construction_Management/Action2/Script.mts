
'********************************************************************************************

'====== Navigate to pipeline and create a new loan ======
FRM_Logger_ReportStepEvent "TC #1 (CBIZ-15785) : Update Fee Variance to add Post Consummation Fees ","Update Fee Variance to add Post Consummation Fees ",null
BIZ_Nav_SelectPipelineTab()
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "Automation"

'====== Navigate to 1003 Page1  Form ====== 
Set objConstructionPage = SwfWindow("swfname:=MainForm").Page("micclass:=Page","index:=0")
Set objPayoffPayment=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=PayoffsAndPaymentsDialog")
'=========================== 'Set 1003 page 1 TestData ==============================================================

BIZ_1003Page1_SetData "CBIZ-15785"
BIZ_1003Page1_SetBorrower "CBIZ-15785"

'=========================== Set the origination Fee as 1% on 2015 Itemisation ==============================================================
BIZ_Forms_Open "2015 Itemization"
GUI_WebEdit_Set objConstructionPage.WebEdit("html id:=TextBox12"), "1"


'====== Navigate to RegZ-CD Form ======
BIZ_Forms_Open "RegZ - CD"
BIZ_RegZ_CD_SetLoanInformation "CBIZ-15785"

'=========================== Send LE and CD ==============================================================
FRM_Logger_ReportStepEvent "Validate LE and CD is sent ","Send the LE and CD ",null
	
'LE sent 
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTrackingTool_AddDisclosure True,"LE",true,true
BIZ_DisclosureTrackingTool_AddDisclosure True,"CD",false,false

'====== Navigate to 2015 Itemization Form PC1 ======

BIZ_Forms_Open "2015 Itemization"
wait 2
FRM_Logger_ReportStepEvent "SetPC1 Field Data","SetPC1 Field Data",null
strPC1FeeVariance=SetPCData_PC1 ("CBIZ15785_PC1")

'====== Loan Save ======
BIZ_Loan_Save

'=========================== Validate GFE alert is generated  ======================================================================================
BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages","Good Faith Fee Variance Violated"

FRM_Logger_ReportStepEvent "Validate PC1 Details on Fee Variance Form ","Validate PC1 Details on Fee Variance Form ",null
'********************* Navigate to Fee VAriance For Verification ***********************************************************************************************************
Set objConstructionPage = SwfWindow("swfname:=MainForm").Page("micclass:=Page","index:=0")
BIZ_Tools_Open "Fee Variance Worksheet"
wait 1

objConstructionPage.WebEdit("html id:=TextBox37").highlight
strPC1FeeVariance=FormatNumber(strPC1FeeVariance,2)
FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=TextBox37"),"value"),Cstr(strPC1FeeVariance),"Validate Services Cannot Shop for field PC1","Validate Services Cannot Shop for field Charges that Cannot Increase Section"

'====== Navigate to 2015 Itemization Form  PC2 =================================================================================================================================

BIZ_Forms_Open "2015 Itemization"
wait 2
FRM_Logger_ReportStepEvent "SetPC2 Field Data","SetPC2 Field Data",null
strPC2FeeVariance=SetPCData_PC2 ("CBIZ15785_PC2")
strPC2FeeVariance=FormatNumber(strPC2FeeVariance,2)

'********************* Navigate to Fee VAriance For Verification **********************************************************************************************
FRM_Logger_ReportStepEvent "Validate PC2 Details on Fee Variance Form ","Validate PC2 Details on Fee Variance Form ",null
Set objConstructionPage = SwfWindow("swfname:=MainForm").Page("micclass:=Page","index:=0")
BIZ_Tools_Open "Fee Variance Worksheet"
wait 1

objConstructionPage.WebEdit("html id:=TextBox41").highlight
FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=TextBox41"),"value"),Cstr(strPC2FeeVariance),"Validate Services Can Shop for field PC2","Validate Services Can Shop for field Charges that Cannot Increase Section"

'====== Navigate to 2015 Itemization Form PC3 =============================================================================================================================================================

BIZ_Forms_Open "2015 Itemization"
wait 2
FRM_Logger_ReportStepEvent "SetPC2 Field Data","SetPC3 Field Data",null
strPC3FeeVariance=SetPCData_PC3 ("CBIZ15785_PC3")


'********************* Navigate to Fee VAriance For Verification ***********************************************************************************************
FRM_Logger_ReportStepEvent "Validate PC3 Details on Fee Variance Form ","Validate PC3 Details on Fee Variance Form ",null
Set objConstructionPage = SwfWindow("swfname:=MainForm").Page("micclass:=Page","index:=0")
BIZ_Tools_Open "Fee Variance Worksheet"
wait 1

arrPC3FeeVarianceFieldName=split(strPC3FeeVariance,",")

arrPC3FeeVarianceFieldName(0)=FormatNumber(arrPC3FeeVarianceFieldName(0),2)
objConstructionPage.WebEdit("html id:=TextBox306").highlight
FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=TextBox306"),"value"),Cstr(arrPC3FeeVarianceFieldName(1)),"Validate PC3 Condtions","Validate PC3 Condtions Charges that Can Increase Section"
objConstructionPage.WebEdit("html id:=TextBox330").highlight
FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=TextBox330"),"value"),"2003","Validate PC3 Condtions","Validate PC3 Condtions Charges that Can Increase Section"
objConstructionPage.WebEdit("html id:=TextBox209").highlight
FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=TextBox209"),"value"),Cstr(arrPC3FeeVarianceFieldName(0)),"Validate PC3 Condtions","Validate PC3 Condtions Charges that Can Increase Section"

'====== Navigate to 2015 Itemization Form  PC4 =======================================================================================================================

BIZ_Forms_Open "2015 Itemization"
wait 2
FRM_Logger_ReportStepEvent "SetPC2 Field Data","SetPC4 Field Data",null
strPC4FeeVariance=SetPCData_PC4 ("CBIZ15785_PC4")


'********************* Navigate to Fee VAriance For Verification ****************************************
FRM_Logger_ReportStepEvent "Validate PC4 Details on Fee Variance Form ","Validate PC4 Details on Fee Variance Form ",null
Set objConstructionPage = SwfWindow("swfname:=MainForm").Page("micclass:=Page","index:=0")
BIZ_Tools_Open "Fee Variance Worksheet"
wait 1

arrPC4FeeVarianceFieldName=split(strPC4FeeVariance,",")
strval=Cint(arrPC4FeeVarianceFieldName(0))+cint(arrPC4FeeVarianceFieldName(1))

strval=FormatNumber (strval,2)


objConstructionPage.WebEdit("html id:=TextBox163").highlight
FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=TextBox163"),"value"),Cstr(arrPC4FeeVarianceFieldName(2)),"Validate PC4 Condtions","Validate PC4 Condtions Charges that Can Increase More than 10% Section"
objConstructionPage.WebEdit("html id:=TextBox187").highlight
FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=TextBox187"),"value"),"2004","Validate PC4 Condtions","Validate PC4 Condtions Charges that Can Increase More than 10% Section"
objConstructionPage.WebEdit("html id:=TextBox63").highlight
FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=TextBox63"),"value"),strval,"Validate PC4 Condtions","Validate PC4 Condtions Charges that Can Increase More than 10% Section"

'********************* Navigate to Fee Variance For Verification of Overall calculations borrower******************************************************

validatePCConsumptionFees()

FRM_Logger_ReportStepEvent "Validate CBIZ-14296:- PaidBy is Lender Scenario ","Validate PaidBy is Lender Scenario ",null
SetPCData_PC1 ("CBIZ14296_PC1")
validatePostConsummationConstructionFees "CBIZ14296_PC1"

'=========================== Validate GFE alert is generated and its contents ======================================================================================
validateGFEDetails()

