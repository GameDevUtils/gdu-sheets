#!/bin/sh

foo=$1
if [ -z "$1" ];
then
  echo ERROR: Expected one argument. Received none.
else
  for i in $(find . | grep orange); do
    fname1=$i
    fname2=$(echo "${fname1}" | sed -e "s/orange/${foo}/g")
    cat "${fname1}" | sed -e "s/orange/${foo}/g" > "${fname2}"
  done

  rm "copy-$1.sh"
fi
