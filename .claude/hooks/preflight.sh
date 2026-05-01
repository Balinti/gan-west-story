#!/bin/bash
# Preflight hook for gan-west-story project.
# Receives PreToolUse JSON on stdin. For Bash commands, blocks dangerous patterns.

cmd=$(jq -r '.tool_input.command // ""' 2>/dev/null)

# Block rm commands (with leading space, semi, or pipe — to catch chained rm)
if echo "$cmd" | grep -qE '(^|[;&|[:space:]])rm([[:space:]]|$)'; then
  cat <<'EOF'
{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"BLOCKED: rm command detected. Show the user exactly what will be deleted, wait for explicit 'yes' confirmation, then either ask the user to run it themselves or use a different approach."}}
EOF
  exit 0
fi

# Block image generation API calls without verified refs
if echo "$cmd" | grep -qE 'createTask|generate-images\.py|gpt-image-2-image-to-image|nano-banana'; then
  cat <<'EOF'
{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"BLOCKED: image generation API call detected. Before this call, you MUST have used the Read tool on EVERY character reference image used in the prompt. Confirm with the user explicitly that all refs were viewed and descriptions match reality."}}
EOF
  exit 0
fi

# Warn (don't block) on git push
if echo "$cmd" | grep -q 'git push'; then
  cat <<'EOF'
{"systemMessage":"⚠️ git push detected — make sure you showed the user `git log` and `git diff` first if you havent."}
EOF
  exit 0
fi

# Otherwise no opinion
exit 0
