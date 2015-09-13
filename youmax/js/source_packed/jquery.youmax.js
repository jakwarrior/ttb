//Youmax 9.0 - http://codecanyon.net/item/youmax-youtube-channel-on-your-website/9989505

/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */


/*!
 * EventEmitter v4.2.6 - git.io/ee
 * Oliver Caldwell
 * MIT license
 * @preserve
 */

(function () {
	

	/**
	 * Class for managing events.
	 * Can be extended to provide event functionality in other classes.
	 *
	 * @class EventEmitter Manages event registering and emitting.
	 */
	function EventEmitter() {}

	// Shortcuts to improve speed and size
	var proto = EventEmitter.prototype;
	var exports = this;
	var originalGlobalValue = exports.EventEmitter;

	/**
	 * Finds the index of the listener for the event in it's storage array.
	 *
	 * @param {Function[]} listeners Array of listeners to search through.
	 * @param {Function} listener Method to look for.
	 * @return {Number} Index of the specified listener, -1 if not found
	 * @api private
	 */
	function indexOfListener(listeners, listener) {
		var i = listeners.length;
		while (i--) {
			if (listeners[i].listener === listener) {
				return i;
			}
		}

		return -1;
	}

	/**
	 * Alias a method while keeping the context correct, to allow for overwriting of target method.
	 *
	 * @param {String} name The name of the target method.
	 * @return {Function} The aliased method
	 * @api private
	 */
	function alias(name) {
		return function aliasClosure() {
			return this[name].apply(this, arguments);
		};
	}

	/**
	 * Returns the listener array for the specified event.
	 * Will initialise the event object and listener arrays if required.
	 * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
	 * Each property in the object response is an array of listener functions.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Function[]|Object} All listener functions for the event.
	 */
	proto.getListeners = function getListeners(evt) {
		var events = this._getEvents();
		var response;
		var key;

		// Return a concatenated array of all matching events if
		// the selector is a regular expression.
		if (typeof evt === 'object') {
			response = {};
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					response[key] = events[key];
				}
			}
		}
		else {
			response = events[evt] || (events[evt] = []);
		}

		return response;
	};

	/**
	 * Takes a list of listener objects and flattens it into a list of listener functions.
	 *
	 * @param {Object[]} listeners Raw listener objects.
	 * @return {Function[]} Just the listener functions.
	 */
	proto.flattenListeners = function flattenListeners(listeners) {
		var flatListeners = [];
		var i;

		for (i = 0; i < listeners.length; i += 1) {
			flatListeners.push(listeners[i].listener);
		}

		return flatListeners;
	};

	/**
	 * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Object} All listener functions for an event in an object.
	 */
	proto.getListenersAsObject = function getListenersAsObject(evt) {
		var listeners = this.getListeners(evt);
		var response;

		if (listeners instanceof Array) {
			response = {};
			response[evt] = listeners;
		}

		return response || listeners;
	};

	/**
	 * Adds a listener function to the specified event.
	 * The listener will not be added if it is a duplicate.
	 * If the listener returns true then it will be removed after it is called.
	 * If you pass a regular expression as the event name then the listener will be added to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListener = function addListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var listenerIsWrapped = typeof listener === 'object';
		var key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
				listeners[key].push(listenerIsWrapped ? listener : {
					listener: listener,
					once: false
				});
			}
		}

		return this;
	};

	/**
	 * Alias of addListener
	 */
	proto.on = alias('addListener');

	/**
	 * Semi-alias of addListener. It will add a listener that will be
	 * automatically removed after it's first execution.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addOnceListener = function addOnceListener(evt, listener) {
		return this.addListener(evt, {
			listener: listener,
			once: true
		});
	};

	/**
	 * Alias of addOnceListener.
	 */
	proto.once = alias('addOnceListener');

	/**
	 * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
	 * You need to tell it what event names should be matched by a regex.
	 *
	 * @param {String} evt Name of the event to create.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvent = function defineEvent(evt) {
		this.getListeners(evt);
		return this;
	};

	/**
	 * Uses defineEvent to define multiple events.
	 *
	 * @param {String[]} evts An array of event names to define.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvents = function defineEvents(evts) {
		for (var i = 0; i < evts.length; i += 1) {
			this.defineEvent(evts[i]);
		}
		return this;
	};

	/**
	 * Removes a listener function from the specified event.
	 * When passed a regular expression as the event name, it will remove the listener from all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to remove the listener from.
	 * @param {Function} listener Method to remove from the event.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListener = function removeListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var index;
		var key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				index = indexOfListener(listeners[key], listener);

				if (index !== -1) {
					listeners[key].splice(index, 1);
				}
			}
		}

		return this;
	};

	/**
	 * Alias of removeListener
	 */
	proto.off = alias('removeListener');

	/**
	 * Adds listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
	 * You can also pass it a regular expression to add the array of listeners to all events that match it.
	 * Yeah, this function does quite a bit. That's probably a bad thing.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListeners = function addListeners(evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(false, evt, listeners);
	};

	/**
	 * Removes listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be removed.
	 * You can also pass it a regular expression to remove the listeners from all events that match it.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListeners = function removeListeners(evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(true, evt, listeners);
	};

	/**
	 * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
	 * The first argument will determine if the listeners are removed (true) or added (false).
	 * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be added/removed.
	 * You can also pass it a regular expression to manipulate the listeners of all events that match it.
	 *
	 * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
		var i;
		var value;
		var single = remove ? this.removeListener : this.addListener;
		var multiple = remove ? this.removeListeners : this.addListeners;

		// If evt is an object then pass each of it's properties to this method
		if (typeof evt === 'object' && !(evt instanceof RegExp)) {
			for (i in evt) {
				if (evt.hasOwnProperty(i) && (value = evt[i])) {
					// Pass the single listener straight through to the singular method
					if (typeof value === 'function') {
						single.call(this, i, value);
					}
					else {
						// Otherwise pass back to the multiple function
						multiple.call(this, i, value);
					}
				}
			}
		}
		else {
			// So evt must be a string
			// And listeners must be an array of listeners
			// Loop over it and pass each one to the multiple method
			i = listeners.length;
			while (i--) {
				single.call(this, evt, listeners[i]);
			}
		}

		return this;
	};

	/**
	 * Removes all listeners from a specified event.
	 * If you do not specify an event then all listeners will be removed.
	 * That means every event will be emptied.
	 * You can also pass a regex to remove all events that match it.
	 *
	 * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeEvent = function removeEvent(evt) {
		var type = typeof evt;
		var events = this._getEvents();
		var key;

		// Remove different things depending on the state of evt
		if (type === 'string') {
			// Remove all listeners for the specified event
			delete events[evt];
		}
		else if (type === 'object') {
			// Remove all events matching the regex.
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					delete events[key];
				}
			}
		}
		else {
			// Remove all listeners in all events
			delete this._events;
		}

		return this;
	};

	/**
	 * Alias of removeEvent.
	 *
	 * Added to mirror the node API.
	 */
	proto.removeAllListeners = alias('removeEvent');

	/**
	 * Emits an event of your choice.
	 * When emitted, every listener attached to that event will be executed.
	 * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
	 * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
	 * So they will not arrive within the array on the other side, they will be separate.
	 * You can also pass a regular expression to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {Array} [args] Optional array of arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emitEvent = function emitEvent(evt, args) {
		var listeners = this.getListenersAsObject(evt);
		var listener;
		var i;
		var key;
		var response;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				i = listeners[key].length;

				while (i--) {
					// If the listener returns true then it shall be removed from the event
					// The function is executed either with a basic call or an apply if there is an args array
					listener = listeners[key][i];

					if (listener.once === true) {
						this.removeListener(evt, listener.listener);
					}

					response = listener.listener.apply(this, args || []);

					if (response === this._getOnceReturnValue()) {
						this.removeListener(evt, listener.listener);
					}
				}
			}
		}

		return this;
	};

	/**
	 * Alias of emitEvent
	 */
	proto.trigger = alias('emitEvent');

	/**
	 * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
	 * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {...*} Optional additional arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emit = function emit(evt) {
		var args = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(evt, args);
	};

	/**
	 * Sets the current value to check against when executing listeners. If a
	 * listeners return value matches the one set here then it will be removed
	 * after execution. This value defaults to true.
	 *
	 * @param {*} value The new value to check for when executing listeners.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.setOnceReturnValue = function setOnceReturnValue(value) {
		this._onceReturnValue = value;
		return this;
	};

	/**
	 * Fetches the current value to check against when executing listeners. If
	 * the listeners return value matches this one then it should be removed
	 * automatically. It will return true by default.
	 *
	 * @return {*|Boolean} The current value to check for or the default, true.
	 * @api private
	 */
	proto._getOnceReturnValue = function _getOnceReturnValue() {
		if (this.hasOwnProperty('_onceReturnValue')) {
			return this._onceReturnValue;
		}
		else {
			return true;
		}
	};

	/**
	 * Fetches the events object and creates one if required.
	 *
	 * @return {Object} The events storage object.
	 * @api private
	 */
	proto._getEvents = function _getEvents() {
		return this._events || (this._events = {});
	};

	/**
	 * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
	 *
	 * @return {Function} Non conflicting EventEmitter class.
	 */
	EventEmitter.noConflict = function noConflict() {
		exports.EventEmitter = originalGlobalValue;
		return EventEmitter;
	};

	// Expose the class either via AMD, CommonJS or the global object
	if (typeof define === 'function' && define.amd) {
		define('eventEmitter/EventEmitter',[],function () {
			return EventEmitter;
		});
	}
	else if (typeof module === 'object' && module.exports){
		module.exports = EventEmitter;
	}
	else {
		this.EventEmitter = EventEmitter;
	}
}.call(this));

/*!
 * eventie v1.0.4
 * event binding helper
 *   eventie.bind( elem, 'click', myFn )
 *   eventie.unbind( elem, 'click', myFn )
 */

/*jshint browser: true, undef: true, unused: true */
/*global define: false */

( function( window ) {



var docElem = document.documentElement;

var bind = function() {};

function getIEEvent( obj ) {
  var event = window.event;
  // add event.target
  event.target = event.target || event.srcElement || obj;
  return event;
}

if ( docElem.addEventListener ) {
  bind = function( obj, type, fn ) {
    obj.addEventListener( type, fn, false );
  };
} else if ( docElem.attachEvent ) {
  bind = function( obj, type, fn ) {
    obj[ type + fn ] = fn.handleEvent ?
      function() {
        var event = getIEEvent( obj );
        fn.handleEvent.call( fn, event );
      } :
      function() {
        var event = getIEEvent( obj );
        fn.call( obj, event );
      };
    obj.attachEvent( "on" + type, obj[ type + fn ] );
  };
}

var unbind = function() {};

if ( docElem.removeEventListener ) {
  unbind = function( obj, type, fn ) {
    obj.removeEventListener( type, fn, false );
  };
} else if ( docElem.detachEvent ) {
  unbind = function( obj, type, fn ) {
    obj.detachEvent( "on" + type, obj[ type + fn ] );
    try {
      delete obj[ type + fn ];
    } catch ( err ) {
      // can't delete window object properties
      obj[ type + fn ] = undefined;
    }
  };
}

var eventie = {
  bind: bind,
  unbind: unbind
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'eventie/eventie',eventie );
} else {
  // browser global
  window.eventie = eventie;
}

})( this );

/*!
 * imagesLoaded v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) { 
  // universal module definition

  /*global define: false, module: false, require: false */

  if ( typeof define === 'function' && define.amd ) {
    // AMD
    define( [
      'eventEmitter/EventEmitter',
      'eventie/eventie'
    ], function( EventEmitter, eventie ) {
      return factory( window, EventEmitter, eventie );
    });
  } else if ( typeof exports === 'object' ) {
    // CommonJS
    module.exports = factory(
      window,
      require('wolfy87-eventemitter'),
      require('eventie')
    );
  } else {
    // browser global
    window.imagesLoaded = factory(
      window,
      window.EventEmitter,
      window.eventie
    );
  }

})( window,

// --------------------------  factory -------------------------- //

function factory( window, EventEmitter, eventie ) {



var $ = window.jQuery;
var console = window.console;
var hasConsole = typeof console !== 'undefined';

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

var objToString = Object.prototype.toString;
function isArray( obj ) {
  return objToString.call( obj ) === '[object Array]';
}

// turn element or nodeList into an array
function makeArray( obj ) {
  var ary = [];
  if ( isArray( obj ) ) {
    // use object if already an array
    ary = obj;
  } else if ( typeof obj.length === 'number' ) {
    // convert nodeList to array
    for ( var i=0, len = obj.length; i < len; i++ ) {
      ary.push( obj[i] );
    }
  } else {
    // array of single index
    ary.push( obj );
  }
  return ary;
}

  // -------------------------- imagesLoaded -------------------------- //

  /**
   * @param {Array, Element, NodeList, String} elem
   * @param {Object or Function} options - if function, use as callback
   * @param {Function} onAlways - callback function
   */
  function ImagesLoaded( elem, options, onAlways ) {
    // coerce ImagesLoaded() without new, to be new ImagesLoaded()
    if ( !( this instanceof ImagesLoaded ) ) {
      return new ImagesLoaded( elem, options );
    }
    // use elem as selector string
    if ( typeof elem === 'string' ) {
      elem = document.querySelectorAll( elem );
    }

    this.elements = makeArray( elem );
    this.options = extend( {}, this.options );

    if ( typeof options === 'function' ) {
      onAlways = options;
    } else {
      extend( this.options, options );
    }

    if ( onAlways ) {
      this.on( 'always', onAlways );
    }

    this.getImages();

    if ( $ ) {
      // add jQuery Deferred object
      this.jqDeferred = new $.Deferred();
    }

    // HACK check async to allow time to bind listeners
    var _this = this;
    setTimeout( function() {
      _this.check();
    });
  }

  ImagesLoaded.prototype = new EventEmitter();

  ImagesLoaded.prototype.options = {};

  ImagesLoaded.prototype.getImages = function() {
    this.images = [];

    // filter & find items if we have an item selector
    for ( var i=0, len = this.elements.length; i < len; i++ ) {
      var elem = this.elements[i];
      // filter siblings
      if ( elem.nodeName === 'IMG' ) {
        this.addImage( elem );
      }
      // find children
      // no non-element nodes, #143
      var nodeType = elem.nodeType;
      if ( !nodeType || !( nodeType === 1 || nodeType === 9 || nodeType === 11 ) ) {
        continue;
      }
      var childElems = elem.querySelectorAll('img');
      // concat childElems to filterFound array
      for ( var j=0, jLen = childElems.length; j < jLen; j++ ) {
        var img = childElems[j];
        this.addImage( img );
      }
    }
  };

  /**
   * @param {Image} img
   */
  ImagesLoaded.prototype.addImage = function( img ) {
    var loadingImage = new LoadingImage( img );
    this.images.push( loadingImage );
  };

  ImagesLoaded.prototype.check = function() {
    var _this = this;
    var checkedCount = 0;
    var length = this.images.length;
    this.hasAnyBroken = false;
    // complete if no images
    if ( !length ) {
      this.complete();
      return;
    }

    function onConfirm( image, message ) {
      if ( _this.options.debug && hasConsole ) {
        console.log( 'confirm', image, message );
      }

      _this.progress( image );
      checkedCount++;
      if ( checkedCount === length ) {
        _this.complete();
      }
      return true; // bind once
    }

    for ( var i=0; i < length; i++ ) {
      var loadingImage = this.images[i];
      loadingImage.on( 'confirm', onConfirm );
      loadingImage.check();
    }
  };

  ImagesLoaded.prototype.progress = function( image ) {
    this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
    // HACK - Chrome triggers event before object properties have changed. #83
    var _this = this;
    setTimeout( function() {
      _this.emit( 'progress', _this, image );
      if ( _this.jqDeferred && _this.jqDeferred.notify ) {
        _this.jqDeferred.notify( _this, image );
      }
    });
  };

  ImagesLoaded.prototype.complete = function() {
    var eventName = this.hasAnyBroken ? 'fail' : 'done';
    this.isComplete = true;
    var _this = this;
    // HACK - another setTimeout so that confirm happens after progress
    setTimeout( function() {
      _this.emit( eventName, _this );
      _this.emit( 'always', _this );
      if ( _this.jqDeferred ) {
        var jqMethod = _this.hasAnyBroken ? 'reject' : 'resolve';
        _this.jqDeferred[ jqMethod ]( _this );
      }
    });
  };

  // -------------------------- jquery -------------------------- //

  if ( $ ) {
    $.fn.imagesLoaded = function( options, callback ) {
      var instance = new ImagesLoaded( this, options, callback );
      return instance.jqDeferred.promise( $(this) );
    };
  }


  // --------------------------  -------------------------- //

  function LoadingImage( img ) {
    this.img = img;
  }

  LoadingImage.prototype = new EventEmitter();

  LoadingImage.prototype.check = function() {
    // first check cached any previous images that have same src
    var resource = cache[ this.img.src ] || new Resource( this.img.src );
    if ( resource.isConfirmed ) {
      this.confirm( resource.isLoaded, 'cached was confirmed' );
      return;
    }

    // If complete is true and browser supports natural sizes,
    // try to check for image status manually.
    if ( this.img.complete && this.img.naturalWidth !== undefined ) {
      // report based on naturalWidth
      this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
      return;
    }

    // If none of the checks above matched, simulate loading on detached element.
    var _this = this;
    resource.on( 'confirm', function( resrc, message ) {
      _this.confirm( resrc.isLoaded, message );
      return true;
    });

    resource.check();
  };

  LoadingImage.prototype.confirm = function( isLoaded, message ) {
    this.isLoaded = isLoaded;
    this.emit( 'confirm', this, message );
  };

  // -------------------------- Resource -------------------------- //

  // Resource checks each src, only once
  // separate class from LoadingImage to prevent memory leaks. See #115

  var cache = {};

  function Resource( src ) {
    this.src = src;
    // add to cache
    cache[ src ] = this;
  }

  Resource.prototype = new EventEmitter();

  Resource.prototype.check = function() {
    // only trigger checking once
    if ( this.isChecked ) {
      return;
    }
    // simulate loading on detached element
    var proxyImage = new Image();
    eventie.bind( proxyImage, 'load', this );
    eventie.bind( proxyImage, 'error', this );
    proxyImage.src = this.src;
    // set flag
    this.isChecked = true;
  };

  // ----- events ----- //

  // trigger specified handler for event type
  Resource.prototype.handleEvent = function( event ) {
    var method = 'on' + event.type;
    if ( this[ method ] ) {
      this[ method ]( event );
    }
  };

  Resource.prototype.onload = function( event ) {
    this.confirm( true, 'onload' );
    this.unbindProxyEvents( event );
  };

  Resource.prototype.onerror = function( event ) {
    this.confirm( false, 'onerror' );
    this.unbindProxyEvents( event );
  };

  // ----- confirm ----- //

  Resource.prototype.confirm = function( isLoaded, message ) {
    this.isConfirmed = true;
    this.isLoaded = isLoaded;
    this.emit( 'confirm', this, message );
  };

  Resource.prototype.unbindProxyEvents = function( event ) {
    eventie.unbind( event.target, 'load', this );
    eventie.unbind( event.target, 'error', this );
  };

  // -----  ----- //

  return ImagesLoaded;

});



/*!
 * Masonry PACKAGED v3.3.1
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

/**
 * Bridget makes jQuery widgets
 * v1.1.0
 * MIT license
 */

( function( window ) {



// -------------------------- utils -------------------------- //

var slice = Array.prototype.slice;

function noop() {}

// -------------------------- definition -------------------------- //

function defineBridget( $ ) {

// bail if no jQuery
if ( !$ ) {
  return;
}

// -------------------------- addOptionMethod -------------------------- //

/**
 * adds option method -> $().plugin('option', {...})
 * @param {Function} PluginClass - constructor class
 */
function addOptionMethod( PluginClass ) {
  // don't overwrite original option method
  if ( PluginClass.prototype.option ) {
    return;
  }

  // option setter
  PluginClass.prototype.option = function( opts ) {
    // bail out if not an object
    if ( !$.isPlainObject( opts ) ){
      return;
    }
    this.options = $.extend( true, this.options, opts );
  };
}

// -------------------------- plugin bridge -------------------------- //

// helper function for logging errors
// $.error breaks jQuery chaining
var logError = typeof console === 'undefined' ? noop :
  function( message ) {
    console.error( message );
  };

/**
 * jQuery plugin bridge, access methods like $elem.plugin('method')
 * @param {String} namespace - plugin name
 * @param {Function} PluginClass - constructor class
 */
function bridge( namespace, PluginClass ) {
  // add to jQuery fn namespace
  $.fn[ namespace ] = function( options ) {
    if ( typeof options === 'string' ) {
      // call plugin method when first argument is a string
      // get arguments for method
      var args = slice.call( arguments, 1 );

      for ( var i=0, len = this.length; i < len; i++ ) {
        var elem = this[i];
        var instance = $.data( elem, namespace );
        if ( !instance ) {
          logError( "cannot call methods on " + namespace + " prior to initialization; " +
            "attempted to call '" + options + "'" );
          continue;
        }
        if ( !$.isFunction( instance[options] ) || options.charAt(0) === '_' ) {
          logError( "no such method '" + options + "' for " + namespace + " instance" );
          continue;
        }

        // trigger method with arguments
        var returnValue = instance[ options ].apply( instance, args );

        // break look and return first value if provided
        if ( returnValue !== undefined ) {
          return returnValue;
        }
      }
      // return this if no return value
      return this;
    } else {
      return this.each( function() {
        var instance = $.data( this, namespace );
        if ( instance ) {
          // apply options & init
          instance.option( options );
          instance._init();
        } else {
          // initialize new instance
          instance = new PluginClass( this, options );
          $.data( this, namespace, instance );
        }
      });
    }
  };

}

// -------------------------- bridget -------------------------- //

/**
 * converts a Prototypical class into a proper jQuery plugin
 *   the class must have a ._init method
 * @param {String} namespace - plugin name, used in $().pluginName
 * @param {Function} PluginClass - constructor class
 */
$.bridget = function( namespace, PluginClass ) {
  addOptionMethod( PluginClass );
  bridge( namespace, PluginClass );
};

return $.bridget;

}

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'jquery-bridget/jquery.bridget',[ 'jquery' ], defineBridget );
} else if ( typeof exports === 'object' ) {
  defineBridget( require('jquery') );
} else {
  // get jquery from browser global
  defineBridget( window.jQuery );
}

})( window );

/*!
 * eventie v1.0.6
 * event binding helper
 *   eventie.bind( elem, 'click', myFn )
 *   eventie.unbind( elem, 'click', myFn )
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true */
/*global define: false, module: false */

( function( window ) {



var docElem = document.documentElement;

var bind = function() {};

function getIEEvent( obj ) {
  var event = window.event;
  // add event.target
  event.target = event.target || event.srcElement || obj;
  return event;
}

if ( docElem.addEventListener ) {
  bind = function( obj, type, fn ) {
    obj.addEventListener( type, fn, false );
  };
} else if ( docElem.attachEvent ) {
  bind = function( obj, type, fn ) {
    obj[ type + fn ] = fn.handleEvent ?
      function() {
        var event = getIEEvent( obj );
        fn.handleEvent.call( fn, event );
      } :
      function() {
        var event = getIEEvent( obj );
        fn.call( obj, event );
      };
    obj.attachEvent( "on" + type, obj[ type + fn ] );
  };
}

var unbind = function() {};

if ( docElem.removeEventListener ) {
  unbind = function( obj, type, fn ) {
    obj.removeEventListener( type, fn, false );
  };
} else if ( docElem.detachEvent ) {
  unbind = function( obj, type, fn ) {
    obj.detachEvent( "on" + type, obj[ type + fn ] );
    try {
      delete obj[ type + fn ];
    } catch ( err ) {
      // can't delete window object properties
      obj[ type + fn ] = undefined;
    }
  };
}

var eventie = {
  bind: bind,
  unbind: unbind
};

// ----- module definition ----- //

if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'eventie/eventie',eventie );
} else if ( typeof exports === 'object' ) {
  // CommonJS
  module.exports = eventie;
} else {
  // browser global
  window.eventie = eventie;
}

})( window );

/*!
 * EventEmitter v4.2.11 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - http://oli.me.uk/
 * @preserve
 */

;(function () {
    

    /**
     * Class for managing events.
     * Can be extended to provide event functionality in other classes.
     *
     * @class EventEmitter Manages event registering and emitting.
     */
    function EventEmitter() {}

    // Shortcuts to improve speed and size
    var proto = EventEmitter.prototype;
    var exports = this;
    var originalGlobalValue = exports.EventEmitter;

    /**
     * Finds the index of the listener for the event in its storage array.
     *
     * @param {Function[]} listeners Array of listeners to search through.
     * @param {Function} listener Method to look for.
     * @return {Number} Index of the specified listener, -1 if not found
     * @api private
     */
    function indexOfListener(listeners, listener) {
        var i = listeners.length;
        while (i--) {
            if (listeners[i].listener === listener) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Alias a method while keeping the context correct, to allow for overwriting of target method.
     *
     * @param {String} name The name of the target method.
     * @return {Function} The aliased method
     * @api private
     */
    function alias(name) {
        return function aliasClosure() {
            return this[name].apply(this, arguments);
        };
    }

    /**
     * Returns the listener array for the specified event.
     * Will initialise the event object and listener arrays if required.
     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
     * Each property in the object response is an array of listener functions.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Function[]|Object} All listener functions for the event.
     */
    proto.getListeners = function getListeners(evt) {
        var events = this._getEvents();
        var response;
        var key;

        // Return a concatenated array of all matching events if
        // the selector is a regular expression.
        if (evt instanceof RegExp) {
            response = {};
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    response[key] = events[key];
                }
            }
        }
        else {
            response = events[evt] || (events[evt] = []);
        }

        return response;
    };

    /**
     * Takes a list of listener objects and flattens it into a list of listener functions.
     *
     * @param {Object[]} listeners Raw listener objects.
     * @return {Function[]} Just the listener functions.
     */
    proto.flattenListeners = function flattenListeners(listeners) {
        var flatListeners = [];
        var i;

        for (i = 0; i < listeners.length; i += 1) {
            flatListeners.push(listeners[i].listener);
        }

        return flatListeners;
    };

    /**
     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Object} All listener functions for an event in an object.
     */
    proto.getListenersAsObject = function getListenersAsObject(evt) {
        var listeners = this.getListeners(evt);
        var response;

        if (listeners instanceof Array) {
            response = {};
            response[evt] = listeners;
        }

        return response || listeners;
    };

    /**
     * Adds a listener function to the specified event.
     * The listener will not be added if it is a duplicate.
     * If the listener returns true then it will be removed after it is called.
     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListener = function addListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === 'object';
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                listeners[key].push(listenerIsWrapped ? listener : {
                    listener: listener,
                    once: false
                });
            }
        }

        return this;
    };

    /**
     * Alias of addListener
     */
    proto.on = alias('addListener');

    /**
     * Semi-alias of addListener. It will add a listener that will be
     * automatically removed after its first execution.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addOnceListener = function addOnceListener(evt, listener) {
        return this.addListener(evt, {
            listener: listener,
            once: true
        });
    };

    /**
     * Alias of addOnceListener.
     */
    proto.once = alias('addOnceListener');

    /**
     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
     * You need to tell it what event names should be matched by a regex.
     *
     * @param {String} evt Name of the event to create.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvent = function defineEvent(evt) {
        this.getListeners(evt);
        return this;
    };

    /**
     * Uses defineEvent to define multiple events.
     *
     * @param {String[]} evts An array of event names to define.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvents = function defineEvents(evts) {
        for (var i = 0; i < evts.length; i += 1) {
            this.defineEvent(evts[i]);
        }
        return this;
    };

    /**
     * Removes a listener function from the specified event.
     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to remove the listener from.
     * @param {Function} listener Method to remove from the event.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListener = function removeListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var index;
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                index = indexOfListener(listeners[key], listener);

                if (index !== -1) {
                    listeners[key].splice(index, 1);
                }
            }
        }

        return this;
    };

    /**
     * Alias of removeListener
     */
    proto.off = alias('removeListener');

    /**
     * Adds listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
     * You can also pass it a regular expression to add the array of listeners to all events that match it.
     * Yeah, this function does quite a bit. That's probably a bad thing.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListeners = function addListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(false, evt, listeners);
    };

    /**
     * Removes listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be removed.
     * You can also pass it a regular expression to remove the listeners from all events that match it.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListeners = function removeListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(true, evt, listeners);
    };

    /**
     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
     * The first argument will determine if the listeners are removed (true) or added (false).
     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added/removed.
     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
     *
     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners;

        // If evt is an object then pass each of its properties to this method
        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
            for (i in evt) {
                if (evt.hasOwnProperty(i) && (value = evt[i])) {
                    // Pass the single listener straight through to the singular method
                    if (typeof value === 'function') {
                        single.call(this, i, value);
                    }
                    else {
                        // Otherwise pass back to the multiple function
                        multiple.call(this, i, value);
                    }
                }
            }
        }
        else {
            // So evt must be a string
            // And listeners must be an array of listeners
            // Loop over it and pass each one to the multiple method
            i = listeners.length;
            while (i--) {
                single.call(this, evt, listeners[i]);
            }
        }

        return this;
    };

    /**
     * Removes all listeners from a specified event.
     * If you do not specify an event then all listeners will be removed.
     * That means every event will be emptied.
     * You can also pass a regex to remove all events that match it.
     *
     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeEvent = function removeEvent(evt) {
        var type = typeof evt;
        var events = this._getEvents();
        var key;

        // Remove different things depending on the state of evt
        if (type === 'string') {
            // Remove all listeners for the specified event
            delete events[evt];
        }
        else if (evt instanceof RegExp) {
            // Remove all events matching the regex.
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    delete events[key];
                }
            }
        }
        else {
            // Remove all listeners in all events
            delete this._events;
        }

        return this;
    };

    /**
     * Alias of removeEvent.
     *
     * Added to mirror the node API.
     */
    proto.removeAllListeners = alias('removeEvent');

    /**
     * Emits an event of your choice.
     * When emitted, every listener attached to that event will be executed.
     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
     * So they will not arrive within the array on the other side, they will be separate.
     * You can also pass a regular expression to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {Array} [args] Optional array of arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emitEvent = function emitEvent(evt, args) {
        var listeners = this.getListenersAsObject(evt);
        var listener;
        var i;
        var key;
        var response;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                i = listeners[key].length;

                while (i--) {
                    // If the listener returns true then it shall be removed from the event
                    // The function is executed either with a basic call or an apply if there is an args array
                    listener = listeners[key][i];

                    if (listener.once === true) {
                        this.removeListener(evt, listener.listener);
                    }

                    response = listener.listener.apply(this, args || []);

                    if (response === this._getOnceReturnValue()) {
                        this.removeListener(evt, listener.listener);
                    }
                }
            }
        }

        return this;
    };

    /**
     * Alias of emitEvent
     */
    proto.trigger = alias('emitEvent');

    /**
     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {...*} Optional additional arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emit = function emit(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
    };

    /**
     * Sets the current value to check against when executing listeners. If a
     * listeners return value matches the one set here then it will be removed
     * after execution. This value defaults to true.
     *
     * @param {*} value The new value to check for when executing listeners.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.setOnceReturnValue = function setOnceReturnValue(value) {
        this._onceReturnValue = value;
        return this;
    };

    /**
     * Fetches the current value to check against when executing listeners. If
     * the listeners return value matches this one then it should be removed
     * automatically. It will return true by default.
     *
     * @return {*|Boolean} The current value to check for or the default, true.
     * @api private
     */
    proto._getOnceReturnValue = function _getOnceReturnValue() {
        if (this.hasOwnProperty('_onceReturnValue')) {
            return this._onceReturnValue;
        }
        else {
            return true;
        }
    };

    /**
     * Fetches the events object and creates one if required.
     *
     * @return {Object} The events storage object.
     * @api private
     */
    proto._getEvents = function _getEvents() {
        return this._events || (this._events = {});
    };

    /**
     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
     *
     * @return {Function} Non conflicting EventEmitter class.
     */
    EventEmitter.noConflict = function noConflict() {
        exports.EventEmitter = originalGlobalValue;
        return EventEmitter;
    };

    // Expose the class either via AMD, CommonJS or the global object
    if (typeof define === 'function' && define.amd) {
        define('eventEmitter/EventEmitter',[],function () {
            return EventEmitter;
        });
    }
    else if (typeof module === 'object' && module.exports){
        module.exports = EventEmitter;
    }
    else {
        exports.EventEmitter = EventEmitter;
    }
}.call(this));

/*!
 * getStyleProperty v1.0.4
 * original by kangax
 * http://perfectionkills.com/feature-testing-css-properties/
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false, exports: false, module: false */

( function( window ) {



var prefixes = 'Webkit Moz ms Ms O'.split(' ');
var docElemStyle = document.documentElement.style;

function getStyleProperty( propName ) {
  if ( !propName ) {
    return;
  }

  // test standard property first
  if ( typeof docElemStyle[ propName ] === 'string' ) {
    return propName;
  }

  // capitalize
  propName = propName.charAt(0).toUpperCase() + propName.slice(1);

  // test vendor specific properties
  var prefixed;
  for ( var i=0, len = prefixes.length; i < len; i++ ) {
    prefixed = prefixes[i] + propName;
    if ( typeof docElemStyle[ prefixed ] === 'string' ) {
      return prefixed;
    }
  }
}

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'get-style-property/get-style-property',[],function() {
    return getStyleProperty;
  });
} else if ( typeof exports === 'object' ) {
  // CommonJS for Component
  module.exports = getStyleProperty;
} else {
  // browser global
  window.getStyleProperty = getStyleProperty;
}

})( window );

/*!
 * getSize v1.2.2
 * measure size of elements
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, exports: false, require: false, module: false, console: false */

( function( window, undefined ) {



// -------------------------- helpers -------------------------- //

// get a number from a string, not a percentage
function getStyleSize( value ) {
  var num = parseFloat( value );
  // not a percent like '100%', and a number
  var isValid = value.indexOf('%') === -1 && !isNaN( num );
  return isValid && num;
}

function noop() {}

var logError = typeof console === 'undefined' ? noop :
  function( message ) {
    console.error( message );
  };

// -------------------------- measurements -------------------------- //

var measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
];

function getZeroSize() {
  var size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  };
  for ( var i=0, len = measurements.length; i < len; i++ ) {
    var measurement = measurements[i];
    size[ measurement ] = 0;
  }
  return size;
}



function defineGetSize( getStyleProperty ) {

// -------------------------- setup -------------------------- //

var isSetup = false;

var getStyle, boxSizingProp, isBoxSizeOuter;

/**
 * setup vars and functions
 * do it on initial getSize(), rather than on script load
 * For Firefox bug https://bugzilla.mozilla.org/show_bug.cgi?id=548397
 */
function setup() {
  // setup once
  if ( isSetup ) {
    return;
  }
  isSetup = true;

  var getComputedStyle = window.getComputedStyle;
  getStyle = ( function() {
    var getStyleFn = getComputedStyle ?
      function( elem ) {
        return getComputedStyle( elem, null );
      } :
      function( elem ) {
        return elem.currentStyle;
      };

      return function getStyle( elem ) {
        var style = getStyleFn( elem );
        if ( !style ) {
          logError( 'Style returned ' + style +
            '. Are you running this code in a hidden iframe on Firefox? ' +
            'See http://bit.ly/getsizebug1' );
        }
        return style;
      };
  })();

  // -------------------------- box sizing -------------------------- //

  boxSizingProp = getStyleProperty('boxSizing');

  /**
   * WebKit measures the outer-width on style.width on border-box elems
   * IE & Firefox measures the inner-width
   */
  if ( boxSizingProp ) {
    var div = document.createElement('div');
    div.style.width = '200px';
    div.style.padding = '1px 2px 3px 4px';
    div.style.borderStyle = 'solid';
    div.style.borderWidth = '1px 2px 3px 4px';
    div.style[ boxSizingProp ] = 'border-box';

    var body = document.body || document.documentElement;
    body.appendChild( div );
    var style = getStyle( div );

    isBoxSizeOuter = getStyleSize( style.width ) === 200;
    body.removeChild( div );
  }

}

// -------------------------- getSize -------------------------- //

function getSize( elem ) {
  setup();

  // use querySeletor if elem is string
  if ( typeof elem === 'string' ) {
    elem = document.querySelector( elem );
  }

  // do not proceed on non-objects
  if ( !elem || typeof elem !== 'object' || !elem.nodeType ) {
    return;
  }

  var style = getStyle( elem );

  // if hidden, everything is 0
  if ( style.display === 'none' ) {
    return getZeroSize();
  }

  var size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  var isBorderBox = size.isBorderBox = !!( boxSizingProp &&
    style[ boxSizingProp ] && style[ boxSizingProp ] === 'border-box' );

  // get all measurements
  for ( var i=0, len = measurements.length; i < len; i++ ) {
    var measurement = measurements[i];
    var value = style[ measurement ];
    value = mungeNonPixel( elem, value );
    var num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  }

  var paddingWidth = size.paddingLeft + size.paddingRight;
  var paddingHeight = size.paddingTop + size.paddingBottom;
  var marginWidth = size.marginLeft + size.marginRight;
  var marginHeight = size.marginTop + size.marginBottom;
  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

  // overwrite width and height if we can get it from style
  var styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
  }

  var styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
  }

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}

// IE8 returns percent values, not pixels
// taken from jQuery's curCSS
function mungeNonPixel( elem, value ) {
  // IE8 and has percent value
  if ( window.getComputedStyle || value.indexOf('%') === -1 ) {
    return value;
  }
  var style = elem.style;
  // Remember the original values
  var left = style.left;
  var rs = elem.runtimeStyle;
  var rsLeft = rs && rs.left;

  // Put in the new values to get a computed value out
  if ( rsLeft ) {
    rs.left = elem.currentStyle.left;
  }
  style.left = value;
  value = style.pixelLeft;

  // Revert the changed values
  style.left = left;
  if ( rsLeft ) {
    rs.left = rsLeft;
  }

  return value;
}

return getSize;

}

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD for RequireJS
  define( 'get-size/get-size',[ 'get-style-property/get-style-property' ], defineGetSize );
} else if ( typeof exports === 'object' ) {
  // CommonJS for Component
  module.exports = defineGetSize( require('desandro-get-style-property') );
} else {
  // browser global
  window.getSize = defineGetSize( window.getStyleProperty );
}

})( window );

/*!
 * docReady v1.0.4
 * Cross browser DOMContentLoaded event emitter
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true*/
/*global define: false, require: false, module: false */

( function( window ) {



var document = window.document;
// collection of functions to be triggered on ready
var queue = [];

function docReady( fn ) {
  // throw out non-functions
  if ( typeof fn !== 'function' ) {
    return;
  }

  if ( docReady.isReady ) {
    // ready now, hit it
    fn();
  } else {
    // queue function when ready
    queue.push( fn );
  }
}

docReady.isReady = false;

// triggered on various doc ready events
function onReady( event ) {
  // bail if already triggered or IE8 document is not ready just yet
  var isIE8NotReady = event.type === 'readystatechange' && document.readyState !== 'complete';
  if ( docReady.isReady || isIE8NotReady ) {
    return;
  }

  trigger();
}

function trigger() {
  docReady.isReady = true;
  // process queue
  for ( var i=0, len = queue.length; i < len; i++ ) {
    var fn = queue[i];
    fn();
  }
}

function defineDocReady( eventie ) {
  // trigger ready if page is ready
  if ( document.readyState === 'complete' ) {
    trigger();
  } else {
    // listen for events
    eventie.bind( document, 'DOMContentLoaded', onReady );
    eventie.bind( document, 'readystatechange', onReady );
    eventie.bind( window, 'load', onReady );
  }

  return docReady;
}

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'doc-ready/doc-ready',[ 'eventie/eventie' ], defineDocReady );
} else if ( typeof exports === 'object' ) {
  module.exports = defineDocReady( require('eventie') );
} else {
  // browser global
  window.docReady = defineDocReady( window.eventie );
}

})( window );

/**
 * matchesSelector v1.0.3
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, module: false */

( function( ElemProto ) {

  

  var matchesMethod = ( function() {
    // check for the standard method name first
    if ( ElemProto.matches ) {
      return 'matches';
    }
    // check un-prefixed
    if ( ElemProto.matchesSelector ) {
      return 'matchesSelector';
    }
    // check vendor prefixes
    var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];

    for ( var i=0, len = prefixes.length; i < len; i++ ) {
      var prefix = prefixes[i];
      var method = prefix + 'MatchesSelector';
      if ( ElemProto[ method ] ) {
        return method;
      }
    }
  })();

  // ----- match ----- //

  function match( elem, selector ) {
    return elem[ matchesMethod ]( selector );
  }

  // ----- appendToFragment ----- //

  function checkParent( elem ) {
    // not needed if already has parent
    if ( elem.parentNode ) {
      return;
    }
    var fragment = document.createDocumentFragment();
    fragment.appendChild( elem );
  }

  // ----- query ----- //

  // fall back to using QSA
  // thx @jonathantneal https://gist.github.com/3062955
  function query( elem, selector ) {
    // append to fragment if no parent
    checkParent( elem );

    // match elem with all selected elems of parent
    var elems = elem.parentNode.querySelectorAll( selector );
    for ( var i=0, len = elems.length; i < len; i++ ) {
      // return true if match
      if ( elems[i] === elem ) {
        return true;
      }
    }
    // otherwise return false
    return false;
  }

  // ----- matchChild ----- //

  function matchChild( elem, selector ) {
    checkParent( elem );
    return match( elem, selector );
  }

  // ----- matchesSelector ----- //

  var matchesSelector;

  if ( matchesMethod ) {
    // IE9 supports matchesSelector, but doesn't work on orphaned elems
    // check for that
    var div = document.createElement('div');
    var supportsOrphans = match( div, 'div' );
    matchesSelector = supportsOrphans ? match : matchChild;
  } else {
    matchesSelector = query;
  }

  // transport
  if ( typeof define === 'function' && define.amd ) {
    // AMD
    define( 'matches-selector/matches-selector',[],function() {
      return matchesSelector;
    });
  } else if ( typeof exports === 'object' ) {
    module.exports = matchesSelector;
  }
  else {
    // browser global
    window.matchesSelector = matchesSelector;
  }

})( Element.prototype );

/**
 * Fizzy UI utils v1.0.1
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  /*global define: false, module: false, require: false */
  
  // universal module definition

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'fizzy-ui-utils/utils',[
      'doc-ready/doc-ready',
      'matches-selector/matches-selector'
    ], function( docReady, matchesSelector ) {
      return factory( window, docReady, matchesSelector );
    });
  } else if ( typeof exports == 'object' ) {
    // CommonJS
    module.exports = factory(
      window,
      require('doc-ready'),
      require('desandro-matches-selector')
    );
  } else {
    // browser global
    window.fizzyUIUtils = factory(
      window,
      window.docReady,
      window.matchesSelector
    );
  }

}( window, function factory( window, docReady, matchesSelector ) {



var utils = {};

// ----- extend ----- //

// extends objects
utils.extend = function( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
};

// ----- modulo ----- //

utils.modulo = function( num, div ) {
  return ( ( num % div ) + div ) % div;
};

// ----- isArray ----- //
  
var objToString = Object.prototype.toString;
utils.isArray = function( obj ) {
  return objToString.call( obj ) == '[object Array]';
};

// ----- makeArray ----- //

// turn element or nodeList into an array
utils.makeArray = function( obj ) {
  var ary = [];
  if ( utils.isArray( obj ) ) {
    // use object if already an array
    ary = obj;
  } else if ( obj && typeof obj.length == 'number' ) {
    // convert nodeList to array
    for ( var i=0, len = obj.length; i < len; i++ ) {
      ary.push( obj[i] );
    }
  } else {
    // array of single index
    ary.push( obj );
  }
  return ary;
};

// ----- indexOf ----- //

// index of helper cause IE8
utils.indexOf = Array.prototype.indexOf ? function( ary, obj ) {
    return ary.indexOf( obj );
  } : function( ary, obj ) {
    for ( var i=0, len = ary.length; i < len; i++ ) {
      if ( ary[i] === obj ) {
        return i;
      }
    }
    return -1;
  };

// ----- removeFrom ----- //

utils.removeFrom = function( ary, obj ) {
  var index = utils.indexOf( ary, obj );
  if ( index != -1 ) {
    ary.splice( index, 1 );
  }
};

// ----- isElement ----- //

// http://stackoverflow.com/a/384380/182183
utils.isElement = ( typeof HTMLElement == 'function' || typeof HTMLElement == 'object' ) ?
  function isElementDOM2( obj ) {
    return obj instanceof HTMLElement;
  } :
  function isElementQuirky( obj ) {
    return obj && typeof obj == 'object' &&
      obj.nodeType == 1 && typeof obj.nodeName == 'string';
  };

// ----- setText ----- //

utils.setText = ( function() {
  var setTextProperty;
  function setText( elem, text ) {
    // only check setTextProperty once
    setTextProperty = setTextProperty || ( document.documentElement.textContent !== undefined ? 'textContent' : 'innerText' );
    elem[ setTextProperty ] = text;
  }
  return setText;
})();

// ----- getParent ----- //

utils.getParent = function( elem, selector ) {
  while ( elem != document.body ) {
    elem = elem.parentNode;
    if ( matchesSelector( elem, selector ) ) {
      return elem;
    }
  }
};

// ----- getQueryElement ----- //

// use element as selector string
utils.getQueryElement = function( elem ) {
  if ( typeof elem == 'string' ) {
    return document.querySelector( elem );
  }
  return elem;
};

// ----- handleEvent ----- //

// enable .ontype to trigger from .addEventListener( elem, 'type' )
utils.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// ----- filterFindElements ----- //

utils.filterFindElements = function( elems, selector ) {
  // make array of elems
  elems = utils.makeArray( elems );
  var ffElems = [];

  for ( var i=0, len = elems.length; i < len; i++ ) {
    var elem = elems[i];
    // check that elem is an actual element
    if ( !utils.isElement( elem ) ) {
      continue;
    }
    // filter & find items if we have a selector
    if ( selector ) {
      // filter siblings
      if ( matchesSelector( elem, selector ) ) {
        ffElems.push( elem );
      }
      // find children
      var childElems = elem.querySelectorAll( selector );
      // concat childElems to filterFound array
      for ( var j=0, jLen = childElems.length; j < jLen; j++ ) {
        ffElems.push( childElems[j] );
      }
    } else {
      ffElems.push( elem );
    }
  }

  return ffElems;
};

// ----- debounceMethod ----- //

utils.debounceMethod = function( _class, methodName, threshold ) {
  // original method
  var method = _class.prototype[ methodName ];
  var timeoutName = methodName + 'Timeout';

  _class.prototype[ methodName ] = function() {
    var timeout = this[ timeoutName ];
    if ( timeout ) {
      clearTimeout( timeout );
    }
    var args = arguments;

    var _this = this;
    this[ timeoutName ] = setTimeout( function() {
      method.apply( _this, args );
      delete _this[ timeoutName ];
    }, threshold || 100 );
  };
};

// ----- htmlInit ----- //

// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
utils.toDashed = function( str ) {
  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
    return $1 + '-' + $2;
  }).toLowerCase();
};

var console = window.console;
/**
 * allow user to initialize classes via .js-namespace class
 * htmlInit( Widget, 'widgetName' )
 * options are parsed from data-namespace-option attribute
 */
utils.htmlInit = function( WidgetClass, namespace ) {
  docReady( function() {
    var dashedNamespace = utils.toDashed( namespace );
    var elems = document.querySelectorAll( '.js-' + dashedNamespace );
    var dataAttr = 'data-' + dashedNamespace + '-options';

    for ( var i=0, len = elems.length; i < len; i++ ) {
      var elem = elems[i];
      var attr = elem.getAttribute( dataAttr );
      var options;
      try {
        options = attr && JSON.parse( attr );
      } catch ( error ) {
        // log error, do not initialize
        if ( console ) {
          console.error( 'Error parsing ' + dataAttr + ' on ' +
            elem.nodeName.toLowerCase() + ( elem.id ? '#' + elem.id : '' ) + ': ' +
            error );
        }
        continue;
      }
      // initialize
      var instance = new WidgetClass( elem, options );
      // make available via $().data('layoutname')
      var jQuery = window.jQuery;
      if ( jQuery ) {
        jQuery.data( elem, namespace, instance );
      }
    }
  });
};

// -----  ----- //

return utils;

}));

/**
 * Outlayer Item
 */

( function( window, factory ) {
  
  // universal module definition
  if ( typeof define === 'function' && define.amd ) {
    // AMD
    define( 'outlayer/item',[
        'eventEmitter/EventEmitter',
        'get-size/get-size',
        'get-style-property/get-style-property',
        'fizzy-ui-utils/utils'
      ],
      function( EventEmitter, getSize, getStyleProperty, utils ) {
        return factory( window, EventEmitter, getSize, getStyleProperty, utils );
      }
    );
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory(
      window,
      require('wolfy87-eventemitter'),
      require('get-size'),
      require('desandro-get-style-property'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Outlayer = {};
    window.Outlayer.Item = factory(
      window,
      window.EventEmitter,
      window.getSize,
      window.getStyleProperty,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, EventEmitter, getSize, getStyleProperty, utils ) {


// ----- helpers ----- //

var getComputedStyle = window.getComputedStyle;
var getStyle = getComputedStyle ?
  function( elem ) {
    return getComputedStyle( elem, null );
  } :
  function( elem ) {
    return elem.currentStyle;
  };


function isEmptyObj( obj ) {
  for ( var prop in obj ) {
    return false;
  }
  prop = null;
  return true;
}

// -------------------------- CSS3 support -------------------------- //

var transitionProperty = getStyleProperty('transition');
var transformProperty = getStyleProperty('transform');
var supportsCSS3 = transitionProperty && transformProperty;
var is3d = !!getStyleProperty('perspective');

var transitionEndEvent = {
  WebkitTransition: 'webkitTransitionEnd',
  MozTransition: 'transitionend',
  OTransition: 'otransitionend',
  transition: 'transitionend'
}[ transitionProperty ];

// properties that could have vendor prefix
var prefixableProperties = [
  'transform',
  'transition',
  'transitionDuration',
  'transitionProperty'
];

// cache all vendor properties
var vendorProperties = ( function() {
  var cache = {};
  for ( var i=0, len = prefixableProperties.length; i < len; i++ ) {
    var prop = prefixableProperties[i];
    var supportedProp = getStyleProperty( prop );
    if ( supportedProp && supportedProp !== prop ) {
      cache[ prop ] = supportedProp;
    }
  }
  return cache;
})();

// -------------------------- Item -------------------------- //

function Item( element, layout ) {
  if ( !element ) {
    return;
  }

  this.element = element;
  // parent layout class, i.e. Masonry, Isotope, or Packery
  this.layout = layout;
  this.position = {
    x: 0,
    y: 0
  };

  this._create();
}

// inherit EventEmitter
utils.extend( Item.prototype, EventEmitter.prototype );

Item.prototype._create = function() {
  // transition objects
  this._transn = {
    ingProperties: {},
    clean: {},
    onEnd: {}
  };

  this.css({
    position: 'absolute'
  });
};

// trigger specified handler for event type
Item.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

Item.prototype.getSize = function() {
  this.size = getSize( this.element );
};

/**
 * apply CSS styles to element
 * @param {Object} style
 */
Item.prototype.css = function( style ) {
  var elemStyle = this.element.style;

  for ( var prop in style ) {
    // use vendor property if available
    var supportedProp = vendorProperties[ prop ] || prop;
    elemStyle[ supportedProp ] = style[ prop ];
  }
};

 // measure position, and sets it
Item.prototype.getPosition = function() {
  var style = getStyle( this.element );
  var layoutOptions = this.layout.options;
  var isOriginLeft = layoutOptions.isOriginLeft;
  var isOriginTop = layoutOptions.isOriginTop;
  var xValue = style[ isOriginLeft ? 'left' : 'right' ];
  var yValue = style[ isOriginTop ? 'top' : 'bottom' ];
  var x = parseInt( xValue, 10 );
  var y = parseInt( yValue, 10 );
  // convert percent to pixels
  var layoutSize = this.layout.size;
  x = xValue.indexOf('%') != -1 ? ( x / 100 ) * layoutSize.width : x;
  y = yValue.indexOf('%') != -1 ? ( y / 100 ) * layoutSize.height : y;

  // clean up 'auto' or other non-integer values
  x = isNaN( x ) ? 0 : x;
  y = isNaN( y ) ? 0 : y;
  // remove padding from measurement
  x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
  y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;

  this.position.x = x;
  this.position.y = y;
};

// set settled position, apply padding
Item.prototype.layoutPosition = function() {
  var layoutSize = this.layout.size;
  var layoutOptions = this.layout.options;
  var style = {};

  // x
  var xPadding = layoutOptions.isOriginLeft ? 'paddingLeft' : 'paddingRight';
  var xProperty = layoutOptions.isOriginLeft ? 'left' : 'right';
  var xResetProperty = layoutOptions.isOriginLeft ? 'right' : 'left';

  var x = this.position.x + layoutSize[ xPadding ];
  // set in percentage or pixels
  style[ xProperty ] = this.getXValue( x );
  // reset other property
  style[ xResetProperty ] = '';

  // y
  var yPadding = layoutOptions.isOriginTop ? 'paddingTop' : 'paddingBottom';
  var yProperty = layoutOptions.isOriginTop ? 'top' : 'bottom';
  var yResetProperty = layoutOptions.isOriginTop ? 'bottom' : 'top';

  var y = this.position.y + layoutSize[ yPadding ];
  // set in percentage or pixels
  style[ yProperty ] = this.getYValue( y );
  // reset other property
  style[ yResetProperty ] = '';

  this.css( style );
  this.emitEvent( 'layout', [ this ] );
};

Item.prototype.getXValue = function( x ) {
  var layoutOptions = this.layout.options;
  return layoutOptions.percentPosition && !layoutOptions.isHorizontal ?
    ( ( x / this.layout.size.width ) * 100 ) + '%' : x + 'px';
};

Item.prototype.getYValue = function( y ) {
  var layoutOptions = this.layout.options;
  return layoutOptions.percentPosition && layoutOptions.isHorizontal ?
    ( ( y / this.layout.size.height ) * 100 ) + '%' : y + 'px';
};


Item.prototype._transitionTo = function( x, y ) {
  this.getPosition();
  // get current x & y from top/left
  var curX = this.position.x;
  var curY = this.position.y;

  var compareX = parseInt( x, 10 );
  var compareY = parseInt( y, 10 );
  var didNotMove = compareX === this.position.x && compareY === this.position.y;

  // save end position
  this.setPosition( x, y );

  // if did not move and not transitioning, just go to layout
  if ( didNotMove && !this.isTransitioning ) {
    this.layoutPosition();
    return;
  }

  var transX = x - curX;
  var transY = y - curY;
  var transitionStyle = {};
  transitionStyle.transform = this.getTranslate( transX, transY );

  this.transition({
    to: transitionStyle,
    onTransitionEnd: {
      transform: this.layoutPosition
    },
    isCleaning: true
  });
};

Item.prototype.getTranslate = function( x, y ) {
  // flip cooridinates if origin on right or bottom
  var layoutOptions = this.layout.options;
  x = layoutOptions.isOriginLeft ? x : -x;
  y = layoutOptions.isOriginTop ? y : -y;
  x = this.getXValue( x );
  y = this.getYValue( y );

  if ( is3d ) {
    return 'translate3d(' + x + ', ' + y + ', 0)';
  }

  return 'translate(' + x + ', ' + y + ')';
};

// non transition + transform support
Item.prototype.goTo = function( x, y ) {
  this.setPosition( x, y );
  this.layoutPosition();
};

// use transition and transforms if supported
Item.prototype.moveTo = supportsCSS3 ?
  Item.prototype._transitionTo : Item.prototype.goTo;

Item.prototype.setPosition = function( x, y ) {
  this.position.x = parseInt( x, 10 );
  this.position.y = parseInt( y, 10 );
};

// ----- transition ----- //

/**
 * @param {Object} style - CSS
 * @param {Function} onTransitionEnd
 */

// non transition, just trigger callback
Item.prototype._nonTransition = function( args ) {
  this.css( args.to );
  if ( args.isCleaning ) {
    this._removeStyles( args.to );
  }
  for ( var prop in args.onTransitionEnd ) {
    args.onTransitionEnd[ prop ].call( this );
  }
};

/**
 * proper transition
 * @param {Object} args - arguments
 *   @param {Object} to - style to transition to
 *   @param {Object} from - style to start transition from
 *   @param {Boolean} isCleaning - removes transition styles after transition
 *   @param {Function} onTransitionEnd - callback
 */
Item.prototype._transition = function( args ) {
  // redirect to nonTransition if no transition duration
  if ( !parseFloat( this.layout.options.transitionDuration ) ) {
    this._nonTransition( args );
    return;
  }

  var _transition = this._transn;
  // keep track of onTransitionEnd callback by css property
  for ( var prop in args.onTransitionEnd ) {
    _transition.onEnd[ prop ] = args.onTransitionEnd[ prop ];
  }
  // keep track of properties that are transitioning
  for ( prop in args.to ) {
    _transition.ingProperties[ prop ] = true;
    // keep track of properties to clean up when transition is done
    if ( args.isCleaning ) {
      _transition.clean[ prop ] = true;
    }
  }

  // set from styles
  if ( args.from ) {
    this.css( args.from );
    // force redraw. http://blog.alexmaccaw.com/css-transitions
    var h = this.element.offsetHeight;
    // hack for JSHint to hush about unused var
    h = null;
  }
  // enable transition
  this.enableTransition( args.to );
  // set styles that are transitioning
  this.css( args.to );

  this.isTransitioning = true;

};

// dash before all cap letters, including first for
// WebkitTransform => -webkit-transform
function toDashedAll( str ) {
  return str.replace( /([A-Z])/g, function( $1 ) {
    return '-' + $1.toLowerCase();
  });
}

var transitionProps = 'opacity,' +
  toDashedAll( vendorProperties.transform || 'transform' );

Item.prototype.enableTransition = function(/* style */) {
  // HACK changing transitionProperty during a transition
  // will cause transition to jump
  if ( this.isTransitioning ) {
    return;
  }

  // make `transition: foo, bar, baz` from style object
  // HACK un-comment this when enableTransition can work
  // while a transition is happening
  // var transitionValues = [];
  // for ( var prop in style ) {
  //   // dash-ify camelCased properties like WebkitTransition
  //   prop = vendorProperties[ prop ] || prop;
  //   transitionValues.push( toDashedAll( prop ) );
  // }
  // enable transition styles
  this.css({
    transitionProperty: transitionProps,
    transitionDuration: this.layout.options.transitionDuration
  });
  // listen for transition end event
  this.element.addEventListener( transitionEndEvent, this, false );
};

Item.prototype.transition = Item.prototype[ transitionProperty ? '_transition' : '_nonTransition' ];

// ----- events ----- //

Item.prototype.onwebkitTransitionEnd = function( event ) {
  this.ontransitionend( event );
};

Item.prototype.onotransitionend = function( event ) {
  this.ontransitionend( event );
};

// properties that I munge to make my life easier
var dashedVendorProperties = {
  '-webkit-transform': 'transform',
  '-moz-transform': 'transform',
  '-o-transform': 'transform'
};

Item.prototype.ontransitionend = function( event ) {
  // disregard bubbled events from children
  if ( event.target !== this.element ) {
    return;
  }
  var _transition = this._transn;
  // get property name of transitioned property, convert to prefix-free
  var propertyName = dashedVendorProperties[ event.propertyName ] || event.propertyName;

  // remove property that has completed transitioning
  delete _transition.ingProperties[ propertyName ];
  // check if any properties are still transitioning
  if ( isEmptyObj( _transition.ingProperties ) ) {
    // all properties have completed transitioning
    this.disableTransition();
  }
  // clean style
  if ( propertyName in _transition.clean ) {
    // clean up style
    this.element.style[ event.propertyName ] = '';
    delete _transition.clean[ propertyName ];
  }
  // trigger onTransitionEnd callback
  if ( propertyName in _transition.onEnd ) {
    var onTransitionEnd = _transition.onEnd[ propertyName ];
    onTransitionEnd.call( this );
    delete _transition.onEnd[ propertyName ];
  }

  this.emitEvent( 'transitionEnd', [ this ] );
};

Item.prototype.disableTransition = function() {
  this.removeTransitionStyles();
  this.element.removeEventListener( transitionEndEvent, this, false );
  this.isTransitioning = false;
};

/**
 * removes style property from element
 * @param {Object} style
**/
Item.prototype._removeStyles = function( style ) {
  // clean up transition styles
  var cleanStyle = {};
  for ( var prop in style ) {
    cleanStyle[ prop ] = '';
  }
  this.css( cleanStyle );
};

var cleanTransitionStyle = {
  transitionProperty: '',
  transitionDuration: ''
};

Item.prototype.removeTransitionStyles = function() {
  // remove transition
  this.css( cleanTransitionStyle );
};

// ----- show/hide/remove ----- //

// remove element from DOM
Item.prototype.removeElem = function() {
  this.element.parentNode.removeChild( this.element );
  // remove display: none
  this.css({ display: '' });
  this.emitEvent( 'remove', [ this ] );
};

Item.prototype.remove = function() {
  // just remove element if no transition support or no transition
  if ( !transitionProperty || !parseFloat( this.layout.options.transitionDuration ) ) {
    this.removeElem();
    return;
  }

  // start transition
  var _this = this;
  this.once( 'transitionEnd', function() {
    _this.removeElem();
  });
  this.hide();
};

Item.prototype.reveal = function() {
  delete this.isHidden;
  // remove display: none
  this.css({ display: '' });

  var options = this.layout.options;

  var onTransitionEnd = {};
  var transitionEndProperty = this.getHideRevealTransitionEndProperty('visibleStyle');
  onTransitionEnd[ transitionEndProperty ] = this.onRevealTransitionEnd;

  this.transition({
    from: options.hiddenStyle,
    to: options.visibleStyle,
    isCleaning: true,
    onTransitionEnd: onTransitionEnd
  });
};

Item.prototype.onRevealTransitionEnd = function() {
  // check if still visible
  // during transition, item may have been hidden
  if ( !this.isHidden ) {
    this.emitEvent('reveal');
  }
};

/**
 * get style property use for hide/reveal transition end
 * @param {String} styleProperty - hiddenStyle/visibleStyle
 * @returns {String}
 */
Item.prototype.getHideRevealTransitionEndProperty = function( styleProperty ) {
  var optionStyle = this.layout.options[ styleProperty ];
  // use opacity
  if ( optionStyle.opacity ) {
    return 'opacity';
  }
  // get first property
  for ( var prop in optionStyle ) {
    return prop;
  }
};

Item.prototype.hide = function() {
  // set flag
  this.isHidden = true;
  // remove display: none
  this.css({ display: '' });

  var options = this.layout.options;

  var onTransitionEnd = {};
  var transitionEndProperty = this.getHideRevealTransitionEndProperty('hiddenStyle');
  onTransitionEnd[ transitionEndProperty ] = this.onHideTransitionEnd;

  this.transition({
    from: options.visibleStyle,
    to: options.hiddenStyle,
    // keep hidden stuff hidden
    isCleaning: true,
    onTransitionEnd: onTransitionEnd
  });
};

Item.prototype.onHideTransitionEnd = function() {
  // check if still hidden
  // during transition, item may have been un-hidden
  if ( this.isHidden ) {
    this.css({ display: 'none' });
    this.emitEvent('hide');
  }
};

Item.prototype.destroy = function() {
  this.css({
    position: '',
    left: '',
    right: '',
    top: '',
    bottom: '',
    transition: '',
    transform: ''
  });
};

return Item;

}));

/*!
 * Outlayer v1.4.1
 * the brains and guts of a layout library
 * MIT license
 */

( function( window, factory ) {
  
  // universal module definition

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'outlayer/outlayer',[
        'eventie/eventie',
        'eventEmitter/EventEmitter',
        'get-size/get-size',
        'fizzy-ui-utils/utils',
        './item'
      ],
      function( eventie, EventEmitter, getSize, utils, Item ) {
        return factory( window, eventie, EventEmitter, getSize, utils, Item);
      }
    );
  } else if ( typeof exports == 'object' ) {
    // CommonJS
    module.exports = factory(
      window,
      require('eventie'),
      require('wolfy87-eventemitter'),
      require('get-size'),
      require('fizzy-ui-utils'),
      require('./item')
    );
  } else {
    // browser global
    window.Outlayer = factory(
      window,
      window.eventie,
      window.EventEmitter,
      window.getSize,
      window.fizzyUIUtils,
      window.Outlayer.Item
    );
  }

}( window, function factory( window, eventie, EventEmitter, getSize, utils, Item ) {


// ----- vars ----- //

var console = window.console;
var jQuery = window.jQuery;
var noop = function() {};

// -------------------------- Outlayer -------------------------- //

// globally unique identifiers
var GUID = 0;
// internal store of all Outlayer intances
var instances = {};


/**
 * @param {Element, String} element
 * @param {Object} options
 * @constructor
 */
function Outlayer( element, options ) {
  var queryElement = utils.getQueryElement( element );
  if ( !queryElement ) {
    if ( console ) {
      console.error( 'Bad element for ' + this.constructor.namespace +
        ': ' + ( queryElement || element ) );
    }
    return;
  }
  this.element = queryElement;
  // add jQuery
  if ( jQuery ) {
    this.$element = jQuery( this.element );
  }

  // options
  this.options = utils.extend( {}, this.constructor.defaults );
  this.option( options );

  // add id for Outlayer.getFromElement
  var id = ++GUID;
  this.element.outlayerGUID = id; // expando
  instances[ id ] = this; // associate via id

  // kick it off
  this._create();

  if ( this.options.isInitLayout ) {
    this.layout();
  }
}

// settings are for internal use only
Outlayer.namespace = 'outlayer';
Outlayer.Item = Item;

// default options
Outlayer.defaults = {
  containerStyle: {
    position: 'relative'
  },
  isInitLayout: true,
  isOriginLeft: true,
  isOriginTop: true,
  isResizeBound: true,
  isResizingContainer: true,
  // item options
  transitionDuration: '0.4s',
  hiddenStyle: {
    opacity: 0,
    transform: 'scale(0.001)'
  },
  visibleStyle: {
    opacity: 1,
    transform: 'scale(1)'
  }
};

// inherit EventEmitter
utils.extend( Outlayer.prototype, EventEmitter.prototype );

/**
 * set options
 * @param {Object} opts
 */
Outlayer.prototype.option = function( opts ) {
  utils.extend( this.options, opts );
};

Outlayer.prototype._create = function() {
  // get items from children
  this.reloadItems();
  // elements that affect layout, but are not laid out
  this.stamps = [];
  this.stamp( this.options.stamp );
  // set container style
  utils.extend( this.element.style, this.options.containerStyle );

  // bind resize method
  if ( this.options.isResizeBound ) {
    this.bindResize();
  }
};

// goes through all children again and gets bricks in proper order
Outlayer.prototype.reloadItems = function() {
  // collection of item elements
  this.items = this._itemize( this.element.children );
};


/**
 * turn elements into Outlayer.Items to be used in layout
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - collection of new Outlayer Items
 */
Outlayer.prototype._itemize = function( elems ) {

  var itemElems = this._filterFindItemElements( elems );
  var Item = this.constructor.Item;

  // create new Outlayer Items for collection
  var items = [];
  for ( var i=0, len = itemElems.length; i < len; i++ ) {
    var elem = itemElems[i];
    var item = new Item( elem, this );
    items.push( item );
  }

  return items;
};

/**
 * get item elements to be used in layout
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - item elements
 */
Outlayer.prototype._filterFindItemElements = function( elems ) {
  return utils.filterFindElements( elems, this.options.itemSelector );
};

/**
 * getter method for getting item elements
 * @returns {Array} elems - collection of item elements
 */
Outlayer.prototype.getItemElements = function() {
  var elems = [];
  for ( var i=0, len = this.items.length; i < len; i++ ) {
    elems.push( this.items[i].element );
  }
  return elems;
};

// ----- init & layout ----- //

/**
 * lays out all items
 */
Outlayer.prototype.layout = function() {

  this._resetLayout();
  this._manageStamps();

  // don't animate first layout
  var isInstant = this.options.isLayoutInstant !== undefined ?
    this.options.isLayoutInstant : !this._isLayoutInited;
  this.layoutItems( this.items, isInstant );

  // flag for initalized
  this._isLayoutInited = true;
};

// _init is alias for layout
Outlayer.prototype._init = Outlayer.prototype.layout;

/**
 * logic before any new layout
 */
Outlayer.prototype._resetLayout = function() {
  this.getSize();
};


Outlayer.prototype.getSize = function() {
  this.size = getSize( this.element );
};

/**
 * get measurement from option, for columnWidth, rowHeight, gutter
 * if option is String -> get element from selector string, & get size of element
 * if option is Element -> get size of element
 * else use option as a number
 *
 * @param {String} measurement
 * @param {String} size - width or height
 * @private
 */
Outlayer.prototype._getMeasurement = function( measurement, size ) {
  var option = this.options[ measurement ];
  var elem;
  if ( !option ) {
    // default to 0
    this[ measurement ] = 0;
  } else {
    // use option as an element
    if ( typeof option === 'string' ) {
      elem = this.element.querySelector( option );
    } else if ( utils.isElement( option ) ) {
      elem = option;
    }
    // use size of element, if element
    this[ measurement ] = elem ? getSize( elem )[ size ] : option;
  }
};

/**
 * layout a collection of item elements
 * @api public
 */
Outlayer.prototype.layoutItems = function( items, isInstant ) {
  items = this._getItemsForLayout( items );

  this._layoutItems( items, isInstant );

  this._postLayout();
};

/**
 * get the items to be laid out
 * you may want to skip over some items
 * @param {Array} items
 * @returns {Array} items
 */
Outlayer.prototype._getItemsForLayout = function( items ) {
  var layoutItems = [];
  for ( var i=0, len = items.length; i < len; i++ ) {
    var item = items[i];
    if ( !item.isIgnored ) {
      layoutItems.push( item );
    }
  }
  return layoutItems;
};

/**
 * layout items
 * @param {Array} items
 * @param {Boolean} isInstant
 */
Outlayer.prototype._layoutItems = function( items, isInstant ) {
  this._emitCompleteOnItems( 'layout', items );

  if ( !items || !items.length ) {
    // no items, emit event with empty array
    return;
  }

  var queue = [];

  for ( var i=0, len = items.length; i < len; i++ ) {
    var item = items[i];
    // get x/y object from method
    var position = this._getItemLayoutPosition( item );
    // enqueue
    position.item = item;
    position.isInstant = isInstant || item.isLayoutInstant;
    queue.push( position );
  }

  this._processLayoutQueue( queue );
};

/**
 * get item layout position
 * @param {Outlayer.Item} item
 * @returns {Object} x and y position
 */
Outlayer.prototype._getItemLayoutPosition = function( /* item */ ) {
  return {
    x: 0,
    y: 0
  };
};

/**
 * iterate over array and position each item
 * Reason being - separating this logic prevents 'layout invalidation'
 * thx @paul_irish
 * @param {Array} queue
 */
Outlayer.prototype._processLayoutQueue = function( queue ) {
  for ( var i=0, len = queue.length; i < len; i++ ) {
    var obj = queue[i];
    this._positionItem( obj.item, obj.x, obj.y, obj.isInstant );
  }
};

/**
 * Sets position of item in DOM
 * @param {Outlayer.Item} item
 * @param {Number} x - horizontal position
 * @param {Number} y - vertical position
 * @param {Boolean} isInstant - disables transitions
 */
Outlayer.prototype._positionItem = function( item, x, y, isInstant ) {
  if ( isInstant ) {
    // if not transition, just set CSS
    item.goTo( x, y );
  } else {
    item.moveTo( x, y );
  }
};

/**
 * Any logic you want to do after each layout,
 * i.e. size the container
 */
Outlayer.prototype._postLayout = function() {
  this.resizeContainer();
};

Outlayer.prototype.resizeContainer = function() {
  if ( !this.options.isResizingContainer ) {
    return;
  }
  var size = this._getContainerSize();
  if ( size ) {
    this._setContainerMeasure( size.width, true );
    this._setContainerMeasure( size.height, false );
  }
};

/**
 * Sets width or height of container if returned
 * @returns {Object} size
 *   @param {Number} width
 *   @param {Number} height
 */
Outlayer.prototype._getContainerSize = noop;

/**
 * @param {Number} measure - size of width or height
 * @param {Boolean} isWidth
 */
Outlayer.prototype._setContainerMeasure = function( measure, isWidth ) {
  if ( measure === undefined ) {
    return;
  }

  var elemSize = this.size;
  // add padding and border width if border box
  if ( elemSize.isBorderBox ) {
    measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight +
      elemSize.borderLeftWidth + elemSize.borderRightWidth :
      elemSize.paddingBottom + elemSize.paddingTop +
      elemSize.borderTopWidth + elemSize.borderBottomWidth;
  }

  measure = Math.max( measure, 0 );
  this.element.style[ isWidth ? 'width' : 'height' ] = measure + 'px';
};

/**
 * emit eventComplete on a collection of items events
 * @param {String} eventName
 * @param {Array} items - Outlayer.Items
 */
Outlayer.prototype._emitCompleteOnItems = function( eventName, items ) {
  var _this = this;
  function onComplete() {
    _this.dispatchEvent( eventName + 'Complete', null, [ items ] );
  }

  var count = items.length;
  if ( !items || !count ) {
    onComplete();
    return;
  }

  var doneCount = 0;
  function tick() {
    doneCount++;
    if ( doneCount === count ) {
      onComplete();
    }
  }

  // bind callback
  for ( var i=0, len = items.length; i < len; i++ ) {
    var item = items[i];
    item.once( eventName, tick );
  }
};

/**
 * emits events via eventEmitter and jQuery events
 * @param {String} type - name of event
 * @param {Event} event - original event
 * @param {Array} args - extra arguments
 */
Outlayer.prototype.dispatchEvent = function( type, event, args ) {
  // add original event to arguments
  var emitArgs = event ? [ event ].concat( args ) : args;
  this.emitEvent( type, emitArgs );

  if ( jQuery ) {
    // set this.$element
    this.$element = this.$element || jQuery( this.element );
    if ( event ) {
      // create jQuery event
      var $event = jQuery.Event( event );
      $event.type = type;
      this.$element.trigger( $event, args );
    } else {
      // just trigger with type if no event available
      this.$element.trigger( type, args );
    }
  }
};

// -------------------------- ignore & stamps -------------------------- //


/**
 * keep item in collection, but do not lay it out
 * ignored items do not get skipped in layout
 * @param {Element} elem
 */
Outlayer.prototype.ignore = function( elem ) {
  var item = this.getItem( elem );
  if ( item ) {
    item.isIgnored = true;
  }
};

/**
 * return item to layout collection
 * @param {Element} elem
 */
Outlayer.prototype.unignore = function( elem ) {
  var item = this.getItem( elem );
  if ( item ) {
    delete item.isIgnored;
  }
};

/**
 * adds elements to stamps
 * @param {NodeList, Array, Element, or String} elems
 */
Outlayer.prototype.stamp = function( elems ) {
  elems = this._find( elems );
  if ( !elems ) {
    return;
  }

  this.stamps = this.stamps.concat( elems );
  // ignore
  for ( var i=0, len = elems.length; i < len; i++ ) {
    var elem = elems[i];
    this.ignore( elem );
  }
};

/**
 * removes elements to stamps
 * @param {NodeList, Array, or Element} elems
 */
Outlayer.prototype.unstamp = function( elems ) {
  elems = this._find( elems );
  if ( !elems ){
    return;
  }

  for ( var i=0, len = elems.length; i < len; i++ ) {
    var elem = elems[i];
    // filter out removed stamp elements
    utils.removeFrom( this.stamps, elem );
    this.unignore( elem );
  }

};

/**
 * finds child elements
 * @param {NodeList, Array, Element, or String} elems
 * @returns {Array} elems
 */
Outlayer.prototype._find = function( elems ) {
  if ( !elems ) {
    return;
  }
  // if string, use argument as selector string
  if ( typeof elems === 'string' ) {
    elems = this.element.querySelectorAll( elems );
  }
  elems = utils.makeArray( elems );
  return elems;
};

Outlayer.prototype._manageStamps = function() {
  if ( !this.stamps || !this.stamps.length ) {
    return;
  }

  this._getBoundingRect();

  for ( var i=0, len = this.stamps.length; i < len; i++ ) {
    var stamp = this.stamps[i];
    this._manageStamp( stamp );
  }
};

// update boundingLeft / Top
Outlayer.prototype._getBoundingRect = function() {
  // get bounding rect for container element
  var boundingRect = this.element.getBoundingClientRect();
  var size = this.size;
  this._boundingRect = {
    left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
    top: boundingRect.top + size.paddingTop + size.borderTopWidth,
    right: boundingRect.right - ( size.paddingRight + size.borderRightWidth ),
    bottom: boundingRect.bottom - ( size.paddingBottom + size.borderBottomWidth )
  };
};

/**
 * @param {Element} stamp
**/
Outlayer.prototype._manageStamp = noop;

/**
 * get x/y position of element relative to container element
 * @param {Element} elem
 * @returns {Object} offset - has left, top, right, bottom
 */
Outlayer.prototype._getElementOffset = function( elem ) {
  var boundingRect = elem.getBoundingClientRect();
  var thisRect = this._boundingRect;
  var size = getSize( elem );
  var offset = {
    left: boundingRect.left - thisRect.left - size.marginLeft,
    top: boundingRect.top - thisRect.top - size.marginTop,
    right: thisRect.right - boundingRect.right - size.marginRight,
    bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
  };
  return offset;
};

// -------------------------- resize -------------------------- //

// enable event handlers for listeners
// i.e. resize -> onresize
Outlayer.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

/**
 * Bind layout to window resizing
 */
Outlayer.prototype.bindResize = function() {
  // bind just one listener
  if ( this.isResizeBound ) {
    return;
  }
  eventie.bind( window, 'resize', this );
  this.isResizeBound = true;
};

/**
 * Unbind layout to window resizing
 */
Outlayer.prototype.unbindResize = function() {
  if ( this.isResizeBound ) {
    eventie.unbind( window, 'resize', this );
  }
  this.isResizeBound = false;
};

// original debounce by John Hann
// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/

// this fires every resize
Outlayer.prototype.onresize = function() {
  if ( this.resizeTimeout ) {
    clearTimeout( this.resizeTimeout );
  }

  var _this = this;
  function delayed() {
    _this.resize();
    delete _this.resizeTimeout;
  }

  this.resizeTimeout = setTimeout( delayed, 100 );
};

// debounced, layout on resize
Outlayer.prototype.resize = function() {
  // don't trigger if size did not change
  // or if resize was unbound. See #9
  if ( !this.isResizeBound || !this.needsResizeLayout() ) {
    return;
  }

  this.layout();
};

/**
 * check if layout is needed post layout
 * @returns Boolean
 */
Outlayer.prototype.needsResizeLayout = function() {
  var size = getSize( this.element );
  // check that this.size and size are there
  // IE8 triggers resize on body size change, so they might not be
  var hasSizes = this.size && size;
  return hasSizes && size.innerWidth !== this.size.innerWidth;
};

// -------------------------- methods -------------------------- //

/**
 * add items to Outlayer instance
 * @param {Array or NodeList or Element} elems
 * @returns {Array} items - Outlayer.Items
**/
Outlayer.prototype.addItems = function( elems ) {
  var items = this._itemize( elems );
  // add items to collection
  if ( items.length ) {
    this.items = this.items.concat( items );
  }
  return items;
};

/**
 * Layout newly-appended item elements
 * @param {Array or NodeList or Element} elems
 */
Outlayer.prototype.appended = function( elems ) {
  var items = this.addItems( elems );
  if ( !items.length ) {
    return;
  }
  // layout and reveal just the new items
  this.layoutItems( items, true );
  this.reveal( items );
};

/**
 * Layout prepended elements
 * @param {Array or NodeList or Element} elems
 */
Outlayer.prototype.prepended = function( elems ) {
  var items = this._itemize( elems );
  if ( !items.length ) {
    return;
  }
  // add items to beginning of collection
  var previousItems = this.items.slice(0);
  this.items = items.concat( previousItems );
  // start new layout
  this._resetLayout();
  this._manageStamps();
  // layout new stuff without transition
  this.layoutItems( items, true );
  this.reveal( items );
  // layout previous items
  this.layoutItems( previousItems );
};

/**
 * reveal a collection of items
 * @param {Array of Outlayer.Items} items
 */
Outlayer.prototype.reveal = function( items ) {
  this._emitCompleteOnItems( 'reveal', items );

  var len = items && items.length;
  for ( var i=0; len && i < len; i++ ) {
    var item = items[i];
    item.reveal();
  }
};

/**
 * hide a collection of items
 * @param {Array of Outlayer.Items} items
 */
Outlayer.prototype.hide = function( items ) {
  this._emitCompleteOnItems( 'hide', items );

  var len = items && items.length;
  for ( var i=0; len && i < len; i++ ) {
    var item = items[i];
    item.hide();
  }
};

/**
 * reveal item elements
 * @param {Array}, {Element}, {NodeList} items
 */
Outlayer.prototype.revealItemElements = function( elems ) {
  var items = this.getItems( elems );
  this.reveal( items );
};

/**
 * hide item elements
 * @param {Array}, {Element}, {NodeList} items
 */
Outlayer.prototype.hideItemElements = function( elems ) {
  var items = this.getItems( elems );
  this.hide( items );
};

/**
 * get Outlayer.Item, given an Element
 * @param {Element} elem
 * @param {Function} callback
 * @returns {Outlayer.Item} item
 */
Outlayer.prototype.getItem = function( elem ) {
  // loop through items to get the one that matches
  for ( var i=0, len = this.items.length; i < len; i++ ) {
    var item = this.items[i];
    if ( item.element === elem ) {
      // return item
      return item;
    }
  }
};

/**
 * get collection of Outlayer.Items, given Elements
 * @param {Array} elems
 * @returns {Array} items - Outlayer.Items
 */
Outlayer.prototype.getItems = function( elems ) {
  elems = utils.makeArray( elems );
  var items = [];
  for ( var i=0, len = elems.length; i < len; i++ ) {
    var elem = elems[i];
    var item = this.getItem( elem );
    if ( item ) {
      items.push( item );
    }
  }

  return items;
};

/**
 * remove element(s) from instance and DOM
 * @param {Array or NodeList or Element} elems
 */
Outlayer.prototype.remove = function( elems ) {
  var removeItems = this.getItems( elems );

  this._emitCompleteOnItems( 'remove', removeItems );

  // bail if no items to remove
  if ( !removeItems || !removeItems.length ) {
    return;
  }

  for ( var i=0, len = removeItems.length; i < len; i++ ) {
    var item = removeItems[i];
    item.remove();
    // remove item from collection
    utils.removeFrom( this.items, item );
  }
};

// ----- destroy ----- //

// remove and disable Outlayer instance
Outlayer.prototype.destroy = function() {
  // clean up dynamic styles
  var style = this.element.style;
  style.height = '';
  style.position = '';
  style.width = '';
  // destroy items
  for ( var i=0, len = this.items.length; i < len; i++ ) {
    var item = this.items[i];
    item.destroy();
  }

  this.unbindResize();

  var id = this.element.outlayerGUID;
  delete instances[ id ]; // remove reference to instance by id
  delete this.element.outlayerGUID;
  // remove data for jQuery
  if ( jQuery ) {
    jQuery.removeData( this.element, this.constructor.namespace );
  }

};

// -------------------------- data -------------------------- //

/**
 * get Outlayer instance from element
 * @param {Element} elem
 * @returns {Outlayer}
 */
Outlayer.data = function( elem ) {
  elem = utils.getQueryElement( elem );
  var id = elem && elem.outlayerGUID;
  return id && instances[ id ];
};


// -------------------------- create Outlayer class -------------------------- //

/**
 * create a layout class
 * @param {String} namespace
 */
Outlayer.create = function( namespace, options ) {
  // sub-class Outlayer
  function Layout() {
    Outlayer.apply( this, arguments );
  }
  // inherit Outlayer prototype, use Object.create if there
  if ( Object.create ) {
    Layout.prototype = Object.create( Outlayer.prototype );
  } else {
    utils.extend( Layout.prototype, Outlayer.prototype );
  }
  // set contructor, used for namespace and Item
  Layout.prototype.constructor = Layout;

  Layout.defaults = utils.extend( {}, Outlayer.defaults );
  // apply new options
  utils.extend( Layout.defaults, options );
  // keep prototype.settings for backwards compatibility (Packery v1.2.0)
  Layout.prototype.settings = {};

  Layout.namespace = namespace;

  Layout.data = Outlayer.data;

  // sub-class Item
  Layout.Item = function LayoutItem() {
    Item.apply( this, arguments );
  };

  Layout.Item.prototype = new Item();

  // -------------------------- declarative -------------------------- //

  utils.htmlInit( Layout, namespace );

  // -------------------------- jQuery bridge -------------------------- //

  // make into jQuery plugin
  if ( jQuery && jQuery.bridget ) {
    jQuery.bridget( namespace, Layout );
  }

  return Layout;
};

// ----- fin ----- //

// back in global
Outlayer.Item = Item;

return Outlayer;

}));


/*!
 * Masonry v3.3.1
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

( function( window, factory ) {
  
  // universal module definition
  if ( typeof define === 'function' && define.amd ) {
    // AMD
    define( [
        'outlayer/outlayer',
        'get-size/get-size',
        'fizzy-ui-utils/utils'
      ],
      factory );
  } else if ( typeof exports === 'object' ) {
    // CommonJS
    module.exports = factory(
      require('outlayer'),
      require('get-size'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Masonry = factory(
      window.Outlayer,
      window.getSize,
      window.fizzyUIUtils
    );
  }

}( window, function factory( Outlayer, getSize, utils ) {



// -------------------------- masonryDefinition -------------------------- //

  // create an Outlayer layout class
  var Masonry = Outlayer.create('masonry');

  Masonry.prototype._resetLayout = function() {
	
    this.getSize();
    this._getMeasurement( 'columnWidth', 'outerWidth' );
    this._getMeasurement( 'gutter', 'outerWidth' );
    this.measureColumns();

    // reset column Y
    var i = this.cols;
    this.colYs = [];
    while (i--) {
      this.colYs.push( 0 );
    }

    this.maxY = 0;
  };

  Masonry.prototype.measureColumns = function() {
    this.getContainerWidth();
    // if columnWidth is 0, default to outerWidth of first item
    if ( !this.columnWidth ) {
      var firstItem = this.items[0];
      var firstItemElem = firstItem && firstItem.element;
      // columnWidth fall back to item of first element
      this.columnWidth = firstItemElem && getSize( firstItemElem ).outerWidth ||
        // if first elem has no width, default to size of container
        this.containerWidth;
    }

    var columnWidth = this.columnWidth += this.gutter;

    // calculate columns
    var containerWidth = this.containerWidth + this.gutter;
    var cols = containerWidth / columnWidth;
    // fix rounding errors, typically with gutters
    var excess = columnWidth - containerWidth % columnWidth;
    // if overshoot is less than a pixel, round up, otherwise floor it
    var mathMethod = excess && excess < 1 ? 'round' : 'floor';
    cols = Math[ mathMethod ]( cols );
    this.cols = Math.max( cols, 1 );
  };

  Masonry.prototype.getContainerWidth = function() {
    // container is parent if fit width
    var container = this.options.isFitWidth ? this.element.parentNode : this.element;
    // check that this.size and size are there
    // IE8 triggers resize on body size change, so they might not be
    var size = getSize( container );
    this.containerWidth = size && size.innerWidth;
  };

  Masonry.prototype._getItemLayoutPosition = function( item ) {
    item.getSize();
    // how many columns does this brick span
    var remainder = item.size.outerWidth % this.columnWidth;
    var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
    // round if off by 1 pixel, otherwise use ceil
    var colSpan = Math[ mathMethod ]( item.size.outerWidth / this.columnWidth );
    colSpan = Math.min( colSpan, this.cols );

    var colGroup = this._getColGroup( colSpan );
    // get the minimum Y value from the columns
    var minimumY = Math.min.apply( Math, colGroup );
    var shortColIndex = utils.indexOf( colGroup, minimumY );

    // position the brick
    var position = {
      x: this.columnWidth * shortColIndex,
      y: minimumY
    };

    // apply setHeight to necessary columns
    var setHeight = minimumY + item.size.outerHeight;
    var setSpan = this.cols + 1 - colGroup.length;
    for ( var i = 0; i < setSpan; i++ ) {
      this.colYs[ shortColIndex + i ] = setHeight;
    }

    return position;
  };

  /**
   * @param {Number} colSpan - number of columns the element spans
   * @returns {Array} colGroup
   */
  Masonry.prototype._getColGroup = function( colSpan ) {
    if ( colSpan < 2 ) {
      // if brick spans only one column, use all the column Ys
      return this.colYs;
    }

    var colGroup = [];
    // how many different places could this brick fit horizontally
    var groupCount = this.cols + 1 - colSpan;
    // for each group potential horizontal position
    for ( var i = 0; i < groupCount; i++ ) {
      // make an array of colY values for that one group
      var groupColYs = this.colYs.slice( i, i + colSpan );
      // and get the max value of the array
      colGroup[i] = Math.max.apply( Math, groupColYs );
    }
    return colGroup;
  };

  Masonry.prototype._manageStamp = function( stamp ) {
    var stampSize = getSize( stamp );
    var offset = this._getElementOffset( stamp );
    // get the columns that this stamp affects
    var firstX = this.options.isOriginLeft ? offset.left : offset.right;
    var lastX = firstX + stampSize.outerWidth;
    var firstCol = Math.floor( firstX / this.columnWidth );
    firstCol = Math.max( 0, firstCol );
    var lastCol = Math.floor( lastX / this.columnWidth );
    // lastCol should not go over if multiple of columnWidth #425
    lastCol -= lastX % this.columnWidth ? 0 : 1;
    lastCol = Math.min( this.cols - 1, lastCol );
    // set colYs to bottom of the stamp
    var stampMaxY = ( this.options.isOriginTop ? offset.top : offset.bottom ) +
      stampSize.outerHeight;
    for ( var i = firstCol; i <= lastCol; i++ ) {
      this.colYs[i] = Math.max( stampMaxY, this.colYs[i] );
    }
  };

  Masonry.prototype._getContainerSize = function() {
    this.maxY = Math.max.apply( Math, this.colYs );
    var size = {
      height: this.maxY
    };

    if ( this.options.isFitWidth ) {
      size.width = this._getContainerFitWidth();
    }

    return size;
  };

  Masonry.prototype._getContainerFitWidth = function() {
    var unusedCols = 0;
    // count unused columns
    var i = this.cols;
    while ( --i ) {
      if ( this.colYs[i] !== 0 ) {
        break;
      }
      unusedCols++;
    }
    // fit container to columns that have been used
    return ( this.cols - unusedCols ) * this.columnWidth - this.gutter;
  };

  Masonry.prototype.needsResizeLayout = function() {
    var previousWidth = this.containerWidth;
    this.getContainerWidth();
    return previousWidth !== this.containerWidth;
  };

  return Masonry;

}));





/*! Magnific Popup - v1.0.0 - 2015-01-03
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2015 Dmitry Semenov; */
;(function (factory) { 
if (typeof define === 'function' && define.amd) { 
 // AMD. Register as an anonymous module. 
 define(['jquery'], factory); 
 } else if (typeof exports === 'object') { 
 // Node/CommonJS 
 factory(require('jquery')); 
 } else { 
 // Browser globals 
 factory(window.jQuery || window.Zepto); 
 } 
 }(function($) { 

/*>>core*/
/**
 * 
 * Magnific Popup Core JS file
 * 
 */


/**
 * Private static constants
 */
var CLOSE_EVENT = 'Close',
	BEFORE_CLOSE_EVENT = 'BeforeClose',
	AFTER_CLOSE_EVENT = 'AfterClose',
	BEFORE_APPEND_EVENT = 'BeforeAppend',
	MARKUP_PARSE_EVENT = 'MarkupParse',
	OPEN_EVENT = 'Open',
	CHANGE_EVENT = 'Change',
	NS = 'mfp',
	EVENT_NS = '.' + NS,
	READY_CLASS = 'mfp-ready',
	REMOVING_CLASS = 'mfp-removing',
	PREVENT_CLOSE_CLASS = 'mfp-prevent-close';


/**
 * Private vars 
 */
/*jshint -W079 */
var mfp, // As we have only one instance of MagnificPopup object, we define it locally to not to use 'this'
	MagnificPopup = function(){},
	_isJQ = !!(window.jQuery),
	_prevStatus,
	_window = $(window),
	_document,
	_prevContentType,
	_wrapClasses,
	_currPopupType;


/**
 * Private functions
 */
var _mfpOn = function(name, f) {
		mfp.ev.on(NS + name + EVENT_NS, f);
	},
	_getEl = function(className, appendTo, html, raw) {
		var el = document.createElement('div');
		el.className = 'mfp-'+className;
		if(html) {
			el.innerHTML = html;
		}
		if(!raw) {
			el = $(el);
			if(appendTo) {
				el.appendTo(appendTo);
			}
		} else if(appendTo) {
			appendTo.appendChild(el);
		}
		return el;
	},
	_mfpTrigger = function(e, data) {
		mfp.ev.triggerHandler(NS + e, data);

		if(mfp.st.callbacks) {
			// converts "mfpEventName" to "eventName" callback and triggers it if it's present
			e = e.charAt(0).toLowerCase() + e.slice(1);
			if(mfp.st.callbacks[e]) {
				mfp.st.callbacks[e].apply(mfp, $.isArray(data) ? data : [data]);
			}
		}
	},
	_getCloseBtn = function(type) {
		if(type !== _currPopupType || !mfp.currTemplate.closeBtn) {
			mfp.currTemplate.closeBtn = $( mfp.st.closeMarkup.replace('%title%', mfp.st.tClose ) );
			_currPopupType = type;
		}
		return mfp.currTemplate.closeBtn;
	},
	// Initialize Magnific Popup only when called at least once
	_checkInstance = function() {
		if(!$.magnificPopup.instance) {
			/*jshint -W020 */
			mfp = new MagnificPopup();
			mfp.init();
			$.magnificPopup.instance = mfp;
		}
	},
	// CSS transition detection, http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
	supportsTransitions = function() {
		var s = document.createElement('p').style, // 's' for style. better to create an element if body yet to exist
			v = ['ms','O','Moz','Webkit']; // 'v' for vendor

		if( s['transition'] !== undefined ) {
			return true; 
		}
			
		while( v.length ) {
			if( v.pop() + 'Transition' in s ) {
				return true;
			}
		}
				
		return false;
	};



/**
 * Public functions
 */
MagnificPopup.prototype = {

	constructor: MagnificPopup,

	/**
	 * Initializes Magnific Popup plugin. 
	 * This function is triggered only once when $.fn.magnificPopup or $.magnificPopup is executed
	 */
	init: function() {
		var appVersion = navigator.appVersion;
		mfp.isIE7 = appVersion.indexOf("MSIE 7.") !== -1; 
		mfp.isIE8 = appVersion.indexOf("MSIE 8.") !== -1;
		mfp.isLowIE = mfp.isIE7 || mfp.isIE8;
		mfp.isAndroid = (/android/gi).test(appVersion);
		mfp.isIOS = (/iphone|ipad|ipod/gi).test(appVersion);
		mfp.supportsTransition = supportsTransitions();

		// We disable fixed positioned lightbox on devices that don't handle it nicely.
		// If you know a better way of detecting this - let me know.
		mfp.probablyMobile = (mfp.isAndroid || mfp.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent) );
		_document = $(document);

		mfp.popupsCache = {};
	},

	/**
	 * Opens popup
	 * @param  data [description]
	 */
	open: function(data) {

		var i;

		if(data.isObj === false) { 
			// convert jQuery collection to array to avoid conflicts later
			mfp.items = data.items.toArray();

			mfp.index = 0;
			var items = data.items,
				item;
			for(i = 0; i < items.length; i++) {
				item = items[i];
				if(item.parsed) {
					item = item.el[0];
				}
				if(item === data.el[0]) {
					mfp.index = i;
					break;
				}
			}
		} else {
			mfp.items = $.isArray(data.items) ? data.items : [data.items];
			mfp.index = data.index || 0;
		}

		// if popup is already opened - we just update the content
		if(mfp.isOpen) {
			mfp.updateItemHTML();
			return;
		}
		
		mfp.types = []; 
		_wrapClasses = '';
		if(data.mainEl && data.mainEl.length) {
			mfp.ev = data.mainEl.eq(0);
		} else {
			mfp.ev = _document;
		}

		if(data.key) {
			if(!mfp.popupsCache[data.key]) {
				mfp.popupsCache[data.key] = {};
			}
			mfp.currTemplate = mfp.popupsCache[data.key];
		} else {
			mfp.currTemplate = {};
		}



		mfp.st = $.extend(true, {}, $.magnificPopup.defaults, data ); 
		mfp.fixedContentPos = mfp.st.fixedContentPos === 'auto' ? !mfp.probablyMobile : mfp.st.fixedContentPos;

		if(mfp.st.modal) {
			mfp.st.closeOnContentClick = false;
			mfp.st.closeOnBgClick = false;
			mfp.st.showCloseBtn = false;
			mfp.st.enableEscapeKey = false;
		}
		

		// Building markup
		// main containers are created only once
		if(!mfp.bgOverlay) {

			// Dark overlay
			mfp.bgOverlay = _getEl('bg').on('click'+EVENT_NS, function() {
				mfp.close();
			});

			mfp.wrap = _getEl('wrap').attr('tabindex', -1).on('click'+EVENT_NS, function(e) {
				if(mfp._checkIfClose(e.target)) {
					mfp.close();
				}
			});

			mfp.container = _getEl('container', mfp.wrap);
		}

		mfp.contentContainer = _getEl('content');
		if(mfp.st.preloader) {
			mfp.preloader = _getEl('preloader', mfp.container, mfp.st.tLoading);
		}


		// Initializing modules
		var modules = $.magnificPopup.modules;
		for(i = 0; i < modules.length; i++) {
			var n = modules[i];
			n = n.charAt(0).toUpperCase() + n.slice(1);
			mfp['init'+n].call(mfp);
		}
		_mfpTrigger('BeforeOpen');


		if(mfp.st.showCloseBtn) {
			// Close button
			if(!mfp.st.closeBtnInside) {
				mfp.wrap.append( _getCloseBtn() );
			} else {
				_mfpOn(MARKUP_PARSE_EVENT, function(e, template, values, item) {
					values.close_replaceWith = _getCloseBtn(item.type);
				});
				_wrapClasses += ' mfp-close-btn-in';
			}
		}

		if(mfp.st.alignTop) {
			_wrapClasses += ' mfp-align-top';
		}

	

		if(mfp.fixedContentPos) {
			mfp.wrap.css({
				overflow: mfp.st.overflowY,
				overflowX: 'hidden',
				overflowY: mfp.st.overflowY
			});
		} else {
			mfp.wrap.css({ 
				top: _window.scrollTop(),
				position: 'absolute'
			});
		}
		if( mfp.st.fixedBgPos === false || (mfp.st.fixedBgPos === 'auto' && !mfp.fixedContentPos) ) {
			mfp.bgOverlay.css({
				height: _document.height(),
				position: 'absolute'
			});
		}

		

		if(mfp.st.enableEscapeKey) {
			// Close on ESC key
			_document.on('keyup' + EVENT_NS, function(e) {
				if(e.keyCode === 27) {
					mfp.close();
				}
			});
		}

		_window.on('resize' + EVENT_NS, function() {
			mfp.updateSize();
		});


		if(!mfp.st.closeOnContentClick) {
			_wrapClasses += ' mfp-auto-cursor';
		}
		
		if(_wrapClasses)
			mfp.wrap.addClass(_wrapClasses);


		// this triggers recalculation of layout, so we get it once to not to trigger twice
		var windowHeight = mfp.wH = _window.height();

		
		var windowStyles = {};

		if( mfp.fixedContentPos ) {
            if(mfp._hasScrollBar(windowHeight)){
                var s = mfp._getScrollbarSize();
                if(s) {
                    windowStyles.marginRight = s;
                }
            }
        }

		if(mfp.fixedContentPos) {
			if(!mfp.isIE7) {
				windowStyles.overflow = 'hidden';
			} else {
				// ie7 double-scroll bug
				$('body, html').css('overflow', 'hidden');
			}
		}

		
		
		var classesToadd = mfp.st.mainClass;
		if(mfp.isIE7) {
			classesToadd += ' mfp-ie7';
		}
		if(classesToadd) {
			mfp._addClassToMFP( classesToadd );
		}

		// add content
		mfp.updateItemHTML();

		_mfpTrigger('BuildControls');

		// remove scrollbar, add margin e.t.c
		$('html').css(windowStyles);
		
		// add everything to DOM
		mfp.bgOverlay.add(mfp.wrap).prependTo( mfp.st.prependTo || $(document.body) );

		// Save last focused element
		mfp._lastFocusedEl = document.activeElement;
		
		// Wait for next cycle to allow CSS transition
		setTimeout(function() {
			
			if(mfp.content) {
				mfp._addClassToMFP(READY_CLASS);
				mfp._setFocus();
			} else {
				// if content is not defined (not loaded e.t.c) we add class only for BG
				mfp.bgOverlay.addClass(READY_CLASS);
			}
			
			// Trap the focus in popup
			_document.on('focusin' + EVENT_NS, mfp._onFocusIn);

		}, 16);

		mfp.isOpen = true;
		mfp.updateSize(windowHeight);
		_mfpTrigger(OPEN_EVENT);

		return data;
	},

	/**
	 * Closes the popup
	 */
	close: function() {
		if(!mfp.isOpen) return;
		_mfpTrigger(BEFORE_CLOSE_EVENT);

		mfp.isOpen = false;
		// for CSS3 animation
		if(mfp.st.removalDelay && !mfp.isLowIE && mfp.supportsTransition )  {
			mfp._addClassToMFP(REMOVING_CLASS);
			setTimeout(function() {
				mfp._close();
			}, mfp.st.removalDelay);
		} else {
			mfp._close();
		}
	},

	/**
	 * Helper for close() function
	 */
	_close: function() {
		_mfpTrigger(CLOSE_EVENT);

		var classesToRemove = REMOVING_CLASS + ' ' + READY_CLASS + ' ';

		mfp.bgOverlay.detach();
		mfp.wrap.detach();
		mfp.container.empty();

		if(mfp.st.mainClass) {
			classesToRemove += mfp.st.mainClass + ' ';
		}

		mfp._removeClassFromMFP(classesToRemove);

		if(mfp.fixedContentPos) {
			var windowStyles = {marginRight: ''};
			if(mfp.isIE7) {
				$('body, html').css('overflow', '');
			} else {
				windowStyles.overflow = '';
			}
			$('html').css(windowStyles);
		}
		
		_document.off('keyup' + EVENT_NS + ' focusin' + EVENT_NS);
		mfp.ev.off(EVENT_NS);

		// clean up DOM elements that aren't removed
		mfp.wrap.attr('class', 'mfp-wrap').removeAttr('style');
		mfp.bgOverlay.attr('class', 'mfp-bg');
		mfp.container.attr('class', 'mfp-container');

		// remove close button from target element
		if(mfp.st.showCloseBtn &&
		(!mfp.st.closeBtnInside || mfp.currTemplate[mfp.currItem.type] === true)) {
			if(mfp.currTemplate.closeBtn)
				mfp.currTemplate.closeBtn.detach();
		}


		if(mfp._lastFocusedEl) {
			$(mfp._lastFocusedEl).focus(); // put tab focus back
		}
		mfp.currItem = null;	
		mfp.content = null;
		mfp.currTemplate = null;
		mfp.prevHeight = 0;

		_mfpTrigger(AFTER_CLOSE_EVENT);
	},
	
	updateSize: function(winHeight) {

		if(mfp.isIOS) {
			// fixes iOS nav bars https://github.com/dimsemenov/Magnific-Popup/issues/2
			var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
			var height = window.innerHeight * zoomLevel;
			mfp.wrap.css('height', height);
			mfp.wH = height;
		} else {
			mfp.wH = winHeight || _window.height();
		}
		// Fixes #84: popup incorrectly positioned with position:relative on body
		if(!mfp.fixedContentPos) {
			mfp.wrap.css('height', mfp.wH);
		}

		_mfpTrigger('Resize');

	},

	/**
	 * Set content of popup based on current index
	 */
	updateItemHTML: function() {
		var item = mfp.items[mfp.index];

		// Detach and perform modifications
		mfp.contentContainer.detach();

		if(mfp.content)
			mfp.content.detach();

		if(!item.parsed) {
			item = mfp.parseEl( mfp.index );
		}

		var type = item.type;	

		_mfpTrigger('BeforeChange', [mfp.currItem ? mfp.currItem.type : '', type]);
		// BeforeChange event works like so:
		// _mfpOn('BeforeChange', function(e, prevType, newType) { });
		
		mfp.currItem = item;

		

		

		if(!mfp.currTemplate[type]) {
			var markup = mfp.st[type] ? mfp.st[type].markup : false;

			// allows to modify markup
			_mfpTrigger('FirstMarkupParse', markup);

			if(markup) {
				mfp.currTemplate[type] = $(markup);
			} else {
				// if there is no markup found we just define that template is parsed
				mfp.currTemplate[type] = true;
			}
		}

		if(_prevContentType && _prevContentType !== item.type) {
			mfp.container.removeClass('mfp-'+_prevContentType+'-holder');
		}
		
		var newContent = mfp['get' + type.charAt(0).toUpperCase() + type.slice(1)](item, mfp.currTemplate[type]);
		mfp.appendContent(newContent, type);

		item.preloaded = true;

		_mfpTrigger(CHANGE_EVENT, item);
		_prevContentType = item.type;
		
		// Append container back after its content changed
		mfp.container.prepend(mfp.contentContainer);

		_mfpTrigger('AfterChange');
	},


	/**
	 * Set HTML content of popup
	 */
	appendContent: function(newContent, type) {
		mfp.content = newContent;
		
		if(newContent) {
			if(mfp.st.showCloseBtn && mfp.st.closeBtnInside &&
				mfp.currTemplate[type] === true) {
				// if there is no markup, we just append close button element inside
				if(!mfp.content.find('.mfp-close').length) {
					mfp.content.append(_getCloseBtn());
				}
			} else {
				mfp.content = newContent;
			}
		} else {
			mfp.content = '';
		}

		_mfpTrigger(BEFORE_APPEND_EVENT);
		mfp.container.addClass('mfp-'+type+'-holder');

		mfp.contentContainer.append(mfp.content);
	},



	
	/**
	 * Creates Magnific Popup data object based on given data
	 * @param  {int} index Index of item to parse
	 */
	parseEl: function(index) {
		var item = mfp.items[index],
			type;

		if(item.tagName) {
			item = { el: $(item) };
		} else {
			type = item.type;
			item = { data: item, src: item.src };
		}

		if(item.el) {
			var types = mfp.types;

			// check for 'mfp-TYPE' class
			for(var i = 0; i < types.length; i++) {
				if( item.el.hasClass('mfp-'+types[i]) ) {
					type = types[i];
					break;
				}
			}

			item.src = item.el.attr('data-mfp-src');
			if(!item.src) {
				item.src = item.el.attr('href');
			}
		}

		item.type = type || mfp.st.type || 'inline';
		item.index = index;
		item.parsed = true;
		mfp.items[index] = item;
		_mfpTrigger('ElementParse', item);

		return mfp.items[index];
	},


	/**
	 * Initializes single popup or a group of popups
	 */
	addGroup: function(el, options) {
		var eHandler = function(e) {
			e.mfpEl = this;
			mfp._openClick(e, el, options);
		};

		if(!options) {
			options = {};
		} 

		var eName = 'click.magnificPopup';
		options.mainEl = el;
		
		if(options.items) {
			options.isObj = true;
			el.off(eName).on(eName, eHandler);
		} else {
			options.isObj = false;
			if(options.delegate) {
				el.off(eName).on(eName, options.delegate , eHandler);
			} else {
				options.items = el;
				el.off(eName).on(eName, eHandler);
			}
		}
	},
	_openClick: function(e, el, options) {
		var midClick = options.midClick !== undefined ? options.midClick : $.magnificPopup.defaults.midClick;


		if(!midClick && ( e.which === 2 || e.ctrlKey || e.metaKey ) ) {
			return;
		}

		var disableOn = options.disableOn !== undefined ? options.disableOn : $.magnificPopup.defaults.disableOn;

		if(disableOn) {
			if($.isFunction(disableOn)) {
				if( !disableOn.call(mfp) ) {
					return true;
				}
			} else { // else it's number
				if( _window.width() < disableOn ) {
					return true;
				}
			}
		}
		
		if(e.type) {
			e.preventDefault();

			// This will prevent popup from closing if element is inside and popup is already opened
			if(mfp.isOpen) {
				e.stopPropagation();
			}
		}
			

		options.el = $(e.mfpEl);
		if(options.delegate) {
			options.items = el.find(options.delegate);
		}
		mfp.open(options);
	},


	/**
	 * Updates text on preloader
	 */
	updateStatus: function(status, text) {

		if(mfp.preloader) {
			if(_prevStatus !== status) {
				mfp.container.removeClass('mfp-s-'+_prevStatus);
			}

			if(!text && status === 'loading') {
				text = mfp.st.tLoading;
			}

			var data = {
				status: status,
				text: text
			};
			// allows to modify status
			_mfpTrigger('UpdateStatus', data);

			status = data.status;
			text = data.text;

			mfp.preloader.html(text);

			mfp.preloader.find('a').on('click', function(e) {
				e.stopImmediatePropagation();
			});

			mfp.container.addClass('mfp-s-'+status);
			_prevStatus = status;
		}
	},


	/*
		"Private" helpers that aren't private at all
	 */
	// Check to close popup or not
	// "target" is an element that was clicked
	_checkIfClose: function(target) {

		if($(target).hasClass(PREVENT_CLOSE_CLASS)) {
			return;
		}

		var closeOnContent = mfp.st.closeOnContentClick;
		var closeOnBg = mfp.st.closeOnBgClick;

		if(closeOnContent && closeOnBg) {
			return true;
		} else {

			// We close the popup if click is on close button or on preloader. Or if there is no content.
			if(!mfp.content || $(target).hasClass('mfp-close') || (mfp.preloader && target === mfp.preloader[0]) ) {
				return true;
			}

			// if click is outside the content
			if(  (target !== mfp.content[0] && !$.contains(mfp.content[0], target))  ) {
				if(closeOnBg) {
					// last check, if the clicked element is in DOM, (in case it's removed onclick)
					if( $.contains(document, target) ) {
						return true;
					}
				}
			} else if(closeOnContent) {
				return true;
			}

		}
		return false;
	},
	_addClassToMFP: function(cName) {
		mfp.bgOverlay.addClass(cName);
		mfp.wrap.addClass(cName);
	},
	_removeClassFromMFP: function(cName) {
		this.bgOverlay.removeClass(cName);
		mfp.wrap.removeClass(cName);
	},
	_hasScrollBar: function(winHeight) {
		return (  (mfp.isIE7 ? _document.height() : document.body.scrollHeight) > (winHeight || _window.height()) );
	},
	_setFocus: function() {
		(mfp.st.focus ? mfp.content.find(mfp.st.focus).eq(0) : mfp.wrap).focus();
	},
	_onFocusIn: function(e) {
		if( e.target !== mfp.wrap[0] && !$.contains(mfp.wrap[0], e.target) ) {
			mfp._setFocus();
			return false;
		}
	},
	_parseMarkup: function(template, values, item) {
		var arr;
		if(item.data) {
			values = $.extend(item.data, values);
		}
		_mfpTrigger(MARKUP_PARSE_EVENT, [template, values, item] );

		$.each(values, function(key, value) {
			if(value === undefined || value === false) {
				return true;
			}
			arr = key.split('_');
			if(arr.length > 1) {
				var el = template.find(EVENT_NS + '-'+arr[0]);

				if(el.length > 0) {
					var attr = arr[1];
					if(attr === 'replaceWith') {
						if(el[0] !== value[0]) {
							el.replaceWith(value);
						}
					} else if(attr === 'img') {
						if(el.is('img')) {
							el.attr('src', value);
						} else {
							el.replaceWith( '<img src="'+value+'" class="' + el.attr('class') + '" />' );
						}
					} else {
						el.attr(arr[1], value);
					}
				}

			} else {
				template.find(EVENT_NS + '-'+key).html(value);
			}
		});
	},

	_getScrollbarSize: function() {
		// thx David
		if(mfp.scrollbarSize === undefined) {
			var scrollDiv = document.createElement("div");
			scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
			document.body.appendChild(scrollDiv);
			mfp.scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
			document.body.removeChild(scrollDiv);
		}
		return mfp.scrollbarSize;
	}

}; /* MagnificPopup core prototype end */




/**
 * Public static functions
 */
$.magnificPopup = {
	instance: null,
	proto: MagnificPopup.prototype,
	modules: [],

	open: function(options, index) {
		_checkInstance();	

		if(!options) {
			options = {};
		} else {
			options = $.extend(true, {}, options);
		}
			

		options.isObj = true;
		options.index = index || 0;
		return this.instance.open(options);
	},

	close: function() {
		return $.magnificPopup.instance && $.magnificPopup.instance.close();
	},

	registerModule: function(name, module) {
		if(module.options) {
			$.magnificPopup.defaults[name] = module.options;
		}
		$.extend(this.proto, module.proto);			
		this.modules.push(name);
	},

	defaults: {   

		// Info about options is in docs:
		// http://dimsemenov.com/plugins/magnific-popup/documentation.html#options
		
		disableOn: 0,	

		key: null,

		midClick: false,

		mainClass: '',

		preloader: true,

		focus: '', // CSS selector of input to focus after popup is opened
		
		closeOnContentClick: false,

		closeOnBgClick: true,

		closeBtnInside: true, 

		showCloseBtn: true,

		enableEscapeKey: true,

		modal: false,

		alignTop: false,
	
		removalDelay: 0,

		prependTo: null,
		
		fixedContentPos: 'auto', 
	
		fixedBgPos: 'auto',

		overflowY: 'auto',

		closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',

		tClose: 'Close (Esc)',

		tLoading: 'Loading...'

	}
};



$.fn.magnificPopup = function(options) {
	_checkInstance();

	var jqEl = $(this);

	// We call some API method of first param is a string
	if (typeof options === "string" ) {

		if(options === 'open') {
			var items,
				itemOpts = _isJQ ? jqEl.data('magnificPopup') : jqEl[0].magnificPopup,
				index = parseInt(arguments[1], 10) || 0;

			if(itemOpts.items) {
				items = itemOpts.items[index];
			} else {
				items = jqEl;
				if(itemOpts.delegate) {
					items = items.find(itemOpts.delegate);
				}
				items = items.eq( index );
			}
			mfp._openClick({mfpEl:items}, jqEl, itemOpts);
		} else {
			if(mfp.isOpen)
				mfp[options].apply(mfp, Array.prototype.slice.call(arguments, 1));
		}

	} else {
		// clone options obj
		options = $.extend(true, {}, options);
		
		/*
		 * As Zepto doesn't support .data() method for objects 
		 * and it works only in normal browsers
		 * we assign "options" object directly to the DOM element. FTW!
		 */
		if(_isJQ) {
			jqEl.data('magnificPopup', options);
		} else {
			jqEl[0].magnificPopup = options;
		}

		mfp.addGroup(jqEl, options);

	}
	return jqEl;
};


//Quick benchmark
/*
var start = performance.now(),
	i,
	rounds = 1000;

for(i = 0; i < rounds; i++) {

}
console.log('Test #1:', performance.now() - start);

start = performance.now();
for(i = 0; i < rounds; i++) {

}
console.log('Test #2:', performance.now() - start);
*/


/*>>core*/







/*>>zoom*/
var hasMozTransform,
	getHasMozTransform = function() {
		if(hasMozTransform === undefined) {
			hasMozTransform = document.createElement('p').style.MozTransform !== undefined;
		}
		return hasMozTransform;		
	};

$.magnificPopup.registerModule('zoom', {

	options: {
		enabled: false,
		easing: 'ease-in-out',
		duration: 300,
		opener: function(element) {
			return element.is('img') ? element : element.find('img');
		}
	},

	proto: {

		initZoom: function() {
			var zoomSt = mfp.st.zoom,
				ns = '.zoom',
				image;
				
			if(!zoomSt.enabled || !mfp.supportsTransition) {
				return;
			}

			var duration = zoomSt.duration,
				getElToAnimate = function(image) {
					var newImg = image.clone().removeAttr('style').removeAttr('class').addClass('mfp-animated-image'),
						transition = 'all '+(zoomSt.duration/1000)+'s ' + zoomSt.easing,
						cssObj = {
							position: 'fixed',
							zIndex: 9999,
							left: 0,
							top: 0,
							'-webkit-backface-visibility': 'hidden'
						},
						t = 'transition';

					cssObj['-webkit-'+t] = cssObj['-moz-'+t] = cssObj['-o-'+t] = cssObj[t] = transition;

					newImg.css(cssObj);
					return newImg;
				},
				showMainContent = function() {
					mfp.content.css('visibility', 'visible');
				},
				openTimeout,
				animatedImg;

			_mfpOn('BuildControls'+ns, function() {
				if(mfp._allowZoom()) {

					clearTimeout(openTimeout);
					mfp.content.css('visibility', 'hidden');

					// Basically, all code below does is clones existing image, puts in on top of the current one and animated it
					
					image = mfp._getItemToZoom();

					if(!image) {
						showMainContent();
						return;
					}

					animatedImg = getElToAnimate(image); 
					
					animatedImg.css( mfp._getOffset() );

					mfp.wrap.append(animatedImg);

					openTimeout = setTimeout(function() {
						animatedImg.css( mfp._getOffset( true ) );
						openTimeout = setTimeout(function() {

							showMainContent();

							setTimeout(function() {
								animatedImg.remove();
								image = animatedImg = null;
								_mfpTrigger('ZoomAnimationEnded');
							}, 16); // avoid blink when switching images 

						}, duration); // this timeout equals animation duration

					}, 16); // by adding this timeout we avoid short glitch at the beginning of animation


					// Lots of timeouts...
				}
			});
			_mfpOn(BEFORE_CLOSE_EVENT+ns, function() {
				if(mfp._allowZoom()) {

					clearTimeout(openTimeout);

					mfp.st.removalDelay = duration;

					if(!image) {
						image = mfp._getItemToZoom();
						if(!image) {
							return;
						}
						animatedImg = getElToAnimate(image);
					}
					
					
					animatedImg.css( mfp._getOffset(true) );
					mfp.wrap.append(animatedImg);
					mfp.content.css('visibility', 'hidden');
					
					setTimeout(function() {
						animatedImg.css( mfp._getOffset() );
					}, 16);
				}

			});

			_mfpOn(CLOSE_EVENT+ns, function() {
				if(mfp._allowZoom()) {
					showMainContent();
					if(animatedImg) {
						animatedImg.remove();
					}
					image = null;
				}	
			});
		},

		_allowZoom: function() {
			return mfp.currItem.type === 'image';
		},

		_getItemToZoom: function() {
			if(mfp.currItem.hasSize) {
				return mfp.currItem.img;
			} else {
				return false;
			}
		},

		// Get element postion relative to viewport
		_getOffset: function(isLarge) {
			var el;
			if(isLarge) {
				el = mfp.currItem.img;
			} else {
				el = mfp.st.zoom.opener(mfp.currItem.el || mfp.currItem);
			}

			var offset = el.offset();
			var paddingTop = parseInt(el.css('padding-top'),10);
			var paddingBottom = parseInt(el.css('padding-bottom'),10);
			offset.top -= ( $(window).scrollTop() - paddingTop );


			/*
			
			Animating left + top + width/height looks glitchy in Firefox, but perfect in Chrome. And vice-versa.

			 */
			var obj = {
				width: el.width(),
				// fix Zepto height+padding issue
				height: (_isJQ ? el.innerHeight() : el[0].offsetHeight) - paddingBottom - paddingTop
			};

			// I hate to do this, but there is no another option
			if( getHasMozTransform() ) {
				obj['-moz-transform'] = obj['transform'] = 'translate(' + offset.left + 'px,' + offset.top + 'px)';
			} else {
				obj.left = offset.left;
				obj.top = offset.top;
			}
			return obj;
		}

	}
});



/*>>zoom*/

/*>>iframe*/

var IFRAME_NS = 'iframe',
	_emptyPage = '//about:blank',
	
	_fixIframeBugs = function(isShowing) {
		if(mfp.currTemplate[IFRAME_NS]) {
			var el = mfp.currTemplate[IFRAME_NS].find('iframe');
			if(el.length) { 
				// reset src after the popup is closed to avoid "video keeps playing after popup is closed" bug
				if(!isShowing) {
					el[0].src = _emptyPage;
				}

				// IE8 black screen bug fix
				if(mfp.isIE8) {
					el.css('display', isShowing ? 'block' : 'none');
				}
			}
		}
	};

$.magnificPopup.registerModule(IFRAME_NS, {

	options: {
		markup: '<div class="mfp-iframe-scaler">'+
					'<div class="mfp-close"></div>'+
					'<iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe>'+
				'</div>',

		srcAction: 'iframe_src',

		// we don't care and support only one default type of URL by default
		patterns: {
			youtube: {
				index: 'youtube.com', 
				id: 'v=', 
				src: '//www.youtube.com/embed/%id%?autoplay=1'
			},
			vimeo: {
				index: 'vimeo.com/',
				id: '/',
				src: '//player.vimeo.com/video/%id%?autoplay=1'
			},
			gmaps: {
				index: '//maps.google.',
				src: '%id%&output=embed'
			}
		}
	},

	proto: {
		initIframe: function() {
			mfp.types.push(IFRAME_NS);

			_mfpOn('BeforeChange', function(e, prevType, newType) {
				if(prevType !== newType) {
					if(prevType === IFRAME_NS) {
						_fixIframeBugs(); // iframe if removed
					} else if(newType === IFRAME_NS) {
						_fixIframeBugs(true); // iframe is showing
					} 
				}// else {
					// iframe source is switched, don't do anything
				//}
			});

			_mfpOn(CLOSE_EVENT + '.' + IFRAME_NS, function() {
				_fixIframeBugs();
			});
		},

		getIframe: function(item, template) {
			var embedSrc = item.src;
			var iframeSt = mfp.st.iframe;
				
			$.each(iframeSt.patterns, function() {
				if(embedSrc.indexOf( this.index ) > -1) {
					if(this.id) {
						if(typeof this.id === 'string') {
							embedSrc = embedSrc.substr(embedSrc.lastIndexOf(this.id)+this.id.length, embedSrc.length);
						} else {
							embedSrc = this.id.call( this, embedSrc );
						}
					}
					embedSrc = this.src.replace('%id%', embedSrc );
					return false; // break;
				}
			});
			
			var dataObj = {};
			if(iframeSt.srcAction) {
				dataObj[iframeSt.srcAction] = embedSrc;
			}
			mfp._parseMarkup(template, dataObj, item);

			mfp.updateStatus('ready');

			return template;
		}
	}
});



/*>>iframe*/

/*>>gallery*/
/**
 * Get looped index depending on number of slides
 */
var _getLoopedId = function(index) {
		var numSlides = mfp.items.length;
		if(index > numSlides - 1) {
			return index - numSlides;
		} else  if(index < 0) {
			return numSlides + index;
		}
		return index;
	},
	_replaceCurrTotal = function(text, curr, total) {
		return text.replace(/%curr%/gi, curr + 1).replace(/%total%/gi, total);
	};

$.magnificPopup.registerModule('gallery', {

	options: {
		enabled: false,
		arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
		preload: [0,2],
		navigateByImgClick: true,
		arrows: true,

		tPrev: 'Previous (Left arrow key)',
		tNext: 'Next (Right arrow key)',
		tCounter: '%curr% of %total%'
	},

	proto: {
		initGallery: function() {

			var gSt = mfp.st.gallery,
				ns = '.mfp-gallery',
				supportsFastClick = Boolean($.fn.mfpFastClick);

			mfp.direction = true; // true - next, false - prev
			
			if(!gSt || !gSt.enabled ) return false;

			_wrapClasses += ' mfp-gallery';

			_mfpOn(OPEN_EVENT+ns, function() {

				if(gSt.navigateByImgClick) {
					mfp.wrap.on('click'+ns, '.mfp-img', function() {
						if(mfp.items.length > 1) {
							mfp.next();
							return false;
						}
					});
				}

				_document.on('keydown'+ns, function(e) {
					if (e.keyCode === 37) {
						mfp.prev();
					} else if (e.keyCode === 39) {
						mfp.next();
					}
				});
			});

			_mfpOn('UpdateStatus'+ns, function(e, data) {
				if(data.text) {
					data.text = _replaceCurrTotal(data.text, mfp.currItem.index, mfp.items.length);
				}
			});

			_mfpOn(MARKUP_PARSE_EVENT+ns, function(e, element, values, item) {
				var l = mfp.items.length;
				values.counter = l > 1 ? _replaceCurrTotal(gSt.tCounter, item.index, l) : '';
			});

			_mfpOn('BuildControls' + ns, function() {
				if(mfp.items.length > 1 && gSt.arrows && !mfp.arrowLeft) {
					var markup = gSt.arrowMarkup,
						arrowLeft = mfp.arrowLeft = $( markup.replace(/%title%/gi, gSt.tPrev).replace(/%dir%/gi, 'left') ).addClass(PREVENT_CLOSE_CLASS),			
						arrowRight = mfp.arrowRight = $( markup.replace(/%title%/gi, gSt.tNext).replace(/%dir%/gi, 'right') ).addClass(PREVENT_CLOSE_CLASS);

					var eName = supportsFastClick ? 'mfpFastClick' : 'click';
					arrowLeft[eName](function() {
						mfp.prev();
					});			
					arrowRight[eName](function() {
						mfp.next();
					});	

					// Polyfill for :before and :after (adds elements with classes mfp-a and mfp-b)
					if(mfp.isIE7) {
						_getEl('b', arrowLeft[0], false, true);
						_getEl('a', arrowLeft[0], false, true);
						_getEl('b', arrowRight[0], false, true);
						_getEl('a', arrowRight[0], false, true);
					}

					mfp.container.append(arrowLeft.add(arrowRight));
				}
			});

			_mfpOn(CHANGE_EVENT+ns, function() {
				if(mfp._preloadTimeout) clearTimeout(mfp._preloadTimeout);

				mfp._preloadTimeout = setTimeout(function() {
					mfp.preloadNearbyImages();
					mfp._preloadTimeout = null;
				}, 16);		
			});


			_mfpOn(CLOSE_EVENT+ns, function() {
				_document.off(ns);
				mfp.wrap.off('click'+ns);
			
				if(mfp.arrowLeft && supportsFastClick) {
					mfp.arrowLeft.add(mfp.arrowRight).destroyMfpFastClick();
				}
				mfp.arrowRight = mfp.arrowLeft = null;
			});

		}, 
		next: function() {
			mfp.direction = true;
			mfp.index = _getLoopedId(mfp.index + 1);
			mfp.updateItemHTML();
		},
		prev: function() {
			mfp.direction = false;
			mfp.index = _getLoopedId(mfp.index - 1);
			mfp.updateItemHTML();
		},
		goTo: function(newIndex) {
			mfp.direction = (newIndex >= mfp.index);
			mfp.index = newIndex;
			mfp.updateItemHTML();
		},
		preloadNearbyImages: function() {
			var p = mfp.st.gallery.preload,
				preloadBefore = Math.min(p[0], mfp.items.length),
				preloadAfter = Math.min(p[1], mfp.items.length),
				i;

			for(i = 1; i <= (mfp.direction ? preloadAfter : preloadBefore); i++) {
				mfp._preloadItem(mfp.index+i);
			}
			for(i = 1; i <= (mfp.direction ? preloadBefore : preloadAfter); i++) {
				mfp._preloadItem(mfp.index-i);
			}
		},
		_preloadItem: function(index) {
			index = _getLoopedId(index);

			if(mfp.items[index].preloaded) {
				return;
			}

			var item = mfp.items[index];
			if(!item.parsed) {
				item = mfp.parseEl( index );
			}

			_mfpTrigger('LazyLoad', item);

			if(item.type === 'image') {
				item.img = $('<img class="mfp-img" />').on('load.mfploader', function() {
					item.hasSize = true;
				}).on('error.mfploader', function() {
					item.hasSize = true;
					item.loadError = true;
					_mfpTrigger('LazyLoadError', item);
				}).attr('src', item.src);
			}


			item.preloaded = true;
		}
	}
});

/*
Touch Support that might be implemented some day

addSwipeGesture: function() {
	var startX,
		moved,
		multipleTouches;

		return;

	var namespace = '.mfp',
		addEventNames = function(pref, down, move, up, cancel) {
			mfp._tStart = pref + down + namespace;
			mfp._tMove = pref + move + namespace;
			mfp._tEnd = pref + up + namespace;
			mfp._tCancel = pref + cancel + namespace;
		};

	if(window.navigator.msPointerEnabled) {
		addEventNames('MSPointer', 'Down', 'Move', 'Up', 'Cancel');
	} else if('ontouchstart' in window) {
		addEventNames('touch', 'start', 'move', 'end', 'cancel');
	} else {
		return;
	}
	_window.on(mfp._tStart, function(e) {
		var oE = e.originalEvent;
		multipleTouches = moved = false;
		startX = oE.pageX || oE.changedTouches[0].pageX;
	}).on(mfp._tMove, function(e) {
		if(e.originalEvent.touches.length > 1) {
			multipleTouches = e.originalEvent.touches.length;
		} else {
			//e.preventDefault();
			moved = true;
		}
	}).on(mfp._tEnd + ' ' + mfp._tCancel, function(e) {
		if(moved && !multipleTouches) {
			var oE = e.originalEvent,
				diff = startX - (oE.pageX || oE.changedTouches[0].pageX);

			if(diff > 20) {
				mfp.next();
			} else if(diff < -20) {
				mfp.prev();
			}
		}
	});
},
*/


/*>>gallery*/



/*>>fastclick*/
/**
 * FastClick event implementation. (removes 300ms delay on touch devices)
 * Based on https://developers.google.com/mobile/articles/fast_buttons
 *
 * You may use it outside the Magnific Popup by calling just:
 *
 * $('.your-el').mfpFastClick(function() {
 *     console.log('Clicked!');
 * });
 *
 * To unbind:
 * $('.your-el').destroyMfpFastClick();
 * 
 * 
 * Note that it's a very basic and simple implementation, it blocks ghost click on the same element where it was bound.
 * If you need something more advanced, use plugin by FT Labs https://github.com/ftlabs/fastclick
 * 
 */

(function() {
	var ghostClickDelay = 1000,
		supportsTouch = 'ontouchstart' in window,
		unbindTouchMove = function() {
			_window.off('touchmove'+ns+' touchend'+ns);
		},
		eName = 'mfpFastClick',
		ns = '.'+eName;


	// As Zepto.js doesn't have an easy way to add custom events (like jQuery), so we implement it in this way
	$.fn.mfpFastClick = function(callback) {

		return $(this).each(function() {

			var elem = $(this),
				lock;

			if( supportsTouch ) {

				var timeout,
					startX,
					startY,
					pointerMoved,
					point,
					numPointers;

				elem.on('touchstart' + ns, function(e) {
					pointerMoved = false;
					numPointers = 1;

					point = e.originalEvent ? e.originalEvent.touches[0] : e.touches[0];
					startX = point.clientX;
					startY = point.clientY;

					_window.on('touchmove'+ns, function(e) {
						point = e.originalEvent ? e.originalEvent.touches : e.touches;
						numPointers = point.length;
						point = point[0];
						if (Math.abs(point.clientX - startX) > 10 ||
							Math.abs(point.clientY - startY) > 10) {
							pointerMoved = true;
							unbindTouchMove();
						}
					}).on('touchend'+ns, function(e) {
						unbindTouchMove();
						if(pointerMoved || numPointers > 1) {
							return;
						}
						lock = true;
						e.preventDefault();
						clearTimeout(timeout);
						timeout = setTimeout(function() {
							lock = false;
						}, ghostClickDelay);
						callback();
					});
				});

			}

			elem.on('click' + ns, function() {
				if(!lock) {
					callback();
				}
			});
		});
	};

	$.fn.destroyMfpFastClick = function() {
		$(this).off('touchstart' + ns + ' click' + ns);
		if(supportsTouch) _window.off('touchmove'+ns+' touchend'+ns);
	};
})();

/*>>fastclick*/
 _checkInstance(); }));

 
 (function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Share = f()}})(function(){var define,module,exports;
function getStyles(config){ return ""+config.selector+" .social.bottom,"+config.selector+" .social.top{-webkit-transform-origin:0 0;-moz-transform-origin:0 0;-o-transform-origin:0 0}"+config.selector+"{width:92px;height:20px;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}"+config.selector+" [class*=entypo-]:before{font-family:entypo,sans-serif}"+config.selector+" label{font-size:16px;cursor:pointer;margin:0;padding:5px 10px;border-radius:5px;background:#a29baa;color:#333;transition:all .3s ease}"+config.selector+" label:hover{opacity:.8}"+config.selector+" label span{text-transform:uppercase;font-size:.9em;font-family:Lato,sans-serif;font-weight:700;-webkit-font-smoothing:antialiased;padding-left:6px}"+config.selector+" .social{opacity:0;transition:all .4s ease;margin-left:-15px;visibility:hidden}"+config.selector+" .social.top{-ms-transform-origin:0 0;transform-origin:0 0;margin-top:-90px}"+config.selector+" .social.bottom{-ms-transform-origin:0 0;transform-origin:0 0;margin-top:5px}"+config.selector+" .social.middle.left,"+config.selector+" .social.middle.right{-ms-transform-origin:5% 50%;transform-origin:5% 50%;-webkit-transform-origin:5% 50%;-moz-transform-origin:5% 50%;-o-transform-origin:5% 50%}"+config.selector+" .social.middle{margin-top:-34px}"+config.selector+" .social.middle.right{margin-left:105px}"+config.selector+" .social.networks-1.center,"+config.selector+" .social.networks-1.left,"+config.selector+" .social.right{margin-left:14px}"+config.selector+" .social.load{transition:none!important}"+config.selector+" .social.networks-1{width:60px}"+config.selector+" .social.networks-1.middle.left{margin-left:-70px}"+config.selector+" .social.networks-1 ul{width:60px}"+config.selector+" .social.networks-2,"+config.selector+" .social.networks-2 ul{width:120px}"+config.selector+" .social.networks-2.center{margin-left:-13px}"+config.selector+" .social.networks-2.left{margin-left:-44px}"+config.selector+" .social.networks-2.middle.left{margin-left:-130px}"+config.selector+" .social.networks-3,"+config.selector+" .social.networks-3 ul{width:180px}"+config.selector+" .social.networks-3.center{margin-left:-45px}"+config.selector+" .social.networks-3.left{margin-left:-102px}"+config.selector+" .social.networks-3.middle.left{margin-left:-190px}"+config.selector+" .social.networks-4,"+config.selector+" .social.networks-4 ul{width:240px}"+config.selector+" .social.networks-4.center{margin-left:-75px}"+config.selector+" .social.networks-4.left{margin-left:162px}"+config.selector+" .social.networks-4.middle.left{margin-left:-250px}"+config.selector+" .social.networks-5,"+config.selector+" .social.networks-5 ul{width:300px}"+config.selector+" .social.networks-5.center{margin-left:-105px}"+config.selector+" .social.networks-5.left{margin-left:-225px}"+config.selector+" .social.networks-5.middle.left{margin-left:-320px}"+config.selector+" .social.active{opacity:1;transition:all .4s ease;visibility:visible}"+config.selector+" .social.active.top{-webkit-transform:scale(1)translateY(-10px);-moz-transform:scale(1)translateY(-10px);-o-transform:scale(1)translateY(-10px);-ms-transform:scale(1)translateY(-10px);transform:scale(1)translateY(-10px)}"+config.selector+" .social.active.bottom{-webkit-transform:scale(1)translateY(15px);-moz-transform:scale(1)translateY(15px);-o-transform:scale(1)translateY(15px);-ms-transform:scale(1)translateY(15px);transform:scale(1)translateY(15px)}"+config.selector+" .social.active.middle.right{-webkit-transform:scale(1)translateX(10px);-moz-transform:scale(1)translateX(10px);-o-transform:scale(1)translateX(10px);-ms-transform:scale(1)translateX(10px);transform:scale(1)translateX(10px)}"+config.selector+" .social.active.middle.left{-webkit-transform:scale(1)translateX(-10px);-moz-transform:scale(1)translateX(-10px);-o-transform:scale(1)translateX(-10px);-ms-transform:scale(1)translateX(-10px);transform:scale(1)translateX(-10px)}"+config.selector+" .social ul{position:relative;left:0;right:0;height:46px;color:#fff;margin:auto;padding:0;list-style:none}"+config.selector+" .social ul li{font-size:20px;cursor:pointer;width:60px;margin:0;padding:12px 0;text-align:center;float:left;display:none;height:22px;position:relative;z-index:2;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;transition:all .3s ease}"+config.selector+" .social ul li:hover{color:rgba(0,0,0,.5)}"+config.selector+" .social li[class*=facebook]{background:#3b5998;display:"+config.networks.facebook.display+"}"+config.selector+" .social li[class*=twitter]{background:#6cdfea;display:"+config.networks.twitter.display+"}"+config.selector+" .social li[class*=gplus]{background:#e34429;display:"+config.networks.google_plus.display+"}"+config.selector+" .social li[class*=pinterest]{background:#c5282f;display:"+config.networks.pinterest.display+"}"+config.selector+" .social li[class*=paper-plane]{background:#42c5b0;display:"+config.networks.email.display+"}"};var ShareUtils;

if ((!("classList" in document.documentElement)) && Object.defineProperty && typeof HTMLElement !== "undefined") {
  Object.defineProperty(HTMLElement.prototype, "classList", {
    get: function() {
      var ret, self, update;
      update = function(fn) {
        return function(value) {
          var classes, index;
          classes = self.className.split(/\s+/);
          index = classes.indexOf(value);
          fn(classes, index, value);
          self.className = classes.join(" ");
        };
      };
      self = this;
      ret = {
        add: update(function(classes, index, value) {
          ~index || classes.push(value);
        }),
        remove: update(function(classes, index) {
          ~index && classes.splice(index, 1);
        }),
        toggle: update(function(classes, index, value) {
          if (~index) {
            classes.splice(index, 1);
          } else {
            classes.push(value);
          }
        }),
        contains: function(value) {
          return !!~self.className.split(/\s+/).indexOf(value);
        },
        item: function(i) {
          return self.className.split(/\s+/)[i] || null;
        }
      };
      Object.defineProperty(ret, "length", {
        get: function() {
          return self.className.split(/\s+/).length;
        }
      });
      return ret;
    }
  });
}

String.prototype.to_rfc3986 = function() {
  var tmp;
  tmp = encodeURIComponent(this);
  return tmp.replace(/[!'()*]/g, function(c) {
    return "%" + c.charCodeAt(0).toString(16);
  });
};

ShareUtils = (function() {
  function ShareUtils() {}

  ShareUtils.prototype.extend = function(to, from, overwrite) {
    var hasProp, prop;
    for (prop in from) {
      hasProp = to[prop] !== undefined;
      if (hasProp && typeof from[prop] === "object") {
        this.extend(to[prop], from[prop], overwrite);
      } else {
        if (overwrite || !hasProp) {
          to[prop] = from[prop];
        }
      }
    }
  };

  ShareUtils.prototype.hide = function(el) {
    return el.style.display = "none";
  };

  ShareUtils.prototype.show = function(el) {
    return el.style.display = "block";
  };

  ShareUtils.prototype.has_class = function(el, class_name) {
    return el.classList.contains(class_name);
  };

  ShareUtils.prototype.add_class = function(el, class_name) {
    return el.classList.add(class_name);
  };

  ShareUtils.prototype.remove_class = function(el, class_name) {
    return el.classList.remove(class_name);
  };

  ShareUtils.prototype.is_encoded = function(str) {
    str = str.to_rfc3986();
    return decodeURIComponent(str) !== str;
  };

  ShareUtils.prototype.encode = function(str) {
    if (typeof str === "undefined" || this.is_encoded(str)) {
      return str;
    } else {
      return str.to_rfc3986();
    }
  };

  ShareUtils.prototype.popup = function(url, params) {
    var k, popup, qs, v;
    if (params == null) {
      params = {};
    }
    popup = {
      width: 500,
      height: 350
    };
    popup.top = (screen.height / 2) - (popup.height / 2);
    popup.left = (screen.width / 2) - (popup.width / 2);
    qs = ((function() {
      var results;
      results = [];
      for (k in params) {
        v = params[k];
        results.push(k + "=" + (this.encode(v)));
      }
      return results;
    }).call(this)).join('&');
    if (qs) {
      qs = "?" + qs;
    }
    return window.open(url + qs, 'targetWindow', "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,left=" + popup.left + ",top=" + popup.top + ",width=" + popup.width + ",height=" + popup.height);
  };

  return ShareUtils;

})();
var Share,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Share = (function(superClass) {
  extend(Share, superClass);

  function Share(element1, options) {
    this.element = element1;
    this.el = {
      head: document.getElementsByTagName('head')[0],
      body: document.getElementsByTagName('body')[0]
    };
    this.config = {
      enabled_networks: 0,
      protocol: ['http', 'https'].indexOf(window.location.href.split(':')[0]) === -1 ? 'https://' : '//',
      url: window.location.href,
      caption: null,
      title: this.default_title(),
      image: this.default_image(),
      description: this.default_description(),
      ui: {
        flyout: 'top center',
        button_text: 'Share',
        button_font: true,
        icon_font: true
      },
      networks: {
        google_plus: {
          enabled: true,
          url: null
        },
        twitter: {
          enabled: true,
          url: null,
          description: null
        },
        facebook: {
          enabled: true,
          load_sdk: true,
          url: null,
          app_id: null,
          title: null,
          caption: null,
          description: null,
          image: null
        },
        pinterest: {
          enabled: true,
          url: null,
          image: null,
          description: null
        },
        email: {
          enabled: true,
          title: null,
          description: null
        }
      }
    };
    this.setup(this.element, options);
    return this;
  }

  Share.prototype.setup = function(element, opts) {
    var i, index, instance, instances, len;
    instances = document.querySelectorAll(element);
    this.extend(this.config, opts, true);
    this.set_global_configuration();
    this.normalize_network_configuration();
    if (this.config.ui.icon_font) {
      this.inject_icons();
    }
    if (this.config.ui.button_font) {
      this.inject_fonts();
    }
    if (this.config.networks.facebook.enabled && this.config.networks.facebook.load_sdk) {
      this.inject_facebook_sdk();
    }
    for (index = i = 0, len = instances.length; i < len; index = ++i) {
      instance = instances[index];
      this.setup_instance(element, index);
    }
  };

  Share.prototype.setup_instance = function(element, index) {
    var _this, button, i, instance, label, len, network, networks, results;
    instance = document.querySelectorAll(element)[index];
    this.hide(instance);
    this.add_class(instance, "sharer-" + index);
    instance = document.querySelectorAll(element)[index];
    this.inject_css(instance);
    this.inject_html(instance);
    this.show(instance);
    label = instance.getElementsByTagName("label")[0];
    button = instance.getElementsByClassName("social")[0];
    networks = instance.getElementsByTagName('li');
    this.add_class(button, "networks-" + this.config.enabled_networks);
    label.addEventListener("click", (function(_this) {
      return function() {
        return _this.event_toggle(button);
      };
    })(this));
    _this = this;
    results = [];
    for (index = i = 0, len = networks.length; i < len; index = ++i) {
      network = networks[index];
      results.push(network.addEventListener("click", function() {
        _this.event_network(instance, this);
        return _this.event_close(button);
      }));
    }
    return results;
  };

  Share.prototype.event_toggle = function(button) {
    if (this.has_class(button, "active")) {
      return this.event_close(button);
    } else {
      return this.event_open(button);
    }
  };

  Share.prototype.event_open = function(button) {
    if (this.has_class(button, "load")) {
      this.remove_class(button, "load");
    }
    return this.add_class(button, "active");
  };

  Share.prototype.event_close = function(button) {
    return this.remove_class(button, "active");
  };

  Share.prototype.event_network = function(instance, network) {
    var name;
    name = network.getAttribute("data-network");
    this.hook("before", name, instance);
    this["network_" + name]();
    return this.hook("after", name, instance);
  };

  Share.prototype.open = function() {
    return this["public"]("open");
  };

  Share.prototype.close = function() {
    return this["public"]("close");
  };

  Share.prototype.toggle = function() {
    return this["public"]("toggle");
  };

  Share.prototype["public"] = function(action) {
    var button, i, index, instance, len, ref, results;
    ref = document.querySelectorAll(this.element);
    results = [];
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      instance = ref[index];
      button = instance.getElementsByClassName("social")[0];
      results.push(this["event_" + action](button));
    }
    return results;
  };

  Share.prototype.network_facebook = function() {
    if (this.config.networks.facebook.load_sdk) {
      if (!window.FB) {
        return console.error("The Facebook JS SDK hasn't loaded yet.");
      }
      return FB.ui({
        method: 'feed',
        name: this.config.networks.facebook.title,
        link: this.config.networks.facebook.url,
        picture: this.config.networks.facebook.image,
        caption: this.config.networks.facebook.caption,
        description: this.config.networks.facebook.description
      });
    } else {
      return this.popup('https://www.facebook.com/sharer/sharer.php', {
        u: this.config.networks.facebook.url
      });
    }
  };

  Share.prototype.network_twitter = function() {
    return this.popup('https://twitter.com/intent/tweet', {
      text: this.config.networks.twitter.description,
      url: this.config.networks.twitter.url
    });
  };

  Share.prototype.network_google_plus = function() {
    return this.popup('https://plus.google.com/share', {
      url: this.config.networks.google_plus.url
    });
  };

  Share.prototype.network_pinterest = function() {
    return this.popup('https://www.pinterest.com/pin/create/button', {
      url: this.config.networks.pinterest.url,
      media: this.config.networks.pinterest.image,
      description: this.config.networks.pinterest.description
    });
  };

  Share.prototype.network_email = function() {
    return this.popup('mailto:', {
      subject: this.config.networks.email.title,
      body: this.config.networks.email.description
    });
  };

  Share.prototype.inject_icons = function() {
    //return this.inject_stylesheet("https://www.sharebutton.co/fonts/v2/entypo.min.css");
  };

  Share.prototype.inject_fonts = function() {
    //return this.inject_stylesheet("https://fonts.googleapis.com/css?family=Lato:900&text=" + this.config.ui.button_text);
  };

  Share.prototype.inject_stylesheet = function(url) {
    var link;
    if (!this.el.head.querySelector("link[href=\"" + url + "\"]")) {
      link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("href", url);
      return this.el.head.appendChild(link);
    }
  };

  Share.prototype.inject_css = function(instance) {
    var css, meta, selector, style;
    selector = "." + (instance.getAttribute('class').split(" ").join("."));
    if (!this.el.head.querySelector("meta[name='sharer" + selector + "']")) {
      this.config.selector = selector;
      css = getStyles(this.config);
      style = document.createElement("style");
      style.type = "text/css";
      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
      this.el.head.appendChild(style);
      delete this.config.selector;
      meta = document.createElement("meta");
      meta.setAttribute("name", "sharer" + selector);
      return this.el.head.appendChild(meta);
    }
  };

  Share.prototype.inject_html = function(instance) {
    return instance.innerHTML = "<label class='entypo-export'><span>" + this.config.ui.button_text + "</span></label><div class='social load " + this.config.ui.flyout + "'><ul><li class='entypo-pinterest' data-network='pinterest'><i class='fa fa-pinterest fa-lg'></i></li><li class='entypo-twitter' data-network='twitter'><i class='fa fa-twitter fa-lg'></i></li><li class='entypo-facebook' data-network='facebook'><i class='fa fa-facebook fa-lg'></i></li><li class='entypo-gplus' data-network='google_plus'><i class='fa fa-google-plus fa-lg'></i></li><li class='entypo-paper-plane' data-network='email'><i class='fa fa-envelope-o fa-lg'></i></li></ul></div>";
  };

  Share.prototype.inject_facebook_sdk = function() {
    var fb_root, script;
    if (!window.FB && this.config.networks.facebook.app_id && !this.el.body.querySelector('#fb-root')) {
      script = document.createElement("script");
      script.text = "window.fbAsyncInit=function(){FB.init({appId:'" + this.config.networks.facebook.app_id + "',status:true,xfbml:true})};(function(e,t,n){var r,i=e.getElementsByTagName(t)[0];if(e.getElementById(n)){return}r=e.createElement(t);r.id=n;r.src='" + this.config.protocol + "connect.facebook.net/en_US/all.js';i.parentNode.insertBefore(r,i)})(document,'script','facebook-jssdk')";
      fb_root = document.createElement("div");
      fb_root.id = "fb-root";
      this.el.body.appendChild(fb_root);
      return this.el.body.appendChild(script);
    }
  };

  Share.prototype.hook = function(type, network, instance) {
    var fn, opts;
    fn = this.config.networks[network][type];
    if (typeof fn === "function") {
      opts = fn.call(this.config.networks[network], instance);
      if (opts !== void 0) {
        opts = this.normalize_filter_config_updates(opts);
        this.extend(this.config.networks[network], opts, true);
        this.normalize_network_configuration();
      }
    }
  };

  Share.prototype.default_title = function() {
    var content;
    if (content = document.querySelector('meta[property="og:title"]') || document.querySelector('meta[name="twitter:title"]')) {
      return content.getAttribute('content');
    } else if (content = document.querySelector('title')) {
      return content.innerText;
    }
  };

  Share.prototype.default_image = function() {
    var content;
    if (content = document.querySelector('meta[property="og:image"]') || document.querySelector('meta[name="twitter:image"]')) {
      return content.getAttribute('content');
    }
  };

  Share.prototype.default_description = function() {
    var content;
    if (content = document.querySelector('meta[property="og:description"]') || document.querySelector('meta[name="twitter:description"]') || document.querySelector('meta[name="description"]')) {
      return content.getAttribute('content');
    } else {
      return '';
    }
  };

  Share.prototype.set_global_configuration = function() {
    var display, network, option, options, ref, results;
    ref = this.config.networks;
    results = [];
    for (network in ref) {
      options = ref[network];
      for (option in options) {
        if (this.config.networks[network][option] == null) {
          this.config.networks[network][option] = this.config[option];
        }
      }
      if (this.config.networks[network].enabled) {
        display = 'block';
        this.config.enabled_networks += 1;
      } else {
        display = 'none';
      }
      results.push(this.config.networks[network].display = display);
    }
    return results;
  };

  Share.prototype.normalize_network_configuration = function() {
    if (!this.config.networks.facebook.app_id) {
      this.config.networks.facebook.load_sdk = false;
    }
    if (!this.is_encoded(this.config.networks.twitter.description)) {
      this.config.networks.twitter.description = encodeURIComponent(this.config.networks.twitter.description);
    }
    if (typeof this.config.networks.facebook.app_id === 'number') {
      return this.config.networks.facebook.app_id = this.config.networks.facebook.app_id.toString();
    }
  };

  Share.prototype.normalize_filter_config_updates = function(opts) {
    if (this.config.networks.facebook.app_id !== opts.app_id) {
      console.warn("You are unable to change the Facebook app_id after the button has been initialized. Please update your Facebook filters accordingly.");
      delete opts.app_id;
    }
    if (this.config.networks.facebook.load_sdk !== opts.load_sdk) {
      console.warn("You are unable to change the Facebook load_sdk option after the button has been initialized. Please update your Facebook filters accordingly.");
      delete opts.app_id;
    }
    return opts;
  };

  return Share;

})(ShareUtils);
 return Share;
});


//Youmax 9.0 - http://codecanyon.net/item/youmax-youtube-channel-on-your-website/9989505

var youmaxLoggedInUser = {};
var layoutResizeTimer;
var $youmaxGrid;

(function ($) {
	
	//get videos of any playlist using youtube API
	var getPlaylistVideos = function (playlistId,pageToken,$youmaxContainer) {
		//console.log('inside getPlaylistVideos');
		var pageTokenUrl = "";
		var loadMoreFlag = false;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var apiKey = youmax_global_options.apiKey;
		var maxResults = youmax_global_options.maxResults;
		//console.log('getPlaylistVideos pageToken-'+pageToken);
		if(null!=pageToken) {
			pageTokenUrl = "&pageToken="+pageToken;
			loadMoreFlag = true;
		}
		apiPlaylistVideosURL = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId="+playlistId+"&maxResults="+maxResults+pageTokenUrl+"&key="+apiKey;
		
		//console.log('getPlaylistVideos apiPlaylistVideosURL-'+apiPlaylistVideosURL);
		
		$.ajax({
			url: apiPlaylistVideosURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) { insertPlaylistVideos(response,loadMoreFlag,$youmaxContainer);},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
	},

	//get videos of Vimeo User
	getVimeoUserVideos = function (userId,pageToken,$youmaxContainer) {
		//console.log('inside getVimeoVideos');
		var pageTokenUrl = "";
		var loadMoreFlag = false;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var maxResults = youmax_global_options.maxResults;
		//console.log('getVimeoUserVideos pageToken-'+pageToken);
		if(null!=pageToken) {
			pageTokenUrl = "&"+pageToken;
			loadMoreFlag = true;
		}
		
		//userId = tabId.substring(tabId.indexOf("_")+1);
		//console.log("userId-"+userId);
		
		apiVimeoVideosURL = "https://api.vimeo.com/users/"+userId+"/videos?access_token="+youmax_global_options.vimeoAccessToken+"&per_page="+maxResults+pageTokenUrl;
		
		//console.log('getVimeoUserVideos apiVimeoVideosURL-'+apiVimeoVideosURL);
		
		$.ajax({
			url: apiVimeoVideosURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'json',
			success: function(response) { insertVimeoVideos(response,loadMoreFlag,$youmaxContainer);},
			error: function(html) { alert(html); 
				//console.log(html);
			},
			beforeSend: setHeader
		});
	},

	//get videos of Vimeo User
	getVimeoChannelVideos = function (channelId,pageToken,$youmaxContainer) {
		//console.log('inside getVimeoVideos');
		var pageTokenUrl = "";
		var loadMoreFlag = false;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var maxResults = youmax_global_options.maxResults;
		//console.log('getVimeoUserVideos pageToken-'+pageToken);
		if(null!=pageToken) {
			pageTokenUrl = "&"+pageToken;
			loadMoreFlag = true;
		}
		
		//console.log("channelId-"+channelId);
		
		apiVimeoVideosURL = "https://api.vimeo.com/channels/"+channelId+"/videos?access_token="+youmax_global_options.vimeoAccessToken+"&per_page="+maxResults+pageTokenUrl;
		
		//console.log('getVimeoUserVideos apiVimeoVideosURL-'+apiVimeoVideosURL);
		
		$.ajax({
			url: apiVimeoVideosURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'json',
			success: function(response) { insertVimeoVideos(response,loadMoreFlag,$youmaxContainer);},
			error: function(html) { alert(html); 
				//console.log(html);
			},
			beforeSend: setHeader
		});
	},

	
	//get videos of Vimeo Group
	getVimeoGroupVideos = function (groupId,pageToken,$youmaxContainer) {
		//console.log('inside getVimeoGroupVideos');
		var pageTokenUrl = "";
		var loadMoreFlag = false;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var maxResults = youmax_global_options.maxResults;
		//console.log('getVimeoUserVideos pageToken-'+pageToken);
		if(null!=pageToken) {
			pageTokenUrl = "&"+pageToken;
			loadMoreFlag = true;
		}
		
		//console.log("groupId-"+groupId);
		
		apiVimeoVideosURL = "https://api.vimeo.com/groups/"+groupId+"/videos?access_token="+youmax_global_options.vimeoAccessToken+"&per_page="+maxResults+pageTokenUrl;
		
		//console.log('getVimeoUserVideos apiVimeoVideosURL-'+apiVimeoVideosURL);
		
		$.ajax({
			url: apiVimeoVideosURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'json',
			success: function(response) { insertVimeoVideos(response,loadMoreFlag,$youmaxContainer);},
			error: function(html) { alert(html); 
				//console.log(html);
			},
			beforeSend: setHeader
		});
	},
	

	//get videos of Vimeo Album
	getVimeoAlbumVideos = function (albumId,pageToken,$youmaxContainer) {
		//console.log('inside getVimeoAlbumVideos');
		var pageTokenUrl = "";
		var loadMoreFlag = false;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var maxResults = youmax_global_options.maxResults;
		//console.log('getVimeoUserVideos pageToken-'+pageToken);
		if(null!=pageToken) {
			pageTokenUrl = "&"+pageToken;
			loadMoreFlag = true;
		}
		
		//console.log("albumId-"+albumId);
		
		apiVimeoVideosURL = "https://api.vimeo.com/albums/"+albumId+"/videos?access_token="+youmax_global_options.vimeoAccessToken+"&per_page="+maxResults+pageTokenUrl;
		
		//console.log('getVimeoUserVideos apiVimeoVideosURL-'+apiVimeoVideosURL);
		
		$.ajax({
			url: apiVimeoVideosURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'json',
			success: function(response) { insertVimeoVideos(response,loadMoreFlag,$youmaxContainer);},
			error: function(html) { alert(html); 
				//console.log(html);
			},
			beforeSend: setHeader
		});
	},
	

	
	
	//get videos of any playlist using youtube API
	getChannelEvents = function (channelId,pageToken,$youmaxContainer) {
		//console.log('inside getChannelEvents');
		var pageTokenUrl = "";
		var loadMoreFlag = false;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var apiKey = youmax_global_options.apiKey;
		var maxResults = youmax_global_options.maxResults;
		//console.log('getPlaylistVideos pageToken-'+pageToken);
		if(null!=pageToken) {
			pageTokenUrl = "&pageToken="+pageToken;
			loadMoreFlag = true;
		}
		
		//var channelId = playlistTabId.substring(playlistTabId.indexOf("_")+1);
		
		if(!loadMoreFlag) {
			//first load will club a single response of live, upcoming and completed events
			//load more will show only completed events
			eventCache = {
				items : [],
				nextPageToken : "youmax-generated"
			};
			eventCacheStatus = [];
			$youmaxContainer.data('eventcache',eventCache);
			$youmaxContainer.data('eventcachestatus',eventCacheStatus);
			
			//live events
			apiEventVideosURL = "https://www.googleapis.com/youtube/v3/search?part=snippet"+"&eventType=live&order=date"+"&channelId="+channelId+"&type=video&maxResults=50&key="+apiKey;
			
			$.ajax({
				url: apiEventVideosURL,
				type: "GET",
				async: true,
				cache: true,
				dataType: 'jsonp',
				success: function(response) {
					eventCacheCollector(response,$youmaxContainer,"live");
					//insertSearchVideos(response,$youmaxContainer,false,true);
				},
				error: function(html) { alert(html); },
				beforeSend: setHeader
			});
			
			setTimeout(function(){

				//upcoming events
				apiEventVideosURL = "https://www.googleapis.com/youtube/v3/search?part=snippet"+"&eventType=upcoming&order=date"+"&channelId="+channelId+"&type=video&maxResults=50&key="+apiKey;
				
				$.ajax({
					url: apiEventVideosURL,
					type: "GET",
					async: true,
					cache: true,
					dataType: 'jsonp',
					success: function(response) { 
						eventCacheCollector(response,$youmaxContainer,"upcoming");
						//insertSearchVideos(response,$youmaxContainer,false,true);
					},
					error: function(html) { alert(html); },
					beforeSend: setHeader
				});
			
			}, 200);
			
			setTimeout(function(){
				
				if(youmax_global_options.loadMode.indexOf("paginate")!=-1) {
					maxResults = 50;
				}
				
				//completed events
				apiEventVideosURL = "https://www.googleapis.com/youtube/v3/search?part=snippet"+"&eventType=completed&order=date"+"&channelId="+channelId+"&type=video&maxResults="+maxResults+"&key="+apiKey;
				
				$.ajax({
					url: apiEventVideosURL,
					type: "GET",
					async: true,
					cache: true,
					dataType: 'jsonp',
					success: function(response) { 
						eventCacheCollector(response,$youmaxContainer,"completed");
						//insertSearchVideos(response,$youmaxContainer,false,true);
					},
					error: function(html) { alert(html); },
					beforeSend: setHeader
				});
				
			}, 400);
			
			
		} else {
	
			//completed events for load more
			apiEventVideosURL = "https://www.googleapis.com/youtube/v3/search?part=snippet"+"&eventType=completed&order=date"+"&channelId="+channelId+"&type=video&maxResults="+maxResults+pageTokenUrl+"&key="+apiKey;
			
			$.ajax({
				url: apiEventVideosURL,
				type: "GET",
				async: true,
				cache: true,
				dataType: 'jsonp',
				success: function(response) { insertSearchVideos(response,$youmaxContainer,false,true,loadMoreFlag);},
				error: function(html) { alert(html); },
				beforeSend: setHeader
			});
			
		}
	},
	
	eventCacheCollector = function(response,$youmaxContainer,eventType) {
		
		//console.log("tripleResponseCollector");
		//console.log(response);
		//console.log(eventCache);
		
		
		eventCache = $youmaxContainer.data('eventcache');
		eventCacheStatus = $youmaxContainer.data('eventcachestatus');

		
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		
		if(null!=response.items && response.items.length > 0) {
			eventCache.items = eventCache.items.concat(response.items);
		}
		
		if(eventType=="completed") {
			eventCache.nextPageToken = response.nextPageToken;
		}
		
		eventCacheStatus.push(eventType);
		
		if(eventCacheStatus.length>=3 && eventCacheStatus.indexOf("live")!=-1 && eventCacheStatus.indexOf("upcoming")!=-1 && eventCacheStatus.indexOf("completed")!=-1 ) {
			if(youmax_global_options.loadMode.indexOf("paginate")!=-1) {
				//console.log(eventCache.items);
				//pagination
				cache = eventCache.items;
				cacheIndex = -1-youmax_global_options.maxResults;
				$youmaxContainer.data('cache',cache);
				$youmaxContainer.data('cacheindex',cacheIndex);
				$youmaxContainer.find('#youmax-next-div').data('nextpagetoken',eventCache.nextPageToken);
				//handlePagination($youmaxContainer,"next");
				paginationWrapper($youmaxContainer,"next");
			} else {
				//load more
				insertSearchVideos(eventCache,$youmaxContainer,false,true);
			}
		}
		
		$youmaxContainer.data('eventcache',eventCache);
		$youmaxContainer.data('eventcachestatus',eventCacheStatus);
	
	},
	
	//get video stats using Youtube API
	getYoutubeVideoDetails = function (videoId,$youmaxContainer,scrollToVideo,generateLink) {
		//console.log('inside getVideoDetails');
		//console.log(videoId);
		//showLoader();
		

		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = $youmaxContainer.data("youmax_translator_text");

		apiVideoDetailURL = "https://www.googleapis.com/youtube/v3/videos?part=statistics%2Csnippet&id="+videoId+"&key="+youmax_global_options.apiKey;
		
		//console.log("apiVideoDetailURL-"+apiVideoDetailURL);
		
		$.ajax({
			url: apiVideoDetailURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) { 
				//console.log(response);
				$baseElement = $('<div id="youtube_'+videoId+'"><div class="youmax-video-list-title">'+response.items[0].snippet.title+'</div><div class="youmax-video-list-date">'+getDateDiff(response.items[0].snippet.publishedAt,youmax_translator_text)+'</div></div>');
				$baseElement.data('description',response.items[0].snippet.description);
				$baseElement.data('likes',convertLikeCommentCount(response.items[0].statistics.likeCount));
				$baseElement.data('views',convertViewCountForThumbnail(response.items[0].statistics.viewCount));
				$baseElement.data('channelid',response.items[0].snippet.channelId);
				displayInlineVideo($baseElement,scrollToVideo,generateLink,$youmaxContainer);
			},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
	},

	
	
	//get video stats using Youtube API
	getVimeoVideoDetails = function (videoId,$youmaxContainer,scrollToVideo,generateLink) {
		//console.log('inside getVimeoVideoDetails');
		//console.log(videoId);
		//showLoader();
		

		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = $youmaxContainer.data("youmax_translator_text");

		apiVideoDetailURL = "https://api.vimeo.com/videos/"+videoId+"?access_token="+youmax_global_options.vimeoAccessToken;
		
		//console.log("apiVideoDetailURL-"+apiVideoDetailURL);
		
		$.ajax({
			url: apiVideoDetailURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'json',
			success: function(response) { 
				//console.log(response);
					
				videoDescription = response.description.replace(/"/g, "'");
				videoViewCount = response.stats.plays;
				if(null==videoViewCount) {
					videoViewCount="Private";
				} else {
					videoViewCount = convertViewCountForThumbnail(videoViewCount);
				}
				
				$baseElement = $('<div id="vimeo_'+videoId+'"><div class="youmax-video-list-title">'+response.name+'</div><div class="youmax-video-list-date">'+getDateDiff(response.created_time,youmax_translator_text)+'</div></div>');
				
				$baseElement.data('description',videoDescription);
				$baseElement.data('likes',convertLikeCommentCount(response.metadata.connections.likes.total));
				$baseElement.data('comments',convertLikeCommentCount(response.metadata.connections.comments.total));
				$baseElement.data('views',convertViewCountForThumbnail(videoViewCount));
				
				$baseElement.data('channelid','');
				displayInlineVideo($baseElement,scrollToVideo,generateLink,$youmaxContainer);
			},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
	},

	
	getYoutubeVideoComments = function (videoId,$youmaxContainer,pageToken) {
		//console.log('inside getVideoComments');
		var pageTokenUrl = "";
		var loadMoreFlag = false;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var apiKey = youmax_global_options.apiKey;
		var maxComments = youmax_global_options.maxComments;
		//console.log('getVideoComments pageToken-'+pageToken);
		if(null!=pageToken) {
			pageTokenUrl = "&pageToken="+pageToken;
			loadMoreFlag = true;
		}
		
		/*var startIndex = $youmaxContainer.find('.youmax-encloser-comment-button.youmax-more-button').data('start-index');
		if(startIndex>1) {
			loadMoreFlag = true;
		}*/
		
		apiVideoCommentsURL = "https://www.googleapis.com/youtube/v3/commentThreads?part=id%2Csnippet&videoId="+videoId+pageTokenUrl+"&maxResults="+maxComments+"&key="+apiKey+"&order="+youmax_global_options.commentOrder;
		
		//console.log('getVideoComments apiVideoCommentsURL-'+apiVideoCommentsURL);
		
		$.ajax({
			url: apiVideoCommentsURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) { insertVideoComments(response,loadMoreFlag,$youmaxContainer);},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
	},
	

	getVimeoVideoComments = function (videoId,$youmaxContainer,pageToken) {
		//console.log('inside getVideoComments');
		var pageTokenUrl = "";
		var loadMoreFlag = false;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var apiKey = youmax_global_options.apiKey;
		var maxComments = youmax_global_options.maxComments;
		//console.log('getVideoComments pageToken-'+pageToken);
		if(null!=pageToken) {
			pageTokenUrl = "&"+pageToken;
			loadMoreFlag = true;
		}
		
		/*var startIndex = $youmaxContainer.find('.youmax-encloser-comment-button.youmax-more-button').data('start-index');
		if(startIndex>1) {
			loadMoreFlag = true;
		}*/
		
		apiVideoCommentsURL = "https://api.vimeo.com/videos/"+videoId+"/comments?per_page="+maxComments+"&access_token="+youmax_global_options.vimeoAccessToken+"&sort=date"+pageTokenUrl;
		//youmax_global_options.commentOrder
		
		//console.log('getVideoComments apiVideoCommentsURL-'+apiVideoCommentsURL);
		
		$.ajax({
			url: apiVideoCommentsURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'json',
			success: function(response) { insertVimeoVideoComments(response,loadMoreFlag,$youmaxContainer);},
			error: function(html) { 
				alert(html); 
				//console.log(html);
			},
			beforeSend: setHeader
		});
	},
	
	
	//display youtube subscribe button
	renderSubscribeButton = function() {
	
		$.ajaxSetup({
		  cache: true
		});
		
		$.getScript("https://apis.google.com/js/platform.js")
		.done(function( script, textStatus ) {
			//alert( textStatus );
		})
		.fail(function( jqxhr, settings, exception ) {
			//alert( "Triggered ajaxError handler." );
		});
		

		
	},
	
	//get videos of any playlist using youtube API
	getChannelPlaylists = function (channelId,pageToken,$youmaxContainer) {
		//console.log('inside getPlaylistVideos');
		var pageTokenUrl = "";
		var loadMoreFlag = false;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var apiKey = youmax_global_options.apiKey;
		var maxResults = youmax_global_options.maxResults;
		//console.log('getPlaylistVideos pageToken-'+pageToken);
		if(null!=pageToken) {
			pageTokenUrl = "&pageToken="+pageToken;
			loadMoreFlag = true;
		}
		
		//save the last viewed playlist for back button
		$youmaxContainer.data('youmax_last_channel_playlists','youtube_channel_playlists_'+channelId);
		
		//var channelId = playlistTabId.substring(playlistTabId.indexOf("_")+1);
		apiChannelPlaylistsURL = "https://www.googleapis.com/youtube/v3/playlists?part=contentDetails,snippet&channelId="+channelId+"&maxResults="+maxResults+pageTokenUrl+"&key="+apiKey;
		
		//console.log('getPlaylistVideos apiChannelPlaylistsURL-'+apiChannelPlaylistsURL);
		
		$.ajax({
			url: apiChannelPlaylistsURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) { insertChannelPlaylists(response,loadMoreFlag,$youmaxContainer);},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
	},
	
	//initialize youamx - add necessary HTML code
	initYoumax = function($youmaxContainer) {
	
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		
		//Empty the container - ajax compatibility
		$youmaxContainer.empty();
		
		//header + added in 6.0 - search!!
		$youmaxContainer.append('<div id="youmax-header"><div id="youmax-header-wrapper"></div></div>');
		
		//tabs
		$youmaxContainer.append('<div id="youmax-tabs"></div>');
				
		//select
		$youmaxContainer.append('<div id="youmax-select-box"><select id="youmax-select"></select></div>');
		
		//top ad space
		if(youmax_global_options.showTopAdSpace) {
			//console.log("showing ad");
			//console.log($youmaxContainer.find('#youmax-top-ad'));
			//$youmaxTopAd =  $youmaxContainer.find('#youmax-top-ad').wrap('<div class="youmax-ad-space">');
			$youmaxContainer.append('<div class="youmax-ad-space">'+youmax_global_options.topAdHtml+'</div>');		
		}
		
		if(youmax_global_options.displayVideo != 'popup') {
			//encloser video
			//$youmaxContainer.append('<div id="youmax-encloser"><div class="fluid-width-video-wrapper" style="padding-top:'+(youmax_global_options.aspectRatio*100)+'%;"><iframe id="youmax-encloser-video" style="width:100%;" src="" frameborder="0" allowfullscreen></iframe></div><div id="youmax-encloser-comment-wrapper"><div id="photo-detail-holder"><div class="photo-popup-title"></div><div class="photo-popup-description"></div><div class="photo-popup-stats"><span class="media-views"></span><span class="media-likes"> </span><span class="media-uploaded"></span></div> <div class="youmax-show-button-wrapper"><div class="youmax-encloser-comment-button youmax-show-button youmax-popup-show-button">Show Comments</div></div> <div id="youmax-encloser-comment-holder" class="youmax-encloser-comment-holder-popup"><div class="youmax-video-comment youmax-commentbox-holder"><textarea class="youmax-comment-textbox" placeholder="Share your Thoughts..."></textarea><button type="button" class="youmax-add-comment-button"><i class="fa fa-sign-in fa-2x"></i></button><div type="button" class="youmax-share-video-button"><i class="fa fa-share fa-2x"></i></div></div><div id="youmax-encloser-comments"></div><div class="youmax-encloser-comment-button youmax-more-button">Load More Comments</div></div> </div> </div></div>');
			$youmaxContainer.append('<div id="youmax-encloser"></div>');

		}
		
		
		//showing playlist xxxx
		$youmaxContainer.append('<div id="youmax-showing-title"></div>');
		
		//list
		var videoListClass = "";
		if(youmax_global_options.loadMode=="paginate-sides") {
			videoListClass = "youmax-small-container";
		}		
		$youmaxContainer.append('<div id="youmax-video-list-div" class="'+videoListClass+'"><ul id="tiles"></ul></div>');

		var $youmaxLoadMoreDiv = null, $youmaxPreviousDiv = null, $youmaxNextDiv = null;
		var buttonClass = '';
		
		if(youmax_global_options.loadButtonSize=="small") {
			buttonClass = 'class="youmax-small"';
		}
		
		if(youmax_global_options.loadMode=="loadmore") {
			//load more
			$youmaxContainer.append('<button type="button" id="youmax-load-more-div" '+buttonClass+'></button>');
			$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
		} else if(youmax_global_options.loadMode=="paginate-bottom") {
			//pagination
			$youmaxContainer.append('<div class="youmax-pagination"><div class="youmax-pagination-button-wrapper youmax-left-wrapper"><button type="button" id="youmax-previous-div" '+buttonClass+'></button></div><div class="youmax-pagination-button-wrapper youmax-right-wrapper"><button type="button" id="youmax-next-div" '+buttonClass+'></button></div></div>');
			$youmaxNextDiv = $youmaxContainer.find('#youmax-next-div');
			$youmaxPreviousDiv = $youmaxContainer.find('#youmax-previous-div');
		}  else if(youmax_global_options.loadMode=="paginate-sides") {
			//pagination
			$youmaxContainer.append('<div class="youmax-pagination-button-wrapper youmax-left-wrapper youmax-side-nav"><button type="button" id="youmax-previous-div" '+buttonClass+'></button></div><div class="youmax-pagination-button-wrapper youmax-right-wrapper youmax-side-nav"><button type="button" id="youmax-next-div" '+buttonClass+'></button></div>');
			$youmaxNextDiv = $youmaxContainer.find('#youmax-next-div');
			$youmaxPreviousDiv = $youmaxContainer.find('#youmax-previous-div');
		} 
		
		resetLoadMoreButton($youmaxContainer);
		
		if(null!=$youmaxLoadMoreDiv) {
			$youmaxLoadMoreDiv.data('nextpagetoken','');
			$youmaxLoadMoreDiv.click(function(){
				loadMorePlaylistVideos($youmaxContainer);
			});
		}
		
		if(null!=$youmaxPreviousDiv) {
			$youmaxPreviousDiv.click(function(){
				paginationWrapper($youmaxContainer,"previous");
				//handlePagination($youmaxContainer,"previous");
			});
		}
		
		if(null!=$youmaxNextDiv) {
			$youmaxNextDiv.click(function(){
				paginationWrapper($youmaxContainer,"next");
				//handlePagination($youmaxContainer,"next");
			});
		}
		
		//$youmaxLoadMoreDiv.html('<i class="fa fa-plus fa-5x"></i>');
		
		
		$youmaxContainer.find('#youmax-tabs').on('click','.youmax-tab',function() {
			$youmaxContainer.find('#youmax-load-more-div').removeAttr('disabled');
			displayPlaylist(this.id,$youmaxContainer);
		});
		
		$youmaxContainer.find('#youmax-select').change(function() {
			var playlistId = $(this).find(":selected").val();
			displayPlaylist(playlistId,$youmaxContainer);
		});
		
		//5.0 - show comments
		/*$youmaxContainer.find('.youmax-encloser-comment-button.youmax-show-button').click(function(){
			displayComments(this.id,$youmaxContainer);
		});	
		$youmaxContainer.find('.youmax-encloser-comment-button.youmax-more-button').click(function(){
			loadMoreComments($youmaxContainer);
		});	*/
		
		if(youmax_global_options.displayVideo=="popup") {
			$youmaxPlayBox = $('body');
			$youmaxPlayBox.off('click','.youmax-show-button');
			$youmaxPlayBox.off('click','.youmax-add-comment-button');
		} else {
			$youmaxPlayBox = $youmaxContainer;
		}
		
		$youmaxPlayBox.on('click','.youmax-show-button',function(){
			displayComments(this.id,$youmaxContainer);
		});
		
		$youmaxPlayBox.on('click','.youmax-more-button',function(){
			loadMoreComments($youmaxContainer);
		});
		
		
		//console.log('init Google API');
		//load Google API for Login
		$.getScript("https://apis.google.com/js/client:platform.js").done(function(data, textStatus) {
			//console.log('Google API Loaded');
			$youmaxPlayBox.on('click','.youmax-add-comment-button',function(){
				handleComments(this,$youmaxContainer);
			});
			
		}).fail(function( jqxhr, settings, exception ) {
			//console.log( "Triggered ajaxError handler." );
		});
		
		//added in 6.0 
		$youmaxContainer.on('keyup','#youmax-search-box,#youmax-search-box-header', function (e) {
			if (e.keyCode == 13) {
				searchText = "query_" + $(this).val();
				displayPlaylist(searchText,$youmaxContainer);
				return false;
			}
		});
		
		//added in 7.0 - show stats on mouse hove for clean skin
		if(youmax_global_options.skin.indexOf("clean")!=-1) {
			$youmaxContainer.on('mouseenter','#tiles li',function(){
				$(this).find(".youmax-duration").show();
				$(this).find(".youmax-definition").show();
				$(this).find(".youmax-clean-overlay-holder").hide();
				//$(this).find(".youmax-playlist-video-count-wrapper").hide();
				//$(this).find(".youmax-clean-playlist-title").show();
			});

			$youmaxContainer.on('mouseleave','#tiles li',function(){
				$(this).find(".youmax-duration").hide();
				$(this).find(".youmax-definition").hide();
				$(this).find(".youmax-clean-overlay-holder").show();
				//$(this).find(".youmax-playlist-video-count-wrapper").show();
				//$(this).find(".youmax-clean-playlist-title").hide();
			});
		} else {
		
			//for all skins except clean - show play icon on thumbnails hover
			//also video display mode should not be thumbnail
			if (youmax_global_options.displayVideo!="thumbnail") {
				if(youmax_global_options.playIconType && youmax_global_options.playIconType!='default') {
					$youmaxContainer.on('mouseenter','.youmax-thumbnail-image-wrapper',function(){
						$(this).find(".youmax-play-overlay").addClass('youmax-play-hover');
					});

					$youmaxContainer.on('mouseleave','.youmax-thumbnail-image-wrapper',function(){
						$(this).find(".youmax-play-overlay").removeClass('youmax-play-hover');
					});
				} else {
					$youmaxContainer.on('mouseenter','.youmax-thumbnail-image-wrapper',function(){
						$(this).find(".youmax-play-overlay").show();
					});

					$youmaxContainer.on('mouseleave','.youmax-thumbnail-image-wrapper',function(){
						$(this).find(".youmax-play-overlay").hide();
					});
				}
			}

		}
		
		$youmaxContainer.on('click','#youmax-back-to-playlists',function(){
			//alert('back');
			var lastPlaylistsTabId = $youmaxContainer.data('youmax_last_channel_playlists');
			$youmaxContainer.find('#'+lastPlaylistsTabId).click();
		});
		
		
		$youmaxContainer.on('click','#youmax-search-holder-header',function(){
			$(this).find('#youmax-search-box-header').toggle();
		});
		
		$youmaxContainer.on('click','#youmax-search-box-header', function (e) {
			return false;
		});
		
		
		$(window).resize(function() {
			clearTimeout(layoutResizeTimer);
			layoutResizeTimer = setTimeout(function(){
				$('body').find('.youmax').each(function(){
					$ymaxContainer = $(this);
					//console.log("setting media queries");
					setMediaQueries($ymaxContainer.width(),$ymaxContainer);
				});
				
				setTimeout(function(){
					$('body').find('.youmax').each(function(){
						$ymaxContainer = $(this);
						ymax_global_options = $ymaxContainer.data('youmax_global_options');
						//remove date for trend skin if not enough space
						if(ymax_global_options.skin.indexOf('trend')!=-1 && ($ymaxContainer.find('#tiles li:first-child').width())<280) {
							$ymaxContainer.find('.youmax-video-list-date').hide();
						} else {
							$ymaxContainer.find('.youmax-video-list-date').show();
						}
						//console.log("updaing msonry layout");
						$ymaxContainer.find('ul').masonry('layout'); 
					});
				}, youmax_global_options.updateLayoutDelay);
				
				
			}, youmax_global_options.updateLayoutDelay);
		});
		
		//Adding this as a Safety Net
		$(window).on('load', function(){
			setTimeout(function(){
				$('body').find('.youmax').each(function(){
					$(this).find('ul').masonry('layout'); 
				});
			}, youmax_global_options.updateLayoutDelay);
		});	
	
		
	},
	
	paginationWrapper = function($youmaxContainer,handle) {
		
		if(handle=="previous") {
			pauseLoadMoreButton($youmaxContainer,"previous");
		} else {
			pauseLoadMoreButton($youmaxContainer);
		}
		
		$youmaxContainerList = $youmaxContainer.find('ul#tiles');
		var current_height = $youmaxContainerList.height();
		$youmaxContainerList.parent('#youmax-video-list-div').css('min-height',current_height);		
		$youmaxContainerList.find('li').addClass("youmax-dying");//.fadeTo(200, 0.3, function(){
			//setTimeout(function(){
				//handlePagination($youmaxContainer,handle);
			//}, 1000);
		//});
		
		handlePagination($youmaxContainer,handle);
	
	},
	
	handlePagination = function($youmaxContainer,handle) {

		var youtubeResponse = {
			items:[],
			nextPageToken:"youmax-generated"
		};
		
		var vimeoResponse = {
			data:[],
			paging:{
				next:"youmax-generated"
			}
		};		
		
		//setMinimumContainerHeight($youmaxContainer);
		
		cache = $youmaxContainer.data('cache');
		cacheIndex = $youmaxContainer.data('cacheindex');				
		
		//var tempCache = cache;
		var tempCacheIndex;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		
		//console.log("inside handlePagination for - "+handle);
		
		//videoType = $(".youmax-tab-hover").attr("id").split("_")[0];
		//console.log(videoType);
		
		tabId = $(".youmax-tab-hover").attr("id");
		
		if(handle=="previous") {
			if(cacheIndex>=0) {
				/*for(var p=cacheIndex, c=youmax_global_options.maxResults; c>0; c--,p++) {
					response.items.push()
				}*/
				tempCacheIndex = cacheIndex - youmax_global_options.maxResults + 1;
				if(tempCacheIndex<0) tempCacheIndex = 0;
				
				youtubeResponse.items = (cache.slice(tempCacheIndex,tempCacheIndex+youmax_global_options.maxResults));
				vimeoResponse.data = (cache.slice(tempCacheIndex,tempCacheIndex+youmax_global_options.maxResults));
				
				setTimeout(function(){
					if(tabId.indexOf("youtube_channel_uploads_")!=-1) {
						insertPlaylistVideos(youtubeResponse,false,$youmaxContainer,true);
					} else if(tabId.indexOf("youtube_channel_playlists_")!=-1) {
						insertChannelPlaylists(youtubeResponse,false,$youmaxContainer,true);
					} else if(tabId.indexOf("youtube_channel_search_")!=-1) {
						eventType = $(".youmax-tab-hover").data("eventtype");
						isEvent = false;
						if(null!=eventType && eventType!="") {
							isEvent = true;
						}
						insertSearchVideos(youtubeResponse,$youmaxContainer,false,isEvent,true,true);
					} else if(tabId.indexOf("youtube_channel_events_")!=-1) {
						insertSearchVideos(youtubeResponse,$youmaxContainer,false,true,true,true);
					} else if(tabId.indexOf("youtube_playlist_videos_")!=-1) {
						insertPlaylistVideos(youtubeResponse,false,$youmaxContainer,true);
					} else if(tabId.indexOf("vimeo_user_videos_")!=-1) {
						insertVimeoVideos(vimeoResponse,false,$youmaxContainer,true);
					} else if(tabId.indexOf("vimeo_channel_videos_")!=-1) {
						insertVimeoVideos(vimeoResponse,false,$youmaxContainer,true);
					} else if(tabId.indexOf("vimeo_group_videos_")!=-1) {
						insertVimeoVideos(vimeoResponse,false,$youmaxContainer,true);
					} else if(tabId.indexOf("vimeo_album_videos_")!=-1) {
						insertVimeoVideos(vimeoResponse,false,$youmaxContainer,true);
					} else if(tabId.indexOf("query_")!=-1) {
						
					}	
					
				}, youmax_global_options.minimumFadeTimeout);
				
				cacheIndex = cacheIndex - youmax_global_options.maxResults;
				//console.log("cacheIndex > "+cacheIndex);
			} else {
				if(youmax_global_options.showTextInsteadOfIcons) {
					$youmaxContainer.find('#youmax-previous-div').removeClass('youmax-load-more-div-click').html('Done');
				} else {
					$youmaxContainer.find('#youmax-previous-div').removeClass('youmax-load-more-div-click').html('<i class="fa fa-close fa-5x"></i>');
				}
				$youmaxContainer.find('ul#tiles li').removeClass("youmax-dying").fadeTo(0, 1);
			}
		
		
		} else if(handle=="next") {
			if(cacheIndex+youmax_global_options.maxResults+1 >= cache.length) {
				//console.log("cache length > "+cache.length);
				//console.log("calling load more playlists");
				loadMorePlaylistVideos($youmaxContainer);
			} else {
				tempCacheIndex = cacheIndex + youmax_global_options.maxResults + 1;
				//console.log("tempCacheIndex>"+tempCacheIndex);
				
				youtubeResponse.items = (cache.slice(tempCacheIndex,tempCacheIndex+youmax_global_options.maxResults));
				vimeoResponse.data = (cache.slice(tempCacheIndex,tempCacheIndex+youmax_global_options.maxResults));

				setTimeout(function(){				
					if(tabId.indexOf("youtube_channel_uploads_")!=-1) {
						insertPlaylistVideos(youtubeResponse,false,$youmaxContainer,true);
					} else if(tabId.indexOf("youtube_channel_playlists_")!=-1) {
						insertChannelPlaylists(youtubeResponse,false,$youmaxContainer,true);
					} else if(tabId.indexOf("youtube_channel_search_")!=-1) {
						eventType = $(".youmax-tab-hover").data("eventtype");
						isEvent = false;
						if(null!=eventType && eventType!="") {
							isEvent = true;
						}
						insertSearchVideos(youtubeResponse,$youmaxContainer,false,isEvent,true,true);
					} else if(tabId.indexOf("youtube_channel_events_")!=-1) {
						insertSearchVideos(youtubeResponse,$youmaxContainer,false,true,true,true);
					} else if(tabId.indexOf("youtube_playlist_videos_")!=-1) {
						insertPlaylistVideos(youtubeResponse,false,$youmaxContainer,true);
					} else if(tabId.indexOf("vimeo_user_videos_")!=-1) {
						insertVimeoVideos(vimeoResponse,false,$youmaxContainer,true);
					} else if(tabId.indexOf("vimeo_channel_videos_")!=-1) {
						insertVimeoVideos(vimeoResponse,false,$youmaxContainer,true);
					} else if(tabId.indexOf("vimeo_group_videos_")!=-1) {
						insertVimeoVideos(vimeoResponse,false,$youmaxContainer,true);
					} else if(tabId.indexOf("vimeo_album_videos_")!=-1) {
						insertVimeoVideos(vimeoResponse,false,$youmaxContainer,true);
					} else if(tabId.indexOf("query_")!=-1) {
						
					}
				}, youmax_global_options.minimumFadeTimeout);
				cacheIndex = cacheIndex + youmax_global_options.maxResults;
				//console.log("cacheIndex > "+cacheIndex);
			}
			
			if(cacheIndex<-1) {
				cacheIndex = -1;
			}
			
		}
		
		$youmaxContainer.data('cache',cache);
		$youmaxContainer.data('cacheindex',cacheIndex);				
	
	},
	
	handleComments = function(thisElement,$youmaxContainer) {
		
		//var $youmaxAddButton = $youmaxContainer.find('.youmax-add-comment-button');
		//$youmaxAddButton.text('posting..');
		//$youmaxAddButton.attr('disabled','disabled');
		$(thisElement).html('<i class="fa fa-ellipsis-h fa-2x"></i>').attr('disabled','disabled');
		//console.log('Button text - '+$(thisElement).text());
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		if(youmax_global_options.displayVideo=="popup") {
			$youmaxPlayBox = $('.youmax-popup.mfp-gallery');
		} else {
			$youmaxPlayBox = $youmaxContainer;
		}	

		var youmaxAccessToken = youmaxLoggedInUser.youmaxAccessToken;
		if(null!=youmaxAccessToken && youmaxAccessToken!="") {
			//Token available
			//getLoggedInUserDetails($youmaxContainer,youmaxAccessToken,youmax_global_options.apiKey);
			
			var comment = $youmaxPlayBox.find('.youmax-comment-textbox').val();
			if(null==comment||comment.trim()=="") {
				alert("Please enter a valid comment..");
				$youmaxPlayBox.find('.youmax-add-comment-button').removeAttr('disabled').html('<i class="fa fa-send fa-2x"></i>');
				return;
			} else {
				comment=comment.trim();
			}
			
			videoId = $youmaxPlayBox.find(".youmax-encloser-comment-button.youmax-show-button").attr('id');
			channelId = $youmaxPlayBox.find(".youmax-encloser-comment-button.youmax-show-button").data('channelid');
			
			//remove "youtube_" from the video id
			videoId = videoId.substring(videoId.indexOf("_")+1);
			youmaxPostComment($youmaxContainer,videoId,youmaxAccessToken,youmax_global_options.apiKey,comment,channelId);
			
		} else {
			//Check if any Access Token persists
			/*youmaxAccessToken = gapi.auth.getToken();
			//console.log('Checking for persistent access token');
			//console.log(youmaxAccessToken);
			if(null!=youmaxAccessToken && null!=youmaxAccessToken.access_token) {
				youmaxAccessToken = youmaxAccessToken.access_token;
				handleComments($youmaxContainer);
			}*/
			//Initiate Login Workflow
			//console.log('Initiate Login Workflow');
			gapi.auth.signIn({
				'clientid' : youmax_global_options.clientId,
				'cookiepolicy' : 'single_host_origin',
				'callback' : 'youmaxSaveToken',
				'scope' : 'https://www.googleapis.com/auth/youtube.force-ssl'
			}); 
		
		}
	
	},
	
	/* Not needed as of now
	getLoggedInUserDetails = function($youmaxContainer,youmaxAccessToken,youmaxApiKey) {
		var loggedInUserApiURL = "https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true&key="+youmaxApiKey;
		
		//console.log();
		$.ajax({
			url: loggedInUserApiURL,
			type: 'get',
			crossDomain: true,
			beforeSend: function(xhr){
				xhr.setRequestHeader('Authorization','Bearer '+youmaxAccessToken);
			},
			success: function (response, status) {
				youmaxLoggedInUser.username = response.items[0].snippet.title;
				youmaxLoggedInUser.thumbnail = response.items[0].snippet.thumbnails.default.url;
				
				$youmaxContainer.find('#youmax_me .youmax-from-img').css('background-image','url('+youmaxLoggedInUser.thumbnail+')');
				$youmaxContainer.find('#youmax_me .youmax-from-name').text('background-image',youmaxLoggedInUser.username);
				
				//console.log("Success!!");
				//console.log(response);
				//console.log(status);
			},
			error: function (xhr, desc, err) {
				//console.log(xhr);
				//console.log("Desc: " + desc + "\nErr:" + err);
			}
		});
	},
	*/
	
	youmaxPostComment = function($youmaxContainer,videoId,youmaxAccessToken,apiKey,comment,channelId) {
		
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		//var postCommentURL = "https://gdata.youtube.com/feeds/api/videos/"+videoId+"/comments?alt=json";
		var postCommentURL = "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&shareOnGooglePlus=false&fields=snippet&key="+youmax_global_options.apiKey;
		//var xmlComment = '<?xml version="1.0" encoding="UTF-8"?><entry xmlns="http://www.w3.org/2005/Atom" xmlns:yt="http://gdata.youtube.com/schemas/2007"><content>'+comment+'</content></entry>';
		var xmlComment = '{"snippet":{"channelId":"'+channelId+'","videoId":"'+videoId+'","topLevelComment":{"snippet":{"textOriginal":"'+comment+'"}}}}';
		
		//console.log(xmlComment);
		
		$.ajax({
			url: postCommentURL,
			type: 'post',
			crossDomain: true,
			data:xmlComment,
			//contentType: "application/atom+xml",
			beforeSend: function(xhr){
				//xhr.setRequestHeader('X-GData-Key','key='+apiKey);
				xhr.setRequestHeader('Authorization','Bearer '+youmaxAccessToken);
				//xhr.setRequestHeader('GData-Version','2');
				//xhr.setRequestHeader('Host','gdata.youtube.com');
				xhr.setRequestHeader('Content-Type','application/json');
				xhr.setRequestHeader('Content-Length',xmlComment.length);
			},
			success: function (data, status) {

				/*var authorId = data.entry.author[0].uri.$t;
				authorId = authorId.substring(authorId.lastIndexOf("/")+1); //.toLowerCase()*/
				//console.log(data)
				var authorName = data.snippet.topLevelComment.snippet.authorDisplayName;
				var authorImage = data.snippet.topLevelComment.snippet.authorProfileImageUrl;
				var youmax_translator_text = $youmaxContainer.data('youmax_translator_text');
				var youmax_global_options = $youmaxContainer.data('youmax_global_options');
				if(youmax_global_options.displayVideo=="popup") {
					$youmaxPlayBox = $('.youmax-popup.mfp-gallery');
				} else {
					$youmaxPlayBox = $youmaxContainer;
				}	
				
				//Display added comment
				$youmaxPlayBox.find("#youmax-encloser-comments").prepend('<div  class="youmax-video-comment"><div class="youmax-from"><div class="youmax-from-img" style="background-image:url(\''+authorImage+'\');"></div><div class="youmax-from-name">'+authorName+'</div><div class="youmax-published">'+youmax_translator_text.now+'</div></div><div class="youmax-comment"><span class="youmax-comment-content">'+comment+'</span><div></div>');				
				
				//getUserDetails(new Array(authorId),$youmaxContainer);
				
				$youmaxPlayBox.find('.youmax-add-comment-button').removeAttr('disabled').html('<i class="fa fa-send fa-2x"></i>');
				$youmaxPlayBox.find('.youmax-comment-textbox').val('');
				//console.log("Success!!");
				//console.log(data);
				//console.log(status);
			},
			error: function (xhr, desc, err) {
				alert("Could not Post - "+err);
				console.log(xhr);
				console.log("Desc: " + desc + "\nErr:" + err);
			}
		});
	
	},
	
	//load more button functionality
	loadMorePlaylistVideos = function($youmaxContainer) {
	
		$youmaxLoadMoreDiv = pauseLoadMoreButton($youmaxContainer);
		$youmaxContainer.find('#youmax-encloser').empty().hide();
		
		var tabId = $youmaxContainer.find('.youmax-tab.youmax-tab-hover').attr('id');
		var nextPageToken = $youmaxLoadMoreDiv.data('nextpagetoken');
		//console.log('load more clicked : nextPageToken-'+nextPageToken);
		if(null!=nextPageToken && nextPageToken!="undefined" && nextPageToken!="") {
			/*if(playlistId.indexOf("search_")!=-1) {
				getSearchVideos(playlistId,nextPageToken,$youmaxContainer);
			} else if(playlistId.indexOf("playlists_")!=-1) {
				getChannelPlaylists(playlistId,nextPageToken,$youmaxContainer);
			} else if(playlistId.indexOf("query_")!=-1) {
				getUserSearchVideos(playlistId,nextPageToken,$youmaxContainer);
			} else if(playlistId.indexOf("events_")!=-1) {
				getChannelEvents(playlistId,nextPageToken,$youmaxContainer);
			} else {
				getPlaylistVideos(playlistId,nextPageToken,$youmaxContainer);
			}*/
			
			if(tabId.indexOf("youtube_channel_uploads_")!=-1) {
				innerId=tabId.substring(24);
				getPlaylistVideos(innerId,nextPageToken,$youmaxContainer);
			} else if(tabId.indexOf("youtube_channel_playlists_")!=-1) {
				innerId=tabId.substring(26);
				getChannelPlaylists(innerId,nextPageToken,$youmaxContainer);
			} else if(tabId.indexOf("youtube_channel_search_")!=-1) {
				//innerId=tabId.substring(23);
				getSearchVideos(tabId,nextPageToken,$youmaxContainer);
			} else if(tabId.indexOf("youtube_channel_events_")!=-1) {
				innerId=tabId.substring(23);
				getChannelEvents(innerId,nextPageToken,$youmaxContainer);
			} else if(tabId.indexOf("youtube_playlist_videos_")!=-1) {
				innerId=tabId.substring(24);
				getPlaylistVideos(innerId,nextPageToken,$youmaxContainer);
			} else if(tabId.indexOf("vimeo_user_videos_")!=-1) {
				innerId=tabId.substring(18);
				getVimeoUserVideos(innerId,nextPageToken,$youmaxContainer);
			} else if(tabId.indexOf("vimeo_channel_videos_")!=-1) {
				innerId=tabId.substring(21);
				getVimeoChannelVideos(innerId,nextPageToken,$youmaxContainer);
			} else if(tabId.indexOf("vimeo_group_videos_")!=-1) {
				innerId=tabId.substring(19);
				getVimeoGroupVideos(innerId,nextPageToken,$youmaxContainer);
			} else if(tabId.indexOf("vimeo_album_videos_")!=-1) {
				innerId=tabId.substring(19);
				getVimeoAlbumVideos(innerId,nextPageToken,$youmaxContainer);
			}  else if(tabId.indexOf("query_")!=-1) {
				innerId=tabId.substring(6);
				getUserSearchVideos(innerId,nextPageToken,$youmaxContainer);	
			}		
			
		} else {
		
			deactivateLoadMoreButton($youmaxContainer);
			
		}
	},
	
	pauseLoadMoreButton = function ($youmaxContainer,direction) {
	
		var $youmaxLoadMoreDiv;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		
		if(youmax_global_options.showTextInsteadOfIcons) {

			if(youmax_global_options.loadMode=="loadmore") {
				$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
				$youmaxLoadMoreDiv.html('Loading..');
			} else if(youmax_global_options.loadMode.indexOf("paginate")!=-1) {
				if(direction=="previous") {
					$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-previous-div');
					$youmaxLoadMoreDiv.html('Loading..');
				} else {
					$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-next-div');
					$youmaxLoadMoreDiv.html('Loading..');
				}
			}		

		} else {
		
			if(youmax_global_options.loadMode=="loadmore") {
				$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
				$youmaxLoadMoreDiv.html('<i class="fa fa-ellipsis-h fa-5x"></i>');
			} else if(youmax_global_options.loadMode.indexOf("paginate")!=-1) {
				if(direction=="previous") {
					$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-previous-div');
					$youmaxLoadMoreDiv.html('<i class="fa fa-ellipsis-h fa-5x"></i>');
				} else {
					$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-next-div');
					$youmaxLoadMoreDiv.html('<i class="fa fa-ellipsis-h fa-5x"></i>');
				}
			}
			
		}		


		$youmaxLoadMoreDiv.addClass('youmax-load-more-div-click');
		
		return $youmaxLoadMoreDiv;
	
	},
	
	deactivateLoadMoreButton = function ($youmaxContainer) {
	
		var $youmaxLoadMoreDiv;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		
		if(youmax_global_options.showTextInsteadOfIcons) {
		
			if(youmax_global_options.loadMode=="loadmore") {
				$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
				$youmaxLoadMoreDiv.html('All Done');
			} else if(youmax_global_options.loadMode.indexOf("paginate")!=-1) {
				$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-next-div');
				$youmaxLoadMoreDiv.html('Done');
				$youmaxContainer.find('ul#tiles li').removeClass("youmax-dying").fadeTo(0, 1);
			}
			
		} else {
		
			if(youmax_global_options.loadMode=="loadmore") {
				$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
				$youmaxLoadMoreDiv.html('<i class="fa fa-close fa-5x"></i>');
			} else if(youmax_global_options.loadMode.indexOf("paginate")!=-1) {
				$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-next-div');
				$youmaxLoadMoreDiv.html('<i class="fa fa-close fa-5x"></i>');
				$youmaxContainer.find('ul#tiles li').removeClass("youmax-dying").fadeTo(0, 1);
			}
			
		}

		$youmaxLoadMoreDiv.removeClass('youmax-load-more-div-click');
		//$youmaxLoadMoreDiv.addClass('youmax-load-more-div-click');
	
	},
	
	
	
	//gets channel details using Youtube API
	getChannelDetails = function (channelId,$youmaxContainer) {
		//console.log('inside getChannelDetails');
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var apiKey = youmax_global_options.apiKey;
		youmax_global_options.channelId = channelId;
		
		apiUrl = "https://www.googleapis.com/youtube/v3/channels?part=brandingSettings%2Csnippet%2Cstatistics%2CcontentDetails&id="+channelId+"&key="+apiKey;
		//console.log('apiUrl-'+apiUrl);
		//showLoader();
		
		$.ajax({
			url: apiUrl,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) { displayChannelHeader(response,$youmaxContainer);},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
	},
	
	//get channel Id if channel URL is of the form ....../user/Adele
	getChannelId = function (apiUrl,$youmaxContainer) {
		//console.log('inside getChannelId');
		//console.log('apiUrl-'+apiUrl);
		//showLoader();
		
		$.ajax({
			url: apiUrl,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) { getChannelDetails(response.items[0].id,$youmaxContainer);},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
	},


	//get channel Id if channel URL is of the form ....../user/Adele
	getChannelIdForTabs = function (userId,tab_prefix,$youmaxContainer,isSelected) {
		//console.log('inside getChannelId');
		//console.log('apiUrl-'+apiUrl);
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');

		apiUrl = "https://www.googleapis.com/youtube/v3/channels?part=id&forUsername="+userId+"&key="+youmax_global_options.apiKey;
		
		$.ajax({
			url: apiUrl,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) {
				//console.log("tab_prefix: "+tab_prefix);
				if(tab_prefix.indexOf("youtube_channel_search_")!=-1) {
					//$youmaxContainer.find("#"+tab_prefix).data("restricttochannels",response.items[0].id);
					$youmaxContainer.find("#"+tab_prefix).attr("data-restricttochannels",response.items[0].id);
					$youmaxContainer.find("#"+tab_prefix).data("restricttochannels",response.items[0].id);
					$youmaxContainer.find('option[value="'+tab_prefix+'"]').attr("data-restricttochannels",response.items[0].id);
					$youmaxContainer.find('option[value="'+tab_prefix+'"]').data("restricttochannels",response.items[0].id);
					if(isSelected) {
						$youmaxContainer.find("#"+tab_prefix).click();
					}					
				} else {
					$youmaxContainer.find("#"+tab_prefix+userId).attr("id",tab_prefix+response.items[0].id);
					$youmaxContainer.find('option[value="'+tab_prefix+userId+'"]').attr("value",tab_prefix+response.items[0].id);
					if(tab_prefix=="youtube_channel_uploads_") {
						getUploadsPlaylistIdForTabs(response.items[0].id,tab_prefix,$youmaxContainer,isSelected);
					} else {
						if(isSelected) {
							$youmaxContainer.find("#"+tab_prefix+response.items[0].id).click();
						}
					}
				}
				
			},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
	},
	
	getUploadsPlaylistIdForTabs = function(channel_id,tab_prefix,$youmaxContainer,isSelected) {
		//console.log('getUploadsPlaylistIdForTabs');
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		
		apiUrl = "https://www.googleapis.com/youtube/v3/channels?part=brandingSettings%2Csnippet%2Cstatistics%2CcontentDetails&id="+channel_id+"&key="+youmax_global_options.apiKey;
		//console.log('apiUrl-'+apiUrl);
		//showLoader();
		
		$.ajax({
			url: apiUrl,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) {
				//console.log(response);
				$youmaxContainer.find("#"+tab_prefix+channel_id).attr("id",tab_prefix+response.items[0].contentDetails.relatedPlaylists.uploads);
				$youmaxContainer.find('option[value="'+tab_prefix+channel_id+'"]').attr("value",tab_prefix+response.items[0].contentDetails.relatedPlaylists.uploads);
				if(isSelected) {
					$youmaxContainer.find("#"+tab_prefix+response.items[0].contentDetails.relatedPlaylists.uploads).click();
				}
			},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
	
	},
	
	//get channel Id if channel URL is of the form ....../user/Adele and add it ot search tab's data
	getChannelIdForSearch = function (apiUrl,$searchTab) {
		//console.log('inside getChannelId');
		//console.log('apiUrl-'+apiUrl);
		//showLoader();
		
		$.ajax({
			url: apiUrl,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) {
						restrictedChannels = $searchTab.data("restrictToChannels");
						//console.log(restrictedChannels);
						restrictedChannels.push(response.items[0].id);
						$searchTab.data("restrictToChannels",restrictedChannels);
						//console.log(restrictedChannels);
						//console.log($searchTab.attr('id'));
			},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
	},

	/* not needed in 8.0
	//get details of all playlists mentioned in youmax options
	getPlaylistDetails = function (playlistIdArray,$youmaxContainer) {
		//console.log('inside getPlaylistDetails');
		//console.log(playlistIdArray);
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var apiKey = youmax_global_options.apiKey;
		
		apiPlaylistDetailsURL = "https://www.googleapis.com/youtube/v3/playlists?part=snippet&id="+playlistIdArray+"&key="+apiKey;
		$.ajax({
			url: apiPlaylistDetailsURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) { displayTabs(response,$youmaxContainer);},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
	},
	*/
	
	//get video stats using Youtube API
	getVideoStats = function (videoIdList,$youmaxContainer,isEvent) {
		//console.log('inside getVideoStats');
		//console.log(videoIdList);
		//showLoader();
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var apiKey = youmax_global_options.apiKey;
		var streamingURL = "";
		
		if(isEvent) {
			streamingURL = "%2CliveStreamingDetails";
		}
		
		apiVideoStatURL = "https://www.googleapis.com/youtube/v3/videos?part=statistics%2CcontentDetails"+streamingURL+"&id="+videoIdList+"&key="+apiKey;
		$.ajax({
			url: apiVideoStatURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) { displayVideoStats(response,$youmaxContainer,isEvent);},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
	},
	
	/* updated to v3 API - not needed 
	//get YouTube user details using Youtube API
	getUserDetails = function (userIdList,$youmaxContainer) {
		//console.log('inside getVideoStats');
		//console.log(videoIdList);
		//showLoader();
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var apiKey = youmax_global_options.apiKey;
		
		for(var i=0; i<userIdList.length; i++) {
			apiUserDetailsURL = "https://gdata.youtube.com/feeds/api/users/"+userIdList[i]+"?alt=json";
			$.ajax({
				url: apiUserDetailsURL,
				type: "GET",
				async: true,
				cache: true,
				dataType: 'jsonp',
				success: function(response) { displayUserDetails(response);},
				error: function(html) { },
				beforeSend: setHeader
			});
		}
	},*/
	
	setHeader = function (xhr) {
		if(xhr && xhr.overrideMimeType) {
			xhr.overrideMimeType("application/j-son;charset=UTF-8");
		}
	},
	
	//utility function to displaye view counts
	convertViewCount = function(videoViewCount) {
		//console.log(videoViewCount);
		videoViewCount = parseInt(videoViewCount,10);
		if(videoViewCount<1000) {
			
		} else if (videoViewCount<1000000) {
			videoViewCount = Math.round(videoViewCount/1000) + "K";
			
		} else if (videoViewCount<1000000000) {
			videoViewCount = (videoViewCount/1000000).toFixed(1) + "M";
		} else {
			videoViewCount = (videoViewCount/1000000000).toFixed(1) + "B";
		}
		
		return videoViewCount;
		
	},
	
	convertViewCountForThumbnail = convertViewCount,
	
	convertLikeCommentCount = convertViewCount,
	
	convertHeaderCounts = convertViewCountWithComma,
	
	//utility function to displaye view counts
	convertViewCountWithComma = function(videoViewCount) {
		
		var videoResultCount = "";
		
		if(null==videoViewCount || videoViewCount=="0") {
			return "";
		}
		
		videoViewCount = ""+videoViewCount;
		
		//console.log("videoViewCount-"+videoViewCount);
		//console.log("videoViewCount length-"+videoViewCount.length);
		
		while(videoViewCount.length>0) {
			if(videoViewCount.length > 3) {
				videoResultCount = ","+videoViewCount.substring(videoViewCount.length-3)+videoResultCount;
				videoViewCount = videoViewCount.substring(0,videoViewCount.length-3);
			} else {
				videoResultCount = videoViewCount + videoResultCount;
				break;
			}
		}
		
		return videoResultCount;
		
	},
	
	//utility function to display time
	convertVimeoDuration = function(videoDuration) {
		min = parseInt(videoDuration/60,10);
		sec = videoDuration - (min*60);
		
		if(sec<10) {
			sec="0"+sec;
		}
		
		if(min>=60) {
			hours = parseInt(min/60,10);
			min = videoDuration - (hours*60);
			
			if(min<10) {
				min="0"+min;
			}
			
			return hours+":"+min+":"+sec;
		} else {
			return min+":"+sec;
		}
	
	},
	
	//utility function to display time
	convertDuration = function(videoDuration) {
		var duration,returnDuration;
		videoDuration = videoDuration.replace('PT','').replace('S','').replace('M',':').replace('H',':');	
		
		//TODO: fix some duration settings
		//console.log('videoDuration-'+videoDuration);
		
		var videoDurationSplit = videoDuration.split(':');
		returnDuration = videoDurationSplit[0];
		for(var i=1; i<videoDurationSplit.length; i++) {
			duration = videoDurationSplit[i];
			//console.log('duration-'+duration);
			if(duration=="") {
				returnDuration+=":00";
			} else {
				duration = parseInt(duration,10);
				//console.log('duration else -'+duration)
				if(duration<10) {
					returnDuration+=":0"+duration;
				} else {
					returnDuration+=":"+duration;
				}
			}
		}
		if(videoDurationSplit.length==1) {
			returnDuration="0:"+returnDuration;
		}
		return returnDuration;
		
	},
	
	//display channel header
	displayChannelHeader = function(response,$youmaxContainer) {
		//console.log("displayChannelHeader");
		//console.log(response);
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = $youmaxContainer.data("youmax_translator_text");
		var channelData = response.items[0];
		
		//alert(videoArray.length);
		channelId = channelData.id;
		channelTitle = channelData.snippet.title;
		channelImage = channelData.snippet.thumbnails.default.url;
		channelSubscribers = convertHeaderCounts(channelData.statistics.subscriberCount);
		channelViews = convertHeaderCounts(channelData.statistics.viewCount);
		channelBackgroundImage = channelData.brandingSettings.image.bannerImageUrl;
		//channelUploadsPlaylistId = channelData.contentDetails.relatedPlaylists.uploads;
		
		channelVideos = convertHeaderCounts(channelData.statistics.videoCount);
		channelDescription = channelData.snippet.description;
		userWebsite = youmax_global_options.userWebsite;
		
		//console.log('channelBackgroundImage-'+channelBackgroundImage);
		
		//youmax_global_options.channelBackgroundImage = channelBackgroundImage;
		//$youmaxContainer.data("youmax_global_options",youmax_global_options);
		
		$youmaxContainer.find('#youmax-header').css('background-image',"url("+channelBackgroundImage+")");
	
		//old header
		//$youmaxContainer.find('#youmax-header-wrapper').append('<a href="https://www.youtube.com/channel/'+channelId+'" target="_blank"><div class="youmax-channel-icon"><img src="'+channelImage+'"/></div><div class="youmax-channel-data-holder"><div class="youmax-channel-title">'+channelTitle+'</div>  <div id="youmax-header-counts"><span class="youmax-header-posts"><span class="youmax-count">'+channelVideos+'</span> videos</span><span class="youmax-header-followers"><span class="youmax-count">'+channelSubscribers+'</span> subscribers</span><span class="youmax-header-following"><span class="youmax-count">'+channelViews+'</span> views</span></div>  </div></a>');
		
		$youmaxContainer.find('#youmax-header-wrapper').append('<a href="https://www.youtube.com/channel/'+channelId+'" target="_blank"><div class="youmax-channel-icon"><img src="'+channelImage+'"/></div><div class="youmax-channel-data-holder"><div class="youmax-channel-title">'+channelTitle+'</div>  <div id="youmax-header-counts" class="youmax-generic-header-counts"><span class="youmax-header-posts" title="'+youmax_translator_text.videos+'"><span class="youmax-count"><i class="fa fa-video-camera"></i>'+channelVideos+'</span> </span><span class="youmax-header-followers" title="'+youmax_translator_text.subscribers+'"><span class="youmax-count"><i class="fa fa-envelope"></i>'+channelSubscribers+'</span></span><span class="youmax-header-following" title="'+youmax_translator_text.views+'"><span class="youmax-count"><i class="fa fa-user"></i>'+channelViews+'</span></span></div>  </div></a>');
		
		
		//<div class="youmax-subscribe-clean"><a href="https://instagram.com/'+channelTitle+'" target="_blank"><i class="fa fa-instagram fa-lg"></i>&nbsp;&nbsp;FOLLOW</a></div>
		
		if(youmax_global_options.skin.indexOf("clean")!=-1) {
			$youmaxContainer.find('#youmax-header-wrapper').append('<div id="youmax-header-info"><div id="youmax-header-title">'+channelTitle+'</div><div class="youmax-subscribe-clean-wrapper"><div class="youmax-subscribe"><div class="g-ytsubscribe" data-channelid="'+channelId+'" data-layout="default" data-count="default"></div></div></div><div id="youmax-header-bio">'+channelDescription+'</div><div id="youmax-header-website"><a href="'+userWebsite+'" target="_blank">'+userWebsite+'</a></div><div id="youmax-header-counts"><span class="youmax-header-posts"><span class="youmax-count">'+channelVideos+'</span> '+youmax_translator_text.videos+'</span><span class="youmax-header-followers"><span class="youmax-count">'+channelSubscribers+'</span> '+youmax_translator_text.subscribers+'</span><span class="youmax-header-following"><span class="youmax-count">'+channelViews+'</span> '+youmax_translator_text.views+'</span></div></div>');
		
			$youmaxContainer.find('#youmax-select-box').prepend('<div id="youmax-search-holder"><input id="youmax-search-box" type="text" placeholder="'+youmax_translator_text.search+'"/><i class="fa fa-search youmax-search-icon"></i></div>');
			$youmaxContainer.find('#youmax-select-box').append('<i class="fa fa-caret-down"></i>');
		} else {
			
			//old search in header
			//$youmaxContainer.find('#youmax-header-wrapper').append('&nbsp;&nbsp;&nbsp;&nbsp;<div class="youmax-subscribe"><div class="g-ytsubscribe" data-channelid="'+channelId+'" data-layout="default" data-count="default"></div></div><div id="youmax-stat-holder"><div id="youmax-search-holder"><input id="youmax-search-box" type="text" placeholder=""/><i class="fa fa-search youmax-search-icon"></i></div></div>');
			
			//added search in header for backward compatibility
			$youmaxContainer.find('#youmax-header-wrapper').append('<div id="youmax-stat-holder"><div id="youmax-search-holder-header"><input id="youmax-search-box-header" type="text" placeholder="Search"/><i class="fa fa-search youmax-search-icon-header"></i></div></div>');

			
			$youmaxContainer.find('#youmax-header-wrapper').append('&nbsp;&nbsp;&nbsp;&nbsp;<div class="youmax-subscribe"><div class="g-ytsubscribe" data-channelid="'+channelId+'" data-layout="default" data-count="default"></div></div>');
			
			$youmaxContainer.find('#youmax-select-box').prepend('<div id="youmax-search-holder"><input id="youmax-search-box" type="text" placeholder="'+youmax_translator_text.search+'"/><i class="fa fa-search youmax-search-icon"></i></div>');
			$youmaxContainer.find('#youmax-select-box').append('<i class="fa fa-caret-down"></i>');
			
			$youmaxContainer.find('#youmax-select-box').wrap('<div class="youmax-select-box-wrapper">');


			
		}
		
		
		
		
		//Always Use Dropdown Setting
		if(youmax_global_options.alwaysUseDropdown) {
			//console.log('options.alwaysUseDropdown-'+options.alwaysUseDropdown);	
			$youmaxContainer.find('#youmax-select-box').css('display','block');
			//$youmaxContainer.find('#youmax-select-box').show();
			$youmaxContainer.find('#youmax-tabs').hide();
			$youmaxContainer.find('#youmax-stat-holder').hide();
		}		

		
		//$youmaxContainer.find('#youmax-header-wrapper').append('');
		
		//Stats removed and search is added after Youmax 6.0
		/*$youmaxContainer.find('#youmax-stat-holder').append('<div class="youmax-stat"><span class="youmax-stat-count">'+convertViewCount(channelViews)+'</span><br/> VIDEO VIEWS </div><div class="youmax-stat"><span class="youmax-stat-count">'+convertViewCount(channelSubscribers)+'</span><br/>SUBSCRIBERS</div>');*/
		
		/* Tabs creation moved to a separate function
		$youmaxContainer.find('#youmax-tabs').prepend('<span id="'+channelUploadsPlaylistId+'" class="youmax-tab" >'+youmax_translator_text.uploads+'</span><span id="playlists_'+channelId+'" class="youmax-tab" >'+youmax_translator_text.playlists+'</span>');
		
		$youmaxContainer.find('#youmax-select').prepend('<option value="'+channelUploadsPlaylistId+'" class="youmax-option-highlight" >'+youmax_translator_text.uploads+'</option><option value="playlists_'+channelId+'" class="youmax-option-highlight" >'+youmax_translator_text.playlists+'</option>');
		
		if(youmax_global_options.showEvents) {
			$youmaxContainer.find('#youmax-tabs').append('<span id="events_'+channelId+'" class="youmax-tab" >'+youmax_translator_text.events+'</span>');
			$youmaxContainer.find('#youmax-select').append('<option value="events_'+channelId+'" class="youmax-option-highlight" >'+youmax_translator_text.events+'</option>');
		}

		if(null!=youmax_global_options.vimeoUser && youmax_global_options.vimeoUser!="") {
			
			$youmaxContainer.find('#youmax-tabs').append('<span id="vimeo_'+youmax_global_options.vimeoId+'" class="youmax-tab" >'+youmax_translator_text.vimeo+'</span>');
			$youmaxContainer.find('#youmax-select').append('<option value="vimeo_'+youmax_global_options.vimeoId+'" class="youmax-option-highlight" >'+youmax_translator_text.vimeo+'</option>');
		}

		//$youmaxContainer.find('#youmax-tabs').prepend('');
		//$youmaxContainer.find('#youmax-select').prepend('');		
		
		
		if(youmax_global_options.alwaysUseDropdown) {
			//console.log('options.alwaysUseDropdown-'+options.alwaysUseDropdown);	
			$youmaxContainer.find('#youmax-select-box').css('display','block');
			//$youmaxContainer.find('#youmax-select-box').show();
			$youmaxContainer.find('#youmax-tabs').hide();
			$youmaxContainer.find('#youmax-stat-holder').hide();
		}
		
		//console.log('selected Tab-'+youmax_global_options.selectedTab);
		if(youmax_global_options.selectedTab.charAt(0)=='u') {
			$('#'+channelUploadsPlaylistId).click();
		} else if(youmax_global_options.selectedTab.charAt(0)=='l') {
			$('#playlists_'+channelId).click();
		} else if(youmax_global_options.selectedTab.charAt(0)=='e') {
			$('#events_'+channelId).click();
		}
		*/
		
		renderSubscribeButton();
	},
	
	/* removed in 8.0
	//display tabs for playlists
	displayTabs = function(response,$youmaxContainer) {
		//console.log(response);
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var playlistArray = response.items;
		
		//alert(videoArray.length);
		$youmaxTabs = $youmaxContainer.find('#youmax-tabs');
		$youmaxSelect = $youmaxContainer.find('#youmax-select');
		for(var i=0; i<playlistArray.length; i++) {
			playlistId = playlistArray[i].id;
			playlistTitle = playlistArray[i].snippet.title;
			if(playlistTitle.length>youmax_global_options.maxPlaylistNameLength) {
				playlistTitleShort = playlistTitle.substring(0,youmax_global_options.maxPlaylistNameLength) + "..";
			} else {
				playlistTitleShort = playlistTitle;
			}
			
			$youmaxTabs.append('<span id="'+playlistId+'" class="youmax-tab" >'+playlistTitleShort+'</span>');
			$youmaxSelect.append('<option value="'+playlistId+'" >'+playlistTitle+'</option>');
		}
		
		//click the selectedTab
		if(youmax_global_options.selectedTab.charAt(0)=='p') {
			playlistSelect = (youmax_global_options.selectedTab.charAt(1)) - 1;
			if(null!=playlistArray[playlistSelect]) {
				$('#'+playlistArray[playlistSelect].id).click();
			}
		}
	},
	*/
	
	//display video statistics
	displayVideoStats = function(response,$youmaxContainer,isEvent) {
		//console.log("displayVideoStats");
		//console.log(response);

		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = $youmaxContainer.data('youmax_translator_text');
		
		
		var videoArray = response.items;
		var $videoThumbnail;

		for(var i=0; i<videoArray.length; i++) {
			videoId = videoArray[i].id;
			videoViewCount_raw = videoArray[i].statistics.viewCount;
			videoViewCount = convertViewCountForThumbnail(videoViewCount_raw);
			videoDuration = videoArray[i].contentDetails.duration;
			videoDuration = convertDuration(videoDuration);
			videoDefinition = videoArray[i].contentDetails.definition.toUpperCase();
			videoLikeCount_raw = videoArray[i].statistics.likeCount;
			videoLikeCount = convertLikeCommentCount(videoLikeCount_raw);
			videoCommentCount_raw = videoArray[i].statistics.commentCount;
			videoCommentCount = convertLikeCommentCount(videoCommentCount_raw);
			
			
			$videoThumbnail = $youmaxContainer.find('#youmax-video-list-div #youtube_'+videoId);
			
			$videoThumbnail.data("views",videoViewCount);
			$videoThumbnail.data("likes",videoLikeCount);			
			
			if(youmax_global_options.skin.indexOf("clean")!=-1) {
				if(isEvent) {
					actualEndTime = videoArray[i].liveStreamingDetails.actualEndTime;
					actualStartTime = videoArray[i].liveStreamingDetails.actualStartTime;
					scheduledStartTime = videoArray[i].liveStreamingDetails.scheduledStartTime;
					if (null!=actualEndTime) {  //completed event
						$videoThumbnail.append('<div class="youmax-event-tag">Completed Event</div>');
					} else if(null!=actualStartTime) {  //live event
						watching = convertViewCountWithComma(videoArray[i].liveStreamingDetails.concurrentViewers);
						$videoThumbnail.append('<div class="youmax-event-tag youmax-event-live"><div class="youmax-live-icon"><i class="fa fa-circle"></i></div>Live Event</div>');
					} else if (null!=scheduledStartTime) { //upcoming event
						scheduledAt = convertDateFormat(scheduledStartTime);
						$videoThumbnail.append('<div class="youmax-event-tag youmax-event-upcoming">Upcoming Event</div>');
					}
				}
				
				//not needed
				//$videoThumbnail.find('.youmax-video-list-views').append(videoViewCount+' <span class="youmax-views-text">'+youmax_translator_text.views+'</span> ');				
				
				$videoThumbnail.find('.youmax-all-skin-views').empty().append(videoViewCount);
				
				$videoThumbnail.find('.youmax-all-skin-likes').empty().append(videoLikeCount);
				
				$videoThumbnail.find('.youmax-all-skin-comments').empty().append(videoCommentCount);				

				$videoThumbnail.find(".youmax-clean-time").empty().append(videoDuration);				
				
			} else {
				if(isEvent) {
					actualEndTime = videoArray[i].liveStreamingDetails.actualEndTime;
					actualStartTime = videoArray[i].liveStreamingDetails.actualStartTime;
					scheduledStartTime = videoArray[i].liveStreamingDetails.scheduledStartTime;
					if (null!=actualEndTime) {  //completed event
						$videoThumbnail.append('<div class="youmax-definition youmax-event-tag">Completed Event</div>');
						$videoThumbnail.append('<div class="youmax-duration">'+videoDuration+'</div>');
					} else if(null!=actualStartTime) {  //live event
						watching = convertViewCountWithComma(videoArray[i].liveStreamingDetails.concurrentViewers);
						$videoThumbnail.append('<div class="youmax-definition youmax-event-tag youmax-event-live"><div class="youmax-live-icon"><i class="fa fa-circle"></i></div>Live Event</div>');
						$videoThumbnail.append('<div class="youmax-duration">'+watching+' watching</div>');
					} else if (null!=scheduledStartTime) { //upcoming event
						scheduledAt = convertDateFormat(scheduledStartTime);
						$videoThumbnail.append('<div class="youmax-definition youmax-event-tag youmax-event-upcoming">Upcoming Event</div>');
						$videoThumbnail.append('<div class="youmax-duration">'+scheduledAt+'</div>');
					}
				} else {
					$videoThumbnail.find('.youmax-duration').empty().append(videoDuration);
					$videoThumbnail.find('.youmax-definition').empty().append(videoDefinition);
				}
				
				if(youmax_global_options.skin.indexOf("list")!=-1) {
				
					$videoThumbnail.find('.youmax-all-skin-views').empty().append(videoViewCount);
					
					$videoThumbnail.find('.youmax-all-skin-likes').empty().append(videoLikeCount);
					
					$videoThumbnail.find('.youmax-all-skin-comments').empty().append(videoCommentCount);

				} else if(youmax_global_options.skin.indexOf("trend")!=-1){
				
					video_uploaded = $videoThumbnail.data("videouploaded");
					trend = getVideoTrend(videoViewCount_raw,videoLikeCount_raw,videoCommentCount_raw,video_uploaded,youmax_global_options.hotThreshold,youmax_global_options.trendingThreshold);
					
					//not needed
					//link = $videoThumbnail.attr("id");
					//link = "https://youtu.be/"+link.substring(link.indexOf("_")+1);
					//$videoThumbnail.find('.youmax-thumbnail-link').attr('href', link);
					
					
					if(trend=="trending") {
						icon="fa-bolt";
					} else if (trend=="hot") {
						icon="fa-fire";
					} else {
						icon="fa-check";
					}
					
					$videoThumbnail.find('.youmax-trend-holder').attr('class', 'youmax-trend-holder').empty().addClass('youmax-'+trend).append('<i class="fa '+icon+'"></i> <span class="youmax-trend-text">'+trend+'</span>');
				
					$videoThumbnail.find('.youmax-all-skin-views').empty().append(videoViewCount);
					
					$videoThumbnail.find('.youmax-all-skin-likes').empty().append(videoLikeCount);
					
					$videoThumbnail.find('.youmax-all-skin-comments').empty().append(videoCommentCount);

				} else {
					$videoThumbnail.find('.youmax-all-skin-views').empty().append(videoViewCount);
					
					if(youmax_global_options.skin.indexOf("block")!=-1) {
						$videoThumbnail.find('.youmax-all-skin-likes').empty().append(videoLikeCount);
						$videoThumbnail.find('.youmax-all-skin-comments').empty().append(videoCommentCount);
					}
				}
			}
		}
		
		/*if(youmax_global_options.skin.indexOf("block")!=-1 || youmax_global_options.skin.indexOf("trend")!=-1) {
			setTimeout(function(){
				window.dispatchEvent(new CustomEvent("resize"));
			}, youmax_global_options.updateLayoutDelay);
		}*/
	},
	
	getVideoTrend = function (views,likes,comments,time,hotThreshold,trendingThreshold) {
		
		if(null!=views && views!="") {
			views = parseInt(views,10);
		} else {
			views = 0;
		}
		
		if(null!=likes && likes!="") {
			likes = parseInt(likes,10);
		} else {
			likes = 0;
		}
		
		if(null!=comments && comments!="") {
			comments = parseInt(comments,10);
		} else {
			comments = 0;
		}
		
		dateDiffMS = Math.abs(new Date() - new Date(time));
		//console.log(dateDiffMS);
		
		dateDiffDY = dateDiffMS/1000/60/60/24;
		
		var score = (views + 100*likes + 300*comments)/dateDiffDY;

		//console.log('views: '+views);
		//console.log('likes: '+likes);
		//console.log('comments: '+comments);
		
		//console.log(views + 100*likes + 300*comments);
		//console.log(dateDiffDY);
		//console.log('score: '+score);

		if(score>=hotThreshold) {
			return "hot";
		}
		
		if(score>=trendingThreshold) {
			return "trending";
		}
		
		return "classic";
		
	},

	/* updated to v3 API - not needed
	//display YouTube user details
	displayUserDetails = function(response) {
		//console.log('displayUserDetails');
		//console.log(response);
		
		var authorImage = response.entry.media$thumbnail.url;
		//var authorId = response.entry.yt$username.$t;

		var authorName = response.entry.author[0].name.$t;
		var authorNameAsClass = authorName.replace(/\s+/g,"_").replace(/['|!|\.]/g,"").toLowerCase();
		//var authorId = response.entry.author[0].uri.$t;
		//authorId = authorId.substring(authorId.lastIndexOf("/")+1); //.toLowerCase()

		
		$('.'+authorNameAsClass).find('.youmax-from-img').css('background-image','url('+authorImage+')');
		//alert(videoArray.length);
	},*/


	//insert HTML for video thumbnails into youmax grid
	insertVideoComments = function(response,loadMoreFlag,$youmaxContainer) {
		//console.log('insertVideoComments');
		//console.log(response);

		
		var $youmaxCommentHolder;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = $youmaxContainer.data("youmax_translator_text");

		if(youmax_global_options.displayVideo=="popup") {
			$youmaxPlayBox = $('.youmax-popup.mfp-gallery');			
		} else {
			$youmaxPlayBox = $youmaxContainer;			
		}	

		$youmaxCommentHolder = $youmaxPlayBox.find('#youmax-encloser-comments');		
		
		//console.log('loadMoreFlag-'+loadMoreFlag);
		if(!loadMoreFlag) {
			//empty earlier comments if not load more
			$youmaxCommentHolder.empty();
		}

		var commentArray = response.items;
		//var userIdArray = [];
		
		//page token logic
		var nextPageToken = response.nextPageToken;
		var $loadCommentsButton = $youmaxPlayBox.find('.youmax-encloser-comment-button.youmax-more-button');
		//console.log('nextPageToken-'+nextPageToken);
		
		if(null!=nextPageToken && nextPageToken!="undefined" && nextPageToken!="") {
			$loadCommentsButton.data('nextpagetoken',nextPageToken);
		} else {
			$loadCommentsButton.data('nextpagetoken','');
		}

		//no need
		//$loadCommentsButton.data('nextpagetoken',nextPageToken);

		
		//alert(videoArray.length);
		if(null==commentArray||commentArray.length==0) {
			$youmaxCommentHolder.append('<div id="" class="youmax-video-comment"><div class="youmax-comment" ><span class="youmax-comment-content" style="text-align:center;">No more comments found.</span><div></div>');
			$loadCommentsButton.data('nextpagetoken','');
			resetLoadMoreComments($youmaxPlayBox,youmax_global_options);
			return;
		}
		
		/* v2 logic for start index
		$loadCommentsButton = $youmaxContainer.find('.youmax-encloser-comment-button.youmax-more-button');
		var startIndex = parseInt($loadCommentsButton.data('start-index'),10);
		startIndex += commentArray.length;
		$loadCommentsButton.data('start-index',startIndex);*/
		
		for(var i=0; i<commentArray.length; i++) {
			comment = commentArray[i].snippet.topLevelComment.snippet.textDisplay;
			if(null==comment||comment=="") {
				continue;
			}
			commentPublished = commentArray[i].snippet.topLevelComment.snippet.publishedAt;
			authorName = commentArray[i].snippet.topLevelComment.snippet.authorDisplayName;
			authorImage = commentArray[i].snippet.topLevelComment.snippet.authorProfileImageUrl;
			//authorNameAsClass = authorName.replace(/\s+/g,"_").replace(/['|!|\.]/g,"").toLowerCase();
			/*authorId = commentArray[i].author[0].uri.$t;
			authorId = authorId.substring(authorId.lastIndexOf("/")+1); //.toLowerCase()*/
			//authorId = commentArray[i].author[0].yt$userId.$t;
			//userIdArray.push(authorId);

			$youmaxCommentHolder.append('<div  class="youmax-video-comment"><div class="youmax-from"><div class="youmax-from-img" style="background-image:url(\''+authorImage+'\');"></div><div class="youmax-from-name">'+authorName+'</div><div class="youmax-published">'+getDateDiff(commentPublished,youmax_translator_text)+' </div></div><div class="youmax-comment"><span class="youmax-comment-content">'+comment+'</span><div></div>');

		}
		
		//getUserDetails(userIdArray,$youmaxContainer);
		resetLoadMoreComments($youmaxPlayBox,youmax_global_options);
		
	},
	

	//insert HTML for video thumbnails into youmax grid
	insertVimeoVideoComments = function(response,loadMoreFlag,$youmaxContainer) {
		//console.log('insertVimeoVideoComments');
		//console.log(response);
		
		
		var $youmaxCommentHolder;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = $youmaxContainer.data("youmax_translator_text");

		if(youmax_global_options.displayVideo=="popup") {
			$youmaxPlayBox = $('.youmax-popup.mfp-gallery');			
		} else {
			$youmaxPlayBox = $youmaxContainer;			
		}
		$youmaxCommentHolder = $youmaxPlayBox.find('#youmax-encloser-comments');		
		
		//console.log('loadMoreFlag-'+loadMoreFlag);
		if(!loadMoreFlag) {
			//empty earlier comments if not load more
			$youmaxCommentHolder.empty();
		}

		var commentArray = response.data;
		//var userIdArray = [];
		
		//page token logic
		var nextPageToken = response.paging.next;
		var $loadCommentsButton = $youmaxPlayBox.find('.youmax-encloser-comment-button.youmax-more-button');
		//console.log('nextPageToken-'+nextPageToken);
		
		if(null!=nextPageToken && nextPageToken!="undefined" && nextPageToken!="") {
			nextPageToken = nextPageToken.substring(nextPageToken.lastIndexOf("&")+1);
			$loadCommentsButton.data('nextpagetoken',nextPageToken);
		} else {
			$loadCommentsButton.data('nextpagetoken','');
		}
		
		//alert(videoArray.length);
		if(null==commentArray||commentArray.length==0) {
			$youmaxCommentHolder.append('<div id="" class="youmax-video-comment"><div class="youmax-comment" ><span class="youmax-comment-content" style="text-align:center;">No more comments found.</span><div></div>');
			$loadCommentsButton.data('nextpagetoken','');
			resetLoadMoreComments($youmaxPlayBox,youmax_global_options);
			return;
		}
		
		
		for(var i=0; i<commentArray.length; i++) {
			comment = commentArray[i].text;
			if(null==comment||comment=="") {
				continue;
			}
			commentPublished = commentArray[i].created_on;
			authorName = commentArray[i].user.name;
			if(null!=commentArray[i].user.pictures) {
				authorImage = commentArray[i].user.pictures.sizes[1].link;
			} else {
				authorImage = "http://i1.wp.com/i.vimeocdn.com/portrait/default-green_75x75.png";
			}
			//authorNameAsClass = authorName.replace(/\s+/g,"_").replace(/['|!|\.]/g,"").toLowerCase();
			//authorId = commentArray[i].author[0].yt$userId.$t;
			//userIdArray.push(authorId);

			$youmaxCommentHolder.append('<div  class="youmax-video-comment"><div class="youmax-from"><div class="youmax-from-img" style="background-image:url(\''+authorImage+'\');"></div><div class="youmax-from-name">'+authorName+'</div><div class="youmax-published">'+getDateDiff(commentPublished,youmax_translator_text)+' </div></div><div class="youmax-comment"><span class="youmax-comment-content">'+comment+'</span><div></div>');

		}
		
		//getUserDetails(userIdArray,$youmaxContainer);
		resetLoadMoreComments($youmaxPlayBox,youmax_global_options);
		
	},
	
	processDescription = function(description) {
	
	
		description = description.replace(/"/g, "'");
		//console.log(description);
		
		//spotArray = description.match(/http(s)*:\/\/.+?(\s|\n|$)/g);
		spotArray = description.match(/(http(s)*:\/\/|www\.).+?(\s|\n|$)/g);
		
		//console.log(description);
		//console.log(spotArray);

		//console.log(message);
		//console.log(spotArray);
		if(null!=spotArray) {
			for(var i=0;i<spotArray.length;i++) {
				spotArray[i] = spotArray[i].trim();
				if(spotArray[i].indexOf("www.")==0) {
					replaceLink = "http://"+spotArray[i];
				} else {
					replaceLink = spotArray[i];
				}
				description = description.replace(spotArray[i],"<a target='_blank' href='"+replaceLink+"' class='famax-link'>"+spotArray[i]+"</a>");
			}
		}
	
		//spotArray = description.match(/www\..+?(\s|\n|$)/g);
		//spotArray = description.match(/(http(s)*:\/\/|www.).+?(\s|\n|$)/g);
		
		
		/*if(null!=spotArray) {
			for(var i=0;i<spotArray.length;i++) {
				spotArray[i] = spotArray[i].trim();
				description = description.replace(spotArray[i],"<a target='_blank' href='http://"+spotArray[i]+"' class='famax-link'>"+spotArray[i]+"</a>");
			}
		}*/
	
		return description;					
	},
	
	
	
	//insert HTML for video thumbnails into youmax grid
	insertPlaylistVideos = function(response,loadMoreFlag,$youmaxContainer,paginateFlag) {
		//alert("insertPlaylistVideos");
		//console.log(response.items);
		var videoIdArray = [];
		var $youmaxContainerList = $youmaxContainer.find('ul');
		var item = '', paginate = false;
		//console.log('loadMoreFlag-'+loadMoreFlag);
		if(!loadMoreFlag) {
			//$youmaxContainerList.empty();
			if($youmaxContainer.find('.youmax-tab-hover').length==0) {
				$youmaxContainer.find('#youmax-showing-title').append('<div id="'+$youmaxContainer.data('youmax_current_playlist_id')+'" class="youmax-tab youmax-tab-hover youmax-showing-search-title"><i title="Back to Playlists" id="youmax-back-to-playlists" class="fa fa-chevron-circle-left fa-lg"></i> <i class="fa fa-bars fa-lg youmax-showing-playlist-icon"></i>'+$youmaxContainer.data('youmax_current_playlist_name')+'</div>').show();
			}
		}

		var videoArray = response.items;
		var nextPageToken = response.nextPageToken;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = $youmaxContainer.data("youmax_translator_text");
		var $youmaxLoadMoreDiv;
		
		if(youmax_global_options.loadMode=="loadmore") {
			$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
		} else if(youmax_global_options.loadMode.indexOf("paginate")!=-1) {
			$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-next-div');
			//$youmaxContainerList.empty();
			if(loadMoreFlag) {
				paginateFlag = true;
			}			
			loadMoreFlag = false;
		} 

		//console.log('nextPageToken-'+nextPageToken);
		
		if(null!=nextPageToken && nextPageToken!="undefined" && nextPageToken!="") {
			if(nextPageToken.indexOf("youmax-generated")==-1) {
				$youmaxLoadMoreDiv.data('nextpagetoken',nextPageToken);
			}
		} else {
			$youmaxLoadMoreDiv.data('nextpagetoken','');
		}

		//console.log(videoArray.length);
		
		for(var i=0; i<videoArray.length; i++) {
			videoId = videoArray[i].snippet.resourceId.videoId;			
			videoTitle = videoArray[i].snippet.title;
			videoDescription = videoArray[i].snippet.description;
			videoDescription = processDescription(videoDescription);

			if($youmaxContainerList.find('#youtube_'+videoId).length>0) {
				continue;
			}
			
			channelId = videoArray[i].snippet.channelId;
			
			//console.log('Video title-'+videoTitle);
			if(null!=videoArray[i].snippet.thumbnails) {
				videoThumbnail = videoArray[i].snippet.thumbnails.medium.url;
			} else {
				videoThumbnail = '';
				continue;
			}
			videoUploaded = videoArray[i].snippet.publishedAt;
			
			videoIdArray.push(videoId);
			
			videoLink = "https://www.youtube.com/watch?v="+videoId;
			
			//console.log('videoUploaded-'+videoUploaded);

			item += createItem("youtube",videoId,videoTitle,videoDescription,null,null,null,videoUploaded,videoLink,videoThumbnail,null,null,channelId,youmax_global_options,youmax_translator_text);
			
			//$youmaxContainerList.append('<li id="youtube_'+videoId+'" data-description="'+videoDescription+'" data-channelid="'+channelId+'" data-videouploaded="'+videoUploaded+'" class="youmax-grid-item"><div class="youmax-thumbnail-image-wrapper"><img class="youmax-main-thumbnail" href="https://www.youtube.com/watch?v='+videoId+'" src="'+videoThumbnail+'" /><div class="youmax-play-overlay"><div class="youmax-play-icon-holder"><i class="fa fa-play"></i></div></div></div><p><span class="youmax-title-desc-holder"><span class="youmax-video-list-title">'+videoTitle+'</span><span class="youmax-video-list-description">'+videoDescription+'</span></span><span class="youmax-view-date-holder"><span class="youmax-video-list-views" title="views"></span><span class="youmax-views-date-separator">|</span><span class="youmax-video-list-date">'+getDateDiff(videoUploaded,youmax_translator_text)+'</span></span></p><div class="youmax-clean-overlay-holder"><span class="youmax-clean-title">'+videoTitle+'</span><span class="youmax-clean-time"></span></span></div></li>');
			
			//item += ('<li id="youtube_'+videoId+'" data-description="'+videoDescription+'" data-channelid="'+channelId+'" data-videouploaded="'+videoUploaded+'" class="youmax-grid-item youmax-hidden"><div class="youmax-thumbnail-image-wrapper"><img class="youmax-main-thumbnail" href="https://www.youtube.com/watch?v='+videoId+'" src="'+videoThumbnail+'" /><div class="youmax-play-overlay"><div class="youmax-play-icon-holder"><i class="fa fa-play"></i></div></div></div><p><span class="youmax-title-desc-holder"><span class="youmax-video-list-title">'+videoTitle+'</span><span class="youmax-video-list-description">'+videoDescription+'</span></span><span class="youmax-view-date-holder"><span class="youmax-video-list-views" title="views"></span><span class="youmax-views-date-separator">|</span><span class="youmax-video-list-date">'+getDateDiff(videoUploaded,youmax_translator_text)+'</span></span></p><div class="youmax-clean-overlay-holder"><span class="youmax-clean-title">'+videoTitle+'</span><span class="youmax-clean-time"></span></span></div></li>');
			
			
			//$youmaxGrid.append( $items ).masonry( 'appended', $items );

		}

		$items = $(item);			
		$youmaxContainerList.append($items);
		
		createGrid($youmaxContainer,"video",loadMoreFlag,paginateFlag,$items);
		
		getVideoStats(videoIdArray,$youmaxContainer);
		
		if(youmax_global_options.loadMode.indexOf("paginate")!=-1 && (null==nextPageToken || nextPageToken.indexOf("youmax-generated")==-1)) {
			if(videoArray.length > 0) {
				cache = $youmaxContainer.data('cache');
				cacheIndex = $youmaxContainer.data('cacheindex');				

				cache = cache.concat(videoArray);
				cacheIndex = cache.length - videoArray.length - 1;
				//console.log(cache);
				//console.log("cacheIndex : "+cacheIndex);
				
				$youmaxContainer.data('cache',cache);
				$youmaxContainer.data('cacheindex',cacheIndex);				
				
			}
		}
		
	},


	//insert HTML for video thumbnails into youmax grid
	insertVimeoVideos = function(response,loadMoreFlag,$youmaxContainer,paginateFlag) {
		//console.log("insertVimeoVideos");
		//console.log(response);
		
		var item='';
		var $youmaxContainerList = $youmaxContainer.find('ul');
		//console.log('loadMoreFlag-'+loadMoreFlag);
		
		/*if(!loadMoreFlag) {
			//$youmaxContainerList.empty();
			if($youmaxContainer.find('.youmax-tab-hover').length==0) {
				$youmaxContainer.find('#youmax-showing-title').append('<div id="'+$youmaxContainer.data('youmax_current_playlist_id')+'" class="youmax-tab youmax-tab-hover youmax-showing-search-title"><i title="Back to Playlists" id="youmax-back-to-playlists" class="fa fa-chevron-circle-left fa-lg"></i> <i class="fa fa-bars fa-lg youmax-showing-playlist-icon"></i>'+$youmaxContainer.data('youmax_current_playlist_name')+'</div>').show();
			}
		}*/

		var videoArray = response.data;
		var nextPageToken = response.paging.next;
		
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = $youmaxContainer.data("youmax_translator_text");
		var $youmaxLoadMoreDiv;
		
		if(youmax_global_options.loadMode=="loadmore") {
			$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
		} else if(youmax_global_options.loadMode.indexOf("paginate")!=-1) {
			$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-next-div');
			//$youmaxContainerList.empty();
			if(loadMoreFlag) {
				paginateFlag = true;
			}			
			loadMoreFlag = false;
		}

		//console.log('nextPageToken-'+nextPageToken);
		
		if(null!=nextPageToken && nextPageToken!="undefined" && nextPageToken!="") {
			if(nextPageToken.indexOf("youmax-generated")==-1) {
				nextPageToken = nextPageToken.substring(nextPageToken.lastIndexOf("&")+1);
				$youmaxLoadMoreDiv.data('nextpagetoken',nextPageToken);
			}
		} else {
			$youmaxLoadMoreDiv.data('nextpagetoken','');
		}

		//alert(videoArray.length);
		for(var i=0; i<videoArray.length; i++) {
			//videoId = videoArray[i].snippet.resourceId.videoId;	
			videoId = videoArray[i].uri.substring(videoArray[i].uri.lastIndexOf("/")+1);
			
			videoLink = "https://vimeo.com/" + videoId;
			videoTitle = videoArray[i].name;
			videoDescription = videoArray[i].description;
			if(null==videoDescription) {
				videoDescription="";
			} else {
				videoDescription = processDescription(videoDescription);
			}
			
			
			//console.log('Video title-'+videoTitle);
			if(null!=videoArray[i].pictures.sizes) {
				videoThumbnail = videoArray[i].pictures.sizes[2].link;
			} else {
				videoThumbnail = '';
				continue;
			}
			videoUploaded = videoArray[i].created_time;
			

			//stats
			
			videoViewCount_raw = videoArray[i].stats.plays;
			
			videoDuration = videoArray[i].duration;
			
			videoLikeCount_raw = videoArray[i].metadata.connections.likes.total;
			
			videoCommentCount_raw = videoArray[i].metadata.connections.comments.total;

			item += createItem("vimeo",videoId,videoTitle,videoDescription,videoViewCount_raw,videoLikeCount_raw,videoCommentCount_raw,videoUploaded,videoLink,videoThumbnail,videoDuration,null,null,youmax_global_options,youmax_translator_text);
			
			//$youmaxContainerList.append(item);

		}
		
		$items = $(item);			
		$youmaxContainerList.append($items);
		
		createGrid($youmaxContainer,"video",loadMoreFlag,paginateFlag,$items);
		
		
		//getVideoStats(videoIdArray,$youmaxContainer);
		
		if(youmax_global_options.loadMode.indexOf("paginate")!=-1 && (null==nextPageToken || nextPageToken.indexOf("youmax-generated")==-1)) {
			if(videoArray.length > 0) {
				cache = $youmaxContainer.data('cache');
				cacheIndex = $youmaxContainer.data('cacheindex');				

				cache = cache.concat(videoArray);
				cacheIndex = cache.length - videoArray.length - 1;
				//console.log(cache);
				//console.log("cacheIndex : "+cacheIndex);
				
				$youmaxContainer.data('cache',cache);
				$youmaxContainer.data('cacheindex',cacheIndex);				
				
			}
		}
		
	},

	
	createItem = function(network,videoId,videoTitle,videoDescription,videoViewCount_raw,videoLikeCount_raw,videoCommentCount_raw,videoUploaded,videoLink,videoThumbnail,videoDuration,videoDefinition,channelId,youmax_global_options,youmax_translator_text) {
			//network = youtube|vimeo
	
			//console.log("creating item");
			
			var item = '';
			
			//processing where counts are provided - vimeo
			if(null==videoViewCount_raw) {
				videoViewCount="??";
				videoViewCount_raw = 0;
			} else {
				videoViewCount = convertViewCountForThumbnail(videoViewCount_raw);
			}
			
			if(null!=videoLikeCount_raw) {
				videoLikeCount = convertLikeCommentCount(videoLikeCount_raw);
			} else {
				videoLikeCount="??";
				videoLikeCount_raw = 0;
			}

			if(null!=videoCommentCount_raw) {
				videoCommentCount = convertLikeCommentCount(videoCommentCount_raw);
			} else {
				videoCommentCount="??";
				videoCommentCount_raw = 0;
			}
			
			if(null!=videoDuration) {
				if(network=="vimeo") {
					videoDuration = convertVimeoDuration(videoDuration);
				} else if(network=="youtube") {
					//youtube never provides duration in first go..
				}
			} else {
				videoDuration="??";
			}
			
			
			if(null==channelId) {
				channelId = "";
			}
			
			
			if(network=="vimeo" && youmax_global_options.showVimeoLikesInsteadOfViews) {
				primaryAttributeString = '<span class="youmax-list-thumbnail-icon"><i class="fa fa-heart"></i></span> <span class="youmax-thumbnail-primary-attribute">' + videoLikeCount+'</span> <span class="youmax-views-text">'+youmax_translator_text.likes+'</span> ';
			} else {
				primaryAttributeString = '<span class="youmax-list-thumbnail-icon"><i class="fa fa fa-dot-circle-o"></i></span> <span class="youmax-all-skin-views">' + videoViewCount+'</span> <span class="youmax-views-text">'+youmax_translator_text.views+'</span> ';
			}
			
			if (youmax_global_options.displayVideo=="thumbnail") {
				frame_source = generateFrameSource(videoId,network,false,youmax_global_options);				
				videoThumbnailString = '<div class="fluid-width-video-wrapper" style="padding-top:'+(youmax_global_options.aspectRatio*100)+'%;"><iframe id="youmax-encloser-video" style="width:100%;" src="'+frame_source+'" frameborder="0" allowfullscreen></iframe></div>';
			} else if (youmax_global_options.displayVideo=="link") {
				videoThumbnailString = '<a href="'+videoLink+'" target="_blank"><img class="youmax-main-thumbnail" href="'+videoLink+'" src="'+videoThumbnail+'"></a>';
			} else {
				videoThumbnailString = '<img class="youmax-main-thumbnail" href="'+videoLink+'" src="'+videoThumbnail+'">';
			}
			

			item = '<li id="'+network+'_'+videoId+'" data-description="'+videoDescription+'" data-views="'+videoViewCount+'" data-likes="'+videoLikeCount+'" data-comments="'+videoCommentCount+'" data-videouploaded="'+videoUploaded+'" data-channelid="'+channelId+'" class="youmax-grid-item youmax-hidden" ><div class="youmax-thumbnail-image-wrapper">'+videoThumbnailString+'<div class="youmax-play-overlay"><div class="youmax-play-icon-holder"><i class="fa fa-play"></i></div></div></div><p><span class="youmax-title-desc-holder"><span class="youmax-video-list-title">'+videoTitle+'</span><span class="youmax-video-list-description">'+videoDescription+'</span></span>';
			
			if(youmax_global_options.skin.indexOf("list")!=-1) {
			
				item += '<span class="youmax-view-date-holder"><span class="youmax-video-list-views" title="views"><span class="youmax-list-thumbnail-icon"><i class="fa fa fa-dot-circle-o"></i></span> <span class="youmax-all-skin-views">' + videoViewCount+'</span> <span class="youmax-views-text">'+youmax_translator_text.views+'</span></span> <span class="youmax-views-date-separator">|</span><span class="youmax-video-list-date">'+getDateDiff(videoUploaded,youmax_translator_text)+'</span> <span class="youmax-video-list-likes" title="likes"> <span class="youmax-list-thumbnail-icon"><i class="fa fa fa-heart"></i></span> <span class="youmax-all-skin-likes">'+videoLikeCount+'</span> <span class="youmax-views-text">'+youmax_translator_text.likes+'</span></span><span class="youmax-video-list-comments" title="comments"> <span class="youmax-list-thumbnail-icon"><i class="fa fa fa-comment"></i></span> <span class="youmax-all-skin-comments">'+videoCommentCount+'</span> <span class="youmax-views-text">'+youmax_translator_text.comments+'</span></span></span></p>';
				
			} else if(youmax_global_options.skin.indexOf("trend")!=-1) {

				
				trend = getVideoTrend(videoViewCount_raw,videoLikeCount_raw,videoCommentCount_raw,videoUploaded,youmax_global_options.hotThreshold,youmax_global_options.trendingThreshold);
				
				if(trend=="trending") {
					icon="fa-bolt";
				} else if (trend=="hot") {
					icon="fa-fire";
				} else {
					icon="fa-check";
				}
				
				//<div class="youmax-trend-link-holder"></div>
				item += '<span class="youmax-trend-link-holder"><span class="youmax-trend-holder youmax-'+trend+'"><i class="fa '+icon+'"></i> <span class="youmax-trend-text">'+trend+'</span></span>   <a class="youmax-thumbnail-link" href="'+videoLink+'" target="_blank"><span class="youmax-link"><i class="fa fa-link"></i></span></a></span>';

				item += '<span class="youmax-view-date-holder"><span class="youmax-video-list-views" title="views"><span class="youmax-list-thumbnail-icon"><i class="fa fa fa-dot-circle-o"></i></span> <span class="youmax-all-skin-views">' + videoViewCount+'</span> <span class="youmax-views-text">'+youmax_translator_text.views+'</span></span> <span class="youmax-views-date-separator">|</span><span class="youmax-video-list-date">'+getDateDiff(videoUploaded,youmax_translator_text)+'</span> <span class="youmax-video-list-likes" title="likes"> <span class="youmax-list-thumbnail-icon"><i class="fa fa fa-heart"></i></span> <span class="youmax-all-skin-likes">'+videoLikeCount+'</span> <span class="youmax-views-text">'+youmax_translator_text.likes+'</span></span><span class="youmax-video-list-comments" title="comments"> <span class="youmax-list-thumbnail-icon"><i class="fa fa fa-comment"></i></span> <span class="youmax-all-skin-comments">'+videoCommentCount+'</span> <span class="youmax-views-text">'+youmax_translator_text.comments+'</span></span></span></p>';
			
			} else {
			
				item += '<span class="youmax-view-date-holder"><span class="youmax-video-list-views" title="views">'+primaryAttributeString+'</span><span class="youmax-views-date-separator">|</span><span class="youmax-video-list-date">'+getDateDiff(videoUploaded,youmax_translator_text)+'</span></span></p>';
				
			}
			
			if(youmax_global_options.skin.indexOf("clean")!=-1) {
				if(network=="vimeo" && youmax_global_options.showVimeoLikesInsteadOfViews) {
					item += '<div class="youmax-definition"><i class="fa fa-heart fa-1x"></i> <span class="youmax-all-skin-likes">'+videoLikeCount+'</span> </div>';
					item += '<div class="youmax-duration"><i class="fa fa-comment fa-1x"></i> <span class="youmax-all-skin-comments">'+videoCommentCount+'</span> </div>';
				} else {
					item += '<div class="youmax-duration"><i class="fa fa-heart fa-1x"></i> <span class="youmax-all-skin-likes">'+videoLikeCount+'</span> </div>';
					item += '<div class="youmax-definition"><i class="fa fa-volume-off fa-1x"></i> <span class="youmax-all-skin-views">'+videoViewCount+'</span> </div>';
				}
				
				item += '<div class="youmax-clean-overlay-holder"><span class="youmax-clean-title">'+videoTitle+'</span><span class="youmax-clean-time">'+videoDuration+'</span></span></div>';
				
			} else {
			
				if (youmax_global_options.displayVideo!="thumbnail") {
					item += '<div class="youmax-duration">'+videoDuration+'</div>';
					
					if(network=="youtube") {
						item += '<div class="youmax-definition">'+videoDefinition+'</div>';
					}
				}
				
				if(youmax_global_options.skin.indexOf("block")!=-1) {
					item += '<div class="youmax-like-comment-holder"><div class="youmax-like-box"><i class="fa fa-heart"></i> <span class="youmax-all-skin-likes">'+videoLikeCount+'</span></div><div class="youmax-comment-box"><i class="fa fa-comment"></i><span class="youmax-all-skin-comments">'+videoCommentCount+'</span></div></div>';
				}
			}
			
			item += '</li>';

			return item;
	
	},
	
	
	
	//insert HTML for video thumbnails into youmax grid
	insertChannelPlaylists = function(response,loadMoreFlag,$youmaxContainer,paginateFlag) {
		//console.log("insertChannelPlaylists");
		//console.log(response);
		//var videoIdArray = [];
		var item = '';
		var $youmaxContainerList = $youmaxContainer.find('ul');
		//console.log('loadMoreFlag-'+loadMoreFlag);
		if(!loadMoreFlag) {
			//$youmaxContainerList.empty();
		}

		var playlistArray = response.items;
		var nextPageToken = response.nextPageToken;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');		
		var youmax_translator_text = $youmaxContainer.data("youmax_translator_text");		
		var $youmaxLoadMoreDiv;
		
		if(youmax_global_options.loadMode=="loadmore") {
			$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
		} else if(youmax_global_options.loadMode.indexOf("paginate")!=-1) {
			$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-next-div');
			//$youmaxContainerList.empty();
			if(loadMoreFlag) {
				paginateFlag = true;
			}			
			loadMoreFlag = false;
		} 

		//console.log('nextPageToken-'+nextPageToken);
		
		if(null!=nextPageToken && nextPageToken!="undefined" && nextPageToken!="") {
			if(nextPageToken.indexOf("youmax-generated")==-1) {
				$youmaxLoadMoreDiv.data('nextpagetoken',nextPageToken);
			}
		} else {
			$youmaxLoadMoreDiv.data('nextpagetoken','');
		}


		//alert(playlistArray.length);
		for(var i=0; i<playlistArray.length; i++) {
			playlistId = playlistArray[i].id;
			videoCount = playlistArray[i].contentDetails.itemCount;
			playlistTitle = playlistArray[i].snippet.title;
			//console.log('Video title-'+videoTitle);
			if(null!=playlistArray[i].snippet.thumbnails) {
				playlistThumbnail = playlistArray[i].snippet.thumbnails.medium.url;
			} else {
				playlistThumbnail = '';
				continue;
			}
			playlistUploaded = playlistArray[i].snippet.publishedAt;
			//console.log('videoUploaded-'+videoUploaded);
			
			item += '<li id="youtube_playlist_videos_'+playlistId+'" class="youmax-playlist-thumbnail youmax-grid-item youmax-hidden" ><div class="youmax-thumbnail-image-wrapper" ><img class="youmax-main-thumbnail" href="https://www.youtube.com/watch?v='+playlistId+'" src="'+playlistThumbnail+'"></div><div class="youmax-playlist-video-count-wrapper"><div class="youmax-playlist-video-count-box"><span class="youmax-playlist-video-count">'+videoCount+'</span><br>VIDEOS<br><div class="youmax-playlist-line-wrapper"><span class="youmax-playlist-line"></span><br><span class="youmax-playlist-line"></span><br><span class="youmax-playlist-line"></span></div></div></div><p><span class="youmax-video-list-title">'+playlistTitle+'</span><span class="youmax-video-list-views youmax-video-list-date-playlist">'+getDateDiff(playlistUploaded,youmax_translator_text)+' </span></p><div class="youmax-clean-playlist-title">'+playlistTitle+'</div></li>';

			//$youmaxContainerList.append('<li id="'+videoId+'" href="https://www.youtube.com/watch?v='+videoId+'" ><img src="'+videoThumbnail+'"><p><span class="youmax-video-list-title">'+videoTitle+'</span><span class="youmax-video-list-views"></span><span class="youmax-views-date-separator">|</span><span class="youmax-video-list-date">'+getDateDiff(videoUploaded)+'</span></p><div class="youmax-clean-overlay-holder"><span class="youmax-clean-title">'+videoTitle+'</span><span class="youmax-clean-time"></span></span></div></li>');

		}
		
		$items = $(item);
		$youmaxContainerList.append($items);
		
		createGrid($youmaxContainer,"playlist",loadMoreFlag,paginateFlag,$items);
		
		if(youmax_global_options.loadMode.indexOf("paginate")!=-1 && (null==nextPageToken || nextPageToken.indexOf("youmax-generated")==-1)) {
			if(playlistArray.length > 0) {
				cache = $youmaxContainer.data('cache');
				cacheIndex = $youmaxContainer.data('cacheindex');				
				
				cache = cache.concat(playlistArray);
				cacheIndex = cache.length - playlistArray.length - 1;
				//console.log(cache);
				//console.log("cacheIndex : "+cacheIndex);
				
				$youmaxContainer.data('cache',cache);
				$youmaxContainer.data('cacheindex',cacheIndex);				
			}
		}		
	},	
	
	
	//insert HTML for video thumbnails into youmax grid
	insertUserSearchVideos = function(response,searchQuery,loadMoreFlag,$youmaxContainer) {
		//console.log('inside insertUserSearchVideos');
		//console.log(response);
		
		searchQuery=searchQuery.replace(/%20/g," ");

		if(!loadMoreFlag) {
			//$youmaxContainerList.empty();
			if($youmaxContainer.find('.youmax-tab-hover').length==0) {
				$youmaxContainer.find('#youmax-showing-title').append('<div id="query_'+searchQuery+'" class="youmax-tab youmax-tab-hover youmax-showing-search-title"><i class="fa fa-search fa-1x youmax-showing-search-icon"></i>'+searchQuery+'</div>').show();
			}
			
			if(null==response.items || response.items.length==0) {
				var $youmaxContainerList = $youmaxContainer.find('ul');
				$youmaxContainerList.empty().append('<div class="youmax-not-found"><span style="opacity:0;">.</span><br><br><br><br><br><br>No videos found..<br><br><br><br><br><br><span style="opacity:0;">.</span></div>');
			}
			
		}

		
		insertSearchVideos(response,$youmaxContainer,null,null,loadMoreFlag);
	},

	//insert HTML for video thumbnails into youmax grid
	insertSearchVideos = function(response,$youmaxContainer,fileBasedSearch,isEvent,loadMoreFlag,paginateFlag) {
		//console.log('inside insertSearchVideos - '+eventType);
		//console.log("insertSearchVideos");
		//console.log(response);
		var videoIdArray = [], item='';
		var $youmaxContainerList = $youmaxContainer.find('ul');
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = $youmaxContainer.data("youmax_translator_text");
		
		//console.log('loadMoreFlag-'+loadMoreFlag);

		var videoArray = response.items;
		
		if(!fileBasedSearch) {
			var nextPageToken = response.nextPageToken;
			var $youmaxLoadMoreDiv;
			
			if(youmax_global_options.loadMode=="loadmore") {
				$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
			} else if(youmax_global_options.loadMode.indexOf("paginate")!=-1) {
				$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-next-div');
				//$youmaxContainerList.empty();
				if(loadMoreFlag) {
					paginateFlag = true;
				}			
				loadMoreFlag = false;
			} 

			//console.log('nextPageToken-'+nextPageToken);
			
			if(null!=nextPageToken && nextPageToken!="undefined" && nextPageToken!="") {
				if(nextPageToken.indexOf("youmax-generated")==-1) {
					$youmaxLoadMoreDiv.data('nextpagetoken',nextPageToken);
				}
			} else {
				$youmaxLoadMoreDiv.data('nextpagetoken','');
			}
		
		}
		
		//7.0 - added for playlist search via file
		if(null==videoArray || videoArray.length==0) {
			
			return;
		} else {
			$youmaxContainer.find('.youmax-not-found').remove();
		}
		
		//alert(videoArray.length);
		for(var i=0; i<videoArray.length; i++) {
			if(fileBasedSearch) {
				videoId = videoArray[i].id;
			} else {
				videoId = videoArray[i].id.videoId;
			}
			
			if($youmaxContainerList.find('#youtube_'+videoId).length>0) {
				continue;
			}
			
			videoTitle = videoArray[i].snippet.title;
			//console.log('Video title-'+videoTitle);
			if(null!=videoArray[i].snippet.thumbnails) {
				videoThumbnail = videoArray[i].snippet.thumbnails.medium.url;
				if(isEvent) {
					eventType = videoArray[i].snippet.liveBroadcastContent;				
					if(eventType=="upcoming" ) {
						videoThumbnail = videoThumbnail.replace(".jpg","_live.jpg");						
					} else if (eventType=="live") {
						videoThumbnail = videoThumbnail.replace(".jpg","_live.jpg");
					} else if (eventType=="completed") {
						// we do not get event type as completed in search
						//videoThumbnail = videoThumbnail.replace(".jpg","_live.jpg");
					}
				}
			} else {
				videoThumbnail = '';
				continue;
			}
			videoUploaded = videoArray[i].snippet.publishedAt;
			
			videoDescription = videoArray[i].snippet.description;
			videoDescription = processDescription(videoDescription);
			
			channelId = videoArray[i].snippet.channelId;

			
			videoIdArray.push(videoId);
			
			//console.log('videoUploaded-'+videoUploaded);
		
			//$youmaxContainerList.append('<li id="'+videoId+'" href="https://www.youtube.com/watch?v='+videoId+'" ><img src="'+videoThumbnail+'"><p><span class="youmax-video-list-title">'+videoTitle+'</span><span class="youmax-video-list-views"></span><span class="youmax-views-date-separator">|</span><span class="youmax-video-list-date">'+getDateDiff(videoUploaded)+'</span></p><div class="youmax-clean-overlay-holder"><span class="youmax-clean-title">'+videoTitle+'</span><span class="youmax-clean-time"></span></span></div></li>');
			
			videoLink = "https://www.youtube.com/watch?v="+videoId;
			
			item += createItem("youtube",videoId,videoTitle,videoDescription,null,null,null,videoUploaded,videoLink,videoThumbnail,null,null,channelId,youmax_global_options,youmax_translator_text);


			//$youmaxContainerList.append('<li id="youtube_'+videoId+'" data-description="'+videoDescription+'" data-channelid="'+channelId+'" data-videouploaded="'+videoUploaded+'" class="youmax-grid-item youmax-hidden" ><div class="youmax-thumbnail-image-wrapper"><img class="youmax-main-thumbnail" href="https://www.youtube.com/watch?v='+videoId+'" src="'+videoThumbnail+'"><div class="youmax-play-overlay"><div class="youmax-play-icon-holder"><i class="fa fa-play"></i></div></div></div><p><span class="youmax-title-desc-holder"><span class="youmax-video-list-title">'+videoTitle+'</span><span class="youmax-video-list-description">'+videoDescription+'</span></span><span class="youmax-view-date-holder"><span class="youmax-video-list-views" title="views"></span><span class="youmax-views-date-separator">|</span><span class="youmax-video-list-date">'+getDateDiff(videoUploaded,youmax_translator_text)+'</span></span></p><div class="youmax-clean-overlay-holder"><span class="youmax-clean-title">'+videoTitle+'</span><span class="youmax-clean-time"></span></span></div></li>');

			
		}

		$items = $(item);
		$youmaxContainerList.append($items);
		
		createGrid($youmaxContainer,"video",loadMoreFlag,paginateFlag,$items);

		
		getVideoStats(videoIdArray,$youmaxContainer,isEvent);

		if(youmax_global_options.loadMode.indexOf("paginate")!=-1 && (null==nextPageToken || nextPageToken.indexOf("youmax-generated")==-1)) {
			if(videoArray.length > 0) {
				cache = $youmaxContainer.data('cache');
				cacheIndex = $youmaxContainer.data('cacheindex');				

				cache = cache.concat(videoArray);
				cacheIndex = cache.length - videoArray.length - 1;
				//console.log(cache);
				//console.log("cacheIndex : "+cacheIndex);

				$youmaxContainer.data('cache',cache);
				$youmaxContainer.data('cacheindex',cacheIndex);								
			}
		}
		
	},
	
	convertDateFormat = function (timestamp) {
		var jsDate = new Date(timestamp);
		month = ["Jan","Feb","","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
		if(jsDate.getMinutes()<10) {
			minutes = ("0"+jsDate.getMinutes());
		} else {
			minutes = (jsDate.getMinutes());
		}
		return jsDate.getDate()+" "+month[(jsDate.getMonth()+1)]+" "+jsDate.getHours()+":"+minutes+" GMT";
	
	},

	getDateDiff = function (timestamp,youmax_translator_text) {
	
		if(null==timestamp||timestamp==""||timestamp=="undefined")
			return "?";
		//console.log(new Date(timestamp));
		
		dateDiffMS = Math.abs(new Date() - new Date(timestamp));
		//console.log(dateDiffMS);
		
		dateDiffHR = dateDiffMS/1000/60/60;
		if(dateDiffHR>24) {
			dateDiffDY = dateDiffHR/24;
			if(dateDiffDY>30) {
				dateDiffMH = dateDiffDY/30;
				if(dateDiffMH>12) {
					dateDiffYR = dateDiffMH/12;
					dateDiffYR = Math.round(dateDiffYR);
					if(dateDiffYR<=1) {
						return dateDiffYR+" "+youmax_translator_text.year+" "+youmax_translator_text.ago;
					} else {
						return dateDiffYR+" "+youmax_translator_text.years+" "+youmax_translator_text.ago;
					}						
				} else {
					dateDiffMH = Math.round(dateDiffMH);
					if(dateDiffMH<=1) {
						return dateDiffMH+" "+youmax_translator_text.month+" "+youmax_translator_text.ago;
					} else {
						return dateDiffMH+" "+youmax_translator_text.months+" "+youmax_translator_text.ago;
					}						
				}
			} else {
				dateDiffDY = Math.round(dateDiffDY);
				if(dateDiffDY<=1) {
					return dateDiffDY+" "+youmax_translator_text.day+" "+youmax_translator_text.ago;
				} else {
					return dateDiffDY+" "+youmax_translator_text.days+" "+youmax_translator_text.ago;
				}
			}
		} else {
			dateDiffHR = Math.round(dateDiffHR);
			if(dateDiffHR<1) {
				return youmax_translator_text.now;
			}else if(dateDiffHR==1) {
				return dateDiffHR+" "+youmax_translator_text.hour+" "+youmax_translator_text.ago;
			} else {
				return dateDiffHR+" "+youmax_translator_text.hours+" "+youmax_translator_text.ago;
			}
		}		

	
	},
	
	
	/*
	//utility function for date time
	getDateDiff = function (timestamp) {
		if(null==timestamp||timestamp==""||timestamp=="undefined")
			return "?";
		//console.log(timestamp);
		var splitDate=((timestamp.toString().split('T'))[0]).split('-');
		var d1 = new Date();		
		
		var d1Y = d1.getFullYear();
		var d2Y = parseInt(splitDate[0],10);
		var d1M = d1.getMonth();
		var d2M = parseInt(splitDate[1],10);

		var diffInMonths = (d1M+12*d1Y)-(d2M+12*d2Y);
		if(diffInMonths<=1)
			return "1 month";
		else if(diffInMonths<12)
			return  diffInMonths+" months";
		
		var diffInYears = Math.floor(diffInMonths/12);
		
		if(diffInYears<=1)
			return "1 year";
		else if(diffInYears<12)
			return  diffInYears+" years";

	},*/
	
	//create grid layout using Wookmark plugin
	createGrid = function($youmaxContainer,itemType,loadMoreFlag,paginateFlag,$items) {
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');	
		var $youmaxContainerList = $youmaxContainer.find('ul');
		
		
		
		/*
		var options = {
		  autoResize: true, // This will auto-update the layout when the browser window is resized.
		  //container: $youmaxContainer.find('#youmax-video-list-div'), // Optional, used for some extra CSS styling
		  offset: youmax_global_options.innerOffset, // Optional, the distance between grid items
		  itemWidth: youmax_global_options.minItemWidth, // Optional, the width of a grid item
		  flexibleWidth : youmax_global_options.maxItemWidth,
		  outerOffset: youmax_global_options.outerOffset
		};

		var youmax_wookmark;*/
			
		//$youmaxContainerList.imagesLoaded(function() {
		$youmaxContainerList.imagesLoaded().always(function() {
			
			$youmaxContainer.find('.youmax-loading-div').remove();
			
			$youmaxContainerList.find("li.youmax-hidden").removeClass("youmax-hidden");
			
			//console.log("images loaded");
			//$youmaxContainerList.css("opacity","1");
			
			//youmax_wookmark = $youmaxContainerList.wookmark(options);
			//setTimeout(function(){ youmax_wookmark.wookmarkInstance.updateOptions(); }, youmax_global_options.updateLayoutDelay);
			
			if(loadMoreFlag) {
				//console.log("load more grid");
				$youmaxContainerList.masonry('appended',$items);
			} else if (paginateFlag) {
				
				//console.log("paginate grid");
				$oldItems = $youmaxContainerList.find('.youmax-dying');
				//console.log($oldItems);
				$youmaxContainerList.masonry('remove',$oldItems).masonry('layout');
				$youmaxContainerList.masonry('appended',$items);
				
			} else {
				
				if(null!=$youmaxContainerList.data('masonry')) {
					//console.log("destroying masonry");
					$youmaxContainerList.masonry('destroy');
				}
				
				//not sure why time delay is needed
				//setTimeout(function(){
					//console.log("creating grid");			
					$youmaxGrid = $youmaxContainerList.masonry({
						// options...
						//itemSelector: '.grid-item',
						columnWidth: '.youmax-grid-item',
						percentPosition: true
					});
				//}, 100);
				
				//DO NOT REMOVE
				setTimeout(function(){
					//add option to do relayout for slow websites
					//also used by list layout
					console.log("Youmax Re-Layout");
					$youmaxContainer.find('ul').masonry('layout'); 
				}, youmax_global_options.updateLayoutDelay);
				
			}
			
			//my_wookmark.wookmarkInstance.layout(true);
			//youmax_wookmark.wookmarkInstance.updateOptions();
			
			
			/*var options = {
			  autoResize: true, // This will auto-update the layout when the browser window is resized.
			  //container: $youmaxContainer.find('#youmax-video-list-div'), // Optional, used for some extra CSS styling
			  offset: youmax_global_options.innerOffset, // Optional, the distance between grid items
			  itemWidth: youmax_global_options.minItemWidth, // Optional, the width of a grid item
			  flexibleWidth : youmax_global_options.maxItemWidth,
			  outerOffset: youmax_global_options.outerOffset
			};*/

			
			//var handler = $youmaxContainerList.find('li');
			
			// Call the layout function.
			//handler.wookmark(options);
			//var wookmark = $youmaxContainerList.wookmark(options);
			
			if(itemType=="playlist") {
				if(youmax_global_options.playlistAction=="playall") {
					registerPopup($youmaxContainer,true);
				} else {
					$youmaxContainer.find('#youmax-video-list-div .youmax-main-thumbnail').click(function(){
						//console.log($youmaxEncloserIframe);
						$youmaxPlaylistThumbnail = $(this).parents("li").first();
						youmaxPlaylistId = $youmaxPlaylistThumbnail.attr("id");
						displayPlaylist(youmaxPlaylistId,$youmaxContainer);
						youmax_current_playlist_name = $youmaxPlaylistThumbnail.find('.youmax-video-list-title').text();
						$youmaxContainer.data('youmax_current_playlist_name',youmax_current_playlist_name);
						$youmaxContainer.data('youmax_current_playlist_id',youmaxPlaylistId);
					});
				}
			} else {
				registerPopup($youmaxContainer);
			}
			resetLoadMoreButton($youmaxContainer);
			
			if(youmax_global_options.skin.indexOf('trend')!=-1 && ($youmaxContainer.find('#tiles li:first-child').width())<280) {
				$youmaxContainer.find('.youmax-video-list-date').hide();
			}
			
			
		});
	},
	
	resetLoadMoreButton = function($youmaxContainer) {
		
		var $youmaxLoadMoreDiv;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		
		if(youmax_global_options.showTextInsteadOfIcons) {
		
			if(youmax_global_options.loadMode=="loadmore") {
				$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
				$youmaxLoadMoreDiv.html('Load More');
			} else if(youmax_global_options.loadMode.indexOf("paginate")!=-1) {
				$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-next-div');
				$youmaxLoadMoreDiv.html('Next');
				$youmaxContainer.find('#youmax-previous-div').html('Previous');
			}
		
		} else {
		
			if(youmax_global_options.loadMode=="loadmore") {
				$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
				$youmaxLoadMoreDiv.html('<i class="fa fa-plus fa-5x"></i>');
			} else if(youmax_global_options.loadMode.indexOf("paginate")!=-1) {
				$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-next-div');
				$youmaxLoadMoreDiv.html('<i class="fa fa-caret-right fa-5x"></i>');
				$youmaxContainer.find('#youmax-previous-div').html('<i class="fa fa-caret-left fa-5x"></i>');
			}
		
		}
		
		$youmaxLoadMoreDiv.removeClass('youmax-load-more-div-click');
		$youmaxContainer.find('#youmax-previous-div').removeClass('youmax-load-more-div-click');
			
	},
	
	resetLoadMoreComments = function($youmaxPlayBox,youmax_global_options) {
		var $youmaxMoreButton = $youmaxPlayBox.find(".youmax-encloser-comment-button.youmax-more-button");
		$youmaxMoreButton.removeClass('youmax-load-more-comments-clicked');
		
		if(youmax_global_options.showTextInsteadOfIcons) {
			$youmaxMoreButton.html('Load More Comments');
		} else {
			$youmaxMoreButton.html('<i class="fa fa-plus fa-3x"></i>');
		}
	},
	
	//register video popup on video thumbnails
	registerPopup = function($youmaxContainer,isPlaylist) {
	
		var frame_source="";
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = $youmaxContainer.data('youmax_translator_text');
		var youtube_frame_source="", vimeo_frame_source="";
		
		if(youmax_global_options.displayVideo=="popup") {
			//display video in popup
			
			//var tabId = $youmaxContainer.find(".youmax-tab-hover").attr("id");
			//frame_source = generateFrameSource("%id%",isPlaylist,$youmaxContainer);
			
			//youtube frame source
			if(isPlaylist) {
				youtube_frame_source = youmax_global_options.videoProtocol + "//www.youtube.com/embed?listType=playlist&list=%id%&rel=0";
			} else {
				youtube_frame_source = youmax_global_options.videoProtocol + "//www.youtube.com/embed/%id%?rel=0";
			}
			if(youmax_global_options.autoPlayVideo) {
				youtube_frame_source+="&autoplay=1";
			}
			if(youmax_global_options.showTitleInVideoPlayer) {
				youtube_frame_source+="&showinfo=1";
			} else {
				youtube_frame_source+="&showinfo=0";
			}
			youtube_frame_source+="&theme="+youmax_global_options.videoPlayerTheme;

			//vimeo frame source
			vimeo_frame_source = youmax_global_options.videoProtocol + "//player.vimeo.com/video/%id%";
			if(youmax_global_options.autoPlayVideo) {
				vimeo_frame_source+="?autoplay=1";
			}
			
			if(youmax_global_options.showTextInsteadOfIcons) {
				youmaxExtraPopupClasses = 'youmax-text-instead-of-icons';
				youmaxShowCommentsText = 'Show Comments';
				youmaxMoreCommentsText = 'Load More Comments';				
			} else {
				youmaxExtraPopupClasses = '';
				youmaxShowCommentsText = '<i class="fa fa-comments fa-3x"></i>';
				youmaxMoreCommentsText = '<i class="fa fa-plus fa-3x"></i>';
			}	
			
			
			$youmaxContainer.find('#youmax-video-list-div .youmax-main-thumbnail').magnificPopup({
				type:'iframe',
				gallery: {
					enabled:true
				},
				iframe:{
					markup: '<div class="mfp-iframe-scaler">'+
					'<div class="mfp-close"></div>'+
					'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
					//'<div id="youmax-encloser-comment-wrapper" class="youmax-encloser-comment-wrapper-popup"><div class="youmax-encloser-comment-button youmax-show-button youmax-popup-show-button">Show Comments</div><div id="youmax-encloser-comment-holder" class="youmax-encloser-comment-holder-popup"><div class="youmax-video-comment"><textarea class="youmax-comment-textbox" placeholder="Share your Thoughts..."></textarea><button type="button" class="youmax-add-comment-button">G+ Sign In</button></div><div id="youmax-encloser-comments"></div><div class="youmax-encloser-comment-button youmax-more-button">Load More Comments</div></div></div>'+
					'<div id="photo-detail-holder"><div class="photo-popup-title"></div><div class="photo-popup-description photo-popup-description-limited"></div><div class="youmax-full-description-button-wrapper"><div class="youmax-full-description-button">More..</div></div><div class="photo-popup-stats"><div class="media-views"></div><div class="media-likes"> </div><div class="media-uploaded"></div> <div type="button" class="youmax-share-video-button"><i class="fa fa-share-alt fa-2x"></i></div></div>  <div class="youmax-show-button-wrapper"><div class="youmax-encloser-comment-button youmax-show-button youmax-popup-show-button">'+youmaxShowCommentsText+'</div></div> <div id="youmax-encloser-comment-holder" class="youmax-encloser-comment-holder-popup"><div class="youmax-video-comment youmax-commentbox-holder"><textarea class="youmax-comment-textbox" placeholder="'+youmax_translator_text.thoughts+'"></textarea><button type="button" class="youmax-add-comment-button"><i class="fa fa-google-plus fa-2x"></i><span class="youmax-google-login-text">Login</span></button></div><div id="youmax-encloser-comments"></div><div class="youmax-encloser-comment-button youmax-more-button">'+youmaxMoreCommentsText+'</div></div> </div>'+
					'</div>',
					patterns: {
						youtube: {
							src: youtube_frame_source
						},
						vimeo: {
							src: vimeo_frame_source
						}						
					}
				},
				preloader:false,
				showCloseBtn: true, 
				closeBtnInside: true, 
				closeOnContentClick: false, 
				closeOnBgClick: true, 
				enableEscapeKey: true, 
				modal: false, 
				alignTop: youmax_global_options.alignPopupToTop, 
				removalDelay: 100, 
				mainClass: 'youmax-popup '+youmaxExtraPopupClasses,
				//prependTo: $youmaxContainer.get(),
				callbacks: {
					change: function(template, values, item) {
						// Triggers each time when content of popup changes
						//console.log('open:',item);
						var $baseElement = $(this.currItem.el.context).parents("li").first();
						//console.log("$baseElement",$baseElement);
						displayVideoData($baseElement,$youmaxContainer);
						


					}			
				}
			});		
			
			
		} else if(youmax_global_options.displayVideo=="inline" || youmax_global_options.displayVideo=="newpage"){
			//display inline video
			//http://www.youtube.com/embed/%id%?rel=0&autoplay=1
			//var $youmaxEncloserIframe = $youmaxContainer.find('#youmax-encloser-video');
			$youmaxContainer.find('#youmax-video-list-div .youmax-main-thumbnail').click(function() {
				//console.log($youmaxEncloserIframe);
				
				$baseElement = $(this).parents("li").first();
				displayInlineVideo($baseElement,true,true,$youmaxContainer,isPlaylist);
			
			});
			
			if(youmax_global_options.displayVideo=="inline" && youmax_global_options.displayFirstVideoOnLoad) {
				//videoId = $youmaxContainer.find('#youmax-video-list-div li:first').attr('id');
				//displayInlineVideo(videoId,false,false,$youmaxContainer);
				setTimeout(function(){
					//$youmaxContainer.find('#youmax-video-list-div li:first .youmax-main-thumbnail').click();
					$baseElement = $youmaxContainer.find('#youmax-video-list-div li:first');
					displayInlineVideo($baseElement,false,true,$youmaxContainer,isPlaylist);
				}, 100);
				
				youmax_global_options.displayFirstVideoOnLoad=false;
				$youmaxContainer.data('youmax_global_options',youmax_global_options);

			}
			
			if(youmax_global_options.displayVideo=="inline" && youmax_global_options.featuredVideo!="") {
				
				if(youmax_global_options.featuredVideo.indexOf("youtube.com")!=-1) {
					video_type = "youtube";
					video_id = youmax_global_options.featuredVideo.substring(youmax_global_options.featuredVideo.lastIndexOf("?v=")+3);
				} else if(youmax_global_options.featuredVideo.indexOf("vimeo.com")!=-1) {
					video_type = "vimeo";
					video_id = youmax_global_options.featuredVideo.substring(youmax_global_options.featuredVideo.lastIndexOf("/")+1);					
				}

				if(video_type=="youtube") {
					getYoutubeVideoDetails(video_id,$youmaxContainer,false,false);
				} else if(video_type=="vimeo") {
					getVimeoVideoDetails(video_id,$youmaxContainer,false,false);
				} 
				//displayInlineVideo(null,false,false,$youmaxContainer,videoId);
				youmax_global_options.featuredVideo="";
				$youmaxContainer.data('youmax_global_options',youmax_global_options);
			}

		} else if (youmax_global_options.displayVideo=="thumbnail") {
			
			//do nothing - already handled during insert item
			
			/*$youmaxContainer.find('#youmax-video-list-div .youmax-main-thumbnail').click(function() {
				//console.log($youmaxEncloserIframe);
				
				$baseElement = $(this).parents("li").first();
				displayThumbnailVideo($baseElement,true,true,$youmaxContainer,isPlaylist);
			
			});*/
			
		}
	
	},
	
	
/*
	displayThumbnailVideo = function($baseElement,scrollToVideo,generateLink,$youmaxContainer,isPlaylist) {
	
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = $youmaxContainer.data('youmax_translator_text');
		
		video_id_with_type = $baseElement.attr("id");		
		video_type = video_id_with_type.substring(0,video_id_with_type.indexOf("_"));
		video_id = video_id_with_type.substring(video_id_with_type.indexOf("_")+1);		
		frame_source = generateFrameSource(video_id,video_type,isPlaylist,$youmaxContainer);
		
		
		$baseElement.find('.youmax-thumbnail-image-wrapper').empty().append('<div class="fluid-width-video-wrapper" style="padding-top:'+(youmax_global_options.aspectRatio*100)+'%;"><iframe id="youmax-encloser-video" style="width:100%;" src="'+frame_source+'" frameborder="0" allowfullscreen></iframe></div>');
		

	},
*/		
	
	
	displayVideoData = function($baseElement,$youmaxContainer) {
		
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = $youmaxContainer.data("youmax_translator_text");
		
		//var tabId = $youmaxContainer.find(".youmax-tab-hover").attr("id");
		
		video_likes = $baseElement.data("likes");
		video_comments = $baseElement.data("comments");
		video_views = $baseElement.data("views");
		video_description = $baseElement.data("description");
		video_uploaded = $baseElement.find(".youmax-video-list-date").text();
		//console.log(video_likes+"\n"+video_views+"\n"+video_description);
		video_id_with_type = $baseElement.attr("id");
		video_type = video_id_with_type.substring(0,video_id_with_type.indexOf("_"));
		video_id = video_id_with_type.substring(video_id_with_type.indexOf("_")+1);
		video_title = $baseElement.find(".youmax-video-list-title").text();
		channel_id = $baseElement.data("channelid");


		setTimeout(function(){

			if(youmax_global_options.displayVideo=="popup") {
				$youmaxPlayBox = $('.youmax-popup.mfp-gallery');
				//console.log($youmaxPlayBox);
			} else {
				$youmaxPlayBox = $youmaxContainer;
			}
		
			if(null!=video_title) {
				$youmaxPlayBox.find('.photo-popup-title').html(video_title);
			}
			
			if(null!=video_description) {
				video_description = video_description.replace(/\n/g,"<br>");
				$youmaxPlayBox.find('.photo-popup-description').html(video_description);
			}
			
			if(youmax_global_options.showVimeoLikesInsteadOfViews && video_type=="vimeo") {
				if(null!=video_comments) {
					$youmaxPlayBox.find('.media-likes').html('<i class="fa fa-comment"></i>'+video_comments+" "+youmax_translator_text.comments);
				}
				
				if(null!=video_views) {
					$youmaxPlayBox.find('.media-views').html('<i class="fa fa-heart"></i>'+video_likes+" "+youmax_translator_text.likes);
				}
			} else {
				if(null!=video_likes) {
					$youmaxPlayBox.find('.media-likes').html('<i class="fa fa-heart"></i>'+video_likes+" "+youmax_translator_text.likes);
				}
				
				if(null!=video_views) {
					$youmaxPlayBox.find('.media-views').html('<i class="fa fa-video-camera"></i>'+video_views+" "+youmax_translator_text.views);
				}
			}
			
			if(null!=video_uploaded) {
				$youmaxPlayBox.find('.media-uploaded').html('<i class="fa fa-clock-o"></i>'+video_uploaded);
			}
			
			
			/*videoUrl = $youmaxContainer.find('.mfp-content iframe').attr('src');
			videoId = videoUrl.substring(videoUrl.indexOf('/embed/')+7);
			if(videoUrl.indexOf('?')!=-1) {
				videoId = videoId.substring(0,videoId.indexOf('?'));
			}*/
			//console.log('videoId-'+videoId);
			//console.log($youmaxContainer);
			
			$descriptionBox = $youmaxPlayBox.find('.photo-popup-description');
			if($descriptionBox.height()<250) {
				$youmaxPlayBox.find('.youmax-full-description-button-wrapper').hide();
			} else {
				$youmaxPlayBox.find('.youmax-full-description-button').click(function(){
					$descriptionBox.removeClass('photo-popup-description-limited');
					$(this).hide();
				});
			}
			
			
			$youmaxPlayBox.find('.youmax-show-button.youmax-popup-show-button').attr('id',video_id_with_type).show();
			$youmaxPlayBox.find('.youmax-show-button.youmax-popup-show-button').data('channelid',channel_id);
			$youmaxPlayBox.find('.youmax-encloser-comment-button.youmax-more-button').data('start-index',1);
			$youmaxPlayBox.find('#youmax-encloser-comment-holder').hide();
			
			if(youmax_global_options.autoLoadComments) {
				displayComments(video_id_with_type,$youmaxContainer);
			}
			
			video_type = video_id_with_type.substring(0,video_id_with_type.indexOf("_"));
			video_id = video_id_with_type.substring(video_id_with_type.indexOf("_")+1);			
			
			//Share
			if(youmax_global_options.shareLink=="video") {
				if(video_type=="youtube") {
					shareLink = "https://youtu.be/"+video_id;
				} else if(video_type=="vimeo") {
					shareLink = "https://vimeo.com/"+video_id;
				} else {
					shareLink = window.location.href;
				}
			} else {
				shareLink = window.location.href;
			}
			
			config = {
				networks: {
					facebook: {
						app_id: youmax_global_options.facebookAppId
					},
					email: {
						enabled: false
					},
					pinterest: {
						enabled: false
					}
				},
				ui: {
					flyout: 'top center',
					button_text: '<i class="fa fa-2x fa-share-alt"></i>'
				},
				url: shareLink
			};

			new Share('.youmax-share-video-button', config).open();
		
		}, 100);

	},
	
	displayInlineVideo = function($baseElement,scrollToVideo,generateLink,$youmaxContainer,isPlaylist) {
	
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = $youmaxContainer.data('youmax_translator_text');
		
		//$youmaxContainer.find("#youmax-encloser").empty().append('<div class="fluid-width-video-wrapper" style="padding-top:'+(youmax_global_options.aspectRatio*100)+'%;"><iframe id="youmax-encloser-video" style="width:100%;" src="" frameborder="0" allowfullscreen></iframe></div><div id="youmax-encloser-comment-wrapper"><div id="photo-detail-holder"><div class="photo-popup-title"></div><div class="photo-popup-description photo-popup-description-limited"></div><div class="youmax-full-description-button-wrapper"><div class="youmax-full-description-button">More</div></div><div class="photo-popup-stats"><span class="media-views"></span><span class="media-likes"> </span><span class="media-uploaded"></span></div> <div class="youmax-show-button-wrapper"><div class="youmax-encloser-comment-button youmax-show-button youmax-popup-show-button"><i class="fa fa-comments fa-3x"></i></div></div> <div id="youmax-encloser-comment-holder" class="youmax-encloser-comment-holder-popup"><div class="youmax-video-comment youmax-commentbox-holder"><textarea class="youmax-comment-textbox" placeholder="'+youmax_translator_text.thoughts+'"></textarea><button type="button" class="youmax-add-comment-button"><i class="fa fa-sign-in fa-2x"></i></button><div type="button" class="youmax-share-video-button"><i class="fa fa-share fa-2x"></i></div></div><div id="youmax-encloser-comments"></div><div class="youmax-encloser-comment-button youmax-more-button"><i class="fa fa-plus fa-3x"></i></div></div> </div> </div>');

		if(youmax_global_options.showTextInsteadOfIcons) {
			youmaxExtraPopupClasses = 'youmax-text-instead-of-icons';
			youmaxShowCommentsText = 'Show Comments';
			youmaxMoreCommentsText = 'Load More Comments';				
		} else {
			youmaxExtraPopupClasses = '';
			youmaxShowCommentsText = '<i class="fa fa-comments fa-3x"></i>';
			youmaxMoreCommentsText = '<i class="fa fa-plus fa-3x"></i>';
		}	
		
		$youmaxContainer.find("#youmax-encloser").empty().append('<div class="fluid-width-video-wrapper" style="padding-top:'+(youmax_global_options.aspectRatio*100)+'%;"><iframe id="youmax-encloser-video" style="width:100%;" src="" frameborder="0" allowfullscreen></iframe></div><div id="youmax-encloser-comment-wrapper"> <div id="photo-detail-holder"><div class="photo-popup-title"></div><div class="photo-popup-description photo-popup-description-limited"></div><div class="youmax-full-description-button-wrapper"><div class="youmax-full-description-button">More..</div></div><div class="photo-popup-stats"><div class="media-views"></div><div class="media-likes"> </div><div class="media-uploaded"></div> <div type="button" class="youmax-share-video-button"><i class="fa fa-share-alt fa-2x"></i></div></div>  <div class="youmax-show-button-wrapper"><div class="youmax-encloser-comment-button youmax-show-button youmax-popup-show-button">'+youmaxShowCommentsText+'</div></div> <div id="youmax-encloser-comment-holder" class="youmax-encloser-comment-holder-popup"><div class="youmax-video-comment youmax-commentbox-holder"><textarea class="youmax-comment-textbox" placeholder="'+youmax_translator_text.thoughts+'"></textarea><button type="button" class="youmax-add-comment-button"><i class="fa fa-google-plus fa-2x"></i><span class="youmax-google-login-text">Login</span></button></div><div id="youmax-encloser-comments"></div><div class="youmax-encloser-comment-button youmax-more-button">'+youmaxMoreCommentsText+'</div></div></div> </div>');

		
		//$youmaxEncloserIframe = $(this).parent().parent().prev().find('#youmax-encloser-video');
		$youmaxEncloserIframe = $youmaxContainer.find('#youmax-encloser-video');
		$youmaxEncloserIframe.attr("src","");
		$youmaxEncloserIframe.parents("#youmax-encloser").show();		
		
		
		
		
		video_id_with_type = $baseElement.attr("id");		
		video_type = video_id_with_type.substring(0,video_id_with_type.indexOf("_"));
		video_id = video_id_with_type.substring(video_id_with_type.indexOf("_")+1);

			//$youmaxEncloserIframe.show();
		
		
		frame_source = generateFrameSource(video_id,video_type,isPlaylist,youmax_global_options);
		$youmaxEncloserIframe.attr("src",frame_source);
				
		
		displayVideoData($baseElement,$youmaxContainer);
		
		if(scrollToVideo) {
			$('html, body').animate({scrollTop: $youmaxEncloserIframe.offset().top - 50},'slow');
		}
		
		
		//5.0 comments --------------------
		/*$youmaxContainer.find('.youmax-encloser-comment-button.youmax-show-button').attr('id',videoId).show();
		$youmaxContainer.find('.youmax-encloser-comment-button.youmax-more-button').data('start-index',1);
		$youmaxContainer.find('#youmax-encloser-comment-holder').hide();
		
		if(youmax_global_options.autoLoadComments) {
			$youmaxContainer.find('.youmax-encloser-comment-button.youmax-show-button').click();
		}*/
			
		if(youmax_global_options.displayVideo=="newpage") {
			//console.log('generateLink-'+generateLink);
			//6.0 added 
			if(youmax_global_options.linkNewPages && generateLink) {
				if(location.href.indexOf('?v=')==-1 && location.href.indexOf('&v=')==-1 ) {
					location.href += ( location.search.length ? '&' : '?' ) + 'v=' + video_id_with_type;
				} else {
					//console.log(location.href);
					//console.log(location_href[1]);						
					location_href = location.href.match(/(v=.+?)($|&)/,'');
					location.href = location.href.replace(location_href[1],'v=' + video_id_with_type);
				}
			} else {

				//empty thumbnails
				$youmaxContainer.find('#youmax-video-list-div li').remove();
				$youmaxContainer.find('#youmax-video-list-div').css('height','20px');
				//disable load more videos button - no need it will be hidden 
				//$youmaxContainer.find('#youmax-load-more-div').attr('disabled','disabled');
				//remove highlight on tabs
				$youmaxContainer.find('.youmax-tab-hover').removeClass('youmax-tab-hover');
				//show comments
				$youmaxContainer.find('.youmax-encloser-comment-button.youmax-show-button').click();
				//hide showing playlists banner
				$youmaxContainer.find('#youmax-showing-title').empty().hide();
				//$famaxContainerList.find('li').trigger('refreshWookmark');
			
			}
		}
	
	},
	
	generateFrameSource = function(video_id,video_type,isPlaylist,youmax_global_options) {
	
		//var tabId = $youmaxContainer.find(".youmax-tab-hover").attr("id");
		//var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var frame_source="";
		
		
		if(video_type=="youtube") {
			if(isPlaylist) {
				video_id = video_id.substring(video_id.indexOf("playlist_videos_")+16);
				frame_source = youmax_global_options.videoProtocol + "//www.youtube.com/embed?listType=playlist&list="+video_id+"&rel=0";
			} else {
				frame_source = youmax_global_options.videoProtocol + "//www.youtube.com/embed/"+video_id+"?rel=0";
			}
			if(youmax_global_options.autoPlayVideo) {
				frame_source+="&autoplay=1";
			}
			if(youmax_global_options.showTitleInVideoPlayer) {
				frame_source+="&showinfo=1";
			} else {
				frame_source+="&showinfo=0";
			}
			frame_source+="&theme="+youmax_global_options.videoPlayerTheme;
		} else if (video_type=="vimeo") {
			frame_source = youmax_global_options.videoProtocol + "//player.vimeo.com/video/"+video_id;
			if(youmax_global_options.autoPlayVideo) {
				frame_source+="?autoplay=1";
			}
		}
		
		return frame_source;
	
	},
	
	/* removed in 8.0
	//display tabs for search criteria
	displaySearchTab = function(name,restrictToChannels,relatedTo,searchQuery,searchOrder,eventType,count,apiKey,$youmaxContainer) {
		
		searchTabId = 'search_'+count+'_'+$.now();
		$youmaxContainer.find('#youmax-tabs').append('<span id="'+searchTabId+'" class="youmax-tab" >'+name+'</span>');
		$youmaxContainer.find('#youmax-select').append('<option value="'+searchTabId+'" >'+name+'</option>');
		
		$searchTab = $youmaxContainer.find('#'+searchTabId);
	
		//restrictToChannels
		$searchTab.data('restrictToChannels',[]);
		var restrictedChannelArray = restrictToChannels.split(',');
		for(var i=0; i<restrictedChannelArray.length; i++) {
			if(restrictedChannelArray[i]!=null) {
				s=restrictedChannelArray[i].indexOf("/user/");
				//console.log('s-'+s);
				if(s!=-1) {
					userId = restrictedChannelArray[i].substring(s+6);
					//console.log('userId-'+userId);
					apiUrl = "https://www.googleapis.com/youtube/v3/channels?part=id&forUsername="+userId+"&key="+apiKey;
					getChannelIdForSearch(apiUrl,$searchTab);
				} else {
					s=restrictedChannelArray[i].indexOf("/channel/");
					if(s!=-1) {
						channelId = restrictedChannelArray[i].substring(s+9);
						restrictedChannels = $searchTab.data("restrictToChannels");
						//console.log(restrictedChannels);
						restrictedChannels.push(channelId);
						$searchTab.data("restrictToChannels",restrictedChannels);
					} else {
						$searchTab.data("restrictToChannels","");
					}
				}
			}
		}
		
		//relatedTo
		s=relatedTo.indexOf("/watch?v=");
		if(s!=-1) {
			videoId = relatedTo.substring(s+9);
			//console.log('videoId-'+videoId);
			$searchTab.data("relatedTo",videoId);
		} else {
			$searchTab.data("relatedTo","");
		}
		
		//searchQuery
		if(searchQuery!=null) {
			$searchTab.data("searchQuery",searchQuery);
		} else {
			$searchTab.data("searchQuery","");
		}
		
		//searchOrder
		$searchTab.data("searchOrder",searchOrder);
		
		//eventType
		if(eventType!=null) {
			$searchTab.data("eventType",eventType);
		} else {
			$searchTab.data("eventType","");
		}
		
		//click the selectedTab
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		if(youmax_global_options.selectedTab.charAt(0)=='s') {
			searchSelect = (youmax_global_options.selectedTab.charAt(1));
			//console.log('searchSelect-'+searchSelect);
			//console.log('count-'+count);
			if(count.toString()==searchSelect) {
				$('#'+searchTabId).click();
			}
		}
		
	},
	*/
	
	//get search videos when a tab is clicked
	getSearchVideos = function(searchTabId, pageToken, $youmaxContainer) {
	
		var pageTokenUrl = "";
		var loadMoreFlag = false;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var apiKey = youmax_global_options.apiKey;
		var maxResults = youmax_global_options.maxResults;
		
		if(null!=pageToken) {
			pageTokenUrl = "&pageToken="+pageToken;
			loadMoreFlag = true;
		}
		
		if(!loadMoreFlag) {
			//$youmaxContainer.find('ul').empty();
		}	
	
		$searchTab = $('#'+searchTabId);
		//console.log($searchTab);
		restrictedChannels = $searchTab.data("restricttochannels");
		relatedTo = $searchTab.data("relatedto");
		searchQuery = $searchTab.data("searchquery");
		searchOrder = $searchTab.data("searchorder");
		eventType = $searchTab.data("eventtype");
		
		var apiURLArray = [];
		
		var searchQueryString = "";
		if(null!=searchQuery && searchQuery!="") {
		searchQuery=searchQuery.replace(/ /g,"%20");
		searchQueryString = "&q="+(searchQuery);
		}
		
		var relatedToString = "";
		if(null!=relatedTo && relatedTo!="") {
		relatedToString = "&relatedToVideoId="+relatedTo;
		}
		
		var eventTypeString = "", isEvent = false;
		if(null!=eventType && eventType!="") {
		eventTypeString = "&eventType="+eventType;
		isEvent = true;
		}
		
		var searchOrderString = "";
		if(null!=searchOrder && searchOrder!="") {
		searchOrderString = "&order="+searchOrder;
		}
		
		var restrictedChannelsString = "";
		if(null!=restrictedChannels && restrictedChannels!="") {
		restrictedChannelsString = "&channelId="+restrictedChannels;
		}		
		
		/*if(null!=restrictedChannels && restrictedChannels.length>0) {
		restrictedChannelsString = "&channelId="+restrictedChannels[0];
		}
		
		if(restrictedChannels.length>0) {
			maxResults = maxResults/restrictedChannels.length;
		}*/

		
		apiURLArray.push("https://www.googleapis.com/youtube/v3/search?part=snippet"+searchQueryString+relatedToString+eventTypeString+searchOrderString+restrictedChannelsString+"&type=video&maxResults="+maxResults+pageTokenUrl+"&key="+apiKey);

		
		/*for(var l=1; l<restrictedChannels.length; l++) {
			apiURLArray.push("https://www.googleapis.com/youtube/v3/search?part=snippet"+searchQueryString+relatedToString+eventTypeString+searchOrderString+"&channelId="+restrictedChannels[l]+"&type=video&maxResults="+maxResults+pageTokenUrl+"&key="+apiKey);
		}*/
		
		
		//for(var l=0; l<apiURLArray.length; l++) {
			
			apiPlaylistVideosURL = apiURLArray[0];
			//console.log("apiPlaylistVideosURL - "+apiPlaylistVideosURL);
			$.ajax({
				url: apiPlaylistVideosURL,
				type: "GET",
				async: true,
				cache: true,
				dataType: 'jsonp',
				success: function(response) { insertSearchVideos(response,$youmaxContainer,false,isEvent,loadMoreFlag);},
				error: function(html) { alert(html); },
				beforeSend: setHeader
			});
		//}
	},


	//get search videos for search text box
	getUserSearchVideos = function(searchQuery, pageToken, $youmaxContainer) {
	
		var pageTokenUrl = "";
		var loadMoreFlag = false;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var apiKey = youmax_global_options.apiKey;
		var maxResults = youmax_global_options.maxResults;
		
		//console.log('getPlaylistVideos pageToken-'+pageToken);
		if(null!=pageToken) {
			pageTokenUrl = "&pageToken="+pageToken;
			loadMoreFlag = true;
		}
		
		/*if(!loadMoreFlag) {
			$youmaxContainer.find('ul').empty();
		}*/
		
		//searchQuery = searchQuery.substring(searchQuery.indexOf("_")+1);
		if(null!=searchQuery && searchQuery.trim()!="") {
			searchQuery=searchQuery.trim().replace(/ /g,"%20");
		} else {
			return;
		}
		
		var restrictedChannelsString = "";
		if(youmax_global_options.searchBoxScope=="channel") {
			restrictedChannelsString = "&channelId="+youmax_global_options.channelId;
		}
		
		apiSearchURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+searchQuery+"&order=relevance"+restrictedChannelsString+"&type=video&maxResults="+maxResults+pageTokenUrl+"&key="+apiKey;
			
		$.ajax({
			url: apiSearchURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) { insertUserSearchVideos(response,searchQuery,loadMoreFlag,$youmaxContainer);},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
		
		//added for 7.0 - search playlists
		if(null!=youmax_global_options.playlistSearchFile && youmax_global_options.playlistSearchFile!="") {
			$.ajax({
				url: youmax_global_options.playlistSearchFile,
				type: "GET",
				async: true,
				cache: true,
				dataType: 'json',
				success: function(response) { getPlaylistSearchVideos(response,searchQuery,loadMoreFlag,$youmaxContainer);},
				error: function(html) { 
					//console.log("error in getting searchlist",html); 
				},
				beforeSend: setHeader
			});			
		}		
		
	},
	
	getPlaylistSearchVideos = function(response,searchQuery,loadMoreFlag,$youmaxContainer) {
		//console.log("getPlaylistSearchVideos");
		//console.log(response);
		
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');

		searchList = response.searchList;
		searchQueryList=searchQuery.toLowerCase().split("%20");
		searchResult = [];
		//searchResultIndex = 0;
		
		//console.log(searchQueryList);
		
		
		for(var i=0;i<searchList.length;i++) {
			for(var j=0;j<searchQueryList.length;j++) {
				if(searchList[i].videoTitle.indexOf(searchQueryList[j])!=-1) {
					searchResult.push(searchList[i].videoId);
					break;
				}
				if(searchList[i].videoDescription.indexOf(searchQueryList[j])!=-1) {
					searchResult.push(searchList[i].videoId);
					break;
				}
			}
		}
		
		//console.log(searchResult);
		
		if(searchResult.length>0) {
			//get search videos from YouTube
			apiGetVideosURL = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id="+searchResult+"&key="+youmax_global_options.apiKey;
			
			//console.log('apiGetVideosURL-'+apiGetVideosURL);
			
			$.ajax({
				url: apiGetVideosURL,
				type: "GET",
				async: true,
				cache: true,
				dataType: 'jsonp',
				success: function(response) { insertSearchVideos(response,$youmaxContainer,true,null,loadMoreFlag);},
				error: function(html) { alert(html); },
				beforeSend: setHeader
			});
		}
		
		
	
	},
	

	
	//display loading.. text
	showLoader = function($youmaxContainer) {
		$youmaxContainer.find('#youmax-video-list-div>ul').empty();
		$youmaxContainer.find("#youmax-encloser").empty();
		//$youmaxContainer.find('#youmax-video').hide();
		$youmaxContainer.find('#youmax-encloser-video').attr('src','');
		$youmaxContainer.find('#youmax-video-list-div>ul').append('<div class="youmax-loading-div" style="text-align:center; height:200px; font:14px Calibri;"><span style="opacity:0;">.</span><br><br><br><br>loading HD...<br><br><br><br><br><br><span style="opacity:0;">.</span></div>');
		$youmaxContainer.find('#youmax-showing-title').empty().hide();
	},
	
	
	displayComments = function(video_id_with_type, $youmaxContainer) {

		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		if(youmax_global_options.displayVideo=="popup") {
			$youmaxPlayBox = $('.youmax-popup.mfp-gallery');
		} else {
			$youmaxPlayBox = $youmaxContainer;
		}

		video_type = video_id_with_type.substring(0,video_id_with_type.indexOf("_"));
		video_id = video_id_with_type.substring(video_id_with_type.indexOf("_")+1);	
	
		$youmaxPlayBox.find(".youmax-encloser-comment-button.youmax-show-button").hide();
		$youmaxPlayBox.find("#youmax-encloser-comment-holder").show();
		$youmaxPlayBox.find("#youmax-encloser-comments").empty().append("<div class='youmax-loading-comments-div'>loading...</div>");

		
		if(video_type=="youtube") {
			getYoutubeVideoComments(video_id,$youmaxContainer);
		} else if(video_type=="vimeo") {
			getVimeoVideoComments(video_id,$youmaxContainer);
			
			$youmaxPlayBox.find(".youmax-comment-textbox").attr("disabled","disabled").addClass("youmax-disabled");
			$youmaxPlayBox.find(".youmax-add-comment-button").attr("disabled","disabled").addClass("youmax-disabled");
		}

	},

	loadMoreComments = function($youmaxContainer) {
	
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		if(youmax_global_options.displayVideo=="popup") {
			$youmaxPlayBox = $('.youmax-popup.mfp-gallery');
		} else {
			$youmaxPlayBox = $youmaxContainer;
		}	
	
		var $youmaxMoreButton = $youmaxPlayBox.find(".youmax-encloser-comment-button.youmax-more-button");
		$youmaxMoreButton.addClass('youmax-load-more-comments-clicked');
		
		if(youmax_global_options.showTextInsteadOfIcons) {
			$youmaxMoreButton.html('Loading..');
		} else {
			$youmaxMoreButton.html('<i class="fa fa-ellipsis-h fa-3x"></i>');
		}
		
		var nextPageToken = $youmaxMoreButton.data('nextpagetoken');
		//var startIndex = parseInt($youmaxMoreButton.data('start-index'),10);
		
		if(null!=nextPageToken && nextPageToken!="undefined" && nextPageToken!="") {
			
			video_id_with_type = $youmaxPlayBox.find(".youmax-encloser-comment-button.youmax-show-button").attr('id');
			video_type = video_id_with_type.substring(0,video_id_with_type.indexOf("_"));
			video_id = video_id_with_type.substring(video_id_with_type.indexOf("_")+1);	
			
			if(video_type=="youtube") {
				getYoutubeVideoComments(video_id,$youmaxContainer,nextPageToken);
			} else if(video_type=="vimeo") {
				getVimeoVideoComments(video_id,$youmaxContainer,nextPageToken);
			}
		
			//getVideoComments(videoId,$youmaxContainer,nextPageToken);
			//$('html, body').animate({scrollTop: $youmaxCommentHolder.offset().top - 50},'slow');
		} else {
			$youmaxMoreButton.removeClass('youmax-load-more-comments-clicked');
			if(youmax_global_options.showTextInsteadOfIcons) {
				$youmaxMoreButton.html('All Done');
			} else {
				$youmaxMoreButton.html('<i class="fa fa-close fa-3x"></i>');
			}
		}
		
	},
	
	displayPlaylist = function(tabId,$youmaxContainer) {
		
		//clear cache
		cache=[];
		$youmaxContainer.data('cache',cache);
		
		//added to display load more button when any tab is clicked in New Page mode
		$youmaxContainer.removeClass("newpage");
		
		$youmaxContainer.find("#youmax-encloser").hide();
		$youmaxContainer.find("#youmax-encloser-video").attr("src","");
		showLoader($youmaxContainer);
		
		//console.log(tabId);
		
		/*if(playlistId.indexOf("search_")!=-1) {
			getSearchVideos(playlistId,null,$youmaxContainer);
		} else if(playlistId.indexOf("playlists_")!=-1) {
			getChannelPlaylists(playlistId,null,$youmaxContainer);
		} else if(playlistId.indexOf("query_")!=-1) {
			getUserSearchVideos(playlistId,null,$youmaxContainer);
		} else if(playlistId.indexOf("events_")!=-1) {
			getChannelEvents(playlistId,null,$youmaxContainer);
		} else if(playlistId.indexOf("vimeo_")!=-1) {
			getVimeoUserVideos(playlistId,null,$youmaxContainer);
		} else {
			getPlaylistVideos(playlistId,null,$youmaxContainer);			
		}*/
		
		if(tabId.indexOf("youtube_channel_uploads_")!=-1) {
			innerId=tabId.substring(24);
			getPlaylistVideos(innerId,null,$youmaxContainer);
		} else if(tabId.indexOf("youtube_channel_playlists_")!=-1) {
			innerId=tabId.substring(26);
			getChannelPlaylists(innerId,null,$youmaxContainer);
		} else if(tabId.indexOf("youtube_channel_search_")!=-1) {
			//innerId=tabId.substring(23);
			getSearchVideos(tabId,null,$youmaxContainer);
		} else if(tabId.indexOf("youtube_channel_events_")!=-1) {
			innerId=tabId.substring(23);
			getChannelEvents(innerId,null,$youmaxContainer);
		} else if(tabId.indexOf("youtube_playlist_videos_")!=-1) {
			innerId=tabId.substring(24);
			getPlaylistVideos(innerId,null,$youmaxContainer);
		} else if(tabId.indexOf("vimeo_user_videos_")!=-1) {
			innerId=tabId.substring(18);
			getVimeoUserVideos(innerId,null,$youmaxContainer);
		} else if(tabId.indexOf("vimeo_channel_videos_")!=-1) {
			innerId=tabId.substring(21);
			getVimeoChannelVideos(innerId,null,$youmaxContainer);
		} else if(tabId.indexOf("vimeo_group_videos_")!=-1) {
			innerId=tabId.substring(19);
			getVimeoGroupVideos(innerId,null,$youmaxContainer);
		} else if(tabId.indexOf("vimeo_album_videos_")!=-1) {
			innerId=tabId.substring(19);
			getVimeoAlbumVideos(innerId,null,$youmaxContainer);
		} else if(tabId.indexOf("query_")!=-1) {
			innerId=tabId.substring(6);
			getUserSearchVideos(innerId,null,$youmaxContainer);	
		}		
		
		$youmaxContainer.find('.youmax-tab').removeClass('youmax-tab-hover');	
		$('#'+tabId).addClass('youmax-tab-hover');
		$youmaxContainer.find('#youmax-select').val(tabId);

	},
	
	initTranlator = function($youmaxContainer) {
	
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = {
			"search":"Search",
			"uploads":"Uploads",
			"playlists":"Playlists",
			"events":"Events",
			"views":"views",
			"likes":"likes",
			"videos":"videos",
			"subscribers":"subscribers",
			"year":"year",
			"years":"years",
			"month":"month",
			"months":"months",
			"day":"day",
			"days":"days",
			"hour":"hour",
			"hours":"hours",
			"ago":"ago",
			"now":"just now",
			"thoughts":"Share your Thoughts...",
			"comments":"comments"
		};
		
		$youmaxContainer.data("youmax_translator_text",youmax_translator_text);
		
		if(null!=youmax_global_options.translatorFile && youmax_global_options.translatorFile!="") {
			getTranslationFile($youmaxContainer);
		} else {
			initiatePlugin($youmaxContainer);
		}
	
	},
	
	getTranslationFile = function($youmaxContainer) {
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		$.ajax({
			url: youmax_global_options.translatorFile,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'json',
			success: function(response) { applyTranslation(response,$youmaxContainer);},
			error: function(html) { 
				//console.log("error in getting searchlist",html); 
				initiatePlugin($youmaxContainer);
			},
			beforeSend: setHeader
		});			
	},
	
	applyTranslation = function(response,$youmaxContainer) {
		
		//console.log(response);
		youmax_translator_text = response.translator;
		$youmaxContainer.data('youmax_translator_text',youmax_translator_text);
		
		initiatePlugin($youmaxContainer);
		

	},
	
	initiatePlugin = function($youmaxContainer) {
	
		initYoumax($youmaxContainer);

		initVideo($youmaxContainer);
		
		createTabs($youmaxContainer);
		
		initHeader($youmaxContainer);
		
		
		/*		
		initPlaylist($youmaxContainer);

		initSearch($youmaxContainer);
		*/
	},
	
	createTabs = function($youmaxContainer) {
		
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		
		$tabContainer = $youmaxContainer.find('#youmax-tabs');
		$selectConatiner = $youmaxContainer.find('#youmax-select');
		
		//YouTube Channel Uploads Tabs
		if(null!=youmax_global_options.youtube_channel_uploads) {
			for(i=0; i<youmax_global_options.youtube_channel_uploads.length; i++) {
			
				if(youmax_global_options.doNotSelectTabsByDefault) {
					youmax_global_options.youtube_channel_uploads[i].selected = false;
				}
				
				channelId = scrapeChannelId(youmax_global_options.youtube_channel_uploads[i].url,"youtube_channel_uploads_",$youmaxContainer,youmax_global_options.youtube_channel_uploads[i].selected);
				
				$tabContainer.append('<span id="youtube_channel_uploads_'+channelId+'" class="youmax-tab" >'+youmax_global_options.youtube_channel_uploads[i].name.replace(/%20/g,' ')+'</span>');
				
				$selectConatiner.append('<option value="youtube_channel_uploads_'+channelId+'" class="youmax-option-highlight" >'+youmax_global_options.youtube_channel_uploads[i].name.replace(/%20/g,' ')+'</option>');			
				
			}
		}
		
		//YouTube Channel Playlists Tabs
		if(null!=youmax_global_options.youtube_channel_playlists) {		
			for(i=0; i<youmax_global_options.youtube_channel_playlists.length; i++) {
			
				if(youmax_global_options.doNotSelectTabsByDefault) {
					youmax_global_options.youtube_channel_playlists[i].selected = false;
				}		
				
				channelId = scrapeChannelId(youmax_global_options.youtube_channel_playlists[i].url,"youtube_channel_playlists_",$youmaxContainer,youmax_global_options.youtube_channel_playlists[i].selected);
				
				$tabContainer.append('<span id="youtube_channel_playlists_'+channelId+'" class="youmax-tab" >'+youmax_global_options.youtube_channel_playlists[i].name.replace(/%20/g,' ')+'</span>');
				
				$selectConatiner.append('<option value="youtube_channel_playlists_'+channelId+'" class="youmax-option-highlight" >'+youmax_global_options.youtube_channel_playlists[i].name.replace(/%20/g,' ')+'</option>');
				
				if(youmax_global_options.youtube_channel_playlists[i].selected) {
					$tabContainer.find('#youtube_channel_playlists_'+channelId).click();
				}			
				
			}
		}
		
		//YouTube Channel Events Tabs
		if(null!=youmax_global_options.youtube_channel_events) {				
			for(i=0; i<youmax_global_options.youtube_channel_events.length; i++) {
				
				if(youmax_global_options.doNotSelectTabsByDefault) {
					youmax_global_options.youtube_channel_events[i].selected = false;
				}
				
				channelId = scrapeChannelId(youmax_global_options.youtube_channel_events[i].url,"youtube_channel_events_",$youmaxContainer,youmax_global_options.youtube_channel_events[i].selected);
				
				$tabContainer.append('<span id="youtube_channel_events_'+channelId+'" class="youmax-tab" >'+youmax_global_options.youtube_channel_events[i].name.replace(/%20/g,' ')+'</span>');
				
				$selectConatiner.append('<option value="youtube_channel_events_'+channelId+'" class="youmax-option-highlight" >'+youmax_global_options.youtube_channel_events[i].name.replace(/%20/g,' ')+'</option>');
				
				if(youmax_global_options.youtube_channel_events[i].selected) {
					$tabContainer.find('#youtube_channel_events_'+channelId).click();
				}			
				
			}
		}
		
		//YouTube Search Tabs
		if(null!=youmax_global_options.youtube_channel_search) {				
			for(i=0; i<youmax_global_options.youtube_channel_search.length; i++) {
				
				dataString = '';
				suffix = (new Date()).getTime();

				if(youmax_global_options.doNotSelectTabsByDefault) {
					youmax_global_options.youtube_channel_search[i].selected = false;
				}
				
				//restrictToChannels
				if(youmax_global_options.youtube_channel_search[i].restrictToChannels!=null) {
					channelId = scrapeChannelId(youmax_global_options.youtube_channel_search[i].restrictToChannels,"youtube_channel_search_"+suffix,$youmaxContainer,youmax_global_options.youtube_channel_search[i].selected);
					dataString += ' data-restricttochannels="'+channelId+'"';
				} else {
					dataString += ' data-restricttochannels=""';
				}

				//relatedTo
				if(youmax_global_options.youtube_channel_search[i].relatedTo!=null) {
					s=youmax_global_options.youtube_channel_search[i].relatedTo.indexOf("/watch?v=");
					if(s!=-1) {
						videoId = youmax_global_options.youtube_channel_search[i].relatedTo.substring(s+9);
						dataString += ' data-relatedto="'+videoId+'"';					
					} else {
						dataString += ' data-relatedto=""';
					}			
				} else {
					dataString += ' data-relatedto=""';
				}
				
				
				//searchQuery
				if(youmax_global_options.youtube_channel_search[i].searchQuery!=null) {
					dataString += ' data-searchquery="'+youmax_global_options.youtube_channel_search[i].searchQuery+'"';
				} else {
					dataString += ' data-searchquery=""';
				}
				
				
				//searchOrder
				if(youmax_global_options.youtube_channel_search[i].searchOrder!=null) {
					dataString += ' data-searchorder="'+youmax_global_options.youtube_channel_search[i].searchOrder+'"';
				} else {
					dataString += ' data-searchorder="date"';
				}
				

				//eventType
				if(youmax_global_options.youtube_channel_search[i].eventType!=null) {
					dataString += ' data-eventtype="'+youmax_global_options.youtube_channel_search[i].eventType+'"';
				} else {
					dataString += ' data-eventtype=""';
				}

				
				$tabContainer.append('<span id="youtube_channel_search_'+suffix+'" class="youmax-tab" '+dataString+' >'+youmax_global_options.youtube_channel_search[i].name.replace(/%20/g,' ')+'</span>');
				
				$selectConatiner.append('<option value="youtube_channel_search_'+suffix+'" class="youmax-option-highlight" '+dataString+' >'+youmax_global_options.youtube_channel_search[i].name.replace(/%20/g,' ')+'</option>');
				
				if(youmax_global_options.youtube_channel_search[i].selected) {
					$tabContainer.find('#youtube_channel_search_'+suffix).click();
				}			
				
			}
		}
		
		//YouTube Playlist Tabs
		if(null!=youmax_global_options.youtube_playlist_videos) {
			for(i=0; i<youmax_global_options.youtube_playlist_videos.length; i++) {

				if(youmax_global_options.doNotSelectTabsByDefault) {
					youmax_global_options.youtube_playlist_videos[i].selected = false;
				}
			
				s=youmax_global_options.youtube_playlist_videos[i].url.indexOf("list=");
				if(s!=-1) {
					playlistId = youmax_global_options.youtube_playlist_videos[i].url.substring(s+5);
				} else {
					playlistId = "null";
					alert("Could Not List Videos.."+youmax_global_options.youtube_playlist_videos[i].url);
				}			
				
				$tabContainer.append('<span id="youtube_playlist_videos_'+playlistId+'" class="youmax-tab" >'+youmax_global_options.youtube_playlist_videos[i].name.replace(/%20/g,' ')+'</span>');
				
				$selectConatiner.append('<option value="youtube_playlist_videos_'+playlistId+'" class="youmax-option-highlight" >'+youmax_global_options.youtube_playlist_videos[i].name.replace(/%20/g,' ')+'</option>');
				
				if(youmax_global_options.youtube_playlist_videos[i].selected) {
					$tabContainer.find('#youtube_playlist_videos_'+playlistId).click();
				}
				
			}
		}
		
		//Vimeo User Tabs
		if(null!=youmax_global_options.vimeo_user_videos) {		
			for(i=0; i<youmax_global_options.vimeo_user_videos.length; i++) {

				if(youmax_global_options.doNotSelectTabsByDefault) {
					youmax_global_options.vimeo_user_videos[i].selected = false;
				}
			
				s=youmax_global_options.vimeo_user_videos[i].url.indexOf("vimeo.com/");
				if(s!=-1) {
					vimeoId = youmax_global_options.vimeo_user_videos[i].url.substring(s+10);
				} else {
					vimeoId = "null";
					alert("Could Not Find Vimeo User.."+youmax_global_options.vimeo_user_videos[i].url);
				}
				
				$tabContainer.append('<span id="vimeo_user_videos_'+vimeoId+'" class="youmax-tab" >'+youmax_global_options.vimeo_user_videos[i].name.replace(/%20/g,' ')+'</span>');
				
				$selectConatiner.append('<option value="vimeo_user_videos_'+vimeoId+'" class="youmax-option-highlight" >'+youmax_global_options.vimeo_user_videos[i].name.replace(/%20/g,' ')+'</option>');
				
				if(youmax_global_options.vimeo_user_videos[i].selected) {
					$tabContainer.find('#vimeo_user_videos_'+vimeoId).click();
				}			
				
			}
		}

		//Vimeo Channel Tabs
		if(null!=youmax_global_options.vimeo_channel_videos) {
			for(i=0; i<youmax_global_options.vimeo_channel_videos.length; i++) {

				if(youmax_global_options.doNotSelectTabsByDefault) {
					youmax_global_options.vimeo_channel_videos[i].selected = false;
				}
			
				s=youmax_global_options.vimeo_channel_videos[i].url.indexOf("vimeo.com/channels/");
				if(s!=-1) {
					vimeoId = youmax_global_options.vimeo_channel_videos[i].url.substring(s+19);
				} else {
					vimeoId = "null";
					alert("Could Not Find Vimeo User.."+youmax_global_options.vimeo_channel_videos[i].url);
				}
				
				$tabContainer.append('<span id="vimeo_channel_videos_'+vimeoId+'" class="youmax-tab" >'+youmax_global_options.vimeo_channel_videos[i].name.replace(/%20/g,' ')+'</span>');
				
				$selectConatiner.append('<option value="vimeo_channel_videos_'+vimeoId+'" class="youmax-option-highlight" >'+youmax_global_options.vimeo_channel_videos[i].name.replace(/%20/g,' ')+'</option>');
				
				if(youmax_global_options.vimeo_channel_videos[i].selected) {
					$tabContainer.find('#vimeo_channel_videos_'+vimeoId).click();
				}			
				
			}
		}
		
		

		//Vimeo Group Tabs
		if(null!=youmax_global_options.vimeo_group_videos) {
			for(i=0; i<youmax_global_options.vimeo_group_videos.length; i++) {

				if(youmax_global_options.doNotSelectTabsByDefault) {
					youmax_global_options.vimeo_group_videos[i].selected = false;
				}
			
				s=youmax_global_options.vimeo_group_videos[i].url.indexOf("vimeo.com/groups/");
				if(s!=-1) {
					vimeoId = youmax_global_options.vimeo_group_videos[i].url.substring(s+17);
				} else {
					vimeoId = "null";
					alert("Could Not Find Vimeo Group.."+youmax_global_options.vimeo_group_videos[i].url);
				}
				
				$tabContainer.append('<span id="vimeo_group_videos_'+vimeoId+'" class="youmax-tab" >'+youmax_global_options.vimeo_group_videos[i].name.replace(/%20/g,' ')+'</span>');
				
				$selectConatiner.append('<option value="vimeo_group_videos_'+vimeoId+'" class="youmax-option-highlight" >'+youmax_global_options.vimeo_group_videos[i].name.replace(/%20/g,' ')+'</option>');
				
				if(youmax_global_options.vimeo_group_videos[i].selected) {
					$tabContainer.find('#vimeo_group_videos_'+vimeoId).click();
				}			
				
			}
		}
				
		
		
		//Vimeo Album Tabs
		if(null!=youmax_global_options.vimeo_album_videos) {
			for(i=0; i<youmax_global_options.vimeo_album_videos.length; i++) {

				if(youmax_global_options.doNotSelectTabsByDefault) {
					youmax_global_options.vimeo_album_videos[i].selected = false;
				}
			
				s=youmax_global_options.vimeo_album_videos[i].url.indexOf("vimeo.com/album/");
				if(s!=-1) {
					vimeoId = youmax_global_options.vimeo_album_videos[i].url.substring(s+16);
				} else {
					vimeoId = "null";
					alert("Could Not Find Vimeo Album.."+youmax_global_options.vimeo_album_videos[i].url);
				}
				
				$tabContainer.append('<span id="vimeo_album_videos_'+vimeoId+'" class="youmax-tab" >'+youmax_global_options.vimeo_album_videos[i].name.replace(/%20/g,' ')+'</span>');
				
				$selectConatiner.append('<option value="vimeo_album_videos_'+vimeoId+'" class="youmax-option-highlight" >'+youmax_global_options.vimeo_album_videos[i].name.replace(/%20/g,' ')+'</option>');
				
				if(youmax_global_options.vimeo_album_videos[i].selected) {
					$tabContainer.find('#vimeo_album_videos_'+vimeoId).click();
				}			
				
			}
		}
		
	
	},
	
	scrapeChannelId = function(channel_url,tab_prefix,$youmaxContainer,isSelected) {

		channelId = "null";
		s=channel_url.indexOf("/user/");
		//console.log('s-'+s);
		if(s!=-1) {
			channelId = channel_url.substring(s+6);
			getChannelIdForTabs(channelId,tab_prefix,$youmaxContainer,isSelected);
		} else {
			s=channel_url.indexOf("/channel/");
			if(s!=-1) {
				channelId = channel_url.substring(s+9);
				if(tab_prefix=="youtube_channel_uploads_") {
					getUploadsPlaylistIdForTabs(channelId,tab_prefix,$youmaxContainer,isSelected);
				}
			} else {
				alert("Could Not Find Channel.."+channel_url);
			}
		}
		
		return channelId;
	
	},
	
	initHeader = function($youmaxContainer) {
	
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var s;
		
		//Get Channel header and details 
		if(youmax_global_options.channel!=null) {
			s=youmax_global_options.channel.indexOf("/user/");
			//console.log('s-'+s);
			if(s!=-1) {
				userId = youmax_global_options.channel.substring(s+6);
				//console.log('userId-'+userId);
				apiUrl = "https://www.googleapis.com/youtube/v3/channels?part=id&forUsername="+userId+"&key="+youmax_global_options.apiKey;
				getChannelId(apiUrl,$youmaxContainer);
			} else {
				s=youmax_global_options.channel.indexOf("/channel/");
				if(s!=-1) {
					channelId = youmax_global_options.channel.substring(s+9);
					//console.log('channelId-'+channelId);
					getChannelDetails(channelId,$youmaxContainer);
				} else {
					alert("Could Not Find Channel..");
				}
			}
		}

	},
	
	/* removed in 8.0

	initPlaylist = function($youmaxContainer) {
	
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var s,playlistIdArray = [];

		//get playlist details
		if($.isArray(youmax_global_options.playList)) {
			for(var i=0; i<youmax_global_options.playList.length; i++) {
				s=youmax_global_options.playList[i].indexOf("list=");
				//console.log('s-'+s);
				if(s!=-1) {
					playlistId = youmax_global_options.playList[i].substring(s+5);
					//console.log('playlistId-'+playlistId);
					playlistIdArray.push(playlistId);
				} else {
					//alert("Could Not List Videos..");
				}
			}
		}
		
		//get all playlist details
		getPlaylistDetails(playlistIdArray,$youmaxContainer);
	
	},
	
	initSearch = function($youmaxContainer) {
		
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var searchDefaults = {name:'Search',restrictToChannels:'',relatedTo:'',searchQuery:'',searchOrder:'',eventType:''};

		//display search tabs
		if($.isArray(youmax_global_options.searchTab)) {
			for(var i=0; i<youmax_global_options.searchTab.length; i++) {
				searchOptions=youmax_global_options.searchTab[i];
				//console.log(searchOptions);
				if(null!=searchOptions) {
					displaySearchTab(searchOptions.name||searchDefaults.name,
									searchOptions.restrictToChannels||searchDefaults.restrictToChannels,
									searchOptions.relatedTo||searchDefaults.relatedTo,
									searchOptions.searchQuery||searchDefaults.searchQuery,
									searchOptions.searchOrder||searchDefaults.searchOrder,
									searchOptions.eventType||searchDefaults.eventType,
									(i+1),
									youmax_global_options.apiKey,
									$youmaxContainer);
				
				} else {
					//alert("Could Not List Videos..");
				}
			}
		}
		
	},
	*/
	
	
	initVideo = function($youmaxContainer) {
		
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
	
		if(youmax_global_options.displayVideo=="newpage" && youmax_global_options.linkNewPages) {
			displayVideoFromUrl($youmaxContainer);
		}
	
	},
	
	displayVideoFromUrl = function($youmaxContainer) {
		if(location.href.indexOf('v=')!=-1) {
			location_href = location.href.match(/v=(.+?)($|&)/,'');
			video_id_with_type = location_href[1];

			video_type = video_id_with_type.substring(0,video_id_with_type.indexOf("_"));
			video_id = video_id_with_type.substring(video_id_with_type.indexOf("_")+1);	

			if(video_type=="youtube") {
				getYoutubeVideoDetails(video_id,$youmaxContainer,false,false);
			} else if(video_type=="vimeo") {
				getVimeoVideoDetails(video_id,$youmaxContainer,false,false);
			} 
			
			//displayInlineVideo(null,false,false,$youmaxContainer,videoId);
			
			var youmax_global_options = $youmaxContainer.data('youmax_global_options');
			youmax_global_options.doNotSelectTabsByDefault=true;
			$youmaxContainer.data('youmax_global_options',youmax_global_options);
			
			$youmaxContainer.addClass("newpage");
		}
	},
	
	setMediaQueries = function(containerWidth,$youmaxContainer) {
	
		$youmaxContainer.removeClass("gt1400 gt1350 gt1300 gt1250 gt1200 gt1150 gt1100 gt1050 gt1000 gt950 gt900 lt1400 lt1350 lt1300 lt1250 lt1200 lt1150 lt1100 lt1050 lt1000 lt950 lt900 lt850 lt800 lt750 lt700 lt650 lt600 lt550 lt500 lt450 lt400");
		
		//adding media queries manually
		
		//greater than classes
		if(containerWidth>1250) {
			$youmaxContainer.addClass("gt1400");
		}

		if(containerWidth>1250) {
			$youmaxContainer.addClass("gt1350");
		}

		if(containerWidth>1250) {
			$youmaxContainer.addClass("gt1300");
		}

		if(containerWidth>1250) {
			$youmaxContainer.addClass("gt1250");
		}

		if(containerWidth>1200) {
			$youmaxContainer.addClass("gt1200");
		}

		if(containerWidth>1150) {
			$youmaxContainer.addClass("gt1150");
		}

		if(containerWidth>1100) {
			$youmaxContainer.addClass("gt1100");
		}

		if(containerWidth>1050) {
			$youmaxContainer.addClass("gt1050");
		}

		if(containerWidth>1000) {
			$youmaxContainer.addClass("gt1000");
		}
		
		if(containerWidth>950) {
			$youmaxContainer.addClass("gt950");
		}
		
		if(containerWidth>900) {
			$youmaxContainer.addClass("gt900");
		}
		
		//less than classes
		if(containerWidth<1250) {
			$youmaxContainer.addClass("lt1400");
		}		

		if(containerWidth<1250) {
			$youmaxContainer.addClass("lt1350");
		}		

		if(containerWidth<1250) {
			$youmaxContainer.addClass("lt1300");
		}		

		if(containerWidth<1250) {
			$youmaxContainer.addClass("lt1250");
		}		

		if(containerWidth<1200) {
			$youmaxContainer.addClass("lt1200");
		}		

		if(containerWidth<1150) {
			$youmaxContainer.addClass("lt1150");
		}		

		if(containerWidth<1100) {
			$youmaxContainer.addClass("lt1100");
		}		

		if(containerWidth<1050) {
			$youmaxContainer.addClass("lt1050");
		}		

		if(containerWidth<1000) {
			$youmaxContainer.addClass("lt1000");
		}		

		if(containerWidth<950) {
			$youmaxContainer.addClass("lt950");
		}		

		if(containerWidth<900) {
			$youmaxContainer.addClass("lt900");
		}

		if(containerWidth<850) {
			$youmaxContainer.addClass("lt850");
		}

		if(containerWidth<800) {
			$youmaxContainer.addClass("lt800");			
		}

		if(containerWidth<750) {
			$youmaxContainer.addClass("lt750");			
		}

		if(containerWidth<700) {
			$youmaxContainer.addClass("lt700");			
		}

		if(containerWidth<650) {
			$youmaxContainer.addClass("lt650");			
		}

		if(containerWidth<600) {
			$youmaxContainer.addClass("lt600");			
		}

		if(containerWidth<550) {
			$youmaxContainer.addClass("lt550");
		}
		
		if(containerWidth<500) {
			$youmaxContainer.addClass("lt500");
		}
		
		if(containerWidth<450) {
			$youmaxContainer.addClass("lt450");
		}	
	
		if(containerWidth<400) {
			$youmaxContainer.addClass("lt400");
		}	
	
	
	};




	//youmax plugin definition
    $.fn.youmax = function(options) {
		
		var youmax_global_options = {};
		var $youmaxContainer = this;
		//console.log($youmaxContainer.attr('id'));

		//Get CSS for Skins
		//console.log('options.skin-'+options.skin);
		options.skin = options.skin||"block";
		if(options.skin.indexOf("white")!=-1 || options.skin.indexOf("grey")!=-1 || options.skin.indexOf("blue")!=-1 || options.skin.indexOf("clean")!=-1 || options.skin.indexOf("block")!=-1 || options.skin.indexOf("list")!=-1 || options.skin.indexOf("trend")!=-1) {
			skin_file = options.skin.replace(/\d+$/, "");
			if (document.createStyleSheet){
                document.createStyleSheet("./css/youmax_"+skin_file+".min.css");
            } else {
                $("head").append("<link rel='stylesheet' href='./css/youmax_"+skin_file+".min.css' type='text/css' />");
            }
		} else {
			//don't load any styles
			//user will load them manually
		}
		
		//set local options
		youmax_global_options.apiKey = options.apiKey||'AIzaSyDEm5wGLsWi2G3WG40re-DAJcWioQSpJ6o';
		youmax_global_options.channel = options.channel||'https://www.youtube.com/channel/UC_IRYSp4auq7hKLvziWVH6w';
		youmax_global_options.clientId = options.clientId||'237485577723-lndqepqthdb3lh4gec2skvpfaii9sgh0.apps.googleusercontent.com';
		youmax_global_options.maxResults = options.maxResults||18;
		
		//removed because Grid is now updated
		/*youmax_global_options.innerOffset = options.innerOffset||25;
		youmax_global_options.outerOffset = options.outerOffset||35;
		youmax_global_options.minItemWidth = options.minItemWidth||250;
		youmax_global_options.maxItemWidth = options.maxItemWidth||400;*/
		
		//5.0 - can be popup|inline|newpage
		youmax_global_options.displayVideo = options.displayVideo||'popup';
		youmax_global_options.aspectRatio = 360/640;
		//youmax_global_options.selectedTab = options.selectedTab||"u"; //can be u|s1|s2|...|p1|p2|...|l
		youmax_global_options.alwaysUseDropdown = options.alwaysUseDropdown;
		youmax_global_options.maxPlaylistNameLength = 22;
		
		//added in 5.0
		youmax_global_options.autoPlayVideo = options.autoPlayVideo||false;
		youmax_global_options.displayFirstVideoOnLoad = options.displayFirstVideoOnLoad||false;
		//youmax_global_options.imagesFolderPath = options.imagesFolderPath||"./images";
		
		//added in 6.0
		youmax_global_options.linkNewPages = options.linkNewPages||false;
		youmax_global_options.videoProtocol = options.videoProtocol||"http:";
		youmax_global_options.featuredVideo = options.featuredVideo||"";
		youmax_global_options.searchBoxScope = options.searchBoxScope||"channel";
		youmax_global_options.autoLoadComments = options.autoLoadComments||false;
		youmax_global_options.alignPopupToTop = options.alignPopupToTop;
		
		//added in 7.0
		youmax_global_options.commentOrder = options.commentOrder||"time"; //time|relevance
		youmax_global_options.playlistSearchFile = options.playlistSearchFile||"";
		youmax_global_options.skin = options.skin||"block";
		youmax_global_options.userWebsite = options.userWebsite||"";
		youmax_global_options.videoMode = options.videoMode||"wide"; //wide or narrow
		youmax_global_options.shareLink = options.shareLink||"video"; //video or website
		youmax_global_options.facebookAppId = options.facebookAppId||""; 
		youmax_global_options.widgetMode = options.widgetMode||false; 
		
		//added in 7.3
		youmax_global_options.viewCountType = options.viewCountType||"abbr"; //comma or abbr 
		youmax_global_options.showEvents = options.showEvents||false;
		youmax_global_options.likeCommentCountType = options.likeCommentCountType||"abbr"; //comma or abbr 
		youmax_global_options.loadMode = options.loadMode||"loadmore"; //loadmore or paginate-sides or paginate-bottom 
		youmax_global_options.hideHeader = options.hideHeader||false; 
		youmax_global_options.hideNavigation = options.hideNavigation||false; 
		youmax_global_options.loadButtonSize = options.loadButtonSize||"large"; //small or large
		youmax_global_options.playlistAction = options.playlistAction||"showvideos"; //playall or showvideos		
		youmax_global_options.videoPlayerTheme = options.videoPlayerTheme||"dark"; //dark or light
		youmax_global_options.hideComments = options.hideComments||false; 
		youmax_global_options.minVideoContainerHeight = options.minVideoContainerHeight||10;
		youmax_global_options.hideVideoThumbnails = options.hideVideoThumbnails||false; 
		youmax_global_options.hideLoadMore = options.hideLoadMore||false; 
		youmax_global_options.showTitleInVideoPlayer = options.showTitleInVideoPlayer; 
		youmax_global_options.translatorFile = options.translatorFile||"";
		youmax_global_options.hideVideoDetails = options.hideVideoDetails||false; 
		
		//added in 8.0
		youmax_global_options.vimeoAccessToken = options.vimeoAccessToken||'c289d754a132ca07051aaf931ef0de33'; 
		youmax_global_options.youtube_channel_uploads = options.youtube_channel_uploads; 
		youmax_global_options.youtube_channel_playlists = options.youtube_channel_playlists; 
		youmax_global_options.youtube_channel_events = options.youtube_channel_events; 
		youmax_global_options.youtube_channel_search = options.youtube_channel_search; 
		youmax_global_options.youtube_playlist_videos = options.youtube_playlist_videos; 
		youmax_global_options.vimeo_user_videos = options.vimeo_user_videos; 
		youmax_global_options.vimeo_channel_videos = options.vimeo_channel_videos; 
		youmax_global_options.vimeo_group_videos = options.vimeo_group_videos; 
		youmax_global_options.vimeo_album_videos = options.vimeo_album_videos; 
		youmax_global_options.showVimeoLikesInsteadOfViews = options.showVimeoLikesInsteadOfViews||false; 
		
		//added in 8.2
		youmax_global_options.updateLayoutDelay = options.updateLayoutDelay||500; 
		youmax_global_options.hotThreshold = options.hotThreshold||300;
		youmax_global_options.trendingThreshold = options.trendingThreshold||100;

		//added in 8.4
		youmax_global_options.minimumFadeTimeout = options.minimumFadeTimeout||1000; 
		youmax_global_options.showTopAdSpace = options.showTopAdSpace||false;
		youmax_global_options.topAdHtml = options.topAdHtml||'';
		
		youmax_global_options.fourColumnContainerWidth = options.fourColumnContainerWidth||'1150px';
		youmax_global_options.threeColumnContainerWidth = options.threeColumnContainerWidth||'1000px';
		youmax_global_options.twoColumnContainerWidth = options.twoColumnContainerWidth||'750px';
		youmax_global_options.oneColumnContainerWidth = options.oneColumnContainerWidth||'500px';		

		youmax_global_options.fiveColumnThumbnailWidth = options.fiveColumnThumbnailWidth||'18%';
		youmax_global_options.fiveColumnThumbnailLeftRightMargin = options.fiveColumnThumbnailLeftRightMargin||'1%';
		
		youmax_global_options.fourColumnThumbnailWidth = options.fourColumnThumbnailWidth||'23%';
		youmax_global_options.fourColumnThumbnailLeftRightMargin = options.fourColumnThumbnailLeftRightMargin||'1%';

		youmax_global_options.threeColumnThumbnailWidth = options.threeColumnThumbnailWidth||'30.3%';
		youmax_global_options.threeColumnThumbnailLeftRightMargin = options.threeColumnThumbnailLeftRightMargin||'1.5%';

		youmax_global_options.twoColumnThumbnailWidth = options.twoColumnThumbnailWidth||'46%';
		youmax_global_options.twoColumnThumbnailLeftRightMargin = options.twoColumnThumbnailLeftRightMargin||'2%';

		youmax_global_options.oneColumnThumbnailWidth = options.oneColumnThumbnailWidth||'95%';
		youmax_global_options.oneColumnThumbnailLeftRightMargin = options.oneColumnThumbnailLeftRightMargin||'2.5%';
		
		youmax_global_options.thumbnailBottomMargin = options.thumbnailBottomMargin||'25px';
		youmax_global_options.containerLeftRightMargin = options.containerLeftRightMargin||'2%';

		//added in 8.5
		youmax_global_options.hideDefinition = options.hideDefinition||false; 
		youmax_global_options.playIconType = options.playIconType||'default'; 

		//added in 9.0
		youmax_global_options.showTextInsteadOfIcons = options.showTextInsteadOfIcons||false;
		youmax_global_options.maxComments = options.maxComments||7;
		youmax_global_options.headerCountType = options.headerCountType||"abbr"; //comma or abbr 
		
		
		
		
		
		//set global options
		$youmaxContainer.data('youmax_global_options',youmax_global_options);

		
		//process dependencies
		if(youmax_global_options.viewCountType == "comma") {
			convertViewCountForThumbnail = convertViewCountWithComma;	
		} else {
			convertViewCountForThumbnail = convertViewCount;
		}

		if(youmax_global_options.likeCommentCountType == "comma") {
			convertLikeCommentCount = convertViewCountWithComma;	
		} else {
			convertLikeCommentCount = convertViewCount;
		}
		
		if(youmax_global_options.headerCountType == "comma") {
			convertHeaderCounts = convertViewCountWithComma;	
		} else {
			convertHeaderCounts = convertViewCount;
		}
		
		/*if(youmax_global_options.loadMode.indexOf("paginate")!=-1) {
			youmax_global_options.playlistAction = "playall";
		}*/
		
		if(youmax_global_options.skin.indexOf("clean")!=-1) {
			youmax_global_options.alwaysUseDropdown = true;
		}		

		if(youmax_global_options.loadMode=="paginate-sides") {
			youmax_global_options.loadButtonSize="small";
			youmax_global_options.playlistAction = "playall";
		}
		
		if(null==youmax_global_options.showTitleInVideoPlayer || youmax_global_options.showTitleInVideoPlayer==="") {
			youmax_global_options.showTitleInVideoPlayer = true;
		}
		
		/*if(null==youmax_global_options.autoLoadComments || youmax_global_options.autoLoadComments==="") {
			youmax_global_options.autoLoadComments = true;
		}*/
		
		if(null==youmax_global_options.alignPopupToTop || youmax_global_options.alignPopupToTop==="") {
			youmax_global_options.alignPopupToTop = true;
		}
		
		if(null==youmax_global_options.alwaysUseDropdown || youmax_global_options.alwaysUseDropdown==="") {
			youmax_global_options.alwaysUseDropdown = true;
		}
		
		if(youmax_global_options.skin.indexOf("list")!=-1) {
			youmax_global_options.fourColumnContainerWidth = '5000px';
			youmax_global_options.threeColumnContainerWidth = '5000px';
			youmax_global_options.twoColumnContainerWidth = '5000px';
			youmax_global_options.oneColumnContainerWidth = '1400px';
			
			youmax_global_options.oneColumnThumbnailWidth = '97%';
			youmax_global_options.oneColumnThumbnailLeftRightMargin = '1.5%';
		}
		
		
		
		//set local cache for pagination and events
		var cache = [];
		var cacheIndex = -1;

		var eventCache = {
				items:[],
				nextPageToken:"youmax-generated"
		};
		var eventCacheStatus = []; 
		
		$youmaxContainer.data('cache',cache);
		$youmaxContainer.data('cacheindex',cacheIndex);
		$youmaxContainer.data('eventcache',eventCache);
		$youmaxContainer.data('eventcachestatus',eventCacheStatus);

		
		//add fontawesome icons
		if (document.createStyleSheet){
			document.createStyleSheet(youmax_global_options.videoProtocol+"//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css");
		} else {
			$("head").append("<link rel='stylesheet' href='"+youmax_global_options.videoProtocol+"//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css' type='text/css' />");
		}
		
		options.maxContainerWidth = options.maxContainerWidth||1080;
		$youmaxContainer.css('max-width',(options.maxContainerWidth)+'px');
		
		var custom_styles = "";
		var youmaxElementId = '#'+$youmaxContainer.attr('id')+' ';
		//Adding styles for wide video mode
		if(youmax_global_options.videoMode=="wide") {
			custom_styles += '#youmax-encloser {max-width: 100% !important;} #youmax-encloser-comment-wrapper {max-width: 880px;margin: 20px auto auto;}';
		}
		
		//Adding styles for widget mode
		if(youmax_global_options.widgetMode) {
			$youmaxContainer.addClass("youmax-widget");
		}
		
		//Adding styles for Text instead of Icon mode
		if(youmax_global_options.showTextInsteadOfIcons) {
			$youmaxContainer.addClass("youmax-text-instead-of-icons");
		}
		
		
		
		
		
		//adding styles for hide header
		if(youmax_global_options.hideHeader) {
			custom_styles += '#youmax-header{display:none !important;} .youmax-select-box-wrapper {padding-top: 3px;}';
		}
		
		//adding styles for hide navigation
		if(youmax_global_options.hideNavigation) {
			custom_styles += '#youmax-tabs,.youmax-select-box-wrapper,#youmax-select-box{display:none !important;}';
		}
		
		//adding styles for hide comments
		if(youmax_global_options.hideComments) {
			custom_styles += '#youmax-encloser-comment-holder,.youmax-show-button-wrapper{display:none !important;} .photo-popup-stats {border-bottom: none !important;}';
		}
		
		//adding styles for hide video details
		if(youmax_global_options.hideVideoDetails) {
			custom_styles += youmaxElementId+'.photo-popup-title,'+youmaxElementId+'.photo-popup-description,'+youmaxElementId+'.photo-popup-stats{display:none !important;}';
		}
		
		//hide complete video detail holder
		if(youmax_global_options.hideVideoDetails && youmax_global_options.hideComments) {
			custom_styles += '#photo-detail-holder{display:none !important;}';
		}
		
		//adding styles for hide video thumbnails
		if(youmax_global_options.hideVideoThumbnails) {
			custom_styles += '#youmax-video-list-div{display:none !important;}';
		}
		
		//adding styles for hide load more and pagination
		if(youmax_global_options.hideLoadMore) {
			custom_styles += '#youmax-load-more-div,.youmax-pagination,.youmax-pagination-button-wrapper{display:none !important;}';
		}
		
		
		if(youmax_global_options.minVideoContainerHeight>0) {
			custom_styles += '#youmax-video-list-div{min-height:'+youmax_global_options.minVideoContainerHeight+'px;}';
		}
		
		//adding styles to hide definition
		if(youmax_global_options.hideDefinition) {
			custom_styles += '.youmax-definition{display:none !important;}';
		}
		
		//adding styles to show fixed play icon
		if(youmax_global_options.playIconType=="white_grey_combo") {
			custom_styles += '.youmax-play-overlay {display: block !important;background-color: rgba(0,0,0,0) !important;} .youmax-play-icon-holder { background-color: rgba(255,255,255,0.85);border: none !important;} .youmax-play-icon-holder i {color: #878787;padding: 15px 0 0 19px !important;font-size: 20px !important;} .youmax-play-hover .youmax-play-icon-holder{transition: 0.3s; background-color: #CF1F1F !important;} .youmax-play-hover i{color: white !important;}';
		} else if(youmax_global_options.playIconType=="white_black_combo") {
			custom_styles += '.youmax-play-overlay {display: block !important;} .youmax-play-hover .youmax-play-icon-holder {background-color: #CF1F1F !important;border-color: #CF1F1F !important;} .youmax-play-hover.youmax-play-overlay {background-color: rgba(0,0,0,0);}';
		} else if(youmax_global_options.playIconType=="no_icon") {
			custom_styles += '.youmax-play-overlay {display: none !important;}';
		}

		

		
		//setting width qantifiers
		//setMediaQueries(options.maxContainerWidth,$youmaxContainer);
		setMediaQueries($youmaxContainer.width(),$youmaxContainer);
		
		
		//adding media queries based on column thresholds
		
		custom_styles += '.youmax-grid-item {margin-bottom: '+youmax_global_options.thumbnailBottomMargin+';} #youmax-video-list-div {padding-left: '+youmax_global_options.containerLeftRightMargin+';padding-right: '+youmax_global_options.containerLeftRightMargin+';}';
		
		youmax_global_options.fourColumnContainerWidth = youmax_global_options.fourColumnContainerWidth.replace('px','');
		custom_styles += '.gt'+youmax_global_options.fourColumnContainerWidth+' .youmax-grid-item {width: '+youmax_global_options.fiveColumnThumbnailWidth+'; margin-left: '+youmax_global_options.fiveColumnThumbnailLeftRightMargin+'; margin-right: '+youmax_global_options.fiveColumnThumbnailLeftRightMargin+';} .lt'+youmax_global_options.fourColumnContainerWidth+' .youmax-grid-item {width: '+youmax_global_options.fourColumnThumbnailWidth+'; margin-left: '+youmax_global_options.fourColumnThumbnailLeftRightMargin+';margin-right: '+youmax_global_options.fourColumnThumbnailLeftRightMargin+';}';
		
		youmax_global_options.threeColumnContainerWidth = youmax_global_options.threeColumnContainerWidth.replace('px','');
		custom_styles += '.lt'+youmax_global_options.threeColumnContainerWidth+' .youmax-grid-item {width: '+youmax_global_options.threeColumnThumbnailWidth+'; margin-left: '+youmax_global_options.threeColumnThumbnailLeftRightMargin+';margin-right: '+youmax_global_options.threeColumnThumbnailLeftRightMargin+';}';
		
		youmax_global_options.twoColumnContainerWidth = youmax_global_options.twoColumnContainerWidth.replace('px','');
		custom_styles += '.lt'+youmax_global_options.twoColumnContainerWidth+' .youmax-grid-item {width: '+youmax_global_options.twoColumnThumbnailWidth+'; margin-left: '+youmax_global_options.twoColumnThumbnailLeftRightMargin+';margin-right: '+youmax_global_options.twoColumnThumbnailLeftRightMargin+';}';
		
		youmax_global_options.oneColumnContainerWidth = youmax_global_options.oneColumnContainerWidth.replace('px','');
		custom_styles += '.lt'+youmax_global_options.oneColumnContainerWidth+' .youmax-grid-item {width: '+youmax_global_options.oneColumnThumbnailWidth+'; margin-left: '+youmax_global_options.oneColumnThumbnailLeftRightMargin+';margin-right: '+youmax_global_options.oneColumnThumbnailLeftRightMargin+';}';

		if(youmax_global_options.skin=="block1") {
			custom_styles += 'span.youmax-view-date-holder, .youmax-like-comment-holder {display: none !important;} #tiles li p {padding-bottom: 5px !important;} .youmax-duration {bottom: 125px !important;}';
		} else if(youmax_global_options.skin=="block2") {
			custom_styles += '.youmax-like-comment-holder {display: none !important;} #tiles li p {padding-bottom: 6px !important;} .youmax-duration {bottom: 163px !important;}';
		} else if(youmax_global_options.skin=="block3") {
			custom_styles += 'span.youmax-view-date-holder {display: none !important;} #tiles li p {padding-bottom: 6px !important;} .youmax-duration {bottom: 155px !important;}';
		} else if(youmax_global_options.skin=="block4") {
			custom_styles += '#tiles li p, .youmax-like-comment-holder {display: none !important;} .youmax-duration {bottom: 10px !important;}';
		} else if(youmax_global_options.skin=="trend1") {
			custom_styles += 'span.youmax-trend-holder, .youmax-thumbnail-link, .youmax-trend-link-holder {display: none !important;} span.youmax-title-desc-holder {margin-bottom: 5px;}.youmax-duration {bottom: 165px !important;}';
		} else if(youmax_global_options.skin=="trend2") {
			custom_styles += 'span.youmax-view-date-holder {display: none !important;} span.youmax-trend-link-holder {border-top: 1px solid #e2e2e2;} span.youmax-trend-link-holder {padding-top: 5px;margin-top: 6px;} #tiles li p {padding-bottom: 5px !important;} .youmax-duration {bottom: 170px !important;}';
		} else if(youmax_global_options.skin=="grey1" || youmax_global_options.skin=="white1" || youmax_global_options.skin=="blue1") {
			custom_styles += 'span.youmax-view-date-holder {display: none !important;} span.youmax-video-list-title {height: 52px !important; padding-top: 4px !important;} .youmax-duration {bottom: 75px !important;}';
		} else if(youmax_global_options.skin=="list1") {
			custom_styles += 'span.youmax-view-date-holder {display: none !important;} .youmax-title-desc-holder {height: 120px !important;} .youmax-video-list-description { max-height: 80px !important;} .lt700 .youmax-title-desc-holder {height: 100px !important;} .lt700 .youmax-video-list-description {max-height: 60px !important;} .lt600 .youmax-video-list-description {display: inline-block !important;}';
		}
		
		



		$("head").append("<style class='youmax-added-styles'>"+custom_styles+"</style>");
		
		initTranlator($youmaxContainer);

		//IE 10 mode
		var doc = document.documentElement;
		doc.setAttribute('data-useragent', navigator.userAgent);

		
		//return this for chaining
		return this;
 
    };
	
 
}( jQuery ));


function youmaxSaveToken(authResult) {
	//console.log(authResult);
	if (authResult['status']['signed_in']) {
		youmaxLoggedInUser.youmaxAccessToken = authResult.access_token;
		jQuery('.youmax-add-comment-button').removeAttr('disabled').html('<i class="fa fa-send fa-2x"></i>');
		//console.log('User Signed in');
	}/* else {
		youmaxAccessToken = "";
		$('.youmax-add-comment-button').text('G+ Sign In');
		//console.log('Sign in Error');
		//console.log('Sign-in state: ' + authResult['error']);
	}*/
}