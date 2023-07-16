 touch out/.nojekyll 
 mv out/_next/* out/
 find out/ -type f -name "*" | gsed -i '' 's/_next\/static\//static\/g'
