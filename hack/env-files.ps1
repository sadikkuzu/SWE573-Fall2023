function Check-And-CreateEnv {
    param (
        [string]$filePath
    )

    $sampleFilePath = $filePath + ".sample"

    if (Test-Path $filePath) {
        # File exists
        Write-Host "$filePath already exists."
    } elseif (Test-Path $sampleFilePath) {
        # Sample file exists, copy it to create the file
        Copy-Item -Path $sampleFilePath -Destination $filePath
        Write-Host "File created by copying $sampleFilePath to $filePath."
    } else {
        # Neither file nor sample file exists, create an empty file
        New-Item -ItemType File -Path $filePath
        Write-Host "File created at $filePath."
    }
}

# ./.env.sample
# ./backend/core/.env.sample
# ./frontend/.env.sample

Check-And-CreateEnv -filePath "./.env"
Check-And-CreateEnv -filePath "./backend/core/.env"
Check-And-CreateEnv -filePath "./frontend/.env"
