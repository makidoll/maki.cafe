rm -rf frames
mkdir frames
node frames-extract.js
gifski -r 50 --output rainbow-shader.gif frames/*