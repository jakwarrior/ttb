//Youmax 8.0 - http://codecanyon.net/item/youmax-youtube-channel-on-your-website/9989505


/*!
 * imagesLoaded PACKAGED v3.0.4
 * https://github.com/desandro/imagesloaded
 * JavaScript is all like "You images are done yet or what?"
 */

(function(){"use strict";function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}var n=e.prototype;n.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},n.flattenListeners=function(e){var t,n=[];for(t=0;e.length>t;t+=1)n.push(e[t].listener);return n},n.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},n.addListener=function(e,n){var i,r=this.getListenersAsObject(e),o="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});return this},n.on=n.addListener,n.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},n.once=n.addOnceListener,n.defineEvent=function(e){return this.getListeners(e),this},n.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},n.removeListener=function(e,n){var i,r,o=this.getListenersAsObject(e);for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));return this},n.off=n.removeListener,n.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},n.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},n.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},n.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},n.emitEvent=function(e,t){var n,i,r,o,s=this.getListenersAsObject(e);for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],o=n.listener.apply(this,t||[]),(o===this._getOnceReturnValue()||n.once===!0)&&this.removeListener(e,s[r][i].listener);return this},n.trigger=n.emitEvent,n.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},n.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},n._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},n._getEvents=function(){return this._events||(this._events={})},"function"==typeof define&&define.amd?define(function(){return e}):"undefined"!=typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){"use strict";var t=document.documentElement,n=function(){};t.addEventListener?n=function(e,t,n){e.addEventListener(t,n,!1)}:t.attachEvent&&(n=function(t,n,i){t[n+i]=i.handleEvent?function(){var t=e.event;t.target=t.target||t.srcElement,i.handleEvent.call(i,t)}:function(){var n=e.event;n.target=n.target||n.srcElement,i.call(t,n)},t.attachEvent("on"+n,t[n+i])});var i=function(){};t.removeEventListener?i=function(e,t,n){e.removeEventListener(t,n,!1)}:t.detachEvent&&(i=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var r={bind:n,unbind:i};"function"==typeof define&&define.amd?define(r):e.eventie=r}(this),function(e){"use strict";function t(e,t){for(var n in t)e[n]=t[n];return e}function n(e){return"[object Array]"===c.call(e)}function i(e){var t=[];if(n(e))t=e;else if("number"==typeof e.length)for(var i=0,r=e.length;r>i;i++)t.push(e[i]);else t.push(e);return t}function r(e,n){function r(e,n,s){if(!(this instanceof r))return new r(e,n);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=i(e),this.options=t({},this.options),"function"==typeof n?s=n:t(this.options,n),s&&this.on("always",s),this.getImages(),o&&(this.jqDeferred=new o.Deferred);var a=this;setTimeout(function(){a.check()})}function c(e){this.img=e}r.prototype=new e,r.prototype.options={},r.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);for(var i=n.querySelectorAll("img"),r=0,o=i.length;o>r;r++){var s=i[r];this.addImage(s)}}},r.prototype.addImage=function(e){var t=new c(e);this.images.push(t)},r.prototype.check=function(){function e(e,r){return t.options.debug&&a&&s.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;for(var r=0;i>r;r++){var o=this.images[r];o.on("confirm",e),o.check()}},r.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify(t,e)})},r.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var n=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[n](t)}})},o&&(o.fn.imagesLoaded=function(e,t){var n=new r(this,e,t);return n.jqDeferred.promise(o(this))});var f={};return c.prototype=new e,c.prototype.check=function(){var e=f[this.img.src];if(e)return this.useCached(e),void 0;if(f[this.img.src]=this,this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this.proxyImage=new Image;n.bind(t,"load",this),n.bind(t,"error",this),t.src=this.img.src},c.prototype.useCached=function(e){if(e.isConfirmed)this.confirm(e.isLoaded,"cached was confirmed");else{var t=this;e.on("confirm",function(e){return t.confirm(e.isLoaded,"cache emitted confirmed"),!0})}},c.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},c.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},c.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindProxyEvents()},c.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindProxyEvents()},c.prototype.unbindProxyEvents=function(){n.unbind(this.proxyImage,"load",this),n.unbind(this.proxyImage,"error",this)},r}var o=e.jQuery,s=e.console,a=s!==void 0,c=Object.prototype.toString;"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],r):e.imagesLoaded=r(e.EventEmitter,e.eventie)}(window);


/*!
  jQuery Wookmark plugin
  @name jquery.wookmark.js
  @author Christoph Ono (chri@sto.ph or @gbks)
  @author Sebastian Helzle (sebastian@helzle.net or @sebobo)
  @version 1.4.8
  @date 07/08/2013
  @category jQuery plugin
  @copyright (c) 2009-2014 Christoph Ono (www.wookmark.com)
  @license Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
*/
(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['jquery'], factory);
  else
    factory(jQuery);
}(function ($) {
  var Wookmark, defaultOptions, __bind;

  __bind = function(fn, me) {
    return function() {
      return fn.apply(me, arguments);
    };
  };

  // Wookmark default options
  defaultOptions = {
    align: 'center',
    autoResize: false,
    comparator: null,
    container: $('body'),
    direction: undefined,
    ignoreInactiveItems: true,
    itemWidth: 0,
    fillEmptySpace: false,
    flexibleWidth: 0,
    offset: 2,
    outerOffset: 0,
    onLayoutChanged: undefined,
    possibleFilters: [],
    resizeDelay: 50,
    verticalOffset: undefined
  };

  // Function for executing css writes to dom on the next animation frame if supported
  var executeNextFrame = window.requestAnimationFrame || function(callback) {callback();},
      $window = $(window);

  function bulkUpdateCSS(data) {
    executeNextFrame(function() {
      var i, item;
      for (i = 0; i < data.length; i++) {
        item = data[i];
        item.obj.css(item.css);
      }
    });
  }

  function cleanFilterName(filterName) {
    return $.trim(filterName).toLowerCase();
  }

  // Main wookmark plugin class
  Wookmark = (function() {

    function Wookmark(handler, options) {
      // Instance variables.
      this.handler = handler;
      this.columns = this.containerWidth = this.resizeTimer = null;
      this.activeItemCount = 0;
      this.itemHeightsDirty = true;
      this.placeholders = [];

      $.extend(true, this, defaultOptions, options);

      this.verticalOffset = this.verticalOffset || this.offset;

      // Bind instance methods
      this.update = __bind(this.update, this);
      this.onResize = __bind(this.onResize, this);
      this.onRefresh = __bind(this.onRefresh, this);
      this.getItemWidth = __bind(this.getItemWidth, this);
      this.layout = __bind(this.layout, this);
      this.layoutFull = __bind(this.layoutFull, this);
      this.layoutColumns = __bind(this.layoutColumns, this);
      //this.filter = __bind(this.filter, this);
      this.clear = __bind(this.clear, this);
      this.getActiveItems = __bind(this.getActiveItems, this);
      this.refreshPlaceholders = __bind(this.refreshPlaceholders, this);
      this.sortElements = __bind(this.sortElements, this);
      //this.updateFilterClasses = __bind(this.updateFilterClasses, this);

      // Initial update of the filter classes
      //this.updateFilterClasses();

      // Listen to resize event if requested.
      if (this.autoResize)
        $window.bind('resize.wookmark', this.onResize);

      this.container.bind('refreshWookmark', this.onRefresh);
    }

	/*
    Wookmark.prototype.updateFilterClasses = function() {
      // Collect filter data
      var i = 0, j = 0, k = 0, filterClasses = {}, itemFilterClasses,
          $item, filterClass, possibleFilters = this.possibleFilters, possibleFilter;

      for (; i < this.handler.length; i++) {
        $item = this.handler.eq(i);

        // Read filter classes and globally store each filter class as object and the fitting items in the array
        itemFilterClasses = $item.data('filterClass');
        if (typeof itemFilterClasses == 'object' && itemFilterClasses.length > 0) {
          for (j = 0; j < itemFilterClasses.length; j++) {
            filterClass = cleanFilterName(itemFilterClasses[j]);

            if (typeof(filterClasses[filterClass]) === 'undefined') {
              filterClasses[filterClass] = [];
            }
            filterClasses[filterClass].push($item[0]);
          }
        }
      }

      for (; k < possibleFilters.length; k++) {
        possibleFilter = cleanFilterName(possibleFilters[k]);
        if (!(possibleFilter in filterClasses)) {
          filterClasses[possibleFilter] = [];
        }
      }

      this.filterClasses = filterClasses;
    }; */

    // Method for updating the plugins options
    Wookmark.prototype.update = function(options) {
      this.itemHeightsDirty = true;
      $.extend(true, this, options);
    };

    // This timer ensures that layout is not continuously called as window is being dragged.
    Wookmark.prototype.onResize = function() {
      clearTimeout(this.resizeTimer);
      this.itemHeightsDirty = this.flexibleWidth !== 0;
      this.resizeTimer = setTimeout(this.layout, this.resizeDelay);
    };

    // Marks the items heights as dirty and does a relayout
    Wookmark.prototype.onRefresh = function() {
      this.itemHeightsDirty = true;
      this.layout();
    };

    /**
     * Filters the active items with the given string filters.
     * @param filters array of string
     * @param mode 'or' or 'and'
     */
	/*
    Wookmark.prototype.filter = function(filters, mode, dryRun) {
      var activeFilters = [], activeFiltersLength, activeItems = $(),
          i, j, k, filter;

      filters = filters || [];
      mode = mode || 'or';
      dryRun = dryRun || false;

      if (filters.length) {
        // Collect active filters
        for (i = 0; i < filters.length; i++) {
          filter = cleanFilterName(filters[i]);
          if (filter in this.filterClasses) {
            activeFilters.push(this.filterClasses[filter]);
          }
        }

        // Get items for active filters with the selected mode
        activeFiltersLength = activeFilters.length;
        if (mode == 'or' || activeFiltersLength == 1) {
          // Set all items in all active filters active
          for (i = 0; i < activeFiltersLength; i++) {
            activeItems = activeItems.add(activeFilters[i]);
          }
        } else if (mode == 'and') {
          var shortestFilter = activeFilters[0],
              itemValid = true, foundInFilter,
              currentItem, currentFilter;

          // Find shortest filter class
          for (i = 1; i < activeFiltersLength; i++) {
            if (activeFilters[i].length < shortestFilter.length) {
              shortestFilter = activeFilters[i];
            }
          }

          // Iterate over shortest filter and find elements in other filter classes
          shortestFilter = shortestFilter || [];
          for (i = 0; i < shortestFilter.length; i++) {
            currentItem = shortestFilter[i];
            itemValid = true;

            for (j = 0; j < activeFilters.length && itemValid; j++) {
              currentFilter = activeFilters[j];
              if (shortestFilter == currentFilter) continue;

              // Search for current item in each active filter class
              for (k = 0, foundInFilter = false; k < currentFilter.length && !foundInFilter; k++) {
                foundInFilter = currentFilter[k] == currentItem;
              }
              itemValid &= foundInFilter;
            }
            if (itemValid)
              activeItems.push(shortestFilter[i]);
          }
        }
        // Hide inactive items
        if (!dryRun)
          this.handler.not(activeItems).addClass('inactive');
      } else {
        // Show all items if no filter is selected
        activeItems = this.handler;
      }

      // Show active items
      if (!dryRun) {
        activeItems.removeClass('inactive');
        // Unset columns and refresh grid for a full layout
        this.columns = null;
        this.layout();
      }
      return activeItems;
    };
	*/

    /**
     * Creates or updates existing placeholders to create columns of even height
     */
    Wookmark.prototype.refreshPlaceholders = function(columnWidth, sideOffset) {
      var i = this.placeholders.length,
          $placeholder, $lastColumnItem,
          columnsLength = this.columns.length, column,
          height, top, innerOffset,
          containerHeight = this.container.innerHeight();

      for (; i < columnsLength; i++) {
        $placeholder = $('<div class="wookmark-placeholder"/>').appendTo(this.container);
        this.placeholders.push($placeholder);
      }

      innerOffset = this.offset + parseInt(this.placeholders[0].css('borderLeftWidth'), 10) * 2;

      for (i = 0; i < this.placeholders.length; i++) {
        $placeholder = this.placeholders[i];
        column = this.columns[i];

        if (i >= columnsLength || !column[column.length - 1]) {
          $placeholder.css('display', 'none');
        } else {
          $lastColumnItem = column[column.length - 1];
          if (!$lastColumnItem) continue;
          top = $lastColumnItem.data('wookmark-top') + $lastColumnItem.data('wookmark-height') + this.verticalOffset;
          height = containerHeight - top - innerOffset;

          $placeholder.css({
            position: 'absolute',
            display: height > 0 ? 'block' : 'none',
            left: i * columnWidth + sideOffset,
            top: top,
            width: columnWidth - innerOffset,
            height: height
          });
        }
      }
    };

    // Method the get active items which are not disabled and visible
    Wookmark.prototype.getActiveItems = function() {
      return this.ignoreInactiveItems ? this.handler.not('.inactive') : this.handler;
    };

    // Method to get the standard item width
    Wookmark.prototype.getItemWidth = function() {
      var itemWidth = this.itemWidth,
          innerWidth = this.container.width() - 2 * this.outerOffset,
          firstElement = this.handler.eq(0),
          flexibleWidth = this.flexibleWidth;

      if (this.itemWidth === undefined || this.itemWidth === 0 && !this.flexibleWidth) {
        itemWidth = firstElement.outerWidth();
      }
      else if (typeof this.itemWidth == 'string' && this.itemWidth.indexOf('%') >= 0) {
        itemWidth = parseFloat(this.itemWidth) / 100 * innerWidth;
      }

      // Calculate flexible item width if option is set
      if (flexibleWidth) {
        if (typeof flexibleWidth == 'string' && flexibleWidth.indexOf('%') >= 0) {
          flexibleWidth = parseFloat(flexibleWidth) / 100 * innerWidth;
        }

        // Find highest column count
        var paddedInnerWidth = (innerWidth + this.offset),
            flexibleColumns = ~~(0.5 + paddedInnerWidth / (flexibleWidth + this.offset)),
            fixedColumns = ~~(paddedInnerWidth / (itemWidth + this.offset)),
            columns = Math.max(flexibleColumns, fixedColumns),
            columnWidth = Math.min(flexibleWidth, ~~((innerWidth - (columns - 1) * this.offset) / columns));

        itemWidth = Math.max(itemWidth, columnWidth);

        // Stretch items to fill calculated width
        this.handler.css('width', itemWidth);
      }

      return itemWidth;
    };

    // Main layout method.
    Wookmark.prototype.layout = function(force) {
      // Do nothing if container isn't visible
      if (!this.container.is(':visible')) return;

      // Calculate basic layout parameters.
      var columnWidth = this.getItemWidth() + this.offset,
          containerWidth = this.container.width(),
          innerWidth = containerWidth - 2 * this.outerOffset,
          columns = ~~((innerWidth + this.offset) / columnWidth),
          offset = 0, maxHeight = 0, i = 0,
          activeItems = this.getActiveItems(),
          activeItemsLength = activeItems.length,
          $item;

      // Cache item height
      if (this.itemHeightsDirty || !this.container.data('itemHeightsInitialized')) {
        for (; i < activeItemsLength; i++) {
          $item = activeItems.eq(i);
          $item.data('wookmark-height', $item.outerHeight());
        }
        this.itemHeightsDirty = false;
        this.container.data('itemHeightsInitialized', true);
      }

      // Use less columns if there are to few items
      columns = Math.max(1, Math.min(columns, activeItemsLength));

      // Calculate the offset based on the alignment of columns to the parent container
      offset = this.outerOffset;
      if (this.align == 'center') {
        offset += ~~(0.5 + (innerWidth - (columns * columnWidth - this.offset)) >> 1);
      }

      // Get direction for positioning
      this.direction = this.direction || (this.align == 'right' ? 'right' : 'left');

      // If container and column count hasn't changed, we can only update the columns.
      if (!force && this.columns !== null && this.columns.length == columns && this.activeItemCount == activeItemsLength) {
        maxHeight = this.layoutColumns(columnWidth, offset);
      } else {
        maxHeight = this.layoutFull(columnWidth, columns, offset);
      }
      this.activeItemCount = activeItemsLength;

      // Set container height to height of the grid.
      this.container.css('height', maxHeight);

      // Update placeholders
      if (this.fillEmptySpace) {
        this.refreshPlaceholders(columnWidth, offset);
      }

      if (this.onLayoutChanged !== undefined && typeof this.onLayoutChanged === 'function') {
        this.onLayoutChanged();
      }
    };

    /**
     * Sort elements with configurable comparator
     */
    Wookmark.prototype.sortElements = function(elements) {
      return typeof(this.comparator) === 'function' ? elements.sort(this.comparator) : elements;
    };

    /**
     * Perform a full layout update.
     */
    Wookmark.prototype.layoutFull = function(columnWidth, columns, offset) {
      var $item, i = 0, k = 0,
          activeItems = $.makeArray(this.getActiveItems()),
          length = activeItems.length,
          shortest = null, shortestIndex = null,
          sideOffset, heights = [], itemBulkCSS = [],
          leftAligned = this.align == 'left' ? true : false;

      this.columns = [];

      // Sort elements before layouting
      activeItems = this.sortElements(activeItems);

      // Prepare arrays to store height of columns and items.
      while (heights.length < columns) {
        heights.push(this.outerOffset);
        this.columns.push([]);
      }

      // Loop over items.
      for (; i < length; i++ ) {
        $item = $(activeItems[i]);

        // Find the shortest column.
        shortest = heights[0];
        shortestIndex = 0;
        for (k = 0; k < columns; k++) {
          if (heights[k] < shortest) {
            shortest = heights[k];
            shortestIndex = k;
          }
        }
        $item.data('wookmark-top', shortest);

        // stick to left side if alignment is left and this is the first column
        sideOffset = offset;
        if (shortestIndex > 0 || !leftAligned)
          sideOffset += shortestIndex * columnWidth;

        // Position the item.
        (itemBulkCSS[i] = {
          obj: $item,
          css: {
            position: 'absolute',
            top: shortest
          }
        }).css[this.direction] = sideOffset;

        // Update column height and store item in shortest column
        heights[shortestIndex] += $item.data('wookmark-height') + this.verticalOffset;
        this.columns[shortestIndex].push($item);
      }

      bulkUpdateCSS(itemBulkCSS);

      // Return longest column
      return Math.max.apply(Math, heights);
    };

    /**
     * This layout method only updates the vertical position of the
     * existing column assignments.
     */
    Wookmark.prototype.layoutColumns = function(columnWidth, offset) {
      var heights = [], itemBulkCSS = [],
          i = 0, k = 0, j = 0, currentHeight,
          column, $item, itemData, sideOffset;

      for (; i < this.columns.length; i++) {
        heights.push(this.outerOffset);
        column = this.columns[i];
        sideOffset = i * columnWidth + offset;
        currentHeight = heights[i];

        for (k = 0; k < column.length; k++, j++) {
          $item = column[k].data('wookmark-top', currentHeight);
          (itemBulkCSS[j] = {
            obj: $item,
            css: {
              top: currentHeight
            }
          }).css[this.direction] = sideOffset;

          currentHeight += $item.data('wookmark-height') + this.verticalOffset;
        }
        heights[i] = currentHeight;
      }

      bulkUpdateCSS(itemBulkCSS);

      // Return longest column
      return Math.max.apply(Math, heights);
    };

    /**
     * Clear event listeners and time outs and the instance itself
     */
    Wookmark.prototype.clear = function() {
      clearTimeout(this.resizeTimer);
      $window.unbind('resize.wookmark', this.onResize);
      this.container.unbind('refreshWookmark', this.onRefresh);
      this.handler.wookmarkInstance = null;
    };

    return Wookmark;
  })();

  $.fn.wookmark = function(options) {
    // Create a wookmark instance if not available
    if (!this.wookmarkInstance) {
      this.wookmarkInstance = new Wookmark(this, options || {});
    } else {
      this.wookmarkInstance.update(options || {});
    }

    // Apply layout
    this.wookmarkInstance.layout(true);

    // Display items (if hidden) and return jQuery object to maintain chainability
    return this.show();
  };
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


//Youmax 8.0 - http://codecanyon.net/item/youmax-youtube-channel-on-your-website/9989505

var youmaxLoggedInUser = {};

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
				success: function(response) { insertSearchVideos(response,$youmaxContainer,false,true);},
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
				handlePagination($youmaxContainer,"next");
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
		var maxResults = youmax_global_options.maxResults;
		//console.log('getVideoComments pageToken-'+pageToken);
		if(null!=pageToken) {
			pageTokenUrl = "&pageToken="+pageToken;
			loadMoreFlag = true;
		}
		
		/*var startIndex = $youmaxContainer.find('.youmax-encloser-comment-button.youmax-more-button').data('start-index');
		if(startIndex>1) {
			loadMoreFlag = true;
		}*/
		
		apiVideoCommentsURL = "https://www.googleapis.com/youtube/v3/commentThreads?part=id%2Csnippet&videoId="+videoId+pageTokenUrl+"&maxResults="+maxResults+"&key="+apiKey+"&order="+youmax_global_options.commentOrder;
		
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
		var maxResults = youmax_global_options.maxResults;
		//console.log('getVideoComments pageToken-'+pageToken);
		if(null!=pageToken) {
			pageTokenUrl = "&"+pageToken;
			loadMoreFlag = true;
		}
		
		/*var startIndex = $youmaxContainer.find('.youmax-encloser-comment-button.youmax-more-button').data('start-index');
		if(startIndex>1) {
			loadMoreFlag = true;
		}*/
		
		apiVideoCommentsURL = "https://api.vimeo.com/videos/"+videoId+"/comments?per_page="+maxResults+"&access_token="+youmax_global_options.vimeoAccessToken+"&sort=date"+pageTokenUrl;
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
			$youmaxContainer.append('<button type="button" id="youmax-load-more-div" '+buttonClass+'><i class="fa fa-plus fa-5x"></i></button>');
			$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
		} else if(youmax_global_options.loadMode=="paginate-bottom") {
			//pagination
			$youmaxContainer.append('<div class="youmax-pagination"><div class="youmax-pagination-button-wrapper youmax-left-wrapper"><button type="button" id="youmax-previous-div" '+buttonClass+'><i class="fa fa-caret-left fa-5x"></i></button></div><div class="youmax-pagination-button-wrapper youmax-right-wrapper"><button type="button" id="youmax-next-div" '+buttonClass+'><i class="fa fa-caret-right fa-5x"></i></button></div></div>');
			$youmaxNextDiv = $youmaxContainer.find('#youmax-next-div');
			$youmaxPreviousDiv = $youmaxContainer.find('#youmax-previous-div');
		}  else if(youmax_global_options.loadMode=="paginate-sides") {
			//pagination
			$youmaxContainer.append('<div class="youmax-pagination-button-wrapper youmax-left-wrapper youmax-side-nav"><button type="button" id="youmax-previous-div" '+buttonClass+'><i class="fa fa-caret-left fa-5x"></i></button></div><div class="youmax-pagination-button-wrapper youmax-right-wrapper youmax-side-nav"><button type="button" id="youmax-next-div" '+buttonClass+'><i class="fa fa-caret-right fa-5x"></i></button></div>');
			$youmaxNextDiv = $youmaxContainer.find('#youmax-next-div');
			$youmaxPreviousDiv = $youmaxContainer.find('#youmax-previous-div');
		} 
		
		if(null!=$youmaxLoadMoreDiv) {
			$youmaxLoadMoreDiv.data('nextpagetoken','');
			$youmaxLoadMoreDiv.click(function(){
				loadMorePlaylistVideos($youmaxContainer);
			});
		}
		
		if(null!=$youmaxPreviousDiv) {
			$youmaxPreviousDiv.click(function(){
				handlePagination($youmaxContainer,"previous");
			});
		}
		
		if(null!=$youmaxNextDiv) {
			$youmaxNextDiv.click(function(){
				handlePagination($youmaxContainer,"next");
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
		
		
		$youmaxContainer.on('click','.youmax-show-button',function(){
			displayComments(this.id,$youmaxContainer);
		});
		
		
		$youmaxContainer.on('click','.youmax-more-button',function(){
			loadMoreComments($youmaxContainer);
		});
		
		
		//console.log('init Google API');
		//load Google API for Login
		$.getScript("https://apis.google.com/js/client:platform.js").done(function(data, textStatus) {
			//console.log('Google API Loaded');
			$youmaxContainer.on('click','.youmax-add-comment-button',function(){
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
						
				if(tabId.indexOf("youtube_channel_uploads_")!=-1) {
					insertPlaylistVideos(youtubeResponse,false,$youmaxContainer);
				} else if(tabId.indexOf("youtube_channel_playlists_")!=-1) {
					insertChannelPlaylists(youtubeResponse,false,$youmaxContainer);
				} else if(tabId.indexOf("youtube_channel_search_")!=-1) {
					eventType = $(".youmax-tab-hover").data("eventtype");
					isEvent = false;
					if(null!=eventType && eventType!="") {
						isEvent = true;
					}
					insertSearchVideos(youtubeResponse,$youmaxContainer,false,isEvent);
				} else if(tabId.indexOf("youtube_channel_events_")!=-1) {
					insertSearchVideos(youtubeResponse,$youmaxContainer,false,true);
				} else if(tabId.indexOf("youtube_playlist_videos_")!=-1) {
					insertPlaylistVideos(youtubeResponse,false,$youmaxContainer);
				} else if(tabId.indexOf("vimeo_user_videos_")!=-1) {
					insertVimeoVideos(vimeoResponse,false,$youmaxContainer);
				} else if(tabId.indexOf("vimeo_channel_videos_")!=-1) {
					insertVimeoVideos(vimeoResponse,false,$youmaxContainer);
				} else if(tabId.indexOf("query_")!=-1) {
					
				}				
				
				cacheIndex = cacheIndex - youmax_global_options.maxResults;
				//console.log("cacheIndex > "+cacheIndex);
			} else {
				$youmaxContainer.find('#youmax-previous-div').html('<i class="fa fa-close fa-5x"></i>');
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

				if(tabId.indexOf("youtube_channel_uploads_")!=-1) {
					insertPlaylistVideos(youtubeResponse,false,$youmaxContainer);
				} else if(tabId.indexOf("youtube_channel_playlists_")!=-1) {
					insertChannelPlaylists(youtubeResponse,false,$youmaxContainer);
				} else if(tabId.indexOf("youtube_channel_search_")!=-1) {
					eventType = $(".youmax-tab-hover").data("eventtype");
					isEvent = false;
					if(null!=eventType && eventType!="") {
						isEvent = true;
					}
					insertSearchVideos(youtubeResponse,$youmaxContainer,false,isEvent);
				} else if(tabId.indexOf("youtube_channel_events_")!=-1) {
					insertSearchVideos(youtubeResponse,$youmaxContainer,false,true);
				} else if(tabId.indexOf("youtube_playlist_videos_")!=-1) {
					insertPlaylistVideos(youtubeResponse,false,$youmaxContainer);
				} else if(tabId.indexOf("vimeo_user_videos_")!=-1) {
					insertVimeoVideos(vimeoResponse,false,$youmaxContainer);
				} else if(tabId.indexOf("vimeo_channel_videos_")!=-1) {
					insertVimeoVideos(vimeoResponse,false,$youmaxContainer);
				} else if(tabId.indexOf("query_")!=-1) {
					
				}
				
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

		var youmaxAccessToken = youmaxLoggedInUser.youmaxAccessToken;
		if(null!=youmaxAccessToken && youmaxAccessToken!="") {
			//Token available
			//getLoggedInUserDetails($youmaxContainer,youmaxAccessToken,youmax_global_options.apiKey);
			
			var comment = $youmaxContainer.find('.youmax-comment-textbox').val();
			if(null==comment||comment.trim()=="") {
				alert("Please enter a valid comment..");
				$youmaxContainer.find('.youmax-add-comment-button').removeAttr('disabled').html('<i class="fa fa-send fa-2x"></i>');
				return;
			} else {
				comment=comment.trim();
			}
			
			videoId = $youmaxContainer.find(".youmax-encloser-comment-button.youmax-show-button").attr('id');
			channelId = $youmaxContainer.find(".youmax-encloser-comment-button.youmax-show-button").data('channelid');
			
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
				
				//Display added comment
				$youmaxContainer.find("#youmax-encloser-comments").prepend('<div  class="youmax-video-comment"><div class="youmax-from"><div class="youmax-from-img" style="background-image:url(\''+authorImage+'\');"></div><div class="youmax-from-name">'+authorName+'</div><div class="youmax-published">'+youmax_translator_text.now+'</div></div><div class="youmax-comment"><span class="youmax-comment-content">'+comment+'</span><div></div>');				
				
				//getUserDetails(new Array(authorId),$youmaxContainer);
				
				$youmaxContainer.find('.youmax-add-comment-button').removeAttr('disabled').html('<i class="fa fa-send fa-2x"></i>');
				$youmaxContainer.find('.youmax-comment-textbox').val('');
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
			} else if(tabId.indexOf("query_")!=-1) {
				innerId=tabId.substring(6);
				getUserSearchVideos(innerId,nextPageToken,$youmaxContainer);	
			}		
			
		} else {
		
			deactivateLoadMoreButton($youmaxContainer);
			
		}
	},
	
	pauseLoadMoreButton = function ($youmaxContainer) {
	
		var $youmaxLoadMoreDiv;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		
		if(youmax_global_options.loadMode=="loadmore") {
			$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
			$youmaxLoadMoreDiv.html('<i class="fa fa-ellipsis-h fa-5x"></i>');
		} else if(youmax_global_options.loadMode.indexOf("paginate")!=-1) {
			$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-next-div');
			$youmaxLoadMoreDiv.html('<i class="fa fa-ellipsis-h fa-5x"></i>');
		}

		$youmaxLoadMoreDiv.addClass('youmax-load-more-div-click');
		
		return $youmaxLoadMoreDiv;
	
	},
	
	deactivateLoadMoreButton = function ($youmaxContainer) {
	
		var $youmaxLoadMoreDiv;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		
		if(youmax_global_options.loadMode=="loadmore") {
			$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
			$youmaxLoadMoreDiv.html('<i class="fa fa-close fa-5x"></i>');
		} else if(youmax_global_options.loadMode.indexOf("paginate")!=-1) {
			$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-next-div');
			$youmaxLoadMoreDiv.html('<i class="fa fa-close fa-5x"></i>');
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
	
	//utility function to displaye view counts
	convertViewCountWithComma = function(videoViewCount) {
		//console.log("videoViewCount-"+videoViewCount);
		var videoResultCount = "";
		
		if(null==videoViewCount || videoViewCount=="0") {
			return "";
		}
		
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
		channelSubscribers = convertViewCount(channelData.statistics.subscriberCount);
		channelViews = convertViewCount(channelData.statistics.viewCount);
		channelBackgroundImage = channelData.brandingSettings.image.bannerImageUrl;
		//channelUploadsPlaylistId = channelData.contentDetails.relatedPlaylists.uploads;
		
		channelVideos = convertViewCount(channelData.statistics.videoCount);
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
			videoViewCount = videoArray[i].statistics.viewCount;
			videoViewCount = convertViewCountForThumbnail(videoViewCount);
			videoDuration = videoArray[i].contentDetails.duration;
			videoDuration = convertDuration(videoDuration);
			videoDefinition = videoArray[i].contentDetails.definition.toUpperCase();
			videoLikeCount = videoArray[i].statistics.likeCount;
			videoLikeCount = convertLikeCommentCount(videoLikeCount);
			videoCommentCount = videoArray[i].statistics.commentCount;
			videoCommentCount = convertLikeCommentCount(videoCommentCount);
			
			
			$videoThumbnail = $youmaxContainer.find('#youmax-video-list-div #youtube_'+videoId);
			$videoThumbnail.find('.youmax-video-list-views').append(videoViewCount+' <span class="youmax-views-text">'+youmax_translator_text.views+'</span> ');
			
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
				
				$videoThumbnail.append('<div class="youmax-duration"><i class="fa fa-heart fa-1x"></i>'+videoLikeCount+'</div>');
				$videoThumbnail.append('<div class="youmax-definition"><i class="fa fa-volume-off fa-1x"></i>'+videoViewCount+'</div>');
				$videoThumbnail.find(".youmax-clean-time").append(videoDuration);				
				
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
					$videoThumbnail.append('<div class="youmax-duration">'+videoDuration+'</div>');
					$videoThumbnail.append('<div class="youmax-definition">'+videoDefinition+'</div>');
				}
				
				if(youmax_global_options.skin.indexOf("block")!=-1) {
					$videoThumbnail.append('<div class="youmax-like-comment-holder"><div class="youmax-like-box"><i class="fa fa-heart"></i>'+videoLikeCount+'</div><div class="youmax-comment-box"><i class="fa fa-comment"></i>'+videoCommentCount+'</div></div>');
				}
			}
		}
		
		if(youmax_global_options.skin.indexOf("block")!=-1) {
			$(window).resize();
		}
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
		
		
		var $youmaxCommentHolder = $youmaxContainer.find('#youmax-encloser-comments');
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = $youmaxContainer.data("youmax_translator_text");

		//console.log('loadMoreFlag-'+loadMoreFlag);
		if(!loadMoreFlag) {
			//empty earlier comments if not load more
			$youmaxCommentHolder.empty();
		}

		var commentArray = response.items;
		//var userIdArray = [];
		
		//page token logic
		var nextPageToken = response.nextPageToken;
		var $loadCommentsButton = $youmaxContainer.find('.youmax-encloser-comment-button.youmax-more-button');
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
			$youmaxContainer.find('.youmax-encloser-comment-button.youmax-more-button').data('nextpagetoken','');
			resetLoadMoreComments($youmaxContainer);
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
		resetLoadMoreComments($youmaxContainer);
		
	},
	

	//insert HTML for video thumbnails into youmax grid
	insertVimeoVideoComments = function(response,loadMoreFlag,$youmaxContainer) {
		//console.log('insertVimeoVideoComments');
		//console.log(response);
		
		
		var $youmaxCommentHolder = $youmaxContainer.find('#youmax-encloser-comments');
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = $youmaxContainer.data("youmax_translator_text");

		//console.log('loadMoreFlag-'+loadMoreFlag);
		if(!loadMoreFlag) {
			//empty earlier comments if not load more
			$youmaxCommentHolder.empty();
		}

		var commentArray = response.data;
		//var userIdArray = [];
		
		//page token logic
		var nextPageToken = response.paging.next;
		var $loadCommentsButton = $youmaxContainer.find('.youmax-encloser-comment-button.youmax-more-button');
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
			$youmaxContainer.find('.youmax-encloser-comment-button.youmax-more-button').data('nextpagetoken','');
			resetLoadMoreComments($youmaxContainer);
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
		resetLoadMoreComments($youmaxContainer);
		
	},
	
	
	
	//insert HTML for video thumbnails into youmax grid
	insertPlaylistVideos = function(response,loadMoreFlag,$youmaxContainer) {
		//console.log("insertPlaylistVideos");
		//console.log(response);
		var videoIdArray = [];
		var $youmaxContainerList = $youmaxContainer.find('ul');
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
			$youmaxContainerList.empty();
			
		} 

		//console.log('nextPageToken-'+nextPageToken);
		
		if(null!=nextPageToken && nextPageToken!="undefined" && nextPageToken!="") {
			if(nextPageToken.indexOf("youmax-generated")==-1) {
				$youmaxLoadMoreDiv.data('nextpagetoken',nextPageToken);
			}
		} else {
			$youmaxLoadMoreDiv.data('nextpagetoken','');
		}

		//alert(videoArray.length);
		for(var i=0; i<videoArray.length; i++) {
			videoId = videoArray[i].snippet.resourceId.videoId;			
			videoTitle = videoArray[i].snippet.title;
			videoDescription = videoArray[i].snippet.description;
			videoDescription = videoDescription.replace(/"/g, "'");
			
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
			
			//console.log('videoUploaded-'+videoUploaded);
			
			$youmaxContainerList.append('<li id="youtube_'+videoId+'" href="https://www.youtube.com/watch?v='+videoId+'" data-description="'+videoDescription+'" data-channelid="'+channelId+'"><img src="'+videoThumbnail+'"><p><span class="youmax-video-list-title">'+videoTitle+'</span><span class="youmax-video-list-description">'+videoDescription+'</span><span class="youmax-view-date-holder"><span class="youmax-video-list-views"></span><span class="youmax-views-date-separator">|</span><span class="youmax-video-list-date">'+getDateDiff(videoUploaded,youmax_translator_text)+'</span></span></p><div class="youmax-clean-overlay-holder"><span class="youmax-clean-title">'+videoTitle+'</span><span class="youmax-clean-time"></span></span></div></li>');

		}
		
		createGrid($youmaxContainer);
		
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
	insertVimeoVideos = function(response,loadMoreFlag,$youmaxContainer) {
		//console.log("insertVimeoVideos");
		//console.log(response);
		
		
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
			$youmaxContainerList.empty();
			
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
				videoDescription = videoDescription.replace(/"/g, "'");
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
			
			videoViewCount = videoArray[i].stats.plays;
			if(null==videoViewCount) {
				videoViewCount="Private";
			} else {
				videoViewCount = convertViewCountForThumbnail(videoViewCount);
			}
			
			videoDuration = videoArray[i].duration;
			videoDuration = convertVimeoDuration(videoDuration);
			
			videoLikeCount = videoArray[i].metadata.connections.likes.total;
			videoLikeCount = convertLikeCommentCount(videoLikeCount);
			
			videoCommentCount = videoArray[i].metadata.connections.comments.total;
			videoCommentCount = convertLikeCommentCount(videoCommentCount);
			
			if(youmax_global_options.showVimeoLikesInsteadOfViews) {
				primaryAttributeString = videoLikeCount+' <span class="youmax-views-text">'+youmax_translator_text.likes+'</span> ';
			} else {
				primaryAttributeString = videoViewCount+' <span class="youmax-views-text">'+youmax_translator_text.views+'</span> ';			
			}

			item = '<li id="vimeo_'+videoId+'" href="'+videoLink+'" data-description="'+videoDescription+'" data-views="'+videoViewCount+'" data-likes="'+videoLikeCount+'" data-comments="'+videoCommentCount+'" ><img src="'+videoThumbnail+'"><p><span class="youmax-video-list-title">'+videoTitle+'</span><span class="youmax-video-list-description">'+videoDescription+'</span><span class="youmax-view-date-holder"><span class="youmax-video-list-views">'+primaryAttributeString+'</span><span class="youmax-views-date-separator">|</span><span class="youmax-video-list-date">'+getDateDiff(videoUploaded,youmax_translator_text)+'</span></span></p><div class="youmax-clean-overlay-holder"><span class="youmax-clean-title">'+videoTitle+'</span><span class="youmax-clean-time">'+videoDuration+'</span></span></div>';
			
			
			if(youmax_global_options.skin.indexOf("clean")!=-1) {
				if(youmax_global_options.showVimeoLikesInsteadOfViews) {
					item += '<div class="youmax-definition"><i class="fa fa-heart fa-1x"></i>'+videoLikeCount+'</div>';
					item += '<div class="youmax-duration"><i class="fa fa-comment fa-1x"></i>'+videoCommentCount+'</div>';
				} else {
					item += '<div class="youmax-duration"><i class="fa fa-heart fa-1x"></i>'+videoLikeCount+'</div>';
					item += '<div class="youmax-definition"><i class="fa fa-volume-off fa-1x"></i>'+videoViewCount+'</div>';
				}
			} else {
				item += '<div class="youmax-duration">'+videoDuration+'</div>';
				//item += '<div class="youmax-definition">'+videoDefinition+'</div>';
				
				if(youmax_global_options.skin.indexOf("block")!=-1) {
					item += '<div class="youmax-like-comment-holder"><div class="youmax-like-box"><i class="fa fa-heart"></i>'+videoLikeCount+'</div><div class="youmax-comment-box"><i class="fa fa-comment"></i>'+videoCommentCount+'</div></div>';
				}
			}
			
			item += '</li>';

			
			$youmaxContainerList.append(item);

		}
		
		createGrid($youmaxContainer);
		
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

	
	
	
	//insert HTML for video thumbnails into youmax grid
	insertChannelPlaylists = function(response,loadMoreFlag,$youmaxContainer) {
		//console.log("insertChannelPlaylists");
		//console.log(response);
		//var videoIdArray = [];
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
			$youmaxContainerList.empty();
			
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
			
			$youmaxContainerList.append('<li id="youtube_playlist_videos_'+playlistId+'" href="https://www.youtube.com/watch?v='+playlistId+'" ><img src="'+playlistThumbnail+'"><div class="youmax-playlist-video-count-wrapper"><div class="youmax-playlist-video-count-box"><span class="youmax-playlist-video-count">'+videoCount+'</span><br>VIDEOS<br><div class="youmax-playlist-line-wrapper"><span class="youmax-playlist-line"></span><br><span class="youmax-playlist-line"></span><br><span class="youmax-playlist-line"></span></div></div></div><p><span class="youmax-video-list-title">'+playlistTitle+'</span><span class="youmax-video-list-views youmax-video-list-date-playlist">'+getDateDiff(playlistUploaded,youmax_translator_text)+' </span></p><div class="youmax-clean-playlist-title">'+playlistTitle+'</div></li>');

			//$youmaxContainerList.append('<li id="'+videoId+'" href="https://www.youtube.com/watch?v='+videoId+'" ><img src="'+videoThumbnail+'"><p><span class="youmax-video-list-title">'+videoTitle+'</span><span class="youmax-video-list-views"></span><span class="youmax-views-date-separator">|</span><span class="youmax-video-list-date">'+getDateDiff(videoUploaded)+'</span></p><div class="youmax-clean-overlay-holder"><span class="youmax-clean-title">'+videoTitle+'</span><span class="youmax-clean-time"></span></span></div></li>');

		}
		
		createGrid($youmaxContainer,"playlist");

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

		
		insertSearchVideos(response,$youmaxContainer);
	},

	//insert HTML for video thumbnails into youmax grid
	insertSearchVideos = function(response,$youmaxContainer,fileBasedSearch,isEvent) {
		//console.log('inside insertSearchVideos - '+eventType);
		//console.log("insertSearchVideos");
		//console.log(response);
		var videoIdArray = [];
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
				$youmaxContainerList.empty();
				
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
			videoDescription = videoDescription.replace(/"/g, "'");
			channelId = videoArray[i].snippet.channelId;

			
			videoIdArray.push(videoId);
			
			//console.log('videoUploaded-'+videoUploaded);
		
			//$youmaxContainerList.append('<li id="'+videoId+'" href="https://www.youtube.com/watch?v='+videoId+'" ><img src="'+videoThumbnail+'"><p><span class="youmax-video-list-title">'+videoTitle+'</span><span class="youmax-video-list-views"></span><span class="youmax-views-date-separator">|</span><span class="youmax-video-list-date">'+getDateDiff(videoUploaded)+'</span></p><div class="youmax-clean-overlay-holder"><span class="youmax-clean-title">'+videoTitle+'</span><span class="youmax-clean-time"></span></span></div></li>');

			$youmaxContainerList.append('<li id="youtube_'+videoId+'" href="https://www.youtube.com/watch?v='+videoId+'" data-description="'+videoDescription+'" data-channelid="'+channelId+'"><img src="'+videoThumbnail+'"><p><span class="youmax-video-list-title">'+videoTitle+'</span><span class="youmax-video-list-description">'+videoDescription+'</span><span class="youmax-view-date-holder"><span class="youmax-video-list-views"></span><span class="youmax-views-date-separator">|</span><span class="youmax-video-list-date">'+getDateDiff(videoUploaded,youmax_translator_text)+'</span></span></p><div class="youmax-clean-overlay-holder"><span class="youmax-clean-title">'+videoTitle+'</span><span class="youmax-clean-time"></span></span></div></li>');

			
		}
		
		createGrid($youmaxContainer);
		
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
	createGrid = function($youmaxContainer,itemType) {
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');	
		var $youmaxContainerList = $youmaxContainer.find('ul');
		$youmaxContainerList.imagesLoaded(function() {			
		
			$youmaxContainer.find('.youmax-loading-div').remove();
			
			var options = {
			  autoResize: true, // This will auto-update the layout when the browser window is resized.
			  container: $youmaxContainer.find('#youmax-video-list-div'), // Optional, used for some extra CSS styling
			  offset: youmax_global_options.innerOffset, // Optional, the distance between grid items
			  itemWidth: youmax_global_options.minItemWidth, // Optional, the width of a grid item
			  flexibleWidth : youmax_global_options.maxItemWidth,
			  outerOffset: youmax_global_options.outerOffset
			};

			
			var handler = $youmaxContainerList.find('li');
			
			// Call the layout function.
			handler.wookmark(options);
			
			if(itemType=="playlist") {
				if(youmax_global_options.playlistAction=="playall") {
					registerPopup($youmaxContainer,true);
				} else {
					$youmaxContainer.find('#youmax-video-list-div li').click(function(){
						//console.log($youmaxEncloserIframe);
						displayPlaylist(this.id,$youmaxContainer);	
						youmax_current_playlist_name = $(this).find('.youmax-video-list-title').text();
						$youmaxContainer.data('youmax_current_playlist_name',youmax_current_playlist_name);
						$youmaxContainer.data('youmax_current_playlist_id',this.id);
					});
				}
			} else {
				registerPopup($youmaxContainer);
			}
			resetLoadMoreButton($youmaxContainer);
			
		});
	},
	
	resetLoadMoreButton = function($youmaxContainer) {
		
		var $youmaxLoadMoreDiv;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		
		if(youmax_global_options.loadMode=="loadmore") {
			$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
			$youmaxLoadMoreDiv.html('<i class="fa fa-plus fa-5x"></i>');
		} else if(youmax_global_options.loadMode.indexOf("paginate")!=-1) {
			$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-next-div');
			$youmaxLoadMoreDiv.html('<i class="fa fa-caret-right fa-5x"></i>');
			$youmaxContainer.find('#youmax-previous-div').html('<i class="fa fa-caret-left fa-5x"></i>');
		}
	
		$youmaxLoadMoreDiv.removeClass('youmax-load-more-div-click');
			
	},
	
	resetLoadMoreComments = function($youmaxContainer) {
		var $youmaxMoreButton = $youmaxContainer.find(".youmax-encloser-comment-button.youmax-more-button");
		$youmaxMoreButton.removeClass('youmax-load-more-comments-clicked');
		$youmaxMoreButton.html('<i class="fa fa-plus fa-3x"></i>');
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
			
			
			$youmaxContainer.find('#youmax-video-list-div li').magnificPopup({
				type:'iframe',
				gallery: {
					enabled:true
				},
				iframe:{
					markup: '<div class="mfp-iframe-scaler">'+
					'<div class="mfp-close"></div>'+
					'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
					//'<div id="youmax-encloser-comment-wrapper" class="youmax-encloser-comment-wrapper-popup"><div class="youmax-encloser-comment-button youmax-show-button youmax-popup-show-button">Show Comments</div><div id="youmax-encloser-comment-holder" class="youmax-encloser-comment-holder-popup"><div class="youmax-video-comment"><textarea class="youmax-comment-textbox" placeholder="Share your Thoughts..."></textarea><button type="button" class="youmax-add-comment-button">G+ Sign In</button></div><div id="youmax-encloser-comments"></div><div class="youmax-encloser-comment-button youmax-more-button">Load More Comments</div></div></div>'+
					'<div id="photo-detail-holder"><div class="photo-popup-title"></div><div class="photo-popup-description"></div><div class="photo-popup-stats"><span class="media-views"></span><span class="media-likes"> </span><span class="media-uploaded"></span></div> <div class="youmax-show-button-wrapper"><div class="youmax-encloser-comment-button youmax-show-button youmax-popup-show-button"><i class="fa fa-comments fa-3x"></i></div></div> <div id="youmax-encloser-comment-holder" class="youmax-encloser-comment-holder-popup"><div class="youmax-video-comment youmax-commentbox-holder"><textarea class="youmax-comment-textbox" placeholder="'+youmax_translator_text.thoughts+'"></textarea><button type="button" class="youmax-add-comment-button"><i class="fa fa-sign-in fa-2x"></i></button><div type="button" class="youmax-share-video-button"><i class="fa fa-share fa-2x"></i></div></div><div id="youmax-encloser-comments"></div><div class="youmax-encloser-comment-button youmax-more-button"><i class="fa fa-plus fa-3x"></i></div></div> </div>'+
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
				closeBtnInside: false, 
				closeOnContentClick: false, 
				closeOnBgClick: true, 
				enableEscapeKey: true, 
				modal: false, 
				alignTop: youmax_global_options.alignPopupToTop, 
				removalDelay: 100, 
				mainClass: ' ',
				prependTo: $youmaxContainer.get(),
				callbacks: {
					change: function(template, values, item) {
						// Triggers each time when content of popup changes
						//console.log('open:',item);
						var $baseElement = $(this.currItem.el.context);
						//console.log("$baseElement",$baseElement);
						displayVideoData($baseElement,$youmaxContainer);
						


					}			
				}
			});		
			
			
		} else if(youmax_global_options.displayVideo=="inline" || youmax_global_options.displayVideo=="newpage"){
			//display inline video
			//http://www.youtube.com/embed/%id%?rel=0&autoplay=1
			//var $youmaxEncloserIframe = $youmaxContainer.find('#youmax-encloser-video');
			$youmaxContainer.find('#youmax-video-list-div li').click(function() {
				//console.log($youmaxEncloserIframe);
				
				$baseElement = $(this);
				displayInlineVideo($baseElement,true,true,$youmaxContainer,isPlaylist);
			
			});
			
			if(youmax_global_options.displayVideo=="inline" && youmax_global_options.displayFirstVideoOnLoad) {
				//videoId = $youmaxContainer.find('#youmax-video-list-div li:first').attr('id');
				//displayInlineVideo(videoId,false,false,$youmaxContainer);
				setTimeout(function(){
					$youmaxContainer.find('#youmax-video-list-div li:first').click();
				}, 100);
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

		}
	
	},
	
	
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
		
			if(null!=video_title) {
				$youmaxContainer.find('.photo-popup-title').html(video_title);
			}
			
			if(null!=video_description) {
				video_description = video_description.replace(/\n/g,"<br>");
				$youmaxContainer.find('.photo-popup-description').html(video_description);
			}
			
			if(youmax_global_options.showVimeoLikesInsteadOfViews && video_type=="vimeo") {
				if(null!=video_comments) {
					$youmaxContainer.find('.media-likes').html(video_comments+" "+youmax_translator_text.comments);
				}
				
				if(null!=video_views) {
					$youmaxContainer.find('.media-views').html(video_likes+" "+youmax_translator_text.likes);
				}
			} else {
				if(null!=video_likes) {
					$youmaxContainer.find('.media-likes').html(video_likes+" "+youmax_translator_text.likes);
				}
				
				if(null!=video_views) {
					$youmaxContainer.find('.media-views').html(video_views+" "+youmax_translator_text.views);
				}
			}
			
			if(null!=video_uploaded) {
				$youmaxContainer.find('.media-uploaded').html(video_uploaded);
			}
			
			
			/*videoUrl = $youmaxContainer.find('.mfp-content iframe').attr('src');
			videoId = videoUrl.substring(videoUrl.indexOf('/embed/')+7);
			if(videoUrl.indexOf('?')!=-1) {
				videoId = videoId.substring(0,videoId.indexOf('?'));
			}*/
			//console.log('videoId-'+videoId);
			//console.log($youmaxContainer);
			
			$youmaxContainer.find('.youmax-show-button.youmax-popup-show-button').attr('id',video_id_with_type).show();
			$youmaxContainer.find('.youmax-show-button.youmax-popup-show-button').data('channelid',channel_id);
			$youmaxContainer.find('.youmax-encloser-comment-button.youmax-more-button').data('start-index',1);
			$youmaxContainer.find('#youmax-encloser-comment-holder').hide();
			
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
					button_text: '<i class="fa fa-2x fa-share"></i>'
				},
				url: shareLink
			};

			new Share('.youmax-share-video-button', config);
		
		}, 100);	

	},
	
	displayInlineVideo = function($baseElement,scrollToVideo,generateLink,$youmaxContainer,isPlaylist) {
	
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = $youmaxContainer.data('youmax_translator_text');
		
		$youmaxContainer.find("#youmax-encloser").empty().append('<div class="fluid-width-video-wrapper" style="padding-top:'+(youmax_global_options.aspectRatio*100)+'%;"><iframe id="youmax-encloser-video" style="width:100%;" src="" frameborder="0" allowfullscreen></iframe></div><div id="youmax-encloser-comment-wrapper"><div id="photo-detail-holder"><div class="photo-popup-title"></div><div class="photo-popup-description"></div><div class="photo-popup-stats"><span class="media-views"></span><span class="media-likes"> </span><span class="media-uploaded"></span></div> <div class="youmax-show-button-wrapper"><div class="youmax-encloser-comment-button youmax-show-button youmax-popup-show-button"><i class="fa fa-comments fa-3x"></i></div></div> <div id="youmax-encloser-comment-holder" class="youmax-encloser-comment-holder-popup"><div class="youmax-video-comment youmax-commentbox-holder"><textarea class="youmax-comment-textbox" placeholder="'+youmax_translator_text.thoughts+'"></textarea><button type="button" class="youmax-add-comment-button"><i class="fa fa-sign-in fa-2x"></i></button><div type="button" class="youmax-share-video-button"><i class="fa fa-share fa-2x"></i></div></div><div id="youmax-encloser-comments"></div><div class="youmax-encloser-comment-button youmax-more-button"><i class="fa fa-plus fa-3x"></i></div></div> </div> </div>');

		//$youmaxEncloserIframe = $(this).parent().parent().prev().find('#youmax-encloser-video');
		$youmaxEncloserIframe = $youmaxContainer.find('#youmax-encloser-video');
		$youmaxEncloserIframe.attr("src","");
		$youmaxEncloserIframe.parents("#youmax-encloser").show();
		
		if(scrollToVideo) {
			$('html, body').animate({scrollTop: $youmaxEncloserIframe.offset().top - 50},'slow');
		}
		
		
		
		
		
		video_id_with_type = $baseElement.attr("id");		
		video_type = video_id_with_type.substring(0,video_id_with_type.indexOf("_"));
		video_id = video_id_with_type.substring(video_id_with_type.indexOf("_")+1);

			//$youmaxEncloserIframe.show();
		
		
		frame_source = generateFrameSource(video_id,video_type,isPlaylist,$youmaxContainer);
		$youmaxEncloserIframe.attr("src",frame_source);
				
		
		displayVideoData($baseElement,$youmaxContainer);
		
		
		
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
	
	generateFrameSource = function(video_id,video_type,isPlaylist,$youmaxContainer) {
	
		//var tabId = $youmaxContainer.find(".youmax-tab-hover").attr("id");
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var frame_source="";
		
		
		if(video_type=="youtube") {
			if(isPlaylist) {
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
				success: function(response) { insertSearchVideos(response,$youmaxContainer,false,isEvent);},
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
				success: function(response) { insertSearchVideos(response,$youmaxContainer,true);},
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

		video_type = video_id_with_type.substring(0,video_id_with_type.indexOf("_"));
		video_id = video_id_with_type.substring(video_id_with_type.indexOf("_")+1);	
	
		$youmaxContainer.find(".youmax-encloser-comment-button.youmax-show-button").hide();
		$youmaxContainer.find("#youmax-encloser-comment-holder").show();
		//$youmaxContainer.find("#youmax-encloser-comments").empty().append("<br><br><br><br><br>Loading...<br><br><br><br><br>");
		$youmaxContainer.find("#youmax-encloser-comments").empty().append("<div class='youmax-loading-comments-div'>loading...</div>");
		//showLoader($youmaxContainer);
		var tabId = $youmaxContainer.find(".youmax-tab-hover").attr("id");
		
		if(video_type=="youtube") {
			getYoutubeVideoComments(video_id,$youmaxContainer);
		} else if(video_type=="vimeo") {
			getVimeoVideoComments(video_id,$youmaxContainer);
			
			$youmaxContainer.find(".youmax-comment-textbox").attr("disabled","disabled").addClass("youmax-disabled");
			$youmaxContainer.find(".youmax-add-comment-button").attr("disabled","disabled").addClass("youmax-disabled");
		}
		
		/*
		if(playlistId.indexOf("search")!=-1) {
			getSearchVideos(playlistId,null,$youmaxContainer);
		} else if(playlistId.indexOf("playlists")!=-1) {
			getChannelPlaylists(playlistId,null,$youmaxContainer);
		} else {
			getPlaylistVideos(playlistId,null,$youmaxContainer);			
		}*/
		
		/*$youmaxContainer.find('.youmax-tab').removeClass('youmax-tab-hover');	
		$('#'+playlistId).addClass('youmax-tab-hover');
		$youmaxContainer.find('#youmax-select').val(playlistId);*/

	},

	loadMoreComments = function($youmaxContainer) {
	
		var $youmaxMoreButton = $youmaxContainer.find(".youmax-encloser-comment-button.youmax-more-button");
		$youmaxMoreButton.addClass('youmax-load-more-comments-clicked');
		$youmaxMoreButton.html('<i class="fa fa-ellipsis-h fa-3x"></i>');
		//var tabId = $youmaxContainer.find(".youmax-tab-hover").attr("id");
		var nextPageToken = $youmaxMoreButton.data('nextpagetoken');
		//var startIndex = parseInt($youmaxMoreButton.data('start-index'),10);
		
		if(null!=nextPageToken && nextPageToken!="undefined" && nextPageToken!="") {
			
			video_id_with_type = $youmaxContainer.find(".youmax-encloser-comment-button.youmax-show-button").attr('id');
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
			$youmaxMoreButton.html('<i class="fa fa-close fa-3x"></i>');
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
			"comments":"Comments"
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

				if(youmax_global_options.doNotSelectTabsByDefault) {
					youmax_global_options.youtube_channel_search[i].selected = false;
				}
				
				//restrictToChannels
				if(youmax_global_options.youtube_channel_search[i].restrictToChannels!=null) {
					channelId = scrapeChannelId(youmax_global_options.youtube_channel_search[i].restrictToChannels,"youtube_channel_search_"+i,$youmaxContainer,youmax_global_options.youtube_channel_search[i].selected);
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

				
				$tabContainer.append('<span id="youtube_channel_search_'+i+'" class="youmax-tab" '+dataString+' >'+youmax_global_options.youtube_channel_search[i].name.replace(/%20/g,' ')+'</span>');
				
				$selectConatiner.append('<option value="youtube_channel_search_'+i+'" class="youmax-option-highlight" '+dataString+' >'+youmax_global_options.youtube_channel_search[i].name.replace(/%20/g,' ')+'</option>');
				
				if(youmax_global_options.youtube_channel_search[i].selected) {
					$tabContainer.find('#youtube_channel_search_'+i).click();
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
	};




	//youmax plugin definition
    $.fn.youmax = function(options) {
		
		var youmax_global_options = {};
		var $youmaxContainer = this;
		//console.log($youmaxContainer.attr('id'));

		//Get CSS for Skins
		//console.log('options.skin-'+options.skin);
		options.skin = options.skin||"block";
		if(options.skin=="white" || options.skin=="grey" || options.skin=="blue" || options.skin=="clean" || options.skin=="block") {
			if (document.createStyleSheet){
                document.createStyleSheet("./css/youmax_"+options.skin+".min.css");
            } else {
                $("head").append("<link rel='stylesheet' href='./css/youmax_"+options.skin+".min.css' type='text/css' />");
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
		youmax_global_options.innerOffset = options.innerOffset||25;
		youmax_global_options.outerOffset = options.outerOffset||35;
		youmax_global_options.minItemWidth = options.minItemWidth||250;
		youmax_global_options.maxItemWidth = options.maxItemWidth||400;
		
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
		youmax_global_options.autoLoadComments = options.autoLoadComments;
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
		
		youmax_global_options.showVimeoLikesInsteadOfViews = options.showVimeoLikesInsteadOfViews||false; 

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
		
		if(null==youmax_global_options.autoLoadComments || youmax_global_options.autoLoadComments==="") {
			youmax_global_options.autoLoadComments = true;
		}
		
		if(null==youmax_global_options.alignPopupToTop || youmax_global_options.alignPopupToTop==="") {
			youmax_global_options.alignPopupToTop = true;
		}
		
		if(null==youmax_global_options.alwaysUseDropdown || youmax_global_options.alwaysUseDropdown==="") {
			youmax_global_options.alwaysUseDropdown = true;
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
		
		//Adding styles for wide video mode
		if(youmax_global_options.videoMode=="wide") {
			custom_styles += '#youmax-encloser {max-width: 100% !important;} #youmax-encloser-comment-wrapper {max-width: 880px;margin: 20px auto auto;}';
		}
		
		//Adding styles for widget mode
		if(youmax_global_options.widgetMode) {
			$youmaxContainer.addClass("youmax-widget");
			/*custom_styles += '#youmax-header-title,#youmax-header-bio,#youmax-header-website,#youmax-header-counts,.youmax-channel-data-holder {display: none !important;}.youmax-channel-icon img {margin-bottom: 0px;height: 140px; margin-left:20px;}#youmax-header-wrapper>a {width: 100%;margin: 0px;}.youmax-channel-icon {width: 100%;text-align: center;}button#youmax-load-more-div {width: 90px;height: 90px;}#youmax-load-more-div i {font-size: 45px;padding-left: 2px;} #youmax-encloser {margin-top: 30px;}';
			
			if(youmax_global_options.skin=="clean") {
				custom_styles += 'div#youmax-header-info {width: 100% !important;padding: 0px !important;} .youmax-subscribe-clean-wrapper {width: 100%;margin-left: 0px;} .youmax-subscribe {left: 0;right: 0;width: 115px;} #youmax, .youmax {padding-top: 10px;padding-bottom: 30px;}';
			} else {
				custom_styles += '.youmax-subscribe {left: 0;right: 0;width: 115px;top: 120px;}.youmax-channel-icon img {margin-top: 10px;height: 110px;}';
			}*/
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
			custom_styles += '#youmax-encloser-comment-holder,.youmax-show-button-wrapper{display:none !important;}';
		}
		
		//adding styles for hide video details
		if(youmax_global_options.hideVideoDetails) {
			custom_styles += '.photo-popup-title,.photo-popup-description,.photo-popup-stats{display:none !important;}';
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
		
		//adding media queries manually if maxContainerWidth is very low (widget mode)
		if(options.maxContainerWidth<900) {
			$youmaxContainer.addClass("lt900");
		}

		if(options.maxContainerWidth<800) {
			$youmaxContainer.addClass("lt800");			
		}

		if(options.maxContainerWidth<650) {
			$youmaxContainer.addClass("lt650");
		}
		
		if(options.maxContainerWidth<450) {
			$youmaxContainer.addClass("lt400");
		}
		
		if(options.maxContainerWidth>1000) {
			$youmaxContainer.addClass("gt100");
		}
		
		
		


		$("head").append("<style class='youmax-added-styles'>"+custom_styles+"</style>");
		
		initTranlator($youmaxContainer);
		

		
		
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