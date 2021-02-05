document.onreadystatechange = () => {
    if (document.readyState == "complete") {
        attachClickToggleNavbar();
        getIndonesiaData();
    }
};

function getIndonesiaData() {
    fetch('https://covid19.mathdro.id/api/countries/IDN',
        {
            method: 'get'
        })
        .then(async (res) => {
            var json = await res.json();
            showDataNumber(json);
        });
}

function showDataNumber(data) {
    const confirmed = data.confirmed.value;
    const recovered = data.recovered.value;
    const deaths = data.deaths.value;
    document.getElementById('total-case').innerText = confirmed + recovered + deaths;
    document.getElementById('confirmed').innerText = confirmed;
    document.getElementById('recovered').innerText = recovered;
    document.getElementById('deaths').innerText = deaths;
}