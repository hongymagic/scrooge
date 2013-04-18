	class MortgageSummaryView extends Backbone.View

		el: '#summary'

		template: _.template $('#__MortgageSummary').html()

		initialize: ->
			@listenTo @model, "change", @render

		render: ->
			@$el.html @template @model.toFormattedJSON()
			@

	module.exports = MortgageSummaryView
