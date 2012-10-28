'use strict';

var jsonToHtmlConverter = require( './jsonToHtmlConverter' );

exports.sendResponse = sendResponse;
exports.createLink = createLink;
exports.uriFromHere = uriFromHere;
exports.selfLink = selfLink;
exports.init = init;

var _app;

function init( app ) {
   _app = app;
}


function sendResponse( req, res, json ) {
   if( req.accepts( 'text/html' ) ) {

      // TODO: move this to a template file?
      var response = '<!DOCTYPE html>\n' +
                     '<html><head><meta charset="utf-8">' +
                     '<style>' +
                     'li { padding: 2px;  border: 1px solid rgba(99, 99, 99, 0.46); }' +
                     'dl { margin: 0px; }' +
                     'dt { font-weight: bold }' +
                     'dt:after { content: ":"}' +
                     'dd { margin-left: 20px }' +
                     '</style>' +
                     '</head><body>' +
                     jsonToHtmlConverter.convert( json ) +
                     '</body>' +
                     '</html>';

      res.send( response );
      return;
   }

   res.json( json );
}


function createLink( uri, rel, optionalDescription ) {
   return {
      uri: uri,
      rel: rel,
      desc: optionalDescription || ""
   };
}


function uriFromHere( req, path ) {
   var uri = req.protocol + '://' + req.host + ':' + _app.get( 'port' ) + req.path;
   if( !uri.match( /\/$/ ) ) {
      uri += '/';
   }
   uri += path;
   return uri;
}


function selfLink( req, end, rel ) {
   return {
      rel: rel,
      uri: uriFromHere( req, end )
   };
}