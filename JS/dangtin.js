document.addEventListener('DOMContentLoaded', function () {
    // Kiểm tra tài khoản đang sử dụng
    isAdmin();

    // Ẩn hiện form đăng bài
    let thembaibtn = document.getElementById('thembaibtn');
    thembaibtn.addEventListener('click', function () {
        let formdangbai = document.getElementById('formdangbai');
        const isSearchBarVisible = formdangbai.style.display === 'block';
        formdangbai.style.display = isSearchBarVisible ? 'none' : 'block';
    });

    // Lấy ảnh và hiển thị
    chonAnh('anhnoibat', 'hienthianh');
    // Thay đổi ảnh
    chonAnh('re_anhnoibat', 're_hienthianh');
});

// Đăng tin
function dangtin() {
    let tieude = document.getElementById('tieude').value;
    let mota = document.getElementById('mota').value;
    let anhnoibat = document.getElementById('anhnoibat').files[0];
    let noidung = document.getElementById('noidung').value;

    if (!anhnoibat || tieude.trim() === '' || mota.trim() === '' || noidung.trim() === '') {
        alert('Vui lòng điền đầy đủ thông tin.');
        return;
    }
    
    let nguoidung = JSON.parse(localStorage.getItem('nguoihoatdong')) || {};
    let nguoidang = nguoidung.nameID;

    let readFile = new FileReader();
    readFile.onload = function (e) {
        const base64String = e.target.result;
        let danhsachbaidang = JSON.parse(localStorage.getItem('baidang')) || [];

        let baidang = {
            tieude: tieude,
            mota: mota,
            anhnoibat: base64String,
            noidung: noidung,
            nguoidang: nguoidang,
            thoigian: dateDate()
        };

        danhsachbaidang.push(baidang);
        localStorage.setItem('baidang', JSON.stringify(danhsachbaidang));
        themhang();
        alert('Đăng bài thành công!');

        // Ẩn form đăng bài
        let formdangbai = document.getElementById('formdangbai');
        formdangbai.style.display = 'none';
    }

    readFile.onerror = function (error) {
        console.log('Error: ', error);
        alert('Có lỗi xảy ra khi đọc file hình ảnh.');
    };

    // Chuyển ảnh sang dạng base64
    readFile.readAsDataURL(anhnoibat);
}

// Thêm / Sửa ảnh
function chonAnh(anhchon, anhhienthi) {
    const anhInput = document.getElementById(anhchon);
    if (anhInput) {
        anhInput.addEventListener('change', function (e) {
            let file = e.target.files[0];

            if (!file) {
                alert('Vui lòng chọn một tệp hình ảnh hợp lệ.');
                return;
            }
            const reader = new FileReader();
            reader.onload = function (e) {
                const hienthianh = document.getElementById(anhhienthi);
                hienthianh.src = e.target.result;
                hienthianh.style.display = 'block';
            };
            reader.onerror = function () {
                alert('Có lỗi xảy ra khi đọc file hình ảnh.');
            };
            reader.readAsDataURL(file);
        });
    } else {
        console.error("Không tìm thấy phần tử với id='${anhchon}'");
    } 
}

// Sửa tin
function formsua(i) {
    const formsuabai = document.getElementById('formsuabai');
    const isSearchBarVisible = formsuabai.style.display === 'block';
    formsuabai.style.display = isSearchBarVisible ? 'none' : 'block';

    let danhsachbaidang = down_local_bai_dang();

    let tieude = document.getElementById('re_tieude');
    let mota = document.getElementById('re_mota');
    let anhnoibat = document.getElementById('re_anhnoibat');
    let noidung = document.getElementById('re_noidung');

    tieude.value = danhsachbaidang[i].tieude;
    mota.value = danhsachbaidang[i].mota;
    noidung.value = danhsachbaidang[i].noidung;

    // Hiển thị ảnh hiện tại 
    const hienthianh = document.getElementById('re_hienthianh');
    hienthianh.src = danhsachbaidang[i].anhnoibat;  
    hienthianh.style.display = 'block'; 

    const btnsua = document.getElementById('btnsua');
    btnsua.onclick = function () {
        suatin(i);
    }
};
function suatin(i) {
    let tieude = document.getElementById('re_tieude').value;
    let mota = document.getElementById('re_mota').value;
    let fileInput = document.getElementById('re_anhnoibat');
    let file = fileInput.files[0];
    let noidung = document.getElementById('re_noidung').value;

    if (tieude.trim() === '' || mota.trim() === '' || noidung.trim() === '') {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    let nguoidung = JSON.parse(localStorage.getItem('nguoihoatdong'));
    let nguoidang = nguoidung.nameID;

    let danhsachbaidang = down_local_bai_dang();

    // Giữ ảnh cũ
    if (!file) {
        let baidang = {
            tieude: tieude,
            mota: mota,
            anhnoibat: danhsachbaidang[i].anhnoibat,
            noidung: noidung,
            nguoidang: nguoidang,
            thoigian: dateDate(),
        };

        danhsachbaidang[i] = baidang;
        localStorage.setItem('baidang', JSON.stringify(danhsachbaidang));
        themhang();
        alert('Sửa bài thành công!');
        
        // Ẩn form sửa tin
        const formsuabai = document.getElementById('formsuabai');
        formsuabai.style.display = 'none' ;

        return;
    }

    // Lưu ảnh mới
    let readFile = new FileReader();
    readFile.onload = function (e) {
        const base64String = e.target.result;

        let baidang = {
            tieude: tieude,
            mota: mota,
            anhnoibat: base64String,
            noidung: noidung,
            nguoidang: nguoidang,
            thoigian: dateDate(),
        };

        danhsachbaidang[i] = baidang;
        localStorage.setItem('baidang', JSON.stringify(danhsachbaidang));
        themhang();
        alert('Sửa bài thành công!');
        // Ẩn form sửa tin
        const formsuabai = document.getElementById('formsuabai');
        formsuabai.style.display = 'none' ;
    };

    readFile.onerror = function (error) {
        console.log('Error: ', error);
        alert('Có lỗi xảy ra khi đọc file hình ảnh.');
    };

    // Chuyển ảnh sang dạng base64
    readFile.readAsDataURL(file);
}


// Thêm hàng
function themhang() {
    let danhsachbaidang = down_local_bai_dang();
    // let nguoihoatdong = JSON.parse(localStorage.getItem('nguoihoatdong'));
    let table = document.getElementById('bangthem');
    table.innerHTML = '';
    var a = 1;
    danhsachbaidang.forEach((baidang, index) => {
        if (baidang.nguoidang === 'tkadmin') {
            let row = table.insertRow();

            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);

            cell1.innerHTML = a;
            cell2.innerHTML = baidang.tieude;
            cell3.innerHTML = baidang.mota;
            cell3.style.width = '700px';
            cell4.innerHTML = baidang.thoigian;
            cell5.innerHTML = `<button id="xembtn" onclick="xem(${index})">Xem</button><br>
                                <button id="suabtn" onclick="formsua(${index})">Sửa</button><br>
                                <button id="xoabtn" onclick="xoa(${index})">Xóa</button>`;
            a++;
        }
    })
}
window.onload = themhang;

function xem(i) {
    localStorage.setItem('baidangchuyenhuong', i);
    window.location.href = 'tus.html';
}

function xoa(i) {
    let danhsachbaidang = down_local_bai_dang();
    danhsachbaidang.splice(i,1);
    save_local_bai_dang(danhsachbaidang);
    themhang();
}