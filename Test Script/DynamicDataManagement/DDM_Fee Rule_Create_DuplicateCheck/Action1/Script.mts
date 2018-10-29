'**************************************************************************************************
'Parent Story ID: NICE-307
'Automated Test Case ID: NICE-1489 & NICE 1482
'Test Case Summary:
' 1. TC-42 | To validate the functionality of "Active/ De-activate" status in the Fee rule section on the basis of scenario rules available while logged in as admin.
' 2. TC-39 | To validate the functionality of "Duplicate" button for Fee rule scenario while logged in as admin.
'Test step expected result.

'Test Steps NICE-1489
'1. Login as admin with credentials admin / password
'2. Navigate to the Encompass Settings -> Dynamic Data Management -> Fee Rules.
'3. Select the record which suffice the pre-requisite #1.
'4. Select the record which suffice the pre-requisite #2.
'5. Select the record which suffice the pre-requisite #3.
'
'Expected Resuts
'1. User should be able to login successfully.
'2. Fee Rules page should load.
'3. The status of that Fee rule should be InActive state.
'4. The status of that Fee rule should be Active state.
'5. The status of that Fee rule should be Active state.

'Test Steps NICE-1489
'1. Now create a new fee rule and make sure that you select/ enter record which satisfies the pre-requisite and then click Ok button.

'Expected Result
'On clicking Ok button, popup message saying "A Fee rule already exists for the fee line/group you are attempting to create." should appear and hence refraining user to not to allow to create record for the same line.

'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Start Test Case : NICE-1489 & NICE 1482","Script Name - DDM_Activate_Deaactivate", Null

'*************** User Logs in encompass***********
BIZ_Login_UserLogin "admin_default"

'*************** Navigate to encompass settings ***********
BIZ_Nav_OpenMenuItem "Encompass;Settings..."

'*************** Navigate to Fee Rule ***********
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"

'*************** Create a active fee rule***********
BIZ_DDM_CreateActiveFeeRule "FeeRule1"

''*************** Verifies if inactive scneario is created successfully***********
'SwfWindow("swfname:=MainForm").
Set Scenario_list=SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=FeeScenarioRules").SwfObject("swfname:=gvLineScenarios")
FRM_VerifyEqual GUI_List_GetCellData(Scenario_list,0,6),"Inactive","Inactive record is created","Inactive record is created"

''*************** Clicks on active button to activate the scenario*************
GUI_SwfButton_Click SwfWindow("regexpwndtitle:=Encompass  Settings").SwfWindow("regexpwndtitle:=Add/Edit Fee Scenario").SwfButton("swfname:=btnDeactivate")

'*************** Click on the scenario made active to refresh**************
Set objSetupContainer = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")

GUI_List_ClickRow objSetupContainer.SwfObject("swfname:=gvFeeRulesList"), objSetupContainer.SwfScrollBar("swfname:=vPanelScrollBar"), strcolName, FRM_DS_GetValue(objData, "AutoPopulateValue"), True, False, False, "Single"

'*************** Verifies if active scneario is created successfully**************
FRM_VerifyEqual GUI_List_GetCellData(Scenario_list,0,6),"Active","Active record is created","Active record is created"

SwfWindow("regexpwndtitle:=Encompass  Settings").SwfWindow("regexpwndtitle:=Add/Edit Fee Scenario").Close

'*************** Verifies if active rule is created successfully**************
BIZ_DDM_VerifyRuleStatus "1320Newrule","Active"

'*************** Verifies if encompass message is displayed when duplicate rule**************

BIZ_DDM_CreateNewFeeRule_VerifyWarningMessage "FeeRule1"



'*************** Close setting window**************
BIZ_Settings_ClickClose 

'*************** Logs out of encompass**************
BIZ_Login_UserLogout

FRM_RT_TeardownTest Null

'*********************************************

           





