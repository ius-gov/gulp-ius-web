npm install

gulp clean

mkdir -p wwwroot/lib/jquery/dist/
mkdir -p wwwroot/lib/pure/

echo "function hellowWorld() { alert('Hello World'); }" > wwwroot/lib/jquery/dist/jquery.js
echo "function hellowWorld() { alert('Hello World'); }" > wwwroot/lib/jquery/dist/jquery.min.js
echo "body { color : 'red'; } " > wwwroot/lib/pure/pure.css
echo "body { color : 'red'; } " > wwwroot/lib/pure/pure.min.css

gulp concat

if [ ! -f 'wwwroot/js/site.js' ]; then
	echo "Site.js not created"
	exit 1
fi

if [ ! -f 'wwwroot/css/site.css' ]; then
	echo "Site.css not created"
	exit 0
fi