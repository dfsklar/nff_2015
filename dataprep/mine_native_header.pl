# This next line declares that the incoming file is in Mac format (line ending is just a ^R).
local $/ = "\r";

# Change for 2015: the headers are now found in TWO ROWS.
# The column header is taken from the first row unless that cell is empty, in which case taken from second row.

# READ UNTIL THE NATIVE HEADER ROW IS SEEN
while (1) {
    $_ = <STDIN>;
    chomp;
    last if (/^Status/);
}

@fields = split(/[\t\r\n]/, $_);

$numCols = $#fields;

# PRINT BASED
for (my $i=0; $i < $numCols; $i++) {
    print $fields[$i];
    print "\n";
}
