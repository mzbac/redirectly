# Redirctly Chrome Extension

Redirctly is a Chrome extension that allows users to define URL redirections and custom headers for web requests. This extension is useful for developers who want to test their web applications with different request headers or redirect requests to a different URL.

## Features

- Define URL redirection rules.
- Customize request headers.
- Enable or disable redirection and header modification via a simple interface.

## Installation

1. Clone this repository to your local machine.
   ```bash
   git clone https://github.com/mzbac/redirectly.git
   ```
2. build the extension.
   ```bash
   npm run build
   ```
3. Navigate to chrome://extensions/ in your Chrome browser.
4. Enable Developer mode by toggling the switch in the top right corner.
5. Click Load unpacked and select the dist folder in the cloned repository.


## Usage
After installing the extension, open the popup UI to configure your redirection rules and custom headers.

1. Adding Redirection Rules:
- Click Add Rule.
- Enter the From URL and To URL.
- Toggle the Enabled switch to activate the rule.
2. Modifying Request Headers:
- Click Add Header.
- Enter the Header Name and Header Value.
- Toggle the Enabled switch to activate the custom header.
