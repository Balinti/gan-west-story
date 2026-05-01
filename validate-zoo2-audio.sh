#!/bin/bash

# Audio Validator for Zoo2 Story
# This script validates all 63 zoo2 audio files

AUDIO_DIR="/Users/edoebalint/Projects/story/gan-west-story/public/audio"
STORY_FILE="/Users/edoebalint/Projects/story/gan-west-story/src/data/stories/zoo2.ts"

# Expected files from zoo2.ts audioManifest
declare -a EXPECTED_FILES=(
  # zoo2-opening (5 lines)
  "zoo2-opening_01.mp3"
  "zoo2-opening_02.mp3"
  "zoo2-opening_03.mp3"
  "zoo2-opening_04.mp3"
  "zoo2-opening_05.mp3"
  # zoo2-bus (5 lines)
  "zoo2-bus_01.mp3"
  "zoo2-bus_02.mp3"
  "zoo2-bus_03.mp3"
  "zoo2-bus_04.mp3"
  "zoo2-bus_05.mp3"
  # zoo2-gates (5 lines)
  "zoo2-gates_01.mp3"
  "zoo2-gates_02.mp3"
  "zoo2-gates_03.mp3"
  "zoo2-gates_04.mp3"
  "zoo2-gates_05.mp3"
  # zoo2-choice1 (2 lines)
  "zoo2-choice1_01.mp3"
  "zoo2-choice1_02.mp3"
  # zoo2-safari (5 lines)
  "zoo2-safari_01.mp3"
  "zoo2-safari_02.mp3"
  "zoo2-safari_03.mp3"
  "zoo2-safari_04.mp3"
  "zoo2-safari_05.mp3"
  # zoo2-jungle (5 lines)
  "zoo2-jungle_01.mp3"
  "zoo2-jungle_02.mp3"
  "zoo2-jungle_03.mp3"
  "zoo2-jungle_04.mp3"
  "zoo2-jungle_05.mp3"
  # zoo2-snack (5 lines)
  "zoo2-snack_01.mp3"
  "zoo2-snack_02.mp3"
  "zoo2-snack_03.mp3"
  "zoo2-snack_04.mp3"
  "zoo2-snack_05.mp3"
  # zoo2-choice2 (2 lines)
  "zoo2-choice2_01.mp3"
  "zoo2-choice2_02.mp3"
  # zoo2-ocean (5 lines)
  "zoo2-ocean_01.mp3"
  "zoo2-ocean_02.mp3"
  "zoo2-ocean_03.mp3"
  "zoo2-ocean_04.mp3"
  "zoo2-ocean_05.mp3"
  # zoo2-reptiles (5 lines)
  "zoo2-reptiles_01.mp3"
  "zoo2-reptiles_02.mp3"
  "zoo2-reptiles_03.mp3"
  "zoo2-reptiles_04.mp3"
  "zoo2-reptiles_05.mp3"
  # zoo2-scavenger-done (5 lines)
  "zoo2-scavenger-done_01.mp3"
  "zoo2-scavenger-done_02.mp3"
  "zoo2-scavenger-done_03.mp3"
  "zoo2-scavenger-done_04.mp3"
  "zoo2-scavenger-done_05.mp3"
  # zoo2-gift-shop (5 lines)
  "zoo2-gift-shop_01.mp3"
  "zoo2-gift-shop_02.mp3"
  "zoo2-gift-shop_03.mp3"
  "zoo2-gift-shop_04.mp3"
  "zoo2-gift-shop_05.mp3"
  # zoo2-bus-home (4 lines)
  "zoo2-bus-home_01.mp3"
  "zoo2-bus-home_02.mp3"
  "zoo2-bus-home_03.mp3"
  "zoo2-bus-home_04.mp3"
  # zoo2-end (5 lines)
  "zoo2-end_01.mp3"
  "zoo2-end_02.mp3"
  "zoo2-end_03.mp3"
  "zoo2-end_04.mp3"
  "zoo2-end_05.mp3"
)

echo "=========================================="
echo "ZOO2 AUDIO VALIDATION REPORT"
echo "=========================================="
echo ""

# Count totals
TOTAL_EXPECTED=${#EXPECTED_FILES[@]}
FOUND_COUNT=0
MISSING_FILES=()
SMALL_FILES=()
LARGE_FILES=()

echo "Checking ${TOTAL_EXPECTED} expected files..."
echo ""

for file in "${EXPECTED_FILES[@]}"; do
  filepath="$AUDIO_DIR/$file"

  if [ -f "$filepath" ]; then
    FOUND_COUNT=$((FOUND_COUNT + 1))
    size=$(stat -f%z "$filepath" 2>/dev/null)

    if [ $size -lt 1024 ]; then
      SMALL_FILES+=("$file (${size} bytes)")
    elif [ $size -gt 500000 ]; then
      LARGE_FILES+=("$file ($(( size / 1024 )) KB)")
    fi

    printf "✓ %-35s %6d bytes\n" "$file" "$size"
  else
    MISSING_FILES+=("$file")
    printf "✗ %-35s MISSING\n" "$file"
  fi
done

echo ""
echo "=========================================="
echo "VALIDATION SUMMARY"
echo "=========================================="
echo "Total expected:    $TOTAL_EXPECTED"
echo "Total found:       $FOUND_COUNT"
echo "Missing:           ${#MISSING_FILES[@]}"
echo "Suspiciously small (< 1KB):  ${#SMALL_FILES[@]}"
echo "Suspiciously large (> 500KB): ${#LARGE_FILES[@]}"
echo ""

if [ ${#MISSING_FILES[@]} -gt 0 ]; then
  echo "MISSING FILES:"
  printf '%s\n' "${MISSING_FILES[@]}"
  echo ""
fi

if [ ${#SMALL_FILES[@]} -gt 0 ]; then
  echo "SUSPICIOUSLY SMALL FILES:"
  printf '%s\n' "${SMALL_FILES[@]}"
  echo ""
fi

if [ ${#LARGE_FILES[@]} -gt 0 ]; then
  echo "SUSPICIOUSLY LARGE FILES:"
  printf '%s\n' "${LARGE_FILES[@]}"
  echo ""
fi

echo "=========================================="
if [ ${#MISSING_FILES[@]} -eq 0 ] && [ ${#SMALL_FILES[@]} -eq 0 ] && [ ${#LARGE_FILES[@]} -eq 0 ]; then
  echo "RESULT: PASS"
  echo "All 63 audio files exist with reasonable sizes."
  exit 0
else
  echo "RESULT: FAIL"
  echo "Issues detected - see above for details"
  exit 1
fi
