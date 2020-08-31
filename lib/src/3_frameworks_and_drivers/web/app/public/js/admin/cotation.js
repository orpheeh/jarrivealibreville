let _cotations = null;
window.addEventListener('load', async () => {
  const cotations = await fetchCotation();
  if (cotations) {
    cotations.forEach((c) => {
      displayCotation(c);
    })
    _cotations = cotations;
  }
})

async function fetchCotation() {
  const res = await fetch("/api/cotation");
  if (res.status == 200) {
    const cotations = await res.json();
    return cotations;
  } else {
    return null;
  }
}

async function requestUpdate() {
  console.log("update");
  const v1 = document.querySelector('input[name="cotation-france-avion"]').value;
  const v2 = document.querySelector('input[name="cotation-chine-avion"]').value;
  const v3 = document.querySelector('input[name="cotation-maroc-avion"]').value;
  const v4 = document.querySelector('input[name="cotation-france-bateau"]').value;
  const v5 = document.querySelector('input[name="cotation-chine-bateau"]').value;
  const v6 = document.querySelector('input[name="cotation-maroc-bateau"]').value;

  await updateCotation('france', 'avion', v1);
  await updateCotation('chine', 'avion', v2);
  await updateCotation('maroc', 'avion', v3);
  await updateCotation('france', 'bateau', v4);
  await updateCotation('chine', 'bateau', v5);
  await updateCotation('maroc', 'bateau', v6);
  alert("Mise à jour effectué");
}

async function updateCotation(pays, transport, value) {
  const c = _cotations.find(cc => cc.pays == pays && cc.transport == transport);
  c.value = value;

  const res = await fetch("/api/cotation/" + c._id, {
    method: 'put',
    body: JSON.stringify({
      pays: c.pays,
      user_type: c.user_type,
      transport: c.transport,
      value: c.value
    })
  });
}

function displayCotation(cotation) {
  if (cotation.pays == "france" && cotation.transport == "avion") {
    document.querySelector('input[name="cotation-france-avion"]').value = cotation.value;
  } else if (cotation.pays == "chine" && cotation.transport == "avion") {
    document.querySelector('input[name="cotation-chine-avion"]').value = cotation.value;
  } else if (cotation.pays == "maroc" && cotation.transport == "avion") {
    document.querySelector('input[name="cotation-maroc-avion"]').value = cotation.value;
  } else if (cotation.pays == "france" && cotation.transport == "bateau") {
    document.querySelector('input[name="cotation-france-bateau"]').value = cotation.value;
  } else if (cotation.pays == "chine" && cotation.transport == "bateau") {
    document.querySelector('input[name="cotation-chine-bateau"]').value = cotation.value;
  } else if (cotation.pays == "maroc" && cotation.transport == "bateau") {
    document.querySelector('input[name="cotation-maroc-bateau"]').value = cotation.value;
  }
}

