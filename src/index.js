const fs = require('fs')
const path = require('path')
const cac = require('cac')
const prompts = require('prompts')
const os = require('os')
const cli = cac('git-cli')

const cwd = process.cwd()

const isWin = os.platform() === 'win32'
const homePath = isWin?process.env.USERPROFILE:process.env.HOME
//#region utils
/**
 *
 * @param {*} folderPath
 * @param {string[]} filename
 * @param {*} data
 * 把一个文件夹的内容拷贝到另一个文件夹下，而不是文件夹的移动
 */
 function copyDir(srcDir, destDir) {
    fs.mkdirSync(destDir, { recursive: true })
    const files = fs.readdirSync(srcDir)
    for (const file of files) {
      const srcFile = path.join(srcDir, file)
      const destFile = path.join(destDir, file)
      copy(srcFile, destFile)
    }
  }
  function copy(src, dest) {
    const stat = fs.statSync(src)
    if (stat.isDirectory()) {
      copyDir(src, dest)
    } else {
      fs.copyFileSync(src, dest)
    }
  }

  /**
 * empty the dir then remove the emptied dir
 * @param {sting} dir target dir path
 * @returns
 */
function emptyDir(dir) {
    if (!fs.existsSync(dir)) return
    const files = fs.readdirSync(dir)
    for (const file of files) {
      const abs = path.resolve(dir, file)
      if (fs.lstatSync(abs).isDirectory()) {
        emptyDir(abs)
        fs.rmdirSync(abs)
      } else {
        fs.unlinkSync(abs)
      }
    }
  }

  //#endregion


console.log(`detect that your are on ${isWin?'Windows':'Mac'}`);

if(isWin){

}else{
    copy('./templates',homePath)
}