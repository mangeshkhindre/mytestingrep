<xsl:stylesheet version="1.0"
	xmlns:xsl = "http://www.w3.org/1999/XSL/Transform">

<!-- ////////////  Match the document node, HTML, head, scripts  ////////////// -->

<!-- Controls if images are added to result. -->
<xsl:variable name="IncludeImages">1</xsl:variable>
<!-- rID attribute of first exported node (in case of exporting selection). Value 0 means that all nodes are exported. -->
<xsl:variable name="SelectionID">0</xsl:variable>

<xsl:include href="ReportStringTable.xsl"/>

<!-- skip all the nodes before selection node and translate only selected branch -->
<xsl:template name="FindSelection">
	<xsl:choose>
		<xsl:when test="@rID and @rID=$SelectionID">
		<html>
			<head>
				<title>Encompass360 Automation Test Report</title>
				<link rel="stylesheet" type="text/css" href="ReportResults.css" />
			</head>
		<body>
			<xsl:apply-templates select="."/>
		</body>
		</html>
		</xsl:when>
		<xsl:otherwise>
			<xsl:for-each select="child::*">
				<xsl:call-template name="FindSelection"/>
			</xsl:for-each>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template match = "/">

<html >
	<head>
    	<h3 align="center">Encompass360 Automation Test Report</h3>
    	<link rel="stylesheet" type="text/css" href="ReportResults.css" />
   </head>
   <body bgcolor="#ffffff" leftmargin="0" marginwidth="20" topmargin="10" marginheight="10" vlink="#9966cc" >
      	<xsl:choose>
		<xsl:when test="$SelectionID=0">
      	<center>
	<table class="fixed" border="1" width="100%" cellspacing="0" cellpadding="3">
					
			<tr>
			<th width= "28%" valign="middle" align="center" height="20" ><b><span class="test"><xsl:copy-of select="$IDS_TEST_COLON"/></span></b></th>
			<!--<td width="50%" valign="middle" align="center" height="20" ><b><span class="action"><xsl:copy-of select="$IDS_ACTION_COLON"/></span></b></td> -->									
			<th width= "8%" valign="middle" align="center" height="20" ><b> <span class="status"><xsl:copy-of select="$IDS_TOTAL"/></span> </b></th>
			<!--<td width="50%" valign="middle" align="center" height="20"> <b><span class="time"><xsl:copy-of select="$IDS_TIMES"/></span></b> </td> -->
			<th width= "8%" valign="middle" align="center" height="20" ><b><span class="passed"><xsl:copy-of select="$IDS_PASSED"/></span></b></th>
			<th width= "8%" valign="middle" align="center" height="20"><span class="failed"><xsl:copy-of select="$IDS_FAILED"/></span></th>
			<th width= "8%" valign="middle" align="center" height="20" ><span class="warning"><xsl:copy-of select="$IDS_WARNINGS"/></span></th>
			<th width= "20%" valign="middle" align="center" height="20" ><span class="warning"><xsl:copy-of select="$IDS_RUN_STARTED_COLON"/></span></th>
			<th width= "20%" valign="middle" align="center" height="20" ><span class="warning"><xsl:copy-of select="$IDS_RUN_ENDED_COLON"/></span></th>
		</tr>

		
																
	</table>
	
	<xsl:choose>
		<xsl:when test="Report/BPT">
			<xsl:apply-templates select = "Report/BPT"  />	   
		</xsl:when>
		<xsl:otherwise>
			<xsl:apply-templates select = "Report/Doc"  />	   
		</xsl:otherwise>
	</xsl:choose>
	
	</center>		
		</xsl:when>
		<xsl:otherwise>
			<xsl:call-template name="FindSelection"/>
		</xsl:otherwise>
	</xsl:choose>
   </body>
</html>

</xsl:template>



<xsl:template name="Arguments">

	<xsl:if test="Summary/Param[@paramInOut='In']">
		<table border="0" cellpadding="2" cellspacing="1" width="100%" bgcolor="#666699">
			<tr>
				<td bgcolor="white">
									
					<table border="0" cellpadding="3" cellspacing="0" width="100%">
						<tr>
							<td width="50%" valign="middle" align="center" class="tablehl"><b> <span class="tablehl"><xsl:copy-of select="$IDS_INPUT_PARAMETERS"/></span> </b></td>
							<td width="50%" valign="middle" align="center" class="tablehl"> <b><span class="tablehl"><xsl:copy-of select="$IDS_VALUE"/></span></b> </td>
						</tr>
						
						<tr>
							<td width="50%" height="1" class="bg_darkblue"></td>
							<td width="50%" height="1" class="bg_darkblue"></td>
						</tr>
	
						
						<xsl:for-each select="Summary/Param[@paramInOut='In']">
							<tr>
								<td width="50%" valign="middle" align="center" height="20"><span class="text"><xsl:value-of select="ParamName"/></span></td>
								<td width="50%" valign="middle" align="center" height="20"><span class="text"><xsl:value-of select="ParamVal"/></span></td>
							
								<tr>
									<td width="50%" class="bg_gray_eee" height="1"></td>
									<td width="50%" class="bg_gray_eee" height="1"></td>
								</tr>
							
							</tr>
						</xsl:for-each>
						<tr>
							<td width="50%" class="bg_gray_eee" height="1"></td>
							<td width="50%" class="bg_gray_eee" height="1"></td>
						</tr>
					</table>
				</td>
			</tr>
	<br/><br/>

		</table>
	
	</xsl:if>
	
	<xsl:if test="Summary/Param[@paramInOut='Out']">
		<table border="0" cellpadding="2" cellspacing="1" width="100%" bgcolor="#666699">
			<tr>
				<td bgcolor="white">
									
					<table border="0" cellpadding="3" cellspacing="0" width="100%">
						<tr>
							<td width="50%" valign="middle" align="center" class="tablehl"><b> <span class="tablehl"><xsl:copy-of select="$IDS_OUTPUT_PARAMETERS"/></span> </b></td>
							<td width="50%" valign="middle" align="center" class="tablehl"> <b><span class="tablehl"><xsl:copy-of select="$IDS_VALUE"/></span></b> </td>
						</tr>
						
						<tr>
							<td width="50%" height="1" class="bg_darkblue"></td>
							<td width="50%" height="1" class="bg_darkblue"></td>
						</tr>
	
						
						<xsl:for-each select="Summary/Param[@paramInOut='Out']">
							<tr>
								<td width="50%" valign="middle" align="center" height="20"><span class="text"><xsl:value-of select="ParamName"/></span></td>
								<td width="50%" valign="middle" align="center" height="20"><span class="text"><xsl:value-of select="ParamVal"/></span></td>
							
								<tr>
									<td width="50%" class="bg_gray_eee" height="1"></td>
									<td width="50%" class="bg_gray_eee" height="1"></td>
								</tr>
							
							</tr>
						</xsl:for-each>
						<tr>
							<td width="50%" class="bg_gray_eee" height="1"></td>
							<td width="50%" class="bg_gray_eee" height="1"></td>
						</tr>
					</table>
				</td>
			</tr>
	<br/><br/>
		</table>								
	</xsl:if>

</xsl:template>

<!-- ////////////////////////////////////////////////////////// -->

<xsl:template match = "Obj|Details">
	<xsl:choose>
		<xsl:when test="@plainTxt ='False'">
			<xsl:value-of disable-output-escaping="yes" select="."/>
		</xsl:when>
		<xsl:otherwise>
			<xsl:value-of select="."/>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>


<!-- //////////////////////////  Step  /////////////////////////////////// -->

<xsl:template match = "Step" >
	
	<xsl:if test="$IncludeImages=1">
		<xsl:apply-templates select="NodeArgs"/>
	</xsl:if>

	<xsl:call-template name="GreenLine"/>
	<xsl:apply-templates select = "*[@rID]" />

</xsl:template>

<!-- ///////////////////////////////////////////////////////////// -->
<!-- Template for adding images -->

<xsl:template match="NodeArgs">

	<xsl:choose>
		<xsl:when test="(BtmPane/@vType = 'ViewerGen.SSViewerGen') and BtmPane/Path">
			<!-- add image for snapshot -->
			<center><img><xsl:attribute name="src"><xsl:value-of select="BtmPane/Path"/></xsl:attribute>
			<xsl:attribute name="alt">Screenshot</xsl:attribute>
			<xsl:attribute name="width">400</xsl:attribute>
			</img></center>
		</xsl:when>
		
		<xsl:when test="(BtmPane/@vType = 'Mercury.ACXSnapshotViewerObj') and BtmPane/Path and (substring(BtmPane/Path, string-length(BtmPane/Path)-2) = 'ini')">
			<!-- Add image(s) for bitmap checkpoint. We check that path extension is ini to distinguish bitmap checkpoint 
			from table checkpoint (that has inf extension). -->

			<xsl:choose>
				<!-- for failed bitmap checkpoint show three images -->
				<xsl:when test = "@status = 'Failed'">
			<table width="100%">
			<tr>
				<td>
					<center>Expected:</center>
				</td>
				<td>
					<center>Actual:</center>
				</td>
				<td>
					<center>Difference:</center>
				</td>
			</tr>
			<tr>
				<td>
					<center>
					<img><xsl:attribute name="src"><xsl:value-of select="concat(BtmPane/Path,'.exp')"/></xsl:attribute>
							<xsl:attribute name="alt">Expected image</xsl:attribute>
					<xsl:attribute name="width">180</xsl:attribute>
					</img></center>
				</td>
	
				<td>
					<center><img><xsl:attribute name="src"><xsl:value-of select="concat(BtmPane/Path,'.act')"/></xsl:attribute>
							<xsl:attribute name="alt">Actual image</xsl:attribute>
					<xsl:attribute name="width">180</xsl:attribute>
					</img></center>
				</td>
				
				<td>
					<center><img><xsl:attribute name="src"><xsl:value-of select="concat(BtmPane/Path,'.dif')"/></xsl:attribute>
							<xsl:attribute name="alt">Difference image</xsl:attribute>
					<xsl:attribute name="width">180</xsl:attribute>
					</img></center>
				</td>
			</tr>
			</table>
				</xsl:when>
				<xsl:otherwise>
					<!-- for passed bitmap checkpoint show one image -->
					<center><img><xsl:attribute name="src"><xsl:value-of select="concat(BtmPane/Path,'.act')"/></xsl:attribute>
					<xsl:attribute name="alt">Screenshot</xsl:attribute>
					<xsl:attribute name="width">400</xsl:attribute>
					</img></center>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
	</xsl:choose>
</xsl:template>

<!-- ///////////////////////////////////////////////////////////// -->

<xsl:template match="HtmlStep">
	<center>
	<table border = "1" bordercolor ="#666699" cellspacing="0" cellpadding="0" width="100%" height = "100" valign = "top" >
		<!--xsl:attribute name="id">Step<xsl:value-of select="@rID" /></xsl:attribute-->
		<tr><td>
		<div >
			<xsl:value-of disable-output-escaping="yes" select="HTML"/>	
		</div>
		</td></tr>		
	</table>
	</center>
	
	<xsl:if test="$IncludeImages=1">
		<xsl:apply-templates select="NodeArgs"/>
	</xsl:if>

	<xsl:call-template name="GreenLine"/>

	<xsl:apply-templates select = "*[@rID]" />
	
</xsl:template>


<!-- /////////////////////////// RunType ////////////////////////////////// -->

<xsl:template match="RunType">
	<span class="text"><b>
		<xsl:copy-of select="$IDS_UPDATE_RUN_COLON"/>
	
		<xsl:if test="@upDesc = 'True'"><xsl:copy-of select="$IDS_UPDATE_TO_PROPS" /></xsl:if>
		<xsl:if test="@upChk = 'True'">
			<xsl:if test="@upDesc = 'True'">,</xsl:if>
			<xsl:copy-of select="$IDS_UPDATE_CP_OV_PROPS" />
		</xsl:if>
		<xsl:if test="@upAS = 'True'">
			<xsl:if test="(@upDesc = 'True') or (@upChk = 'True')">,</xsl:if>
			<xsl:copy-of select="$IDS_UPDATE_ACTIVE_SCREEN" />
		</xsl:if>.
	</b></span>
</xsl:template>


<!-- ///////////////////////////////////////////////////////////// -->

<xsl:template match="AIter">
	<table border="0" width="100%" cellspacing="0" cellpadding="0">
	   <!-- removed   ACTION HEADING -->
		<!--<tr><td class="iteration_head"><xsl:copy-of select="$IDS_ACTION_COLON"/> <xsl:value-of select="NodeArgs/Disp"/></td></tr>-->
		<tr>
			<td class="iteration_border" height="40">
				<table width="100%" border="0" cellspacing="2" cellpadding="0">
					<tr>
						<td>
							<div>
	
							<xsl:call-template name="GreenLine"/>

							<xsl:apply-templates select = "*[@rID]" />
								
							</div>
						</td>
					</tr>
				</table>
			</td>		
		</tr>
	</table>
</xsl:template>

<!-- ///////////////////////////////////////////////////////////// -->

<xsl:template match="Action">
	<xsl:choose>
		<xsl:when test = "../@type = 'BC'">
			<xsl:apply-templates select = "*[@rID]" />
		</xsl:when>
		<xsl:otherwise>
			<xsl:call-template name="Action"/>
		</xsl:otherwise>
	</xsl:choose>	
</xsl:template>

<xsl:template name="Action">

	<table class="fixed" border="1" width="100%" cellspacing="0" cellpadding="3">
		<tr>
	
	    <!--<td width= "28%" valign="middle" align="center" height="20"  ><span class="text"> <xsl:value-of select="/Report/Doc/Action/AName"/> </span></td> -->
		 <td width= "28%" valign="middle" align="center" height="20"  ><span class="text"> <xsl:value-of select="/Report/Doc/NodeArgs/Disp"/> </span></td>
		<td  width= "8%" valign="middle" align="center" height="20" ><span class="text"><xsl:value-of select="/Report/Doc/Summary/@passed+/Report/Doc/Summary/@failed+/Report/Doc/Summary/@warnings" /></span></td> 

		
		<td width= "8%" valign="middle" align="center" height="20" > <font  color="green"><span class="text"><xsl:value-of select="/Report/Doc/Summary/@passed"/></span></font></td>
		<td   width= "8%" valign="middle" align="center" height="20" ><font  color="red"><span class="text"><xsl:value-of select="/Report/Doc/Summary/@failed"/></span></font></td>
		<td  width= "8%" valign="middle" align="center" height="20"  ><font size="3" color="orange"><span class="text"><xsl:value-of select="/Report/Doc/Summary/@warnings"/></span></font></td>
		<td  width= "20%" valign="middle" align="center" height="20"  ><span class="text"><xsl:value-of select="/Report/Doc/Summary/@sTime"/></span></td>
		<td  width= "20%" valign="middle" align="center" height="20"  ><span class="text"><xsl:value-of select="/Report/Doc/Summary/@eTime"/></span></td>
		</tr>	
																				
	</table>

<!--	<xsl:call-template name="Arguments"/>
								
	<xsl:call-template name="GreenLine"/>
				
	<xsl:apply-templates select = "*[@rID]" /> -->
	




</xsl:template>

<xsl:template match="DT">
</xsl:template>


<!-- //////////////////////////// Doc  ///////////////////////////////// -->

<xsl:template match="Doc">
	<xsl:choose>
		<xsl:when test="@type = 'BC'">	
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr><td class="iteration_head" bgcolor="gray"><xsl:copy-of select="$IDS_BC"/><xsl:value-of select="DName"/>
				<xsl:if test="@BCIter">(Iteration <xsl:value-of select="@BCIter"/>) </xsl:if>
				</td></tr>				
				<tr>
					<td class="iteration_border">
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td>
								    <xsl:call-template name="Doc"/>
								</td>	
							</tr>	
						</table>	
					</td>
				</tr>
			</table>	
		</xsl:when>
		<xsl:when test="../General[@productName = 'WinRunner']">
			<xsl:choose>
				<xsl:when test="../@ver &lt; '3.0'">
					<xsl:apply-templates select = "*[@rID]" />
				</xsl:when>
				<xsl:otherwise>
						<xsl:call-template name="Doc"/>		
				</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:otherwise>
			<xsl:call-template name="Doc"/>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="Doc">

	
<!--	<table class="fixed" border="1" width="100%" cellspacing="4" cellpadding="3">
		<tr>
	
	    <td width= "28%" valign="middle" align="center" height="20"  ><span class="text"> <xsl:value-of select="/Report/Doc/DIter/Action/AName"/></span></td>
		<td  width= "8%" valign="middle" align="center" height="20" ><span class="text"><xsl:value-of select="NodeArgs/@status"/></span></td>
		<td width= "8%" valign="middle" align="center" height="20"  ><span class="text"><xsl:value-of select="Summary/@passed"/></span></td>
		<td   width= "8%" valign="middle" align="center" height="20" ><span class="text"><xsl:value-of select="Summary/@failed"/></span></td>
		<td  width= "8%" valign="middle" align="center" height="20"  ><span class="text"><xsl:value-of select="Summary/@warnings"/></span></td>
		<td  width= "20%" valign="middle" align="center" height="20"  ><span class="text"><xsl:value-of select="Summary/@sTime"/></span></td>
		<td  width= "20%" valign="middle" align="center" height="20"  ><span class="text"><xsl:value-of select="Summary/@eTime"/></span></td>
		</tr>	
																				
	</table>   -->
	<xsl:call-template name="Arguments"/>
	
	<xsl:call-template name="GreenLine"/>

	<xsl:apply-templates select = "*[@rID]" /> 
	

</xsl:template>


<!-- //////////////////////////// BPT  ///////////////////////////////// -->
  

  
<xsl:template match="BPT">

	<table border="1" cellpadding="3" cellspacing="0" width="100%">
		<tr><td height="1" class="bg_midblue"></td></tr>
		<tr><td height="30"><p/><span class="hl1name"><xsl:value-of select="DName" /></span><b><span class="hl1"><xsl:copy-of select="$IDS_RESULTS_SUMMARY"/></span></b></td></tr>
		<tr><td height="2" class="bg_darkblue"></td></tr>
		<tr><td height="20"></td></tr>
		<tr><td><span class="text"><b><xsl:copy-of select="$IDS_BPT_COLON"/> </b> <xsl:value-of select="DName" /> </span></td></tr>
		<tr><td><span class="text"><b><xsl:copy-of select="$IDS_RESULTS_NAME_COLON"/></b><xsl:value-of select="Res" /></span></td></tr>
		<tr><td><span class="text"><b><xsl:copy-of select="$IDS_TIME_ZONE_COLON"/></b><xsl:value-of select="//Report/@tmZone" /></span></td></tr>
		<tr><td><span class="text"><b><xsl:copy-of select="$IDS_RUN_STARTED_COLON"/></b> <xsl:value-of select="Doc[position()=1]/Summary/@sTime" /></span></td></tr>
		<tr><td><span class="text"><b><xsl:copy-of select="$IDS_RUN_ENDED_COLON"/></b> <xsl:value-of select="Doc[position()=last()]/Summary/@eTime" /></span></td></tr>
		<xsl:if test="DVer">
			<tr><td><span class="text"><b><xsl:copy-of select="$IDS_TEST_VER_COLON"/></b> <xsl:value-of select="DVer" /></span></td></tr>
		</xsl:if>
		<xsl:if test="TSet">
			<tr><td><span class="text"><b><xsl:copy-of select="$IDS_TEST_SET_COLON"/></b> <xsl:value-of select="TSet" /></span></td></tr>
		</xsl:if>
		<xsl:if test="TInst">
			<tr><td><span class="text"><b><xsl:copy-of select="$IDS_TEST_INSTANCE_COLON"/></b> <xsl:value-of select="TInst" /></span><br/></td></tr>
		</xsl:if>
		<tr><td height="15"></td></tr>
		<tr>
			<td>
				<span class="text"><b><xsl:copy-of select="$IDS_RESULT_COLON"/></b> 
					<xsl:choose>
						<xsl:when test="Doc/NodeArgs[@status = 'Failed']"><xsl:copy-of select="$IDS_FAILED"/></xsl:when>
						<xsl:when test="Doc/NodeArgs[@status = 'Warning']"><xsl:copy-of select="$IDS_WARNING"/></xsl:when>
						<xsl:when test="Doc/NodeArgs[@status = 'Passed']"><xsl:copy-of select="$IDS_PASSED"/></xsl:when>
						<xsl:otherwise><xsl:copy-of select="$IDS_DONE"/></xsl:otherwise>
					</xsl:choose>
				  </span>
			</td>
		</tr>
		<tr><td height="15"></td></tr>
		<xsl:if test="DIter">
			<tr><td>
				<table border="0" cellpadding="3" cellspacing="1" width="100%" bgcolor="#666699">
					<tr><td bgcolor="white">
						<table border="0" cellpadding="2" cellspacing="0" width="100%">
							<tr>
								<td width="50%" valign="middle" align="center" class="tablehl"> <span class="tablehl"><xsl:copy-of select="$IDS_ITERATION_NUMBER"/></span> </td>
								<td width="50%" valign="middle" align="center" class="tablehl"> <span class="tablehl"><xsl:copy-of select="$IDS_RESULTS"/></span> </td>
							</tr>
							<tr>
								<td width="50%" height="1" class="bg_darkblue"></td>
								<td width="50%" height="1" class="bg_darkblue"></td>
							</tr>
							<tr>
								<td width="50%" height="1" class="bg_gray_eee"></td>
								<td width="50%" height="1" class="bg_gray_eee"></td>
							</tr>
							
							<xsl:for-each select="DIter">
								<tr>
									<td width="50%" valign="middle" align="center" height="20">
										<span class="text"><xsl:value-of select="@iterID"/></span>
									</td>
									<td width="50%" valign="middle" align="center" height="20">
										<xsl:element name="span">
											<xsl:attribute name="class"><xsl:value-of select="NodeArgs/@status"/></xsl:attribute>
											<xsl:value-of select="NodeArgs/@status"/>
										</xsl:element>
									</td>
								</tr>
								<tr>
									<td width="50%" height="1" class="bg_gray_eee"></td>
									<td width="50%" height="1" class="bg_gray_eee"></td>
								</tr>
								
							</xsl:for-each>
						</table>
					</td></tr>
				</table>
			</td></tr>
		</xsl:if>
	</table>
	
	<br/><br/>
		
	<xsl:call-template name="GreenLine"/>

	<xsl:apply-templates select = "*[@rID]" />

</xsl:template>




<!-- //////////////////////////// GreenLine ///////////////////////////////// -->

<xsl:template name="GreenLine">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td class="brake"> </td>
		</tr>
	</table>	
</xsl:template>

</xsl:stylesheet>

