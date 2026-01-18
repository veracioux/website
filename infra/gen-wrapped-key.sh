#!/usr/bin/env sh

head -c 32 /dev/urandom | LC_CTYPE=C tr '\n' = > mykey.txt
openssl x509 -pubkey -noout -in google-cloud-csek-ingress.pem > pubkey.pem
openssl rsautl -oaep -encrypt -pubin -inkey pubkey.pem -in mykey.txt -out rsawrappedkey.txt
