'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase : PTAC-3113 CONVCASHOUTREFIFIX Qualification 4-Fill 2015 Itemization
'@ Test Automation JIRA Task: PTAC-3372 E2E_3CONVCASHOUTREFIFIX_Qualification
'@ TestData: None
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Login to Encompass as Loan officer.
   '2 In forms select 2015 Itemization form
   '3 Enter the values as in test data
'@ ExpectedResult: 
   '1 Should be able to login to Encompass.
   '2 2015 Itemization Form should open.
   '3 should be able to input values
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3113", "CONVCASHOUTREFIFIX Qualification 4-Fill 2015 Itemization", Null

Dim strFromDate, objParentObject, strToDate, blnButtonStatus

'Login to Encompass with Secondary User details
BIZ_Login_UserLogin "E2E_carollo"
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 10, "Able to login to Encompass using secondary user details"

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_CONVCASHOUTREFIFIX") 
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

strLoanNumber = BIZ_Loan_GetLoanNumber()
BIZ_Loan_SearchLoanByColumnValue "Loan Number",strLoanNumber

Set objParentObject = SwfWindow("swfname:=MainForm").Page("index:=0")

'Open 2015 Itemization form
BIZ_Forms_Open "2015 Itemization"

strFromDate =  SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_L244").GetROProperty("value")

If (Len(Trim(Replace(strFromDate, "/",""))) = 0) Then 	
    objParentObject.WebEdit("html id:=l_L244").Set Date()
    strToDate = DateAdd("d",10, Date())
Else
    strToDate = DateAdd("d", 10, strFromDate)
End If

blnButtonStatus = GUI_Object_GetPropertyValue(objParentObject.WebButton("html id:=FieldLock2"), "title")

If (InStr(blnButtonStatus, "Use the Calculated Value") > 0) Then 
    GUI_WebEdit_Set objParentObject.WebEdit("html id:=l_L245"), strToDate
Else
   GUI_WebButton_Click objParentObject.WebButton("html id:=FieldLock2")
   GUI_WebEdit_Set objParentObject.WebEdit("html id:=l_L245"), strToDate
End If
 @@ hightlight id_;_SwfWindow("Encompass - Build 17.1.0.0").Page("Page").WebEdit("WebEdit")_;_script infofile_;_ZIP::ssf1.xml_;_
'Fill required details in sections 800 in Itemization form
BIZ_2015Itemization_Set800Section "E2E_CONVPURARM"
 
Set objParentObject = Nothing
