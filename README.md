# trimage

### trim your image for the web

A tool for resizing, optimizing and converting images (jpg, png, webp, etc.) to web-friendly formats progressive jpg and webp. You can resize it by defining width or height, otherwise it keeps the current size. If you define both, width and height, it crops the image at top/bottom or right/left if necessary. The new files will be renamed in original file name plus new size: _myImage_1024x600.jpg_. You can also set the quality level (default = 80) and progressiveness of the jpg (default = true).

## Install

```
$ npm install -g trimage
```

## Usage

```
$ trimage --help

  Usage
    $ trimage <files>

  Options
    $ --width, -w  width in pixel, keeps aspect ratio if height is undefined
    $ --height, -h  height in pixel, keeps aspect ratio if width is undefined
    $ --quality, -q  quality level, default is 80
    $ --progressive, -p  progressiveness of the jpg, default is true

  Examples
    $ trimage img1
    $ trimage img1 -w 1024
    $ trimage img1 img2 -h 600
    $ trimage img1 img2 img3 -w 1024 -h 600
    $ trimage img1 -q 100
    $ trimage img1 -p false
```
