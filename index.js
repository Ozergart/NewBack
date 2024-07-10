const http = require('node:http')
const path   = require('node:path')
const rl = require('node:readline/promises')
const fscb = require('node:fs')
const fs = require('node:fs/promises')
const foo =async ()=> {


// console.log(__filename)
// console.log(path.basename(__filename))
// console.log(path.dirname(__filename))
// console.log(path.extname(__filename))
// console.log(path.parse(__filename))
// console.log(path.normalize(__filename))

//     const rlInts = rl.createInterface({
//         input: process.stdin,
//         output: process.stdout
//     })
//      const name = await rlInts.question('name:')
//     console.log(`hi ${name}`)
//     process.exit()
    const pathTo = path.join(__dirname,'dir','text.txt')
    await  fs.writeFile(pathTo,'Hello world',{flag:''})
    const data = await  fs.readFile(pathTo,"utf-8")
    console.log(data)
    await fs.mkdir(path.join(__dirname, 'some_dir', 'newDIr'),{recursive:true})
    await fs.appendFile(pathTo,' new')
}
void  foo()