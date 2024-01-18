## Frontend part

This is basically a next.js application. Check package.json for the scripts. Some libraries are pre installed, but you don't need to use them.

## Troubleshooting

if you get this error

```
ist/compiled/webpack/bundle5.js:68407:5 {
  opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'
}
```

so run

On Unix-like (Linux, macOS, Git bash, etc.):
```
export NODE_OPTIONS=--openssl-legacy-provider
```
On Windows command prompt:
```
set NODE_OPTIONS=--openssl-legacy-provider
```
On PowerShell:
```
$env:NODE_OPTIONS = "--openssl-legacy-provider"
```