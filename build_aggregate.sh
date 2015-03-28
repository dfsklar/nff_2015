DEST=webapp/aggregate01.js

echo > $DEST

cat webapp/jquery-1.11.0.min.js >> $DEST
cat webapp/jquery.svg.min.js >> $DEST
cat webapp/utils/chroma.min.js >> $DEST
cat webapp/sugar.min.js >> $DEST
cat webapp/utils/history.js >> $DEST
cat webapp/raphael.js >> $DEST

sh minify.sh jquery.cookie.js >> $DEST
sh minify.sh utils/qtips.js >> $DEST
sh minify.sh highcharts/highcharts-3.0.10-full.js >> $DEST
sh minify.sh utils/fontspy.js >> $DEST
sh minify.sh utils/rgbcolor.js >> $DEST
sh minify.sh utils/StackBlur.js >> $DEST
sh minify.sh utils/canvg.js >> $DEST
sh minify.sh namespaces.js >> $DEST
sh minify.sh colors.js >> $DEST
sh minify.sh numericrange.js >> $DEST

sh minify.sh indexer.js >> $DEST

sh minify.sh slopeidea/data_acted_human_capital.js >> $DEST
sh minify.sh slopeidea/data_acted_management.js >> $DEST
sh minify.sh slopeidea/data_acted_services.js >> $DEST
sh minify.sh slopeidea/engine.js >> $DEST

sh minify.sh renderers/table.js >> $DEST
sh minify.sh renderers/bar.js >> $DEST
sh minify.sh renderers/forthcoming.js >> $DEST
sh minify.sh renderers/barset.js >> $DEST
sh minify.sh renderers/barset2.js >> $DEST
sh minify.sh renderers/highchartspec.js >> $DEST
sh minify.sh renderers/stacked_single_bar.js >> $DEST
sh minify.sh renderers/actions_planned_taken.js >> $DEST
sh minify.sh renderers/trendslope.js >> $DEST

