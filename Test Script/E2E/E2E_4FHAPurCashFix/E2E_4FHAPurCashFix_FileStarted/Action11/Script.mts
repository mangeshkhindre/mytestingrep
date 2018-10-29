'@**************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase : PTAC-3078 FHAPURCHASEFIX - File Started 7-Get Rate Locked by Secondary locking user
'@ Test Automation JIRA Task: PTAC-3150 E2E_4FHAPURCASHFIX_Filestarted
'@ TestData:  Tools_LockRequestForm, SetRateLockRequest, E2E_FHAPURCASHFIX    
'@ Pre-conditions: 
'@ Description: Get Rate Lock and LO comp plan and Float.
'@ TestSteps:
    '1 In the lock request form click Submit request.
    '2 click manage borrowers button next to borrower information in lock request form and click self employed for borrower 
    '3 click 'submit request' button.(get pricing step 2 and submit request should be done within 2 minutes. If not you can repeat the same steps from 2 to 9) 
    '4 click exit loan button in the popup window.
    '5 In pipeline select the same loan by double clicking on it.
'@ ExpectedResult:  
    '1 should go back to lock request form.
    '2 a popup window will open with the following fields not filled: experian,transunion and equifax.
    '3 all the credit score values will be populated.
    '4 A new window opens with the following message : Lock request has been submitted. Lockdesk cannot process until you exit the loan.
    '5 Should go back to pipeline.
    '6 In the header section lock requested message should be seen next to the lock icon. Under log and under file started milestone ""price table- lock requested"" with the date should be seen."
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3078","FHAPURCHASEFIX - File Started 7-Get Rate Locked by Secondary locking user", Null

Dim blnDaysExists, objSnapShotGrid, objSecondaryLockTool, objMainPage, intNumberOfLockRequests,objData,strLoanNumber,objRequest,ObjLockRequestForm

'Login to Encompass with Secondary User details
BIZ_Login_UserLogin "E2E_Secondary"
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 10, "Able to login to Encompass using secondary user details"

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_SecondaryMarketing") 
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")
GUI_Dialog_Encompass_OK("")

strLoanNumber = BIZ_Loan_GetLoanNumber()
BIZ_Loan_SearchLoanByColumnValue "Loan Number",strLoanNumber
GUI_Dialog_Encompass_YesX 3, ""

'Go to Tools->Secondary Registration
BIZ_Tools_Open("Secondary Registration")

Set objSnapShotGrid     = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridSnapshot")
intNumberOfLockRequests = GUI_List_GetNumberofRows(objSnapShotGrid)

If  (intNumberOfLockRequests > 0) Then 
	GUI_List_ClickRow objSnapShotGrid, Null, "Status", "Requested", True, False, False, "Double"

	Set objSecondaryLockTool = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=BuySellForm")
	GUI_Object_WaitTillExistX  objSecondaryLockTool.SwfButton("swfname:=btnBuySidePricing"), 120
	GUI_Object_ValidateExists objSecondaryLockTool.SwfButton("swfname:=btnBuySidePricing"), 10, "secondary lock tool will open"	
	GUI_SwfButton_Click objSecondaryLockTool.SwfButton("swfname:=btnBuySidePricing")
	
	If  (SwfWindow("swfname:=MainForm").SwfWindow("swfname:=UserPasswordDialog").Exist(10)) Then 
		SwfWindow("swfname:=MainForm").SwfWindow("swfname:=UserPasswordDialog").SwfButton("swfname:=btnContinue").Click
		Set objRequest = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=RequestDialog")
		GUI_WebButton_Click objRequest.SwfButton("swfname:=btnContinue")
		'Click on Rate Link
		BIZ_LockRequestForm_SelecttheProgramIDAndPrice "E2E_FHAPURCASHFIX" 

		Set ObjLockRequestForm = SwfWindow("swfname:=MainForm").Page("index:=0")
		'Clicks on Float Button
		If (GUI_Object_IsExistX(ObjLockRequestForm.WebButton("name:=Float"), 120) = True) Then 
			GUI_WebButton_Click ObjLockRequestForm.WebButton("name:=Float")
	    End If  
		GUI_Dialog_Encompass_OKX 600, ""
		GUI_Dialog_Encompass_OKX 60, ""
    Else
		If (GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=RequestDialog").SwfButton("swfname:=btnContinue"), 240))Then 
			GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=RequestDialog").SwfButton("swfname:=btnContinue")
		ElseIf (GUI_Object_IsExist(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=BuySellForm").SwfWindow("swfname:=RequestDialog").SwfButton("swfname:=btnContinue")))Then 
			GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=BuySellForm").SwfWindow("swfname:=RequestDialog").SwfButton("swfname:=btnContinue")
		End If
		'Click on Rate Link
		BIZ_LockRequestForm_SelecttheProgramIDAndPrice "E2E_CONVPURARM" 

		Set ObjLockRequestForm = SwfWindow("swfname:=MainForm").Page("index:=0")
		'Clicks on Float Button
		If (GUI_Object_IsExistX(ObjLockRequestForm.WebButton("name:=Float"), 120) = True) Then 
		   GUI_WebButton_Click ObjLockRequestForm.WebButton("name:=Float")
		End If 
		
		GUI_Dialog_Encompass_OKX 600, ""
		GUI_Dialog_Encompass_OKX 60, ""
		Set objMainPage = SwfWindow("swfname:=MainForm").Page("index:=0")
		
		If (GUI_Object_IsExistX(objMainPage.WebButton("name:=Submit"), 5)) Then
			GUI_SwfButton_Click objMainPage.WebButton("name:=Submit")
		End If
		
		If  (GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").Dialog("text:=Message from webpage").Winbutton("text:=OK"), 5)) Then 
			GUI_WinButton_Click SwfWindow("swfname:=MainForm").Dialog("text:=Message from webpage").Winbutton("text:=OK")
		End If
		GUI_Dialog_Encompass_OK("")
    End If
	
	Set objSecondaryLockTool = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=BuySellForm")
	GUI_SwfButton_Click objSecondaryLockTool.SwfButton("swfname:=btnLockConfirm")
	
	If (GUI_Object_IsExistX(objSecondaryLockTool.SwfWindow("swfname:=LockSnapshotCompareForm").SwfButton("swfname:=btnConfirm"), 360)) Then
	    GUI_SwfButton_Click objSecondaryLockTool.SwfWindow("swfname:=LockSnapshotCompareForm").SwfButton("swfname:=btnConfirm")
	End If
	
	If (GUI_Object_IsExistX(objSecondaryLockTool.SwfWindow("swfname:=DifferencesChangeDialog").SwfButton("swfname:=button1"), 360))Then
	   GUI_SwfButton_Click objSecondaryLockTool.SwfWindow("swfname:=DifferencesChangeDialog").SwfButton("swfname:=button1")
    End If
	
	GUI_Dialog_Encompass_OK("")

	blnDaysExists = GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").SwfObject("swfname:=lblLockInfo"), "text")

	If (InStr(lcase(blnDaysExists), "days") > 0)  Then 
		FRM_Logger_ReportPassEvent "Lock Request - Update Product Pricing", "Lock icon in the header should be blue and locked with no. of days remaining next to it", Null
	Else
		FRM_Logger_ReportFailEvent "Lock Request - Update Product Pricing", "No. of days is not displayed next to it", Null
	End If 
Else
	    FRM_Logger_ReportFailEvent "Lock Request - Product Pricing", "Lock request details are not displayed in the list", Null
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objData              = Nothing
Set objSnapShotGrid      = Nothing
Set objSecondaryLockTool = Nothing
Set objRequest           = Nothing
Set ObjLockRequestForm   = Nothing
Set objMainPage          = Nothing
