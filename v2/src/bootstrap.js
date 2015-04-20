var EventEmitter = require("events").EventEmitter
var ee = new EventEmitter()

require('./keyPressDetector')(ee)
require('./buttoner')(ee)



