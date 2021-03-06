#!/usr/bin/env bash
set -eu

if which systemctl &> /dev/null; then
    if systemctl status mullvad-daemon &> /dev/null; then
        /opt/Mullvad\ VPN/resources/mullvad-setup prepare-restart
        systemctl stop mullvad-daemon.service
        systemctl disable mullvad-daemon.service
    fi
fi

rm -f /var/cache/mullvad-vpn/relays.json || true
