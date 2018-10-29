import java.io.IOException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.xpath.XPathExpressionException;
import org.xml.sax.SAXException;

/*----------------------------------------------------------------------------
Function Name    	: BaseForm
Description     	: main Class
Input Parameters 	:                      
Return Value    	:  
Author		        : Sharad Mali
Date of creation	:
Date of modification:	
----------------------------------------------------------------------------*/
public class BaseForm {
	public static void main(String[] args) throws KeyManagementException, XPathExpressionException, NoSuchAlgorithmException, IOException, SAXException, ParserConfigurationException, TransformerException {	
		
		String strURL =  args[0];								
		//String strURL = "https://jenkins.dco.elmae/job/Core2P%20Optimized/job/CI_Demo/71/";		
		String strJobURL = strURL.replace("jenkins.dco.elmae", "eq1vjencm01.dco.elmae:443");		
			
		RestAPIJenkins.jenkinsExtract(strJobURL);
	}
}
