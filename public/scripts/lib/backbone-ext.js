(function (Backbone) {
	var _old = Backbone.Model;

// Take a Backbone.Model and introduce a proper set of accessors based on
// `defaults`. Instead of having to use accessor methods like `get` and
// `set`, just accesss your model properties:
//
// 	var user = new User();
// 	user.name = 'David';

	function defineProperty (model, key) {
		Object.defineProperty(model, key, {
			get: function () { return model.get(key); },
			set: function (value) { return model.set(key, value); }
		});
	}

// In order for this to work, you must declare `defaults` in your model
// definition:
//
// 	var User = Model.extend({
// 		defaults: {
// 			name: null,
// 			email: null
// 		}
// 	});

	Backbone.Model = _old.extend({
		initialize: function () {
			var property;
			for (property in this.defaults) {
				defineProperty(this, property);
			}
		}
	});

})(Backbone);