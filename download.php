<?php
// Hakikisha kuna faili iliyotajwa
if (isset($_GET['file'])) {
    $file = basename($_GET['file']); // Ondoa njia ya faili kwa usalama
    $file_path = 'movies/' . $file;

    // Angalia kama faili ipo
    if (file_exists($file_path)) {
        // Anzisha upakuaji
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . $file . '"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($file_path));
        readfile($file_path);
        exit;
    } else {
        echo "Faili haipo.";
    }
} else {
    echo "Hakuna faili iliyochaguliwa.";
}
?>
