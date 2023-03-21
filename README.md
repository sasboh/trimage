# trimage

### resizing, optimizing and converting images to jpg/webp

This simple tool takes any kind of images that you get from marketing or UX and converts it into lean, web-friendly formats jpg and webp. You can resize it by defining a width or height, otherwise it keeps the current size. If you define both, width and height, it crops the image at top/bottom or right/left if necessary. The new files will be renamed in original file name plus new size: _myImage_1024x600.jpg_. The quality level is 80 and the jpg files are progressive.

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

  Examples
    $ trimage img1
    $ trimage img1 -w 1024
    $ trimage img1 img2 -h 600
    $ trimage img1 img2 img3 -w 1024 -h 600

```
