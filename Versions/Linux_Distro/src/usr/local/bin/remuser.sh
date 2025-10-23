#!/bin/bash

echo "Removing Live User"

if id -u liveuser >/dev/null 2>&1; then
    userdel -r liveuser
fi

echo "Live User Deleted."
