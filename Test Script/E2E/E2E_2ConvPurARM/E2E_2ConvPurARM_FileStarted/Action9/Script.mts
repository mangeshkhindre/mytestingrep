'@**************************************************************************************************
'@ TestStory: PTAC-871 E2E_2CONVPURARM
'@ TestCase : PTAC-317 File started 7-Get Rate Locked
'@ Test Automation JIRA Task: PTAC-989 E2E_2CONVPURARM_Filestarted
'@ TestData: 
	'01 Global_Data, Login, E2E_Secondary
	'02 Tools_LockRequestForm, SetRateLockRequest, E2E_CONVPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'01 Now login to Encompass as a secondary User with the following credentials 
	'02 Click pipeline and Search with the loan number and select your loan, Right Click Lock icon from the header Select secondary registration  
	'03 Select your loan by double clicking on it in the "secondary registration/snapshot list" 
	'04 Click "get buy side pricing" button  
	'05 Click continue with the sign in with the credentials provided by default 
	'06 Click the rate that you have already selected during submit request stage 
	'07 Click submit 
	'08 Click ok in the pop up window 
	'09 Click ok in the pricing data imported message window 
	'10 In the secondary lock tool click lock and confirm button 
	'11 Click confirm button in the compare with current loan data window 
	'12 Click update button in the encompass product and pricing service pricing import window 
	'13 Click ok 
	'14 Now exit encompass
'@ ExpectedResult:
	'01 Should be able to sign in as secondary user 
	'02 Loan should open with secondary registration snapshot list 
	'03 Secondary lock tool will open 
	'04 Product and pricing window will open 
	'05 Should login successfully and encompass product and pricing service window will open in services view tab 
	'06 Encompass product and pricing service summary window will open 
	'07 Rate may not be current- message will appear 
	'08 Pricing data imported message will appear It will show you the buyside pricing 
	'09 Secondary lock tool should be seen.net price adjustment field should be the same in both 
	'10 Compare with current loan data window will open 
	'11 Encompass product and pricing service pricing import will open 
	'12 The lock has been successfully confirmed window will open 
	'13 Lock icon in the header should be blue and locked with no of days remaining next to it
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-317","File started 7-Get Rate Locked", Null

Dim blnDaysExists, objSnapShotGrid, objSecondaryLockTool, objMainPage, intNumberOfLockRequests
Dim objRequest, objData, strLoanNumber, ObjLockRequestForm
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

Set objSnapShotGrid = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridSnapshot")
intNumberOfLockRequests =GUI_List_GetNumberofRows(objSnapShotGrid)

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
		BIZ_LockRequestForm_ImportPricing "E2E_CONVPURARM", "Float"

		GUI_Dialog_Encompass_OKX 60, ""
 	Else
		GUI_Object_WaitTillExistX SwfWindow("swfname:=MainForm").SwfWindow("swfname:=RequestDialog").SwfButton("swfname:=btnContinue"), 240
		GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfWindow("swfname:=RequestDialog").SwfButton("swfname:=btnContinue"), 10, "product and pricing window is open"
		GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=RequestDialog").SwfButton("swfname:=btnContinue")
		'Click on Rate Link
		BIZ_LockRequestForm_ImportPricing "E2E_CONVPURARM", "Float"

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
Set objSecondaryLockTool = Nothing
