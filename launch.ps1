# Opens the Build OS docs. Starts the viewer hidden if it is not already running,
# then opens the page in the default browser. Run by the "Build OS" Start Menu shortcut.
$port = 4321

function Test-Viewer {
  try {
    $client = New-Object Net.Sockets.TcpClient
    $client.Connect("127.0.0.1", $port)
    $client.Close()
    return $true
  } catch {
    return $false
  }
}

if (-not (Test-Viewer)) {
  Start-Process node -ArgumentList "`"$PSScriptRoot\serve.mjs`"" -WorkingDirectory $PSScriptRoot -WindowStyle Hidden
  for ($i = 0; $i -lt 50 -and -not (Test-Viewer); $i++) {
    Start-Sleep -Milliseconds 100
  }
}

Start-Process "http://localhost:$port"
