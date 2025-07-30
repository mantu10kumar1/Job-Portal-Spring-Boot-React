package com.jobportal.utility;

public class Data {
	
	public static String getMessageBody(String otp , String name) {
		String htmlTemplate = "<!DOCTYPE html>" +
	            "<html lang=\"en\">" +
	            "<head>" +
	            "    <meta charset=\"UTF-8\">" +
	            "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" +
	            "    <title>Your One-Time Password (OTP)</title>" +
	            "    <style>" +
	            "        body {" +
	            "            font-family: Arial, sans-serif;" +
	            "            margin: 0;" +
	            "            padding: 0;" +
	            "            background-color: #f4f4f4;" +
	            "            color: #333;" +
	            "        }" +
	            "        .email-container {" +
	            "            max-width: 600px;" +
	            "            margin: 20px auto;" +
	            "            background-color: #ffffff;" +
	            "            padding: 30px;" +
	            "            border-radius: 8px;" +
	            "            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);" +
	            "            border: 1px solid #ddd;" +
	            "        }" +
	            "        .header {" +
	            "            text-align: center;" +
	            "            padding-bottom: 20px;" +
	            "            border-bottom: 1px solid #eee;" +
	            "            margin-bottom: 20px;" +
	            "        }" +
	            "        .header h1 {" +
	            "            color: #333;" +
	            "            font-size: 24px;" +
	            "            margin: 0;" +
	            "        }" +
	            "        .content {" +
	            "            line-height: 1.6;" +
	            "            margin-bottom: 20px;" +
	            "            text-align: center;" +
	            "        }" +
	            "        .otp-code {" +
	            "            display: inline-block;" +
	            "            background-color: #e0f7fa;" +
	            "            color: #00796b;" +
	            "            font-size: 32px;" +
	            "            font-weight: bold;" +
	            "            padding: 15px 25px;" +
	            "            border-radius: 5px;" +
	            "            margin: 25px 0;" +
	            "            letter-spacing: 3px;" +
	            "            text-align: center;" +
	            "        }" +
	            "        .note {" +
	            "            font-size: 14px;" +
	            "            color: #777;" +
	            "            margin-top: 20px;" +
	            "            text-align: center;" +
	            "        }" +
	            "        .footer {" +
	            "            text-align: center;" +
	            "            padding-top: 20px;" +
	            "            border-top: 1px solid #eee;" +
	            "            margin-top: 20px;" +
	            "            font-size: 12px;" +
	            "            color: #999;" +
	            "        }" +
	            "        a {" +
	            "            color: #1a73e8;" +
	            "            text-decoration: none;" +
	            "        }" +
	            "    </style>" +
	            "</head>" +
	            "<body>" +
	            "    <div class=\"email-container\">" +
	            "        <div class=\"header\">" +
	            "            <h1>Verification Required  </h1>" + "  "+
	            "        </div>" +
	            "        <div class=\"content\">" +
	            "            <p>Hello, </p>"+ name +
	            "            <p>You recently requested a One-Time Password (OTP) for your account verification. Please use the following code to complete your action:</p>" +
	            "            <div class=\"otp-code\">" +
	            "                ${otp}" + // This is the placeholder
	            "            </div>" +
	            "            <p>If you did not request this OTP, please ignore this email.</p>" +
	            "        </div>" +
	            "        <div class=\"note\">" +
	            "            <p>For security reasons, do not share this code with anyone.</p>" +
	            "        </div>" +
	            "        <div class=\"footer\">" +
	            "            <p>&copy; 2025 Job Hooks. All rights reserved.</p>" +
	            "            <p>" +
	            "                <a href=\"https://yourwebsite.com/privacy\">Privacy Policy</a> | " +
	            "                <a href=\"https://yourwebsite.com/terms\">Terms of Service</a>" +
	            "            </p>" +
	            "        </div>" +
	            "    </div>" +
	            "</body>" +
	            "</html>";

        // Use the replace method to substitute the placeholder with the actual OTP
        return htmlTemplate.replace("  ${otp}", otp);
	}
}