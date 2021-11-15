## This bot was mostly coded by Ascynx#2020
the handler used for this project is a modified version of https://github.com/reconlx/djs-base-handler


## currently the bot has the following commands

# moderation

/role
someone with MANAGE_ROLES perm can add / remove a role from/to someone, as long as they're either owner or have a higher role than the one given / removed
# hypixel api

/hyinfo
a user can see some informations on the specified minecraft user

/stalk
a user can see the current activity of the specified minecraft user

/verify
adds the user and it's uuid to the database

/weight
a user can use this command to check someone's skyblock weight
# ticket

/setupticket
someone with Admin perm can use this command to create a new thread ticket system in a specified channel

/ticket
someone with MANAGE_THREADS perm can use this command to act on certain threads / ticket systems
# config

/setconfig
someone with MANAGE_ROLES perm can use this command to add an entry to the guild's configuration

/delconfig
someone with MANAGE_ROLES perm can use this command to remove an entry from the guild's configuration

/dev
a super-user / the dev can use this command to execute indev / dangerous commands

/checkconfig
someone with MANAGE_ROLES perm can use this command to see the current configuration of the guild they're in

/reload
globally disabled -- someone with MANAGE_ROLES perm can use this command to execute the "purge".
# context menu commands

User - getAvatar
return's the target's avatar in an embed

User - getInfo
returns the target's info from the linked accounts database