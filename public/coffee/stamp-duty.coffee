class StampDuty

	@bands: [
		{ min: 0, max: 14000, rate: 1.25 },
		{ min: 14001, max: 30000, rate: 1.50 },
		{ min: 30001, max: 80000, rate: 1.75 },
		{ min: 80001, max: 300000, rate: 3.50 },
		{ min: 300001, max: 1000000, rate: 4.50 },
		{ min: 1000001, max: 3000000, rate: 5.50 },
		{ min: 3000001, max: Infinity, rate: 7.00 }
	]

	@calculate: (value) ->
		duty = @bands.reduce (duty, band) ->

			if band.min < value and band.max < value
				duty += (band.rate / 100 * (band.max - band.min))

			if band.min < value and value < band.max
				duty += (band.rate / 100 * (value - band.min))

			duty
		, 0

		Math.ceil duty

module.exports = StampDuty
