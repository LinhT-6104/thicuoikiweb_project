document.addEventListener('DOMContentLoaded', function() {
    // Thêm tài khoản
    const themtaikhoan = document.getElementById('themtaikhoan');
    const formthem = document.getElementById('formthem');

    themtaikhoan.addEventListener('click', function() {
        const isSearchBarVisible = formthem.style.display === 'block';
        formthem.style.display = isSearchBarVisible ? 'none' : 'block';
    });
});

// Hiển thị danh sách các tài khoản
function themhang() {
    let danhsachnguoidung = down_local_user();
    let table = document.getElementById('bangthem');
    table.innerHTML = "";
    let a = 1;
    danhsachnguoidung.forEach((nguoidung, index) => {
        let row = table.insertRow();

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);

        cell1.innerHTML = a;
        cell2.innerHTML = nguoidung.nameID;
        cell3.innerHTML = nguoidung.pass;
        cell4.innerHTML = `
            <button id="showsua" onclick="hienthiformsua(${index})">Sửa</button>
            <button id="btnxoa" onclick="xoa(${index})">Xóa</button>`;
        a++;
    });
};
window.onload = themhang;

function hienthiformsua(i) {
    const formsua = document.getElementById('formsua');
    const isSearchBarVisible = formsua.style.display === 'block';
    formsua.style.display = isSearchBarVisible ? 'none' : 'block';
    
    let danhsachnguoidung = down_local_user();
    
    let nameID = document.getElementById('renameID');
    let cccd = document.getElementById('recccd');
    let fullname = document.getElementById('refullname');
    let email = document.getElementById('reemail');
    let pass = document.getElementById('repass');

    nameID.value = danhsachnguoidung[i].nameID;
    cccd.value = danhsachnguoidung[i].cccd;
    fullname.value = danhsachnguoidung[i].fullname;
    email.value = danhsachnguoidung[i].email;
    pass.value = danhsachnguoidung[i].pass;

    const btnsua = document.getElementById('btnsua');
    btnsua.onclick = function() {
        suanguoidung(i);
    }
}

function suanguoidung(i) {
    let renameID = document.getElementById('renameID').value;
    let recccd = document.getElementById('recccd').value;
    let refullname = document.getElementById('refullname').value;
    let reemail = document.getElementById('reemail').value;
    let repass = document.getElementById('repass').value;

    let danhsachnguoidung = down_local_user();

    danhsachnguoidung[i].nameID = renameID;
    danhsachnguoidung[i].cccd = recccd;
    danhsachnguoidung[i].fullname = refullname;
    danhsachnguoidung[i].email = reemail;
    danhsachnguoidung[i].pass = repass;

    save_local_user(danhsachnguoidung);
    themhang();

    // Ẩn bảng đăng sửa
    document.getElementById("formsua").style.display = 'none';
}

function xoa(i) {
    let danhsachnguoidung = down_local_user();
    danhsachnguoidung.splice(i,1);
    save_local_user(danhsachnguoidung);
    themhang();
}

function kiemtradangky() {
    let nameID = document.getElementById('nameID').value.trim();
    let cccd = document.getElementById('cccd').value.trim();
    let fullname = document.getElementById('fullname').value.trim();
    let email = document.getElementById('email').value.trim();
    let pass = document.getElementById('pass').value.trim();

    if (nameID === "" || cccd === "" || fullname === "" || email === "" || pass === "") {
        alert('Vui lòng điền đầy đủ thông tin');
        return;
    }
    if (cccd.length < 12) {
        alert('Vui lòng điền mã căn cước công dân hợp lệ');
        return
    }
    if (nameID === 'tkadmin') {
        alert('Không thể đăng ký tên tài khoản trên!');
        return
    }
    if (cccd.length < 12) {
        alert('Vui lòng điền mã căn cước công dân hợp lệ');
        return
    }
    if (!(pass.length >= 8) || pass.trim().includes(" ")) {
        alert('Mật khẩu phải có độ dài ít nhất 8 ký tự không dấu không cách')
        return
    }
    if (!email.includes('@') || email.indexOf('@') === 0 
        || email.indexOf('@') !== email.lastIndexOf('@') 
        || email.lastIndexOf('.') < email.indexOf('@') + 2 
        || email.lastIndexOf('.') === email.length - 1 
        || email.includes(' ')) {
        alert("Email không hợp lệ. Vui lòng nhập email đúng định dạng, ví dụ: abc@gmail.com");
        return;
    }    
    // !email.includes('@'): Email phải chứa ký tự @.
    // email.indexOf('@') === 0: @ không được nằm ở đầu email.
    // email.indexOf('@') !== email.lastIndexOf('@'): Email không được chứa nhiều ký tự @.
    // email.lastIndexOf('.') < email.indexOf('@') + 2: Phải có dấu . sau @, với ít nhất 1 ký tự giữa @ và ..
    // email.lastIndexOf('.') === email.length - 1: . không được nằm ở cuối email.
    // email.includes(' '): Email không được chứa khoảng trắng.
    
    let danhsachnguoidung = down_local_user();

    if (danhsachnguoidung.some(user => user.nameID === nameID)) {
        alert('Tên tài khoản đã tồn tại vui lòng nhập tên khác');
        return
    }
    if (danhsachnguoidung.some(user => user.cccd === cccd)) {
        alert('Mã căn cước công dân đã tồn tại vui lòng nhập tên khác');
        return
    }
    if (danhsachnguoidung.some(user => user.email === email)) {
        alert('Email đã tồn tại vui lòng nhập tên khác');
        return
    }

    let nguoidung = {
        nameID: nameID, 
        cccd: cccd,
        fullname: fullname,
        email: email,
        pass: pass
    };

    danhsachnguoidung.push(nguoidung);
    save_local_user(danhsachnguoidung);

    // Tự động thêm hồ sơ 
    const hoso = {
        hoten: fullname, ngaysinh: "", socccd: cccd, ngaycap: "", noicap: "", 
        gioitinh: "", noisinh: "", dantoc: "", sodt: "", sodt_nguoithan: "", email: email,
        tinh_thanh_thuongtru: "", quan_huyen_thuongtru: "", phuong_xa_thuongtru: "", diachicuthe: "",
        tinh_thanh_lienlac: "", quan_huyen_lienlac: "", phuong_xa_lienlac: "", diachilienlac: "",
        trangthai: "Chờ duyệt"
    };
    let danhsachhoso = down_local_ho_so();
    danhsachhoso.push(hoso);
    save_local_ho_so(danhsachhoso);

    // Hiển thị thông báo và cập nhật giao diện
    alert("Đăng ký thành công!");
    themhang();

    // Ẩn form đăng ký
    document.getElementById("formthem").style.display = 'none';
}

// Hàm quản lý localStorage
function down_local_ho_so() {
    return JSON.parse(localStorage.getItem('hoso')) || [];
}
function save_local_ho_so(danhsachhoso) {
    console.log("Lưu danh sách hồ sơ:", danhsachhoso); // Thêm log kiểm tra
    localStorage.setItem('hoso', JSON.stringify(danhsachhoso));
}

// Thêm sự kiện ấn enter để thêm tài khoản
const nameID = document.getElementById('nameID');
const email = document.getElementById('email');
const cccd = document.getElementById('cccd');
const fullname = document.getElementById('fullname');
const pass = document.getElementById('pass');

function clickEnterThemTK(event) {
    if (event.key === 'Enter') {
        kiemtradangky();
    }
}
nameID.addEventListener('keyup', clickEnterThemTK);
email.addEventListener('keyup', clickEnterThemTK);
cccd.addEventListener('keyup', clickEnterThemTK);
fullname.addEventListener('keyup', clickEnterThemTK);
pass.addEventListener('keyup', clickEnterThemTK);