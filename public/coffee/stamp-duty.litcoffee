A simple stamp duty calculator for NSW homes. The figures are based on the table
on this page:

- http://stampduty.calculatorsaustralia.com.au/stamp-duty-nsw

	class StampDuty

TODO: The following list of bands are for NSW. Stamp duty rates are different
for each state, so implement them.

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

If the value exceeds the maximum boundary in the current band, then we simply
add the maximum rate for the band. For example, stamp duty on $15000 property
is simply (14000 - 0) * 0.0125 + (15000 - 14001) * 0.015.

				if band.min < value and band.max < value
					duty += (band.rate / 100 * (band.max - band.min))

When the value is within the band then we get the rate by subtracting the
minimum from the value. Any band above it will simply be ignored.

				if band.min < value and value < band.max
					duty += (band.rate / 100 * (value - band.min))

				duty
			, 0

For simplicity's sake, return a whole number.

			Math.ceil duty

	module.exports = StampDuty
