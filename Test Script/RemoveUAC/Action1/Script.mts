'@**************************************************************************************************
'@ Test Automation JIRA Task:
'@ TestData: 
   '1 Global_Data
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
'1.	Click on RemoveCache
'2.	Click on applaucher..exe
'3.	Provide the CID  ( CID from global sheet, late we externalize from the jenkins)
'4.	Launch Encompass. 
'5. Logout of Encompass
'@ ExpectedResult:
'  Encompass should launch successfully
'***************************************************************************************************


'========================================================
	
	FRM_RT_SetupTest(null)
    FRM_Logger_ReportInfoEvent "Start process", "Akamai process automation", null
    
 	 '====== Logout Encompass360 ======
    BIZ_Login_UserLogout
    
    '======== Login to the Encompass ========     
     FRM_Logger_ReportInfoEvent "Remove UAC and Launch Application", "Launching Encompass" , null
     BIZ_RemoveUAC 
    
    BIZ_Login_UserAppLauncherLogin "RemoveUAC"
       
     '====== Logout Encompass360 ======
    BIZ_Login_UserLogout
    
    '================ 
    FRM_RT_TeardownTest(null)
    
'=====================End================================

