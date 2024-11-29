let danhsachnguoidung = down_local_user();
let nguoihoatdong = JSON.parse(localStorage.getItem('nguoihoatdong'));

let nameID = document.getElementById('renameID');
let cccd = document.getElementById('recccd');
let fullname = document.getElementById('refullname');
let email = document.getElementById('reemail');
let pass = document.getElementById('repass');

danhsachnguoidung.forEach((nguoidung, index) => {
    let i = index;
    if (nguoidung.nameID === nguoihoatdong.nameID) {
        nameID.value = danhsachnguoidung[i].nameID;
        cccd.value = danhsachnguoidung[i].cccd;
        fullname.value = danhsachnguoidung[i].fullname;
        email.value = danhsachnguoidung[i].email;
        pass.value = danhsachnguoidung[i].pass;
    }
});
