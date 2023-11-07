export const DeclineEmail = (name = '') => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
  <html lang="en">
  
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700&display=swap" rel="stylesheet">
    </head>
    <body style="background-color:#ffffff;font-family:Outfit,-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
      <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px">
        <tr style="width:100%">
          <td><a href="https://app-dev.airapplecart.co.uk" target="_blank"><img alt="Air Apple Cart" src="https://app-dev.airapplecart.co.uk/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fapp-logo.7418c11b.png&w=32&q=75" width="170" height="50" style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto" />
          </a>
            <p style="font-size:16px;line-height:26px;margin:16px 0">Hi ${name},</p>
            <p style="font-size:16px;line-height:26px;margin:16px 0">We regret to inform you that your recent verification process has been declined. If you believe there has been an error or if you would like to discuss this futher please feel free to reach out to our support team.</p>
            <p style="font-size:16px;line-height:26px;margin:16px 0">Thank you for your understanding</p>
            <p style="font-size:16px;line-height:26px;margin:16px 0">Best Regards,<br />Air Apple Cart <br /><a style="font-size:16px;line-height:1.4;margin:16px 0;color:#292561;font-weight:700" href="mailto:support@airapplecart.co.uk">support@airapplecart.co.uk</a></p>
            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0" />
          </td>
        </tr>
      </table>
    </body>
  
  </html>`;
};
