'@**************************************************************************************************
'@ TestStory: PTAC-2999 Encompass_CRM
'@ TestCase: PTAC-2801 Verify CRM Widget in Encompass
'@ Test Automation JIRA Task: PTAC-3002 Encompass_VerifyCRMWidget
'@ TestData: N/A
'@ Pre-conditions: 
' Required  UFT ActiveX Addon for execution
'@ Description: Verify CRM Widget in Encompass
'@ TestSteps:
   '1 As Admin or any Persona User , Login to Encompass > Homepage.
   '2 Verify CRM Widget for the attributes.
   '3 Click Manage Encompass CRM.
   '4 Click Learn More link or Encompass CRM Logo.
   '5 Verify Description of the Widget.
'@ ExpectedResult:
   '1 CRM Widget should be displayed in the right bottom of the Homepage.
   '2 CRM widget should have the below attributes
      'Encompass CRM logo
      'Manage Encompass CRM link
      'Description of the Widget
      'Not a customer yet?
      'Learn more link that points to CRM marketing page
   '3  This should open up Encompass CRM login page. (https://mrweb2.mortgagereturns.com/Prod4/Login.aspx)
   '4 This should open up the CRM marketing page(http://elliemae.com/encompass/sales-marketing/encompass-crm)
   '5 "Create or update your contacts and send marketing campaigns and emails" should be displayed.
'@**************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-3002", "Encompass_VerifyCRMWidget", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2801","Verify CRM Widget in Encompass", Null
RunAction "PTAC-2801_Encompass_VerifyCRMWidget", oneIteration

'====== Logout From Encompass ======
BIZ_Login_UserLogout()

FRM_RT_TearDownTest(Null)

