describe( 'store', function() {
   'use strict';

   var store;

   beforeEach( function() {
      store = require( '../../lib/store' );
   } );

   afterEach( function() {
      store = null;
   } );

   it( 'has an init method', function() {
      expect( store.init ).toBeDefined();
   } );

   describe( 'init', function() {

      it( 'throws an exception if not all arguments are provided', function() {
         expect( store.init ).toThrow();
      } );

      it( 'returns a promise', function() {
         var promise = store.init( '/dev/null', { info: function() {
         } } );
         expect( promise.then ).toBeDefined();
      } );

      it( 'calls resolve with the database accessor object', function() {
         var promise = store.init( '/dev/null', { info: function() {
         } } );
         var accessor = null;
         var thenCalled = false;
         promise.then( function( db ) {
            thenCalled = true;
            accessor = db;
         } );

         waitsFor( function() {
            return thenCalled;
         }, 'promise never was resolved', 100 );

         runs( function() {
            expect( accessor ).toBeDefined();
            expect( accessor.users ).toBeDefined();
            expect( accessor.tasks ).toBeDefined();
            expect( accessor.nStore ).toBeDefined();
         } );
      } );

   } );

} );