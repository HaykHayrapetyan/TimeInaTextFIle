var moment = require('moment');
var {Readable, Writable, Transform} = require('stream');
var fs = require('fs');

console.log(moment().format());

 class FSTransform extends Transform{
     _transform(buffer, encoding, done){
        var timeStr = buffer.toString();
        var date = new Date(timeStr);
        this.push(moment(date).format().toString() + "\n");
        done();
     }
 }

class FSReadable extends Readable{
    
    _read(size){
        const time = new Date();
        setTimeout(()=>{
            this.push(time.toString());
        }, 1000);  
    }
}

class FSWritable extends Writable{
    constructor(Option){
        super(Option)
        this.file = fs.openSync(__dirname + '/time.txt', "w+");
    }

    _write(chunk, encoding, done){
        fs.write(this.file, chunk.toString(), ()=>{
            done();
        });  
    }
}


var fsreadable = new FSReadable();
var fswritable = new FSWritable();
var fstrandform = new FSTransform();

fsreadable.pipe(fstrandform).pipe(fswritable);

