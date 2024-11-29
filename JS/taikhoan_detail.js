document.addEventListener('DOMContentLoaded', function () {
    let danhsachnguoidung = down_local_user();
    let nguoihoatdong = JSON.parse(localStorage.getItem('nguoihoatdong'));

    let nameID = document.getElementById('nameID');
    let cccd = document.getElementById('cccd');
    let fullname = document.getElementById('fullname');
    let email = document.getElementById('email');
    let pass = document.getElementById('pass');

    let vitri;
    danhsachnguoidung.forEach((nguoidung, index) => {
        if (nguoidung.nameID === nguoihoatdong.nameID) {
            vitri = index;
            nameID.value = nguoidung.nameID;
            cccd.value = nguoidung.cccd;
            fullname.value = nguoidung.fullname;
            email.value = nguoidung.email;
            pass.value = nguoidung.pass;
            return;
        }
    });

    if (vitri === undefined) {
        console.error('Không tìm thấy người dùng hoạt động trong danh sách.');
        return;
    }

    const btnupdate = document.getElementById('btnupdate');
    if (btnupdate) {
        btnupdate.onclick = function () {
            updatethongtin(vitri);
        };
    } else {
        console.error('Không tìm thấy nút btnupdate trong DOM.');
    }

    // Cập nhật thông tin tài khoản
    function updatethongtin(i) {
        let nameID = document.getElementById('nameID').value;
        let cccd = document.getElementById('cccd').value;
        let fullname = document.getElementById('fullname').value;
        let email = document.getElementById('email').value;
        let pass = document.getElementById('pass').value;

        let danhsachnguoidung = down_local_user();

        danhsachnguoidung[i].nameID = nameID;
        danhsachnguoidung[i].cccd = cccd;
        danhsachnguoidung[i].fullname = fullname;
        danhsachnguoidung[i].email = email;
        danhsachnguoidung[i].pass = pass;

        save_local_user(danhsachnguoidung);
        alert(`Cập nhật tài khoản ${nameID} thành công!`);
    }
});
