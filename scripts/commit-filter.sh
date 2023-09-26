#!/bin/sh

gitmessage="$*"

mergemessage=`echo $gitmessage | grep -w "^Merge"`
if ! [ -z "$mergemessage" ]
then 
      exit 0
fi

# Checks gitmessage for string feat, fix, docs and breaking style, breaking, chore, if the messagecheck var is empty if fails
messagecheck=`echo $gitmessage | grep -w "feat\|fix\|docs\|style\|refactor\|test\|chore\|breaking"`
if [ -z "$messagecheck" ]
then 
      echo "Your commit message must begin with one of the following"
      echo "  feat(feature-name)"
      echo "  fix(fix-name)"
      echo "  docs(docs-change)"
      echo "  style(style-name)"
      echo "  refactor(overview)"
      echo "  test(test-name)"
      echo "  chore(task-name)"
      echo "  breaking(deployment-env)"
      echo " "
fi
# check the gitmessage for the JIRA issue number
messagecheck=`echo $gitmessage | grep "(#"`
if  [ -z "$messagecheck" ]
then 
      echo "Your commit message must end with the following"
      echo "  (#****)"
      echo "Where **** is the your JIRA issue number"
      echo " " 
fi
messagecheck=`echo $gitmessage | grep ": "`
if  [ -z "$messagecheck" ]
then 
      echo "Your commit message has a formatting error please take note of special characters '():' position and use in the example below"
      echo "   type(some txt): some txt (#****)"
      echo "Where 'type' is fix, feat, docs style, refactor, test, chore or breaking and **** is the JIRA issue number"
      echo " "
fi

# All checks run at the same time by pipeing from one grep to another
messagecheck=`echo $gitmessage | grep -w "feat\|fix\|docs\|style\|refactor\|test\|chore\|breaking" | grep "(#" | grep ": "`

# check to see if the messagecheck var is empty
if [ -z "$messagecheck" ]
then  
      echo "Please review the following :"
      echo " "
      echo $gitmessage
      echo " "
      exit 1
else
      exit 0
fi  

echo $1