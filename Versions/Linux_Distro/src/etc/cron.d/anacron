# /etc/cron.d/anacron: crontab entries for the anacron package

SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

30 7-23 * * *   root	if [ -x /etc/init.d/anacron ] && ! [ -d /run/systemd/system ]; then exec /usr/sbin/invoke-rc.d anacron start >/dev/null; fi
