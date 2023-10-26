// Bu script dosyasını farklı bir dosya olarak tutup buraya import(~çağır) et.
let deleteId
let ad = document.querySelector("#name");
let soyad = document.querySelector("#surname");
let numara = document.querySelector("#phonenumber");
let not = document.querySelector("#not");
let submit = document.querySelector("#submit");
let liste = document.getElementById("liste");
let tableBody = document.getElementById("table-body");
let data = []; //bu dizi kullanıcıların verilerini saklamak için
let selectData; // bu değişken düzenleme işlemi sırasında verileri saklamak için 

          // Silme butonuna tıklanınca modalı göster
    document.getElementById("silButton").addEventListener("click", function() {
    document.getElementById("deleteModal").style.display = "block";
}); 

// Bu fonksiyon tablonun data verilerine göre tekrar oluşturulmasını sağlıyor.
const renderList = () => {
  // Bu kod tablonun içerisindeki elementleri silmek için kullanılıyor.
  tableBody.innerHTML = ``;
  // Burada data (yani tablonun içerisindeki değerler) döndürülüyor.
  data.forEach(
    // val her dönen değeri temsil ediyor ve value'nin kısaltılması.
    (val) =>
      (tableBody.innerHTML += `
      <tr>
          <td class="v-center">${val.id}</td>
          <td class="v-center">${val.ad}</td>
          <td class="v-center">${val.soyad}</td>
          <td class="v-center">${val.numara}</td>
          <td class="v-center">${val.not}</td>
          <td><button class="btn btn-outline-warning btn-badge btn-md" onclick="handleDelete(${val.id})"" data-bs-toggle="modal" data-bs-target="#deleteModal">Sil</button>
          <button class="btn btn-outline-warning btn-badge btn-md" onclick="handleEdit(${val.id})">Düzenle</button>
      </tr>`)
  );
};

const saveData = () => { // kullanıcı verilerini kaydeder.
  let adValue = ad.value.trim(); // Adı boşlukları temizle
  let numaraValue = numara.value.trim(); // Telefon numarasını boşlukları temizle

  // Ad ve telefon numarası boş ise uyarı verir.
  if (!adValue || !numaraValue) {
    alert("Lütfen Ad ve Telefon Numarası alanlarını doldurun.");
    return;
  }
  let user = {
    id: data[data.length - 1]?.id + 1 || 1,
    ad: ad.value,
    soyad: soyad.value,
    numara: numara.value,
    not: not.value,
  };
  data.push(user);
  renderList();
  resetInputs(); //bu fonk giriş alanlarını temizler.
};

const resetInputs = () => {
  ad.value = "";
  soyad.value = "";
  numara.value = "";
  not.value = "";
  ad.focus(); // veri girildiğinde yeni veri için inputa fokuslanır.
};

const handleDelete = (id) => { // bu fonk seçilen kullanıcıyı diziden siler.
  deleteId = id
};

const silButton = () => {
  data = data.filter((val) => val.id != deleteId);
  renderList();
};

const handleEdit = (id) => { // bu fonk seçilen kullanıcının verilerini düzenler.
  selectData = data.find((val) => val.id === id);

  if (selectData) {
    ad.value = selectData.ad;
    soyad.value = selectData.soyad;
    numara.value = selectData.numara;
    not.value = selectData.not;

    submit.innerText = "Güncelle";
    submit.onclick = () => { // kaydedilme olayı burada gerçekleşir ve savedata fonksiyonunu çağırır.
      if (selectData) {
        selectData.ad = ad.value;
        selectData.soyad = soyad.value;
        selectData.numara = numara.value;
        selectData.not = not.value;
        renderList();
        resetInputs();
        submit.innerText = "Kaydet";
        submit.onclick = saveData;
        selectData = null;
      }
    };
  }
};
submit.onclick = saveData;