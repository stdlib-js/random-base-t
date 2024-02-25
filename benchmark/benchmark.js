/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var bench = require( '@stdlib/bench-harness' );
var randu = require( '@stdlib/random-base-randu' );
var isnan = require( '@stdlib/math-base-assert-is-nan' );
var ceil = require( '@stdlib/math-base-special-ceil' );
var pkg = require( './../package.json' ).name;
var t = require( './../lib' );


// MAIN //

bench( pkg, function benchmark( b ) {
	var v;
	var z;
	var i;

	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		v = ceil( randu()*100.0 ) + 1.0;
		z = t( v );
		if ( isnan( z ) ) {
			b.fail( 'should not return NaN' );
		}
	}
	b.toc();
	if ( isnan( z ) ) {
		b.fail( 'should not return NaN' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

bench( pkg+'::factory', function benchmark( b ) {
	var rand;
	var v;
	var z;
	var i;

	v = 10.0;
	rand = t.factory( v );

	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		z = rand();
		if ( isnan( z ) ) {
			b.fail( 'should not return NaN' );
		}
	}
	b.toc();
	if ( isnan( z ) ) {
		b.fail( 'should not return NaN' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

bench( pkg+'::factory,arguments', function benchmark( b ) {
	var rand;
	var v;
	var z;
	var i;

	v = 10.0;
	rand = t.factory();

	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		z = rand( v );
		if ( isnan( z ) ) {
			b.fail( 'should not return NaN' );
		}
	}
	b.toc();
	if ( isnan( z ) ) {
		b.fail( 'should not return NaN' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});
