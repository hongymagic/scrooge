	FastClick           = require 'fastclick'
	Mortgage            = require './models/mortgage.litcoffee'
	MortgageFormView    = require './views/mortgageFormView.litcoffee'
	MortgageSummaryView = require './views/mortgageSummaryView.litcoffee'

Enable fastclick on iOS WebView

	FastClick document.body

	m = new Mortgage
	f = new MortgageFormView { model: m }
	v = new MortgageSummaryView { model: m }

	f.render()
	v.render()
