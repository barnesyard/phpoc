#Path to your Ghostscript EXE
$tool = 'C:\\Program Files\\gs\\gs9.21\\bin\\gswin64.exe'

#Directory containing the PDF files that will be converted
$inputDir = 'D:\\Puzzling\\PuzzleHunt\\PuzzlehuntOnline.Web\\App_Data\\Puzzles\\'

#Output path where the thumbnail png files will be saved
$outputDir = 'D:\\Puzzling\\PuzzleHunt\\PuzzlehuntOnline.Web\\App_Data\\Puzzles\\Thumbnails\\'

$pdfs = get-childitem $inputDir | where {$_.Extension -match "pdf"}

foreach($pdf in $pdfs)
{
    $png = $outputDir + $pdf.BaseName + ".png"
    if(test-path $png)
    {
        "Thumbnail png file already exists " + $png
    }
    else        
    {   
        'Processing ' + $pdf.Name        
        $param = "-sOutputFile=$png"
        & $tool -q  -dSAFER -dBATCH -dNOPAUSE -sDEVICE=png16m -dGraphicsAlphaBits=4 $param $pdf.FullName     }
}

