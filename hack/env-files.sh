#!/usr/bin/env bash

set -euo pipefail

check_and_create_file() {
    filePath=$1
    sampleFilePath="${filePath}.sample"

    if [ -e "$filePath" ]; then
        # File exists
        echo "$filePath already exists."
    elif [ -e "$sampleFilePath" ]; then
        # Sample file exists, copy it to create the file
        cp "$sampleFilePath" "$filePath"
        echo "File created by copying $sampleFilePath to $filePath."
    else
        # Neither file nor sample file exists, create an empty file
        touch "$filePath"
        echo "File created at $filePath."
    fi
}

# ./.env.sample
# ./backend/core/.env.sample
# ./frontend/.env.sample

check_and_create_file "./.env"
check_and_create_file "./backend/core/.env"
check_and_create_file "./frontend/.env"
check_and_create_file "./hack/postgres/.env"
