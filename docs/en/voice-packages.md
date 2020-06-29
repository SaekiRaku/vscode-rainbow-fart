# Customize Voice Packages

## Step 1: Create `manifest.json`

First of all，find an empty directory and create `manifest.json` inside. This metadata file should at least include the following key/value pairs:

```json
// manifest.json
{
    "name": "",
    // Name of voice pack, must be lower-case, hyphens allowed. e.g. "built-in-voice-english"
    "version": "",
    // Version of voice pack, e.g. "1.0.0"
    "contributes": [
        // ... Voice configuration, see below
    ]
}
```

## Step 2: Configure Voice Pack

Copy recorded audio files to be in the same level of directory as `manifest.json`. Currently `vscode-rainbow-fart` extension does not support processing audio files in subdirectories.

Then, add configurations for `contributes` in `manifest.json`. Suppose we want to detect  `function` keyword and play `function.mp3` , the format will be as follows:

```json
// manifest.json
{
    "contributes": [
        {
            "keywords": "function",
            "voices": "function.mp3"
        }
    ]
}
```

The extension also supports multiple keywords sharing an audio file, or sharing multiple audio files and playing randomly.

```json
// manifest.json
{
    "contributes": [
        {
            "keywords": ["function", "=>"],
            // Supports ES6 arrow function ()=>{}
            "voices": [
                "function_01.mp3",
                "function_02.mp3",
                "function_03.mp3",
                // ...
            ]
        }
    ]
}
```

You can also use regular expressions for the keywords.

```json
// manifest.json
{
    "contributes": [
        {
            "keywords": "function",
            "regexps": "=>\\s*{",
            "voices": [
                "function_01.mp3",
                "function_02.mp3",
                "function_03.mp3",
                // ...
            ]
        }
    ]
}
```

## Step 3: Enrich Voice Pack Metadata

Additional information can be added to voice pack metadata.

<ImageZoom :src="URL_PREFIX+'/zh/assets/ui-settings.png'" :border="true" width="300"/>

<Note>Below are optional in manifest.json</Note>

### display-name <Badge>String</Badge>

While `name` is mostly used to identify voice packs, `display-name` allows you to show most characters on the page, including spaces, numbers, and emoji.

### description <Badge>String</Badge>

Voice pack description.

### author <Badge>String</Badge>

Author name.

### avatar <Badge>String</Badge>

You need to copy avatar image to voice pack directory, and fill in the file name for  `avatar` .

### avatar-dark <Badge>String</Badge>

Avatar presented in dark mode.

## Step 4: Pack

Finally, select all files and zip them. **Do not zip parent directory, as all files should be in top level of the zip file.**