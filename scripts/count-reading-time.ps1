$files = @('c:\projetos\portfolio\case-studies\case-study-fgv\index.html','c:\projetos\portfolio\case-studies\case-study-triunfante\index.html')
foreach ($f in $files) {
  $s = Get-Content -Raw -Encoding UTF8 $f
  if ($s -match '(?s)<article[^>]*class="case-content"[^>]*>(.*?)</article>') { $inner=$matches[1] } else { $inner=$s }
  $text = $inner -replace '<[^>]+>',' ' -replace '\s+',' '
  $words = if ($text.Trim().Length -eq 0) {0} else { ($text.Trim() -split '\s+').Count }
  $wpm=180
  $minutes = [math]::Max(1,[math]::Round($words/$wpm))
  Write-Output "File: $f"
  Write-Output "Words: $words"
  Write-Output "Minutes (wpm=180): $minutes"
  Write-Output '---'
}
