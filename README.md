# Local Development

- Run npm install
- Run npm run build

# Common Errors

If you run into:

```
Uncaught EvalError: Refused to evaluate a string as JavaScript because 'unsafe-eval' is not an allowed source of script in the following Content Security Policy directive: "script-src 'self' blob: filesystem: chrome-extension-resource:".
```

Add the following to your manifest.json

```
"content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'"
```
