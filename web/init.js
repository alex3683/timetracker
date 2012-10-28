( function( require ) {
   'use strict';

   require.config( {
      paths: {
         angular: 'components/angular/angular'
      },
      shim: {
         angular: {
            deps: [ 'components/jquery/jquery' ],
            exports: 'angular'
         },
         'vendor/angular-bootstrap/modal':  [ 'angular' ]
      }
   } );



   require( [ 'angular',
              'app/timetracker',
              'vendor/angular-bootstrap/modal'
   ], function( angular ) {

      angular.element( document ).ready( function() {
         angular.bootstrap( document, [ 'timetracker', 'ui.bootstrap.modal' ] );
      } );

   } );

})( require );
