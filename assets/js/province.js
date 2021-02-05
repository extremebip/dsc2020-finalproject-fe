document.onreadystatechange = async () => {
    if (document.readyState == "complete") {
        attachClickToggleNavbar();
        attachLiveFilterToSearchBar();
        try {
            data = await getProvincesData();
            if (data != null)
                showProvinceData(data);
        } catch (error) {
            alert('An Error has happened!');
        }
    }
};

function attachLiveFilterToSearchBar() {
    document.getElementById('search-bar').addEventListener('keyup', (e) => filterProvincesData(e));
}

async function fetchProvincesData() {
    return fetch('https://indonesia-covid-19.mathdro.id/api/provinsi',
        {
            method: 'get'
        })
        .then(async (res) => {
            var json = await res.json();
            localStorage.setItem('provinces', JSON.stringify(json.data));
        });
}

async function getProvincesData() {
    let data = JSON.parse(localStorage.getItem('provinces'));

    if (data != null) {
        return data;
    }

    try {
        await fetchProvincesData();
        return JSON.parse(localStorage.getItem('provinces'));
    } catch (error) {
        throw error;
    }
}

async function filterProvincesData(e) {
    let data = await getProvincesData();
    const value = document.getElementById('search-bar').value;

    let filtered = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].provinsi === "Indonesia")
            continue;

        if (data[i].provinsi.toLowerCase().includes(value.toLowerCase()))
            filtered.push(data[i]);
    }
    document.getElementsByClassName("content")[0].innerHTML = "";
    showProvinceData(filtered);
}

function showProvinceData(data) {
    data.sort((a, b) => {
        return b.kasusPosi - a.kasusPosi;
    });
    for (let i = 0; i < data.length; i++) {
        if (data[i].provinsi === "Indonesia")
            continue;
        const template = document.getElementById("template-provinsi").cloneNode(true);
        template.getElementsByClassName("number")[0].innerText = `#${i + 1}`;
        template.getElementsByClassName("province-name")[0].innerText = data[i].provinsi;
        template.getElementsByClassName("positive-number")[0].innerText = data[i].kasusPosi;
        template.getElementsByClassName("recovered-number")[0].innerText = data[i].kasusSemb;
        template.getElementsByClassName("death-number")[0].innerText = data[i].kasusMeni;

        template.className = template.className.replace("hide", "");
        template.className = template.className.replace("  ", " ");
        template.removeAttribute('id');
        document.getElementsByClassName("content")[0].appendChild(template);
    }
    hideLoading();
}

function hideLoading() {
    const loading = document.getElementsByClassName("loading")[0];
    const searchBarWrapper = document.getElementsByClassName("search-bar-wrapper")[0];

    document.getElementsByClassName("loading")[0].className += " hide";
    loading.className = document.getElementsByClassName("loading")[0].className.replace("ml-auto", "");
    loading.className = document.getElementsByClassName("loading")[0].className.replace("  ", " ");

    document.getElementsByClassName("search-bar-wrapper")[0].className += " ml-auto"
}

function showLoading() {
    const loading = document.getElementsByClassName("loading")[0];
    const searchBarWrapper = document.getElementsByClassName("search-bar-wrapper")[0];

    searchBarWrapper.className = document.getElementsByClassName("search-bar-wrapper")[0].className.replace("ml-auto", "");
    searchBarWrapper.className = document.getElementsByClassName("search-bar-wrapper")[0].className.replace("  ", " ");

    loading.className = document.getElementsByClassName("loading")[0].className.replace("hide", "");
    loading.className = document.getElementsByClassName("loading")[0].className.replace("  ", " ");
    document.getElementsByClassName("loading")[0].className += " ml-auto"
}

function getTotalKasus(provinsi) {
    return provinsi.kasusPosi + provinsi.kasusSemb + provinsi.kasusMeni;
}