# Auth0 Redirect Service Example

An example service with a single redirect service handling state for the redirect to the appropriate application. It uses docker as a proxy service to handle https for domain names.

---

## Requirements

- NVM or NodeJS `v16.15.0`
- Docker

---

## Host Configurations

In order to take advantage of the DNS settings for `localdomain.com`, ensure the following is set on your `hosts` file.

```
sudo /etc/hosts;

# 127.0.0.1       www.localdomain.com
# 127.0.0.1       localdomain.com
# 127.0.0.1       sub.localdomain.com
# 127.0.0.1       api.localdomain.com
```

---

## SSL Certificate Generation

**NOTE:** These certificates will need to be generated before any of the other steps.

Generates SSL certificates to allow for HTTPS for `localdomain.com`:

```bash
docker run -it --rm -v $PWD/certs:/tmp nginx:alpine /bin/sh -c 'apk add openssl; openssl req -x509 -nodes -days 365 -subj "/C=CA/ST=QC/O=Company, Inc./CN=localdomain.com" -addext "subjectAltName=DNS:localdomain.com,DNS:sub.localdomain.com,DNS:www.localdomain.com,DNS:api.localdomain.com" -newkey rsa:2048 -keyout /tmp/nginx-selfsigned.key -out /tmp/nginx-selfsigned.crt;';
```

---

## Add SSL To KeyChain

MacOS:

```bash
sudo security add-trusted-cert -d -r trustRoot -k "/Library/Keychains/System.keychain" certs/nginx-selfsigned.crt;
# VERIFY CERTIFICATE ADDED
# security find-certificate -c "localdomain.com" -a -Z
# DELETE CERTIFICATE (WARNING: Deletes all certificates with that name)
# sudo security delete-certificate -c "localdomain.com"
```

Don't Have MacOS?

Drag the `certs/nginx-selgsigned.crt` into your KeyChain equivalent and set it to `Trust All`.

---

## Local Setup

```bash
docker compose up -d;
```

**NOTE:** To remove instance

```bash
docker compose down --remove-orphans -v;
```

---

## Sub Main Domain Add Auth0 Keys

```
cp packages/api.localdomain.com/.env.example packages/api.localdomain.com/.env;
cp packages/localdomain.com/.env.example packages/localdomain.com/.env;
cp packages/sub.localdomain.com/.env.example packages/sub.localdomain.com/.env;
```

**File:** `packages/api.localdomain.com/.env`

```
# AUTH0
AUTH0_DOMAIN="<YOUR-AUTH0-DOMAIN>"
AUTH0_CLIENT_ID="<YOUR-AUTH0-CLIENT-ID>"
AUTH0_REDIRECT_URI_AUTHORIZE="https://api.localdomain.com"
AUTH0_REDIRECT_URI_WEBAUTH="https://localdomain.com"
WHITELIST_STATES="api.localdomain.com,www.localdomain.com,localdomain.com,sub.localdomain.com"
DEFAULT_LOGOUT_REDIRECT="localdomain.com"
```

**File:** `packages/localdomain.com/.env`

```
NEXT_PUBLIC_AUTH0_DOMAIN="<YOUR-AUTH0-DOMAIN>"
NEXT_PUBLIC_AUTH0_DOMAIN_CLIENT_ID="<YOUR-AUTH0-CLIENT-ID>"
NEXT_PUBLIC_AUTH0_AUDIENCE="<YOUR-AUTH0-AUDIENCE>"
NEXT_PUBLIC_AUTH0_SCOPE="openid profile email"
NEXT_PUBLIC_AUTH0_RESPONSE_TYPE="token id_token"
NEXT_PUBLIC_AUTH0_REDIRECT_URI_AUTHORIZE="https://api.localdomain.com"
NEXT_PUBLIC_AUTH0_REDIRECT_URI_WEBAUTH="https://localdomain.com"
NEXT_PUBLIC_AUTH0_RESPONSE_MODE="form_post"
```

**File:** `packages/sub.localdomain.com/.env`

```
VITE_AUTH0_DOMAIN="<YOUR-AUTH0-DOMAIN>"
VITE_AUTH0_DOMAIN_CLIENT_ID="<YOUR-AUTH0-CLIENT-ID>"
VITE_AUTH0_AUDIENCE="<YOUR-AUTH0-AUDIENCE>"
VITE_AUTH0_SCOPE="openid profile email"
VITE_AUTH0_RESPONSE_TYPE="token id_token"
VITE_AUTH0_REDIRECT_URI_AUTHORIZE="https://api.localdomain.com"
VITE_AUTH0_REDIRECT_URI_WEBAUTH="https://sub.localdomain.com"
VITE_AUTH0_RESPONSE_MODE="form_post"
```

---

## Build & Serve

```bash
yarn dev;
```
