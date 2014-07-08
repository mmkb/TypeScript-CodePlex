//@module: amd
//@sourcemap: true

// @Filename: w1.ts
export var exportedVariable = 1;

// @Filename: exporter.ts
export import w = require('./w1');
var importedVariable = w.exportedVariable;

// @Filename: consumer.ts
import e = require('./exporter');

var importedVariable = e.w.exportedVariable;
