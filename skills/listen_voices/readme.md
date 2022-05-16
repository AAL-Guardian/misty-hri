# listen_voices skill

The listen_voices skill combines three audio related capabilities in one:
* Keyphrase recognition lets Misty listen to :"Hey Misty!" and sends a signal to other skills and AWS system.
* audio_recording skill records an audio track for 10 seconds and sent it to the AWS system for emotion detection.
* listen_answers skill records an audio file to listen for a verbal answer.

Input from AWS:
User event: "listen_voices"
Event data: {"guardian_data" : <the command>, "upload_url":<the url>, "time":<integer>}

Possible commands:
"on": turns keyphrase detection on
"off": turns keyphrase detection off
"record_audio": records audio for the specifed time in s and sends it to AWS system for detecting emotions using the specified url
"listen_answers": records audio for the specifed time in s and sends it to AWS system (after asking a question) using the specified url

Output:
- audio files to specified urls
- mqtt event that a command is received
- eye_contact event that it should wake-up.