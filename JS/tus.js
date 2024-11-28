document.addEventListener('DOMContentLoaded', function () {
    // Hiện bài đăng
    let danhsachbaidang = down_local_bai_dang();
    let i = JSON.parse(localStorage.getItem('baidangchuyenhuong'));

    let tieude = document.getElementById('tieude')
    let hinhanh = document.getElementById('hinhanh');
    let noidung = document.getElementById('noidung');
    let nguoidang = document.getElementById('nguoidang');
    let ngaydang = document.getElementById('ngaydang');

    tieude.innerHTML = danhsachbaidang[i].tieude;
    hinhanh.src = danhsachbaidang[i].anhnoibat;
    noidung.innerHTML = danhsachbaidang[i].noidung;
    nguoidang.innerHTML = danhsachbaidang[i].nguoidang;
    ngaydang.innerHTML = danhsachbaidang[i].thoigian;
})

