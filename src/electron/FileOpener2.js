/*
The MIT License (MIT)

Copyright (c) 2020 pwlin - pwlin05@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
// https://www.electronjs.org/docs/api/shell
const { shell } = global.require('electron');

//Fix Cordova Electron 3.0 Args Bug. Electron context bridge uses ... for receiving args. This causes
//args to be nested in another array when sent, this is not like other platform args and makes plugin compatibility hard. 
// This may change in future so we'll handle it here.
function getArgs(args) {
  if(Array.isArray(args) && args.length === 1 && Array.isArray(args[0])) {
      return args[0];
  }
  else {
      return args;
  }
}

exports.open = function (args) {
  args = getArgs(args);
  var opn = shell.openItem(args[0]);
  if (opn === true) {
    return Promise.resolve(true);
  } else {
    return Promise.reject({'status': 0, 'message': 'Failed opening file.'});
  }
};