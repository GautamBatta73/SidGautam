#!/bin/bash
echo "Cleaning up..."

packages_to_remove=(
	"live-boot"
	"live-boot-doc"
	"live-config"
	"live-config-doc"
	"live-config-systemd"
	"live-config-systemd"
	"live-tools"
	"live-task-localisation"
	"live-task-recommended"
	"calamares-settings-debian"
	"gparted"
	"refractasnapshot-base"
)

for package in "${packages_to_remove[@]}"; do
    if apt -qq list "$package" &>/dev/null; then
        apt remove -y "$package"
    fi
done


apt autoremove -y

sudo update-initramfs -u && sudo update-grub

echo "Cleanup Done."
