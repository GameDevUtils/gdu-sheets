#!/bin/sh

foo=$1
if [ -z "$1" ];
then
  echo ERROR: Expected one argument. Received none.
  echo Usage:
  echo "  ./copy-yellow.sh themeName"
else
  pushd src
  for i in $(find . | grep yellow); do
    fname1=$i
    fname2=$(echo "${fname1}" | sed -e "s/yellow/${foo}/g")
    cat "${fname1}" | sed -e "s/yellow/${foo}/g" > "${fname2}"
    cat "../copy-yellow-newline-for-eof.txt" >> "${fname2}"
  done

  for i in $(find . -name "*\.ts*" | grep -v -e "\.test\.ts" -e "index\.tsx" -e "\.d\.ts" -e "setupTests" -e "reportWebVitals"); do
    fname1=$i
    fname2=$i.bak
    regexp='yellow';

    mv "$fname1" "$fname2"
    cat "../copy-yellow-newline-for-eof.txt" >> "${fname2}"
    touch "$fname1"
    while IFS='' read -r line; do
      if [[ $line =~ $regexp ]]; then
        echo "$line" >> $fname1
        echo "$line" | sed -e "s/yellow/${foo}/g" >> $fname1
      else
        echo "$line" >> $fname1
      fi
    done < "$fname2"
    rm "$fname2"
  done
  popd

#  rm "copy-$1.sh"
fi


## to clean the generated scss files, run this with "darkly" replaced with the theme you want to clean.
#pushd src; for file in $(find . | grep "darkly"); do rm "$file"; done; popd
