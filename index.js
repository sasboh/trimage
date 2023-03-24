#!/usr/bin/env node

const meow = require('meow')
const chalk = require('chalk')
const fs = require('fs')
const sharp = require('sharp')

const errorMsg = chalk.redBright
const successMsg = chalk.greenBright
const infoMsg = chalk.blueBright

const cli = meow(
  `
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
`,
  {
    flags: {
      width: {
        type: 'number',
        alias: 'w'
      },
      height: {
        type: 'number',
        alias: 'h'
      },
      quality: {
        type: 'number',
        alias: 'q',
        default: 80
      },
      progressive: {
        type: 'boolean',
        alias: 'p',
        default: true
      }
    }
  }
)

const resize = (file, format, options) => {
  const filename = file.split('.').shift()
  return new Promise(resolve => {
    sharp(file)
      .toFormat(format, {
        quality: options.quality,
        progressive: options.progressive
      })
      .resize({
        width: options.width,
        height: options.height
      })
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => {
        const outputFile =
          filename + '_' + info.width + 'x' + info.height + '.' + format
        fs.writeFile(outputFile, data, function (err) {
          if (err) {
            return console.error(errorMsg(err))
            process.exit(1)
          }
          console.log(file + ' -> ' + outputFile)
          resolve()
        })
      })
      .catch(err => {
        console.error(errorMsg(err))
        process.exit(1)
      })
  })
}

if (cli.input.length === 0 && process.stdin.isTTY) {
  console.error(errorMsg('Specify at least one file!'))
  process.exit(1)
}

console.log(infoMsg('Starting to process ' + cli.input.length + ' file(s)'))

cli.input.forEach(file => {
  Promise.all([resize(file, 'jpg', cli.flags), resize(file, 'webp', cli.flags)])
    .then(() => console.log(successMsg(file + ' done')))
    .catch(err => {
      console.error(errorMsg(err))
      process.exit(1)
    })
})
