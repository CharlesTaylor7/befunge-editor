 mv out/_next/* out/
 FILES=$(find out -type f -name "*")
 gsed -i 's/_next\/static\//static\//g' $FILES
