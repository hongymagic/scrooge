	class MortgageFormView extends Backbone.View

		el: '#form'

		template: _.template $('#__MortgageForm').html()

		initialize: ->
			@binder = new Backbone.ModelBinder

		render: ->
			@$el.html @template @model.toJSON()
			@binder.bind @model, @el
			@

	module.exports = MortgageFormView
