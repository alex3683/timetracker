describe( 'store', function() {
   'use strict';

   var store;

   beforeEach( function() {
      store = require( '../../lib/store' );
      jasmine.Clock.useMock();
   } );

   afterEach( function() {
      store = null;
   } );

   it( 'has an init method', function() {
      expect( typeof store.init ).toBe( 'function' );
   } );

   describe( 'init', function() {

      it( 'throws an exception if not all arguments are provided', function() {
         expect( store.init ).toThrow();
      } );

      it( 'returns a promise', function() {
         var promise = store.init( '/dev/null', { info: function() {} } );
         expect( typeof promise.then ).toBe( 'function' );
      } );

      it( 'calls resolve with the database accessor object', function() {
         var promise = store.init( '/dev/null', { info: function() {} } );
         var mySpy = jasmine.createSpy();

         promise.then( mySpy );

         waitsFor( function() {
            return mySpy.callCount;
         }, 'promise never was resolved', 100 );

         runs( function() {
            var accessor = mySpy.calls[0].args[0];
            expect( accessor ).toBeDefined();
            expect( accessor.users ).toBeDefined();
            expect( accessor.tasks ).toBeDefined();
            expect( accessor.nStore ).toBeDefined();
         } );
      } );

   } );

} );