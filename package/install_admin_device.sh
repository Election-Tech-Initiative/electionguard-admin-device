#!/bin/bash
# This script can be loaded onto a usb flash drive along with the depndency artifacts to execute the installation

cd electionguard-api-artifacts-linux-x64
sudo bash install.sh

cd ..

cd module-smartcard-artifacts
sudo bash install.sh

cd ..

cd module-usb-artifacts
sudo bash install.sh

cd ..

cd electionguard-admin-artifacts
sudo bash install.sh

systemctl status electionguard-api.service --no-pager
systemctl status module-usb.service --no-pager
systemctl status module-smartcard.service --no-pager
systemctl status electionguard-admin.service --no-pager
echo "done"

exit 0