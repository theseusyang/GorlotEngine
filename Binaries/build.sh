echo "Joining JavaScript files"
node join.js
echo "Closure compiling"
java -jar closure.jar --language_out ES6 --js out.js --js_output_file Gorlot.js
echo "Cleaning temp files"
rm out.js
echo "Done"