interface RedirectOverride {
    enabled: boolean;
    from: string;
    to: string;
}

interface Header {
    enabled: boolean;
    name: string;
    value: string;
    host?: string
}

interface RedirctlyConfig {
    enable: boolean;
    overrides: RedirectOverride[];
    headers: Header[];
}

let redirctlyConfig: RedirctlyConfig = {
    enable: false,
    overrides: [],
    headers: []
};

const allResourceTypes = [
    "main_frame",
    "sub_frame",
    "stylesheet",
    "script",
    "image",
    "font",
    "object",
    "xmlhttprequest",
    "ping",
    "csp_report",
    "media",
    "websocket",
    "other"
] as chrome.declarativeNetRequest.ResourceType[];

function isValidUrl(url: string) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}
const generateRules = (config: RedirctlyConfig): chrome.declarativeNetRequest.Rule[] => {
    const rules: chrome.declarativeNetRequest.Rule[] = [];
    let ruleIdCounter = 1;

    // Generate redirect rules
    config.overrides.forEach((override) => {
        if (override.enabled && isValidUrl(override.to) && isValidUrl(override.from)) {
            rules.push({
                id: ruleIdCounter++,
                priority: 1,
                action: {
                    type: 'redirect',
                    redirect: { url: override.to }
                } as chrome.declarativeNetRequest.RuleAction,
                condition: {
                    urlFilter: override.from,
                    resourceTypes: allResourceTypes
                }
            });
        }
    });

    // Generate header modification rules
    config.headers.forEach((header) => {
        if (header.enabled && header.name && header.value) {
            rules.push({
                id: ruleIdCounter++,
                priority: 1,
                action: {
                    type: 'modifyHeaders',
                    requestHeaders: [{ header: header.name, operation: 'set', value: header.value }]
                } as chrome.declarativeNetRequest.RuleAction,
                condition: {
                    urlFilter: header.host ? header.host : '*://*/*',
                    resourceTypes: allResourceTypes
                }
            });
        }
    });
    return rules;
};

chrome.runtime.onMessage.addListener((request: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void): boolean => {
    if (!sender.tab) {
        if (request.redirctly) {
            redirctlyConfig = { ...request.redirctly };
            const rules = generateRules(redirctlyConfig);

            // First, get all existing dynamic rules
            chrome.declarativeNetRequest.getDynamicRules().then(existingRules => {
                // Get the IDs of the existing rules
                const existingRuleIds = existingRules.map(rule => rule.id);

                // Then, remove the existing rules and add the new rules
                return chrome.declarativeNetRequest.updateDynamicRules({
                    removeRuleIds: existingRuleIds,
                    addRules: redirctlyConfig.enable ? rules : []
                });
            }).then(() => {
                // Send the response back to the sender
                sendResponse({ success: true });
            }).catch(error => {
                // Handle any errors that occur while updating the rules
                console.error('Error updating rules:', error);
                sendResponse({ success: false, error: error.message });
            });

            return true;  // This line is necessary to use sendResponse asynchronously
        }
    }
    return false;
});
