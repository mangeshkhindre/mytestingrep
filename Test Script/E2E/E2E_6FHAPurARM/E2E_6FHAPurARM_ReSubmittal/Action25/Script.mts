'@**************************************************************************************************
'@ TestStory: PTAC-2010 E2E_6FHAPURARM
'@ TestCase : PTAC-2047 Resubmittal 2- Get Rate Locked
'@ Test Automation JIRA Task: PTAC-2125 E2E_6FHAPURARM_ReSubmittal
'@ TestData:
	'1 Loans, LoanTemplate, E2E_SecondaryMarketing
	'2 eFolder_Tab, SelectPackageTypeAndPlanCode, E2E_FHAPURARM
	'3 Tools_LockRequestForm, SetRateLockRequest, strRowID	
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
    '1 Login to Encompass as secondary user with the credentials provided in the test data column.Select your loan by your loan number and open the loan.
    '2 1 Select your loan by your loan number and open the loan.
      '2 Select your loan by double clicking on it in the secondary registration/snapshot list
      '3 Click Copy from request and then click Copy from buy side button and click Lock and Confirm button
      '4 Click confirm in the current loan data window
      '5 Click Update button in the pricing import window
      '6 Click ok in the Encompass lock confirmation window
'@ ExpectedResult:
    '1 Should be able to login.Loan should open with the secondary registration page.
    '2 1 Loan should open with the secondary registration page.
      '2 Secondary lock tool will open
      '3 Compare with current loan data window will open
      '4 Encompass Product and pricing service pricing import window will open
      '5 Lock has been successfully confirmed window will open
      '6 In the secondary registration window status of the loan will be locked
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2047","Resubmittal 2- Get Rate Locked", Null

Dim objData, strLoanNumber, blnDaysExists, objSnapShotGrid,  objMainPage, intNumberOfLockRequests, objSecondaryLockTool, objRequest, ObjLockRequestForm

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

If (intNumberOfLockRequests > 0) Then 
	GUI_List_ClickRow objSnapShotGrid, Null, "Status", "Requested", True, False, False, "Double"

	Set objSecondaryLockTool = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=BuySellForm")
	GUI_Object_WaitTillExistX  objSecondaryLockTool.SwfButton("swfname:=btnBuySidePricing"), 120
	GUI_Object_ValidateExists objSecondaryLockTool.SwfButton("swfname:=btnBuySidePricing"), 10, "secondary lock tool will open"	
	GUI_SwfButton_Click objSecondaryLockTool.SwfButton("swfname:=btnBuySidePricing")
    
	If (SwfWindow("swfname:=MainForm").SwfWindow("swfname:=UserPasswordDialog").Exist(10)) Then 
		SwfWindow("swfname:=MainForm").SwfWindow("swfname:=UserPasswordDialog").SwfButton("swfname:=btnContinue").Click
        
		Set objRequest = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=RequestDialog")
		GUI_WebButton_Click objRequest.SwfButton("swfname:=btnContinue")
		
        'Click on Rate Link
		BIZ_LockRequestForm_ImportPricing "E2E_FHAPURARM", "Float"

		GUI_Dialog_Encompass_OKX 60, ""
 	Else
		GUI_Object_WaitTillExistX SwfWindow("swfname:=MainForm").SwfWindow("swfname:=RequestDialog").SwfButton("swfname:=btnContinue"), 240
		GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfWindow("swfname:=RequestDialog").SwfButton("swfname:=btnContinue"), 10, "product and pricing window is open"
		GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=RequestDialog").SwfButton("swfname:=btnContinue")
		
        'Click on Rate Link
		BIZ_LockRequestForm_ImportPricing "E2E_FHAPURARM", "Float"

		GUI_Dialog_Encompass_OKX 60, ""
		
        Set objMainPage = SwfWindow("swfname:=MainForm").Page("index:=0")
		
        If (GUI_Object_IsExistX(objMainPage.WebButton("name:=Submit"), 5)) Then
			GUI_SwfButton_Click objMainPage.WebButton("name:=Submit")
		End If
        
		If (GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").Dialog("text:=Message from webpage").Winbutton("text:=OK"), 5)) Then 
			GUI_WinButton_Click SwfWindow("swfname:=MainForm").Dialog("text:=Message from webpage").Winbutton("text:=OK")
		End If
        
		GUI_Dialog_Encompass_OK("")
	End If
    
	Set objSecondaryLockTool = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=BuySellForm")
	GUI_SwfButton_Click objSecondaryLockTool.SwfButton("swfname:=btnLockConfirm")
	GUI_Object_WaitTillExistX objSecondaryLockTool.SwfWindow("swfname:=LockSnapshotCompareForm").SwfButton("swfname:=btnConfirm"), 60
	GUI_SwfButton_Click objSecondaryLockTool.SwfWindow("swfname:=LockSnapshotCompareForm").SwfButton("swfname:=btnConfirm")
	
    GUI_Object_WaitTillExistX objSecondaryLockTool.SwfWindow("swfname:=DifferencesChangeDialog").SwfButton("swfname:=button1"), 60
	GUI_SwfButton_Click objSecondaryLockTool.SwfWindow("swfname:=DifferencesChangeDialog").SwfButton("swfname:=button1")
	GUI_Dialog_Encompass_OK("")

	blnDaysExists = GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").SwfObject("swfname:=lblLockInfo"), "text")

If (InStr(lcase(blnDaysExists), "days") > 0)  Then 
	FRM_Logger_ReportPassEvent "Lock Request - Update Product Pricing", "Lock icon in the header should be blue and locked with no. of days remaining next to it", Null
	End If
Else
	FRM_Logger_ReportFailEvent "Lock Request - Product Pricing", "Lock request details are not displayed in the list", Null
End If

'BIZ_Loan_SaveLoanNumber()

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objSnapShotGrid      = Nothing
Set objMainPage          = Nothing
Set objData              = Nothing
Set objSecondaryLockTool = Nothing
Set objRequest           = Nothing
Set ObjLockRequestForm   = Nothing
