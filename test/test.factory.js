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

var tape = require( 'tape' );
var ENV = require( '@stdlib/process-env' );
var kstest = require( '@stdlib/stats-kstest' );
var now = require( '@stdlib/time-now' );
var isnan = require( '@stdlib/math-base-assert-is-nan' );
var isUint32Array = require( '@stdlib/assert-is-uint32array' );
var UINT32_MAX = require( '@stdlib/constants-uint32-max' );
var Uint32Array = require( '@stdlib/array-uint32' );
var typedarray2json = require( '@stdlib/array-to-json' );
var minstd = require( '@stdlib/random-base-minstd' );
var factory = require( './../lib/factory.js' );


// VARIABLES //

var opts = {
	'skip': ( ENV.TEST_MODE === 'coverage' )
};


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if provided a degrees of freedom parameter which is not a positive number (no options)', function test( t ) {
	var values;
	var i;

	values = [
		-2.0,
		0.0,
		'5',
		null,
		true,
		false,
		void 0,
		NaN,
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			factory( value );
		};
	}
});

tape( 'the function throws an error if provided a degrees of freedom parameter which is not a positive number (options)', function test( t ) {
	var values;
	var i;

	values = [
		-2.0,
		0.0,
		NaN,
		'5',
		null,
		true,
		false,
		void 0,
		[],
		{},
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			factory( value, {} );
		};
	}
});

tape( 'the function throws an error if provided an options argument which is not object (no other arguments)', function test( t ) {
	var values;
	var i;

	values = [
		'abc',
		null,
		true,
		false,
		void 0,
		NaN,
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			factory( value );
		};
	}
});

tape( 'the function throws an error if provided an options argument which is not an object (other arguments)', function test( t ) {
	var values;
	var i;

	values = [
		'abc',
		5,
		null,
		true,
		false,
		void 0,
		NaN,
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			factory( 10.0, value );
		};
	}
});

tape( 'if provided a `prng` option which is not a function, the function throws an error', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		3.14,
		NaN,
		true,
		false,
		null,
		void 0,
		[],
		{}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			factory({
				'prng': value
			});
		};
	}
});

tape( 'if provided a `prng` option which is not a function, the function throws an error (other arguments)', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		3.14,
		NaN,
		true,
		false,
		null,
		void 0,
		[],
		{}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			factory( 10.0, {
				'prng': value
			});
		};
	}
});

tape( 'if provided a `copy` option which is not a boolean, the function throws an error', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		void 0,
		{},
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			factory({
				'copy': value
			});
		};
	}
});

tape( 'if provided a `copy` option which is not a boolean, the function throws an error (other arguments)', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		void 0,
		{},
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			factory( 10.0, {
				'copy': value
			});
		};
	}
});

tape( 'if provided a `seed` which is not a positive integer or a non-empty array-like object, the function throws an error', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		3.14,
		0.0,
		-5.0,
		NaN,
		true,
		false,
		null,
		void 0,
		{},
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			factory({
				'seed': value
			});
		};
	}
});

tape( 'if provided a `seed` which is not a positive integer or a non-empty array-like object, the function throws an error (other arguments)', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		3.14,
		0.0,
		-5.0,
		NaN,
		true,
		false,
		null,
		void 0,
		{},
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			factory( 10.0, {
				'seed': value
			});
		};
	}
});

tape( 'the function throws a range error if provided a `seed` which is an integer greater than the maximum unsigned 32-bit integer', function test( t ) {
	var values;
	var i;

	values = [
		UINT32_MAX + 1,
		UINT32_MAX + 2,
		UINT32_MAX + 3
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), RangeError, 'throws a range error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			factory({
				'seed': value
			});
		};
	}
});

tape( 'the function throws a range error if provided a `seed` which is an integer greater than the maximum unsigned 32-bit integer (other arguments)', function test( t ) {
	var values;
	var i;

	values = [
		UINT32_MAX + 1,
		UINT32_MAX + 2,
		UINT32_MAX + 3
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), RangeError, 'throws a range error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			factory( 10.0, {
				'seed': value
			});
		};
	}
});

tape( 'if provided a `state` option which is not a Uint32Array, the function throws an error', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		true,
		false,
		null,
		void 0,
		{},
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			factory({
				'state': value
			});
		};
	}
});

tape( 'if provided a `state` option which is not a Uint32Array, the function throws an error (other arguments)', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		true,
		false,
		null,
		void 0,
		{},
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			factory( 10.0, {
				'state': value
			});
		};
	}
});

tape( 'if provided an invalid `state` option, the function throws an error', function test( t ) {
	var values;
	var i;

	values = [
		new Uint32Array( 0 ),
		new Uint32Array( 10 ),
		new Uint32Array( 100 )
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), RangeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			factory({
				'state': value
			});
		};
	}
});

tape( 'if provided an invalid `state` option, the function throws an error (other arguments)', function test( t ) {
	var values;
	var i;

	values = [
		new Uint32Array( 0 ),
		new Uint32Array( 10 ),
		new Uint32Array( 100 )
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), RangeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			factory( 10.0, {
				'state': value
			});
		};
	}
});

tape( 'the function returns a pseudorandom number generator (no seed)', function test( t ) {
	var rt;
	var r;
	var i;

	// When binding distribution parameter...
	rt = factory( 2.0 );
	for ( i = 0; i < 100; i++ ) {
		r = rt();
		t.equal( typeof r, 'number', 'returns a number' );
	}

	// Without binding distribution parameter...
	rt = factory();
	for ( i = 0; i < 100; i++ ) {
		r = rt( 100.0 );
		t.equal( typeof r, 'number', 'returns a number' );
	}

	t.end();
});

tape( 'the function returns a seeded pseudorandom number generator (integer seed)', function test( t ) {
	var seed;
	var rt1;
	var rt2;
	var r1;
	var r2;
	var i;

	seed = now();

	rt1 = factory( 35.0, {
		'seed': seed
	});
	rt2 = factory( 35.0, {
		'seed': seed
	});

	t.notEqual( rt1, rt2, 'separate generators' );

	for ( i = 0; i < 100; i++ ) {
		r1 = rt1();
		r2 = rt2();
		t.equal( r1, r2, 'both return same number' );
	}
	t.end();
});

tape( 'the function returns a seeded pseudorandom number generator (array seed)', function test( t ) {
	var seed;
	var rt1;
	var rt2;
	var r1;
	var r2;
	var i;

	seed = [ now()+1, now()+2, now()+3 ];

	rt1 = factory( 35.0, {
		'seed': seed
	});
	rt2 = factory( 35.0, {
		'seed': seed
	});

	t.notEqual( rt1, rt2, 'separate generators' );

	for ( i = 0; i < 100; i++ ) {
		r1 = rt1();
		r2 = rt2();
		t.equal( r1, r2, 'both return same number' );
	}
	t.end();
});

tape( 'attached to the returned function is the generator name', function test( t ) {
	var rt = factory();
	t.equal( rt.NAME, 't', 'has property' );
	t.end();
});

tape( 'attached to the returned function is the underlying PRNG', function test( t ) {
	var rt = factory();
	t.equal( typeof rt.PRNG, 'function', 'has property' );

	rt = factory({
		'prng': minstd.normalized
	});
	t.equal( rt.PRNG, minstd.normalized, 'has property' );
	t.end();
});

tape( 'attached to the returned function is the generator seed (integer seed)', function test( t ) {
	var rt = factory({
		'seed': 12345
	});
	t.equal( isUint32Array( rt.seed ), true, 'has property' );
	t.equal( rt.seed[ 0 ], 12345, 'equal to provided seed' );

	rt = factory({
		'seed': 12345,
		'prng': minstd.normalized
	});
	t.equal( rt.seed, null, 'equal to `null`' );
	t.end();
});

tape( 'attached to the returned function is the generator seed (array seed)', function test( t ) {
	var actual;
	var rand;
	var seed;
	var i;

	seed = [ now(), now()+1, now()+2, now()+3 ];
	rand = factory({
		'seed': seed
	});

	actual = rand.seed;
	t.equal( isUint32Array( actual ), true, 'has property' );
	for ( i = 0; i < seed.length; i++ ) {
		t.equal( actual[ i ], seed[ i ], 'returns expected value for word '+i );
	}
	t.end();
});

tape( 'attached to the returned function is the generator seed length', function test( t ) {
	var rt = factory();
	t.equal( typeof rt.seedLength, 'number', 'has property' );

	rt = factory({
		'prng': minstd.normalized
	});
	t.equal( rt.seedLength, null, 'equal to `null`' );
	t.end();
});

tape( 'attached to the return function is the generator state', function test( t ) {
	var rt = factory();
	t.equal( isUint32Array( rt.state ), true, 'has property' );

	rt = factory({
		'prng': minstd.normalized
	});
	t.equal( rt.state, null, 'equal to `null`' );
	t.end();
});

tape( 'attached to the returned function is the generator state length', function test( t ) {
	var rt = factory();
	t.equal( typeof rt.stateLength, 'number', 'has property' );

	rt = factory({
		'prng': minstd.normalized
	});
	t.equal( rt.stateLength, null, 'equal to `null`' );
	t.end();
});

tape( 'attached to the returned function is the generator state size', function test( t ) {
	var rt = factory();
	t.equal( typeof rt.byteLength, 'number', 'has property' );

	rt = factory({
		'prng': minstd.normalized
	});
	t.equal( rt.byteLength, null, 'equal to `null`' );
	t.end();
});

tape( 'attached to the returned function is a method to serialize the generator as a JSON object', function test( t ) {
	var rt;
	var o;

	rt = factory();
	t.equal( typeof rt.toJSON, 'function', 'has method' );

	o = rt.toJSON();
	t.equal( o.type, 'PRNG', 'has property' );
	t.equal( o.name, rt.NAME, 'has property' );
	t.deepEqual( o.state, typedarray2json( rt.state ), 'has property' );
	t.deepEqual( o.params, [], 'has property' );

	rt = factory( 9.0 );
	o = rt.toJSON();

	t.deepEqual( o.params, [ 9.0 ], 'has property' );

	rt = factory({
		'prng': minstd.normalized
	});
	t.equal( typeof rt.toJSON, 'function', 'has method' );
	t.equal( rt.toJSON(), null, 'returns expected value' );

	t.end();
});

tape( 'when called without arguments, the function returns a PRNG that returns `NaN` when provided a degrees of freedom parameter equal to `NaN`', function test( t ) {
	var rt;
	var r;

	rt = factory();
	r = rt( NaN );

	t.strictEqual( isnan( r ), true, 'returns NaN' );
	t.end();
});

tape( 'when called without arguments, the function returns a PRNG that returns `NaN` when provided a degrees of freedom parameter which is not a positive number', function test( t ) {
	var rt;
	var r;

	rt = factory();

	r = rt( 0 );
	t.strictEqual( isnan( r ), true, 'returns NaN' );

	r = rt( -1 );
	t.strictEqual( isnan( r ), true, 'returns NaN' );

	r = rt( -3.14 );
	t.strictEqual( isnan( r ), true, 'returns NaN' );

	t.end();
});

tape( 'if the `state` property is set to a value other than a Uint32Array, an error is thrown', function test( t ) {
	var values;
	var rt;
	var i;

	rt = factory();

	values = [
		'3',
		3,
		NaN,
		true,
		false,
		null,
		void 0,
		[],
		{},
		function noop() {}
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when set to '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			rt.state = value;
		};
	}
});

tape( 'if the `state` property is set to an Uint32Array having an unexpected length, an error is thrown', function test( t ) {
	var values;
	var rt;
	var i;

	rt = factory();

	values = [
		new Uint32Array( 0 ),
		new Uint32Array( 10 ),
		new Uint32Array( 1000 )
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), RangeError, 'throws an error when set to '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			rt.state = value;
		};
	}
});

tape( 'the function supports specifying the underlying PRNG', function test( t ) {
	var rt;
	var r;
	var i;

	rt = factory( 9.0, {
		'prng': minstd.normalized
	});

	for ( i = 0; i < 1e2; i++ ) {
		r = rt();
		t.equal( typeof r, 'number', 'returns a number' );
	}
	t.end();
});

tape( 'the function supports specifying the underlying PRNG (parameters)', function test( t ) {
	var rt;
	var r;
	var i;

	rt = factory({
		'prng': minstd.normalized
	});

	for ( i = 0; i < 1e2; i++ ) {
		r = rt( 9.0 );
		t.equal( typeof r, 'number', 'returns a number' );
	}
	t.end();
});

tape( 'the function supports providing a seeded underlying PRNG', function test( t ) {
	var randu;
	var seed;
	var rt1;
	var rt2;
	var r1;
	var r2;
	var i;

	seed = now();

	randu = minstd.factory({
		'seed': seed
	});
	rt1 = factory( 9.0, {
		'prng': randu.normalized
	});

	randu = minstd.factory({
		'seed': seed
	});
	rt2 = factory( 9.0, {
		'prng': randu.normalized
	});

	t.notEqual( rt1, rt2, 'separate generators' );

	for ( i = 0; i < 1e2; i++ ) {
		r1 = rt1();
		r2 = rt2();
		t.equal( r1, r2, 'both return same number' );
	}
	t.end();
});

tape( 'the function supports providing a seeded underlying PRNG (parameters)', function test( t ) {
	var randu;
	var seed;
	var rt1;
	var rt2;
	var r1;
	var r2;
	var i;

	seed = now();

	randu = minstd.factory({
		'seed': seed
	});
	rt1 = factory({
		'prng': randu.normalized
	});

	randu = minstd.factory({
		'seed': seed
	});
	rt2 = factory({
		'prng': randu.normalized
	});

	t.notEqual( rt1, rt2, 'separate generators' );

	for ( i = 0; i < 1e2; i++ ) {
		r1 = rt1( 9.0 );
		r2 = rt2( 9.0 );
		t.equal( r1, r2, 'both return same number' );
	}
	t.end();
});

tape( 'the function returns a PRNG for generating random numbers from a Student\'s t-distribution', opts, function test( t ) {
	var threshold;
	var count;
	var npass;
	var N;
	var v;
	var x;

	threshold = 0.10;

	v = 9.0;

	x = new Array( 1e3 );
	N = 300;

	count = -1;
	npass = 0;

	gof();

	function gof() {
		var rejected;
		var pValue;
		var bool;
		var rt;
		var i;
		var j;

		count += 1;
		rejected = 0;
		for ( i = 0; i < N; i++ ) {
			rt = factory( v );
			t.ok( true, 'seed: '+rt.seed );
			for ( j = 0; j < x.length; j++ ) {
				x[ j ] = rt();
			}
			// Test using Kolmogorov-Smirnov goodness-of-fit test:
			pValue = kstest( x, 't', v ).pValue;
			t.equal( typeof pValue, 'number', 'returns a p-value: '+pValue );
			if ( pValue < 0.05 ) {
				rejected += 1;
			}
		}
		// Account for small sample size and few repeats...
		bool = ( rejected / N < threshold );

		// If we succeed the first time, we are done...
		if ( count === 0 && bool ) {
			return done( bool, rejected );
		}
		// Retry mode...
		if ( bool ) {
			npass += 1;
		}
		// Retry twice...
		if ( count < 2 ) {
			return gof();
		}
		// Both retries must succeed for test to pass:
		bool = ( npass >= 2 );
		return done( bool, rejected );
	}

	function done( bool, rejected ) {
		t.ok( bool, 'null hypothesis (i.e., that numbers are drawn from T('+v+') is rejected in less than '+(threshold*100)+'% of cases ('+rejected+' of '+N+'). Repeats: '+npass+' of '+count+'.' );
		t.end();
	}
});

tape( 'the function supports specifying the generator state', function test( t ) {
	var state;
	var arr;
	var rt;
	var i;

	rt = factory( 10.0 );

	// Move to a future state...
	for ( i = 0; i < 100; i++ ) {
		rt();
	}
	// Capture the current state:
	state = rt.state;

	// Move to a future state...
	arr = [];
	for ( i = 0; i < 100; i++ ) {
		arr.push( rt() );
	}

	// Create another PRNG using the captured state:
	rt = factory( 10.0, {
		'state': state
	});

	// Replay previously generated values...
	for ( i = 0; i < 100; i++ ) {
		t.equal( rt(), arr[ i ], 'returns expected value. i: '+i+'.' );
	}
	t.end();
});

tape( 'the function supports specifying a shared generator state', function test( t ) {
	var shared;
	var state;
	var rand1;
	var rand2;
	var arr;
	var rt;
	var v1;
	var v2;
	var i;
	var j;

	rt = factory( 10.0 );

	// Move to a future state...
	for ( i = 0; i < 100; i++ ) {
		rt();
	}
	// Capture the current state:
	state = rt.state;

	// Move to a future state...
	arr = [];
	for ( i = 0; i < 100; i++ ) {
		arr.push( rt() );
	}

	// Create a copy of the state (to prevent mutation) which will be shared by more than one PRNG:
	shared = new Uint32Array( state );

	// Create PRNGs using the captured state:
	rand1 = factory({
		'state': shared,
		'copy': false
	});
	rand2 = factory({
		'state': shared,
		'copy': false
	});

	// Replay previously generated values...
	j = 0;
	for ( i = 0; i < 25; i++ ) {
		v1 = rand1( 10.0 );
		v2 = rand2( 10.0 );
		t.equal( v1, arr[ j ], 'returns expected value. i: '+j+'.' );
		t.equal( v2, arr[ j+1 ], 'returns expected value. i: '+(j+1)+'.' );
		j += 2; // stride
	}

	// Move to a future state...
	for ( i = 0; i < 100; i++ ) {
		v2 = rand2( 10.0 );
	}

	// Reset the (shared) state:
	rand1.state = state;

	// Replay previously generated values...
	j = 0;
	for ( i = 0; i < 25; i++ ) {
		v1 = rand1( 10.0 );
		v2 = rand2( 10.0 );
		t.equal( v1, arr[ j ], 'returns expected value. i: '+j+'.' );
		t.equal( v2, arr[ j+1 ], 'returns expected value. i: '+(j+1)+'.' );
		j += 2; // stride
	}
	t.end();
});

tape( 'the function supports specifying a shared generator state (other arguments)', function test( t ) {
	var shared;
	var state;
	var rand1;
	var rand2;
	var arr;
	var rt;
	var v1;
	var v2;
	var i;
	var j;

	rt = factory( 10.0 );

	// Move to a future state...
	for ( i = 0; i < 100; i++ ) {
		rt();
	}
	// Capture the current state:
	state = rt.state;

	// Move to a future state...
	arr = [];
	for ( i = 0; i < 100; i++ ) {
		arr.push( rt() );
	}

	// Create a copy of the state (to prevent mutation) which will be shared by more than one PRNG:
	shared = new Uint32Array( state );

	// Create PRNGs using the captured state:
	rand1 = factory( 10.0, {
		'state': shared,
		'copy': false
	});
	rand2 = factory( 10.0, {
		'state': shared,
		'copy': false
	});

	// Replay previously generated values...
	j = 0;
	for ( i = 0; i < 25; i++ ) {
		v1 = rand1();
		v2 = rand2();
		t.equal( v1, arr[ j ], 'returns expected value. i: '+j+'.' );
		t.equal( v2, arr[ j+1 ], 'returns expected value. i: '+(j+1)+'.' );
		j += 2; // stride
	}

	// Move to a future state...
	for ( i = 0; i < 100; i++ ) {
		v2 = rand2();
	}

	// Reset the (shared) state:
	rand1.state = state;

	// Replay previously generated values...
	j = 0;
	for ( i = 0; i < 25; i++ ) {
		v1 = rand1();
		v2 = rand2();
		t.equal( v1, arr[ j ], 'returns expected value. i: '+j+'.' );
		t.equal( v2, arr[ j+1 ], 'returns expected value. i: '+(j+1)+'.' );
		j += 2; // stride
	}
	t.end();
});

tape( 'the returned function supports setting the generator state', function test( t ) {
	var state;
	var arr;
	var rt;
	var i;

	rt = factory( 10.0 );

	// Move to a future state...
	for ( i = 0; i < 100; i++ ) {
		rt();
	}
	// Capture the current state:
	state = rt.state;

	// Move to a future state...
	arr = [];
	for ( i = 0; i < 100; i++ ) {
		arr.push( rt() );
	}
	// Set the state:
	rt.state = state;

	// Replay previously generated values...
	for ( i = 0; i < 100; i++ ) {
		t.equal( rt(), arr[ i ], 'returns expected value. i: '+i+'.' );
	}
	t.end();
});
