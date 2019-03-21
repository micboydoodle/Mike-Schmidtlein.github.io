function severity() {
	var svin = document.getElementById('svin');
	var svout = document.getElementById('svout');
	svout.innerHTML = svin.value;
	svin.addEventListener('change', function() {
		svout.innerHTML = svin.value;
	}, false);
}
severity();