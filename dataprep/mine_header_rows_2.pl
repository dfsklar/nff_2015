# This next line declares that the incoming file is in Mac format (line ending is just a ^R).
local $/ = "\r";

# Change for 2015: the headers are now found in TWO ROWS.
# The column header is taken from the first row unless that cell is empty, in which case taken from second row.

# READ THE FIRST HEADER ROW
$_ = <STDIN>;
chomp;
@fields1 = split(/[\t\r\n]/, $_);

# READ THE SECOND ROQW
$_ = <STDIN>;
chomp;
@fields2 = split(/[\t\r\n]/, $_);

$numCols = $#fields2;

# PRINT BASED
for (my $i=0; $i < $numCols; $i++) {
    print $fields1[$i];
    print "\t";
    print $fields2[$i];
    print "\n";
}
