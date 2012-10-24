(function( exports ) {
   'use strict';

   var _ = require( 'underscore' );

   function convert( json ) {
      if( _.isArray( json ) ) {
         return convertArray( json );
      }
      else if( _.isObject( json ) ) {
         return convertObject( json );
      }
      else if( _.isString( json ) ) {
         return convertString( json );
      }
      else {
         return '' + json;
      }
   }


   function convertArray( arr ) {
      return '<ol>' + _.reduce( arr, function( memo, val, key ) {
         return memo += '<li>' + convert( val ) + '</li>';
      }, '' ) + '</ol>';
   }


   function convertObject( obj ) {
      return '<dl>' + _.reduce( obj, function( memo, val, key ) {
         return memo += '<dt>' + convert( key ) + '</dt><dd>' + convert( val ) + '</dd>';
      }, '' ) + '</dl>';
   }


   var LINK_MATCHER = /^[a-zA-Z]+:\/\//;
   function convertString( str ) {
      if( str.match( LINK_MATCHER ) ) {
         return '<a href="' + str + '">' + str + '</a>';
      }

      return simpleEscapeHtml( str );
   }


   function simpleEscapeHtml( text ) {
      return text.replace( /[&<>"'`]/g, function( chr ) {
         return '&#' + chr.charCodeAt( 0 ) + ';';
      } );
   }


   exports.convert = convert;

})( exports );