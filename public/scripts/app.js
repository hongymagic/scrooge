;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0](function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
(function() {
  var MortgageFormView, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  MortgageFormView = (function(_super) {
    __extends(MortgageFormView, _super);

    function MortgageFormView() {
      _ref = MortgageFormView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    MortgageFormView.prototype.el = '#form';

    MortgageFormView.prototype.template = _.template($('#__MortgageForm').html());

    MortgageFormView.prototype.initialize = function() {
      return this.binder = new Backbone.ModelBinder;
    };

    MortgageFormView.prototype.render = function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.binder.bind(this.model, this.el);
      return this;
    };

    return MortgageFormView;

  })(Backbone.View);

  module.exports = MortgageFormView;

}).call(this);


},{}],2:[function(require,module,exports){
(function() {
  var MortgageSummaryView, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  MortgageSummaryView = (function(_super) {
    __extends(MortgageSummaryView, _super);

    function MortgageSummaryView() {
      _ref = MortgageSummaryView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    MortgageSummaryView.prototype.el = '#summary';

    MortgageSummaryView.prototype.template = _.template($('#__MortgageSummary').html());

    MortgageSummaryView.prototype.initialize = function() {
      return this.listenTo(this.model, "change", this.render);
    };

    MortgageSummaryView.prototype.render = function() {
      this.$el.html(this.template(this.model.toFormattedJSON()));
      return this;
    };

    return MortgageSummaryView;

  })(Backbone.View);

  module.exports = MortgageSummaryView;

}).call(this);


},{}],3:[function(require,module,exports){
(function() {
  var FastClick, Mortgage, MortgageFormView, MortgageSummaryView, f, m, v;

  FastClick = require('fastclick');

  Mortgage = require('./models/mortgage.litcoffee');

  MortgageFormView = require('./views/mortgageFormView.litcoffee');

  MortgageSummaryView = require('./views/mortgageSummaryView.litcoffee');

  FastClick(document.body);

  m = new Mortgage;

  f = new MortgageFormView({
    model: m
  });

  v = new MortgageSummaryView({
    model: m
  });

  f.render();

  v.render();

}).call(this);


},{"./models/mortgage.litcoffee":4,"./views/mortgageFormView.litcoffee":1,"./views/mortgageSummaryView.litcoffee":2,"fastclick":5}],5:[function(require,module,exports){
(function(){/**
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
 *
 * @version 0.6.1
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */

/*jslint browser:true, node:true*/
/*global define, Event, Node*/


/**
 * Instantiate fast-clicking listeners on the specificed layer.
 *
 * @constructor
 * @param {Element} layer The layer to listen on
 */
function FastClick(layer) {
	'use strict';
	var oldOnClick, self = this;


	/**
	 * Whether a click is currently being tracked.
	 *
	 * @type boolean
	 */
	this.trackingClick = false;


	/**
	 * Timestamp for when when click tracking started.
	 *
	 * @type number
	 */
	this.trackingClickStart = 0;


	/**
	 * The element being tracked for a click.
	 *
	 * @type EventTarget
	 */
	this.targetElement = null;


	/**
	 * X-coordinate of touch start event.
	 *
	 * @type number
	 */
	this.touchStartX = 0;


	/**
	 * Y-coordinate of touch start event.
	 *
	 * @type number
	 */
	this.touchStartY = 0;


	/**
	 * ID of the last touch, retrieved from Touch.identifier.
	 *
	 * @type number
	 */
	this.lastTouchIdentifier = 0;


	/**
	 * The FastClick layer.
	 *
	 * @type Element
	 */
	this.layer = layer;

	if (!layer || !layer.nodeType) {
		throw new TypeError('Layer must be a document node');
	}

	/** @type function() */
	this.onClick = function() { return FastClick.prototype.onClick.apply(self, arguments); };

	/** @type function() */
	this.onMouse = function() { return FastClick.prototype.onMouse.apply(self, arguments); };

	/** @type function() */
	this.onTouchStart = function() { return FastClick.prototype.onTouchStart.apply(self, arguments); };

	/** @type function() */
	this.onTouchEnd = function() { return FastClick.prototype.onTouchEnd.apply(self, arguments); };

	/** @type function() */
	this.onTouchCancel = function() { return FastClick.prototype.onTouchCancel.apply(self, arguments); };

	// Devices that don't support touch don't need FastClick
	if (typeof window.ontouchstart === 'undefined') {
		return;
	}

	// Set up event handlers as required
	if (this.deviceIsAndroid) {
		layer.addEventListener('mouseover', this.onMouse, true);
		layer.addEventListener('mousedown', this.onMouse, true);
		layer.addEventListener('mouseup', this.onMouse, true);
	}

	layer.addEventListener('click', this.onClick, true);
	layer.addEventListener('touchstart', this.onTouchStart, false);
	layer.addEventListener('touchend', this.onTouchEnd, false);
	layer.addEventListener('touchcancel', this.onTouchCancel, false);

	// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
	// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
	// layer when they are cancelled.
	if (!Event.prototype.stopImmediatePropagation) {
		layer.removeEventListener = function(type, callback, capture) {
			var rmv = Node.prototype.removeEventListener;
			if (type === 'click') {
				rmv.call(layer, type, callback.hijacked || callback, capture);
			} else {
				rmv.call(layer, type, callback, capture);
			}
		};

		layer.addEventListener = function(type, callback, capture) {
			var adv = Node.prototype.addEventListener;
			if (type === 'click') {
				adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
					if (!event.propagationStopped) {
						callback(event);
					}
				}), capture);
			} else {
				adv.call(layer, type, callback, capture);
			}
		};
	}

	// If a handler is already declared in the element's onclick attribute, it will be fired before
	// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
	// adding it as listener.
	if (typeof layer.onclick === 'function') {

		// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
		// - the old one won't work if passed to addEventListener directly.
		oldOnClick = layer.onclick;
		layer.addEventListener('click', function(event) {
			oldOnClick(event);
		}, false);
		layer.onclick = null;
	}
}


/**
 * Android requires exceptions.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0;


/**
 * iOS requires exceptions.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);


/**
 * iOS 4 requires an exception for select elements.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOS4 = FastClick.prototype.deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


/**
 * iOS 6.0(+?) requires the target element to be manually derived
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOSWithBadTarget = FastClick.prototype.deviceIsIOS && (/OS ([6-9]|\d{2})_\d/).test(navigator.userAgent);


/**
 * Determine whether a given element requires a native click.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element needs a native click
 */
FastClick.prototype.needsClick = function(target) {
	'use strict';
	switch (target.nodeName.toLowerCase()) {
	case 'button':
	case 'input':

		// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
		if (this.deviceIsIOS && target.type === 'file') {
			return true;
		}

		// Don't send a synthetic click to disabled inputs (issue #62)
		return target.disabled;
	case 'label':
	case 'video':
		return true;
	default:
		return (/\bneedsclick\b/).test(target.className);
	}
};


/**
 * Determine whether a given element requires a call to focus to simulate click into element.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
 */
FastClick.prototype.needsFocus = function(target) {
	'use strict';
	switch (target.nodeName.toLowerCase()) {
	case 'textarea':
	case 'select':
		return true;
	case 'input':
		switch (target.type) {
		case 'button':
		case 'checkbox':
		case 'file':
		case 'image':
		case 'radio':
		case 'submit':
			return false;
		}

		// No point in attempting to focus disabled inputs
		return !target.disabled;
	default:
		return (/\bneedsfocus\b/).test(target.className);
	}
};


/**
 * Send a click event to the specified element.
 *
 * @param {EventTarget|Element} targetElement
 * @param {Event} event
 */
FastClick.prototype.sendClick = function(targetElement, event) {
	'use strict';
	var clickEvent, touch;

	// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
	if (document.activeElement && document.activeElement !== targetElement) {
		document.activeElement.blur();
	}

	touch = event.changedTouches[0];

	// Synthesise a click event, with an extra attribute so it can be tracked
	clickEvent = document.createEvent('MouseEvents');
	clickEvent.initMouseEvent('click', true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
	clickEvent.forwardedTouchEvent = true;
	targetElement.dispatchEvent(clickEvent);
};


/**
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.focus = function(targetElement) {
	'use strict';
	var length;

	if (this.deviceIsIOS && targetElement.setSelectionRange) {
		length = targetElement.value.length;
		targetElement.setSelectionRange(length, length);
	} else {
		targetElement.focus();
	}
};


/**
 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
 *
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.updateScrollParent = function(targetElement) {
	'use strict';
	var scrollParent, parentElement;

	scrollParent = targetElement.fastClickScrollParent;

	// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
	// target element was moved to another parent.
	if (!scrollParent || !scrollParent.contains(targetElement)) {
		parentElement = targetElement;
		do {
			if (parentElement.scrollHeight > parentElement.offsetHeight) {
				scrollParent = parentElement;
				targetElement.fastClickScrollParent = parentElement;
				break;
			}

			parentElement = parentElement.parentElement;
		} while (parentElement);
	}

	// Always update the scroll top tracker if possible.
	if (scrollParent) {
		scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
	}
};


/**
 * @param {EventTarget} targetElement
 * @returns {Element|EventTarget}
 */
FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
	'use strict';

	// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
	if (eventTarget.nodeType === Node.TEXT_NODE) {
		return eventTarget.parentNode;
	}

	return eventTarget;
};


/**
 * On touch start, record the position and scroll offset.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchStart = function(event) {
	'use strict';
	var targetElement, touch, selection;

	targetElement = this.getTargetElementFromEventTarget(event.target);
	touch = event.targetTouches[0];

	if (this.deviceIsIOS) {

		// Only trusted events will deselect text on iOS (issue #49)
		selection = window.getSelection();
		if (selection.rangeCount && !selection.isCollapsed) {
			return true;
		}

		if (!this.deviceIsIOS4) {

			// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
			// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
			// with the same identifier as the touch event that previously triggered the click that triggered the alert.
			// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
			// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
			if (touch.identifier === this.lastTouchIdentifier) {
				event.preventDefault();
				return false;
			}
		
			this.lastTouchIdentifier = touch.identifier;

			// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
			// 1) the user does a fling scroll on the scrollable layer
			// 2) the user stops the fling scroll with another tap
			// then the event.target of the last 'touchend' event will be the element that was under the user's finger
			// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
			// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
			this.updateScrollParent(targetElement);
		}
	}

	this.trackingClick = true;
	this.trackingClickStart = event.timeStamp;
	this.targetElement = targetElement;

	this.touchStartX = touch.pageX;
	this.touchStartY = touch.pageY;

	// Prevent phantom clicks on fast double-tap (issue #36)
	if ((event.timeStamp - this.lastClickTime) < 200) {
		event.preventDefault();
	}

	return true;
};


/**
 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.touchHasMoved = function(event) {
	'use strict';
	var touch = event.changedTouches[0];

	if (Math.abs(touch.pageX - this.touchStartX) > 10 || Math.abs(touch.pageY - this.touchStartY) > 10) {
		return true;
	}

	return false;
};


/**
 * Attempt to find the labelled control for the given label element.
 *
 * @param {EventTarget|HTMLLabelElement} labelElement
 * @returns {Element|null}
 */
FastClick.prototype.findControl = function(labelElement) {
	'use strict';

	// Fast path for newer browsers supporting the HTML5 control attribute
	if (labelElement.control !== undefined) {
		return labelElement.control;
	}

	// All browsers under test that support touch events also support the HTML5 htmlFor attribute
	if (labelElement.htmlFor) {
		return document.getElementById(labelElement.htmlFor);
	}

	// If no for attribute exists, attempt to retrieve the first labellable descendant element
	// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
	return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
};


/**
 * On touch end, determine whether to send a click event at once.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchEnd = function(event) {
	'use strict';
	var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

	// If the touch has moved, cancel the click tracking
	if (this.touchHasMoved(event)) {
		this.trackingClick = false;
		this.targetElement = null;
	}

	if (!this.trackingClick) {
		return true;
	}

	// Prevent phantom clicks on fast double-tap (issue #36)
	if ((event.timeStamp - this.lastClickTime) < 200) {
		this.cancelNextClick = true;
		return true;
	}

	this.lastClickTime = event.timeStamp;

	trackingClickStart = this.trackingClickStart;
	this.trackingClick = false;
	this.trackingClickStart = 0;

	// On some iOS devices, the targetElement supplied with the event is invalid if the layer
	// is performing a transition or scroll, and has to be re-detected manually. Note that
	// for this to function correctly, it must be called *after* the event target is checked!
	// See issue #57; also filed as rdar://13048589 .
	if (this.deviceIsIOSWithBadTarget) {
		touch = event.changedTouches[0];
		targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset);
	}

	targetTagName = targetElement.tagName.toLowerCase();
	if (targetTagName === 'label') {
		forElement = this.findControl(targetElement);
		if (forElement) {
			this.focus(targetElement);
			if (this.deviceIsAndroid) {
				return false;
			}

			targetElement = forElement;
		}
	} else if (this.needsFocus(targetElement)) {

		// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
		// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
		if ((event.timeStamp - trackingClickStart) > 100 || (this.deviceIsIOS && window.top !== window && targetTagName === 'input')) {
			this.targetElement = null;
			return false;
		}

		this.focus(targetElement);

		// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
		if (!this.deviceIsIOS4 || targetTagName !== 'select') {
			this.targetElement = null;
			event.preventDefault();
		}

		return false;
	}

	if (this.deviceIsIOS && !this.deviceIsIOS4) {

		// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
		// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
		scrollParent = targetElement.fastClickScrollParent;
		if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
			return true;
		}
	}

	// Prevent the actual click from going though - unless the target node is marked as requiring
	// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
	if (!this.needsClick(targetElement)) {
		event.preventDefault();
		var self = this;
		setTimeout(function(){
			self.sendClick(targetElement, event);
		}, 0);
	}

	return false;
};


/**
 * On touch cancel, stop tracking the click.
 *
 * @returns {void}
 */
FastClick.prototype.onTouchCancel = function() {
	'use strict';
	this.trackingClick = false;
	this.targetElement = null;
};


/**
 * Determine mouse events which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onMouse = function(event) {
	'use strict';

	// If a target element was never set (because a touch event was never fired) allow the event
	if (!this.targetElement) {
		return true;
	}

	if (event.forwardedTouchEvent) {
		return true;
	}

	// Programmatically generated events targeting a specific element should be permitted
	if (!event.cancelable) {
		return true;
	}

	// Derive and check the target element to see whether the mouse event needs to be permitted;
	// unless explicitly enabled, prevent non-touch click events from triggering actions,
	// to prevent ghost/doubleclicks.
	if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

		// Prevent any user-added listeners declared on FastClick element from being fired.
		if (event.stopImmediatePropagation) {
			event.stopImmediatePropagation();
		} else {

			// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			event.propagationStopped = true;
		}

		// Cancel the event
		event.stopPropagation();
		event.preventDefault();

		return false;
	}

	// If the mouse event is permitted, return true for the action to go through.
	return true;
};


/**
 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
 * an actual click which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onClick = function(event) {
	'use strict';
	var permitted;

	// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
	if (this.trackingClick) {
		this.targetElement = null;
		this.trackingClick = false;
		return true;
	}

	// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
	if (event.target.type === 'submit' && event.detail === 0) {
		return true;
	}

	permitted = this.onMouse(event);

	// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
	if (!permitted) {
		this.targetElement = null;
	}

	// If clicks are permitted, return true for the action to go through.
	return permitted;
};


/**
 * Remove all FastClick's event listeners.
 *
 * @returns {void}
 */
FastClick.prototype.destroy = function() {
	'use strict';
	var layer = this.layer;

	if (this.deviceIsAndroid) {
		layer.removeEventListener('mouseover', this.onMouse, true);
		layer.removeEventListener('mousedown', this.onMouse, true);
		layer.removeEventListener('mouseup', this.onMouse, true);
	}

	layer.removeEventListener('click', this.onClick, true);
	layer.removeEventListener('touchstart', this.onTouchStart, false);
	layer.removeEventListener('touchend', this.onTouchEnd, false);
	layer.removeEventListener('touchcancel', this.onTouchCancel, false);
};


/**
 * Factory method for creating a FastClick object
 *
 * @param {Element} layer The layer to listen on
 */
FastClick.attach = function(layer) {
	'use strict';
	return new FastClick(layer);
};


if (typeof define !== 'undefined' && define.amd) {

	// AMD. Register as an anonymous module.
	define(function() {
		'use strict';
		return FastClick;
	});
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = FastClick.attach;
	module.exports.FastClick = FastClick;
}

})()
},{}],4:[function(require,module,exports){
(function() {
  var Big, LMI, Mortgage, Period, StampDuty, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  LMI = require('lmi');

  StampDuty = require('stamp-duty');

  Big = require('big.js');

  Period = {
    Monthly: 12,
    Fortnightly: 24,
    Weekly: 48
  };

  Mortgage = (function(_super) {
    __extends(Mortgage, _super);

    function Mortgage() {
      _ref = Mortgage.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Mortgage.prototype.defaults = {
      interest: 5.54,
      price: 760000,
      savings: 154290,
      duration: 30,
      state: 'NSW',
      capitalize: true
    };

    Mortgage.prototype.deposit = function() {
      return this.savings - this.stamp_duty() - this.fees();
    };

    Mortgage.prototype.stamp_duty = function() {
      return StampDuty(this.state, this.price);
    };

    Mortgage.prototype.loan = function() {
      return this.price - this.deposit();
    };

    Mortgage.prototype.borrowing = function() {
      var borrowing;

      borrowing = this.loan();
      if (this.capitalize) {
        borrowing += this.lmi();
      }
      return borrowing;
    };

    Mortgage.prototype.fees = function() {
      return 3000;
    };

    Mortgage.prototype.lvr = function() {
      return this.loan() / this.price;
    };

    Mortgage.prototype.capitalized_lvr = function() {
      return this.borrowing() / this.price;
    };

    Mortgage.prototype.lmi = function() {
      var lvr;

      lvr = this.lvr();
      if (lvr <= 0.80) {
        return 0;
      } else {
        return LMI(lvr, this.loan());
      }
    };

    Mortgage.prototype.repayments = function() {
      var P, i, n;

      P = this.borrowing();
      i = this.interest / Period.Monthly / 100;
      n = this.duration * Period.Monthly;
      return P * (i * Math.pow(i + 1, n)) / (Math.pow(1 + i, n) - 1);
    };

    Mortgage.prototype.toJSON = function() {
      return _.extend(_.clone(this.attributes), {
        fees: this.fees(),
        loan: this.loan(),
        deposit: this.deposit(),
        borrowing: this.borrowing(),
        lvr: this.lvr() * 100,
        repayments: this.repayments(),
        lmi: this.lmi(),
        stamp_duty: this.stamp_duty(),
        capitalized_lvr: this.capitalized_lvr() * 100
      });
    };

    Mortgage.prototype.toFormattedJSON = function() {
      var decimals, json, key, monies, value;

      monies = ['price', 'savings', 'deposit', 'stamp_duty', 'fees', 'loan', 'borrowing', 'repayments', 'lmi'];
      decimals = ['lvr', 'capitalized_lvr', 'interest'];
      json = this.toJSON();
      for (key in json) {
        value = json[key];
        if (__indexOf.call(monies, key) >= 0) {
          json[key] = accounting.formatNumber(value);
        }
        if (__indexOf.call(decimals, key) >= 0) {
          json[key] = accounting.formatNumber(value, 2);
        }
      }
      return json;
    };

    Mortgage.prototype.toString = function() {
      return JSON.stringify(this.toJSON());
    };

    return Mortgage;

  })(Backbone.Model);

  module.exports = Mortgage;

}).call(this);


},{"stamp-duty":6,"lmi":7,"big.js":8}],7:[function(require,module,exports){
// A sample lenders' mortgage insurance (LMI) calculator for Australia. Please
// note that LMI will vary between lenders and this calculation should be used
// only as a sample guide.

var b1 = [0.41, 0.61, 0.76, 0.91, 1.22, 1.68, 1.89, 2.10];
var b2 = [0.52, 0.78, 0.99, 1.18, 1.60, 2.20, 2.47, 2.74];
var b3 = [0.72, 1.01, 1.25, 1.50, 2.02, 3.31, 3.56, 3.76];

//
// Number#toFixed which returns a number
function toFixed (value, precision) {
	if (precision == null) precision = 4;

	var power = Math.pow(10, precision);
	var fixed = (Math.round(value * power) / power).toFixed(precision);
	return parseFloat(fixed);
}

//
// LMI is simply a portion of the loan which is based on the loan-to-value
// ratio.
function rate (lvr, loan) {
	var band, index;

	if (loan < 300000)
		band = b1;
	else if (loan < 600000)
		band = b2;
	else if (loan < 1000000)
		band = b3;

	if (band === undefined)
		return 0;

	if (lvr > 0.8 && lvr < 0.82) {
		index = 0;
	} else if (lvr < 0.84) {
		index = 1;
	} else if (lvr < 0.86) {
		index = 2;
	} else if (lvr < 0.88) {
		index = 3;
	} else if (lvr < 0.9) {
		index = 4;
	} else if (lvr < 0.92) {
		index = 5;
	} else if (lvr < 0.94) {
		index = 6;
	} else {
		index = 7;
	}

	return toFixed(band[index] / 100, 5);
};

module.exports = function (lvr, loan, precision) {
	return toFixed(rate(lvr, loan) * loan, precision || 2);;
};

},{}],8:[function(require,module,exports){
(function(){/* big.js v1.0.1 https://github.com/MikeMcl/big.js/LICENCE */
;(function ( global ) {
    'use strict';

    /*
      big.js v1.0.1
      A small, fast Javascript library for arbitrary-precision arithmetic with decimal numbers. 
      https://github.com/MikeMcl/big.js/
      Copyright (c) 2012 Michael Mclaughlin <M8ch88l@gmail.com>
      MIT Expat Licence
    */

    /****************************** EDITABLE DEFAULTS **********************************/


    // The default values below must be integers within the stated ranges (inclusive).

    /*
     * The maximum number of decimal places of the results of methods involving
     * division, i.e. 'div' and 'sqrt', and 'pow' with negative exponents.
     */
    Big['DP'] = 20;                                  // 0 to MAX_DP

    /*
     * The rounding mode used when rounding to the above decimal places.
     *
     * 0 Round towards zero (i.e. truncate, no rounding).               (ROUND_DOWN     )
     * 1 Round to nearest neighbour. If equidistant, round up.          (ROUND_HALF_UP  )
     * 2 Round to nearest neighbour. If equidistant, to even neighbour. (ROUND_HALF_EVEN)
     */
    Big['RM'] = 1;                                   // 0, 1 or 2

        // The maximum value of 'Big.DP'.
    var MAX_DP = 1E6,                                // 0 to 1e+6

        // The maximum magnitude of the exponent argument to the 'pow' method.
        MAX_POWER = 1E6,                             // 1 to 1e+6

        /*
         * The exponent value at and beneath which 'toString' returns exponential notation.
         * Javascript's Number type: -7
         * -1e+6 is the minimum recommended exponent value of a 'Big'.
         */
        TO_EXP_NEG = -7,                             // 0 to -1e+6

        /*
         * The exponent value at and above which 'toString' returns exponential notation.
         * Javascript's Number type: 21
         * 1e+6 is the maximum recommended exponent value of a 'Big', though there is no
         * enforcing or checking of a limit.
         */
        TO_EXP_POS = 21,                             // 0 to 1e+6


    /***********************************************************************************/

        P = Big.prototype,
        isValid = /^-?\d+(?:\.\d+)?(?:e[+-]?\d+)?$/i,
        ONE = new Big(1);


    // CONSTRUCTOR


    /*
     * The exported function.
     * Create and return a new instance of a 'Big' object.
     *
     * n {number|string|Big} A numeric value.
     */
    function Big( n ) {
        var i, j, nL,
            x = this;

        // Enable constructor usage without new.
        if ( !(x instanceof Big) ) {
            return new Big( n )
        }

        // Duplicate.
        if ( n instanceof Big ) {
            x['s'] = n['s'];
            x['e'] = n['e'];
            x['c'] = n['c'].slice();
            return
        }

        // Minus zero?
        if ( n === 0 && 1 / n < 0 ) {
            n = '-0'
        // Ensure 'n' is string and check validity.
        } else if ( !isValid.test(n += '') ) {
            throw NaN
        }

        // Determine sign.
        x['s'] = n.charAt(0) == '-' ? ( n = n.slice(1), -1 ) : 1;

        // Decimal point?
        if ( ( i = n.indexOf('.') ) > -1 ) {
            n = n.replace( '.', '' )
        }

        // Exponential form?
        if ( ( j = n.search(/e/i) ) > 0 ) {

            // Determine exponent.
            if ( i < 0 ) {
                i = j
            }
            i += +n.slice( j + 1 );
            n = n.substring( 0, j )

        } else if ( i < 0 ) {

            // Integer.
            i = n.length
        }

        // Determine leading zeros.
        for ( j = 0; n.charAt(j) == '0'; j++ ) {
        }

        if ( j == ( nL = n.length ) ) {

            // Zero.
            x['c'] = [ x['e'] = 0 ]
        } else {

            // Determine trailing zeros.
            for ( ; n.charAt(--nL) == '0'; ) {
            }

            x['e'] = i - j - 1;
            x['c'] = [];

            // Convert string to array of digits (without leading and trailing zeros).
            for ( i = 0; j <= nL; x['c'][i++] = +n.charAt(j++) ) {
            }
        }
    }


    // PRIVATE FUNCTIONS


    /*
     * Round 'Big' 'x' to a maximum of 'dp' decimal places using rounding mode
     * 'rm'. (Called by 'div', 'sqrt' and 'round'.)
     *
     * x {Big} The 'Big' to round.
     * dp {number} Integer, 0 to MAX_DP inclusive.
     * rm {number} 0, 1 or 2 ( ROUND_DOWN, ROUND_HALF_UP or ROUND_HALF_EVEN )
     * [more] {boolean} Whether the result of division was truncated.
     */
    function rnd( x, dp, rm, more ) {
        var xc = x['c'],
            i = x['e'] + dp + 1;

        if ( rm !== 0 && rm !== 1 && rm !== 2 ) {
            throw '!Big.RM!'
        }

        // 'xc[i]' is the digit after the digit that may be rounded up.
        rm = rm && ( xc[i] > 5 || xc[i] == 5 &&
          ( rm == 1 || more || i < 0 || xc[i + 1] != null || xc[i - 1] & 1 ) );

        if ( i < 1 || !xc[0] ) {
            x['c'] = rm
              // 1, 0.1, 0.01, 0.001, 0.0001 etc.
              ? ( x['e'] = -dp, [1] )
              // Zero.
              : [ x['e'] = 0 ];
        } else {

            // Remove any digits after the required decimal places.
            xc.length = i--;

            // Round up?
            if ( rm ) {

                // Rounding up may mean the previous digit has to be rounded up and so on.
                for ( ; ++xc[i] > 9; ) {
                    xc[i] = 0;

                    if ( !i-- ) {
                        ++x['e'];
                        xc.unshift(1)
                    }
                }
            }

            // Remove trailing zeros.
            for ( i = xc.length; !xc[--i]; xc.pop() ) {
            }
        }

        return x
    }


    // PROTOTYPE/INSTANCE METHODS


    /*
     * Return
     * 1 if the value of this 'Big' is greater than the value of 'Big' 'y',
     * -1 if the value of this 'Big' is less than the value of 'Big' 'y', or
     * 0 if they have the same value,
     */
    P['cmp'] = function ( y ) {
        var xNeg,
            x = this,
            xc = x['c'],
            yc = ( y = new Big( y ) )['c'],
            i = x['s'],
            j = y['s'],
            k = x['e'],
            l = y['e'];

        // Either zero?
        if ( !xc[0] || !yc[0] ) {
            return !xc[0] ? !yc[0] ? 0 : -j : i
        }

        // Signs differ?
        if ( i != j ) {
            return i
        }
        xNeg = i < 0;

        // Compare exponents.
        if ( k != l ) {
            return k > l ^ xNeg ? 1 : -1
        }

        // Compare digit by digit.
        for ( i = -1,
              j = ( k = xc.length ) < ( l = yc.length ) ? k : l;
              ++i < j; ) {

            if ( xc[i] != yc[i] ) {
                return xc[i] > yc[i] ^ xNeg ? 1 : -1
            }
        }

        // Compare lengths.
        return k == l ? 0 : k > l ^ xNeg ? 1 : -1
    };


    /*
     * Return a new 'Big' whose value is the value of this 'Big' divided by the
     * value of 'Big' 'y', rounded, if necessary, to a maximum of 'Big.DP'
     * decimal places using rounding mode 'Big.RM'.
     */
    P['div'] = function ( y ) {
        var x = this,
            dvd = x['c'],
            dvs = ( y = new Big(y) )['c'],
            s = x['s'] == y['s'] ? 1 : -1,
            dp = Big['DP'];

        if ( dp !== ~~dp || dp < 0 || dp > MAX_DP ) {
            throw '!Big.DP!'
        }

        // Either 0?
        if ( !dvd[0] || !dvs[0] ) {

            // Both 0?
            if ( dvd[0] == dvs[0] ) {
                throw NaN
            }

            // 'dvs' is 0?
            if ( !dvs[0] ) {
                // Throw +-Infinity.
                throw s / 0
            }

            // 'dvd' is 0. Return +-0.
            return new Big( s * 0 )
        }


        var dvsL, dvsT, next, cmp, remI,
            dvsZ = dvs.slice(),
            dvdI = dvsL = dvs.length,
            dvdL = dvd.length,
            rem = dvd.slice( 0, dvsL ),
            remL = rem.length,
            quo = new Big(ONE),
            qc = quo['c'] = [],
            qi = 0,
            digits = dp + ( quo['e'] = x['e'] - y['e'] ) + 1;

        quo['s'] = s;
        s = digits < 0 ? 0 : digits;

        // Create version of divisor with leading zero.
        dvsZ.unshift(0);

        // Add zeros to make remainder as long as divisor.
        for ( ; remL++ < dvsL; rem.push(0) ) {
        }

        do {

            // 'next' is how many times the divisor goes into the current remainder.
            for ( next = 0; next < 10; next++ ) {

                // Compare divisor and remainder.
                if ( dvsL != ( remL = rem.length ) ) {
                    cmp = dvsL > remL ? 1 : -1
                } else {
                    for ( remI = -1, cmp = 0; ++remI < dvsL; ) {

                        if ( dvs[remI] != rem[remI] ) {
                            cmp = dvs[remI] > rem[remI] ? 1 : -1;
                            break
                        }
                    }
                }

                // Subtract divisor from remainder (if divisor < remainder).
                if ( cmp < 0 ) {

                    // Remainder cannot be more than one digit longer than divisor.
                    // Equalise lengths using divisor with extra leading zero?
                    for ( dvsT = remL == dvsL ? dvs : dvsZ; remL; ) {

                        if ( rem[--remL] < dvsT[remL] ) {

                            for ( remI = remL;
                                  remI && !rem[--remI];
                                  rem[remI] = 9 ) {
                            }
                            --rem[remI];
                            rem[remL] += 10
                        }
                        rem[remL] -= dvsT[remL]
                    }
                    for ( ; !rem[0]; rem.shift() ) {
                    }
                } else {
                    break
                }
            }

            // Add the 'next' digit to the result array.
            qc[qi++] = cmp ? next : ++next;

            // Update the remainder.
            rem[0] && cmp
              ? ( rem[remL] = dvd[dvdI] || 0 )
              : ( rem = [ dvd[dvdI] ] )

        } while ( ( dvdI++ < dvdL || rem[0] != null ) && s-- );

        // Leading zero? Do not remove if result is simply zero (qi == 1).
        if ( !qc[0] && qi != 1) {

            // There can't be more than one zero.
            qc.shift();
            quo['e']--;
        }

        // Round?
        if ( qi > digits ) {
            rnd( quo, dp, Big['RM'], rem[0] != null )
        }

        return quo
    }


    /*
     * Return a new 'Big' whose value is the value of this 'Big' minus the value
     * of 'Big' 'y'.
     */
    P['minus'] = function ( y ) {
        var d, i, j, xLTy,
            x = this,
            a = x['s'],
            b = ( y = new Big( y ) )['s'];

        // Signs differ?
        if ( a != b ) {
            return y['s'] = -b, x['plus'](y)
        }

        var xc = x['c'],
            xe = x['e'],
            yc = y['c'],
            ye = y['e'];

        // Either zero?
        if ( !xc[0] || !yc[0] ) {

            // 'y' is non-zero?
            return yc[0]
              ? ( y['s'] = -b, y )
              // 'x' is non-zero?
              : new Big( xc[0]
                ? x
                // Both are zero.
                : 0 )
        }

        // Determine which is the bigger number.
        // Prepend zeros to equalise exponents.
        if ( xc = xc.slice(), a = xe - ye ) {
            d = ( xLTy = a < 0 ) ? ( a = -a, xc ) : ( ye = xe, yc );

            for ( d.reverse(), b = a; b--; d.push(0) ) {
            }
            d.reverse()
        } else {

            // Exponents equal. Check digit by digit.
            j = ( ( xLTy = xc.length < yc.length ) ? xc : yc ).length;

            for ( a = b = 0; b < j; b++ ) {

                if ( xc[b] != yc[b] ) {
                    xLTy = xc[b] < yc[b];
                    break
                }
            }
        }

        // 'x' < 'y'? Point 'xc' to the array of the bigger number.
        if ( xLTy ) {
            d = xc, xc = yc, yc = d;
            y['s'] = -y['s']
        }

        /*
         * Append zeros to 'xc' if shorter. No need to add zeros to 'yc' if shorter
         * as subtraction only needs to start at 'yc.length'.
         */
        if ( ( b = -( ( j = xc.length ) - yc.length ) ) > 0 ) {

            for ( ; b--; xc[j++] = 0 ) {
            }
        }

        // Subtract 'yc' from 'xc'.
        for ( b = yc.length; b > a; ){

            if ( xc[--b] < yc[b] ) {

                for ( i = b; i && !xc[--i]; xc[i] = 9 ) {
                }
                --xc[i];
                xc[b] += 10
            }
            xc[b] -= yc[b]
        }

        // Remove trailing zeros.
        for ( ; xc[--j] == 0; xc.pop() ) {
        }

        // Remove leading zeros and adbust exponent accordingly.
        for ( ; xc[0] == 0; xc.shift(), --ye ) {
        }

        if ( !xc[0] ) {

            // Result must be zero.
            xc = [ye = 0]
        }

        return y['c'] = xc, y['e'] = ye, y
    };


    /*
     * Return a new 'Big' whose value is the value of this 'Big' modulo the
     * value of 'Big' 'y'.
     */
    P['mod'] = function ( y ) {
        y = new Big( y );
        var c,
            x = this,
            i = x['s'],
            j = y['s'];

        if ( !y['c'][0] ) {
            throw NaN
        }

        x['s'] = y['s'] = 1;
        c = y['cmp'](x) == 1;
        x['s'] = i, y['s'] = j;

        return c
          ? new Big(x)
          : ( i = Big['DP'], j = Big['RM'],
            Big['DP'] = Big['RM'] = 0,
              x = x['div'](y),
                Big['DP'] = i, Big['RM'] = j,
                  this['minus']( x['times'](y) ) )
    };


    /*
     * Return a new 'Big' whose value is the value of this 'Big' plus the value
     * of 'Big' 'y'.
     */
    P['plus'] = function ( y ) {
        var d,
            x = this,
            a = x['s'],
            b = ( y = new Big( y ) )['s'];

        // Signs differ?
        if ( a != b ) {
            return y['s'] = -b, x['minus'](y)
        }

        var xe = x['e'],
            xc = x['c'],
            ye = y['e'],
            yc = y['c'];

        // Either zero?
        if ( !xc[0] || !yc[0] ) {

            // 'y' is non-zero?
            return yc[0]
              ? y
              : new Big( xc[0]

                // 'x' is non-zero?
                ? x

                // Both are zero. Return zero.
                : a * 0 )
        }

        // Prepend zeros to equalise exponents.
        // Note: Faster to use reverse then do unshifts.
        if ( xc = xc.slice(), a = xe - ye ) {
            d = a > 0 ? ( ye = xe, yc ) : ( a = -a, xc );

            for ( d.reverse(); a--; d.push(0) ) {
            }
            d.reverse()
        }

        // Point 'xc' to the longer array.
        if ( xc.length - yc.length < 0 ) {
            d = yc, yc = xc, xc = d
        }

        /*
         * Only start adding at 'yc.length - 1' as the
         * further digits of 'xc' can be left as they are.
         */
        for ( a = yc.length, b = 0; a;
             b = ( xc[--a] = xc[a] + yc[a] + b ) / 10 ^ 0, xc[a] %= 10 ) {
        }

        // No need to check for zero, as +x + +y != 0 && -x + -y != 0

        if ( b ) {
            xc.unshift(b);
            ++ye
        }

         // Remove trailing zeros.
        for ( a = xc.length; xc[--a] == 0; xc.pop() ) {
        }

        return y['c'] = xc, y['e'] = ye, y
    };


    /*
     * Return a 'Big' whose value is the value of this 'Big' raised to the power
     * 'e'. If 'e' is negative, round, if necessary, to a maximum of 'Big.DP'
     * decimal places using rounding mode 'Big.RM'.
     *
     * e {number} Integer, -MAX_POWER to MAX_POWER inclusive.
     */
    P['pow'] = function ( e ) {
        var isNeg = e < 0,
            x = new Big(this),
            y = ONE;

        if ( e !== ~~e || e < -MAX_POWER || e > MAX_POWER ) {
            throw '!pow!'
        }

        for ( e = isNeg ? -e : e; ; ) {

            if ( e & 1 ) {
                y = y['times'](x)
            }
            e >>= 1;

            if ( !e ) {
                break
            }
            x = x['times'](x)
        }

        return isNeg ? ONE['div'](y) : y
    };


    /*
     * Return a new 'Big' whose value is the value of this 'Big' rounded, if
     * necessary, to a maximum of 'dp' decimal places using rounding mode 'rm'.
     * If 'dp' is not specified, round to 0 decimal places.
     * If 'rm' is not specified, use 'Big.RM'.
     *
     * [dp] {number} Integer, 0 to MAX_DP inclusive.
     * [rm] 0, 1 or 2 ( i.e. ROUND_DOWN, ROUND_HALF_UP or ROUND_HALF_EVEN )
     */
    P['round'] = function ( dp, rm ) {
        var x = new Big(this);

        if ( dp == null ) {
            dp = 0
        } else if ( dp !== ~~dp || dp < 0 || dp > MAX_DP ) {
            throw '!round!'
        }
        rnd( x, dp, rm == null ? Big['RM'] : rm );

        return x
    };


    /*
     * Return a new 'Big' whose value is the square root of the value of this
     * 'Big', rounded, if necessary, to a maximum of 'Big.DP' decimal places
     * using rounding mode 'Big.RM'.
     */
    P['sqrt'] = function () {
        var estimate, r, approx,
            x = this,
            xc = x['c'],
            i = x['s'],
            e = x['e'],
            half = new Big('0.5');

        // Zero?
        if ( !xc[0] ) {
            return new Big(x)
        }

        // Negative?
        if ( i < 0 ) {
            throw NaN
        }

        // Estimate.
        i = Math.sqrt( x.toString() );

        // Math.sqrt underflow/overflow?
        // Pass 'x' to Math.sqrt as integer, then adjust the exponent of the result.
        if ( i == 0 || i == 1 / 0 ) {
            estimate = xc.join('');

            if ( !( estimate.length + e & 1 ) ) {
                estimate += '0'
            }

            r = new Big( Math.sqrt(estimate).toString() );
            r['e'] = ( ( ( e + 1 ) / 2 ) | 0 ) - ( e < 0 || e & 1 )
        } else {
            r = new Big( i.toString() )
        }

        i = r['e'] + ( Big['DP'] += 4 );

        // Newton-Raphson loop.
        do {
            approx = r;
            r = half['times']( approx['plus']( x['div'](approx) ) )
        } while ( approx['c'].slice( 0, i ).join('') !==
                       r['c'].slice( 0, i ).join('') );

        rnd( r, Big['DP'] -= 4, Big['RM'] );

        return r
    };


    /*
     * Return a new 'Big' whose value is the value of this 'Big' times the value
     * of 'Big' 'y'.
     */
    P['times'] = function ( y ) {
        var c,
            x = this,
            xc = x['c'],
            yc = ( y = new Big( y ) )['c'],
            a = xc.length,
            b = yc.length,
            i = x['e'],
            j = y['e'];

        y['s'] = x['s'] == y['s'] ? 1 : -1;

        // Either 0?
        if ( !xc[0] || !yc[0] ) {

            return new Big( y['s'] * 0 )
        }

        y['e'] = i + j;

        if ( a < b ) {
            c = xc, xc = yc, yc = c, j = a, a = b, b = j
        }

        for ( j = a + b, c = []; j--; c.push(0) ) {
        }

        // Multiply!
        for ( i = b - 1; i > -1; i-- ) {

            for ( b = 0, j = a + i;
                  j > i;
                  b = c[j] + yc[i] * xc[j - i - 1] + b,
                  c[j--] = b % 10 | 0,
                  b = b / 10 | 0 ) {
            }

            if ( b ) {
                c[j] = ( c[j] + b ) % 10
            }
        }

        b && ++y['e'];

        // Remove any leading zero.
        !c[0] && c.shift();

        // Remove trailing zeros.
        for ( j = c.length; !c[--j]; c.pop() ) {
        }

        return y['c'] = c, y
    };


    /*
     * Return a string representing the value of this 'Big'.
     * Return exponential notation if this 'Big' has a positive exponent equal
     * to or greater than 'TO_EXP_POS', or a negative exponent equal to or less
     * than 'TO_EXP_NEG'.
     */
    P['toString'] = P['valueOf'] = function () {
        var x = this,
            e = x['e'],
            str = x['c'].join(''),
            strL = str.length;

        // Exponential notation?
        if ( e <= TO_EXP_NEG || e >= TO_EXP_POS ) {
            str = str.charAt(0) + ( strL > 1 ?  '.' + str.slice(1) : '' ) +
              ( e < 0 ? 'e' : 'e+' ) + e

        // Negative exponent?
        } else if ( e < 0 ) {

        // Prepend zeros.
            for ( ; ++e; str = '0' + str ) {
            }
            str = '0.' + str

        // Positive exponent?
        } else if ( e > 0 ) {

            if ( ++e > strL ) {

                // Append zeros.
                for ( e -= strL; e-- ; str += '0' ) {
                }
            } else if ( e < strL ) {
                str = str.slice( 0, e ) + '.' + str.slice(e)
            }

        // Exponent zero.
        } else if ( strL > 1 ) {
            str = str.charAt(0) + '.' + str.slice(1)
        }

        // Avoid '-0'
        return x['s'] < 0 && x['c'][0] ? '-' + str : str
    };


    /*
     ***************************************************************************
     *
     * If 'toExponential', 'toFixed', 'toPrecision' and 'format' are not
     * required they can safely be commented-out or deleted. No redundant code
     * will be left. 'format' is used only by 'toExponential', 'toFixed' and
     * 'toPrecision'.
     *
     ***************************************************************************
     */
     

    /*
     * PRIVATE FUNCTION
     *
     * Return a string representing the value of 'Big' 'x' in normal or
     * exponential notation to a fixed number of decimal places or significant
     * digits 'dp'.
     * (Called by toString, toExponential, toFixed and toPrecision.)
     *
     * x {Big} The 'Big' to format.
     * dp {number} Integer, 0 to MAX_DP inclusive.
     * toE {number} undefined (toFixed), 1 (toExponential) or 2 (toPrecision).
     */
    function format( x, dp, toE ) {
        // The index (in normal notation) of the digit that may be rounded up.
        var i = dp - ( x = new Big(x) )['e'],
            c = x['c'];

        // Round?
        if ( c.length > ++dp ) {
            rnd( x, i, Big['RM'] )
        }

        // Recalculate 'i' if toFixed as 'x.e' may have changed if value rounded up.
        i = !c[0] ? i + 1 : toE ? dp : ( c = x['c'], x['e'] + i + 1 );

        // Append zeros?
        for ( ; c.length < i; c.push(0) ) {
        }
        i = x['e'];

        /*
         * 'toPrecision' returns exponential notation if the number of
         * significant digits specified is less than the number of digits
         * necessary to represent the integer part of the value in normal
         * notation.
         */
        return toE == 1 || toE == 2 && ( dp <= i || i <= TO_EXP_NEG )

            // Exponential notation.
            ? ( x['s'] < 0 && c[0] ? '-' : '' ) + ( c.length > 1
              ? ( c.splice( 1, 0, '.' ), c.join('') )
              : c[0] ) + ( i < 0 ? 'e' : 'e+' ) + i

            // Normal notation.
            : x.toString()
    }


    /*
     * Return a string representing the value of this 'Big' in exponential
     * notation to 'dp' fixed decimal places and rounded, if necessary, using
     * 'Big.RM'.
     *
     * [dp] {number} Integer, 0 to MAX_DP inclusive.
     */
    P['toExponential'] = function ( dp ) {

        if ( dp == null ) {
            dp = this['c'].length - 1
        } else if ( dp !== ~~dp || dp < 0 || dp > MAX_DP ) {
            throw '!toExp!'
        }

        return format( this, dp, 1 )
    };


    /*
     * Return a string representing the value of this 'Big' in normal notation
     * to 'dp' fixed decimal places and rounded, if necessary, using 'Big.RM'.
     *
     * [dp] {number} Integer, 0 to MAX_DP inclusive.
     */
    P['toFixed'] = function ( dp ) {
        var str,
            x = this,
            neg = TO_EXP_NEG,
            pos = TO_EXP_POS;

        TO_EXP_NEG = -( TO_EXP_POS = 1 / 0 );

        if ( dp == null ) {
            str = x.toString()
        } else if ( dp === ~~dp && dp >= 0 && dp <= MAX_DP ) {
            str = format( x, x['e'] + dp );

            // (-0).toFixed() is '0', but (-0.1).toFixed() is '-0'.
            // (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
            if ( x['s'] < 0 && x['c'][0] && str.indexOf('-') < 0 ) {
                // As e.g. -0.5 if rounded to -0 will cause toString to omit the minus sign.
                str = '-' + str
            }
        }
        TO_EXP_NEG = neg, TO_EXP_POS = pos;

        if ( !str ) {
            throw '!toFix!'
        }

        return str
    };


    /*
     * Return a string representing the value of this 'Big' to 'sd' significant
     * digits and rounded, if necessary, using 'Big.RM'. If 'sd' is less than
     * the number of digits necessary to represent the integer part of the value
     * in normal notation, then use exponential notation.
     *
     * sd {number} Integer, 1 to MAX_DP inclusive.
     */
    P['toPrecision'] = function ( sd ) {

        if ( sd == null ) {
            return this.toString()
        } else if ( sd !== ~~sd || sd < 1 || sd > MAX_DP ) {
            throw '!toPre!'
        }

        return format( this, sd - 1, 2 )
    };


    // EXPORT


    // Node and other CommonJS-like environments that support module.exports.
    if ( typeof module !== 'undefined' && module.exports ) {
        module.exports = Big

    //AMD.
    } else if ( typeof define == 'function' && define.amd ) {
        define( function () {
            return Big
        })

    //Browser.
    } else {
        global['Big'] = Big
    }

})( this );

})()
},{}],6:[function(require,module,exports){
var data = require('./data');

function filter (value) {
	return function (band) {
		return band.min <= value && value <= band.max;
	};
}

function toFixed (value, precision) {
	if (precision == null) precision = 2;

	var power = Math.pow(10, precision);
	var fixed = (Math.round(value * power) / power).toFixed(precision);
	return parseFloat(fixed);
}

Array.prototype.first = function (filter) {
	var i, length;
	for (i = 0, length = this.length; i < length; i += 1)
		if (filter.call(this, this[i]) === true)
			return this[i];
}

module.exports = function (state, value) {
	if (state == null) state = 'nsw';
	if (value == null) value = 0;

	var bands = data[state.toLowerCase()];
	var band = bands.first(filter(value));
	var duty = band.base + (value - (band.over || band.min)) * (band.rate / 100);

	return toFixed(duty);
};

},{"./data":9}],9:[function(require,module,exports){
module.exports = {
	nsw: [
		{ min: 0,       max: 14000,    rate: 1.25, base: 0 },
		{ min: 14000,   max: 30000,    rate: 1.50, base: 175 },
		{ min: 30000,   max: 80000,    rate: 1.75, base: 415 },
		{ min: 80000,   max: 300000,   rate: 3.50, base: 1290 },
		{ min: 300000,  max: 1000000,  rate: 4.50, base: 8990 },
		{ min: 1000000, max: 3000000,  rate: 5.50, base: 40490 },
		{ min: 3000000, max: Infinity, rate: 7.00, base: 150490 }
	],

	qld: [
		{ min: 0,       max: 5000,     rate: 0.00, base: 0 },
		{ min: 5000,    max: 105000,   rate: 1.50, base: 0, over: 5000 },
		{ min: 105000,  max: 480000,   rate: 3.50, base: 1500 },
		{ min: 480000,  max: 980000,   rate: 4.50, base: 14625 },
		{ min: 980000,  max: Infinity, rate: 5.25, base: 37125 }
	],

	sa: [
		{ min: 0,       max: 12000,    rate: 1.00, base: 0 },
		{ min: 12000,   max: 30000,    rate: 2.00, base: 120 },
		{ min: 30000,   max: 50000,    rate: 3.00, base: 480 },
		{ min: 50000,   max: 100000,   rate: 3.50, base: 1080 },
		{ min: 100000,  max: 200000,   rate: 4.00, base: 2830 },
		{ min: 200000,  max: 250000,   rate: 4.25, base: 6830 },
		{ min: 250000,  max: 300000,   rate: 4.75, base: 8955 },
		{ min: 300000,  max: 500000,   rate: 5.00, base: 11330 },
		{ min: 500000,  max: Infinity, rate: 5.50, base: 21330 }
	],

	vic: [
		{ min: 0,      max: 25000,    rate: 1.40, base: 0 },
		{ min: 25000,  max: 130000,   rate: 2.40, base: 350 },
		{ min: 130000, max: 440000,   rate: 5.00, base: 2870 },
		{ min: 440000, max: 550000,   rate: 6.00, base: 18370 },
		{ min: 550000, max: 960000,   rate: 6.00, base: 2870, over: 130000 },
		{ min: 960000, max: Infinity, rate: 5.50, base: 0 }
	],

	wa: [
		{ min: 0,       max: 120000,   rate: 1.90, base: 0 },
		{ min: 120000,  max: 150000,   rate: 2.85, base: 2280 },
		{ min: 150000,  max: 360000,   rate: 3.80, base: 3135 },
		{ min: 360000,  max: 300000,   rate: 4.75, base: 11115 },
		{ min: 725000,  max: Infinity, rate: 5.15, base: 28435 }
	]
};
},{}]},{},[3,4,1,2])
;