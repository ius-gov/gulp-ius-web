mkdir -p wwwroot/app/js
mkdir -p wwwroot/app/css

echo "function hellowWorld() { alert('Hello World'); }" > wwwroot/apps/js/site.js
echo "body { color : 'red'; } " > wwwroot/apps/css/site.css

gulp clean
gulp concat

if [ ! -f 'wwwroot/js/site.js' ]; then
	echo "Site.js not created"
	exit 1
fi

if [ ! -f 'wwwroot/css/site.css' ]; then
	echo "Site.css not created"
	exit 0
fi