
import java.io.IOException;
import java.net.URL;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.xpath.XPathExpressionException;
import org.xml.sax.SAXException;
import javax.net.ssl.X509TrustManager;
import java.security.cert.X509Certificate;
import org.jsoup.Jsoup;
import org.jsoup.select.Elements;

public class RestAPIJenkins extends RuntimeException {

	class URLException {
		// Constructor that accepts a message
		public URLException(HttpsURLConnection connection) {
		}
	}

	private static TrustManager[] get_trust_mgr() {
		TrustManager[] certs = new TrustManager[] { new X509TrustManager() {
			public X509Certificate[] getAcceptedIssuers() {
				return null;
			}

			public void checkClientTrusted(X509Certificate[] certs, String t) {
			}

			public void checkServerTrusted(X509Certificate[] certs, String t) {
			}
		} };
		return certs;
	}

	/*----------------------------------------------------------------------------
	Function Name    	: jenkinsExtract
	Description     	: jenkinsExtract perform operation to get the Execution details from Jenkins portal
	Input Parameters 	:                      
	Return Value    	:  
	Author		        : Sharad Mali
	Date of creation	:
	Date of modification:	
	----------------------------------------------------------------------------*/
	public static void jenkinsExtract(String jobURL)
			throws IOException, SAXException, ParserConfigurationException, XPathExpressionException,
			TransformerException, KeyManagementException, NoSuchAlgorithmException {
		perform(jobURL);
	}

	public static void perform(String jobURL)
			throws KeyManagementException, IOException, NoSuchAlgorithmException, ParserConfigurationException,
			SAXException, XPathExpressionException, TransformerException {
		String strProjectName = null;
		String strJobName = null;
		String strStatus = null;
		String strBuildVersion = null;
		String intBuildID = null;
		String totalExecuted = null;
		String pass = null;
		String fail = null;
		String strExecutionDate = null;
		String strDuration = null;
		boolean blnFlag = true;
		String tempURL = null;
		String strDashboardStatus = null;

		try {
			// String current = new java.io.File(".").getCanonicalPath();
			String current = "\\\\10.110.39.102\\c$\\xampp\\htdocs\\core\\";	// Slave 11
			
			URL url;
			HttpsURLConnection connection = null;
			String excelname = "CIJenkins";
			String sheetname = "ExecutionDetails";

			String str_arr[] = jobURL.split("\\/");
			strProjectName = "Core2P Optimized";
			strJobName = str_arr[str_arr.length - 2];
			intBuildID = str_arr[str_arr.length - 1];
			String ExcelFile = "company-data\\" + excelname + ".xlsx";			
			String uri = "";
			System.out.println("Started...");

			try {
				uri = jobURL + "HTML_Report/summary.html";							
				url = new URL(uri.replace("\"", "%22").replace(" ", "%20"));	
				tempURL = url.toString();
				// Create a context that doesn't check certificates.
				SSLContext ssl_ctx = SSLContext.getInstance("TLS");
				TrustManager[] trust_mgr = get_trust_mgr();
				ssl_ctx.init(null, // key manager
						trust_mgr, // trust manager
						new SecureRandom()); // random number generator
				HttpsURLConnection.setDefaultSSLSocketFactory(ssl_ctx.getSocketFactory());
				// Create all-trusting host name verifier
				HostnameVerifier allHostsValid = new HostnameVerifier() {
					public boolean verify(String hostname, SSLSession session) {
						return true;
					}
				};
				// Install the all-trusting host verifier
				HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);
				connection = (HttpsURLConnection) url.openConnection();
				
				if (connection.getResponseCode() == 404) {
					connection.disconnect();
					throw new RestAPIJenkins();
				}
				System.out.println("HttpsURLConnection Try: 1");
			}

			catch (Exception URLException) {
				uri = jobURL + "HTML_20Report/summary.html";						
				url = new URL(uri.replace("\"", "%22").replace(" ", "%20"));				
				tempURL = url.toString();
				// Create a context that doesn't check certificates.
				SSLContext ssl_ctx = SSLContext.getInstance("TLS");
				TrustManager[] trust_mgr = get_trust_mgr();
				ssl_ctx.init(null, // key manager
						trust_mgr, // trust manager
						new SecureRandom()); // random number generator
				HttpsURLConnection.setDefaultSSLSocketFactory(ssl_ctx.getSocketFactory());
				// Create all-trusting host name verifier
				HostnameVerifier allHostsValid = new HostnameVerifier() {
					public boolean verify(String hostname, SSLSession session) {
						return true;
					}
				};
				// Install the all-trusting host verifier
				HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);
				
				connection = (HttpsURLConnection) url.openConnection();
				System.out.println("HttpsURLConnection Try: 2");
			}

			try {
				if (connection.getResponseCode() == 200) {
					System.out.println("Responsecode: 200");					
					org.jsoup.nodes.Document doc = Jsoup.connect(tempURL).get();
					Elements media1 = doc.select("#tbReportCount");

					if (media1 != null && media1.size() > 0) {
						totalExecuted = media1.get(0).getAllElements().get(6).text();
						pass = media1.get(0).getAllElements().get(11).text();
						fail = media1.get(0).getAllElements().get(14).text();
					}
					Elements media2 = doc.select("td.envDetValue");
					if (media2 != null && media2.size() > 0) {
						strBuildVersion = media2.get(2).text().split("Build ")[1];
						strExecutionDate = media2.get(4).text().split(" ")[0];						
						strDuration = media2.get(5).text();
					}

					String valueToWrite[] = { strProjectName, strJobName, strBuildVersion, intBuildID.substring(0),
							totalExecuted, pass, fail, strExecutionDate, strDuration};
					blnFlag = ReadWriteExcelFile.writeXLSXValue(current + ExcelFile, sheetname, valueToWrite);

					if (blnFlag) {
						strDashboardStatus = "Successful";
						System.out.println("Automation dashboard updated successfully");						
						strStatus = "Automation dashboard updated successfully";
						SendReportInEmail.sendGmailReport(strProjectName, strJobName, strBuildVersion,
								intBuildID.substring(0), strStatus,strDashboardStatus);
					} else {
						strDashboardStatus = "Failed";
						System.out.println("Unable to connect to Excel file");
						strStatus = "Unable to connect to Excel file";
						SendReportInEmail.sendGmailReport(strProjectName, strJobName, strBuildVersion,
								intBuildID.substring(0), strStatus,strDashboardStatus);
					}
				} else {
					strDashboardStatus = "Failed";
					System.out.println("Got responsecode: 404");
					strStatus = "ResponseCode : 404. Database connection could not established.";
					SendReportInEmail.sendGmailReport(strProjectName, strJobName, strBuildVersion,
							intBuildID.substring(0), strStatus,strDashboardStatus);
				}
			} catch (Exception e) {
				strDashboardStatus = "Failed";
				System.out.println("Jsoup : " + e.getMessage());
				strStatus = "Database connection could not established.";
				SendReportInEmail.sendGmailReport(strProjectName, strJobName, strBuildVersion, intBuildID.substring(0),
						strStatus + " " + e.getMessage(),strDashboardStatus);
			}

			connection.disconnect();
			intBuildID = "";
		} catch (Exception e) {
			strDashboardStatus = "Failed";
			System.out.println("Failed in main code. Failed to update automation dashboard." + e.getStackTrace());
			strStatus = "Failed in main code. Failed to update automation dashboard.";
			SendReportInEmail.sendGmailReport(strProjectName, strJobName, strBuildVersion, intBuildID.substring(0),
					strStatus + " " + e.getMessage(),strDashboardStatus);
		}
		// String st = "JobInput Excel should be updated now";
		// JOptionPane.showMessageDialog(null, st);
	}

}
