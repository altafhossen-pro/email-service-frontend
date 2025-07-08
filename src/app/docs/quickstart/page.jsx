// app/docs/quickstart/page.jsx
'use client'
import { useState } from 'react'
import { Copy, Check, Clock, Key, AlertCircle, CheckCircle, Terminal } from 'lucide-react'

const CodeBlock = ({ children, language = 'javascript', title, id }) => {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(children)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="bg-gray-900 rounded-lg overflow-hidden my-4">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="text-sm text-gray-300">{title || language}</span>
                <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded transition-colors text-gray-300"
                >
                    {copied ? (
                        <>
                            <Check className="w-3 h-3 text-green-400" />
                            <span className="text-green-400">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>
            <pre className="p-4 overflow-x-auto">
                <code className="text-sm text-gray-300">{children}</code>
            </pre>
        </div>
    )
}

const StepCard = ({ step, title, children, icon: Icon, completed = false }) => (
    <div className={`border-l-4 ${completed ? 'border-green-500' : 'border-blue-500'} pl-6 pb-8`}>
        <div className="flex items-center gap-3 mb-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${completed ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                {completed ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                    <Icon className="w-5 h-5 text-blue-600" />
                )}
            </div>
            <div>
                <span className="text-sm font-medium text-gray-500">Step {step}</span>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
        </div>
        <div className="space-y-4">
            {children}
        </div>
    </div>
)

export default function QuickStartPage() {
    const [selectedLanguage, setSelectedLanguage] = useState('nodejs')

    const languages = {
        nodejs: {
            name: 'Node.js',
            install: 'npm install nodemailer',
            code: `const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransporter({
  host: 'smtp.yourservice.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_API_KEY,
    pass: process.env.SMTP_API_SECRET
  }
});

// Send email
const mailOptions = {
  from: 'noreply@yourcompany.com',
  to: 'user@example.com',
  subject: 'Welcome to our service!',
  text: 'Thank you for signing up!',
  html: '<h1>Welcome!</h1><p>Thank you for signing up!</p>'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});`
        },
        python: {
            name: 'Python',
            install: 'pip install smtplib email',
            code: `import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

# SMTP configuration
smtp_server = "smtp.yourservice.com"
smtp_port = 587
smtp_user = os.getenv('SMTP_API_KEY')
smtp_password = os.getenv('SMTP_API_SECRET')

# Create message
msg = MIMEMultipart('alternative')
msg['Subject'] = "Welcome to our service!"
msg['From'] = "noreply@yourcompany.com"
msg['To'] = "user@example.com"

# Create HTML and text parts
text = "Thank you for signing up!"
html = "<h1>Welcome!</h1><p>Thank you for signing up!</p>"

part1 = MIMEText(text, 'plain')
part2 = MIMEText(html, 'html')

msg.attach(part1)
msg.attach(part2)

# Send email
try:
    server = smtplib.SMTP(smtp_server, smtp_port)
    server.starttls()
    server.login(smtp_user, smtp_password)
    server.send_message(msg)
    server.quit()
    print("Email sent successfully!")
except Exception as e:
    print(f"Error: {e}")`
        },
        php: {
            name: 'PHP',
            install: 'composer require phpmailer/phpmailer',
            code: `<?php
use PHPMailer\\PHPMailer\\PHPMailer;
use PHPMailer\\PHPMailer\\SMTP;
use PHPMailer\\PHPMailer\\Exception;

require 'vendor/autoload.php';

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host       = 'smtp.yourservice.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = $_ENV['SMTP_API_KEY'];
    $mail->Password   = $_ENV['SMTP_API_SECRET'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Recipients
    $mail->setFrom('noreply@yourcompany.com', 'Your Company');
    $mail->addAddress('user@example.com', 'User Name');

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'Welcome to our service!';
    $mail->Body    = '<h1>Welcome!</h1><p>Thank you for signing up!</p>';
    $mail->AltBody = 'Thank you for signing up!';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>`
        }
    }

    return (
        <div className="max-w-4xl">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Quick Start Guide</h1>
                <p className="text-lg text-gray-600">
                    Get up and running with our SMTP service in under 5 minutes.
                    Follow these simple steps to send your first email.
                </p>
            </div>

            {/* Time estimate */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                        <h3 className="font-semibold text-blue-900">Estimated time: 5 minutes</h3>
                        <p className="text-blue-700">Complete setup and send your first email</p>
                    </div>
                </div>
            </div>

            {/* Steps */}
            <div className="space-y-8">
                {/* Step 1: Get API Keys */}
                <StepCard step="1" title="Get Your API Keys" icon={Key}>
                    <p className="text-gray-600">
                        First, you'll need to obtain your SMTP credentials from your dashboard.
                        These credentials will authenticate your application with our service.
                    </p>

                    <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Your SMTP Configuration</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Host: <span className="font-mono">smtp.yourservice.com</span></p>
                                <p className="text-sm text-gray-600">Port: <span className="font-mono">587</span></p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Username: <span className="font-mono">your_api_key</span></p>
                                <p className="text-sm text-gray-600">Password: <span className="font-mono">your_api_secret</span></p>
                            </div>
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">
                        Make sure to keep your API keys secure and do not share them publicly.
                    </p>
                </StepCard>
                {/* Step 2: Install SDK */}
                <StepCard step="2" title="Install the SDK" icon={Terminal}>
                    <p className="text-gray-600">
                        Depending on your programming language, install the appropriate SDK or library to interact with our SMTP service.
                    </p>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Language:</label>
                        <select
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                            {Object.keys(languages).map((lang) => (
                                <option key={lang} value={lang}>
                                    {languages[lang].name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <CodeBlock title={`Install ${languages[selectedLanguage].name} SDK`} language="bash">
                        {languages[selectedLanguage].install}
                    </CodeBlock>
                    <CodeBlock title={`Example Code in ${languages[selectedLanguage].name}`} language={selectedLanguage}>
                        {languages[selectedLanguage].code}
                    </CodeBlock>
                </StepCard>
                {/* Step 3: Send Your First Email */}
                <StepCard step="3" title="Send Your First Email" icon={CheckCircle} completed>
                    <p className="text-gray-600">
                        Now that you have your API keys and SDK installed, you can send your first email.
                        Use the code example provided in the previous step to get started.
                    </p>
                    <CodeBlock title="Example Email Code" language={selectedLanguage}>
                        {languages[selectedLanguage].code}
                    </CodeBlock>
                    <p className="mt-4 text-sm text-gray-500">
                        If you encounter any issues, refer to our <a href="/docs/guides/troubleshooting" className="text-blue-600 hover:underline">troubleshooting guide</a>.
                    </p>
                </StepCard>
            </div>
            {/* Additional Resources */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Resources</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li><a href="/docs/guides/best-practices" className="text-blue-600 hover:underline">Best Practices for Email Deliverability</a></li>
                    <li><a href="/docs/api/reference" className="text-blue-600 hover:underline">API Reference Documentation</a></li>
                    <li><a href="/docs/guides/troubleshooting" className="text-blue-600 hover:underline">Troubleshooting Common Issues</a></li>
                </ul>
            </div>
        </div>
    );
}