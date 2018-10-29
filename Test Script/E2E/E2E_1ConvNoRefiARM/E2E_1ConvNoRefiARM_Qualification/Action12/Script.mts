'@**************************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase:  PTAC-1269 CONVNOCASHREFIARM - Qualification 2 - Fill 2015 Itemization
'@ Test Automation JIRA Task: PTAC-1664  E2E_1ConvNoRefiARM_Qualification
'@ TestData: None
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 In forms select 2015 Itemization form
   '2 Enter the values as in test data
'@ ExpectedResult: 
   '1 2015 Itemization Form should open.
   '2 should be able to input values
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1269", "CONVNOCASHREFIARM - Qualification 2 - Fill 2015 Itemization", Null

Dim strFromDate, objParentObject, strToDate, BlnButtonStatus
Set objParentObject = SwfWindow("swfname:=MainForm").Page("index:=0")

'Open 2015 Itemization form
BIZ_Forms_Open "2015 Itemization"

strFromDate =  SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_L244").GetROProperty("value")

If(Len(Trim(Replace(strFromDate, "/",""))) = 0) Then 	
   objParentObject.WebEdit("html id:=l_L244").Set Date()
   strToDate = DateAdd("d",10, Date())
Else
   strToDate = DateAdd("d", 10, strFromDate)
End If

BlnButtonStatus = GUI_Object_GetPropertyValue(objParentObject.WebButton("html id:=FieldLock2"), "title")

If(InStr(BlnButtonStatus, "Use the Calculated Value") > 0) Then 
   GUI_WebEdit_Set objParentObject.WebEdit("html id:=l_L245"), strToDate
Else
   GUI_WebButton_Click objParentObject.WebButton("html id:=FieldLock2")
   GUI_WebEdit_Set objParentObject.WebEdit("html id:=l_L245"), strToDate
End If
 
 @@ hightlight id_;_SwfWindow("Encompass - Build 17.1.0.0").Page("Page").WebEdit("WebEdit")_;_script infofile_;_ZIP::ssf1.xml_;_
'Fill required details in sections 800 in Itemization form
BIZ_2015Itemization_Set800Section "E2E_CONVPURARM"
 
Set objParentObject = Nothing