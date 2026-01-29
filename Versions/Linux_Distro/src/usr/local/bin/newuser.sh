#!/bin/bash

echo "Adding Default User Bookmarks"

username=$(tail -n 1 /etc/passwd | cut -d: -f1)

/usr/local/sbin/adduser.local 0 0 0 "/home/${username}"

echo "Default User Bookmarks Added."
