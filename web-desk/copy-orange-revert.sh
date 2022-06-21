#!/bin/sh

foo=$1
if [ -z "$1" ];
then
  echo ERROR: Expected one argument. Received none.
  echo Usage:
  echo "  ./copy-orange-revert.sh themeName"
else
  pushd src

  for i in $(find . -name "*\.ts*" | grep -v -e "\.test\.ts" -e "index\.tsx" -e "\.d\.ts" -e "setupTests" -e "reportWebVitals"); do
    fname1=$i
    regexp=$1;
    data=$(cat "$fname1")

#    if [[ $data =~ $regexp ]]; then
      $(git checkout -- "$i")
#    fi
  done

  for file in $(find . | grep "$1"); do rm "$file"; done;

  popd
fi


## to clean the generated scss files, run this with "darkly" replaced with the theme you want to clean.
#pushd src; for file in $(find . | grep "darkly"); do rm "$file"; done; popd
