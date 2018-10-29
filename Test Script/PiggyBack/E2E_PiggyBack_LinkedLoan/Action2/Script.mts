'@**************************************************************************************************
'@ TestStory: PTAC-3157 Piggyback
'@ TestCase: PTAC-2406 Piggyback - Linked loan indicator in linked loans.
'@ Test Automation JIRA Task: PTAC-3158 Piggyback_LinkLoan
'@ TestData: 
   '1 Forms_BorrowerSummaryOrigination, SetBorrower, PTAC-2406_BasicInfoForLoan1
   '2 Forms_BorrowerSummaryOrigination, SetBorrower, PTAC-2406_BasicInfoForLoan2
'@ Pre-conditions: 
'@ Description:
   ' If Link GUID is not blank, then:
   ' (1) Display the Link icon in the Pipeline View When user clicks on the Link icon, 
   ' a message appears showing the Loan # for the selected loan and the linked loan. User is given the option to open the linked loan.
'@ TestSteps:
   '1 Login to Encompass with valid credentials.
   '2 Create 1st Loan with basic borrower information as per the test data.
   '3 Create 2nd Loan with basic borrower information as per the test data.
   '4 Go to pipeline and open the 1st loan.
   '5 Go to tools- piggyback loans. Click on 'Link to Loan',Select the 2nd loan created earlier from the list and click on link.
   '6 Close the loan and navigate to pipeline Check the 1st Loan - Verify the Folder with link symbol appears
   '7 Click on the Linked icon,Verify the following message appears showing the Loan # for the selected loan and the linked loan
   '8 In the Encompass Linked loan popup, click on 'Open Linked Loan' button.
   '9 Close the loan and navigate to pipeline In the Encompass Linked loan popup, click on Close' button.
'@ ExpectedResult:
   '1 Encompass opens.
   '2 Loan should be created successfully.
   '3 Loan should be created successfully.
   '4 Loan is opened.
   '5 The two links are linked.
   '6 Folder with link symbol appears for linked loan.
   '7 Verify the Linked loan i.e 2nd loan opens.
   '8 Verify the popup is closed Neither loan is opened.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Test Case#1: Verify Piggyback - Linked Loan indicator in linked loans", "Validate Piggyback - Linked Loan indicator in linked loans", Null
'==== Create Second Loan With Basic Information ====
FRM_Logger_ReportInfoEvent "Start creat a new loan with basic information", "Started creating a new loan with basic information", Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation"
BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-2406_BasicInfoForLoan2"
BIZ_Loan_Save()
strFirstLoan=Cstr(BIZ_Loan_GetLoanNumber())
BIZ_Loan_Exit False

'==== Create First Loan With Basic Information ====
FRM_Logger_ReportInfoEvent "Start creat a new loan with basic information", "Started creating a new loan with basic information", Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation"
BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-2406_BasicInfoForLoan1"
BIZ_Loan_Save()
strSecondLoan=CStr(BIZ_Loan_GetLoanNumber())

'==== Linking two Loans each other ====
BIZ_Piggyback_LinkLoan strFirstLoan, strSecondLoan
BIZ_Loan_Exit True

'================Search Loan by Loan Number==================
BIZ_SearchLoanByColumnValue "Loan Number",strSecondLoan

'============= Customize Pipeline Columns to show "Linked" column in Pipeline =========
BIZ_PipeLine_CustomizeColumns "Linked"

'=================Click on Link Symbol ===================
intItemHeight = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLoans").Object.GetItemBounds(0).Height
v_yco = CInt(intItemHeight * 2 + intItemHeight * 0.6)
intColNum = GUI_List_GetColumnIndex(SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLoans"), "Linked")
v_xco = 0
v_xco = CInt(v_xco + SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLoans").Object.GetSubItemBounds(0,0).Width * 0.2)
GUI_SwfObject_ClickXY SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLoans"), v_xco, v_yco
		
'=======================Validation of opened linked loan====================
Set objLinkedLoan		=	SwfWindow("swfname:=MainForm").SwfWindow("regexpwndtitle:=Encompass","swfname:=LinkedLoanDialog","text:=Encompass")
Set objMain				=	SwfWindow("swfname:=MainForm")
If GUI_Object_IsExistX (objLinkedLoan.SwfButton("swfname:=btnOpen"),480) Then
	FRM_Logger_ReportPassEvent "Verify the Folder with link symbol", "Folder with link symbol should be displayed", Null
	
	'=========== Validation of Popup ================
	FRM_Logger_ReportPassEvent "Verify Linked Loan Popup", "Linked Loan Popup should be displayed", Null
	FRM_Logger_ReportPassEvent "Verify Linked Loans", "Two Loans '"&strPrimaryLoan&"' and '"&strLinkedLoan&"' are Linked" , Null	
	GUI_Object_ValidateText objLinkedLoan.SwfLabel("swfname:=labelLoanNumber"), strSecondLoan, "Selected Link Loan"
	GUI_Object_ValidateText objLinkedLoan.SwfLabel("swfname:=labelLinkedLoanNumber"), strFirstLoan, "Linked To Loan"
	'=========== Validation of Open button ================
	GUI_SwfButton_Click objLinkedLoan.SwfButton("swfname:=btnOpen")
	GUI_Object_WaitTillExistX objMain.SwfObject("swfname:=pnlLoanAmt").SwfLabel("swfname:=lblLoanNumber"), 360
	GUI_Object_ValidateText objMain.SwfObject("swfname:=pnlLoanAmt").SwfLabel("swfname:=lblLoanNumber"), strFirstLoan, "Linked Loan #'"&strFirstLoan&"' is opened"
	BIZ_Loan_Exit False
Else
	FRM_Logger_ReportFailEvent "Verify Linked Loan Popup", "Linked Loan Popup is not displayed", Null
End If

'==== Click On Link Loan Folder Icon & Validate Close loan ====
GUI_SwfObject_ClickXY SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLoans"), v_xco, v_yco
If GUI_Object_IsExistX (objLinkedLoan,360) Then
	FRM_Logger_ReportPassEvent "Verify the Folder with link symbol", "Folder with link symbol should be displayed", Null
	GUI_Object_WaitTillExistX objLinkedLoan.SwfButton("swfname:=btnClose"),60
	'=========== Validation of Close button ================
	GUI_SwfButton_Click objLinkedLoan.SwfButton("swfname:=btnClose")	
	If GUI_Object_IsExistX(objLinkedLoan,6)  Then
		FRM_Logger_ReportFailEvent "Click on Close button", "Popup window is not closed", Null		
	Else
		FRM_Logger_ReportPassEvent "Click on Close button", "Popup window is closed", Null
	End If
Else
	FRM_Logger_ReportFailEvent "Verify Linked Loan Popup", "Linked Loan Popup is not displayed", Null
End If

Parameter("strFirstLoan")	=	strFirstLoan
Parameter("strSecondLoan")	=	strSecondLoan
Set objLinkedLoan			=	Nothing
Set objMain					=	Nothing
